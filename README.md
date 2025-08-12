# 🎬🍻 Movie and Beer App
## React + TypeScript + Vite

Una aplicación web colaborativa para que tu grupo de amigos no vuelvan a preguntarse: "¿Qué película vemos hoy?". 
Creada para gestionar listas de películas compartidas de forma sencilla, rápida y en tiempo real.

---

## ✨ Features Actuales

* **🔐 Autenticación con Google:** Inicio de sesión seguro y rápido utilizando cuentas de Google.
* **📝 Lista Compartida en Tiempo Real:** Todas las películas se añaden a una única lista que se actualiza instantáneamente para todos los miembros gracias a Firestore.
* **➕ Añadir Películas:** Un formulario simple para agregar nuevas películas a la lista.
* **🗑️ Eliminar Películas Propias:** Cada usuario puede eliminar únicamente las películas que ha añadido.
* **✅ Marcar como "Vista":** Lleva un registro de las películas que ya han visto, moviéndolas a una sección separada para mantener la lista de pendientes siempre limpia.

---

## 🛠️ Tech Stack

* **Frontend:** [React](https://react.dev/) con [Vite](https://vitejs.dev/) y [TypeScript](https://www.typescriptlang.org/)
* **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
* **Backend & Base de Datos:** [Firebase](https://firebase.google.com/) (Authentication y Firestore)
* **Entorno de Desarrollo:** [Node.js](https://nodejs.org/) v20.19.0

---

## 🚀 Cómo Empezar

Sigue estos pasos para levantar el proyecto en tu máquina local.

### **Prerrequisitos**

1.  Tener instalado [Node.js](https://nodejs.org/) (versión 20.19.0 o superior).
2.  Tener una cuenta de [Firebase](https://firebase.google.com/) para configurar el backend.

### **Instalación y Configuración**

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/tu-usuario/tu-repositorio.git](https://github.com/tu-usuario/tu-repositorio.git)
    cd tu-repositorio
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Configura Firebase:**
    * Crea un nuevo proyecto en la [consola de Firebase](https://console.firebase.google.com/).
    * Habilita **Authentication** con el proveedor de **Google**.
    * Crea una base de datos de **Firestore** y establece las reglas de seguridad para permitir la lectura/escritura solo a usuarios autenticados.
    * Crea un archivo `.env.local` en la raíz del proyecto.
    * Busca las credenciales de tu proyecto en Firebase (`Configuración del proyecto` > `Tus apps`) y añádelas al archivo `.env.local` de la siguiente manera:

    ```env
    VITE_FIREBASE_API_KEY="TU_API_KEY"
    VITE_FIREBASE_AUTH_DOMAIN="TU_AUTH_DOMAIN"
    VITE_FIREBASE_PROJECT_ID="TU_PROJECT_ID"
    VITE_FIREBASE_STORAGE_BUCKET="TU_STORAGE_BUCKET"
    VITE_FIREBASE_MESSAGING_SENDER_ID="TU_MESSAGING_SENDER_ID"
    VITE_FIREBASE_APP_ID="TU_APP_ID"
    ```

4.  **Ejecuta la aplicación:**
    ```bash
    npm run dev
    ```
    ¡Abre `http://localhost:5173` (o el puerto que indique Vite) en tu navegador y listo!

---

## 🗺️ Roadmap y Mejoras

Lista de funcionalidades y mejoras planeadas para el futuro. ¡Las contribuciones son bienvenidas!

### **🚀 Próximas features**

* **🗣️ Comentarios:** Permitir a los usuarios dejar comentarios en cada película.
* **⭐ Sistema de valoración:** Implementar un sistema de 1 a 5 estrellas para calificar las películas después de verlas.
* **📄 Página de detalle:** Crear una vista individual para cada película que muestre toda su información, comentarios y valoraciones.
* **🔒 Listas privadas:** Funcionalidad para crear múltiples listas e invitar a diferentes grupos de amigos, restringiendo el acceso por cuenta de Google.
* **🍺 Sugerencias de cerveza:** ¡Haciendo honor al nombre! Integrar una API para sugerir un maridaje de cerveza artesanal según el género de la película.
* **🔔 Notificaciones:** Alertar a los usuarios cuando alguien añade una nueva película a una de sus listas.

### **🔧 Mejoras de código y UI/UX**

* **🤖 Integración con API de películas:** Utilizar una API como [The Movie Database (TMDB)](https://www.themoviedb.org/documentation/api) para autocompletar los datos de las películas (póster, sinopsis, director, etc.) y evitar la carga manual.
* **🖼️ Subida de imágenes:** Permitir subir una imagen de portada para la película directamente desde el PC a Firebase Storage.
* **🔍 Filtros y ordenamiento:** Añadir opciones para filtrar películas por género o plataforma, y ordenarlas por fecha de adición, valoración o título.
* **✨ Animaciones y transiciones:** Implementar transiciones más suaves y elegantes para mejorar la experiencia de usuario al añadir, marcar o eliminar elementos.
* **👤 Perfiles de usuario:** Una pequeña sección donde cada usuario pueda ver las películas que ha añadido y sus valoraciones.
* **📱 Mejoras en header y footer:** Añadir navegación útil en el header y un footer con información del proyecto y enlaces.
* **🧪 Aumentar cobertura de tests:** Implementar tests unitarios y de integración para asegurar la robustez de la aplicación.
