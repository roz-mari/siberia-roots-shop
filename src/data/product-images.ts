import classicMatryoshkaImg from '@/assets/classic-matryoshka.jpg';
import siberianMatryoshkaImg from '@/assets/siberian-matryoshka.jpg';
import modernMatryoshkaImg from '@/assets/modern-matryoshka.jpg';
import novosibirskMatryoshkaImg from '@/assets/novosibirsk-matryoshka.jpg';
import giftMatryoshkaImg from '@/assets/gift-matryoshka.jpg';
import miniMatryoshkaImg from '@/assets/mini-matryoshka.jpg';

const productImageMap: Record<string, string> = {
  'classic-matryoshka': classicMatryoshkaImg,
  'siberian-matryoshka': siberianMatryoshkaImg,
  'modern-matryoshka': modernMatryoshkaImg,
  'novosibirsk-matryoshka': novosibirskMatryoshkaImg,
  'gift-matryoshka': giftMatryoshkaImg,
  'mini-matryoshka': miniMatryoshkaImg,
};

export const resolveProductImage = (imageKey: string | undefined) =>
  (imageKey && productImageMap[imageKey]) || '/placeholder.svg';


