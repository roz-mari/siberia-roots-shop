import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: t('Сообщение отправлено!', 'Message sent!', '¡Mensaje enviado!'),
      description: t(
        'Мы свяжемся с вами в ближайшее время.',
        'We will contact you as soon as possible.',
        'Nos pondremos en contacto contigo lo antes posible.'
      ),
    });

    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('Свяжитесь с нами', 'Contact Us', 'Contáctanos')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t(
                'Есть вопросы? Мы будем рады вам помочь!',
                'Have questions? We are happy to help!',
                '¿Tienes preguntas? ¡Estamos encantados de ayudarte!'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>
                  {t('Отправить сообщение', 'Send a Message', 'Enviar un mensaje')}
                </CardTitle>
                <CardDescription>
                  {t(
                    'Заполните форму, и мы ответим вам как можно скорее',
                    'Fill out the form and we will respond as soon as possible',
                    'Completa el formulario y te responderemos lo antes posible'
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      {t('Имя', 'Name', 'Nombre')}
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={t('Ваше имя', 'Your name', 'Tu nombre')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {t('Email', 'Email', 'Correo')}
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={t('ваш@email.com', 'your@email.com', 'tu@email.com')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      {t('Сообщение', 'Message', 'Mensaje')}
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder={t('Ваше сообщение...', 'Your message...', 'Tu mensaje...')}
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    {t('Отправить', 'Send', 'Enviar')}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6 animate-fade-in">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {t('Адрес', 'Address', 'Dirección')}
                      </h3>
                      <p className="text-muted-foreground">
                        {t(
                          'Новосибирск, Россия',
                          'Novosibirsk, Russia',
                          'Novosibirsk, Rusia'
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {t('Email', 'Email', 'Correo')}
                      </h3>
                      <p className="text-muted-foreground">
                        info@siberian-treasures.com
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {t('Телефон', 'Phone', 'Teléfono')}
                      </h3>
                      <p className="text-muted-foreground">
                        +7 (383) 123-45-67
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-secondary/30">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-3">
                    {t('Часы работы', 'Working Hours', 'Horario')}
                  </h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>{t('Пн-Пт: 9:00 - 18:00', 'Mon-Fri: 9:00 AM - 6:00 PM', 'Lun-Vie: 9:00 - 18:00')}</p>
                    <p>{t('Сб-Вс: Выходной', 'Sat-Sun: Closed', 'Sáb-Dom: Cerrado')}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
