# SySale Frontend

Sistema de gestión de pedidos y tiendas desarrollado con React.

## 📋 Descripción

**SySale** es una aplicación frontend que permite gestionar pedidos y tiendas de manera eficiente. Construida con **React 19.2.0** y **Create React App**, proporciona una interfaz intuitiva para la administración de operaciones comerciales.

## Características

- Gestión de pedidos (crear, listar, editar)
- Administración de tiendas
- Interfaz reactiva y moderna
- Componentes reutilizables

## Estructura del Proyecto

```
sysale/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── pedido/
│   │   │   ├── PedidoForm.js
│   │   │   └── PedidoList.js
│   │   └── tienda/
│   │       ├── TiendaForm.js
│   │       └── TiendaList.js
│   ├── App.js
│   └── index.js
└── package.json
```

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 14.0 o superior)
- **npm** (versión 6.0 o superior) o **yarn**

> [!TIP]
> Puedes verificar las versiones instaladas con:
> ```bash
> node --version
> npm --version
> ```

## Instalación

1. **Clona el repositorio:**

```bash
git clone https://github.com/EleazarDevFS/sysaleFront.git
cd sysaleFront
```

2. **Instala las dependencias:**

```bash
npm install
```

> [!NOTE]
> Si prefieres usar **yarn**, ejecuta: `yarn install`

## Ejecución del Proyecto

### Modo Desarrollo

Para ejecutar la aplicación en modo desarrollo:

```bash
npm start
```

La aplicación se abrirá automáticamente en [http://localhost:3000](http://localhost:3000)

> [!TIP]
> El modo desarrollo incluye **Hot Reload**, por lo que los cambios se reflejarán automáticamente sin necesidad de recargar la página manualmente.

### Construir para Producción

Para crear una versión optimizada para producción:

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `build/`

> [!IMPORTANT]
> La versión de producción está minificada y optimizada para el mejor rendimiento.

### Ejecutar Pruebas

Para ejecutar las pruebas en modo interactivo:

```bash
npm test
```

## Conexión con el Backend

> [!WARNING]
> Este frontend requiere que el backend esté ejecutándose. Asegúrate de configurar correctamente la URL del API en tu aplicación.

Por defecto, la aplicación espera que el backend esté disponible en:
- **Desarrollo**: `http://localhost:8080` (ajusta según tu configuración)

## Tecnologías Utilizadas

- **React** 19.2.0
- **React DOM** 19.2.0
- **React Scripts** 5.0.1
- **Testing Library** (Jest DOM, React Testing Library)
- **Web Vitals**

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia el servidor de desarrollo |
| `npm run build` | Construye la aplicación para producción |
| `npm test` | Ejecuta las pruebas unitarias |
| `npm run eject` | Expone la configuración de Webpack (⚠️ irreversible) |

> [!WARNING]
> El comando `npm run eject` es **irreversible**. Solo úsalo si necesitas control total sobre la configuración.

## Solución de Problemas

### El puerto 3000 ya está en uso

Si el puerto 3000 está ocupado, puedes:

1. Matar el proceso que usa el puerto:
```bash
kill -9 $(lsof -t -i:3000)
```

2. O usar un puerto diferente:
```bash
PORT=3001 npm start
```

### Errores de dependencias

Si encuentras errores de dependencias, intenta:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Problemas con permisos

Si tienes problemas de permisos al instalar dependencias:

```bash
sudo npm install --unsafe-perm=true --allow-root
```

> [!NOTE]
> En Linux, evita usar `sudo` con npm. Considera configurar npm para usar un directorio de usuario.

## Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto es privado y está sujeto a los términos establecidos por el propietario.

## Autor

**EleazarDevFS**

- GitHub: [@EleazarDevFS](https://github.com/EleazarDevFS)

## Soporte

Si tienes alguna pregunta o problema, por favor abre un issue en el repositorio.

---

**¡Si este proyecto te fue útil, considera darle una estrella!**
