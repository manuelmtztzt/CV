"use strict";

/* ============================================================
   Datos del CV
   Edita únicamente este objeto para actualizar el contenido.
   ============================================================ */
const cvData = {
  nombre: "Manuel Martínez",
  titulo: "Estudiante de Ingeniería en Sistemas Computacionales · 8.º cuatrimestre",

  contacto: [
    { etiqueta: "Correo", valor: "manuel.martinez@ejemplo.com" },
    { etiqueta: "Tel.", valor: "+52 55 0000 0000" },
    { etiqueta: "Ubicación", valor: "Ciudad de México, México" },
    { etiqueta: "LinkedIn", valor: "/in/manuelmartinez" },
    { etiqueta: "GitHub", valor: "github.com/manuelmartinez" }
  ],

  perfil:
    "Estudiante de octavo cuatrimestre de Ingeniería en Sistemas Computacionales, con experiencia " +
    "en desarrollo web, APIs y bases de datos mediante proyectos académicos y freelance. " +
    "Interesado en desarrollo backend, calidad de software y soluciones en la nube. " +
    "Persona organizada, con aprendizaje rápido y trabajo en equipo bajo metodologías ágiles.",

  educacion: [
    {
      titulo: "Ingeniería en Sistemas Computacionales",
      subtitulo: "Universidad [Nombre de la universidad] · Ciudad de México",
      fecha: "2023 – 2027",
      bullets: [
        "Cursando el 8.º cuatrimestre; promedio general de 9.2/10.",
        "Materias destacadas: Ingeniería de software, Bases de datos, Redes y Desarrollo web."
      ]
    }
  ],

  proyectos: [
    {
      titulo: "Sistema web de gestión de inventario",
      subtitulo: "Proyecto integrador · Equipo de 4 personas",
      fecha: "2026",
      bullets: [
        "Aplicación para control de stock, entradas y salidas, con roles de administrador y almacenista.",
        "Backend en Laravel y MySQL, interfaz responsiva y reportes exportables a PDF y Excel.",
        "Modelo de datos con más de 15 tablas normalizadas."
      ],
      tags: "Laravel · PHP · MySQL · Bootstrap · Git"
    },
    {
      titulo: "API REST para gestión de tareas",
      subtitulo: "Proyecto personal",
      fecha: "2025",
      bullets: [
        "API con autenticación JWT, validación de datos y documentación con Swagger.",
        "Pruebas unitarias de los endpoints principales y despliegue con Docker."
      ],
      tags: "Node.js · Express · MongoDB · JWT · Docker"
    },
    {
      titulo: "Aplicación móvil de seguimiento de hábitos",
      subtitulo: "Proyecto de curso · Desarrollo móvil",
      fecha: "2025",
      bullets: [
        "App multiplataforma con recordatorios, estadísticas de rachas, autenticación con Firebase y datos en Firestore."
      ],
      tags: "Flutter · Dart · Firebase"
    }
  ],

  experiencia: [
    {
      titulo: "Desarrollador web freelance",
      subtitulo: "Proyectos independientes",
      fecha: "2025 – Actualidad",
      bullets: [
        "Desarrollo de sitios y sistemas a la medida para pequeños negocios locales.",
        "Levantamiento de requerimientos, implementación y capacitación al usuario final."
      ]
    },
    {
      titulo: "Practicante de soporte técnico",
      subtitulo: "[Empresa] · Ciudad de México",
      fecha: "2025",
      bullets: [
        "Atención de incidencias de hardware y software para usuarios internos.",
        "Documentación de procedimientos e inventario de equipos de cómputo."
      ]
    }
  ],

  habilidades: [
    { grupo: "Lenguajes", items: "Java, Python, JavaScript, PHP, C#, SQL" },
    { grupo: "Desarrollo web", items: "HTML5, CSS3, React, Node.js, Laravel, Bootstrap" },
    { grupo: "Bases de datos", items: "MySQL, SQL Server, MongoDB, Firestore" },
    { grupo: "Herramientas", items: "Git/GitHub, Docker, Linux, Postman, Figma" },
    { grupo: "Redes y sistemas", items: "TCP/IP, configuración de routers, Windows Server, virtualización" }
  ],

  certificaciones: [
    "Fundamentos de redes — Cisco Networking Academy",
    "Scrum Foundation — CertiProf",
    "Azure Fundamentals (AZ-900) — en curso"
  ],

  idiomas: [
    { idioma: "Español", nivel: "Nativo" },
    { idioma: "Inglés", nivel: "B2 · Intermedio alto" }
  ],

  competencias: [
    "Trabajo en equipo",
    "Resolución de problemas",
    "Comunicación efectiva",
    "Gestión del tiempo",
    "Aprendizaje continuo",
    "Pensamiento analítico"
  ]
};

/* ============================================================
   Utilidades de construcción de DOM
   ============================================================ */
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function bulletList(items) {
  const ul = el("ul");
  items.forEach((item) => ul.appendChild(el("li", null, item)));
  return ul;
}

function renderSection(title, buildBody) {
  const section = el("section");
  section.appendChild(el("h2", null, title));
  buildBody(section);
  return section;
}

function renderEntry(item) {
  const entry = el("div", "entry");

  const head = el("div", "entry-head");
  const left = el("div");

  left.appendChild(el("div", "entry-title", item.titulo));
  if (item.subtitulo) {
    left.appendChild(el("div", "entry-sub", item.subtitulo));
  }
  head.appendChild(left);

  if (item.fecha) {
    head.appendChild(el("div", "entry-date", item.fecha));
  }
  entry.appendChild(head);

  if (item.bullets && item.bullets.length) {
    entry.appendChild(bulletList(item.bullets));
  }
  if (item.tags) {
    entry.appendChild(el("div", "tags", item.tags));
  }

  return entry;
}

function renderEntries(container, entries) {
  entries.forEach((item) => container.appendChild(renderEntry(item)));
}

/* ============================================================
   Render del CV
   ============================================================ */
function renderHeader() {
  document.getElementById("cv-name").textContent = cvData.nombre;
  document.getElementById("cv-headline").textContent = cvData.titulo;

  const contact = document.getElementById("cv-contact");
  cvData.contacto.forEach(({ etiqueta, valor }) => {
    const span = el("span");
    span.appendChild(el("b", null, etiqueta + ":"));
    span.appendChild(document.createTextNode(" " + valor));
    contact.appendChild(span);
  });

  document.title = "CV — " + cvData.nombre;
}

function renderMain() {
  const main = document.getElementById("cv-main");

  main.appendChild(
    renderSection("Perfil profesional", (section) => {
      section.appendChild(el("p", null, cvData.perfil));
    })
  );

  main.appendChild(
    renderSection("Formación académica", (section) => {
      renderEntries(section, cvData.educacion);
    })
  );

  main.appendChild(
    renderSection("Proyectos académicos y personales", (section) => {
      renderEntries(section, cvData.proyectos);
    })
  );

  main.appendChild(
    renderSection("Experiencia", (section) => {
      renderEntries(section, cvData.experiencia);
    })
  );
}

function renderSide() {
  const side = document.getElementById("cv-side");

  side.appendChild(
    renderSection("Habilidades técnicas", (section) => {
      cvData.habilidades.forEach(({ grupo, items }) => {
        const group = el("div", "skill-group");
        group.appendChild(el("div", "skill-label", grupo));
        group.appendChild(el("div", "skill-text", items));
        section.appendChild(group);
      });
    })
  );

  side.appendChild(
    renderSection("Certificaciones", (section) => {
      section.appendChild(bulletList(cvData.certificaciones));
    })
  );

  side.appendChild(
    renderSection("Idiomas", (section) => {
      cvData.idiomas.forEach(({ idioma, nivel }) => {
        const row = el("div", "lang-row");
        row.appendChild(el("span", null, idioma));
        row.appendChild(el("span", null, nivel));
        section.appendChild(row);
      });
    })
  );

  side.appendChild(
    renderSection("Competencias", (section) => {
      section.appendChild(bulletList(cvData.competencias));
    })
  );
}

function renderFooter() {
  const now = new Date();
  const mes = new Intl.DateTimeFormat("es-MX", { month: "long" }).format(now);
  document.getElementById("cv-footer").textContent =
    "Referencias disponibles a solicitud · Documento actualizado en " + mes + " de " + now.getFullYear();
}

function initPrintButton() {
  const button = document.getElementById("btn-print");
  button.addEventListener("click", () => window.print());
}

function init() {
  renderHeader();
  renderMain();
  renderSide();
  renderFooter();
  initPrintButton();
}

document.addEventListener("DOMContentLoaded", init);
