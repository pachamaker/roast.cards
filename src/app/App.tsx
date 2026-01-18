import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Eye, Flame, Globe, RefreshCw, Share2, User, Users } from "lucide-react";
import { domToPng, waitUntilLoad } from "modern-screenshot";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { QUESTIONS } from "../data/questions";
import { useQuizStore } from "../features/quiz/model/useQuizStore";
import { SwipeDeck } from "../features/quiz/ui/SwipeDeck";
import { ResultCard } from "../features/result/ui/ResultCard";
import { logEvent } from "../shared/lib/analytics";

const formatPeopleLabel = (count: number) => {
  const lastTwo = count % 100;
  if (lastTwo >= 11 && lastTwo <= 14) return "человек";
  const last = count % 10;
  if (last === 1) return "человек";
  if (last >= 2 && last <= 4) return "человека";
  return "человек";
};

const BrandLogo = () => (
  <div className="relative flex flex-col items-center group mb-6">
    <img
      src="/assets/splash_screen.webp"
      alt="ROAST.CARDS"
      className="w-[260px] max-w-full h-auto"
      loading="eager"
    />
  </div>
);

const IntroScreen = ({
  onStart,
  roastedTotal,
  lang,
  gender,
  onLangChange,
  onGenderChange
}: {
  onStart: () => void;
  roastedTotal: number | null;
  lang: "ru" | "en";
  gender: "male" | "female";
  onLangChange: (value: "ru" | "en") => void;
  onGenderChange: (value: "male" | "female") => void;
}) => {
  return (
    <motion.div
      className="flex flex-col items-center h-full text-center px-6 gap-6 pt-6 pb-28"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25 }}
    >
      <BrandLogo />

      {/* <div className="w-full max-w-sm space-y-6">
        <div className="flex bg-white border-[4px] border-black shadow-[5px_5px_0px_black] p-1">
          <button
            type="button"
            onClick={() => onLangChange("ru")}
            aria-pressed={lang === "ru"}
            className={`flex-1 py-2 font-black text-xs uppercase flex items-center justify-center gap-2 transition-all ${
              lang === "ru" ? "bg-black text-white" : "text-black hover:bg-gray-100"
            }`}
          >
            <Globe size={14} /> RU
          </button>
          <button
            type="button"
            onClick={() => onLangChange("en")}
            aria-pressed={lang === "en"}
            className={`flex-1 py-2 font-black text-xs uppercase flex items-center justify-center gap-2 transition-all ${
              lang === "en" ? "bg-black text-white" : "text-black hover:bg-gray-100"
            }`}
          >
            <Globe size={14} /> EN
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => onGenderChange("male")}
            aria-pressed={gender === "male"}
            className={`bg-white border-[4px] border-black p-5 shadow-[6px_6px_0px_black] active:translate-y-1 active:shadow-none transition-all flex flex-col items-center gap-2 ${
              gender === "male" ? "bg-blue-50 ring-4 ring-blue-400 ring-inset" : ""
            }`}
          >
            <User size={36} strokeWidth={3} className={gender === "male" ? "text-blue-600" : "opacity-40"} />
            <span className="font-black text-[10px] uppercase tracking-widest">МАЛЬЧИК</span>
          </button>
          <button
            type="button"
            onClick={() => onGenderChange("female")}
            aria-pressed={gender === "female"}
            className={`bg-white border-[4px] border-black p-5 shadow-[6px_6px_0px_black] active:translate-y-1 active:shadow-none transition-all flex flex-col items-center gap-2 ${
              gender === "female" ? "bg-pink-50 ring-4 ring-pink-400 ring-inset" : ""
            }`}
          >
            <Users size={36} strokeWidth={3} className={gender === "female" ? "text-pink-600" : "opacity-40"} />
            <span className="font-black text-[10px] uppercase tracking-widest">ДЕВОЧКА</span>
          </button>
        </div>
      </div> */}

      <div className="w-full max-w-sm bg-white border-[4px] border-black shadow-[8px_8px_0px_black] p-4 space-y-3 text-left">
        <div className="flex items-start gap-3">
          <div className="bg-green-500 p-1 border-2 border-black mt-0.5">
            <Check size={12} strokeWidth={4} className="text-white" />
          </div>
          <p className="text-[11px] font-black uppercase leading-tight">Отвечай честно (или нагло ври)</p>
        </div>
        <div className="flex items-start gap-3">
          <div className="bg-yellow-400 p-1 border-2 border-black mt-0.5">
            <Eye size={12} strokeWidth={4} className="text-black" />
          </div>
          <p className="text-[11px] font-black uppercase leading-tight">Получи собственную карточку</p>
        </div>
        <div className="flex items-start gap-3">
          <div className="bg-pink-500 p-1 border-2 border-black mt-0.5">
            <Share2 size={12} strokeWidth={4} className="text-white" />
          </div>
          <p className="text-[11px] font-black uppercase leading-tight">Покажи своим друзьям</p>
        </div>
        <div className="flex items-start gap-3">
          {roastedTotal !== null && (
            <p className="text-[11px] font-black uppercase leading-tight italic">* Уже прожарено {roastedTotal.toLocaleString("ru-RU")} {formatPeopleLabel(roastedTotal)}</p>
          )}
        </div>
      </div>

      <div className="w-full bottom-0 left-0 right-0 z-30 pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto w-full max-w-sm px-6 pb-5 pt-4">
          <button
            type="button"
            onClick={onStart}
            className="w-full py-5 font-black text-xl uppercase tracking-tighter flex items-center justify-center gap-3 border-[4px] border-black bg-[#FF00FF] text-white shadow-[8px_8px_0px_black] active:translate-y-2 active:shadow-none cursor-pointer transition-all"
          >
            ПОГНАЛИ <ArrowRight strokeWidth={4} />
          </button>
        </div>
      </div>

      <p className="text-[10px] leading-relaxed text-gray-600">
        18+ | Сервис носит исключительно развлекательный и сатирический характер. Все совпадения
        случайны. Результаты являются шуткой и не имеют целью оскорбить кого-либо, унизить честь и
        достоинство или разжечь вражду. Нажимая «Начать», вы подтверждаете, что вам есть 18 лет, и вы
        обладаете чувством юмора и самоиронией.
      </p>
    </motion.div>
  );
};

export const App = () => {
  const { currentIndex, loading, result, reset } = useQuizStore();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const exportRef = useRef<HTMLDivElement | null>(null);
  const lastResultId = useRef<string | null>(null);
  const [roastedTotal, setRoastedTotal] = useState<number | null>(null);
  const [lang, setLang] = useState<"ru" | "en">("ru");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [hasStarted, setHasStarted] = useState(false);
  const introLoggedRef = useRef(false);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const response = await fetch("https://api.counterapi.dev/v2/roastcads/roasted");
        if (!response.ok) {
          return;
        }
        const data = (await response.json()) as {
          data?: { up_count?: number };
          up_count?: number;
          count?: number;
        };
        console.log("roasted total response", data);
        const count = data?.data?.up_count ?? data?.up_count ?? data?.count;
        if (typeof count === "number") {
          console.log("roasted total", count);
          setRoastedTotal(count);
        }
      } catch (_error) {
        // Ignore counter errors to avoid breaking UI.
      }
    };

    fetchTotal();
  }, []);

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

    const fetchCounter = async () => {
      try {
        const response = await fetch("https://api.counterapi.dev/v2/roastcads/roasted/up");
        if (!response.ok) {
          return;
        }
        const data = (await response.json()) as {
          data?: { up_count?: number; count?: number };
          up_count?: number;
          count?: number;
        };
        console.log("roasted counter response", data);
        const count = data?.data?.up_count ?? data?.up_count ?? data?.data?.count ?? data?.count;
        if (typeof count === "number") {
          console.log("roasted count", count);
          setRoastedTotal(count);
        }
      } catch (_error) {
        // Ignore counter errors to avoid breaking result screen.
      }
    };

    fetchCounter();
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
    <div
      className={`h-[100dvh] bg-[#F0F0F0] flex flex-col font-sans relative text-black ${
        result ? "overflow-y-auto" : "overflow-hidden"
      }`}
    >
      {!result && (
        <>
          <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-pink-500 rounded-full blur-[100px] opacity-10"></div>
          <div
            className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-yellow-500 rounded-full blur-[100px] opacity-10"
          ></div>
        </>
      )}

      {hasStarted && (
        <>
          {/* <button
            type="button"
            onClick={() => {
              logEvent("click_on_logo");
              reset();
            }}
            aria-label="Сбросить тест"
            className="fixed left-4 top-4 z-30"
          >
            <img
              src="/assets/logo.webp"
              alt="ROAST.CARDS"
              className="w-[220px] max-w-full h-auto"
              loading="eager"
            />
          </button> */}
          {/* <header className="p-4 flex justify-end items-center z-20">
            {!result && (
              <div className="font-mono text-sm font-bold bg-white border-[3px] border-black px-3 py-1 shadow-[3px_3px_0px_black]">
                {Math.min(currentIndex + 1, QUESTIONS.length)}/{QUESTIONS.length}
              </div>
            )}
          </header> */}
        </>
      )}

      <main className="flex-1 flex flex-col items-center justify-center relative w-full px-4 pb-12">
        <AnimatePresence mode="wait">
          {!hasStarted && (
            <IntroScreen
              onStart={() => {
                logEvent("quiz_start");
                setHasStarted(true);
              }}
              roastedTotal={roastedTotal}
              lang={lang}
              gender={gender}
              onLangChange={setLang}
              onGenderChange={setGender}
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
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center w-full pb-28 pt-5"
            >
              <ResultCard ref={cardRef} result={result} />
            </motion.div>

            <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#F0F0F0] pb-[env(safe-area-inset-bottom)]">
              <div className="mx-auto w-full max-w-[360px] px-4 pb-4 pt-3">
                <div className="flex gap-4">
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
                    <Share2 size={18} /> {isSharing ? "Готовим..." : "ПОДЕЛИТЬСЯ"}
                  </button>
                </div>
              </div>
            </div>
          </>
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
