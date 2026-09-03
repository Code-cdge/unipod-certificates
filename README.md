# Aplicación para descargar Certificados de las formaciones UniPod

Esta aplicación web permitirá a los participantes de las formaciones UniPod descargar sus propios certificados
mediante su código de identificación único.

## Stack de desarrollo

Este es un proyecto monolítico que se desarrolla con las siguientes tecnologías
- **Next js:** Framework Full Stack basado en React
- **Payload CMS:** Gestor de Contenidos
- **Postgres SQL:** Motor de base de datos

## Guía rápida - desarrollo local

Para ejecutar este proyecto localmente en su computadora siga los siguientes pasos

### Clona el repositorio

Para acceder al código fuente [Clona este repositorio](https://github.com/Code-cdge/unipod-certificates.git) y cambia a la rama `dev`.

### Desarrollo

1. Primero clona el repositorio si todavía no lo has hecho
2. `cd unipod-certificates && cp .env.example .env` para copiar las variables de entorno de ejemplo. Asegúrate de cambiar el valor de `DATABASE_URL` con el string de conexión a tu base de datos.

3. `pnpm install && pnpm dev` para instalar las dependencias e iniciar el servidor local
4. abre `http://localhost:3000` para ver el proyecto en el navegador

Esto es! Los cambios realizados en `./src` se reflejarán en el navegador automáticamente. Sigue las instrucciones para crear la primera cuenta en el panel de administración.

## Cómo funciona

Este proyecto incluye fronted y backend. A demás incluye un panel de administración para gestionar el contenido de la base de datos. El código está estructurado de la siguiente forma

- La carpeta `src/payload` contiene todo el código del **backend**
- La carpeta `src/payload/(frontend)` contiene las páginas para frontend
- La carpeta `src/payload/(paylod)` no debe editarse, ya que contiene el código del panel de administración y es generado por Payload CMS

### Colecciones (tablas) de la base de datos

Las siguientes tablas (colecciones en el vocabulario de CMS) se han creado para gestionar la descarga de certificados.

- #### Usuarios (Autenticación)

  Esta tabla contiene los usuarios que tienen acceso al panel de control del CMS

- #### Media

  Esta tabla almacena referencias a archivos subidos al CMS como los certificados que se van a generar

- #### Attendants
  Participantes a las formaciones

- #### Trainings
  Programas de formación

- #### AttendantTrainings
  Relaciona participantes con las formaciones que han asistido y almacena los certificados de cada formación

## Preguntas

Si tienen alguna pregunta escriban en el grupo y consultar la documentación de [Next js](https://nextjs.org) y [Payload CMS](http://payloadcms.com)
