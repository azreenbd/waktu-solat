import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home"
import NotFound from "../views/NotFound"
import { findState, findTown } from "@/assets/js/locations.js"

Vue.use(VueRouter)

// Unknown paths must not fall through to the state/town routes, otherwise every
// typo renders an empty prayer panel instead of a 404.
function guard(resolve) {
    return (to, from, next) => next(resolve(to.params) ? undefined : { name: 'notFound' })
}

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/404',
        name: 'notFound',
        component: NotFound
    },
    {
        path: '/:stateSlug',
        name: 'state',
        component: Home,
        beforeEnter: guard(params => findState(params.stateSlug))
    },
    {
        path: '/:stateSlug/:townSlug',
        name: 'town',
        component: Home,
        beforeEnter: guard(params => findTown(params.stateSlug, params.townSlug))
    },
    {
        path: '*',
        component: NotFound
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
