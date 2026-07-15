// Encode a file path so spaces / punctuation in filenames load correctly,
// while keeping the folder slashes intact. Used everywhere media is shown.
function assetURL(path) {
  if (!path) return "";
  return path.split("/").map(encodeURIComponent).join("/");
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
