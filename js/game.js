// Renders a single game page from ?slug=... using the GAMES list.
// The data layer (js/games.js) is untouched — this only decides presentation.
(function () {
  var root = document.getElementById('game-root');
  if (!root || typeof GAMES === 'undefined') return;

  var params = new URLSearchParams(window.location.search);
  var slug = params.get('slug');
  var game = GAMES.filter(function (g) { return g.slug === slug; })[0];

  if (!game) {
    root.innerHTML =
      '<section class="page-head"><div class="wrap">' +
      '<a class="backlink" href="portfolio.html">&larr; All games</a>' +
      '<h1 class="display page-head__title">Game not found.</h1>' +
      '<p class="page-head__lede">Pick a title from the <a class="link" href="portfolio.html">catalogue</a>.</p>' +
      '</div></section>';
    return;
  }

  document.title = game.title + ' — Dusk Games Interactive';
  var meta = document.querySelector('meta[name="description"]');
  if (meta && game.description) meta.setAttribute('content', game.description);

  // devlogs that exist as their own pages, by slug
  var DEVLOGS = {
    'rubble-rumble': 'devlog-rubble-rumble.html',
    'project-sosei': 'devlog-project-sosei.html'
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // ---- split the genre string into individual spec chips ----
  var parts = (game.genre || '').split('·').map(function (p) { return p.trim(); }).filter(Boolean);
  var status = '';
  if (parts.length && /release|tba|coming|out now/i.test(parts[0])) {
    status = parts.shift().replace(/^release\s*date\s*/i, '').trim() || 'TBA';
  }

  // ================= HERO =================
  var hasTrailer = !!youtubeEmbed(game.youtube);
  var hasShots = !!(game.screenshots && game.screenshots.filter(Boolean).length);

  var hero = document.createElement('section');
  hero.className = 'game-hero' + (!hasTrailer && !hasShots ? ' game-hero--solo' : '');
  hero.innerHTML =
    '<div class="game-hero__bg" id="game-hero-bg" aria-hidden="true"></div>' +
    '<div class="wrap game-hero__inner">' +
      '<a class="backlink" href="portfolio.html">&larr; All games</a>' +
      (parts.length ? '<p class="game-hero__genre">' + esc(parts.join(' · ')) + '</p>' : '') +
      '<h1 class="display game-hero__title">' + esc(game.title) + '</h1>' +
      (game.description ? '<p class="game-hero__desc">' + esc(game.description) + '</p>' : '') +
      '<div class="game-hero__actions"></div>' +
    '</div>';
  root.appendChild(hero);

  resolveCover(hero.querySelector('#game-hero-bg'), game);

  var actions = hero.querySelector('.game-hero__actions');
  var acts = [];
  if (game.itch) acts.push(['Play on itch.io', esc(game.itch), ' target="_blank" rel="noopener"']);
  if (game.youtube) acts.push(['Watch trailer', '#trailer', '']);
  if (DEVLOGS[game.slug]) acts.push(['Read the devlog', DEVLOGS[game.slug], '']);
  acts.forEach(function (a, i) {
    actions.innerHTML += '<a class="btn ' + (i === 0 ? 'btn--primary' : 'btn--ghost') +
      '" href="' + a[1] + '"' + a[2] + '><span>' + a[0] + '</span></a>';
  });
  if (!actions.children.length) actions.remove();

  // ================= SPECS =================
  var specItems = [];
  if (status) specItems.push(['Status', status]);
  if (parts.length) specItems.push(['Genre', parts[0]]);
  if (game.screenshots && game.screenshots.length) specItems.push(['Screens', game.screenshots.length]);
  specItems.push(['Studio', 'Dusk Games']);

  var specSection = document.createElement('section');
  specSection.className = 'section--tight';
  specSection.innerHTML =
    '<div class="wrap"><dl class="specs reveal">' +
    specItems.map(function (s) {
      return '<div class="spec"><dt>' + esc(s[0]) + '</dt><dd>' + esc(s[1]) + '</dd></div>';
    }).join('') +
    '</dl></div>';
  root.appendChild(specSection);

  // ================= TRAILER =================
  var embed = youtubeEmbed(game.youtube);
  if (embed) {
    var trailer = document.createElement('section');
    trailer.className = 'section--tight reel';
    trailer.id = 'trailer';
    trailer.innerHTML =
      '<div class="wrap">' +
        '<div class="section__head reveal"><h2 class="display section__title">Trailer.</h2></div>' +
        '<div class="video-frame reveal">' +
          '<iframe src="' + esc(embed) + '" title="' + esc(game.title) + ' trailer" ' +
          'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
          'allowfullscreen loading="lazy"></iframe>' +
        '</div>' +
      '</div>';
    root.appendChild(trailer);
  }

  // ================= SCREENSHOTS =================
  var shots = (game.screenshots || []).filter(Boolean);
  if (shots.length) {
    var gal = document.createElement('section');
    gal.className = 'section--tight';
    gal.innerHTML =
      '<div class="wrap">' +
        '<div class="section__head reveal"><h2 class="display section__title">Screenshots.</h2>' +
        '<span class="eyebrow" style="margin:0">' + shots.length + ' images</span></div>' +
        '<div class="gallery reveal" id="game-gallery"></div>' +
      '</div>';
    root.appendChild(gal);

    var grid = gal.querySelector('#game-gallery');
    shots.forEach(function (src, i) {
      var b = document.createElement('button');
      b.className = 'gallery__item';
      b.type = 'button';
      b.setAttribute('aria-label', 'Open screenshot ' + (i + 1));
      b.style.backgroundImage = "url('" + assetURL(src) + "')";
      b.addEventListener('click', function () { openLightbox(i); });
      grid.appendChild(b);
    });

    buildLightbox(shots);
  }

  // ================= MORE FROM THE STUDIO =================
  var others = GAMES.filter(function (g) { return g.slug !== game.slug; }).slice(0, 3);
  if (others.length) {
    var more = document.createElement('section');
    more.className = 'section section--band';
    more.innerHTML =
      '<div class="wrap">' +
        '<div class="section__head reveal"><h2 class="display section__title">More from the studio.</h2>' +
        '<a class="link" href="portfolio.html">View all games &rarr;</a></div>' +
        '<div class="catalogue catalogue--3" id="more-games"></div>' +
      '</div>';
    root.appendChild(more);
    var mg = more.querySelector('#more-games');
    others.forEach(function (g) { mg.appendChild(buildGameCard(g)); });
  }

  // ================= LIGHTBOX =================
  var lb, lbImg, idx = 0, list = [];
  function buildLightbox(items) {
    list = items;
    lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Screenshot viewer');
    lb.innerHTML =
      '<button class="lightbox__close" aria-label="Close">&times;</button>' +
      '<button class="lightbox__nav lightbox__nav--prev" aria-label="Previous">&#8249;</button>' +
      '<img class="lightbox__img" alt="" />' +
      '<button class="lightbox__nav lightbox__nav--next" aria-label="Next">&#8250;</button>';
    document.body.appendChild(lb);
    lbImg = lb.querySelector('.lightbox__img');

    lb.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
    lb.querySelector('.lightbox__nav--prev').addEventListener('click', function () { step(-1); });
    lb.querySelector('.lightbox__nav--next').addEventListener('click', function () { step(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    });
  }
  function show() { lbImg.src = assetURL(list[idx]); lbImg.alt = game.title + ' screenshot ' + (idx + 1); }
  function step(d) { idx = (idx + d + list.length) % list.length; show(); }
  function openLightbox(i) {
    idx = i; show();
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    lb.querySelector('.lightbox__close').focus();
  }
  function closeLightbox() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
})();
