import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Globe, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const nextLang = language === 'ru' ? 'en' : language === 'en' ? 'es' : 'ru';
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">
              {t('Русские Матрёшки', 'Russian Matryoshka', 'Muñecas Matrioska')}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {t('Главная', 'Home', 'Inicio')}
            </Link>
            <Link
              to="/products"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {t('Товары', 'Products', 'Productos')}
            </Link>
            <Link
              to="/register"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {t('Регистрация', 'Register', 'Registrarse')}
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {t('Контакты', 'Contact', 'Contacto')}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/cart" className="relative">
              <Button variant="outline" size="sm" className="gap-2">
                <ShoppingCart className="h-4 w-4" />
                {t('Корзина', 'Cart', 'Carrito')}
                {totalItems > 0 && (
                  <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs text-primary-foreground">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(nextLang as any)}
              className="gap-2"
            >
              <Globe className="h-4 w-4" />
              {nextLang.toUpperCase()}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex md:hidden items-center justify-center gap-6 mt-4 pt-4 border-t border-border">
          <Link
            to="/"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            {t('Главная', 'Home')}
          </Link>
          <Link
            to="/products"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            {t('Товары', 'Products')}
          </Link>
          <Link
            to="/contact"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            {t('Контакты', 'Contact')}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
