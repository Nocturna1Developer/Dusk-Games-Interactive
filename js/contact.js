// Progressive enhancement for the contact form: submit via FormSubmit's AJAX
// endpoint so the visitor gets an inline "sent" message without leaving the page.
// If JavaScript is off or fetch is unavailable, the plain <form> POST still works.
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var statusEl = document.getElementById('form-status');
  var btn = form.querySelector('button[type="submit"]');
  var AJAX = "https://formsubmit.co/ajax/duskgamesinteractive@gmail.com";

  function show(msg, kind) {
    statusEl.hidden = false;
    statusEl.textContent = msg;
    statusEl.className = 'form-status' + (kind ? ' is-' + kind : '');
  }
  function busy(on) {
    btn.disabled = on;
    btn.textContent = on ? 'Sending…' : 'Send message';
  }
  function val(name) {
    var el = form.elements.namedItem(name);
    return el ? el.value : '';
  }

  // If the no-JS fallback redirected back here, show a success message.
  if (location.search.indexOf('sent=1') !== -1) show('Thanks — your message was sent!', 'ok');

  form.addEventListener('submit', function (e) {
    if (!window.fetch) return;            // no fetch: let the normal POST happen
    if (val('_honey')) { e.preventDefault(); return; }  // honeypot tripped

    e.preventDefault();
    busy(true);
    show('Sending…', '');

    fetch(AJAX, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        name: val('name'),
        email: val('email'),
        message: val('message'),
        _subject: 'New message from the Dusk Games website',
        _template: 'table'
      })
    })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (res && (res.success === 'true' || res.success === true)) {
          show('Thanks — your message was sent!', 'ok');
          form.reset();
        } else {
          show((res && res.message) || 'Something went wrong. Please email us directly.', 'err');
        }
      })
      .catch(function () {
        show("Couldn't send right now — please email duskgamesinteractive@gmail.com.", 'err');
      })
      .finally(function () { busy(false); });
  });
})();
