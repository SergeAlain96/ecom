import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#303841] via-[#76ABAE] to-[#303841]">
      <div className="text-center px-4">
        <div className="mb-8">
          <h1 className="font-['Poppins'] text-9xl font-bold text-white mb-4">404</h1>
          <h2 className="font-['Poppins'] text-3xl md:text-4xl font-bold text-white mb-3">
            Page non trouvée
          </h2>
          <p className="text-white/80 text-lg max-w-md mx-auto">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="rounded-xl bg-primary hover:bg-primary/90 text-white px-8"
          >
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Retour à l'accueil
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-xl border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8"
            onClick={() => window.history.back()}
          >
            <button className="flex items-center gap-2">
              <ArrowLeft className="h-5 w-5" />
              Retour
            </button>
          </Button>
        </div>
      </div>
    </div>
  );
}
