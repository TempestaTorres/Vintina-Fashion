export interface ProductType {
  id: number,
  type: string,
  category: {
    name: string,
    tag: string,
  },
  name: string,
  favorite: boolean,
  price: number,
  originalPrice?: number,
  image?: string,
  onSale?: boolean,
  quantity?: number,
  thumbnail?: string[],
  model?: {
    photo: string,
    name: string,
    height: string,
    bust: string,
    waist: string,
    hips: string,
    dress: number,
  },
}

export const  Products: ProductType[] = [
  {
    id: 79,
    type: 'lingerie-white',
    category: {
      name: 'lingerie',
      tag: 'lingerie',
    },
    name: 'Snow Queen',
    favorite: true,
    price: 50.00,
    originalPrice: 65.00,
    image: '/assets/images/sensual-woman-beautiful-young-woman-in-lingerie-smiling-while-standing.jpg',
    onSale: true,
    thumbnail: [
      "/assets/images/sensual-woman-beautiful-young-woman-in-lingerie.jpg",
      "/assets/images/sensual-beauty-beautiful-young-woman-in-lingerie-2.jpg",
      "/assets/images/pure-beauty.jpg",
      "/assets/images/flirty-beauty-attractive-young-woman-in-lingerie.jpg"
    ],
    model: {
      photo: "/assets/images/pure-beauty.jpg",
      name: "keesha",
      height: '5\'9" / 176cm',
      bust: '35.5" / 10D',
      waist: '29" / 74cm',
      hips: '39.5" / 100cm',
      dress: 8,
    }
  },
  {
    id: 85,
    type: 'heart-beat',
    category: {
      name: 'lingerie',
      tag: 'lingerie',
    },
    name: 'Heart Beat',
    favorite: true,
    price: 75.00,
    image: '/assets/images/sexy-young-lady-in-luxury-lingerie.jpg',
    onSale: false
  },
  {
    id: 90,
    type: 'victoria-line',
    category: {
      name: 'underwear',
      tag: 'underwear',
    },
    name: 'Victoria Line',
    favorite: true,
    price: 70.00,
    image: '/assets/images/beautiful-seductive-girl-posing-in-black-lingerie.jpg',
    onSale: false
  },
  {
    id: 92,
    type: 'slick-bodysuit',
    category: {
      name: 'bodysuit',
      tag: 'bodysuit',
    },
    name: 'Slick Bodysuit',
    favorite: false,
    price: 68.00,
    image: '/assets/images/beauty-in-lingerie.jpg',
    onSale: false
  },
  {
    id: 93,
    type: 'cloud-fit',
    category: {
      name: 'underwear',
      tag: 'underwear',
    },
    name: 'Cloud Fit',
    favorite: true,
    price: 65.00,
    image: '/assets/images/posing-for-a-camera-beautiful-woman-with-slim-body-in-underwear-is-in-the-studio.jpg',
    onSale: false
  },
  {
    id: 94,
    type: 'black-swan',
    category: {
      name: 'lingerie',
      tag: 'lingerie',
    },
    name: 'Black Swan',
    favorite: true,
    price: 75.00,
    image: '/assets/images/blonde-tender-girl-posing-in-black-lingerie.jpg',
    onSale: false
  },
  {
    id: 95,
    type: 'gray-shade',
    category: {
      name: 'lingerie',
      tag: 'lingerie',
    },
    name: 'Gray Shade',
    favorite: true,
    price: 75.00,
    image: '/assets/images/beautiful-sensual-girl-posing-in-lace-lingerie-isolated-on-grey.jpg',
    onSale: false
  },
  {
    id: 96,
    type: 'pink-love',
    category: {
      name: 'underwear',
      tag: 'underwear',
    },
    name: 'Pink Love',
    favorite: true,
    price: 68.00,
    image: '/assets/images/woman-with-beautiful-body.jpg',
    onSale: false
  },
  {
    id: 97,
    type: 'strapless-multiway-bra',
    category: {
      name: 'lingerie',
      tag: 'lingerie',
    },
    name: 'Strapless bra',
    favorite: true,
    price: 37.00,
    originalPrice: 46.00,
    image: '/assets/images/Strapless-Microfibre-Multiway-Bra.jpg',
    onSale: false
  },
  {
    id: 98,
    type: 'strapless-u-wire-bra',
    category: {
      name: 'lingerie',
      tag: 'lingerie',
    },
    name: 'Strapless u-wire bra',
    favorite: false,
    price: 10.00,
    originalPrice: 12.00,
    image: '/assets/images/Strapless-u-wire-microfibre-multiway-bra.jpg',
    onSale: false
  },
  {
    id: 99,
    type: 'bodysuit-honeymoon',
    category: {
      name: 'bodysuit',
      tag: 'bodysuit',
    },
    name: 'Bodysuit Honeymoon',
    favorite: false,
    price: 34.00,
    image: '/assets/images/bodysuit.jpg',
    onSale: true
  },
  {
    id: 100,
    type: 'bridal-bodysuit',
    category: {
      name: 'bodysuit',
      tag: 'bodysuit',
    },
    name: 'Bridal Bodysuit White Lace',
    favorite: false,
    price: 34.00,
    image: '/assets/images/bridal_lingerie_bodysuit_white_lace.jpg',
    onSale: true
  },
]
