import { domToBlob, waitUntilLoad } from "modern-screenshot";
import { useEffect, useMemo, useRef, useState } from "react";
import { ARCHETYPES } from "../../../data/archetypes";
import { ResultCard } from "./ResultCard";

const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
const loadFonts = async () => {
  if (!document.fonts?.load) {
    await document.fonts?.ready;
    return;
  }

  await Promise.all([
    document.fonts.load('400 12px "Space Grotesk"'),
    document.fonts.load('600 12px "Space Grotesk"'),
    document.fonts.load('700 12px "Space Grotesk"'),
    document.fonts.load('800 12px "Space Grotesk"'),
    document.fonts.load('400 12px "JetBrains Mono"'),
    document.fonts.load('600 12px "JetBrains Mono"'),
    document.fonts.load('700 12px "JetBrains Mono"')
  ]);
  await document.fonts.ready;
};

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

export const ExportPage = () => {
  const archetypes = useMemo(() => Object.values(ARCHETYPES), []);
  const [current, setCurrent] = useState(archetypes[0] ?? null);
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const existing = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    const previousContent = existing?.getAttribute("content");
    const meta = existing ?? document.createElement("meta");
    const created = !existing;

    meta.setAttribute("name", "robots");
    meta.setAttribute("content", "noindex, nofollow");

    if (created) {
      document.head.appendChild(meta);
    }

    return () => {
      if (created) {
        meta.remove();
        return;
      }

      if (previousContent == null) {
        meta.removeAttribute("content");
      } else {
        meta.setAttribute("content", previousContent);
      }
    };
  }, []);

  const handleExport = async () => {
    if (!archetypes.length || isRunning) {
      return;
    }

    setIsRunning(true);
    setProgress(0);

    try {
      await loadFonts();

      for (let index = 0; index < archetypes.length; index += 1) {
        const archetype = archetypes[index];
        setCurrent(archetype);
        setProgress(index + 1);

        await nextFrame();
        await nextFrame();

        if (!cardRef.current) {
          continue;
        }

        await waitUntilLoad(cardRef.current);
        await nextFrame();

        const blob = await domToBlob(cardRef.current, {
          scale: 2,
          backgroundColor: "#1a1a1a",
          type: "image/png",
          quality: 0.92,
          features: {
            removeControlCharacter: false
          }
        });
        if (!blob) {
          continue;
        }

        downloadBlob(blob, `${archetype.id}.png`);
        await new Promise((resolve) => setTimeout(resolve, 250));
      }
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#0f0f0f] text-white flex flex-col items-center justify-center gap-6 p-6">
      <style>{`
        [data-export-card="true"] * {
          animation: none !important;
          transition: none !important;
        }
      `}</style>
      <div className="w-full max-w-md border-2 border-white bg-black/80 p-4 shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
        <h1 className="text-xl font-black uppercase tracking-tight">Экспорт карточек</h1>
        <p className="mt-2 text-sm text-white/80">
          Нажми кнопку и разреши множественную загрузку. Файлы сохранятся как PNG по id архетипа.
        </p>
        <button
          type="button"
          onClick={handleExport}
          disabled={isRunning}
          className="mt-4 w-full border-2 border-white bg-yellow-400 text-black font-black uppercase py-2 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isRunning ? `Готовим... ${progress}/${archetypes.length}` : "Сгенерировать все"}
        </button>
      </div>

      <div data-export-card="true" className="w-[360px]">
        {current && <ResultCard ref={cardRef} result={current} exportMode expandHeight />}
      </div>
    </div>
  );
};
