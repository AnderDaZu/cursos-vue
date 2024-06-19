# cursos

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# Diferencia entre $router y $route
this.$route y this.$router son dos propiedades que proporcionan información y métodos útiles para la navegación y la gestión de rutas. A continuación, te explico la diferencia entre ambas:

## this.$route
### Descripción
this.$route es un objeto que representa la ruta actual. Contiene información sobre la ruta que está siendo mostrada en ese momento.
### Propiedades Comunes
- path: la ruta completa (por ejemplo, /users/123).
- params: los parámetros de la ruta dinámica (por ejemplo, { id: '123' }).
- query: los parámetros de la consulta (por ejemplo, { search: 'vue' }).
- name: el nombre de la ruta, si tiene un nombre definido.
- fullPath: la ruta completa con la cadena de consulta (por ejemplo, /users/123?search=vue).
- hash: el hash de la URL (por ejemplo, #section1).
- matched: un array de objetos de ruta que coinciden con la ruta actual.
*Ejemplo:*
```js
export default {
  mounted() {
    console.log(this.$route.path); // Imprime la ruta actual
    console.log(this.$route.params); // Imprime los parámetros de la ruta
    console.log(this.$route.query); // Imprime los parámetros de la consulta
  }
};
```
## this.$router
### Descripción
this.$router es una instancia del enrutador de Vue Router. Proporciona métodos para manipular y navegar programáticamente entre rutas.
### Métodos Comunes
- push(location): navega a una nueva ruta. Acepta una cadena de ruta o un objeto de ubicación.
- replace(location): reemplaza la ruta actual en el historial del navegador con una nueva sin agregar una entrada adicional al historial.
- go(n): navega n pasos en el historial del navegador.
- back(): navega a la ruta anterior en el historial.
- forward(): navega a la ruta siguiente en el historial.
*Ejemplo:*
```js
export default {
  methods: {
    goToHome() {
      this.$router.push('/home'); // Navega a la ruta '/home'
    },
    goBack() {
      this.$router.back(); // Navega a la ruta anterior
    }
  }
};
```

## Resumen de las Diferencias
- this.$route: Es un objeto que proporciona información sobre la ruta actual.
> Uso: Obtener información sobre la ruta (parámetros, query, path, etc.).
- this.$router: Es una instancia del enrutador que permite la navegación programática.
> Uso: Navegar entre rutas y manipular el historial de navegación.

## Ejemplo completo
Aquí hay un ejemplo completo que muestra cómo usar tanto this.$route como this.$router en un componente Vue:
```js
<template>
  <div>
    <h1>Current Route: {{ $route.path }}</h1>
    <p>Params: {{ $route.params }}</p>
    <p>Query: {{ $route.query }}</p>
    <button @click="goToHome">Go to Home</button>
    <button @click="goBack">Go Back</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToHome() {
      this.$router.push('/home');
    },
    goBack() {
      this.$router.back();
    }
  }
};
</script>
```
En este ejemplo, this.$route se usa para mostrar información sobre la ruta actual, mientras que this.$router se usa para navegar entre rutas.
