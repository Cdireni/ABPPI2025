
# Proyecto Integrador – Procesamiento de datos con APIs REST

**Carlos Direni**  
**DNI: 28.117.281**  
**Tecnicatura en Ciencias de Datos e Inteligencia Artificial**  

---

## 🧠 Descripción del Proyecto

Este proyecto fue desarrollado como parte del módulo ABP: *Procesamiento de datos con APIs REST*.  
El objetivo fue construir una aplicación web interactiva para explorar y analizar productos utilizando tecnologías modernas como **React**, **Axios**, **Tailwind CSS** y la API pública de **DummyJSON**.

---

## 🚀 Funcionalidades Implementadas

### 🔹 Semana 1 – React + Axios + Búsqueda
- Consumo de API con Axios (`https://dummyjson.com/products`)
- Listado dinámico de productos (nombre y precio)
- Input de búsqueda por título
- Mensaje si no hay coincidencias
- Uso de hooks: `useState`, `useEffect`
- Botón para mostrar/ocultar estadísticas

### 🔹 Semana 2 – Tailwind CSS + Componentización
- Integración completa de **Tailwind CSS**
- Diseño responsivo con clases utilitarias
- Separación de componentes:
  - `App`
  - `ProductList`
  - `ProductItem`
  - `StatsPanel`
  - `ExportButtons`
  - `SearchBar`
- Implementación de **modo oscuro** con `useRef`

### 🔹 Semana 3 – Filtrado y Ordenamiento
- Filtro por categoría
- Ordenamiento por precio y rating (ascendente / descendente)
- Combina búsqueda, filtros y ordenamiento
- Lógica con `filter`, `sort`, `includes`

### 🔹 Semana 4 – Estadísticas Detalladas
- Cálculo de:
  - Precio máximo
  - Precio mínimo
  - Precio promedio
- Estadísticas que se actualizan dinámicamente con los filtros
- Uso de métodos como `map`, `reduce`, `Math.max`, `Math.min`

---

## 🧾 Tecnologías utilizadas

- React
- Vite
- Tailwind CSS
- Axios
- DummyJSON API
