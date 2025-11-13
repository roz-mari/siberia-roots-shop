import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Product } from '@/types/product';
import { resolveProductImage } from '@/data/product-images';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { language } = useLanguage();
  const imageSrc = resolveProductImage(product.imageKey);

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link to={`/products/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-secondary">
          <img
            src={imageSrc}
            alt={product.name[language]}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
            {product.name[language]}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-2">{product.category[language]}</p>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description[language]}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <span className="text-2xl font-bold text-accent">${product.price.toFixed(2)}</span>
        <Button variant="default" size="sm" asChild>
          <Link to={`/products/${product.id}`}>
            {language === 'ru' ? 'Подробнее' : 'View Details'}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
