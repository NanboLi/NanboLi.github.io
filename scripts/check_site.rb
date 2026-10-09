# Run after `bash scripts/site build`. Checks rendered output, not template syntax.
require 'nokogiri'
require 'uri'
require 'pathname'

root = Pathname.new('_site')
abort 'Build the site first.' unless root.join('index.html').file?
errors = []
pages = Dir.glob('_site/**/*.html')
pages.each do |file|
  doc = Nokogiri::HTML(File.read(file))
  next if doc.at_css('meta[http-equiv="refresh"]')
  errors << "#{file}: missing main landmark" unless doc.at_css('main#main')
  errors << "#{file}: expected one h1" unless doc.css('h1').size == 1
  errors << "#{file}: unexpected rendered code block" unless doc.css('pre').empty?
  errors << "#{file}: missing description" unless doc.at_css('meta[name="description"]')
  errors << "#{file}: image missing alt" if doc.css('img').any? { |img| img['alt'].nil? }
  doc.css('a[href], img[src], source[srcset], link[rel="stylesheet"], link[rel="icon"]').each do |node|
    url = node['href'] || node['src'] || node['srcset']
    next unless url&.start_with?('/') && !url.start_with?('//')
    path, fragment = url.split('#', 2)
    target = root.join(URI::DEFAULT_PARSER.unescape(path.split('?').first.sub(%r{^/}, '')))
    target = target.join('index.html') if target.directory?
    target = Pathname.new(target.to_s + '.html') if !target.file? && Pathname.new(target.to_s + '.html').file?
    errors << "#{file}: missing local resource #{url}" unless target.file?
    if fragment && target.file? && target.extname == '.html'
      linked = Nokogiri::HTML(target.read)
      errors << "#{file}: missing anchor #{url}" unless linked.xpath('//*[@id=$id]', nil, id: fragment).any?
    end
  end
end
home = Nokogiri::HTML(root.join('index.html').read)
errors << 'Home must show five recent updates' unless home.css('.updates > .news-list > li').size == 5
errors << 'Older updates must be collapsed initially' if home.at_css('details[open]')
errors << 'Older updates missing' unless home.css('details .news-item').size == 3
errors << 'Homepage should not contain a publication list' unless home.css('.publication-list').empty?
pubs = Nokogiri::HTML(root.join('publications/index.html').read)
errors << 'Expected seven selected publications' unless pubs.css('.publication-item').size == 7
errors << 'Unexpected publication years' unless pubs.css('.publication-year > h2').map(&:text) == %w[2026 2025 2022 2021 2020]
%w[index.html publications/index.html cv/index.html].each do |file|
  doc = Nokogiri::HTML(root.join(file).read)
  errors << "#{file}: active navigation missing" unless doc.css('nav a[aria-current="page"]').size == 1
  errors << "#{file}: executable JS dependency" unless doc.css('script').all? { |n| n['type'] == 'application/ld+json' }
end
%w[about/index.html about.html resume.html].each do |file|
  candidate = root.join(file)
  errors << "Missing redirect #{file}" unless candidate.file? && Nokogiri::HTML(candidate.read).at_css('meta[http-equiv="refresh"]')
end
%w[teaching talks portfolio blogs markdown collection-archive page-archive talkmap].each do |path|
  errors << "Template content published: #{path}" if root.join(path).exist? || root.join(path + '.html').exist?
  errors << "Template content in sitemap: #{path}" if root.join('sitemap.xml').read.match?(%r{/#{Regexp.escape(path)}(?:/|\.html|<)})
end
errors << 'CV PDF missing' unless root.join('files/nanbo_li_resume.pdf').file?
abort errors.join("\n") unless errors.empty?
puts "PASS: #{pages.size} HTML pages, local resources, publication list, navigation, redirects, news disclosure and template exclusions."
