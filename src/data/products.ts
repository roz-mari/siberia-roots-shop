export interface Product {
  id: string;
  name: {
    ru: string;
    en: string;
  };
  description: {
    ru: string;
    en: string;
  };
  price: number;
  image: string;
  category: {
    ru: string;
    en: string;
  };
}

import pineNutsImg from '@/assets/pine-nuts.jpg';
import taigaHoneyImg from '@/assets/taiga-honey.jpg';
import ivanTeaImg from '@/assets/ivan-tea.jpg';
import pineconeJamImg from '@/assets/pinecone-jam.jpg';
import seaBuckthornOilImg from '@/assets/sea-buckthorn-oil.jpg';
import woodenSouvenirsImg from '@/assets/wooden-souvenirs.jpg';

export const products: Product[] = [
  {
    id: '1',
    name: {
      ru: 'Кедровые орехи',
      en: 'Pine Nuts'
    },
    description: {
      ru: 'Натуральные орехи из Сибири',
      en: 'Natural Siberian pine nuts'
    },
    price: 12.50,
    image: pineNutsImg,
    category: {
      ru: 'Орехи и семена',
      en: 'Nuts & Seeds'
    }
  },
  {
    id: '2',
    name: {
      ru: 'Тайга мёд',
      en: 'Taiga Honey'
    },
    description: {
      ru: 'Мёд из диких сибирских трав',
      en: 'Wild taiga mountain honey'
    },
    price: 9.90,
    image: taigaHoneyImg,
    category: {
      ru: 'Мёд',
      en: 'Honey'
    }
  },
  {
    id: '3',
    name: {
      ru: 'Чай Иван-чай',
      en: 'Ivan Tea'
    },
    description: {
      ru: 'Ферментированный чай из Новосибирской области',
      en: 'Fermented Siberian herbal tea'
    },
    price: 7.50,
    image: ivanTeaImg,
    category: {
      ru: 'Чай',
      en: 'Tea'
    }
  },
  {
    id: '4',
    name: {
      ru: 'Варенье из шишек',
      en: 'Pinecone Jam'
    },
    description: {
      ru: 'Традиционный сибирский деликатес',
      en: 'Traditional Siberian delicacy'
    },
    price: 11.20,
    image: pineconeJamImg,
    category: {
      ru: 'Варенье',
      en: 'Jam'
    }
  },
  {
    id: '5',
    name: {
      ru: 'Облепиховое масло',
      en: 'Sea Buckthorn Oil'
    },
    description: {
      ru: 'Богато витамином C',
      en: 'Rich in vitamin C'
    },
    price: 14.00,
    image: seaBuckthornOilImg,
    category: {
      ru: 'Масла',
      en: 'Oils'
    }
  },
  {
    id: '6',
    name: {
      ru: 'Сувениры из дерева',
      en: 'Wooden Souvenirs'
    },
    description: {
      ru: 'Ручная работа местных мастеров',
      en: 'Handmade by local artisans'
    },
    price: 15.00,
    image: woodenSouvenirsImg,
    category: {
      ru: 'Сувениры',
      en: 'Souvenirs'
    }
  }
];
