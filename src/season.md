---
layout: base.njk
pagination:
  data: pitwall.years
  size: 1
  alias: year
permalink: /{{ year }}/index.html
---
{{ year }}

{% for item in pitwall.races %}
{% if item.year == year %}
{% for race in item.races %}
{{ race.raceName }}
{% endfor %}
{% endif %}
{% endfor %}