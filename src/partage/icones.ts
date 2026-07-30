import {
  BedDouble,
  BookOpen,
  Bus,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  Copy,
  CreditCard,
  Download,
  Ellipsis,
  Gift,
  Handshake,
  Hash,
  Heart,
  IceCreamCone,
  Landmark,
  Languages,
  Map,
  MapPin,
  MessagesSquare,
  MilkOff,
  Pill,
  Plane,
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
  Waves,
  Wallet,
  WifiOff,
  X,
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

  // Types de lieux. La clé `transport` est déjà déclarée plus haut pour la
  // catégorie de dépense du même nom, et partage volontairement son icône.
  site: Landmark,
  hebergement: BedDouble,
  supermarche: ShoppingCart,
  glacier: IceCreamCone,
  manger: Utensils,

  // Sections de phrases. Celles dont l'icône existe déjà réutilisent sa clé :
  // `manger` pour le restaurant, `supermarche`, `visites`, `plage`, `transport`.
  laitage: MilkOff,
  comprendre: MessagesSquare,
  nombres: Hash,
  sante: Pill,
  plage: Waves,
  orientation: Compass,
  achats: CreditCard,
  urgence: Siren,
  politesse: Handshake,
  drague: Heart,

  // Actions et états
  carte: Map,
  recherche: Search,
  bus: Bus,
  avion: Plane,
  horsLigne: WifiOff,
  supprimer: Trash2,
  copier: Copy,
  fermer: X,
  precedent: ChevronLeft,
  suivant: ChevronRight,
  heure: Clock,
  telecharger: Download,
  valide: Check,
} as const

export type NomIcone = keyof typeof ICONES
