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

  var THUMBS = ["_thumbnail.png", "_thumbnail.PNG", "_thumbnail.jpg", "_thumbnail.JPG", "_thumbnail.jpeg", "_thumbnail.webp"];

  list.forEach(function (game) {
    var href = 'game.html?slug=' + encodeURIComponent(game.slug);

    var card = document.createElement('article');
    card.className = 'game-card';

    var media = document.createElement('a');
    media.className = 'media game-card__media';
    media.href = href;
    media.setAttribute('aria-label', game.title + ' — view');
    resolveCover(media, game);

    var title = document.createElement('h3');
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

  function setBg(m, u) { m.style.backgroundImage = "url('" + u + "')"; }

  // Same cover priority as the portfolio: cover -> _thumbnail.* -> screenshot -> YouTube thumb.
  function resolveCover(media, game) {
    if (game.cover) { setBg(media, assetURL(game.cover)); return; }
    var folder = "assets/images/games/" + game.slug + "/";
    tryThumb(0);
    function tryThumb(i) {
      if (i >= THUMBS.length) { fallback(); return; }
      var url = assetURL(folder + THUMBS[i]);
      var probe = new Image();
      probe.onload = function () { setBg(media, url); };
      probe.onerror = function () { tryThumb(i + 1); };
      probe.src = url;
    }
    function fallback() {
      if (game.screenshots && game.screenshots[0]) { setBg(media, assetURL(game.screenshots[0])); return; }
      var id = youtubeId(game.youtube);
      if (id) {
        setBg(media, "https://img.youtube.com/vi/" + id + "/mqdefault.jpg");
        var hi = new Image();
        hi.onload = function () { if (hi.naturalWidth > 120) setBg(media, "https://img.youtube.com/vi/" + id + "/maxresdefault.jpg"); };
        hi.src = "https://img.youtube.com/vi/" + id + "/maxresdefault.jpg";
      }
    }
  }
})();
