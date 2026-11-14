# HardwareGuru - Auth Service (Identidad y Sesiones)

Microservicio de autenticación de **HardwareGuru** (Repositorio 3 de 7). Este servicio es el único responsable de gestionar la identidad de los usuarios, proteger las contraseñas mediante encriptación y emitir los tokens de acceso (JWT) para el resto del ecosistema. 

Cuenta con su propia base de datos aislada, cumpliendo con los estándares de la arquitectura de microservicios.

## 🚀 Arquitectura y Responsabilidades

*   **Registro (`/register`):** Recibe los datos del usuario, verifica que el correo no exista, encripta la contraseña usando `bcrypt` (Salt 10) y persiste la entidad en PostgreSQL.
*   **Login (`/login`):** Valida las credenciales y, en caso de éxito, firma digitalmente un Token JWT (`jsonwebtoken`) válido por 4 horas. Este token incluye el `user_id`, el cual será extraído más adelante por el API Gateway para autorizar peticiones hacia el MCP Server y el Simulador Java.
*   **Base de Datos Aislada:** Se conecta exclusivamente a `hardwareguru_users`. Utiliza el paquete `pg` nativo y cuenta con una función de inicialización que construye la tabla de usuarios automáticamente al arrancar.

## 🛠️ Tecnologías

*   **Entorno:** Node.js + TypeScript (ESM Modules)
*   **Framework Web:** Express.js
*   **Seguridad:** bcrypt, jsonwebtoken (JWT)
*   **Base de Datos:** PostgreSQL (`pg`)

## 📋 Requisitos Previos

*   **Node.js** (v18 o superior).
*   Un servidor **PostgreSQL** corriendo localmente o mediante Docker en el puerto `5432`.

## ⚙️ Instalación y Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone <tu-url-del-repo-3>
   cd Taller2-Arquitectura-3-Auth-Service




Instalar dependencias:

Bash
npm install
Configurar Base de Datos en Docker (Opcional pero recomendado):
Si ya tienes el contenedor de PostgreSQL del Repositorio 1 corriendo, debes crear la base de datos de usuarios ejecutando este comando en una terminal:



DOS
docker exec -it hg_postgres psql -U postgres -c "CREATE DATABASE hardwareguru_users;"
Variables de Entorno:
Crea un archivo .env en la raíz del proyecto con las siguientes variables:



Fragmento de código
PORT=4000
DB_USER=postgres
DB_PASSWORD=adminpassword
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hardwareguru_users
JWT_SECRET=super_secreto_hardwareguru_2026



Para iniciar el servidor en modo desarrollo (con recarga automática):

Bash
npm run dev
En la consola verás la confirmación de que el servicio está corriendo en el puerto 4000 y que la tabla users ha sido creada o verificada exitosamente en PostgreSQL.





🌐 Endpoints (API REST)
1. Registro de Usuario
POST /api/auth/register

Body (JSON):

JSON
{
  "nombre": "Diego",
  "email": "diego@test.com",
  "password": "mi_password_seguro"
}
2. Iniciar Sesión
POST /api/auth/login

Body (JSON):

JSON
{
  "email": "diego@test.com",
  "password": "mi_password_seguro"
}
Respuesta exitosa: Devuelve un JSON con el mensaje y el token JWT que deberá ser adjuntado en los headers de futuras peticiones a través del API Gateway.





Estructura del Proyecto

Taller2-Arquitectura-3-Auth-Service/
├── src/
│   ├── config/
│   │   └── db.ts                # Conexión a DB y creación de tabla
│   ├── controllers/
│   │   └── authController.ts    # Lógica bcrypt y emisión de JWT
│   ├── routes/
│   │   └── authRoutes.ts        # Declaración de rutas POST
│   └── index.ts                 # Configuración Express
├── .env                         # Variables de entorno (Oculto)
├── package.json                 # Dependencias
└── tsconfig.json                # Configuración TypeScript