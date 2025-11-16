import { useLanguage } from '@/contexts/LanguageContext';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useProducts } from '@/hooks/use-products';
import { Skeleton } from '@/components/ui/skeleton';

const Products = () => {
  const { t } = useLanguage();
  const { data: products, isLoading, isError } = useProducts();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('Наши матрёшки', 'Our Matryoshkas', 'Nuestras Matrioskas')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t(
                'Исследуйте полный ассортимент традиционных русских матрёшек',
                'Explore our full range of traditional Russian matryoshka dolls',
                'Explora nuestra gama completa de tradicionales muñecas rusas matrioska'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[360px]">
            {isLoading &&
              Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-full rounded-2xl" />
              ))}

            {isError && (
              <div className="col-span-full text-center text-muted-foreground">
                {t('Не удалось загрузить товары. Попробуйте позже.', 'Failed to load products. Please try again later.', 'No se pudieron cargar los productos. Inténtalo más tarde.')}
              </div>
            )}

            {!isLoading && !isError && products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
