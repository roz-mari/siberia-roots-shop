import type { Product } from "@/types/product";

export const classicMatryoshka: Product = {
  id: "classic-1",
  name: { ru: "Классическая матрёшка", en: "Classic Matryoshka", es: "Matrioska clásica" },
  description: {
    ru: "Пять кукол ручной росписи",
    en: "Five hand painted dolls",
    es: "Cinco muñecas pintadas a mano",
  },
  price: 45,
  imageKey: "classic-matryoshka",
  category: { ru: "Классика", en: "Classic", es: "Clásica" },
};

export const taigaHoney: Product = {
  id: "honey-1",
  name: { ru: "Таёжный мёд", en: "Taiga Honey" },
  description: { ru: "Мёд из Сибири", en: "Honey from Siberia" },
  price: 12.5,
  imageKey: "taiga-honey",
  category: { ru: "Еда", en: "Food" },
};
