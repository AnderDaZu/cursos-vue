<template>
    <h2>{{ course.title }}</h2>

    <p>{{ course.description }}</p>

    <p>
        <b>Categoría:</b>
        {{ category.name }}
    </p>
    <!-- {{ course }} -->
</template>

<script>
export default {
    data(){
        return {
            course: {},
            category: {}
        }
    },
    props: [

    ],
    created(){
        this.getCourse()
    },
    methods: {
        getCourse(){
            this.axios.get('http://academy.test/api/courses/' + this.$route.params.id + '?included=category')
                .then(response => {
                    this.course = response.data
                    this.category = response.data.category
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