import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default function usePagination(){
    // const pagination = {}
    const pagination = ref({}) // ref permite asignar valores de manera dinamica
    const route = useRoute() // permite obtener la ruta actual
    const router = useRouter() // permite redireccionar a otras rutas

    const setPagination = ( response ) => {
        pagination.value = {
            links: response.links,
            last_page: response.last_page
        }
    }

    // Propiedades computadas
    const page = computed( () => {

        let page = route.query.page ?? 1

        if ( page > pagination.value.last_page )
        {
            router.replace({
                query: {
                    page: pagination.value.last_page
                }
            })
            return pagination.value.last_page
        }

        return page
    } );

    const changePage = (url) => {
        router.replace({
            query: {
                page: url.split('page=')[1]
            }
        })  
    }

    return {
        pagination,
        setPagination,
        page,
        changePage
    }
}