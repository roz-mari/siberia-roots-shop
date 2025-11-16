import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api, type ApiError } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clear } = useCart();
  const { token } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    shippingName: '',
    shippingEmail: '',
    shippingAddress: '',
    shippingCity: '',
    shippingZip: '',
  });

  if (!token) {
    navigate('/register');
    return null;
  }

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const order = await api.createOrder(
        {
          items: items.map((i) => ({
            productId: i.product.id,
            quantity: i.quantity,
          })),
          ...formData,
        },
        token
      );

      clear();
      toast({
        title: t('Заказ создан!', 'Order created!', '¡Pedido creado!'),
        description: t(
          'Ваш заказ №' + order.id + ' успешно создан.',
          'Your order #' + order.id + ' has been created successfully.',
          'Su pedido #' + order.id + ' ha sido creado con éxito.'
        ),
      });
      navigate('/profile');
    } catch (error) {
      const apiError = error as ApiError;
      toast({
        title: t('Ошибка', 'Error', 'Error'),
        description: apiError.message || t('Не удалось создать заказ', 'Failed to create order', 'No se pudo crear el pedido'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 bg-background">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            {t('Оформление заказа', 'Checkout', 'Pago')}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">
                  {t('Адрес доставки', 'Shipping Address', 'Dirección de envío')}
                </h2>
                
                <div>
                  <Label htmlFor="shippingName">
                    {t('Имя', 'Name', 'Nombre')}
                  </Label>
                  <Input
                    id="shippingName"
                    required
                    value={formData.shippingName}
                    onChange={(e) => setFormData({ ...formData, shippingName: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="shippingEmail">
                    {t('Email', 'Email', 'Correo electrónico')}
                  </Label>
                  <Input
                    id="shippingEmail"
                    type="email"
                    required
                    value={formData.shippingEmail}
                    onChange={(e) => setFormData({ ...formData, shippingEmail: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="shippingAddress">
                    {t('Адрес', 'Address', 'Dirección')}
                  </Label>
                  <Input
                    id="shippingAddress"
                    required
                    value={formData.shippingAddress}
                    onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="shippingCity">
                      {t('Город', 'City', 'Ciudad')}
                    </Label>
                    <Input
                      id="shippingCity"
                      required
                      value={formData.shippingCity}
                      onChange={(e) => setFormData({ ...formData, shippingCity: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="shippingZip">
                      {t('Индекс', 'Zip Code', 'Código postal')}
                    </Label>
                    <Input
                      id="shippingZip"
                      required
                      value={formData.shippingZip}
                      onChange={(e) => setFormData({ ...formData, shippingZip: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading
                  ? t('Оформление...', 'Processing...', 'Procesando...')
                  : t('Оформить заказ', 'Place Order', 'Realizar pedido')}
              </Button>
            </form>

            <aside className="border rounded-xl p-6 bg-card h-fit">
              <h2 className="text-xl font-semibold mb-4">
                {t('Ваш заказ', 'Your Order', 'Tu pedido')}
              </h2>
              <div className="space-y-2 mb-4">
                {items.map((i) => {
                  const displayLang = language === 'es' ? 'en' : language;
                  return (
                    <div key={i.product.id} className="flex justify-between text-sm">
                      <span>
                        {i.product.name[displayLang]} × {i.quantity}
                      </span>
                      <span>${(i.product.price * i.quantity).toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
              <div className="border-t pt-4 flex justify-between font-semibold text-lg">
                <span>{t('Итого', 'Total', 'Total')}</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;

