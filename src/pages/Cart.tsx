import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { resolveProductImage } from '@/data/product-images';

const Cart = () => {
  const navigate = useNavigate();
  const { items, changeQty, removeItem, clear, totalItems, totalPrice } = useCart();
  const { token } = useAuth();
  const { t, language } = useLanguage();
  const displayLang = language === 'es' ? 'en' : language;

  const handleCheckout = () => {
    if (!token) {
      navigate('/register');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 bg-background">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {t('Корзина', 'Cart', 'Carrito')}
          </h1>

          {items.length === 0 ? (
            <p className="text-muted-foreground">
              {t('Ваша корзина пуста.', 'Your cart is empty.', 'Tu carrito está vacío.')}
            </p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {items.map((i) => (
                  <div
                    key={i.product.id}
                    className="flex items-center gap-4 border rounded-xl p-4 bg-card"
                  >
                    <img
                      src={resolveProductImage(i.product.imageKey)}
                      alt={i.product.name[displayLang]}
                      className="h-20 w-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="font-semibold">{i.product.name[displayLang]}</div>
                      <div className="text-sm text-muted-foreground">
                        ${i.product.price.toFixed(2)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={() => changeQty(i.product.id, i.quantity - 1)}>-</Button>
                      <div className="w-10 text-center">{i.quantity}</div>
                      <Button variant="outline" size="icon" onClick={() => changeQty(i.product.id, i.quantity + 1)}>+</Button>
                    </div>
                    <Button variant="ghost" onClick={() => removeItem(i.product.id)}>
                      {t('Удалить', 'Remove', 'Eliminar')}
                    </Button>
                  </div>
                ))}
              </div>
              <aside className="border rounded-xl p-6 bg-card h-fit">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">
                    {t('Товары', 'Items', 'Artículos')} ({totalItems})
                  </span>
                  <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                </div>
                <Button className="w-full mt-4" onClick={clear}>
                  {t('Очистить корзину', 'Clear cart', 'Vaciar carrito')}
                </Button>
                <Button className="w-full mt-3" variant="default" onClick={handleCheckout}>
                  {t('Оформить заказ', 'Checkout', 'Pagar')}
                </Button>
              </aside>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;


