import { useState } from 'react';
import { Search, X, Star } from 'lucide-react';
import { PRODUCTS, CATEGORIES_LIST } from '../data/products';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onSelectCategory: (categoryId: string) => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectCategory,
}: SearchModalProps) {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFirmness, setSelectedFirmness] = useState<string>('Tous');

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesQuery =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.composition.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFirmness =
      selectedFirmness === 'Tous' || p.firmness === selectedFirmness;

    return matchesQuery && matchesFirmness;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 border border-[#E8EEF5] animate-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-[#E8EEF5] pb-4">
          <Search className="w-5 h-5 text-[#BA8C48] absolute left-2" />
          <input
            type="text"
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un matelas ARTON CONFORT, technologie (ressorts, latex, mémoire)..."
            className="w-full pl-10 pr-10 py-2 text-base text-[#132B45] placeholder:text-[#8BA0B8] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-[#536B82] hover:text-[#132B45] rounded-lg hover:bg-[#F0F4F8] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Filter Tags */}
        <div className="flex items-center gap-2 py-3 border-b border-[#E8EEF5] overflow-x-auto text-xs">
          <span className="text-[#536B82] font-medium shrink-0">Fermeté :</span>
          {['Tous', 'Moelleux', 'Équilibré', 'Ferme'].map((firmness) => (
            <button
              key={firmness}
              onClick={() => setSelectedFirmness(firmness)}
              className={`px-3 py-1 rounded-full font-medium transition-colors shrink-0 cursor-pointer ${
                selectedFirmness === firmness
                  ? 'bg-[#132B45] text-white shadow-xs'
                  : 'bg-[#FAF9F7] hover:bg-[#F0F4F8] text-[#536B82]'
              }`}
            >
              {firmness}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="mt-4 max-h-[60vh] overflow-y-auto space-y-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-10 text-[#536B82] text-sm">
              Aucun modèle trouvé pour « {searchQuery} ».
            </div>
          ) : (
            filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  onSelectProduct(p);
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-[#FAF9F7] transition-colors cursor-pointer group border border-transparent hover:border-[#E8EEF5]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-14 bg-[#FAF9F7] p-1.5 rounded-lg border border-[#E8EEF5] flex items-center justify-center shrink-0">
                    <img
                      src={p.image}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-[#132B45] group-hover:text-[#BA8C48]">
                        {p.name}
                      </h4>
                      {p.badge && (
                        <span className="text-[10px] bg-[#BA8C48] text-white px-2 py-0.5 rounded-full font-semibold">
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#536B82] flex items-center gap-3 mt-1">
                      <span>{p.composition}</span>
                      <span>•</span>
                      <span>Soutien {p.firmness}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0 pl-2">
                  <div className="font-bold text-sm text-[#132B45]">dès {p.price.toLocaleString('fr-FR')} DH</div>
                  <div className="flex items-center justify-end text-[#BA8C48] text-xs">
                    <Star className="w-3 h-3 fill-current mr-0.5" />
                    <span>{p.rating}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Categories Footer */}
        <div className="mt-4 pt-3 border-t border-[#E8EEF5] flex items-center justify-between text-xs text-[#536B82]">
          <span>Rayons :</span>
          <div className="flex gap-2">
            {CATEGORIES_LIST.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  onClose();
                }}
                className="hover:text-[#BA8C48] hover:underline cursor-pointer"
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
