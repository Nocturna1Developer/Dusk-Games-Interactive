// Builds the "Players & creators" video grid on the home page.
// Add YouTube links (of people playing your games) to the VIDEOS list below —
// normal watch URLs are fine. Leave the list as-is until you have real ones.
(function () {
  var grid = document.getElementById('community-videos');
  if (!grid) return;

  var VIDEOS = [
    "https://www.youtube.com/watch?v=zNGz922bPyo",
    "https://www.youtube.com/watch?v=uGv_skjWO0Q",
    "https://www.youtube.com/watch?v=ZDAoqgfvDxg",
    "https://www.youtube.com/watch?v=c9F_RENkoe4",
  ];

  if (!VIDEOS.length) {
    grid.innerHTML = '<p class="community__empty">No videos yet — add some in js/community.js.</p>';
    return;
  }

  VIDEOS.forEach(function (url) {
    var embed = youtubeEmbed(url);
    if (!embed) return;
    var item = document.createElement('div');
    item.className = 'community__item';
    var f = document.createElement('iframe');
    f.src = embed;
    f.title = 'Community video';
    f.loading = 'lazy';
    f.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    f.setAttribute('allowfullscreen', '');
    item.appendChild(f);
    grid.appendChild(item);
  });
})();
