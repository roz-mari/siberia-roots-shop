export interface LocalizedText {
  ru: string;
  en: string;
  es?: string;
}

export interface Product {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  price: number;
  imageKey: string;
  category: LocalizedText;
}


