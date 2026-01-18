import { forwardRef, useMemo } from "react";
import { ScanLine } from "lucide-react";
import type { Archetype } from "../../../data/archetypes";
import { FALLBACK_ICON } from "../../../data/archetypes";

interface Props {
  result: Archetype;
  exportMode?: boolean;
  expandHeight?: boolean;
}

export const ResultCard = forwardRef<HTMLDivElement, Props>(
  ({ result, exportMode = false, expandHeight = false }, ref) => {
  const ResultIcon = result.icon || FALLBACK_ICON;
  const cardId = useMemo(() => Math.floor(Math.random() * 900) + 100, [result.id]);
  const today = useMemo(() => new Date().toLocaleDateString("ru-RU"), []);
  const hasImage = Boolean(result.image);
  const overlayClass = "opacity-30 mix-blend-multiply";
  const sideRailClass = "bg-black/50 backdrop-blur-sm";
  const sizeClass = expandHeight
    ? "min-h-[640px]"
    : exportMode
      ? "aspect-[9/16]"
      : "aspect-auto sm:aspect-[9/16]";
  const contentOffsetClass = exportMode ? "-mt-[2px]" : "";

  return (
    <div
      ref={ref}
      className={`w-full max-w-[360px] ${sizeClass} relative bg-[#1a1a1a] flex flex-col p-4 font-sans overflow-hidden text-white shadow-[0_0_50px_rgba(0,0,0,0.5)] mx-auto border-4 border-black`}
    >
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15) 0, transparent 45%), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.1) 0, transparent 40%)"
        }}
      />

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.03]">
        <div className="text-[100px] font-black leading-none text-white whitespace-nowrap rotate-90 origin-top-left translate-x-20 translate-y-20">
          ROAST.cards ROAST.cards
        </div>
      </div>

      <div className="relative z-10 w-full h-full border-[3px] border-white flex flex-col bg-[#222] shadow-[0_0_20px_rgba(0,0,0,0.8)]">
        <div className="h-10 border-b-[3px] border-white flex items-center justify-between px-3 bg-black">
          <div className="flex items-center gap-2">
            <ScanLine size={16} className="text-white" />
            <span className="font-mono text-[10px] tracking-widest text-gray-400">
              КОД: <span className="text-white font-bold">{cardId}</span>
            </span>
          </div>
          <div className="px-2 py-0.5 border border-white text-[9px] font-black uppercase tracking-widest rounded-sm">
            {result.rarity}
          </div>
        </div>

        <div className="relative w-full aspect-square border-b-[3px] border-white bg-gray-800 overflow-hidden group">
          {hasImage ? (
            <>
              <img
                src={result.image}
                alt={`Архетип: ${result.title}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className={`absolute inset-0 ${result.color} ${overlayClass}`} />
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/40" />
            </>
          ) : (
            <div className={`absolute inset-0 flex items-center justify-center opacity-80 ${result.color} bg-gradient-to-br from-black`}>
              <ResultIcon size={120} className="text-white opacity-40 drop-shadow-xl" />
            </div>
          )}

          <div className={`absolute left-0 top-0 bottom-0 w-6 ${sideRailClass} border-r border-white/20 flex items-center justify-center`}>
            <span className="text-[8px] font-black text-white/70 -rotate-90 whitespace-nowrap tracking-[0.3em]">
              ROAST.CARDS • VERIFIED
            </span>
          </div>
          <div className="absolute top-4 right-[-30px] bg-yellow-400 text-black text-[9px] font-black px-8 py-1 rotate-45 border-y-2 border-black shadow-lg z-20">
            ROAST.CARDS
          </div>
        </div>

        <div className={`flex-1 p-4 flex flex-col relative ${contentOffsetClass}`}>
          <h1 className="text-3xl font-black uppercase leading-[0.9] tracking-tighter mb-4 text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            <span className="text-gray-500 mr-2 font-bold">Я —</span>
            {result.title}
          </h1>

          <div className="w-full bg-black border border-gray-600 p-0.5 mb-4">
            <div className={`w-full py-1 ${result.color} flex items-center justify-center overflow-hidden relative`}>
              <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_25%,rgba(255,255,255,0.15)_25%,rgba(255,255,255,0.15)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.15)_75%,rgba(255,255,255,0.15))] bg-[length:8px_8px] opacity-40"></div>
              <span className="relative z-10 text-[9px] font-black text-white uppercase tracking-[0.2em] drop-shadow-md px-2">
                {result.stats}
              </span>
            </div>
          </div>

          <div className="flex-1">
            <p className="font-mono text-xs leading-relaxed text-gray-300 border-l-2 border-gray-500 pl-3 italic">
              "{result.desc}"
            </p>
          </div>

          <div className="mt-1 pt-2 border-t border-dashed border-gray-600 flex justify-between items-start">
            <div>
              <p className="text-[8px] text-gray-500 uppercase font-mono">ДАТА: {today}</p>
              <p className="text-[8px] text-gray-500 uppercase font-mono">СТАТУС: ПРОЖАРЕН</p>
            </div>
            <div className="bg-white p-1.5 rounded-sm self-end">
              <img src="/assets/qrcode.png" alt="QR-код Roast.cards" className="h-10 w-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  }
);

ResultCard.displayName = "ResultCard";
