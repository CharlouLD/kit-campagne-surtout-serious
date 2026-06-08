/* Compteur à rebours de campagne — bandeau sticky global (pas de backend) */
(function () {
  // >>> Date du vote / cérémonie des Bump Awards. Modifier ici si elle change. <<<
  var TARGET = new Date('2026-07-02T20:00:00');

  function p2(n) { return (n < 10 ? '0' : '') + n; }

  function render(bar) {
    var diff = TARGET.getTime() - new Date().getTime();
    if (diff <= 0) {
      bar.innerHTML = '<span class="cd-txt">Le vote est ouvert. <b>Surtout Serious.</b></span>';
      return false;
    }
    var s = Math.floor(diff / 1000);
    var d = Math.floor(s / 86400); s -= d * 86400;
    var h = Math.floor(s / 3600);  s -= h * 3600;
    var m = Math.floor(s / 60);    s -= m * 60;
    bar.innerHTML =
      '<span class="cd-txt">Plus que ' +
        '<b class="cd-time">' + d + 'j ' + p2(h) + 'h ' + p2(m) + 'm <span class="cd-sec">' + p2(s) + 's</span></b>' +
        ' avant le vote · Bump Awards 2026</span>';
    return true;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var bar = document.createElement('a');
    bar.className = 'countdown-bar';
    bar.href = 'soutiens.html';
    bar.setAttribute('aria-label', 'Compte à rebours avant le vote — voir mes soutiens');
    document.body.insertBefore(bar, document.body.firstChild);

    if (render(bar)) {
      var iv = setInterval(function () {
        if (!render(bar)) clearInterval(iv);
      }, 1000);
    }
  });
})();
