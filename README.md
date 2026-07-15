# Dusk Games Interactive — website

A simple, static 4-page site. No build step, no framework. Just open the
HTML files or push them to GitHub Pages.

```
index.html        Home
portfolio.html    Portfolio / games showcase (all 7 itch.io games)
about.html        About + social links
contact.html      Contact form + email + socials
css/style.css     All styling (edit colors/fonts at the top)
js/main.js        Mobile menu toggle
assets/images/    Your photos + game covers
assets/videos/    Your videos
```

Preview it locally by double-clicking `index.html`.

---

## Add your pictures

1. Put an image file into `assets/images/`.
2. The HTML already points at these filenames — match them and the image appears
   (a dark placeholder shows until you do):

   | Where | File to add |
   |---|---|
   | Home hero (right) | `assets/images/hero.jpg` |
   | Home "One studio" wide | `assets/images/studio-wide.jpg` |
   | Home "One studio" tall | `assets/images/studio-tall.jpg` |
   | About portrait | `assets/images/about.jpg` |
   | Game covers | `assets/images/games/<game>.jpg` (e.g. `the-disappearance.jpg`) |

To use a different filename, edit the `background-image:url('...')` in the HTML.

## Add a video

- **Your own file:** drop it at `assets/videos/reel.mp4` (that's the path the home
  page already uses). Add `assets/images/reel-poster.jpg` for the thumbnail.
- **YouTube instead:** in `index.html` delete the `<video>` block and uncomment the
  `<iframe>` line, replacing `VIDEO_ID`.

## Connect your socials

On `about.html` (and the home + contact pages), each social link is `href="#"`.
Replace `#` with your profile URL. Delete any `<a>…</a>` block you don't use.
The itch.io link is already set to `https://dusk-studios.itch.io/`.

## Make the contact form work

GitHub Pages can't send email on its own, so the form uses **Formspree** (free):

1. Sign up at <https://formspree.io> and create a form.
2. Copy your endpoint (looks like `https://formspree.io/f/abcdwxyz`).
3. In `contact.html`, replace `YOUR_FORM_ID` in the `action="..."`.
4. Also update the `mailto:` address to your real email.

Don't want a form? Delete the `<form>` block and keep the direct email + socials.

---

## Publish to GitHub Pages

1. Create a repo on GitHub. If you name it `yourusername.github.io`, the site lives
   at that address. Any other name puts it at `yourusername.github.io/repo-name/`.
2. Upload every file/folder here (keep the structure) and commit.
3. Repo **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   pick `main` / `root`, save.
4. Give it a minute, then visit the URL Pages shows you.

The included `.nojekyll` file tells GitHub Pages to serve files as-is.

## Re-skin the whole site

Open `css/style.css` and edit the tokens at the top (`:root`) — colors, max width,
and fonts all live there. The display face is **Anton** and the body is **Inter**,
both loaded from Google Fonts in each page's `<head>`.
