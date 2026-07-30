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
