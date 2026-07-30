import { createRouter, createWebHashHistory } from 'vue-router'
import DepensesView from './depenses/DepensesView.vue'
import JournalView from './journal/JournalView.vue'
import LieuxView from './lieux/LieuxView.vue'
import PhrasesView from './phrases/PhrasesView.vue'
import ReglagesView from './reglages/ReglagesView.vue'

/**
 * Historique par hash volontairement : aucune règle de réécriture à configurer
 * chez l'hébergeur, et aucune erreur 404 possible au rechargement hors-ligne.
 */
export const routeur = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'depenses', component: DepensesView, meta: { titre: 'Dépenses' } },
    { path: '/journal', name: 'journal', component: JournalView, meta: { titre: 'Journal' } },
    { path: '/phrases', name: 'phrases', component: PhrasesView, meta: { titre: 'Phrases' } },
    { path: '/lieux', name: 'lieux', component: LieuxView, meta: { titre: 'Lieux' } },
    { path: '/reglages', name: 'reglages', component: ReglagesView, meta: { titre: 'Réglages' } },
    { path: '/:chemin(.*)', redirect: '/' },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
