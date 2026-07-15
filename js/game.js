// Renders a single game page from ?slug=... using the GAMES list.
(function () {
  var root = document.getElementById('game-root');
  if (!root || typeof GAMES === 'undefined') return;

  var params = new URLSearchParams(window.location.search);
  var slug = params.get('slug');
  var game = GAMES.filter(function (g) { return g.slug === slug; })[0];

  if (!game) {
    root.innerHTML =
      '<a class="backlink" href="portfolio.html">&larr; All games</a>' +
      '<h1 class="display game-detail__title">Game not found.</h1>' +
      '<p class="game-detail__desc">Pick a title from the <a href="portfolio.html">portfolio</a>.</p>';
    return;
  }

  document.title = game.title + ' — Dusk Games Interactive';

  var html = '';
  html += '<a class="backlink" href="portfolio.html">&larr; All games</a>';
  html += '<p class="eyebrow">' + esc(game.genre || '') + '</p>';
  html += '<h1 class="display game-detail__title">' + esc(game.title) + '</h1>';

  var embed = youtubeEmbed(game.youtube);
  if (embed) {
    html += '<div class="video-frame">' +
              '<iframe src="' + embed + '" title="' + esc(game.title) + ' trailer" ' +
              'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ' +
              'allowfullscreen loading="lazy"></iframe>' +
            '</div>';
  }

  if (game.description) {
    html += '<p class="game-detail__desc">' + esc(game.description) + '</p>';
  }

  if (game.itch) {
    html += '<div class="game-detail__cta">' +
              '<a class="btn" href="' + game.itch + '" target="_blank" rel="noopener">Play on itch.io</a>' +
            '</div>';
  }

  var shots = game.screenshots || [];
  if (shots.length) {
    html += '<div class="gallery">';
    shots.forEach(function (src, i) {
      html += '<button class="media gallery__item" data-index="' + i + '" ' +
              'style="background-image:url(\'' + assetURL(src) + '\')" ' +
              'aria-label="Open screenshot ' + (i + 1) + '"></button>';
    });
    html += '</div>';
  }

  root.innerHTML = html;

  // ---- Lightbox ----
  if (!shots.length) return;
  var current = 0;

  var box = document.createElement('div');
  box.className = 'lightbox';
  box.innerHTML =
    '<button class="lightbox__close" aria-label="Close">&times;</button>' +
    '<button class="lightbox__nav lightbox__nav--prev" aria-label="Previous">&#8249;</button>' +
    '<img class="lightbox__img" alt="Screenshot" />' +
    '<button class="lightbox__nav lightbox__nav--next" aria-label="Next">&#8250;</button>';
  document.body.appendChild(box);

  var img = box.querySelector('.lightbox__img');

  function show(i) {
    current = (i + shots.length) % shots.length;
    img.src = assetURL(shots[current]);
  }
  function open(i) { show(i); box.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function close() { box.classList.remove('open'); document.body.style.overflow = ''; }

  root.querySelectorAll('.gallery__item').forEach(function (el) {
    el.addEventListener('click', function () { open(parseInt(el.dataset.index, 10)); });
  });
  box.querySelector('.lightbox__close').addEventListener('click', close);
  box.querySelector('.lightbox__nav--prev').addEventListener('click', function () { show(current - 1); });
  box.querySelector('.lightbox__nav--next').addEventListener('click', function () { show(current + 1); });
  box.addEventListener('click', function (e) { if (e.target === box) close(); });
  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
  }); }
})();
