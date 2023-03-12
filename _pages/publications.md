---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

You can check [my Google Scholar profile](https://scholar.google.com/citations?user=wa2S8OEAAAAJ) for a comprehensive list of my publications.


## Selected Works  
------

{% include base_path %}

{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}
