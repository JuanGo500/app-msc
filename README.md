# app-msc
Web de Marina Serantes Casals.

Portfolio y CV de diseño de interiores. Web estática en español, adaptable a móvil, con filtros de conceptos y una vista de impresión para guardar el perfil en PDF. Sin dependencias de compilación.

## Contenido pendiente
El nombre procede de la descripción del repositorio. La formación, experiencia, competencias y contacto no se han inventado: están pendientes de recibir el CV real. Los conceptos del portfolio y el enfoque editorial son ejemplos, identificados en la página. Las imágenes de Unsplash son referencias visuales; no deben atribuirse como trabajos de Marina.

- Edita `web/index.html` para incorporar biografía, formación, experiencia y contacto.
- Sustituye las imágenes y conceptos de muestra por proyectos autorizados.
- Edita `web/styles.css` para personalizar colores y tipografía.
- Las fuentes (Google Fonts) y fotografías (Unsplash) requieren conexión externa; existen fuentes de sistema de respaldo.

## Vista local
Desde la raíz del repositorio:
```sh
python -m http.server 8080 --directory web
```
Abre http://localhost:8080. Prueba los filtros, los enlaces y «Imprimir / guardar CV en PDF». Esta última opción abre el diálogo de impresión del navegador, con una hoja de estilo específica.

## Publicación en Azure Static Web Apps
El workflow `.github/workflows/azure-static-web-apps.yml` valida HTML presente, sintaxis JavaScript y configuración JSON; después publica `web/` directamente, sin compilación. Se ejecuta al cambiar la web en `main` o manualmente con **Actions → Publicar web en Azure → Run workflow**.

### Configuración inicial
1. En Azure Portal crea un recurso **Static Web App** (el plan Free es suficiente para esta web). Elige origen **Other/Otro** para utilizar este workflow sin generar otro automáticamente.
2. En el recurso abre **Manage deployment token / Administrar token de implementación** y copia el token. Usa la autorización mediante deployment token.
3. En este repositorio abre **Settings → Secrets and variables → Actions → New repository secret**.
4. Crea el secreto **AZURE_STATIC_WEB_APPS_API_TOKEN** con el token de Azure. Nunca lo incluyas en archivos ni commits.
5. Ejecuta el workflow manualmente. La URL de la web estará en la vista Overview/Información general del recurso de Azure.

Si Azure solicita ubicaciones: aplicación `web`, API vacía y salida vacía. No es Azure App Service ni Blob Storage: el workflow usa específicamente Static Web Apps.

Sin el recurso y el secreto, la web queda preparada pero no desplegada; el workflow explica qué falta sin mostrar credenciales.

Documentación: https://learn.microsoft.com/azure/static-web-apps/build-configuration
