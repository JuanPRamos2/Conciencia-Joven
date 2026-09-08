# Conciencia Joven Internacional

Sitio web estático de una sola página para [concienciajoven.com](https://concienciajoven.com). Presenta la Cruz de Conciencia Joven, el diagrama radial de los seis grupos y secciones de contenido con contactos directos de WhatsApp e Instagram.

## Cómo verlo

No requiere instalación ni servidor. Abre `index.html` en el navegador, o activa GitHub Pages con la rama principal y la carpeta raíz.

## Estructura

```
index.html          Página única (anclas internas)
css/styles.css      Paletas sólidas, diagrama y componentes
js/app.js           Menú, scroll, FAQ, formulario y contactos
assets/cruz.svg     Emblema de la Cruz
assets/favicon.svg  Favicon
```

## Contactos

Los números de WhatsApp y las cuentas de Instagram se editan en un solo lugar: el objeto `CONTACTOS` al inicio de `js/app.js`. Sustituye los valores de plantilla por los oficiales del movimiento.

## Diseño

- Fondos y tarjetas 100 % opacos. Sin transparencias ni glassmorphism.
- Paleta por grupo: NOVA mostaza, GN azul marino, Conciencia gris claro, Misiones verde bosque, Apostolados oxford, COROCJI rosa viejo.
- Tipografía clásica (Cormorant Garamond + Source Sans 3) cargada desde Google Fonts.
- Estilos de utilidad: Tailwind CSS por CDN.

## Tecnologías

HTML5, Tailwind CSS (CDN) y JavaScript vainilla.
