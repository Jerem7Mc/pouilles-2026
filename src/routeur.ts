import { createRouter, createWebHistory } from 'vue-router'
import DepensesView from './depenses/DepensesView.vue'
import JournalView from './journal/JournalView.vue'
import LieuxView from './lieux/LieuxView.vue'
import PhrasesView from './phrases/PhrasesView.vue'
import ReglagesView from './reglages/ReglagesView.vue'

/**
 * URL propres, sans `#`.
 *
 * Cela demande deux choses, toutes deux en place : une réécriture côté
 * hébergeur (`vercel.json`) pour que `/lieux` serve `index.html`, et le
 * `navigateFallback` de Workbox pour que la même chose vaille hors-ligne depuis
 * le service worker. En développement, Vite assure ce repli tout seul.
 */
export const routeur = createRouter({
  history: createWebHistory(),
  routes: [
    // La racine mène au journal : c'est l'écran de contexte du jour. La saisie
    // de dépense reste à un seul geste grâce au pavé collé en bas d'écran.
    { path: '/', redirect: { name: 'journal' } },
    { path: '/journal', name: 'journal', component: JournalView, meta: { titre: 'Journal' } },
    { path: '/phrases', name: 'phrases', component: PhrasesView, meta: { titre: 'Phrases' } },
    { path: '/lieux', name: 'lieux', component: LieuxView, meta: { titre: 'Lieux' } },
    { path: '/depenses', name: 'depenses', component: DepensesView, meta: { titre: 'Dépenses' } },
    { path: '/reglages', name: 'reglages', component: ReglagesView, meta: { titre: 'Réglages' } },
    { path: '/:chemin(.*)', redirect: { name: 'journal' } },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
