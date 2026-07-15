// Encode a file path so spaces / punctuation in filenames load correctly,
// while keeping the folder slashes intact. Used everywhere media is shown.
function assetURL(path) {
  if (!path) return "";
  return path.split("/").map(encodeURIComponent).join("/");
}

// Turn any YouTube link into an embeddable URL.
// Accepts full watch URLs (with &t= start time or &list=), youtu.be links,
// already-embed URLs, or a bare video ID. Returns "" if nothing usable.
function youtubeEmbed(url) {
  if (!url) return "";
  var id = "", start = 0;
  try {
    var u = new URL(url);
    if (u.hostname.indexOf("youtu.be") !== -1) {
      id = u.pathname.slice(1);
    } else if (u.pathname.indexOf("/embed/") === 0) {
      id = u.pathname.split("/embed/")[1];
    } else {
      id = u.searchParams.get("v") || "";
    }
    var t = u.searchParams.get("t") || u.searchParams.get("start");
    if (t) start = parseInt(t, 10) || 0;   // handles "207" and "207s"
  } catch (e) {
    id = url;                               // assume a bare video ID was pasted
  }
  if (!id) return "";
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
