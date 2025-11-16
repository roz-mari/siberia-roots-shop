import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { useProduct } from '@/hooks/use-products';
import { resolveProductImage } from '@/data/product-images';
import { Skeleton } from '@/components/ui/skeleton';

const ProductDetail = () => {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const displayLang = language === 'es' ? 'en' : language;
  const { toast } = useToast();
  const { data: product, isLoading, isError } = useProduct(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Skeleton className="h-64 w-64 rounded-2xl" />
        </main>
        <Footer />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              {t('Товар не найден', 'Product not found', 'Producto no encontrado')}
            </h1>
            <Button asChild>
              <Link to="/products">
                {t('Вернуться к товарам', 'Back to Products', 'Volver a productos')}
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    toast({
      title: t('Добавлено в корзину', 'Added to cart', 'Añadido al carrito'),
      description: t(
        `${product.name.ru} добавлен в вашу корзину`,
        `${product.name.en} has been added to your cart`,
        `${product.name.en} ha sido añadido a tu carrito`
      ),
    });
  };

  const imageSrc = resolveProductImage(product.imageKey);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 bg-background">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild className="mb-8 gap-2">
            <Link to="/products">
              <ArrowLeft className="h-4 w-4" />
              {t('Назад к товарам', 'Back to Products', 'Volver a productos')}
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-fade-in">
            {/* Product Image */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-secondary">
              <img
                src={imageSrc}
                alt={product.name[displayLang]}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-secondary text-secondary-foreground">
                  {product.category[displayLang]}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {product.name[displayLang]}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                {product.description[displayLang]}
              </p>
              
              <div className="mb-8">
                <span className="text-4xl font-bold text-accent">${product.price.toFixed(2)}</span>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="text-lg font-semibold text-foreground">
                  {t('Описание', 'Description', 'Descripción')}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t(
                    'Каждая матрёшка создана вручную опытными мастерами. Традиционная роспись, качественная древесина и внимание к деталям делают каждую куклу уникальной. Матрёшка станет прекрасным подарком и украшением интерьера.',
                    'Each matryoshka is handcrafted by experienced artisans. Traditional painting, quality wood, and attention to detail make each doll unique. Matryoshka will make a wonderful gift and interior decoration.',
                    'Cada matrioska está hecha a mano por artesanos experimentados. La pintura tradicional, la madera de calidad y la atención al detalle hacen única cada muñeca.'
                  )}
                </p>
              </div>

              <Button
                size="lg"
                onClick={handleAddToCart}
                className="gap-2 w-full md:w-auto"
              >
                <ShoppingCart className="h-5 w-5" />
                {t('Добавить в корзину', 'Add to Cart', 'Añadir al carrito')}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
