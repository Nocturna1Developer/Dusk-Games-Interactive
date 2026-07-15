# Dusk Games Interactive — website

A simple, static site. No build step, no framework. Push the files to the
**root** of your GitHub Pages repo (so `index.html` sits at the top level).

```
index.html        Home (features a trailer)
portfolio.html    Portfolio — cards for every game (built from js/games.js)
game.html         One game's page: trailer + screenshot gallery (?slug=…)
about.html        About + social links
contact.html      Contact form + email + socials
css/style.css     All styling (edit colors/fonts at the top)
js/games.js       >>> YOUR GAME LIST — edit this to add media <<<
js/portfolio.js   Builds the portfolio cards
js/game.js        Builds each game page + the lightbox
js/main.js        Nav toggle + a path helper
assets/images/    Your photos + a folder per game
assets/videos/    Your videos (a folder per game)
```

Preview locally by double-clicking `index.html`.

---

## Adding screenshots & trailers (the main thing)

You keep a folder per game, e.g. `assets/images/games/slime-venture/` with its
screenshots, and `assets/videos/slime-venture/` with its trailer. To make them
appear on the site, list them in **`js/games.js`** — that's the only file you edit.

Each game has an entry like this:

```js
{
  slug: "slime-venture",
  title: "Slime Venture",
  genre: "2.5D shooter",
  itch: "https://dusk-studios.itch.io/slime-venture",
  description: "",                                    // optional
  cover:   "assets/images/games/slime-venture/Final Thumbnail 2.PNG",
  trailer: "assets/videos/slime-venture/SlimeVenture! Trailer.mp4",  // "" if none
  screenshots: [
    "assets/images/games/slime-venture/Level 1 Screenshot 2.PNG",
    "assets/images/games/slime-venture/Level 2 Screenshot 2.PNG",
    "assets/images/games/slime-venture/Slime Fight.PNG"
  ]
}
```

- **cover** — the picture on the Portfolio card (and the trailer's thumbnail).
- **trailer** — a video file; leave `""` and it's just skipped.
- **screenshots** — every image here shows in the gallery; click one for full-size.

Slime Venture is already filled in as a working example. Do the same for the rest.

### ⚠️ Match filenames EXACTLY — including capital letters

GitHub Pages runs on a case-sensitive server, so `Level 2.PNG` and `level 2.png`
are treated as different files even though Windows treats them the same. Type each
path in `games.js` exactly as the file is named on disk. If a picture works locally
but is blank once deployed, a capital-letter or spelling mismatch is almost always
why. (Spaces and `!` are handled for you — no need to change those.)

Tip: to avoid the whole issue, you can rename files to lowercase with no spaces
(e.g. `level-2.png`) and update the paths to match.

## Change the home-page trailer

The reel on `index.html` points at the Slime Venture trailer. To feature a
different one, edit the `poster=` and `<source src=` paths in the reel block
(spaces written as `%20`). Or swap in a YouTube embed — the commented `<iframe>`
line is right there.

## Other media (home + about)

Drop these in `assets/images/` to fill the remaining placeholders:
`hero.jpg`, `studio-wide.jpg`, `studio-tall.jpg`, `about.jpg`.

## Socials & contact form

- Replace each `href="#"` social link with your profile URL; delete any you don't use.
- The contact form uses free **Formspree**: sign up at <https://formspree.io>, create
  a form, and paste its endpoint into the `action="…"` in `contact.html`. Also set
  your real email in the `mailto:` link.

## Publish to GitHub Pages

Put every file/folder here at the **repo root**, commit, then
**Settings → Pages → Deploy from a branch → `main` / `/(root)`**. The included
`.nojekyll` file makes Pages serve everything as-is. Give it a minute and
hard-refresh (Ctrl+F5).

## Re-skin everything

Edit the tokens at the top of `css/style.css` (`:root`) — colors, width, fonts.
Display face is **Anton**, body is **Inter**, both from Google Fonts.
