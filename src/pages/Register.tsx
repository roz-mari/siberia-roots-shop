import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const { t } = useLanguage();
  const { register } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await register(email, password);
      toast({ title: t('Регистрация успешна', 'Registration successful', 'Registro exitoso') });
      setEmail('');
      setPassword('');
    } catch (e) {
      toast({
        title: t('Ошибка регистрации', 'Registration error', 'Error de registro'),
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
        <div className="container mx-auto px-4 max-w-lg">
          <h1 className="text-3xl font-bold mb-6">
            {t('Регистрация', 'Register', 'Registrarse')}
          </h1>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="password">{t('Пароль', 'Password', 'Contraseña')}</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? t('Отправка...', 'Submitting...', 'Enviando...') : t('Зарегистрироваться', 'Register', 'Registrarse')}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;


