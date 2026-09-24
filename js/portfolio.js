// Builds the Games catalogue from the GAMES list in games.js
(function () {
  var grid = document.getElementById('games-grid');
  if (!grid || typeof GAMES === 'undefined') return;

  GAMES.forEach(function (game) {
    grid.appendChild(buildGameCard(game));
  });

  var count = document.getElementById('games-count');
  if (count) count.textContent = GAMES.length;
})();
