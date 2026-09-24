// Builds the "Featured games" row on the home page from the GAMES list.
(function () {
  var grid = document.getElementById('featured-games');
  if (!grid || typeof GAMES === 'undefined') return;

  // Choose which games to feature, by slug. Leave the array empty to
  // automatically use the first three games in games.js.
  var FEATURED_SLUGS = ["slime-venture", "the-dissapearance", "the-empty-vessel"];

  var list = FEATURED_SLUGS.length
    ? FEATURED_SLUGS.map(function (sl) { return GAMES.filter(function (g) { return g.slug === sl; })[0]; }).filter(Boolean)
    : GAMES.slice(0, 3);

  list.forEach(function (game) {
    grid.appendChild(buildGameCard(game));
  });
})();
