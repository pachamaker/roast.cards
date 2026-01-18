import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Check, Flame, RefreshCw, Rocket, ScanLine, Share2 } from "lucide-react";
import { domToPng, waitUntilLoad } from "modern-screenshot";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { QUESTIONS } from "../data/questions";
import { useQuizStore } from "../features/quiz/model/useQuizStore";
import { SwipeDeck } from "../features/quiz/ui/SwipeDeck";
import { ResultCard } from "../features/result/ui/ResultCard";
import { logEvent } from "../shared/lib/analytics";

const IntroScreen = ({ onStart }: { onStart: () => void }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full text-center px-6 gap-6"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25 }}
    >
      <div className="w-full max-w-sm">
        <div className="rounded-[32px] px-8 py-10">
          <motion.div
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center"
            animate={{ y: [0, -5, 0], opacity: [1, 0.9, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Flame size={44} className="text-black" />
          </motion.div>
          <div className="space-y-2 relative z-10 text-center">
            <h1 className="text-5xl font-black italic tracking-tighter drop-shadow-sm">ROAST.CARDS</h1>
            <div className="transform -rotate-2"></div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-sm bg-white border-[3px] border-black p-4 shadow-[6px_6px_0px_rgba(0,0,0,0.18)] text-left space-y-3">
        <div className="flex items-center gap-2 font-black text-lg uppercase">
          <AlertTriangle size={20} className="text-black" />
          <span>Инструкция:</span>
        </div>
        <div className="h-[2px] w-full bg-black" />
        <div className="space-y-3 font-mono text-sm text-black">
          <p className="flex items-center gap-2">
            <Check size={18} className="text-green-600" />
            Отвечай честно (или ври)
          </p>
          <p className="flex items-center gap-2">
            <ScanLine size={18} className="text-blue-600" />
            Узнай, кто ты
          </p>
          <p className="flex items-center gap-2">
            <Share2 size={18} className="text-pink-500" />
            Покажи себя другим
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="w-full max-w-sm bg-[#FF00FF] text-white border-[3px] border-black shadow-[4px_4px_0px_black] py-4 font-black text-lg uppercase hover:translate-y-[2px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2"
      >
        НАЧАТЬ <Rocket size={20} />
      </button>
    </motion.div>
  );
};

export const App = () => {
  const { currentIndex, loading, result, reset } = useQuizStore();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const exportRef = useRef<HTMLDivElement | null>(null);
  const lastResultId = useRef<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const introLoggedRef = useRef(false);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    if (!result?.image) {
      return;
    }

    const pngImage = result.image.replace(/\.webp$/i, ".png");
    const preload = new Image();
    preload.src = pngImage;
  }, [result?.image]);

  useEffect(() => {
    if (hasStarted || introLoggedRef.current) {
      return;
    }

    introLoggedRef.current = true;
    logEvent("intro");
  }, [hasStarted]);

  useEffect(() => {
    if (!result) {
      lastResultId.current = null;
      return;
    }

    if (lastResultId.current === result.id) {
      return;
    }

    lastResultId.current = result.id;
    logEvent("result_page", {
      title: `Я — ${result.title}`,
      id: result.id
    });
  }, [result]);

  const handleShare = async () => {
    const target = exportRef.current ?? cardRef.current;
    if (!target || isSharing) {
      return;
    }

    setIsSharing(true);

    try {
      if (document.fonts?.load) {
        await Promise.all([
          document.fonts.load('12px "Space Grotesk"'),
          document.fonts.load('12px "JetBrains Mono"')
        ]);
      }
      await document.fonts?.ready;
      const scale = Math.min(2, window.devicePixelRatio || 1);
      const stableStyles = document.createElement("style");
      stableStyles.setAttribute("data-export-styles", "true");
      stableStyles.textContent = `
        [data-export-card="true"] * {
          animation: none !important;
          transition: none !important;
        }
      `;
      document.head.appendChild(stableStyles);
      let blob: Blob | null = null;
      const sharePng = result?.image ? result.image.replace(/\.webp$/i, ".png") : null;
      if (sharePng) {
        try {
          const response = await fetch(sharePng, { cache: "force-cache" });
          if (response.ok) {
            blob = await response.blob();
          }
        } catch (_error) {
          // Fallback to DOM render.
        }
      }

      if (!blob) {
        await waitUntilLoad(target);
        const dataUrl = await domToPng(target, {
          scale,
          backgroundColor: "#1a1a1a",
          features: {
            removeControlCharacter: false
          }
        });
        blob = await fetch(dataUrl).then((response) => response.blob());
      }

      if (!blob) {
        throw new Error("Не удалось создать изображение");
      }

      const file = new File([blob], "roast.cards.png", { type: blob.type });

      if (navigator.clipboard?.write && window.ClipboardItem) {
        try {
          await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
          window.alert("Карточка скопирована. Можно вставлять в сторис.");
          return;
        } catch (_error) {
          // Fallback to share/download when clipboard isn't доступен.
        }
      }

      if (navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: "ROAST.cards", text: "Мой архетип" });
          return;
        } catch (_error) {
          // Fallback to download.
        }
      }

      const url = URL.createObjectURL(blob);
      try {
        const link = document.createElement("a");
        link.href = url;
        link.download = "roastmy-life.png";
        link.click();
        window.alert("Файл скачан. Можно загрузить в сторис.");
      } finally {
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      window.alert("Не удалось подготовить изображение. Попробуй ещё раз.");
    } finally {
      document.querySelector('[data-export-styles="true"]')?.remove();
      setIsSharing(false);
    }
  };

  return (
    <div className="h-[100dvh] bg-[#F0F0F0] overflow-hidden flex flex-col font-sans relative text-black">
      {!result && (
        <>
          <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-pink-500 rounded-full blur-[100px] opacity-10"></div>
          <div
            className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-yellow-500 rounded-full blur-[100px] opacity-10"
          ></div>
        </>
      )}

      {hasStarted && (
        <header className="p-4 flex justify-between items-center z-20">
          <button
            type="button"
            onClick={() => {
              logEvent("click_on_logo");
              reset();
            }}
            aria-label="Сбросить тест"
            className="group flex items-center gap-2 bg-black text-white px-4 py-2 border-[3px] border-transparent shadow-[4px_4px_0px_#FF00FF] cursor-pointer hover:scale-105 transition-transform rotate-2 hover:rotate-0"
          >
            <Flame size={24} className="text-yellow-400 fill-yellow-400" />
            <span className="font-black text-xl italic tracking-tighter">ROAST.CARDS</span>
          </button>
          {!result && (
            <div className="font-mono text-sm font-bold bg-white border-[3px] border-black px-3 py-1 shadow-[3px_3px_0px_black]">
              {Math.min(currentIndex + 1, QUESTIONS.length)}/{QUESTIONS.length}
            </div>
          )}
        </header>
      )}

      <main className="flex-1 flex flex-col items-center justify-center relative w-full px-4 pb-12">
        <AnimatePresence mode="wait">
          {!hasStarted && (
            <IntroScreen
              onStart={() => {
                setHasStarted(true);
              }}
            />
          )}
        </AnimatePresence>

        {hasStarted && <SwipeDeck />}

        {hasStarted && loading && (
          <div className="flex flex-col items-center justify-center">
            <RefreshCw size={48} className="animate-spin mb-4 text-black" />
            <p className="font-mono font-bold text-lg animate-pulse">АНАЛИЗИРУЕМ ТВОИ ВЫБОРЫ...</p>
            <p className="text-xs font-mono text-gray-500 mt-2">ТИХО СУДИМ ТЕБЯ</p>
          </div>
        )}

        {hasStarted && result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center w-full"
          >
            <ResultCard ref={cardRef} result={result} />

            <div className="mt-8 flex gap-4 w-full max-w-[360px]">
              <button
                type="button"
                onClick={() => {
                  logEvent("retry_quiz");
                  reset();
                }}
                aria-label="Начать заново"
                className="flex-1 bg-white border-[3px] border-black shadow-[4px_4px_0px_black] py-3 font-black uppercase hover:translate-y-[2px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw size={18} /> Заново
              </button>
              <button
                type="button"
                onClick={() => {
                  logEvent("social_sharing");
                  handleShare();
                }}
                aria-label="Сохранить карточку"
                aria-busy={isSharing}
                disabled={isSharing}
                className="flex-1 bg-[#FF00FF] text-white border-[3px] border-black shadow-[4px_4px_0px_black] py-3 font-black uppercase hover:translate-y-[2px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Share2 size={18} /> {isSharing ? "Готовим..." : "В СТОРИС"}
              </button>
            </div>
          </motion.div>
        )}
      </main>
      {result &&
        typeof document !== "undefined" &&
        createPortal(
          <div data-export-card="true" className="fixed left-[-10000px] top-0 w-[360px] pointer-events-none">
            <ResultCard ref={exportRef} result={result} exportMode />
          </div>,
          document.body
        )}
    </div>
  );
};
