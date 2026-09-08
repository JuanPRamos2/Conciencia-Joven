/**
 * Conciencia Joven Internacional — interacción de la página única.
 *
 * Centraliza contactos para que el equipo pueda actualizar WhatsApp
 * e Instagram sin tocar el marcado de cada sección.
 */
(function () {
  "use strict";

  /** Números y cuentas: sustituir por los oficiales del movimiento. */
  const CONTACTOS = {
    general: { wa: "528100000000", ig: "concienciajoven" },
    nova: { wa: "528100000001", ig: "novacji" },
    gn: { wa: "528100000002", ig: "gn.cji" },
    conciencia: { wa: "528100000003", ig: "concienciajoven" },
    misiones: { wa: "528100000004", ig: "misiones.cji" },
    apostolados: { wa: "528100000005", ig: "apostolados.cji" },
    corocji: { wa: "528100000006", ig: "corocji" },
  };

  const header = document.querySelector(".site-header");
  const menuBtn = document.getElementById("menu-btn");
  const navPanel = document.getElementById("nav-panel");
  const navLinks = document.querySelectorAll("[data-nav]");
  const yearNode = document.getElementById("year");
  const faqItems = document.querySelectorAll(".faq-item");
  const missionForm = document.getElementById("form-misiones");
  const formOk = document.getElementById("form-ok");
  const videoTriggers = document.querySelectorAll("[data-video]");

  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  /* ---- Menú móvil ------------------------------------------------------- */
  function setMenu(open) {
    if (!navPanel || !menuBtn) return;
    navPanel.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuBtn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  }

  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      setMenu(!navPanel.classList.contains("is-open"));
    });
  }

  document.querySelectorAll("#nav-panel a").forEach(function (link) {
    link.addEventListener("click", function () {
      setMenu(false);
    });
  });

  /* ---- Desplazamiento suave con compensación de cabecera ---------------- */
  function scrollToId(id) {
    const target = document.getElementById(id);
    if (!target) return;
    const offset = header ? header.getBoundingClientRect().height + 8 : 72;
    const top = window.scrollY + target.getBoundingClientRect().top - offset;
    window.scrollTo({ top: top, behavior: "smooth" });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const id = href.slice(1);
      if (!document.getElementById(id)) return;
      event.preventDefault();
      scrollToId(id);
      history.replaceState(null, "", href);
    });
  });

  /* ---- Enlace activo según la sección visible --------------------------- */
  const sections = ["inicio", "nova", "gn", "conciencia", "misiones", "apostolados", "corocji"]
    .map(function (id) {
      return document.getElementById(id);
    })
    .filter(Boolean);

  function updateActiveNav() {
    const probe = window.scrollY + (header ? header.offsetHeight + 24 : 96);
    let current = "inicio";
    sections.forEach(function (section) {
      if (section.offsetTop <= probe) {
        current = section.id;
      }
    });
    navLinks.forEach(function (link) {
      link.classList.toggle("is-active", link.getAttribute("data-nav") === current);
    });
  }

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();

  /* ---- Contactos WhatsApp / Instagram ----------------------------------- */
  function waUrl(number, text) {
    const msg = encodeURIComponent(text || "Hola, quiero información de Conciencia Joven.");
    return "https://wa.me/" + number + "?text=" + msg;
  }

  function igUrl(handle) {
    return "https://www.instagram.com/" + handle + "/";
  }

  document.querySelectorAll("[data-contact]").forEach(function (node) {
    const key = node.getAttribute("data-contact");
    const channel = node.getAttribute("data-channel");
    const topic = node.getAttribute("data-topic") || "Conciencia Joven";
    const info = CONTACTOS[key];
    if (!info) return;
    if (channel === "wa") {
      node.setAttribute("href", waUrl(info.wa, "Hola, me interesa " + topic + "."));
    }
    if (channel === "ig") {
      node.setAttribute("href", igUrl(info.ig));
    }
  });

  /* ---- Acordeón de preguntas frecuentes --------------------------------- */
  faqItems.forEach(function (item) {
    const button = item.querySelector(".faq-btn");
    if (!button) return;
    button.addEventListener("click", function () {
      const willOpen = !item.classList.contains("is-open");
      faqItems.forEach(function (other) {
        other.classList.remove("is-open");
        const otherBtn = other.querySelector(".faq-btn");
        if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
      });
      if (willOpen) {
        item.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---- Formulario de inscripción a misiones ----------------------------- */
  if (missionForm) {
    missionForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const data = new FormData(missionForm);
      const nombre = String(data.get("nombre") || "").trim();
      const edad = String(data.get("edad") || "").trim();
      const telefono = String(data.get("telefono") || "").trim();
      const correo = String(data.get("correo") || "").trim();
      const parroquia = String(data.get("parroquia") || "").trim();
      const destino = String(data.get("destino") || "").trim();
      const comentarios = String(data.get("comentarios") || "").trim();

      if (!nombre || !telefono || !correo) {
        missionForm.reportValidity();
        return;
      }

      const cuerpo = [
        "Inscripción a Misiones CJI",
        "Nombre: " + nombre,
        "Edad: " + edad,
        "Teléfono: " + telefono,
        "Correo: " + correo,
        "Parroquia: " + parroquia,
        "Destino de interés: " + destino,
        "Comentarios: " + comentarios,
      ].join("\n");

      if (formOk) {
        formOk.classList.add("is-visible");
        formOk.focus();
      }

      window.open(waUrl(CONTACTOS.misiones.wa, cuerpo), "_blank", "noopener");
    });
  }

  /* ---- Reproductores de video promocional ------------------------------- */
  videoTriggers.forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      const id = trigger.getAttribute("data-video");
      const frame = document.getElementById(id);
      if (!frame) return;
      const youtubeId = trigger.getAttribute("data-youtube");
      frame.classList.add("is-on");
      trigger.setAttribute("hidden", "hidden");
      if (youtubeId) {
        frame.innerHTML =
          '<iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/' +
          youtubeId +
          '?autoplay=1" title="Video promocional" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
      }
    });
  });
})();
