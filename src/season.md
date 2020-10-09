---
layout: base.njk
templateEngineOverride: njk
pagination:
  data: pitwall.years
  size: 1
  alias: year
permalink: /{{ year }}/index.html
---
<section class="race-grid content-container">
{% for item in pitwall.races %}
{% if item.year == year %}
{% for race in item.races %}
{% include 'partials/RaceTable.njk' %}
{% endfor %}
{% endif %}
{% endfor %}
</section>
