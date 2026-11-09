'use client';

import React, { useState } from 'react';
import { Box, CheckCircle, Sparkles, ShoppingBag, ExternalLink } from 'lucide-react';
import { useInvitation } from '../../context/InvitationContext';

interface PhysicalCalculatorProps {
  onOpenSampleModal: () => void;
}

export const PhysicalCalculator: React.FC<PhysicalCalculatorProps> = ({ onOpenSampleModal }) => {
  const { themeMode } = useInvitation();
  const isLight = themeMode === 'light';

  const [quantity, setQuantity] = useState<number>(300);
  const [paperType, setPaperType] = useState<'softcover' | 'hardcover' | 'akrilik'>('hardcover');
  const [addGoldFoil, setAddGoldFoil] = useState<boolean>(true);
  const [addVellum, setAddVellum] = useState<boolean>(true);
  const [addWaxSeal, setAddWaxSeal] = useState<boolean>(false);

  // Price Calculation Logic
  const calculatePrice = () => {
    let basePricePerPiece = 0;
    if (paperType === 'softcover') basePricePerPiece = 5500;
    if (paperType === 'hardcover') basePricePerPiece = 10500;
    if (paperType === 'akrilik') basePricePerPiece = 18500;

    // Volume discount
    if (quantity >= 500) basePricePerPiece *= 0.82;
    else if (quantity >= 300) basePricePerPiece *= 0.88;
    else if (quantity >= 200) basePricePerPiece *= 0.94;

    // Addons
    if (addGoldFoil) basePricePerPiece += 1200;
    if (addVellum) basePricePerPiece += 1800;
    if (addWaxSeal) basePricePerPiece += 1500;

    const roundedPerPiece = Math.round(basePricePerPiece / 100) * 100;
    const total = roundedPerPiece * quantity;

    return { perPiece: roundedPerPiece, total };
  };

  const { perPiece, total } = calculatePrice();
  const qualifiesForFreeDigital = quantity >= 200;

  return (
    <section className={`py-20 lg:py-28 border-t transition-colors duration-300 ${
      isLight ? 'bg-[#FAF8F5] border-amber-200' : 'bg-[#051817] border-gold-subtle'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className={`text-xs uppercase font-extrabold tracking-widest px-3.5 py-1 rounded-full border shadow-sm ${
            isLight ? 'bg-amber-100 text-amber-900 border-amber-300' : 'text-gold-300 bg-gold-950/80 border-gold-subtle'
          }`}>
            Kalkulator Cetak Fisik
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 ${
            isLight ? 'text-stone-900' : 'text-white'
          }`}>
            Simulasi Biaya Cetak Undangan Fisik
          </h2>
          <p className={`text-sm sm:text-base mt-3 ${
            isLight ? 'text-stone-600' : 'text-stone-300'
          }`}>
            Transparan, tanpa biaya tersembunyi. Sesuaikan jumlah eksemplar, jenis kertas, dan sentuhan finishing sesuai anggaran pernikahanmu.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Controls Form */}
          <div className={`lg:col-span-7 rounded-3xl p-6 sm:p-8 border space-y-6 transition-all ${
            isLight
              ? 'bg-white border-amber-200 shadow-xl shadow-amber-950/5'
              : 'bg-[#061e1d] border-gold-subtle'
          }`}>
            
            {/* Quantity Selector */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className={`text-xs font-bold uppercase tracking-wider ${
                  isLight ? 'text-stone-700' : 'text-stone-300'
                }`}>
                  Jumlah Eksemplar (Pcs):
                </label>
                <span className={`text-sm font-extrabold px-3 py-1 rounded-full border ${
                  isLight
                    ? 'text-amber-800 bg-amber-50 border-amber-200'
                    : 'text-gold-300 bg-[#041514] border-gold-subtle'
                }`}>
                  {quantity} Pcs
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[100, 200, 300, 500].map((qty) => (
                  <button
                    key={qty}
                    type="button"
                    onClick={() => setQuantity(qty)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      quantity === qty
                        ? 'bg-gradient-to-r from-amber-500 to-gold-400 text-black border-gold-400 shadow-gold-sm'
                        : isLight
                        ? 'bg-[#F9F6F0] text-stone-700 border-amber-200 hover:bg-[#F2ECE0]'
                        : 'bg-white/5 text-stone-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {qty} pcs
                  </button>
                ))}
              </div>
            </div>

            {/* Paper / Material Type */}
            <div>
              <label className={`text-xs font-bold uppercase tracking-wider block mb-2 ${
                isLight ? 'text-stone-700' : 'text-stone-300'
              }`}>
                Pilih Jenis Undangan:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'softcover', name: 'Softcover', desc: 'Jasmine / Linen' },
                  { id: 'hardcover', name: 'Hardcover', desc: 'Board Tebal 30' },
                  { id: 'akrilik', name: 'Akrilik UV', desc: 'Modern Glass' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPaperType(item.id as any)}
                    className={`p-3 text-left rounded-xl border transition-all ${
                      paperType === item.id
                        ? isLight
                          ? 'bg-amber-100 border-amber-400 text-amber-950 font-bold shadow-sm'
                          : 'bg-gold-950 border-gold-400 text-gold-200 shadow-gold-sm'
                        : isLight
                        ? 'bg-[#F9F6F0] text-stone-700 border-amber-200 hover:bg-[#F2ECE0]'
                        : 'bg-white/5 text-stone-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <p className="text-xs font-bold">{item.name}</p>
                    <p className={`text-[10px] mt-0.5 ${
                      paperType === item.id
                        ? isLight ? 'text-amber-800' : 'text-gold-300'
                        : isLight ? 'text-stone-500' : 'text-stone-400'
                    }`}>
                      {item.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Finishing Addons */}
            <div>
              <label className={`text-xs font-bold uppercase tracking-wider block mb-2 ${
                isLight ? 'text-stone-700' : 'text-stone-300'
              }`}>
                Finishing Mewah (Tambahan):
              </label>
              <div className="space-y-2">
                <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                  isLight
                    ? 'bg-[#FDFBF7] border-amber-200 hover:border-amber-400'
                    : 'bg-black/40 border-gold-subtle hover:border-gold-400'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={addGoldFoil}
                      onChange={(e) => setAddGoldFoil(e.target.checked)}
                      className="w-4 h-4 rounded text-gold-400 focus:ring-gold-500"
                    />
                    <div>
                      <p className={`text-xs font-bold ${isLight ? 'text-stone-800' : 'text-white'}`}>Hotprint Gold Foil Timbul</p>
                      <p className={`text-[10px] ${isLight ? 'text-stone-500' : 'text-stone-400'}`}>Aksen nama mempelai berkilau emas mewah</p>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold ${isLight ? 'text-amber-800' : 'text-gold-300'}`}>+Rp 1.200/pcs</span>
                </label>

                <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                  isLight
                    ? 'bg-[#FDFBF7] border-amber-200 hover:border-amber-400'
                    : 'bg-black/40 border-gold-subtle hover:border-gold-400'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={addVellum}
                      onChange={(e) => setAddVellum(e.target.checked)}
                      className="w-4 h-4 rounded text-gold-400 focus:ring-gold-500"
                    />
                    <div>
                      <p className={`text-xs font-bold ${isLight ? 'text-stone-800' : 'text-white'}`}>Amplop Kalkir Transparan (Vellum)</p>
                      <p className={`text-[10px] ${isLight ? 'text-stone-500' : 'text-stone-400'}`}>Amplop semi-transparan kekinian berkelas</p>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold ${isLight ? 'text-amber-800' : 'text-gold-300'}`}>+Rp 1.800/pcs</span>
                </label>

                <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                  isLight
                    ? 'bg-[#FDFBF7] border-amber-200 hover:border-amber-400'
                    : 'bg-black/40 border-gold-subtle hover:border-gold-400'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={addWaxSeal}
                      onChange={(e) => setAddWaxSeal(e.target.checked)}
                      className="w-4 h-4 rounded text-gold-400 focus:ring-gold-500"
                    />
                    <div>
                      <p className={`text-xs font-bold ${isLight ? 'text-stone-800' : 'text-white'}`}>Wax Seal Cap Lilin + Pita Satin</p>
                      <p className={`text-[10px] ${isLight ? 'text-stone-500' : 'text-stone-400'}`}>Stempel cap lilin autentik & pita halus</p>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold ${isLight ? 'text-amber-800' : 'text-gold-300'}`}>+Rp 1.500/pcs</span>
                </label>
              </div>
            </div>

          </div>

          {/* Realtime Result Card */}
          <div className={`lg:col-span-5 rounded-3xl p-6 sm:p-8 border-2 space-y-6 transition-all ${
            isLight
              ? 'bg-gradient-to-br from-white via-[#FAF5EC] to-white text-stone-900 border-amber-400 shadow-2xl shadow-amber-950/10'
              : 'bg-gradient-to-br from-[#0c2e2b] to-[#041514] text-white shadow-velvet-deep border-gold-400'
          }`}>
            <div>
              <span className={`text-[10px] uppercase font-bold tracking-widest ${
                isLight ? 'text-amber-800' : 'text-gold-400'
              }`}>
                Estimasi Biaya Cetak
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className={`text-3xl sm:text-4xl font-bold ${
                  isLight ? 'text-amber-850 text-gold-light' : 'text-gold-bright'
                }`}>
                  Rp {perPiece.toLocaleString('id-ID')}
                </span>
                <span className={`text-xs ${isLight ? 'text-stone-500' : 'text-stone-400'}`}>/ pcs</span>
              </div>
              <p className={`text-xs mt-1 ${isLight ? 'text-stone-600' : 'text-stone-300'}`}>
                Total perkiraan untuk {quantity} pcs: <strong className={`font-bold ${
                  isLight ? 'text-amber-900' : 'text-gold-200'
                }`}>Rp {total.toLocaleString('id-ID')}</strong>
              </p>
            </div>

            {/* Bonus Banner */}
            {qualifiesForFreeDigital ? (
              <div className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
                isLight
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-emerald-950/80 border-emerald-500/50'
              }`}>
                <Sparkles className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                  isLight ? 'text-emerald-600' : 'text-emerald-400'
                }`} />
                <div>
                  <p className={`text-xs font-bold ${isLight ? 'text-emerald-900' : 'text-emerald-300'}`}>
                    SELAMAT! Kamu Dapat Bonus Bundling:
                  </p>
                  <p className={`text-[11px] mt-0.5 ${isLight ? 'text-emerald-800' : 'text-emerald-100'}`}>
                    Pemesanan di atas 200 pcs otomatis mendapatkan <strong>GRATIS Undangan Digital Premium</strong> + QR Code Meja Tamu.
                  </p>
                </div>
              </div>
            ) : (
              <div className={`p-3.5 rounded-2xl border text-xs ${
                isLight
                  ? 'bg-amber-50 border-amber-200 text-amber-900'
                  : 'bg-white/5 border-white/10 text-stone-300'
              }`}>
                💡 <em>Tambah {200 - quantity} pcs lagi untuk dapatkan bonus GRATIS Undangan Web Digital Premium!</em>
              </div>
            )}

            {/* Included in Service */}
            <div className={`space-y-2 text-xs pt-2 border-t ${
              isLight ? 'text-stone-700 border-amber-200' : 'text-stone-300 border-gold-subtle'
            }`}>
              <div className="flex items-center gap-2">
                <CheckCircle className={`w-4 h-4 ${isLight ? 'text-amber-600' : 'text-gold-400'}`} />
                <span>Gratis Plastik OPP & Label Nama Tamu</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className={`w-4 h-4 ${isLight ? 'text-amber-600' : 'text-gold-400'}`} />
                <span>Revisi Desain Sampai Fix ACC</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className={`w-4 h-4 ${isLight ? 'text-amber-600' : 'text-gold-400'}`} />
                <span>Pengiriman Bergaransi se-Indonesia</span>
              </div>
            </div>

            {/* Order via Shopee Button */}
            <div className="pt-2 space-y-3">
              <a
                href="https://shopee.co.id/harinikah_official"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#EE4D2D] hover:bg-[#D73211] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-102 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Pesan Undangan Fisik via Shopee Official</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
