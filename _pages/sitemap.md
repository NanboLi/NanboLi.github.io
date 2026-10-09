---
layout: single
title: "Sitemap"
permalink: /sitemap/
excerpt: "Pages and selected publications on Li Nanbo's website."
---
<h2>Pages</h2>
<ul class="sitemap-list">{% for link in site.data.navigation.main %}<li><a href="{{ link.url | relative_url }}">{{ link.title }}</a></li>{% endfor %}</ul>
<h2>Publications</h2>
<ul class="sitemap-list">{% assign publications = site.publications | sort: 'date' | reverse %}{% for publication in publications %}<li><a href="{{ publication.url | relative_url }}">{{ publication.title }}</a></li>{% endfor %}</ul>
