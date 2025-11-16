import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { api, type OrderResponse, type ApiError } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const navigate = useNavigate();
  const { token, logout } = useAuth();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate('/register');
      return;
    }

    const loadOrders = async () => {
      try {
        const userOrders = await api.getUserOrders(token);
        setOrders(userOrders);
      } catch (error) {
        const apiError = error as ApiError;
        if (apiError.status === 401) {
          logout();
          navigate('/register');
        } else {
          toast({
            title: t('Ошибка', 'Error', 'Error'),
            description: apiError.message || t('Не удалось загрузить заказы', 'Failed to load orders', 'No se pudieron cargar los pedidos'),
            variant: 'destructive',
          });
        }
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [token, navigate, logout, toast, t]);

  if (!token) {
    return null;
  }

  const displayLang = language === 'es' ? 'en' : language;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {t('Профиль', 'Profile', 'Perfil')}
            </h1>
            <Button variant="outline" onClick={logout}>
              {t('Выйти', 'Logout', 'Cerrar sesión')}
            </Button>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">
              {t('История заказов', 'Order History', 'Historial de pedidos')}
            </h2>

            {loading ? (
              <p className="text-muted-foreground">
                {t('Загрузка...', 'Loading...', 'Cargando...')}
              </p>
            ) : orders.length === 0 ? (
              <p className="text-muted-foreground">
                {t('У вас пока нет заказов', 'You have no orders yet', 'Aún no tienes pedidos')}
              </p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border rounded-xl p-6 bg-card">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {t('Заказ №', 'Order #', 'Pedido #')}{order.id.slice(0, 8)}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString(displayLang === 'ru' ? 'ru-RU' : displayLang === 'es' ? 'es-ES' : 'en-US')}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${order.total.toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground">{order.status}</div>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span>{item.productName} × {item.quantity}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-4">
                      <p className="text-sm">
                        <strong>{t('Доставка:', 'Shipping:', 'Envío:')}</strong> {order.shippingName}, {order.shippingAddress}, {order.shippingCity}, {order.shippingZip}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;

