/* =========================================================
   GAMES DATA  —  THIS IS THE ONLY FILE YOU EDIT TO ADD MEDIA
   ---------------------------------------------------------
   One entry per game. For each game you can set:

     slug        used in the page URL (game.html?slug=...) and should
                 match the game's folder name under assets/
     title       shown on the site
     genre       small label under the title
     itch        link to the game's itch.io page
     description (optional) a sentence or two shown on the game page
     cover       the image used on the Portfolio card
     trailer     (optional) a video file — leave "" if none yet
     screenshots list of image files shown in the gallery

   PATHS: type the file path exactly as it is on disk, INCLUDING
   spaces and capital letters. GitHub Pages is case-sensitive, so
   "Level 2.PNG" and "level 2.png" are different files there. The
   code handles the spaces for you. Leaving cover/screenshots empty
   just shows a dark placeholder until you fill them in.

   Slime Venture below is filled in as a working example — copy its
   shape for the others.
   ========================================================= */

const GAMES = [
  {
    slug: "slime-venture",
    title: "Slime Venture",
    genre: "2.5D shooter",
    itch: "https://dusk-studios.itch.io/slime-venture",
    description: "",
    cover: "assets/images/games/slime-venture/Final Thumbnail 2.PNG",
    trailer: "assets/videos/slime-venture/SlimeVenture! Trailer.mp4",
    screenshots: [
      "assets/images/games/slime-venture/Level 1 Screenshot 2.PNG",
      "assets/images/games/slime-venture/Level 2 Screenshot 2.PNG",
      "assets/images/games/slime-venture/Level 2.PNG",
      "assets/images/games/slime-venture/Slime Fight.PNG"
    ]
  },

  {
    slug: "the-dissapearance",           // folder is spelled this way on itch/disk
    title: "The Disappearance",
    genre: "Survival horror",
    itch: "https://dusk-studios.itch.io/the-dissapearance",
    description: "",
    cover: "",                            // e.g. assets/images/games/the-dissapearance/thumbnail.png
    trailer: "",                          // e.g. assets/videos/the-dissapearance/trailer.mp4
    screenshots: [
      // "assets/images/games/the-dissapearance/screenshot 1.png",
      // "assets/images/games/the-dissapearance/screenshot 2.png"
    ]
  },

  {
    slug: "the-ruins-of-ishgar",
    title: "The Ruins of Ishgar",
    genre: "Adventure",
    itch: "https://dusk-studios.itch.io/the-ruins-of-ishgar",
    description: "",
    cover: "",
    trailer: "",
    screenshots: []
  },

  {
    slug: "the-empty-vessel",
    title: "The Empty Vessel",
    genre: "Shooter",
    itch: "https://dusk-studios.itch.io/the-empty-vessel",
    description: "",
    cover: "",
    trailer: "",
    screenshots: []
  },

  {
    slug: "the-lost-legacy",
    title: "The Lost Legacy",
    genre: "Platformer",
    itch: "https://dusk-studios.itch.io/the-lost-legacy",
    description: "",
    cover: "",
    trailer: "",
    screenshots: []
  },

  {
    slug: "the-crystal-journey",
    title: "The Crystal Journey",
    genre: "Platformer · Game jam",
    itch: "https://dusk-studios.itch.io/the-crystal-journey",
    description: "",
    cover: "",
    trailer: "",
    screenshots: []
  },

  {
    slug: "mission-earth",
    title: "Mission Earth",
    genre: "Adventure · First game",
    itch: "https://dusk-studios.itch.io/mission-earth",
    description: "",
    cover: "",
    trailer: "",
    screenshots: []
  }
];
