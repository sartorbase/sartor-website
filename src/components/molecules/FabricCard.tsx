import React from 'react';
import { ExternalLink, Layers, Sparkles } from 'lucide-react';
import { analytics } from '../../services/analytics';
import { Fabric } from '../../types';
import { Badge } from '../atoms/Badge';
import { WhatsAppButton } from './WhatsAppButton';

export interface FabricCardProps {
  fabric: Fabric;
  onSelect?: (fabric: Fabric) => void;
}

export const FabricCard: React.FC<FabricCardProps> = ({ fabric, onSelect }) => {
  const whatsappInquiryMessage = `Hello SARTOR, I am interested in your bespoke fabric: "${fabric.name}" (Code: ${fabric.code}, ${fabric.origin}). Could you please share swatches and pricing details for a custom suit?`;

  const handleInspect = () => {
    analytics.trackEvent('fabric_view', { fabricId: fabric.id, fabricName: fabric.name });
    if (onSelect) onSelect(fabric);
  };

  return (
    <div
      id={`fabric-card-${fabric.id}`}
      className="group relative flex flex-col bg-stone-900/90 border border-stone-800 rounded-xl overflow-hidden hover:border-amber-700/60 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-stone-950/80"
    >
      {/* Visual Header / Image Swatch */}
      <div className="relative aspect-4/3 overflow-hidden bg-stone-950 cursor-pointer" onClick={handleInspect}>
        <img
          src={fabric.imageUrl}
          alt={fabric.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

        {/* Swatch color orb */}
        <div
          className="absolute top-3 left-3 w-6 h-6 rounded-full border-2 border-stone-900 shadow-md"
          style={{ backgroundColor: fabric.swatchColor }}
          title={`Swatch color tone: ${fabric.name}`}
        />

        {/* Grade Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant={fabric.priceGrade === 'Imperial Bespoke' ? 'gold' : 'stone'}>
            {fabric.priceGrade}
          </Badge>
        </div>

        {/* Code Tag */}
        <div className="absolute bottom-2.5 left-3 text-[11px] font-mono tracking-wider text-stone-300 bg-stone-950/80 px-2 py-0.5 rounded border border-stone-800 backdrop-blur-sm">
          {fabric.code}
        </div>
      </div>

      {/* Body Content */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-amber-500 font-medium tracking-wide mb-1">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              {fabric.origin}
            </span>
            <span>{fabric.weight}</span>
          </div>

          <h3 className="font-serif text-base sm:text-lg font-semibold text-stone-100 group-hover:text-amber-400 transition-colors line-clamp-1">
            {fabric.name}
          </h3>

          <p className="mt-2 text-xs text-stone-400 line-clamp-2 leading-relaxed">
            {fabric.texture}
          </p>

          <div className="mt-3.5 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
            <span>Composition:</span>
            <span className="text-stone-200 font-medium truncate max-w-[60%] text-right">{fabric.composition}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 pt-3 border-t border-stone-800 flex items-center gap-2">
          <WhatsAppButton
            message={whatsappInquiryMessage}
            channel="fabric"
            label="Inquire on WhatsApp"
            size="sm"
            fullWidth
            variant="secondary"
            className="hover:border-emerald-600 hover:text-emerald-400"
          />
        </div>
      </div>
    </div>
  );
};
