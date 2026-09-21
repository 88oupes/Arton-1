export interface StoreLocation {
  id: string;
  name: string;
  city: string;
  region: string;
  type: string;
  address: string;
  postalCode: string;
  googleMapsUrl: string;
  embedMapUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  hours: {
    days: string;
    hours: string;
  }[];
  features: string[];
  badges: string[];
  description: string;
  featuredImage: string;
}

export const STORES: StoreLocation[] = [
  {
    id: 'berrechid',
    name: 'DARY Berrechid',
    city: 'Berrechid',
    region: 'Casablanca-Settat',
    type: 'Showroom & Espace Conseil Literie',
    address: 'Berrechid, Région Casablanca-Settat, Maroc',
    postalCode: '26100',
    googleMapsUrl:
      'https://www.google.com/maps/place/DARY/@33.2628064,-7.5780913,17z/data=!3m1!4b1!4m6!3m5!1s0xda63d3e397715a5:0xc2576d8fc6b4d9a7!8m2!3d33.2628019!4d-7.5755164!16s%2Fg%2F11z2xr9_v7',
    embedMapUrl:
      'https://maps.google.com/maps?q=33.2628019,-7.5755164&hl=fr&z=16&output=embed',
    coordinates: {
      lat: 33.2628019,
      lng: -7.5755164,
    },
    phone: '+212691707445',
    phoneDisplay: '06 91 70 74 45',
    whatsapp: '212691707445',
    email: 'contact@dary.ma',
    hours: [
      { days: 'Lundi — Samedi', hours: '09h30 — 20h00' },
      { days: 'Dimanche', hours: '10h30 — 19h30' },
    ],
    features: [
      'Espace essai de toute la collection de matelas (Moelleux, Équilibré, Ferme)',
      'Conseillers experts formés par nos maîtres artisans matelassiers',
      'Exposition lits coffres, têtes de lit tapissées et sommiers',
      'Prise de commande sur mesure et livraison directe à domicile',
      'Paiement sur place (carte, espèces) ou paiement à la livraison',
    ],
    badges: ['Showroom Officiel', 'Essai Libre', 'Parking Proche'],
    description:
      'Venez tester le confort authentique de nos matelas confectionnés à la main. Notre équipe à Berrechid vous guide avec bienveillance pour trouver le soutien idéal adapté à votre morphologie.',
    featuredImage:
      'https://res.cloudinary.com/psbqhe7h/image/upload/v1789646884/arton_hero_suite.jpg',
  },
  {
    id: 'mohammedia',
    name: 'DARY Bed Mohammedia',
    city: 'Mohammedia',
    region: 'Grand Casablanca',
    type: 'Showroom & Boutique Confort',
    address: 'Mohammedia, Région Casablanca, Maroc',
    postalCode: '28810',
    googleMapsUrl:
      'https://www.google.com/maps/place/Dary+bed+mohmadia/@33.6820095,-7.3857041,17z/data=!3m1!4b1!4m6!3m5!1s0xda7b700195f6613:0xb7d26a36bb950ed!8m2!3d33.6820051!4d-7.3831292!16s%2Fg%2F11zdjgz_fd',
    embedMapUrl:
      'https://maps.google.com/maps?q=33.6820051,-7.3831292&hl=fr&z=16&output=embed',
    coordinates: {
      lat: 33.6820051,
      lng: -7.3831292,
    },
    phone: '+212691707445',
    phoneDisplay: '06 91 70 74 45',
    whatsapp: '212691707445',
    email: 'contact@dary.ma',
    hours: [
      { days: 'Lundi — Samedi', hours: '09h30 — 20h00' },
      { days: 'Dimanche', hours: '10h30 — 19h30' },
    ],
    features: [
      'Showroom complet DARY Bed avec présentation literie prestige',
      'Découverte des mousses haute résilience et ressorts ensachés 7 zones',
      'Nuancier de tissus velours & anti-taches pour sommiers et lits coffres',
      'Conseil sommeil personnalisé et devis instantané gratuit',
      'Accès facile et stationnement disponible à proximité',
    ],
    badges: ['Espace DARY Bed', 'Accueil Personnalisé', 'Service Rapide'],
    description:
      'Plongez dans l’univers DARY Bed à Mohammedia. Une atmosphère chaleureuse où vous pourrez prendre votre temps pour essayer nos matelas haut de gamme et imaginer votre suite parentale sur mesure.',
    featuredImage:
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1200&q=80',
  },
];
