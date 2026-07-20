// Reliable autoplay for the hero background video.
//
// The previous approach (a plain <iframe src="...&autoplay=1&mute=1...">)
// leaves autoplay entirely up to the browser reading URL parameters, which is
// inconsistent — it's especially unreliable on mobile Safari/Chrome. Loading
// the video through YouTube's actual Player API and explicitly calling
// mute() + playVideo() in JavaScript is respected far more consistently.
// As a last-resort safety net, if a browser still blocks autoplay outright,
// playback silently starts on the visitor's first tap/scroll/click instead of
// never starting at all.
(function () {
  var mount = document.getElementById('hero-yt-player');
  if (!mount) return;

  var VIDEO_ID = 'JP2-1NQUMZ4'; // change this to feature a different clip

  var player = null;
  function tryPlay() {
    if (!player) return;
    try { player.mute(); player.playVideo(); } catch (e) { /* player not ready yet */ }
  }

  // Load the IFrame API script (safe to call even if something else on the
  // page also needs it later — YouTube only loads it once).
  if (!window.YT || !window.YT.Player) {
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
  }

  var priorReady = window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady = function () {
    if (typeof priorReady === 'function') priorReady();
    player = new YT.Player('hero-yt-player', {
      videoId: VIDEO_ID,
      playerVars: {
        autoplay: 1, mute: 1, loop: 1, playlist: VIDEO_ID,
        controls: 0, showinfo: 0, modestbranding: 1, rel: 0,
        playsinline: 1, disablekb: 1, fs: 0, iv_load_policy: 3
      },
      events: {
        onReady: function () { tryPlay(); },
        onStateChange: function (e) {
          // Loop even if the loop/playlist trick doesn't kick in.
          if (e.data === YT.PlayerState.ENDED) {
            player.seekTo(0);
            player.playVideo();
          }
        }
      }
    });
  };

  // Fallback: some browsers block programmatic autoplay entirely, even
  // muted. If so, start playback on the visitor's first interaction instead
  // of leaving the hero frozen. Runs at most once.
  function kickstart() {
    tryPlay();
    ['touchstart', 'click', 'scroll', 'keydown'].forEach(function (evt) {
      document.removeEventListener(evt, kickstart);
    });
  }
  ['touchstart', 'click', 'scroll', 'keydown'].forEach(function (evt) {
    document.addEventListener(evt, kickstart, { passive: true });
  });
})();
