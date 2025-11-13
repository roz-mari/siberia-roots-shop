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

import classicMatryoshkaImg from '@/assets/classic-matryoshka.jpg';
import siberianMatryoshkaImg from '@/assets/siberian-matryoshka.jpg';
import modernMatryoshkaImg from '@/assets/modern-matryoshka.jpg';
import novosibirskMatryoshkaImg from '@/assets/novosibirsk-matryoshka.jpg';
import giftMatryoshkaImg from '@/assets/gift-matryoshka.jpg';
import miniMatryoshkaImg from '@/assets/mini-matryoshka.jpg';

export const products: Product[] = [
  {
    id: '1',
    name: {
      ru: 'Классическая матрёшка',
      en: 'Classic Matryoshka'
    },
    description: {
      ru: 'Традиционная роспись, 7 фигур',
      en: 'Traditional painting, set of 7 dolls'
    },
    price: 35.00,
    image: classicMatryoshkaImg,
    category: {
      ru: 'Классические',
      en: 'Classic'
    }
  },
  {
    id: '2',
    name: {
      ru: 'Сибирская матрёшка',
      en: 'Siberian Matryoshka'
    },
    description: {
      ru: 'Вдохновлена сибирскими узорами и природой',
      en: 'Inspired by Siberian patterns and nature'
    },
    price: 42.00,
    image: siberianMatryoshkaImg,
    category: {
      ru: 'Тематические',
      en: 'Themed'
    }
  },
  {
    id: '3',
    name: {
      ru: 'Современная матрёшка',
      en: 'Modern Matryoshka'
    },
    description: {
      ru: 'Минималистичный дизайн, яркие цвета',
      en: 'Minimalist design with bright colors'
    },
    price: 29.90,
    image: modernMatryoshkaImg,
    category: {
      ru: 'Современные',
      en: 'Modern'
    }
  },
  {
    id: '4',
    name: {
      ru: 'Матрешка "Новосибирск"',
      en: '"Novosibirsk" Matryoshka'
    },
    description: {
      ru: 'Тематический набор с символами города',
      en: 'Themed set with Novosibirsk landmarks'
    },
    price: 39.00,
    image: novosibirskMatryoshkaImg,
    category: {
      ru: 'Тематические',
      en: 'Themed'
    }
  },
  {
    id: '5',
    name: {
      ru: 'Матрешка-подарочный набор',
      en: 'Gift Matryoshka Set'
    },
    description: {
      ru: 'Подарочная коробка, открытка и матрёшка',
      en: 'Gift box, postcard and matryoshka doll'
    },
    price: 49.00,
    image: giftMatryoshkaImg,
    category: {
      ru: 'Подарочные наборы',
      en: 'Gift Sets'
    }
  },
  {
    id: '6',
    name: {
      ru: 'Набор мини-матрёшек',
      en: 'Mini Matryoshka Set'
    },
    description: {
      ru: 'Маленькие фигурки для декора',
      en: 'Small decorative matryoshka set'
    },
    price: 24.50,
    image: miniMatryoshkaImg,
    category: {
      ru: 'Мини',
      en: 'Mini'
    }
  }
];
