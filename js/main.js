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

// Mobile navigation toggle
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

// Header: condense into a blurred bar once the page moves. Over the video
// hero the bar starts transparent (see .site-header rules in style.css).
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;

  // Publish the header's real height so the full-frame hero can subtract it
  // and still end exactly at the fold. Falls back to a sane value in CSS.
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
    if (shouldBeOn) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
})();

// Scroll reveal: a single short fade-and-rise the first time a block enters
// view. Added from JS so the site stays fully visible without it, and skipped
// entirely for reduced-motion users.
(function () {
  function init() {
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // blocks that reveal as a whole
    var SINGLE = '.story__grid, .genres__grid, .section-head, .section-center-title,' +
                 '.reel__eyebrow, .reel__title, .reel__frame,' +
                 '.socials__title, .socials .social-row, .press__note,' +
                 '.page-head, .post, .legal__body, .game-detail__cta, .video-frame';
    // grids whose children reveal in sequence
    var GROUPS = '.featured__grid, .home-dev__grid, .community__grid, .press__grid,' +
                 '.games__grid, .about__grid, .contact__grid, .gallery';

    var items = [];

    [].forEach.call(document.querySelectorAll(SINGLE), function (el) {
      el.classList.add('reveal');
      items.push(el);
    });

    [].forEach.call(document.querySelectorAll(GROUPS), function (grid) {
      [].forEach.call(grid.children, function (child, i) {
        child.classList.add('reveal');
        if (i > 0) child.style.transitionDelay = Math.min(i, 3) * 70 + 'ms';
        items.push(child);
      });
    });

    if (!items.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });

    items.forEach(function (el) { io.observe(el); });

    // Safety net: reveal is a presentation nicety, never a reason for content
    // to stay hidden. If the observer has delivered nothing at all, show
    // everything rather than risk an invisible page.
    setTimeout(function () {
      if (document.querySelector('.reveal.is-in')) return;
      items.forEach(function (el) { el.classList.add('is-in'); });
    }, 2500);
  }

  // run after the card-building scripts have populated their grids
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
