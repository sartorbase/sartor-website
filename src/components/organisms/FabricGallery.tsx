import React, { useState } from 'react';
import { Eye, Filter, Layers, MessageSquare, Search, Sparkles, X } from 'lucide-react';
import { FABRICS } from '../../data/fabrics';
import { analytics, buildWhatsAppLink } from '../../services/analytics';
import { Fabric, FabricCategory } from '../../types';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { SectionHeading } from '../atoms/SectionHeading';
import { FabricCard } from '../molecules/FabricCard';
import { WhatsAppButton } from '../molecules/WhatsAppButton';

export const FabricGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<FabricCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalFabric, setActiveModalFabric] = useState<Fabric | null>(null);

  const categories: { id: FabricCategory; label: string }[] = [
    { id: 'all', label: 'All Fabrics' },
    { id: 'wool', label: 'Super 120s–180s Wool' },
    { id: 'cashmere', label: 'Cashmere & Silk' },
    { id: 'linen', label: 'Pure Irish Linen' },
    { id: 'cotton', label: 'Egyptian Cotton' },
    { id: 'ceremonial', label: 'Velvet & Raw Silk' },
  ];

  const filteredFabrics = FABRICS.filter((fabric) => {
    const matchesCategory = selectedCategory === 'all' || fabric.category === selectedCategory;
    const matchesSearch =
      fabric.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fabric.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fabric.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fabric.composition.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenModal = (fabric: Fabric) => {
    setActiveModalFabric(fabric);
    analytics.trackEvent('fabric_view', { fabricId: fabric.id, fabricName: fabric.name });
  };

  const handleInquireFromModal = (fabric: Fabric) => {
    const msg = `Hello SARTOR Master Tailor, I am looking at your bespoke fabric collection on sartor.pk: "${fabric.name}" (${fabric.code}, ${fabric.origin}). Please let me know its availability and suit crafting package.`;
    const url = buildWhatsAppLink(msg, 'fabric');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="fabrics" className="py-20 bg-stone-900/60 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeading
          badge="Bespoke Fabric Library"
          title="Curated European & Heritage Loom Fabrics"
          subtitle="From Biella and Huddersfield super-counts to Irish linens and artisanal Lahore raw silks. Explore the tactile foundations of our bespoke suiting."
        />

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-stone-800">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  analytics.trackEvent('fabric_view', { filteredCategory: cat.id });
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-600 text-stone-950 font-semibold shadow-md'
                    : 'bg-stone-900 text-stone-400 border border-stone-800 hover:border-stone-700 hover:text-stone-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search fabric, mill or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-900 border border-stone-800 rounded-lg pl-9 pr-3.5 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* Fabrics Grid */}
        {filteredFabrics.length === 0 ? (
          <div className="text-center py-16 bg-stone-900/40 rounded-xl border border-stone-800">
            <p className="text-stone-400 text-sm">No fabrics match your search criteria.</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredFabrics.map((fabric) => (
              <FabricCard
                key={fabric.id}
                fabric={fabric}
                onSelect={handleOpenModal}
              />
            ))}
          </div>
        )}

        {/* Custom Sourcing Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900 to-amber-950/40 border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              Private Mill Sourcing & Custom Linings
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-100">
              Seeking a Specific British or Italian Fabric House?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-stone-400 leading-relaxed">
              We source directly from Loro Piana, Vitale Barberis Canonico, Scabal, Dormeuil, and Holland & Sherry upon commission. Share your fabric specifications or swatch photo on WhatsApp with our Master Cutter.
            </p>
          </div>

          <WhatsAppButton
            channel="fabric"
            label="Inquire Custom Mill Sourcing"
            variant="gold"
            size="md"
            message="Hello SARTOR, I am looking for custom fabric sourcing (e.g. Scabal / Loro Piana / VBC) for a bespoke commission."
          />
        </div>

      </div>

      {/* Swatch Detail Inspection Modal */}
      {activeModalFabric && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-stone-800 bg-stone-950">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-5 h-5 rounded-full border border-stone-700"
                  style={{ backgroundColor: activeModalFabric.swatchColor }}
                />
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-100">
                    {activeModalFabric.name}
                  </h3>
                  <span className="text-xs text-amber-500 font-mono">
                    Code: {activeModalFabric.code}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActiveModalFabric(null)}
                className="p-2 rounded-lg bg-stone-900 text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="relative rounded-xl overflow-hidden aspect-square border border-stone-800 bg-stone-950">
                <img
                  src={activeModalFabric.imageUrl}
                  alt={activeModalFabric.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2">
                  <Badge variant={activeModalFabric.priceGrade === 'Imperial Bespoke' ? 'gold' : 'stone'}>
                    {activeModalFabric.priceGrade}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col gap-3 text-xs">
                <div className="p-3 rounded-lg bg-stone-950/70 border border-stone-800/80">
                  <span className="text-stone-400 uppercase tracking-wider block text-[10px] mb-1">
                    Mill Origin & Region
                  </span>
                  <span className="font-medium text-stone-200 text-sm">{activeModalFabric.origin}</span>
                </div>

                <div className="p-3 rounded-lg bg-stone-950/70 border border-stone-800/80">
                  <span className="text-stone-400 uppercase tracking-wider block text-[10px] mb-1">
                    Composition
                  </span>
                  <span className="font-medium text-stone-200 text-sm">{activeModalFabric.composition}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-lg bg-stone-950/70 border border-stone-800/80">
                    <span className="text-stone-400 uppercase tracking-wider block text-[10px] mb-0.5">
                      Weight
                    </span>
                    <span className="font-medium text-stone-200">{activeModalFabric.weight}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-stone-950/70 border border-stone-800/80">
                    <span className="text-stone-400 uppercase tracking-wider block text-[10px] mb-0.5">
                      Season
                    </span>
                    <span className="font-medium text-stone-200">{activeModalFabric.season}</span>
                  </div>
                </div>

                <p className="text-stone-400 mt-1 leading-relaxed">
                  <strong className="text-stone-300">Texture:</strong> {activeModalFabric.texture}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t border-stone-800 bg-stone-950/60 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-stone-400">
                Swatch sample available to touch at Moon Tower, Model Town.
              </div>
              <Button
                variant="whatsapp"
                size="md"
                leftIcon={<MessageSquare className="w-4 h-4 fill-current" />}
                onClick={() => handleInquireFromModal(activeModalFabric)}
              >
                Inquire on WhatsApp
              </Button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
