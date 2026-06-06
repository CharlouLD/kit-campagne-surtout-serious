/* Panier de campagne Bump — stockage local (pas de backend) */
(function () {
  var KEY = 'bump_cart_v1';

  function read() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function write(c) { localStorage.setItem(KEY, JSON.stringify(c)); updateBadges(); }

  function add(id, name, price) {
    var c = read();
    var it = c.filter(function (x) { return x.id === id; })[0];
    if (it) { it.qty++; } else { c.push({ id: id, name: name, price: price, qty: 1 }); }
    write(c);
  }
  function setQty(id, q) {
    var c = read();
    var it = c.filter(function (x) { return x.id === id; })[0];
    if (it) { it.qty = Math.max(0, q); if (it.qty === 0) c = c.filter(function (x) { return x.id !== id; }); }
    write(c);
  }
  function remove(id) { write(read().filter(function (x) { return x.id !== id; })); }
  function clear() { write([]); }
  function count() { return read().reduce(function (s, x) { return s + x.qty; }, 0); }
  function total() { return read().reduce(function (s, x) { return s + x.qty * x.price; }, 0); }

  function updateBadges() {
    var n = count();
    [].forEach.call(document.querySelectorAll('.cart-count'), function (el) {
      el.textContent = n;
      el.style.display = n > 0 ? 'inline-flex' : 'none';
    });
  }

  window.BumpCart = { read: read, add: add, setQty: setQty, remove: remove, clear: clear, count: count, total: total, updateBadges: updateBadges };

  document.addEventListener('DOMContentLoaded', function () {
    updateBadges();
    [].forEach.call(document.querySelectorAll('[data-add-to-cart]'), function (b) {
      b.addEventListener('click', function () {
        add(b.getAttribute('data-id'), b.getAttribute('data-name'), parseFloat(b.getAttribute('data-price')));
        var old = b.getAttribute('data-label') || b.textContent;
        b.setAttribute('data-label', old);
        b.textContent = 'Ajouté au panier';
        b.classList.add('added');
        setTimeout(function () { b.textContent = old; b.classList.remove('added'); }, 1100);
      });
    });
    if (typeof window.renderCart === 'function') window.renderCart();
  });
})();
