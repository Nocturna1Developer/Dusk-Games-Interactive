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

    if (coverPath) {
      // 1) Use your own cover image if set (or the first screenshot).
      media.style.backgroundImage = "url('" + assetURL(coverPath) + "')";
    } else {
      // 2) Otherwise fall back to the YouTube trailer's thumbnail.
      var id = youtubeId(game.youtube);
      if (id) {
        // Start with a clean thumbnail that always exists...
        media.style.backgroundImage = "url('https://img.youtube.com/vi/" + id + "/mqdefault.jpg')";
        // ...then upgrade to the crisp hi-res one if the video has it.
        var hi = new Image();
        hi.onload = function () {
          if (hi.naturalWidth > 120) {  // 120 = YouTube's "not available" placeholder
            media.style.backgroundImage = "url('https://img.youtube.com/vi/" + id + "/maxresdefault.jpg')";
          }
        };
        hi.src = "https://img.youtube.com/vi/" + id + "/maxresdefault.jpg";
      }
      // 3) If there's no cover and no trailer, the dark placeholder shows.
    }

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
