# EasyMedia Social Network

EasyMedia es una red social diseñada para permitir a los usuarios expresar sus ideas y compartir contenido en línea. Este repositorio contiene tanto el frontend desarrollado con Angular como el backend desarrollado con Node.js.

## Estructura del Proyecto

- **frontend**: Contiene el código fuente del frontend desarrollado con Angular.
- **backend**: Contiene el código fuente del backend desarrollado con Node.js y Express.

## Requisitos Previos

- Node.js y npm instalados en tu sistema.
- Angular CLI instalado globalmente (`npm install -g @angular/cli`).

## Instrucciones de Instalación y Ejecución

### Frontend

1. Navega a la carpeta `frontend`: `cd frontend`.
2. Instala las dependencias: `npm install`.
3. Inicia el servidor de desarrollo: `ng serve`.
4. Abre tu navegador y visita `http://localhost:4200/`.

### Backend

1. Navega a la carpeta `backend`: `cd backend`.
2. Instala las dependencias: `npm install`.
3. Configura las variables de entorno en un archivo `.env` (puedes usar el archivo `.env.example` como referencia).
4. Inicia el servidor: `npm start`.
5. El backend estará disponible en `http://localhost:3000/`.

## Configuración de Variables de Entorno

En el backend, configura las siguientes variables de entorno en un archivo `.env` en la carpeta `backend` si quieres cambiar el token de seguridad de jwt:
