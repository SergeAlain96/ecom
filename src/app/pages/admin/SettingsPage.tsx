import { Save, Store, MessageCircle, Globe, Image } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Separator } from "../../components/ui/separator";
import { shopSettings } from "../../data/mockData";

export function SettingsPage() {
  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#303841] mb-2">Paramètres</h1>
        <p className="text-gray-600">Configurez les informations de votre boutique</p>
      </div>

      <div className="space-y-6">
        {/* Shop Information */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5 text-[#FF5722]" />
              Informations de la boutique
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="shopName">Nom de la boutique</Label>
              <Input
                id="shopName"
                defaultValue={shopSettings.shopName}
                className="rounded-xl mt-2"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Une courte description de votre boutique"
                className="rounded-xl mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* WhatsApp Settings */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-green-600" />
              Configuration WhatsApp
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="whatsapp">Numéro WhatsApp principal</Label>
              <Input
                id="whatsapp"
                type="tel"
                defaultValue={shopSettings.whatsappNumber}
                placeholder="+223 XX XX XX XX"
                className="rounded-xl mt-2"
              />
              <p className="text-sm text-gray-500 mt-1">
                Ce numéro sera utilisé pour recevoir les commandes
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex gap-3">
                <MessageCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Configuration WhatsApp Business</p>
                  <p>Pour une meilleure expérience, nous recommandons d'utiliser WhatsApp Business avec un message automatique de bienvenue.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-[#76ABAE]" />
              Réseaux sociaux
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                id="facebook"
                defaultValue={shopSettings.socialMedia.facebook}
                placeholder="https://facebook.com/votreboutique"
                className="rounded-xl mt-2"
              />
            </div>

            <div>
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                defaultValue={shopSettings.socialMedia.instagram}
                placeholder="https://instagram.com/votreboutique"
                className="rounded-xl mt-2"
              />
            </div>

            <div>
              <Label htmlFor="twitter">Twitter / X</Label>
              <Input
                id="twitter"
                defaultValue={shopSettings.socialMedia.twitter}
                placeholder="https://twitter.com/votreboutique"
                className="rounded-xl mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Branding */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="h-5 w-5 text-purple-600" />
              Images et bannières
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Logo de la boutique</Label>
              <div className="mt-2 flex items-center gap-4">
                <div className="w-20 h-20 bg-[#FF5722] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-3xl">Y</span>
                </div>
                <Button variant="outline" className="rounded-xl">
                  Changer le logo
                </Button>
              </div>
            </div>

            <Separator />

            <div>
              <Label>Bannière promotionnelle</Label>
              <div className="mt-2">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#FF5722] transition-colors cursor-pointer">
                  <Image className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-2">Cliquez pour télécharger une bannière</p>
                  <p className="text-xs text-gray-500">PNG, JPG jusqu'à 5MB</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          <Button variant="outline" className="rounded-xl">
            Annuler
          </Button>
          <Button className="bg-[#FF5722] hover:bg-[#E64A19] text-white rounded-xl">
            <Save className="h-5 w-5 mr-2" />
            Enregistrer les modifications
          </Button>
        </div>
      </div>
    </div>
  );
}
