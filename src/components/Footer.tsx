import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {t('Сибирские Дары', 'Siberian Treasures')}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t(
                'Натуральные продукты из сердца Сибири',
                'Natural products from the heart of Siberia'
              )}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {t('Навигация', 'Navigation')}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/" className="hover:text-primary transition-colors">
                  {t('Главная', 'Home')}
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-primary transition-colors">
                  {t('Товары', 'Products')}
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-primary transition-colors">
                  {t('Контакты', 'Contact')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {t('Следите за нами', 'Follow Us')}
            </h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2024 {t('Сибирские Дары', 'Siberian Treasures')}. {t('Все права защищены', 'All rights reserved')}.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
