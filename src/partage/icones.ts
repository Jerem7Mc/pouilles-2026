import {
  BedDouble,
  BookOpen,
  Check,
  Compass,
  Copy,
  CreditCard,
  Download,
  Ellipsis,
  Gift,
  Handshake,
  Heart,
  IceCreamCone,
  Languages,
  Map,
  MapPin,
  MilkOff,
  Search,
  Settings,
  ShoppingBasket,
  ShoppingCart,
  Siren,
  Ticket,
  TrainFront,
  Trash2,
  Utensils,
  UtensilsCrossed,
  Wallet,
  WifiOff,
} from 'lucide-vue-next'

/**
 * Registre unique des icônes. Les fichiers de données ne référencent qu'un nom
 * de clé, jamais un composant : ils restent sérialisables et sans dépendance
 * vers la couche d'affichage. Chaque icône est importée nommément pour que le
 * bundle ne contienne que celles réellement utilisées.
 */
export const ICONES = {
  // Catégories de dépenses
  transport: TrainFront,
  repas: UtensilsCrossed,
  courses: ShoppingBasket,
  glaces: IceCreamCone,
  visites: Ticket,
  souvenirs: Gift,
  divers: Ellipsis,

  // Navigation
  journal: BookOpen,
  phrases: Languages,
  lieux: MapPin,
  depenses: Wallet,
  reglages: Settings,

  // Types de lieux
  hebergement: BedDouble,
  supermarche: ShoppingCart,
  glacier: IceCreamCone,
  manger: Utensils,

  // Sections de phrases
  laitage: MilkOff,
  orientation: Compass,
  achats: CreditCard,
  urgence: Siren,
  politesse: Handshake,
  drague: Heart,

  // Actions et états
  carte: Map,
  recherche: Search,
  horsLigne: WifiOff,
  supprimer: Trash2,
  copier: Copy,
  telecharger: Download,
  valide: Check,
} as const

export type NomIcone = keyof typeof ICONES
