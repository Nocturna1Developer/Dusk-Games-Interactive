/* =========================================================
   PALETTE PREVIEW  —  INTERNAL / DESIGN TOOL. NOT SHIPPED.
   ---------------------------------------------------------
   Obsidian is the official palette and ships in css/style.css.
   This control is no longer loaded by any page.

   TO PREVIEW THE ALTERNATES AGAIN (locally only), add to <head>
   AFTER the style.css link:

     <link rel="stylesheet" href="css/palettes.css" />
     <script src="js/theme.js"></script>

   Remove both lines again before shipping.
   ========================================================= */
(function () {
  'use strict';

  var KEY      = 'dgi-palette';
  var DEFAULT  = 'obsidian';

  /* name + the two colors used for the little preview swatch */
  var PALETTES = [
    { id: 'obsidian',   label: 'Obsidian',   bg: '#0b0b0c', accent: '#d8d3cb' },
    { id: 'graphite',   label: 'Graphite',   bg: '#1d1f21', accent: '#c3c9d0' },
    { id: 'slate',      label: 'Slate',      bg: '#10151b', accent: '#b6c4d3' },
    { id: 'stone',      label: 'Stone',      bg: '#1a1714', accent: '#cdbfa9' },
    { id: 'monochrome', label: 'Monochrome', bg: '#000000', accent: '#ffffff' }
  ];

  function isValid(id) {
    for (var i = 0; i < PALETTES.length; i++) if (PALETTES[i].id === id) return true;
    return false;
  }

  function read() {
    try {
      var v = window.localStorage.getItem(KEY);
      return isValid(v) ? v : DEFAULT;
    } catch (e) { return DEFAULT; }
  }

  function save(id) {
    try { window.localStorage.setItem(KEY, id); } catch (e) { /* private mode */ }
  }

  /* ---- apply immediately (runs in <head>, before first paint) ---- */
  var current = read();
  document.documentElement.setAttribute('data-theme', current);

  /* ---- the floating control ---- */
  var CSS = [
    '.pp-switch{position:fixed;right:16px;bottom:16px;z-index:55;',
      'display:flex;align-items:center;gap:10px;',
      'padding:7px 12px 7px 13px;border-radius:999px;',
      'background:rgba(18,18,20,.88);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);',
      'border:1px solid rgba(255,255,255,.16);box-shadow:0 6px 24px rgba(0,0,0,.4);',
      'font-family:ui-sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;',
      'transition:opacity .2s ease;opacity:.75}',
    '.pp-switch:hover,.pp-switch:focus-within{opacity:1}',
    '.pp-switch__label{font-size:9px;font-weight:600;letter-spacing:.18em;',
      'text-transform:uppercase;color:rgba(255,255,255,.5);white-space:nowrap}',
    '.pp-switch__row{display:flex;gap:6px}',
    '.pp-switch__btn{width:20px;height:20px;padding:0;border-radius:50%;cursor:pointer;',
      'border:1px solid rgba(255,255,255,.3);position:relative;display:block;',
      'transition:transform .15s ease,border-color .15s ease}',
    '.pp-switch__btn::after{content:"";position:absolute;left:50%;top:50%;',
      'width:7px;height:7px;margin:-3.5px 0 0 -3.5px;border-radius:50%}',
    '.pp-switch__btn:hover{transform:scale(1.15)}',
    '.pp-switch__btn[aria-pressed="true"]{border-color:#fff;',
      'box-shadow:0 0 0 2px rgba(255,255,255,.28)}',
    '.pp-switch__name{font-size:10px;font-weight:600;letter-spacing:.12em;',
      'text-transform:uppercase;color:#fff;min-width:74px;white-space:nowrap}',
    '@media (max-width:560px){.pp-switch{right:10px;bottom:10px;padding:6px 10px}',
      '.pp-switch__label,.pp-switch__name{display:none}}'
  ].join('');

  function build() {
    if (document.querySelector('.pp-switch')) return;

    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    var box = document.createElement('div');
    box.className = 'pp-switch';
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', 'Palette preview');

    var label = document.createElement('span');
    label.className = 'pp-switch__label';
    label.textContent = 'Palette';
    box.appendChild(label);

    var row = document.createElement('div');
    row.className = 'pp-switch__row';
    box.appendChild(row);

    var name = document.createElement('span');
    name.className = 'pp-switch__name';
    box.appendChild(name);

    var buttons = [];

    function select(id) {
      current = id;
      document.documentElement.setAttribute('data-theme', id);
      save(id);
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].setAttribute('aria-pressed', buttons[i].dataset.palette === id ? 'true' : 'false');
      }
      for (var j = 0; j < PALETTES.length; j++) {
        if (PALETTES[j].id === id) name.textContent = PALETTES[j].label;
      }
    }

    PALETTES.forEach(function (p) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'pp-switch__btn';
      b.dataset.palette = p.id;
      b.title = p.label;
      b.setAttribute('aria-label', p.label);
      b.style.background = p.bg;
      b.addEventListener('click', function () { select(p.id); });
      row.appendChild(b);
      buttons.push(b);

      /* accent pip, injected per-button */
      var pip = document.createElement('style');
      pip.textContent = '.pp-switch__btn[data-palette="' + p.id + '"]::after{background:' + p.accent + '}';
      document.head.appendChild(pip);
    });

    document.body.appendChild(box);
    select(current);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
