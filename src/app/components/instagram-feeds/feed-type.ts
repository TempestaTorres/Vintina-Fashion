export interface AccessoryType {
  name: string,
  price: number,
  position: { x: string, y: string },
}
export interface Details {
  name: string,
  image: string,
  type: string,
  price: number,
}
export interface InstagramFeed {
  image: string,
  title: string,
  date: string,
  hasLink: boolean,
  author?: string,
  productType?: string,
  accessories?: AccessoryType[],
  details?: Details[]
}
export const Feeds: InstagramFeed[] = [
  {
    image: '/assets/images/post-41.jpg',
    title: "Don't miss out on the bestseller in red! This show always sells out 💋✨",
    date: '07 DECEMBER 2025',
    hasLink: false,
    author: 'Vintina',
  },
  {
    image: '/assets/images/post-42.jpg',
    title: "Forget the sugar cookies - this is what’s waiting by the fire tonight 😉 We are head over heels for bianca_richards wearing the Whitney Black corset set 💋",
    date: '06 DECEMBER 2025',
    hasLink: false,
    author: 'Vintina',
  },
  {
    image: '/assets/images/post-43.jpg',
    title: "Sorry Santa, I tried to be good. Glossy black foil hearts. Stockings that speak for themselves, with Too Naughty to Be Nice printed down the legs. This isn’t li...",
    date: '06 DECEMBER 2025',
    hasLink: false,
    author: 'Vintina',
  },
  {
    image: '/assets/images/post-44.jpg',
    title: "Whitney Black didn’t just return… she upgraded. Shop the collection that never stays in stock! 🖤",
    date: '05 DECEMBER 2025',
    hasLink: false,
    author: 'Vintina',
  },
  {
    image: '/assets/images/post-48.jpg',
    title: "The easiest way to misbehave this season? The new Vicki brief, honey 🖤",
    date: '04 DECEMBER 2025',
    hasLink: false,
    author: 'Vintina',
  },
  {
    image: '/assets/images/post-1.jpg',
    title: "All I want for the holidays is… Vintina! Sweet and sultry, finished with ice-blue crystals by Preciosa®. Cool blue lace. Hot nights ahead... ❄️🔥",
    date: '03 DECEMBER 2025',
    hasLink: false,
    author: 'Vintina',
    accessories: [
      {
        name: 'Vintina Bra',
        price: 170.00,
        position: {x: '27.41%', y: '55%'}
      },
      {
        name: 'Vintina Suspender',
        price: 125.00,
        position: {x: '42.67%', y: '59.02%'}
      },
      {
        name: 'Vinita Thonh',
        price: 95.00,
        position: {x: '48.25%', y: '62.89%'}
      },
      {
        name: 'Sky Blue Suspender Stockings',
        price: 45.00,
        position: {x: '61.5%', y: '62.3%'}
      },
      {
        name: 'Vintina Robe',
        price: 300.00,
        position: {x: '18.95%', y: '37.26%'}
      },
    ]

  },
  {
    image: '/assets/images/post-2.jpg',
    title: "Sweet as sugar, cool as ice 🧊🩵 Kate’s balconette and detachable choker set lets you play multiple ways. Wear the choker as a harness with gold pasties, or not...",
    date: '02 DECEMBER 2025',
    hasLink: false,
    author: 'Vintina',
    accessories: [
      {
        name: 'Vintina Bra',
        price: 170.00,
        position: {x: '40.29%', y: '53.06%'}
      },
      {
        name: 'Vintina Suspender',
        price: 125.00,
        position: {x: '62.69%', y: '57.08%'}
      },
      {
        name: 'Vintina Brief',
        price: 110.00,
        position: {x: '73.66%', y: '58.57%'}
      },
      {
        name: 'Sky Blue Suspender Stockings',
        price: 45.00,
        position: {x: '90.58%', y: '51.86%'}
      },
    ]
  },
  {
    image: '/assets/images/post-3.jpg',
    title: "Call me Ice Queen ❄️ I melt for no one… except Kate. Shop the new collection in-store and online now 🩵",
    date: '02 DECEMBER 2025',
    hasLink: true,
    author: 'Vintina',
    accessories: [
      {
        name: 'Vintina Babydoll',
        price: 220.00,
        position: {x: '38.74%', y: '65.13%'}
      },
      {
        name: 'Vintina Robe',
        price: 300.00,
        position: {x: '55.54%', y: '84.05%'}
      },
      {
        name: 'Vintina Thong',
        price: 95.00,
        position: {x: '61.62%', y: '62.74%'}
      },
      {
        name: 'Vintina Suspender',
        price: 125.00,
        position: {x: '56.73%', y: '39.34%'}
      },
      {
        name: 'Sky Blue Suspender Stockings',
        price: 45.00,
        position: {x: '77.23%', y: '39.2%'}
      },
      {
        name: 'Vintina Bra',
        price: 170.00,
        position: {x: '35.52%', y: '39.94%'}
      },
    ]
  },
  {
    image: '/assets/images/post-4.jpg',
    title: "Blue Christmas? Kate’s here to melt the ice, honey. A baby-blue fantasy of luxurious lace cutaways and whisper-soft sheer tulle made for temptation. Unwrap her,...",
    date: '02 DECEMBER 2025',
    hasLink: true,
    author: 'Vintina',
    accessories: [
      {
        name: 'Vintina Bra',
        price: 170.00,
        position: {x: '51.22%', y: '50.16%'}
      },
      {
        name: 'Vintina Suspender',
        price: 125.00,
        position: {x: '64.15%', y: '39.66%'}
      },
      {
        name: 'Vintina Thong',
        price: 95.00,
        position: {x: '68.68%', y: '43.23%'}
      },
      {
        name: 'Sky Blue Suspender Stockings',
        price: 45.00,
        position: {x: '81.44%', y: '41.45%'}
      },
      {
        name: 'Vintina Babydoll',
        price: 220.00,
        position: {x: '40.97%', y: '73.77%'}
      },
      {
        name: 'Vintina Brief',
        price: 120.00,
        position: {x: '57.85%', y: '81.74%'}
      },
    ]
  },
  {
    image: '/assets/images/post-5.jpg',
    title: "PSA: 40% OFF ends tonight! 💋 Jael corset set",
    date: '01 DECEMBER 2025',
    hasLink: true,
    author: 'Vintina',
  },
  {
    image: '/assets/images/post-6.jpg',
    title: "Final hours. Last chance. 40% OFF ends tonight! 💋",
    date: '01 DECEMBER 2025',
    hasLink: true,
    author: 'Vintina',
  },
  {
    image: '/assets/images/post-7.jpg',
    title: "Final hours to shop! 💋 40% OFF. Ends tonight. Phoenix set.",
    date: '01 DECEMBER 2025',
    hasLink: true,
    author: 'Vintina',
  },
  {
    image: '/assets/images/post-8.jpg',
    title: "Lusting after Aluna Pink? Now is your chance. It’s 40% OFF! Shop online & in-store now, while stocks last 🩷",
    date: '30 NOVEMBER 2025',
    hasLink: true,
    author: 'Vintina',
  },
  {
    image: '/assets/images/post-9.jpg',
    title: "Most-wanted Taisha. Now 40% OFF. While stocks last ⛓️💋",
    date: '30 NOVEMBER 2025',
    hasLink: true,
    author: 'Vintina',
  },
  {
    image: '/assets/images/post-10.jpg',
    title: "🚨New styles added 🚨 Most wanted Kukuro Purple now 40% off 💋 Shop now, while stocks last...",
    date: '30 NOVEMBER 2025',
    hasLink: true,
    author: 'Vintina',
    accessories: [
      {
        name: 'Kukuro Purple Bra',
        price: 160.00,
        position: {x: '51.97%', y: '60.97%'}
      },
      {
        name: 'Kukuro Purple Suspender',
        price: 140.00,
        position: {x: '73.05%', y: '55.61%'}
      },
      {
        name: 'Kukuro Purple Thong',
        price: 95.00,
        position: {x: '82.2%', y: '45.86%'}
      },
    ],
    details: [
      {
        name: 'Kukuro Purple Bra',
        image: '/assets/images/Kukuro_Bra_Thong_Front.webp',
        type: 'kukuro-purple-bra',
        price: 120.00
      },
      {
        name: 'Kukuro Purple Suspender',
        image: '/assets/images/Kukuro_Bra_SuspenderGartersStockings_Thong_Front.jpg',
        type: 'kukuro-purple-suspender',
        price: 140.00
      },
    ]
  },
  {
    image: '/assets/images/post-11.jpg',
    title: "40% OFF - Shop Charlotta, honey 💋",
    date: '30 NOVEMBER 2025',
    hasLink: true,
  },
  {
    image: '/assets/images/post-12.jpg',
    title: "You won't believe it... The best-selling Aubrey collection is 40% OFF now! Hurry honey, sizes selling fast! 🖤",
    date: '29 NOVEMBER 2025',
    hasLink: true,
  },
  {
    image: '/assets/images/post-13.jpg',
    title: "Charlotta Navy, Jasmin Hot Pink, Esme & Jules Black now 40% off 💋",
    date: '29 NOVEMBER 2025',
    hasLink: true,
  },
  {
    image: '/assets/images/post-14.jpg',
    title: "🚨BLACK FRIDAY BESTSELLERS 🚨 40% OFF. 1 DAY ONLY! It's now or never, honey 💋",
    date: '29 NOVEMBER 2025',
    hasLink: true,
  },
  {
    image: '/assets/images/post-15.jpg',
    title: "Best-selling sets. 1 day only. 40% OFF. You know what to do 💋",
    date: '29 NOVEMBER 2025',
    hasLink: true,
  },
  {
    image: '/assets/images/post-16.jpg',
    title: "Your turn to wear it next 🤍🕸️ Sylvie is now 40% OFF, while stocks last...",
    date: '28 NOVEMBER 2025',
    hasLink: true,
  },
  {
    image: '/assets/images/post-17.jpg',
    title: "She breaks the internet for a reason, honey! Kukuro Red & other bestsellers are 40% OFF today only. Don’t let your size sell out 💋",
    date: '28 NOVEMBER 2025',
    hasLink: true,
  },
  {
    image: '/assets/images/post-18.jpg',
    title: "It’s time to treat yourself! Shop the 40% OFF BLACK FRIDAY SALE in-store & online for a limited time only 💋",
    date: '28 NOVEMBER 2025',
    hasLink: true,
  },
  {
    image: '/assets/images/post-19.jpg',
    title: "Save 40% on Nakeds 2.0! 1 day only 🤍",
    date: '27 NOVEMBER 2025',
    hasLink: true,
  },
  {
    image: '/assets/images/post-20.jpg',
    title: "Lightweight. Luxe. 40% OFF today only. Looks invisible. Acts irresistible. Get your NAKEDS now, while stocks last... 💋",
    date: '27 NOVEMBER 2025',
    hasLink: true,
  },
  {
    image: '/assets/images/post-21.jpg',
    title: "NAKEDS 2.0. New fit. 40% OFF. 1 day only 🚨",
    date: '27 NOVEMBER 2025',
    hasLink: true,
  },
  {
    image: '/assets/images/post-22.jpg',
    title: "NAKEDS 2.0 40% OFF one day only! Get 40% OFF sheer seduction that slips under everything 🖤🤎🤍",
    date: '27 NOVEMBER 2025',
    hasLink: true,
  },
  {
    image: '/assets/images/post-23.jpg',
    title: "Uh-huh, honey! Caitlin is now on 40% OFF! Shop online and in-store to secure your sizes now! 🔥",
    date: '27 NOVEMBER 2025',
    hasLink: true,
  },
  {
    image: '/assets/images/post-24.jpg',
    title: "This is one you won't want to miss... Esme is 40% OFF now! 🔥 Get in fast or regret it later...",
    date: '27 NOVEMBER 2025',
    hasLink: true,
  },
  {
    image: '/assets/images/post-25.jpg',
    title: "Seen it. Wanted it. Now it’s 40% OFF! 🤎 Shop Whitney Chocolate now 🤎",
    date: '26 NOVEMBER 2025',
    hasLink: true,
  },
  {
    image: '/assets/images/post-26.jpg',
    title: "This is not a drill! Imogen is 40% OFF! Shop BLACK FRIDAY SALE online & in-store now! 💙",
    date: '26 NOVEMBER 2025',
    hasLink: true,
  },
  {
    image: '/assets/images/post-27.jpg',
    title: "Had your eye on Charlotta Navy? Bestsellers are 40% OFF today only. Don’t let your size sell out! 💙💋",
    date: '26 NOVEMBER 2025',
    hasLink: true,
  },
  {
    image: '/assets/images/post-28.jpg',
    title: "🚨Black Friday is here!🚨 40% OFF showstoppers. Your size won’t wait... In-store & online now!",
    date: '26 NOVEMBER 2025',
    hasLink: true,
  },
  {
    image: '/assets/images/post-29.jpg',
    title: "Wear what she’s wearing… for 40% OFF! Add to cart, honey 💋",
    date: '25 NOVEMBER 2025',
    hasLink: true,
  },
  {
    image: '/assets/images/post-30.jpg',
    title: "Best-seller Kukuro 40% OFF! Hurry honey, 1 day* only... 💋",
    date: '25 NOVEMBER 2025',
    hasLink: true,
  },
  {
    image: '/assets/images/post-31.jpg',
    title: "Steal the spotlight. SAVE 40%. Get in quick, while stocks last 🔥",
    date: '25 NOVEMBER 2025',
    hasLink: true,
  },
  {
    image: '/assets/images/post-32.jpg',
    title: "Get in quick, honey! Gabrielle Black is 40%OFF NOW!",
    date: '25 NOVEMBER 2025',
    hasLink: true,
  },
  {
    image: '/assets/images/post-33.jpg',
    title: "All sizes restocked. Ready to misbehave. Get the bondage icon, Kukuro Black, in your size now! 🖤",
    date: '24 NOVEMBER 2025',
    hasLink: true,
  },
  {
    image: '/assets/images/post-34.jpg',
    title: "The show starts when she walks in... ✨🎀",
    date: '23 NOVEMBER 2025',
    hasLink: true,
  },
  {
    image: '/assets/images/post-35.jpg',
    title: "Spotlight ready. Dressed for drama. Whitney’s back in sparkling pink with new pieces that misbehave - teddy, robe, chemise... the full performance, honey.",
    date: '20 NOVEMBER 2025',
    hasLink: true,
  },
  {
    image: '/assets/images/post-36.jpg',
    title: "Clip in the chains, ride off into the night. Reins optional. Whip encouraged. Shop Nicole in-store and online 🎁",
    date: '19 NOVEMBER 2025',
    hasLink: true,
  },
  {
    image: '/assets/images/post-37.jpg',
    title: "Break hearts this holiday season in Charlotta Emerald 🎄",
    date: '16 NOVEMBER 2025',
    hasLink: true,
  },
  {
    image: '/assets/images/post-38.jpg',
    title: "Tis the season of seduction 🎄",
    date: '15 NOVEMBER 2025',
    hasLink: true,
  },
  {
    image: '/assets/images/post-39.jpg',
    title: "Make them purr 🐆 oliviagileno is turning heads in the Addison Leopard 3-piece set",
    date: '12 NOVEMBER 2025',
    hasLink: true,
  },
  {
    image: '/assets/images/post-40.jpg',
    title: "Got your attention? You didn’t come here for basics. It’s all in the details, honey and Rosaline is dripping in them. Take a peek ❤️",
    date: '5 NOVEMBER 2025',
    hasLink: true,
  },
]
