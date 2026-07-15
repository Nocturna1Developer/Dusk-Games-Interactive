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
     youtube     the trailer — just paste the YouTube link (the normal
                 "watch?v=..." URL is fine, timestamps and playlists and
                 all). Leave "" for no trailer.
     screenshots list of image files shown in the gallery

   IMAGE PATHS: type the file path exactly as it is on disk, INCLUDING
   spaces and capital letters — GitHub Pages is case-sensitive. Leaving
   cover/screenshots empty just shows a dark placeholder until you fill
   them in.
   ========================================================= */

const GAMES = [
  {
    slug: "slime-venture",
    title: "Slime Venture",
    genre: "2.5D shooter",
    itch: "https://dusk-studios.itch.io/slime-venture",
    description: "",
    cover: "assets/images/games/slime-venture/Final Thumbnail 2.PNG",
    youtube: "https://www.youtube.com/watch?v=r5-DEYGfWAA",
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
    cover: "",
    youtube: "https://www.youtube.com/watch?v=OprsYiEykEE&t=207s",
    screenshots: []
  },

  {
    slug: "the-ruins-of-ishgar",
    title: "The Ruins of Ishgar",
    genre: "Adventure",
    itch: "https://dusk-studios.itch.io/the-ruins-of-ishgar",
    description: "",
    cover: "",
    youtube: "https://www.youtube.com/watch?v=kP7kunFiuAQ&list=PLs_4rBValRlRsv5RgWV-eRb6QP06JnjH5&index=9",
    screenshots: []
  },

  {
    slug: "the-empty-vessel",
    title: "The Empty Vessel",
    genre: "Shooter",
    itch: "https://dusk-studios.itch.io/the-empty-vessel",
    description: "",
    cover: "",
    youtube: "https://www.youtube.com/watch?v=i-WyRDsDctM&t=266s",
    screenshots: []
  },

  {
    slug: "the-lost-legacy",
    title: "The Lost Legacy",
    genre: "Platformer",
    itch: "https://dusk-studios.itch.io/the-lost-legacy",
    description: "",
    cover: "",
    youtube: "https://www.youtube.com/watch?v=-L7wtfTd2Qw&list=PLs_4rBValRlRsv5RgWV-eRb6QP06JnjH5&index=10",
    screenshots: []
  },

  {
    slug: "the-crystal-journey",
    title: "The Crystal Journey",
    genre: "Platformer · Game jam",
    itch: "https://dusk-studios.itch.io/the-crystal-journey",
    description: "",
    cover: "",
    youtube: "https://www.youtube.com/watch?v=d_Re1ZdoClc&list=PLs_4rBValRlRsv5RgWV-eRb6QP06JnjH5&index=5",
    screenshots: []
  },

  {
    slug: "mission-earth",
    title: "Mission Earth",
    genre: "Adventure · First game",
    itch: "https://dusk-studios.itch.io/mission-earth",
    description: "",
    cover: "",
    youtube: "https://www.youtube.com/watch?v=bpe2EWl9Zog&list=PLs_4rBValRlRsv5RgWV-eRb6QP06JnjH5&index=8",
    screenshots: []
  }
];
