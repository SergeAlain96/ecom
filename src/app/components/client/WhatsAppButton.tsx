import { useState } from 'react';
import { motion } from 'motion/react';

export function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Tooltip — rendu toujours dans le DOM, visibility togglee par opacity */}
      <div
        className="transition-all duration-150 pointer-events-none"
        style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(4px)' }}
      >
        <div className="bg-[#303841] text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap relative">
          Contacter sur WhatsApp
          <div className="absolute bottom-[-5px] right-5 border-4 border-transparent border-t-[#303841]" />
        </div>
      </div>

      {/* Button with pulse rings */}
      <div className="relative">
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-25 animate-ping" />

        <motion.a
          href="https://wa.me/22667384509"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contacter sur WhatsApp"
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.117 1.524 5.847L.057 23.49a.5.5 0 00.614.614l5.644-1.467A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-4.987-1.357l-.357-.213-3.354.872.895-3.253-.232-.377A9.818 9.818 0 112 12 9.83 9.83 0 0112 21.818z" />
          </svg>
        </motion.a>
      </div>
    </div>
  );
}
