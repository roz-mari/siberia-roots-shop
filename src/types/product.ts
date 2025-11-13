export interface LocalizedText {
  ru: string;
  en: string;
}

export interface Product {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  price: number;
  imageKey: string;
  category: LocalizedText;
}


