---
layout: base.njk
templateEngineOverride: njk
pagination:
  data: currentDate
  size: 1
  alias: year
title: The Pitwall
permalink: /index.html
---
<section class="race-grid content-container content-tab" aria-hidden="false" role="tabpanel" aria-labelledby="race-results-button">
  {% for race in pitwall.races[year] %}

    {% include 'partials/RaceTable.njk' %}
  
  {% endfor %}
</section>

<section class="standings-data content-container content-tab" aria-hidden="true" role="tabpanel" aria-labelledby="standings-button">

  {% include 'partials/DriversStandings.njk' %}

  {% include 'partials/ConstructorsStandings.njk' %}

</section>