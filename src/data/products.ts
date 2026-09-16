import heroBedroomImg from '../assets/images/dormilux_hero_bedroom_1789503508111.jpg';
import factoryCraftsmanImg from '../assets/images/dormilux_factory_worker_1789503519564.jpg';
import catMatelasImg from '../assets/images/cat_matelas_corner_1789503532815.jpg';
import catSommierImg from '../assets/images/cat_sommier_slats_1789503542852.jpg';
import catOreillersImg from '../assets/images/cat_pillows_soft_1789503553898.jpg';
import catCollectionsImg from '../assets/images/cat_bedroom_suite_1789503564553.jpg';
import prodEquilibreImg from '../assets/images/matelas_equilibre_1789503578206.jpg';
import prodSereniteImg from '../assets/images/matelas_serenite_1789503587888.jpg';
import prodNaturelImg from '../assets/images/matelas_naturel_1789503598441.jpg';
import prodPrestigeImg from '../assets/images/matelas_prestige_1789503609198.jpg';
import { Product, CategoryItem, Review } from '../types';

export {
  heroBedroomImg,
  factoryCraftsmanImg,
  catMatelasImg,
  catSommierImg,
  catOreillersImg,
  catCollectionsImg,
  prodEquilibreImg,
  prodSereniteImg,
  prodNaturelImg,
  prodPrestigeImg,
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
    id: 'matelas-equilibre',
    name: 'Matelas Équilibre',
    badge: 'Meilleure vente',
    badgeColor: '#204033', // Deep forest green matching screenshot
    price: 349,
    originalPrice: 429,
    rating: 4.8,
    reviewsCount: 124,
    image: prodEquilibreImg,
    description: 'Le parfait compromis entre accueil moelleux et soutien ferme. Conçu pour s\'adapter à toutes les morphologies et soulager les points de pression.',
    features: [
      'Mousse haute résilience 35 kg/m³',
      '7 zones de confort ergonomiques',
      'Housse thermorégulatrice lavable en machine',
      'Certifié Oeko-Tex Standard 100',
    ],
    firmness: 'Équilibré',
    thickness: '22 cm',
    composition: 'Mousse respirante & micro-perforée',
    sizes: [
      { size: '90x190 cm', price: 349 },
      { size: '90x200 cm', price: 369 },
      { size: '140x190 cm', price: 479 },
      { size: '140x200 cm', price: 499 },
      { size: '160x200 cm (Queen)', price: 549 },
      { size: '180x200 cm (King)', price: 629 },
    ],
  },
  {
    id: 'matelas-serenite',
    name: 'Matelas Sérénité',
    badge: 'Nouveau',
    badgeColor: '#1e5e4d', // Fresh emerald badge
    price: 499,
    originalPrice: 599,
    rating: 4.9,
    reviewsCount: 86,
    image: prodSereniteImg,
    description: 'La mémoire de forme haute densité combinée aux ressorts ensachés pour une indépendance de couchage absolue et un sommeil réparateur.',
    features: [
      '800 ressorts ensachés individuels',
      '4 cm de mousse viscoélastique à mémoire',
      'Indépendance de couchage totale pour les couples',
      'Traitement anti-acariens et antibactérien naturel',
    ],
    firmness: 'Moelleux',
    thickness: '25 cm',
    composition: 'Ressorts ensachés & mousse mémoire',
    sizes: [
      { size: '90x190 cm', price: 499 },
      { size: '140x190 cm', price: 679 },
      { size: '140x200 cm', price: 699 },
      { size: '160x200 cm (Queen)', price: 749 },
      { size: '180x200 cm (King)', price: 849 },
    ],
  },
  {
    id: 'matelas-naturel',
    name: 'Matelas Naturel',
    price: 599,
    originalPrice: 699,
    rating: 4.9,
    reviewsCount: 72,
    image: prodNaturelImg,
    description: '100% latex d’origine naturelle et coton biologique certifié GOTS. Respirabilité exceptionnelle et confort hypoallergénique.',
    features: [
      'Cœur 100% latex naturel 85 kg/m³',
      'Garnissage laine mérinos bio et coton bio',
      'Régulation thermique naturelle hiver/été',
      'Zéro substance chimique ou dérivé pétrochimique',
    ],
    firmness: 'Ferme',
    thickness: '24 cm',
    composition: '100% Latex naturel & fibres bio',
    sizes: [
      { size: '90x190 cm', price: 599 },
      { size: '140x190 cm', price: 799 },
      { size: '140x200 cm', price: 829 },
      { size: '160x200 cm (Queen)', price: 899 },
      { size: '180x200 cm (King)', price: 999 },
    ],
  },
  {
    id: 'matelas-prestige',
    name: 'Matelas Prestige',
    price: 799,
    originalPrice: 949,
    rating: 5.0,
    reviewsCount: 91,
    image: prodPrestigeImg,
    description: 'Le sommet de l\'artisanat hôtelier de luxe. Épaisseur somptueuse de 29 cm, capitonnage fait main et suspension hybride 5 étoiles.',
    features: [
      'Capitonnage traditionnel noué à la main',
      'Double suspension ressorts ensachés titane',
      'Surmatelas intégré en cachemire et soie',
      'Confort digne des plus grands palaces parisiens',
    ],
    firmness: 'Équilibré',
    thickness: '29 cm',
    composition: 'Hybride multi-couches luxe & soie',
    sizes: [
      { size: '140x190 cm', price: 799 },
      { size: '140x200 cm', price: 849 },
      { size: '160x200 cm (Queen)', price: 949 },
      { size: '180x200 cm (King)', price: 1090 },
      { size: '200x200 cm (Super King)', price: 1240 },
    ],
  },
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Sophie Delattre',
    city: 'Lyon',
    rating: 5,
    date: 'Il y a 3 jours',
    productBought: 'Matelas Équilibre (160x200)',
    title: 'Adieu le mal de dos au réveil !',
    comment: 'Après des mois d’hésitations, nous avons commandé le modèle Équilibre. Dès la première nuit, une sensation de soutien incomparable sans être dur. Livraison impeccable avec reprise de notre ancien matelas.',
    verified: true,
  },
  {
    id: 'rev-2',
    author: 'Marc V.',
    city: 'Bordeaux',
    rating: 5,
    date: 'Il y a 1 semaine',
    productBought: 'Matelas Prestige (180x200)',
    title: 'Le confort d\'un palace chez soi',
    comment: 'C\'est notre meilleur investissement depuis des années. Le capitonnage manuel et la finition sont remarquables. On ne sent absolument pas les mouvements de son conjoint. Bravo pour la fabrication française !',
    verified: true,
  },
  {
    id: 'rev-3',
    author: 'Camille & Antoine',
    city: 'Nantes',
    rating: 5,
    date: 'Il y a 2 semaines',
    productBought: 'Matelas Sérénité (140x200)',
    title: 'Qualité bluffante et circuit court',
    comment: 'Très rassurés par la transparence de l’usine et l’absence d’odeur chimique au déballage. Un sommeil profond et réparateur retrouvé. Je recommande DormiLux les yeux fermés.',
    verified: true,
  },
  {
    id: 'rev-4',
    author: 'Julien M.',
    city: 'Paris',
    rating: 5,
    date: 'Il y a 3 semaines',
    productBought: 'Matelas Naturel (160x200)',
    title: 'Latex naturel incroyable',
    comment: 'Matériaux sains, température parfaite même pendant les nuits chaudes. Le service client a été d’une écoute exemplaire pour m’orienter selon ma façon de dormir sur le côté.',
    verified: true,
  },
];
