#  Geolocalización con firebase

Implementación de servicio de obtención de latitud y longitud con el uso de plugins y almacenamiento de coordenadas con el servicio de storage de Firebase.

## ⏬ Instalacion

Clona el proyecto

```bash
  git clone https://github.com/martinizin/GeolocalizacionFirebase.git
```

Posiciónate la carpeta del proyecto

```bash
  cd my-project
```

Instala las dependencias

```bash
  npm install
```

Inicia el servidor

```bash
  ionic serve
```



La aplicación utilizará por defecto el puerto 4200

```bash
  http://localhost:4200/
```

Todo esto es necesario para que pueda funcionar correctamente

##  Variables de Entorno

Para ejecutar este proyecto necesitaras dirijirte a archivo .env y colocar tus variables de entorno de la siguiente manera:

```js
  firebaseConfig :
  {
  apiKey: 'API_KEY',
  authDomain: 'DOMINIO',
  databaseURL: 'URL',
  projectId: 'ID',
  storageBucket: 'Storage',
  messagingSenderId: 'ID_Mensaje',
  appId: 'APP_ID',
  measurementId: 'ID_Medida'
  }
```

##  Screenshots de funcionamiento del proyecto

- LOCAL

  ![image](https://github.com/martinizin/GeolocalizacionFirebase/assets/117743846/7e555b4d-3f29-409e-b94f-545a3612eab5)

- HOSTING

- ALMACENAMIENTO EN FIREBASE

  ![image](https://github.com/martinizin/GeolocalizacionFirebase/assets/117743846/2a2253d6-aff6-4332-b51c-f2b7eee18174)


