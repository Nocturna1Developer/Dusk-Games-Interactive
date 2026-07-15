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
