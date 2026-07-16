// Builds the Portfolio grid from the GAMES list in games.js
(function () {
  var grid = document.getElementById('games-grid');
  if (!grid || typeof GAMES === 'undefined') return;

  // Thumbnail file to look for in each game's folder (any of these, first that loads).
  var THUMB_NAMES = [
    "_thumbnail.png", "_thumbnail.PNG",
    "_thumbnail.jpg", "_thumbnail.JPG",
    "_thumbnail.jpeg", "_thumbnail.webp"
  ];

  GAMES.forEach(function (game) {
    var href = 'game.html?slug=' + encodeURIComponent(game.slug);

    var card = document.createElement('article');
    card.className = 'game-card';

    var media = document.createElement('a');
    media.className = 'media game-card__media';
    media.href = href;
    media.setAttribute('aria-label', game.title + ' — view');

    resolveCover(media, game);

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

  function setBg(media, url) { media.style.backgroundImage = "url('" + url + "')"; }

  // Cover priority:
  //   1. explicit "cover" in games.js (if you want a specific file)
  //   2. auto: "_thumbnail.*" inside assets/images/games/<slug>/
  //   3. first screenshot
  //   4. the YouTube trailer's thumbnail
  //   5. dark placeholder
  function resolveCover(media, game) {
    if (game.cover) { setBg(media, assetURL(game.cover)); return; }

    var folder = "assets/images/games/" + game.slug + "/";
    tryThumb(0);

    function tryThumb(i) {
      if (i >= THUMB_NAMES.length) { fallback(); return; }
      var url = assetURL(folder + THUMB_NAMES[i]);
      var probe = new Image();
      probe.onload = function () { setBg(media, url); };
      probe.onerror = function () { tryThumb(i + 1); };
      probe.src = url;
    }

    function fallback() {
      if (game.screenshots && game.screenshots[0]) {
        setBg(media, assetURL(game.screenshots[0])); return;
      }
      var id = youtubeId(game.youtube);
      if (id) {
        setBg(media, "https://img.youtube.com/vi/" + id + "/mqdefault.jpg");
        var hi = new Image();
        hi.onload = function () {
          if (hi.naturalWidth > 120) setBg(media, "https://img.youtube.com/vi/" + id + "/maxresdefault.jpg");
        };
        hi.src = "https://img.youtube.com/vi/" + id + "/maxresdefault.jpg";
      }
      // else: dark placeholder from the .media class
    }
  }
})();
