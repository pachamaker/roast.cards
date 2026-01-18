import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Check, Hand, X } from "lucide-react";
import { QUESTIONS } from "../../../data/questions";
import { calculateArchetype } from "../../result/lib/calculateArchetype";
import { useQuizStore } from "../model/useQuizStore";
import type { Answers, AnswerValue, QuestionId, SwipeDirection } from "../model/types";
import { logEvent } from "../../../shared/lib/analytics";
import { SwipeCard } from "./SwipeCard";

const SWIPE_DELAY_MS = 1500;

export const SwipeDeck = () => {
  const {
    currentIndex,
    answers,
    setAnswer,
    setCurrentIndex,
    setLoading,
    setResult,
    setAnalysisToken,
    result,
    loading
  } = useQuizStore();

  const hasStartedRef = useRef(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const isFirstQuestionVisible = currentIndex === 0 && !loading && !result;
    if (!isFirstQuestionVisible) {
      return;
    }

    const views = Number(window.localStorage.getItem("roast_onboarding_views") ?? "0");
    if (views >= 2) {
      return;
    }

    setShowHint(true);
    window.localStorage.setItem("roast_onboarding_views", String(views + 1));
  }, [currentIndex, loading, result]);

  const dismissHint = () => {
    if (showHint) {
      setShowHint(false);
    }
  };
  useEffect(() => {
    const isFirstQuestionVisible = currentIndex === 0 && !loading && !result;

    if (isFirstQuestionVisible && !hasStartedRef.current) {
      hasStartedRef.current = true;
      logEvent("quiz_started");
      return;
    }

    if (!isFirstQuestionVisible && hasStartedRef.current) {
      hasStartedRef.current = false;
    }
  }, [currentIndex, loading, result]);

  const handleSwipe = (direction: SwipeDirection, id: QuestionId, isSwipe: boolean) => {
    dismissHint();
    const value: AnswerValue = direction === "right" ? 100 : direction === "up" ? 50 : 0;
    const newAnswers = { ...answers, [id]: value };
    const answer = direction === "right" ? "yes" : direction === "up" ? "maybe" : "no";

    logEvent("quiz_answer", {
      card_number: currentIndex + 1,
      answer,
      swipe: isSwipe
    });

    navigator.vibrate?.(12);

    setAnswer(id, value);

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      return;
    }

    const token = Date.now();
    setAnalysisToken(token);
    setLoading(true);
    const archetype = calculateArchetype(newAnswers as Answers);

    window.setTimeout(() => {
      if (useQuizStore.getState().analysisToken !== token) return;
      setResult(archetype);
      setLoading(false);
    }, SWIPE_DELAY_MS);
  };

  if (loading || result) {
    return null;
  }

  const currentQuestion = QUESTIONS[currentIndex];

  return (
    <div className="relative w-full max-w-sm h-[52vh] sm:h-[60vh]">
      <AnimatePresence>
        {showHint && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative">
              <motion.div
                animate={{
                  x: [0, 80, 0, -80, 0, 0],
                  y: [0, 0, 0, 0, 0, -80, 0],
                  rotate: [0, 12, 0, -12, 0, 0],
                  opacity: [1, 0.85, 1, 0.85, 1, 0]
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 0.4
                }}
              >
                <div className="bg-white/90 p-3 rounded-full shadow-[0_0_18px_rgba(255,255,255,0.5)] border-2 border-black">
                  <Hand size={56} className="text-black fill-black/10" />
                </div>
              </motion.div>
              <motion.div
                className="absolute top-1/2 left-24 bg-green-500 text-white font-black px-2 py-1 rotate-12 rounded border-2 border-black whitespace-nowrap"
                animate={{ opacity: [0, 1, 0, 0, 0, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 0.4 }}
              >
                ДА
              </motion.div>
              <motion.div
                className="absolute top-1/2 right-24 bg-red-500 text-white font-black px-2 py-1 -rotate-12 rounded border-2 border-black whitespace-nowrap"
                animate={{ opacity: [0, 0, 0, 1, 0, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 0.4 }}
              >
                НЕТ
              </motion.div>
              <motion.div
                className="absolute -top-16 left-2 bg-yellow-400 text-black font-black px-2 py-1 rounded border-2 border-black whitespace-nowrap"
                animate={{ opacity: [0, 0, 0, 0, 0, 1, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 0.4 }}
              >
                50/50
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {QUESTIONS.map((q, i) => {
          if (i < currentIndex) return null;
          if (i > currentIndex + 1) return null;
          return (
            <div
              key={q.id}
              className={`absolute inset-0 transition-all duration-300 ${
                i > currentIndex ? "scale-[0.95] translate-y-4 opacity-0 z-0" : "z-10"
              }`}
            >
              {i === currentIndex ? (
                <SwipeCard data={q} onSwipe={handleSwipe} index={i} onInteract={dismissHint} />
              ) : (
                <div className="w-full h-full bg-white border-[4px] border-black flex items-center justify-center">
                  <span className="font-black text-4xl opacity-10">ГОТОВЬСЯ...</span>
                </div>
              )}
            </div>
          );
        })}
      </AnimatePresence>

      <div className="absolute -bottom-20 w-full grid grid-cols-3 gap-6 px-4 sm:-bottom-24 lg:-bottom-32">
        <button
          type="button"
          onClick={() => {
            dismissHint();
            currentQuestion && handleSwipe("left", currentQuestion.id, false);
          }}
          aria-label="Нет"
          className="bg-white border-[3px] border-black shadow-[4px_4px_0px_black] py-4 flex items-center justify-center active:shadow-none active:translate-y-1 transition-all group rounded-full hover:bg-red-50"
        >
          <X size={32} strokeWidth={4} className="text-red-500 group-hover:scale-110 transition-transform" />
        </button>
        <button
          type="button"
          onClick={() => {
            dismissHint();
            currentQuestion && handleSwipe("up", currentQuestion.id, false);
          }}
          aria-label="50/50"
          className="bg-white border-[3px] border-black shadow-[4px_4px_0px_black] py-4 flex items-center justify-center active:shadow-none active:translate-y-1 transition-all group rounded-full hover:bg-yellow-50"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-yellow-500 group-hover:scale-110 transition-transform"
            aria-hidden="true"
          >
            <path d="M12 3v10" />
            <path d="M7 8h10" />
            <path d="M7 20h10" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => {
            dismissHint();
            currentQuestion && handleSwipe("right", currentQuestion.id, false);
          }}
          aria-label="Да"
          className="bg-white border-[3px] border-black shadow-[4px_4px_0px_black] py-4 flex items-center justify-center active:shadow-none active:translate-y-1 transition-all group rounded-full hover:bg-green-50"
        >
          <Check size={32} strokeWidth={4} className="text-green-600 group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
};
