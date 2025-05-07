import { createRouter, createWebHistory } from 'vue-router'
import ContactList from '../components/ContactList.vue'
import AddContact from '../components/AddContact.vue'
import ContactDetail from '../components/ContactDetail.vue'

const routes = [
    {
        name: 'ContactList',
        path: '/',
        component: ContactList
    },
    {
        name: 'AddContact',
        path: '/add-contact',
        component: AddContact
    },
    {
        name: 'ContactDetail',
        path: '/contact-detail/:id',
        component: ContactDetail
    }

]

const router = createRouter({
    history: createWebHistory(), 
    routes
})

export default router