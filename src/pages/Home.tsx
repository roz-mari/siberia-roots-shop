import { useLanguage } from '@/contexts/LanguageContext';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import heroMatryoshka from '@/assets/hero-matryoshka.jpg';
import { useProducts } from '@/hooks/use-products';

const Home = () => {
  const { t } = useLanguage();
  const { data: products, isLoading, isError } = useProducts();
  const featuredProducts = (products ?? []).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-primary to-accent text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src={heroMatryoshka} alt="Russian Matryoshka" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 py-20 relative z-10 text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('Русские Матрёшки', 'Russian Matryoshka', 'Muñecas Matrioska')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            {t(
              'Традиционные матрёшки ручной работы — частичка русской души',
              'Traditional handcrafted matryoshka dolls - a piece of Russian spirit',
              'Muñecas matrioska artesanales tradicionales: un pedacito del alma rusa'
            )}
          </p>
          <Button size="lg" variant="secondary" asChild className="gap-2">
            <Link to="/products">
              {t('Смотреть товары', 'View Products', 'Ver productos')}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('Популярные матрёшки', 'Popular Matryoshkas', 'Matrioskas populares')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t(
                'Откройте для себя красоту традиционных русских матрёшек',
                'Discover the beauty of traditional Russian matryoshka dolls',
                'Descubre la belleza de las tradicionales muñecas rusas'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 min-h-[360px]">
            {isLoading &&
              Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-full rounded-2xl" />
              ))}

            {isError && (
              <div className="col-span-full text-center text-muted-foreground">
                {t('Не удалось загрузить товары. Попробуйте позже.', 'Failed to load products. Please try again later.', 'No se pudieron cargar los productos. Inténtalo más tarde.')}
              </div>
            )}

            {!isLoading && !isError && featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/products">
                {t('Посмотреть все товары', 'View All Products', 'Ver todos los productos')}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {t('История матрёшки', 'History of Matryoshka', 'Historia de la Matrioska')}
              </h2>
            </div>
            
            <div className="prose prose-lg max-w-none text-foreground">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {t(
                  'Матрёшка — самый известный символ России. Эта деревянная кукла-сувенир появилась в конце XIX века и сразу завоевала сердца людей по всему миру.',
                  'Matryoshka is the most famous symbol of Russia. This wooden souvenir doll appeared at the end of the 19th century and immediately won the hearts of people around the world.',
                  'La matrioska es el símbolo más famoso de Rusia. Esta muñeca de madera apareció a finales del siglo XIX y conquistó los corazones en todo el mundo.'
                )}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {t(
                  'Традиционная матрёшка состоит из нескольких фигурок, вложенных одна в другую. Каждая кукла расписана вручную мастерами, которые вкладывают в работу частичку своей души.',
                  'A traditional matryoshka consists of several figures nested inside each other. Each doll is hand-painted by artisans who put a piece of their soul into their work.',
                  'Una matrioska tradicional consta de varias figuras, una dentro de la otra. Cada muñeca está pintada a mano por artesanos que ponen parte de su alma en el trabajo.'
                )}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t(
                  'Сегодня матрёшка — это не только сувенир, но и произведение искусства, хранящее традиции и культуру русского народа.',
                  'Today, matryoshka is not only a souvenir, but also a work of art that preserves the traditions and culture of the Russian people.',
                  'Hoy la matrioska no es solo un recuerdo, sino también una obra de arte que conserva las tradiciones y la cultura del pueblo ruso.'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
