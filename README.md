# Li Nanbo — personal website

A static Jekyll website for GitHub Pages. A warm book-page layout, abstract Eastern landscapes, and readable research content. Built on Academic Pages / Minimal Mistakes; the original MIT license is retained in `LICENSE`.

## Local development

Use Ruby 3.3 (tested with 3.3.12) and Bundler 2.4.9. On Apple Silicon macOS, `brew install ruby@3.3` provides a compatible runtime. The helper prefers that installation without modifying your shell configuration.

```sh
# With Ruby 3.3 on PATH, install Bundler locally:
GEM_HOME="$PWD/vendor/bootstrap" GEM_PATH="$PWD/vendor/bootstrap" GEM_SPEC_CACHE="$PWD/vendor/gem-cache" gem install bundler -v 2.4.9 --no-document
bash scripts/site install
bash scripts/site serve
```

Open http://localhost:4000. For a production build and structural checks:

```sh
bash scripts/site build
bash scripts/site check
```

`Gemfile.lock` retains the GitHub Pages dependency set, adds the local macOS platform, and pins Logger 1.5.3 for compatibility with Jekyll 3.9 on Ruby 3.3. Generated output and dependencies stay in ignored `_site/` and `vendor/` directories. No deployment is performed by these commands.

## Content editing

- `_pages/about.md`: short biography and research overview.
- `_data/news.yml`: dated Markdown updates. The newest five are visible; the remainder are in a native disclosure. Dates with only month precision use the first of that month, and equal-date items are reversed by the descending sort.
- `_publications/`: one Markdown document per selected paper. Keep existing `permalink` values. Required metadata: `title`, `date`, `venue`, `author_list`, `paperurl`; optional `summary`, `codeurl`, `projecturl`, `award`, `equal_contribution`, `tags`. The optional `tags` array renders as a comma-separated topic line at the bottom of each publication entry (for example, `tags: ["sequence modelling", "world models"]`). Dates determine the displayed conference year and sort order, not a claimed exact publication day. Use `<strong>Li Nanbo</strong>` in author lists; † denotes equal contribution.
- `_pages/cv.md`: web CV. The downloadable PDF in `files/` is maintained separately and was not rewritten in this redesign.
- `_config.yml`: identity, contact links, and explicit exclusions of unused template pages.
- `_sass/_ink.scss`: shared design and responsive styles.

Existing `/about/`, `/about.html`, `/resume` redirects and publication permalinks remain. Template sources are retained but excluded from publishing and sitemaps. This includes dormant blog, teaching, talks, and portfolio sections.

## Artwork and verification

See `docs/design-notes.md` for artwork provenance, the generation prompt, and content sources. Before publishing, inspect Home, Publications, CV and a paper detail at 375px, 768px and 1440px; exercise keyboard navigation, Earlier updates, PDF download and the legacy redirects.
