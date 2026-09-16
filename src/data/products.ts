import heroBedroomImg from '../assets/images/arton_consoft_hero_1789592503169.jpg';
import factoryCraftsmanImg from '../assets/images/dormilux_factory_worker_1789503519564.jpg';
import catMatelasImg from '../assets/images/cat_matelas_corner_1789503532815.jpg';
import catSommierImg from '../assets/images/cat_sommier_slats_1789503542852.jpg';
import catOreillersImg from '../assets/images/cat_pillows_soft_1789503553898.jpg';
import catCollectionsImg from '../assets/images/cat_bedroom_suite_1789503564553.jpg';

// Real Arton Confort mattresses with authentic photography
import prodConsoftImg from '../assets/images/matelas_consoft_1789590371464.jpg';
import prodLaNuitImg from '../assets/images/matelas_la_nuit_1789590384423.jpg';
import prodFeelsoftImg from '../assets/images/matelas_feelsoft_1789590396331.jpg';
import prodRelaxImg from '../assets/images/matelas_relax_1789590411355.jpg';

import { Product, CategoryItem, Review } from '../types';

export {
  heroBedroomImg,
  factoryCraftsmanImg,
  catMatelasImg,
  catSommierImg,
  catOreillersImg,
  catCollectionsImg,
  prodConsoftImg,
  prodLaNuitImg,
  prodFeelsoftImg,
  prodRelaxImg,
};

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'matelas',
    title: 'Matelas',
    subtitle: 'Confort pour tous les besoins →',
    image: catMatelasImg,
    link: '#matelas',
  },
  {
    id: 'sommiers',
    title: 'Sommiers',
    subtitle: 'Le soutien idéal →',
    image: catSommierImg,
    link: '#sommiers',
  },
  {
    id: 'accessoires',
    title: 'Oreillers & Accessoires',
    subtitle: 'Le détail qui change tout →',
    image: catOreillersImg,
    link: '#accessoires',
  },
  {
    id: 'collections',
    title: 'Nos collections',
    subtitle: 'Des gammes pour chaque style →',
    image: catCollectionsImg,
    link: '#collections',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'matelas-consoft',
    name: 'Matelas Consoft',
    badge: 'Meilleure vente',
    badgeColor: '#204033', // Deep forest green
    price: 2890,
    originalPrice: 3490,
    rating: 4.9,
    reviewsCount: 148,
    image: prodConsoftImg,
    description: 'Le matelas Consoft par Arton Confort allie une mousse haute résilience indéformable et un accueil doux pour un soutien anatomique optimal. Finition damassée luxueuse avec bandeau noir et étiquette brodée Consoft.',
    features: [
      'Mousse haute densité Arton Confort 38 kg/m³',
      'Plateau supérieur matelassé grand confort',
      'Bande d\'aération périmétrique respirante',
      'Tissu antibactérien et anti-acariens certifié',
    ],
    firmness: 'Équilibré',
    thickness: '25 cm',
    composition: 'Mousse haute densité & accueil moelleux Consoft',
    sizes: [
      { size: '90x190 cm', price: 2890 },
      { size: '140x190 cm', price: 3890 },
      { size: '160x200 cm (Queen)', price: 4490 },
      { size: '180x200 cm (King)', price: 5190 },
      { size: '200x200 cm (Super King)', price: 5990 },
    ],
  },
  {
    id: 'matelas-feelsoft',
    name: 'Matelas Feelsoft',
    badge: 'Coup de cœur',
    badgeColor: '#1e5e4d', // Fresh emerald badge
    price: 3890,
    originalPrice: 4690,
    rating: 4.9,
    reviewsCount: 112,
    image: prodFeelsoftImg,
    description: 'Le matelas Feelsoft par Arton Confort intègre un généreux surmatelas (Pillow-Top) directement cousu en surface. Une sensation d\'enveloppement immédiat et une indépendance de couchage absolue pour les couples.',
    features: [
      'Surmatelas Pillow-Top moelleux intégré',
      'Suspension ressorts ensachés indépendants',
      'Capitonné sur structure velours capitonnée',
      'Technologie thermorégulatrice été/hiver',
    ],
    firmness: 'Moelleux',
    thickness: '28 cm',
    composition: 'Pillow-Top confort nuage & ressorts ensachés',
    sizes: [
      { size: '90x190 cm', price: 3890 },
      { size: '140x190 cm', price: 4990 },
      { size: '160x200 cm (Queen)', price: 5690 },
      { size: '180x200 cm (King)', price: 6490 },
      { size: '200x200 cm (Super King)', price: 7290 },
    ],
  },
  {
    id: 'matelas-la-nuit',
    name: 'Matelas La Nuit',
    badge: 'Luxe Palace',
    badgeColor: '#9A6B27', // Gold luxurious badge
    price: 5490,
    originalPrice: 6590,
    rating: 5.0,
    reviewsCount: 96,
    image: prodLaNuitImg,
    description: 'Le fleuron de l\'artisanat Arton Confort. Épaisseur somptueuse de 32 cm avec double nappe de suspension, capitonnage artisanal à la main et coutil damassé jacquard digne des plus grands palaces marocains.',
    features: [
      'Épaisseur majestueuse de 32 cm avec Euro-Top',
      'Capitonnage traditionnel noué à la main',
      'Double suspension ressorts titane haute durabilité',
      'Garnissage noble soie et fibres naturelles',
    ],
    firmness: 'Équilibré',
    thickness: '32 cm',
    composition: 'Suspension double nappe & Euro-Top capitonné main',
    sizes: [
      { size: '140x190 cm', price: 5490 },
      { size: '160x200 cm (Queen)', price: 6490 },
      { size: '180x200 cm (King)', price: 7690 },
      { size: '200x200 cm (Super King)', price: 8890 },
    ],
  },
  {
    id: 'matelas-relax',
    name: 'Matelas Relax',
    badge: 'Orthopédique',
    badgeColor: '#2B4C6F', // Deep navy badge
    price: 1990,
    originalPrice: 2490,
    rating: 4.8,
    reviewsCount: 165,
    image: prodRelaxImg,
    description: 'Le matelas orthopédique Relax par Arton Confort garantit un alignement vertébral parfait et un soutien ferme recommandé pour prévenir et soulager les maux de dos. Bande latérale d\'aération 3D.',
    features: [
      'Âme orthopédique haute résilience anti-affaissement',
      'Bande d\'aération technique 3D mesh respirante',
      'Soutien ferme et dynamique du rachis',
      'Idéal pour couchage quotidien ou chambres d\'amis',
    ],
    firmness: 'Ferme',
    thickness: '22 cm',
    composition: 'Mousse orthopédique haute résilience & coutil 3D',
    sizes: [
      { size: '90x190 cm', price: 1990 },
      { size: '140x190 cm', price: 2690 },
      { size: '160x200 cm (Queen)', price: 3190 },
      { size: '180x200 cm (King)', price: 3790 },
    ],
  },
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Youssef El Amrani',
    city: 'Casablanca (Gauthier)',
    rating: 5,
    date: 'Il y a 3 jours',
    productBought: 'Matelas Consoft (180x200)',
    title: 'Qualité exceptionnelle, fierté marocaine !',
    comment: 'Après avoir hésité avec des marques importées hors de prix, j\'ai choisi le Matelas Consoft d\'Arton Confort. Le confort est tout simplement bluffant et la livraison à Casablanca a été faite le lendemain avec installation dans notre chambre.',
    verified: true,
  },
  {
    id: 'rev-2',
    author: 'Salma Benjelloun',
    city: 'Rabat (Souissi)',
    rating: 5,
    date: 'Il y a 1 semaine',
    productBought: 'Matelas La Nuit (180x200)',
    title: 'Le confort d\'un palace 5 étoiles chez soi',
    comment: 'Le modèle La Nuit est somptueux. Les 32 cm d\'épaisseur et les finitions faites à la main rivalisent sans peine avec la literie des hôtels de luxe à Marrakech. Bravo pour cette confection marocaine de très haut niveau.',
    verified: true,
  },
  {
    id: 'rev-3',
    author: 'Driss Tazi',
    city: 'Marrakech (Guéliz)',
    rating: 5,
    date: 'Il y a 2 semaines',
    productBought: 'Matelas Feelsoft (160x200)',
    title: 'Le Pillow-Top est une merveille',
    comment: 'La sensation d\'accueil moelleux avec le maintien en profondeur est parfaite. Zéro mal de dos au réveil et aucune vibration quand mon épouse bouge la nuit. Je recommande Arton Confort les yeux fermés !',
    verified: true,
  },
  {
    id: 'rev-4',
    author: 'Kenza Alaoui',
    city: 'Tanger (Malabata)',
    rating: 5,
    date: 'Il y a 3 semaines',
    productBought: 'Matelas Relax (140x190)',
    title: 'Maintien orthopédique irréprochable',
    comment: 'Commandé pour notre chambre d\'hôtes à Tanger. Matelas ferme, respirant, très agréable même avec les températures estivales. Service client joignable directement par téléphone avec une vraie écoute.',
    verified: true,
  },
];
