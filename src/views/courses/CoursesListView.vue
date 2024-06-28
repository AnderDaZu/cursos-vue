<template>
    <h2>Agregar Curso</h2>

    <!-- {{ errors }} -->
    <ul v-if="errors.length > 0">
        <li v-for="error in errors" :key="error.id" class="error">
            {{ error }}
        </li>
    </ul>

    <div class="card mb-4">
        <form @submit.prevent="addCourse" class="card-body">
            <div class="mb-2">
                <label for="title" class="label">Título</label>
                <input v-model="course.title" type="text" name="title" id="title" class="form-control" placeholder="Ingrese título del curso">
            </div>
            
            <div class="mb-2">
                <label for="title" class="label">Descripción</label>
                <textarea v-model="course.description" name="title" id="title" class="form-control" rows="3" placeholder="Ingrese una descripción"></textarea>
            </div>
    
            <div class="mb-2">
                <label for="category_id" class="label">Categoría</label>
                <select v-model="course.category_id" name="category_id" id="category_id" class="form-control">
                    <option value="" selected disabled>Selecciona una categoría</option>
                    <option v-for="category in categories" :key="'category-' + category.id" :value="category.id">{{ category.name }}</option>
                </select>
            </div>
    
            <button type="submit" class="btn btn-success btn-md mt-2 mb-2">Agregar</button>
        </form>
    </div>

    <h2>Lista de Cursos</h2>

    <div class="text-start d-flex flex-column flex-sm-row column-gap-3 mb-2 ">
        <h3 class="">Buscador</h3>

        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">🔍</span>
            <input v-model="search" type="text" class="form-control" placeholder="Ingrese una palabra para filtrar">
        </div>
    </div>

    <ul class="list-group">
        <li v-for="course in courses" :key="'course' + course.id" class="list-group-item mb-2">
            {{ course.id }}. {{ course.title }} 
            <router-link :to="{ name: 'courseDetails', params: { id: course.id } }" class="btn btn-secondary py-0 px-2">👁️‍🗨️</router-link> ||
            <router-link :to="{ name: 'courseEdit', params: { id: course.id } }" class="btn btn-primary py-0 px-2">Editar</router-link> ||
            <button @click="deleteCourse(course.id)" class="btn btn-danger py-0 px-2">Eliminar</button>
        </li>
    </ul>

    <!-- paginación -->
     <div class="d-flex justify-content-center">
         <nav aria-label="...">
             <ul class="pagination">
                 <li class="page-item" 
                    v-for="pagination_link in pagination.links" 
                    :key="'pagination_link-' + pagination_link.label"
                    :class="{ 
                        'disabled': pagination_link.url == null,
                        'active': pagination_link.active
                    }">
                     <!-- no se agrega nada ya que el valor que viene, viene en html por ello mejor se usa -->
                    <a class="page-link" 
                        @click="changePage(pagination_link.url)"
                        v-html="pagination_link.label" 
                        style="cursor: pointer;">
                    </a>
                </li>
             </ul>
         </nav>
     </div>

</template>

<script>

// import { ref, computed } from 'vue'
// import { useRoute, useRouter } from 'vue-router'

// import usePagination from '../../composables/usePagination.js';
import usePagination from '@/composables/usePagination';

export default {

    // composition api
    setup(){ // se ejecuta antes de crearse el componente
        const { pagination, setPagination, page, changePage } = usePagination()

        return {
            pagination,
            setPagination,
            page,
            changePage
        }
    },

    // options api
    data(){
        return {
            courses: [],
            categories: [],
            course: {
                title: '',
                description: '',
                category_id: ''
            },
            errors: [],
            per_page: 10,
            // pagination: {},
            search: '',
        }
    },
    created(){
        this.getCourses(),
        this.getCategories()
    },
    computed: {
        // page(){
        //     // devuelve la el numero de página que el usuario esta enviando en la url, ej: http://localhost:8080/courses?page=1
        //     // return this.$route.query.page ?? 1

        //     let page = this.$route.query.page ?? 1

        //     if ( page > this.pagination.last_page )
        //     {
        //         this.$router.replace({
        //             query: {
        //                 page: this.pagination.last_page
        //             }
        //         })
        //         return this.pagination.last_page
        //     }

        //     return page
        // }
    },
    watch: {
        page(){
            this.getCourses()
        },
        search(){
            this.getCourses()
        }
    },
    methods: {
        getCourses(){
            // this.axios.get('http://academy.test/api/courses?per_page=' + this.per_page + '&page=' + this.page + '&filter[title]=' + this.search)
            this.axios.get('http://academy.test/api/courses', {
                params: {
                    per_page: this.per_page,
                    page: this.page,
                    filter: {
                        title: this.search
                    },
                    // 'filter[title]': this.search
                }
            })
                .then(response => {
                    let res = response.data
                    this.courses = res.data

                    this.setPagination(res)

                    // this.pagination = {
                    //     links: res.links,
                    //     last_page: res.last_page
                    // }
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
        },
        addCourse(){
            this.axios.post('http://academy.test/api/courses', this.course)
                .then( response => {
                    console.log(response)
                    this.getCourses()
                    // this.courses.push(response.data)
                    this.course = {
                        title: '',
                        description: '',
                        category_id: ''
                    }
                    this.errors = []
                })
                .catch(error => {
                    console.log(error)
                    this.errors = Object.values(error.response.data.errors).flat()
                })
        },
        deleteCourse(id){
            
            this.axios.delete('http://academy.test/api/courses/' + id)
                .then( response => {
                    console.log(response)
                    // this.getCourses()
                    // this.courses = this.courses.filter( course => course.id != id );
                    this.getCourses()
                })
                .catch(error => {
                    console.log(error)
                })
        },
        // changePage(url){
        //     this.$router.replace({
        //         query: {
        //             page: url.split('page=')[1]
        //         }
        //     })
        // }

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
.button-cstm {
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
.error {
    color: red;
    font-size: 12px;
    margin-top: 6px;
    margin-bottom: 0;
    padding: 0;
    text-align: left;
}
</style>