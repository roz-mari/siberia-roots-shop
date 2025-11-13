import { useLanguage } from '@/contexts/LanguageContext';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import heroTaiga from '@/assets/hero-taiga.jpg';

const Home = () => {
  const { t } = useLanguage();
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src={heroTaiga} alt="Siberian Taiga" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 py-20 relative z-10 text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('Сибирские Дары', 'Siberian Treasures')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            {t(
              'Натуральные продукты из самого сердца Сибири и Новосибирска',
              'Natural products from the heart of Siberia and Novosibirsk'
            )}
          </p>
          <Button size="lg" variant="secondary" asChild className="gap-2">
            <Link to="/products">
              {t('Смотреть товары', 'View Products')}
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
              {t('Популярные товары', 'Popular Products')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t(
                'Откройте для себя лучшее из нашей коллекции сибирских деликатесов',
                'Discover the best from our collection of Siberian delicacies'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/products">
                {t('Посмотреть все товары', 'View All Products')}
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
                {t('Наша История', 'Our Story')}
              </h2>
            </div>
            
            <div className="prose prose-lg max-w-none text-foreground">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {t(
                  'Сибирь — это край бескрайних лесов, чистых озёр и уникальной природы. Здесь, среди тайги и снежных просторов, рождаются продукты с особым вкусом и пользой.',
                  'Siberia is a land of endless forests, pristine lakes, and unique nature. Here, amidst the taiga and snowy expanses, products with a special taste and benefit are born.'
                )}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {t(
                  'Новосибирск, сердце Сибири, — место, где традиции встречаются с современностью. Мы собираем лучшие дары природы и делимся ими с вами.',
                  'Novosibirsk, the heart of Siberia, is a place where traditions meet modernity. We collect the best gifts of nature and share them with you.'
                )}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t(
                  'Каждый продукт в нашем магазине — это частичка настоящей Сибири, созданная с любовью и заботой о вашем здоровье.',
                  'Each product in our shop is a piece of true Siberia, created with love and care for your health.'
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
