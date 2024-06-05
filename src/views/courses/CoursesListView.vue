<template>
    <h2>Agregar Curso</h2>
    <form action="" method="post">
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <label for="title" class="label">Título</label>
            <input type="text" name="title" id="title" class="input" placeholder="Ingrese título del curso">
        </div>
        
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; margin-top: 10px;">
            <label for="title" class="label">Descripción</label>
            <textarea name="title" id="title" class="input" rows="3" placeholder="Ingrese una descripción"></textarea>
        </div>

        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; margin-top: 10px;">
            <label for="category_id" class="label">Categoría</label>
            <select name="category_id" id="category_id" class="input">
                <option v-for="category in categories" :key="'category-' + category.id" :value="category.id">{{ category.name }}</option>
            </select>
        </div>

        <input type="submit" value="Guardar" class="button">
    </form>

    <h2>Lista de Cursos</h2>
    <ul>
        <li v-for="course in courses" :key="'course' + course.id">
            {{ course.id }}. {{ course.title }} 
            <router-link :to="{ name: 'courseDetails', params: { id: course.id } }">👁️‍🗨️</router-link>
        </li>
    </ul>
</template>

<script>
export default {
    data(){
        return {
            courses: [],
            categories: [],
        }
    },
    created(){
        this.getCourses(),
        this.getCategories()
    },
    methods: {
        getCourses(){
            this.axios.get('http://academy.test/api/courses')
                .then(response => {
                    this.courses = response.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getCategories(){
            this.axios('http://academy.test/api/categories')
                .then(response => {
                    this.categories = response.data
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
}
</script>

<style>
.label {
    display: block;
    margin-bottom: 6px;
    font-size: 14px;
    font-weight: 500;
    color: #2c3e50;
}
.input {
    background: #ececec;
    border: solid #989898 2px;
    border-radius: 5px;
    color: #2c3e50;
    font-size: 14px;
    padding: 6px;
    max-width: 300px;
    min-width: 300px;
    width: 300px;
}
.button {
    background: #42b983;
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: 14px;
    padding: 10px;
    width: 300px;
    margin-top: 20px;
    cursor: pointer;
}
</style>