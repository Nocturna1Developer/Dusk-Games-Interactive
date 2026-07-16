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
     cover       (optional) a specific image for the Portfolio card. LEAVE
                 THIS "" and the card automatically uses a file named
                 "_thumbnail.png" inside that game's folder
                 (assets/images/games/<slug>/). Only set cover to override
                 that with a different file.
     youtube     the trailer — just paste the YouTube link (the normal
                 "watch?v=..." URL is fine, timestamps and playlists and
                 all). Leave "" for no trailer.
     screenshots list of image files shown in the gallery

   IMAGE PATHS: type the file path exactly as it is on disk, INCLUDING
   spaces and capital letters — GitHub Pages is case-sensitive. Leaving
   cover/screenshots empty just shows a dark placeholder until you fill
   them in.
   ========================================================= */

/* ----------------------------------------------------------
   ADDING A NEW GAME
   1. Make its folder under assets/images/games/<slug>/ (you did this).
   2. Put a "_thumbnail.png" in that folder for the card image.
   3. Copy this block into the list below and fill in what you have
      (everything except slug + title is optional):

        {
          slug: "your-folder-name",     // must match the folder exactly
          title: "Your Game Title",
          genre: "",                     // optional
          itch: "",                      // optional link
          description: "",               // optional
          cover: "",                     // optional — leave "" to use _thumbnail.png
          youtube: "",                   // optional trailer link
          screenshots: []                // optional gallery images
        },

   The card and page appear automatically once the entry is in this list.
   ---------------------------------------------------------- */

const GAMES = [
    {
    slug: "rubble-rumble",
    title: "Rubble Rumble",
    genre: "RELEASE DATE TBA · Top Down · Multiplayer · Destruction",
    itch: "",
    description: "Drop in empty handed. Grab whatever weapon you can find. Blow apart the aerna. Be the last player standing.",
    cover: "",
    youtube: "",
    screenshots: []
  },

  {
    slug: "project-sosei",
    title: "Project Sosei",
    genre: "RELEASE DATE TBA · Shooter · Story",
    itch: "",
    description: "Frank wakes from the grave with fragmented memories, recalling only his mission—to save his daughter",
    cover: "",
    youtube: "https://www.youtube.com/watch?v=whq4SqSkBkk&t=275s",
    screenshots: [
      "assets/images/games/project-sosei/Screenshot 2026-07-15 185517.png",
      "assets/images/games/project-sosei/Screenshot 2026-07-15 185631.png",
      "assets/images/games/project-sosei/Screenshot 2026-07-15 190013.png",
      "assets/images/games/project-sosei/Screenshot 2026-07-15 190043.png"
    ]
  },

  {
    slug: "slime-venture",
    title: "Slime Venture",
    genre: "2.5D shooter",
    itch: "https://dusk-studios.itch.io/slime-venture",
    description: "A fast-paced, 2.5D experience where you play as a smol slime with a grappling hook/revolver!",
    cover: "",
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
    screenshots: [
      "assets/images/games/the-dissapearance/0pMBQ5.png",
      "assets/images/games/the-dissapearance/axpfhf.png",
      "assets/images/games/the-dissapearance/Credits.PNG",
      "assets/images/games/the-dissapearance/lzjeKs.png",
      "assets/images/games/the-dissapearance/mfm3sz.png",
      "assets/images/games/the-dissapearance/qkPPVk.png",
      "assets/images/games/the-dissapearance/RN4Vaq.png",
      "assets/images/games/the-dissapearance/yoitoL.png",
      "assets/images/games/the-dissapearance/Yr3Ynm.png"
    ]
  },

  {
    slug: "the-ruins-of-ishgar",
    title: "The Ruins of Ishgar",
    genre: "Adventure",
    itch: "https://dusk-studios.itch.io/the-ruins-of-ishgar",
    description: "A 2.5D game where you control a rocket and maneuver through obstacles!",
    cover: "",
    youtube: "https://www.youtube.com/watch?v=kP7kunFiuAQ&list=PLs_4rBValRlRsv5RgWV-eRb6QP06JnjH5&index=9",
    screenshots: [
      "assets/images/games/the-ruins-of-ishgar/Hkn6iV.png",
      "assets/images/games/the-ruins-of-ishgar/R7VnwK.png",
      "assets/images/games/the-ruins-of-ishgar/RNqQMd.png",
      "assets/images/games/the-ruins-of-ishgar/x7Dtp3.png"
    ]
  },

  {
    slug: "the-empty-vessel",
    title: "The Empty Vessel",
    genre: "Shooter",
    itch: "https://dusk-studios.itch.io/the-empty-vessel",
    description: "A story-driven atmospheric zombie shooter.",
    cover: "",
    youtube: "https://www.youtube.com/watch?v=i-WyRDsDctM&t=266s",
    screenshots: [
      "assets/images/games/the-empty-vessel/CvfjsR.png",
      "assets/images/games/the-empty-vessel/GjcUZd.png",
      "assets/images/games/the-empty-vessel/M28ryN (1).png",
      "assets/images/games/the-empty-vessel/M28ryN.png",
      "assets/images/games/the-empty-vessel/pVbJh2.png",
      "assets/images/games/the-empty-vessel/x+XNfg.png"
    ]
  },

  {
    slug: "the-lost-legacy",
    title: "The Lost Legacy",
    genre: "Platformer",
    itch: "https://dusk-studios.itch.io/the-lost-legacy",
    description: "Dash! Double Jump! Slash! Collect! in this fast-paced 2D platformer!",
    cover: "",
    youtube: "https://www.youtube.com/watch?v=-L7wtfTd2Qw&list=PLs_4rBValRlRsv5RgWV-eRb6QP06JnjH5&index=10",
    screenshots: [
      "assets/images/games/the-lost-legacy/9+d5Bc (1).png",
      "assets/images/games/the-lost-legacy/Hm8QJb (1).png",
      "assets/images/games/the-lost-legacy/QjyL5J (1).png",
      "assets/images/games/the-lost-legacy/tfEd2I (1).png",
      "assets/images/games/the-lost-legacy/TLrP6U (1).png"
    ]
  },

  {
    slug: "the-crystal-journey",
    title: "The Crystal Journey",
    genre: "Platformer · Game jam",
    itch: "https://dusk-studios.itch.io/the-crystal-journey",
    description: "A short and very fast paced 2D retro-action platformer.",
    cover: "",
    youtube: "https://www.youtube.com/watch?v=d_Re1ZdoClc&list=PLs_4rBValRlRsv5RgWV-eRb6QP06JnjH5&index=5",
    screenshots: [
      "assets/images/games/the-crystal-journey/9Bj4CK.png",
      "assets/images/games/the-crystal-journey/Ae+uHJ.png",
      "assets/images/games/the-crystal-journey/k7e1bA.png",
      "assets/images/games/the-crystal-journey/thgFNl.png"
    ]
  },

  {
    slug: "mission-earth",
    title: "Mission Earth",
    genre: "Adventure · First game",
    itch: "https://dusk-studios.itch.io/mission-earth",
    description: "The aim is to maneuver an alien rocket ship by rotating and thrusting, as it flies through 3-D obstacles.",
    cover: "",
    youtube: "https://www.youtube.com/watch?v=bpe2EWl9Zog&list=PLs_4rBValRlRsv5RgWV-eRb6QP06JnjH5&index=8",
    screenshots: [
      "assets/images/games/mission-earth/Screenshot 2026-07-15 153759.png",
      "assets/images/games/mission-earth/Screenshot 2026-07-15 153851.png",
      "assets/images/games/mission-earth/Screenshot 2026-07-15 155612.png",
      "assets/images/games/mission-earth/Screenshot 2026-07-15 155908.png",
      "assets/images/games/mission-earth/Screenshot 2026-07-15 155949.png"
    ]
  }
];