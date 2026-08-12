"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppUrl, copyToClipboard } from "@/lib/whatsapp";
import { profile } from "@/data/profile";
import { Copy, Check, MessageCircle, AlertCircle } from "lucide-react";

export function WhatsAppRSVP() {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  const [url, setUrl] = useState("https://pestakecil-azkia.vercel.app");

  React.useEffect(() => {
    setUrl(window.location.href);
  }, []);
  
  const handleCopyLink = async () => {
    const success = await copyToClipboard(url);
    
    if (success) {
      setCopied(true);
      setError(false);
      setTimeout(() => setCopied(false), 3000);
    } else {
      setError(true);
    }
  };

  const handleSendWA = () => {
    const message = `Hai, aku udah buka kadonya! Makasih banyak ya buat pestanya. Aku suka banget! 🎂✨\n\nBisa diakses di sini: ${url}`;
    
    const waUrl = buildWhatsAppUrl(message);
    if (waUrl) {
      window.open(waUrl, '_blank');
    }
  };

  return (
    <section className="py-20 md:py-28 px-5 bg-white border-t border-[#F2C9D5]/30">
      <div className="max-w-3xl mx-auto text-center space-y-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl md:text-5xl text-[#C91F5A] mb-4">
            waktunya balas sapa
          </h2>
          <p className="text-[#8B717A] text-lg max-w-lg mx-auto">
            kalau senyumnya udah cukup lebar, kasih tahu pembuatnya ya.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-[#FFF9FB] p-8 md:p-10 rounded-3xl border border-[#F2C9D5] shadow-sm max-w-xl mx-auto"
        >
          <p className="text-[#4A3038] font-medium mb-8">
            Kirim pesan langsung ke {profile.senderName} buat ngasih tahu kalau kamu udah buka kadonya.
          </p>

          <div className="space-y-4">
            <Button 
              onClick={handleSendWA} 
              size="lg" 
              className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white flex gap-3 shadow-medium"
            >
              <MessageCircle size={20} />
              Kabarin lewat WhatsApp
            </Button>
            
            <div className="flex gap-2">
              <div className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-full text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap text-left">
                {url}
              </div>
              <Button 
                onClick={handleCopyLink} 
                variant={copied ? "primary" : "outline"} 
                className="w-auto px-6 flex gap-2"
                aria-label={copied ? "Tersalin" : "Salin Link"}
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                <span className="hidden sm:inline">{copied ? "Tersalin" : "Salin Link"}</span>
              </Button>
            </div>
            
            {error && (
              <p className="text-red-500 text-sm flex items-center justify-center gap-1 mt-2">
                <AlertCircle size={14} /> Gagal menyalin, coba lagi.
              </p>
            )}
          </div>
        </motion.div>
        
        <p className="text-sm text-gray-400 mt-12 pb-4">
          Dibuat dengan senyum untuk {profile.displayName}.
        </p>

      </div>
    </section>
  );
}
