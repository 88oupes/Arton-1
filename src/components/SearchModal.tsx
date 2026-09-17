import { useState } from 'react';
import { Search, X, Star, ArrowRight } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
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
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 animate-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-gray-200 pb-4">
          <Search className="w-5 h-5 text-[#A982B8] absolute left-2" />
          <input
            type="text"
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un matelas DARY, technologie (ressorts, latex, mémoire)..."
            className="w-full pl-10 pr-10 py-2 text-base text-[#2D1C38] placeholder:text-[#A982B8] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-[#A982B8] hover:text-[#2D1C38] rounded-lg hover:bg-[#F0EAF3] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Filter Tags */}
        <div className="flex items-center gap-2 py-3 border-b border-[#F0EAF3] overflow-x-auto text-xs">
          <span className="text-[#665373] font-medium shrink-0">Fermeté :</span>
          {['Tous', 'Moelleux', 'Équilibré', 'Ferme'].map((firmness) => (
            <button
              key={firmness}
              onClick={() => setSelectedFirmness(firmness)}
              className={`px-3 py-1 rounded-full font-medium transition-colors shrink-0 cursor-pointer ${
                selectedFirmness === firmness
                  ? 'bg-[#723C90] text-white shadow-xs'
                  : 'bg-[#F8F6F9] hover:bg-[#F0EAF3] text-[#554860]'
              }`}
            >
              {firmness}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="mt-4 max-h-[60vh] overflow-y-auto space-y-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-10 text-[#665373] text-sm">
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
                className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F8F6F9] transition-colors cursor-pointer group border border-transparent hover:border-[#E5DAEA]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-14 bg-[#F8F6F9] p-1.5 rounded-lg border border-[#F0EAF3] flex items-center justify-center shrink-0">
                    <img
                      src={p.image}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-[#2D1C38] group-hover:text-[#723C90]">
                        {p.name}
                      </h4>
                      {p.badge && (
                        <span className="text-[10px] bg-[#723C90] text-white px-2 py-0.5 rounded-full font-semibold">
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#665373] flex items-center gap-3 mt-1">
                      <span>{p.composition}</span>
                      <span>•</span>
                      <span>Soutien {p.firmness}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0 pl-2">
                  <div className="font-bold text-sm text-[#723C90]">dès {p.price.toLocaleString('fr-FR')} DH</div>
                  <div className="flex items-center justify-end text-[#723C90] text-xs">
                    <Star className="w-3 h-3 fill-current mr-0.5" />
                    <span>{p.rating}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Categories Footer */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Univers :</span>
          <div className="flex gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  onClose();
                }}
                className="hover:text-[#204033] hover:underline cursor-pointer"
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
