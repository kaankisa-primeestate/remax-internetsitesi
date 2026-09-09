/* RE/MAX Prime Bostancı - paylaşılan site davranışları:
   WhatsApp yüzen buton, footer sosyal ikonları, GTM/dataLayer altyapısı.
   Gerçek değerler config.js içinde tutulur. */
(function () {
  var cfg = window.SITE_CONFIG || {};
  window.dataLayer = window.dataLayer || [];

  function trackEvent(name, params) {
    window.dataLayer.push(Object.assign({ event: name }, params || {}));
  }
  window.trackEvent = trackEvent;

  function waLink(message) {
    var num = (cfg.whatsapp && cfg.whatsapp.number) || "";
    var msg = message || (cfg.whatsapp && cfg.whatsapp.defaultMessage) || "";
    return "https://wa.me/" + num + "?text=" + encodeURIComponent(msg);
  }
  window.buildWhatsAppLink = waLink;

  function injectWhatsAppButton() {
    if (!cfg.whatsapp || !cfg.whatsapp.number) return;
    var btn = document.createElement("a");
    btn.href = waLink();
    btn.target = "_blank";
    btn.rel = "noopener";
    btn.setAttribute("aria-label", "WhatsApp ile yazın");
    btn.id = "wa-float-btn";
    btn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    btn.style.cssText = [
      "position:fixed", "bottom:22px", "right:22px", "width:58px", "height:58px",
      "background:#25D366", "color:#fff", "border-radius:50%", "display:flex",
      "align-items:center", "justify-content:center", "font-size:1.8rem",
      "box-shadow:0 6px 18px rgba(0,0,0,0.25)", "z-index:3000", "text-decoration:none",
      "transition:transform 0.15s ease"
    ].join(";");
    btn.onmouseenter = function () { btn.style.transform = "scale(1.08)"; };
    btn.onmouseleave = function () { btn.style.transform = "scale(1)"; };
    btn.addEventListener("click", function () {
      trackEvent("whatsapp_click", { location: "floating_button", page: location.pathname });
    });
    document.body.appendChild(btn);
  }

  function renderSocialIcons() {
    var mount = document.getElementById("social-icons");
    if (!mount || !cfg.social) return;
    var icons = [
      { key: "instagram", cls: "fa-instagram" },
      { key: "facebook", cls: "fa-facebook" },
      { key: "linkedin", cls: "fa-linkedin" },
      { key: "youtube", cls: "fa-youtube" }
    ];
    var html = "";
    icons.forEach(function (i) {
      var url = cfg.social[i.key];
      if (!url) return;
      html += '<a href="' + url + '" target="_blank" rel="noopener" aria-label="' + i.key + '" style="color:inherit;font-size:1.1rem;margin:0 0.4rem;"><i class="fab ' + i.cls + '"></i></a>';
    });
    mount.innerHTML = html;
  }

  function attachClickTracking() {
    document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
      a.addEventListener("click", function () {
        trackEvent("phone_click", { page: location.pathname });
      });
    });
    document.querySelectorAll('a[href*="wa.me"]').forEach(function (a) {
      if (a.id === "wa-float-btn") return;
      a.addEventListener("click", function () {
        trackEvent("whatsapp_click", { location: "inline_link", page: location.pathname });
      });
    });
  }

  function loadGTM() {
    var id = cfg.gtmId;
    if (!id || id.indexOf("GTM-") !== 0) return;
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : "";
      j.async = true;
      j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, "script", "dataLayer", id);

    var noscript = document.createElement("noscript");
    noscript.innerHTML = '<iframe src="https://www.googletagmanager.com/ns.html?id=' + id + '" height="0" width="0" style="display:none;visibility:hidden"></iframe>';
    document.body.insertBefore(noscript, document.body.firstChild);
  }

  loadGTM();
  document.addEventListener("DOMContentLoaded", function () {
    injectWhatsAppButton();
    renderSocialIcons();
    attachClickTracking();
  });
})();
