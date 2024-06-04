<template>
    <h2>Lista de Cursos</h2>
    <ul>
        <li v-for="course in courses" :key="course.id">
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
        }
    },
    created(){
        this.getCourses()
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
        }
    }
}
</script>

<style>

</style>