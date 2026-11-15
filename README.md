# app-msc
Web de Marina Serantes Casals.

Portfolio y CV de diseño de interiores. Web estática en español, adaptable a móvil, con filtros de conceptos y una vista de impresión para guardar el perfil en PDF. Sin dependencias de compilación.

## Contenido pendiente
El nombre procede de la descripción del repositorio. La formación, experiencia, competencias y contacto no se han inventado: están pendientes de recibir el CV real. Los conceptos del portfolio y el enfoque editorial son ejemplos, identificados en la página. Las imágenes de Unsplash son referencias visuales; no deben atribuirse como trabajos de Marina.

- Edita `web/index.html` para incorporar biografía, formación, experiencia y contacto.
- Sustituye las imágenes y conceptos de muestra por proyectos autorizados.
- Edita `web/styles.css` para personalizar colores y tipografía.
- Las fuentes (Google Fonts) y fotografías (Unsplash) requieren conexión externa; existen fuentes de sistema de respaldo.
- Mirar si en los proyectos se puede hacer que aparezca más de una imagen,
lo mismo en los demás proyectos (01, 02, 03, etc) (Tipo flechitas que
aparezcan para que el usuario sepa que hay más imágenes y se puedan ir
pasando)
- Dejar lo de ver portafolio completo pero quitar en cada imagen lo de ver
portafolio.
- Poner renders en los proyectos (están en el portafolio) de modo que los
puedas pasar con flechas, como he indicado en el primer punto.
- En experiencia profesional quitar Tezenis e Inditex.
Portafolio:
https://canva.link/qgvlpfl8veujzce

## Vista local
Desde la raíz del repositorio:
```sh
python -m http.server 8080 --directory web
```
Abre http://localhost:8080. Prueba los filtros, los enlaces y «Imprimir / guardar CV en PDF». Esta última opción abre el diálogo de impresión del navegador, con una hoja de estilo específica.
