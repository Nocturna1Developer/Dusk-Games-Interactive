// Builds the Portfolio grid from the GAMES list in games.js
(function () {
  var grid = document.getElementById('games-grid');
  if (!grid || typeof GAMES === 'undefined') return;

  GAMES.forEach(function (game) {
    var coverPath = game.cover || (game.screenshots && game.screenshots[0]) || '';
    var href = 'game.html?slug=' + encodeURIComponent(game.slug);

    var card = document.createElement('article');
    card.className = 'game-card';

    var media = document.createElement('a');
    media.className = 'media game-card__media';
    media.href = href;
    media.setAttribute('aria-label', game.title + ' — view');
    if (coverPath) media.style.backgroundImage = "url('" + assetURL(coverPath) + "')";

    var title = document.createElement('h2');
    title.className = 'display game-card__title';
    title.textContent = game.title;

    var meta = document.createElement('p');
    meta.className = 'game-card__meta';
    meta.textContent = game.genre || '';

    var btn = document.createElement('a');
    btn.className = 'btn btn--block';
    btn.href = href;
    btn.textContent = 'View game';

    card.appendChild(media);
    card.appendChild(title);
    card.appendChild(meta);
    card.appendChild(btn);
    grid.appendChild(card);
  });
})();
