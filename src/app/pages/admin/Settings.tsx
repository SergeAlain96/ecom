import { useState } from 'react';
import { shopSettings as initialSettings } from '../../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Separator } from '../../components/ui/separator';
import { Store, Phone, Facebook, Instagram, Twitter, Save } from 'lucide-react';
import { toast } from 'sonner';

export function AdminSettings() {
  const [settings, setSettings] = useState(initialSettings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Paramètres enregistrés avec succès');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-['Poppins'] text-3xl font-bold text-[#303841]">
          Paramètres
        </h1>
        <p className="text-muted-foreground mt-1">
          Gérez les paramètres de votre boutique
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Shop Information */}
        <Card className="rounded-xl border-2">
          <CardHeader>
            <CardTitle className="font-['Poppins'] flex items-center gap-2">
              <Store className="h-5 w-5 text-primary" />
              Informations de la boutique
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="shopName">Nom de la boutique</Label>
              <Input
                id="shopName"
                value={settings.shopName}
                onChange={(e) => setSettings({ ...settings, shopName: e.target.value })}
                placeholder="Nom de votre boutique"
                className="rounded-lg"
              />
            </div>
            <div>
              <Label htmlFor="whatsapp">Numéro WhatsApp principal</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="whatsapp"
                  type="tel"
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  placeholder="+223 XX XX XX XX"
                  className="pl-10 rounded-lg"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Ce numéro sera utilisé pour recevoir les commandes
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card className="rounded-xl border-2">
          <CardHeader>
            <CardTitle className="font-['Poppins']">Réseaux sociaux</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="facebook">Facebook</Label>
              <div className="relative">
                <Facebook className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="facebook"
                  type="url"
                  value={settings.socialMedia.facebook}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialMedia: { ...settings.socialMedia, facebook: e.target.value }
                  })}
                  placeholder="https://facebook.com/votre-page"
                  className="pl-10 rounded-lg"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="instagram">Instagram</Label>
              <div className="relative">
                <Instagram className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="instagram"
                  type="url"
                  value={settings.socialMedia.instagram}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialMedia: { ...settings.socialMedia, instagram: e.target.value }
                  })}
                  placeholder="https://instagram.com/votre-compte"
                  className="pl-10 rounded-lg"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="twitter">Twitter</Label>
              <div className="relative">
                <Twitter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="twitter"
                  type="url"
                  value={settings.socialMedia.twitter}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialMedia: { ...settings.socialMedia, twitter: e.target.value }
                  })}
                  placeholder="https://twitter.com/votre-compte"
                  className="pl-10 rounded-lg"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button type="submit" size="lg" className="rounded-xl bg-primary hover:bg-primary/90 px-8">
            <Save className="h-4 w-4 mr-2" />
            Enregistrer les modifications
          </Button>
        </div>
      </form>
    </div>
  );
}
