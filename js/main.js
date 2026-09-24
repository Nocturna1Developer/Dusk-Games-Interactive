// =========================================================
// Shared site behaviour + helpers.
// Loaded first on every page, before games.js / home.js / portfolio.js.
// =========================================================

// Encode a file path so spaces / punctuation in filenames load correctly,
// while keeping the folder slashes intact. Used everywhere media is shown.
function assetURL(path) {
  if (!path) return "";
  return path.split("/").map(encodeURIComponent).join("/");
}

// Pull the video ID out of any YouTube link (watch URL, youtu.be, embed,
// or a bare ID). Returns "" if none.
function youtubeId(url) {
  if (!url) return "";
  try {
    var u = new URL(url);
    if (u.hostname.indexOf("youtu.be") !== -1) return u.pathname.slice(1);
    if (u.pathname.indexOf("/embed/") === 0) return u.pathname.split("/embed/")[1];
    return u.searchParams.get("v") || "";
  } catch (e) {
    return url;  // assume a bare video ID was pasted
  }
}

// Build an embeddable URL, preserving a &t= / start time if present.
function youtubeEmbed(url) {
  var id = youtubeId(url);
  if (!id) return "";
  var start = 0;
  try {
    var u = new URL(url);
    var t = u.searchParams.get("t") || u.searchParams.get("start");
    if (t) start = parseInt(t, 10) || 0;   // handles "207" and "207s"
  } catch (e) {}
  return "https://www.youtube.com/embed/" + id + (start ? "?start=" + start : "");
}

// ---------------------------------------------------------
// Cover art resolution. Priority:
//   1. explicit "cover" in games.js
//   2. "_thumbnail.*" inside assets/images/games/<slug>/
//   3. first screenshot
//   4. the YouTube trailer's thumbnail
//   5. the dark placeholder the CSS already provides
// ---------------------------------------------------------
var THUMB_NAMES = [
  "_thumbnail.png", "_thumbnail.PNG",
  "_thumbnail.jpg", "_thumbnail.JPG",
  "_thumbnail.jpeg", "_thumbnail.webp"
];

function resolveCover(el, game, done) {
  function set(url) {
    el.style.backgroundImage = "url('" + url + "')";
    if (done) done(url);
  }
  if (game.cover) { set(assetURL(game.cover)); return; }

  var folder = "assets/images/games/" + game.slug + "/";
  tryThumb(0);

  function tryThumb(i) {
    if (i >= THUMB_NAMES.length) { fallback(); return; }
    var url = assetURL(folder + THUMB_NAMES[i]);
    var probe = new Image();
    probe.onload = function () { set(url); };
    probe.onerror = function () { tryThumb(i + 1); };
    probe.src = url;
  }

  function fallback() {
    if (game.screenshots && game.screenshots[0]) { set(assetURL(game.screenshots[0])); return; }
    var id = youtubeId(game.youtube);
    if (id) {
      set("https://img.youtube.com/vi/" + id + "/mqdefault.jpg");
      var hi = new Image();
      hi.onload = function () { if (hi.naturalWidth > 120) set("https://img.youtube.com/vi/" + id + "/maxresdefault.jpg"); };
      hi.src = "https://img.youtube.com/vi/" + id + "/maxresdefault.jpg";
    }
  }
}

// Shorten the long genre strings in games.js down to the first segment,
// so a card reads "Top Down" rather than the full release-status line.
function shortGenre(genre) {
  if (!genre) return "";
  var parts = genre.split("·").map(function (p) { return p.trim(); }).filter(Boolean);
  if (!parts.length) return "";
  // drop a leading "RELEASE DATE TBA" style status if there is more after it
  if (parts.length > 1 && /release|tba|coming/i.test(parts[0])) parts.shift();
  return parts.slice(0, 2).join(" · ");
}

// ---------------------------------------------------------
// One game card, used by the home page and the games catalogue.
// The whole tile is a single link; metadata rides on the art.
// ---------------------------------------------------------
function buildGameCard(game) {
  var href = 'game.html?slug=' + encodeURIComponent(game.slug);

  var card = document.createElement('article');
  card.className = 'game-card reveal';

  var media = document.createElement('div');
  media.className = 'game-card__media';
  media.setAttribute('role', 'img');
  media.setAttribute('aria-label', game.title);
  resolveCover(media, game);

  var body = document.createElement('div');
  body.className = 'game-card__body';

  var genre = shortGenre(game.genre);
  if (genre) {
    var meta = document.createElement('p');
    meta.className = 'game-card__meta';
    meta.textContent = genre;
    body.appendChild(meta);
  }

  var title = document.createElement('h3');
  title.className = 'display game-card__title';
  title.textContent = game.title;
  body.appendChild(title);

  if (game.description) {
    var desc = document.createElement('p');
    desc.className = 'game-card__desc';
    desc.textContent = game.description;
    body.appendChild(desc);
  }

  var cue = document.createElement('span');
  cue.className = 'game-card__cue';
  cue.setAttribute('aria-hidden', 'true');
  cue.textContent = 'View game →';
  body.appendChild(cue);

  media.appendChild(body);

  var link = document.createElement('a');
  link.className = 'game-card__link';
  link.href = href;
  link.innerHTML = '<span>' + game.title + '</span>';

  card.appendChild(media);
  card.appendChild(link);
  return card;
}

// ---------------------------------------------------------
// Navigation
// ---------------------------------------------------------
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  if (!toggle || !nav) return;

  function setOpen(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('nav-open', open);
  }

  toggle.addEventListener('click', function () {
    setOpen(!nav.classList.contains('open'));
  });

  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') setOpen(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      setOpen(false);
      toggle.focus();
    }
  });
})();

// ---------------------------------------------------------
// Header: publish its height for the full-frame hero, and condense
// into a blurred bar once the page moves.
// ---------------------------------------------------------
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;

  function publishHeight() {
    document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
  }
  publishHeight();
  window.addEventListener('resize', publishHeight, { passive: true });
  window.addEventListener('load', publishHeight);

  // Reading scrollY is cheap and the DOM is only touched when the state
  // actually flips, so this needs no rAF throttle to stay smooth.
  var isOn = null;
  function update() {
    var shouldBeOn = window.scrollY > 24;
    if (shouldBeOn === isOn) return;
    isOn = shouldBeOn;
    header.classList.toggle('is-scrolled', shouldBeOn);
  }
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
})();

// ---------------------------------------------------------
// Scroll reveal: one short fade-and-rise the first time a block
// enters view. Elements are only hidden once JS confirms it can
// reveal them again, and a safety net shows everything if the
// observer never delivers.
// ---------------------------------------------------------
(function () {
  function init() {
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var items = [].slice.call(document.querySelectorAll('.reveal'));
    if (!items.length) return;

    // stagger direct siblings inside a grid
    items.forEach(function (el) {
      var parent = el.parentElement;
      if (!parent) return;
      var sibs = [].filter.call(parent.children, function (c) { return c.classList.contains('reveal'); });
      var i = sibs.indexOf(el);
      if (i > 0) el.style.transitionDelay = Math.min(i, 4) * 80 + 'ms';
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    items.forEach(function (el) { io.observe(el); });

    // Reveal is a presentation nicety, never a reason for content to stay
    // hidden. If the observer has delivered nothing at all, show everything.
    setTimeout(function () {
      if (document.querySelector('.reveal.is-in')) return;
      items.forEach(function (el) { el.classList.add('is-in'); });
    }, 2500);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
