import { create } from "zustand";
import type { Archetype } from "../../../data/archetypes";
import type { AnswerValue, PartialAnswers, QuestionId } from "./types";

interface QuizState {
  currentIndex: number;
  answers: PartialAnswers;
  loading: boolean;
  result: Archetype | null;
  analysisToken: number;
  setAnswer: (id: QuestionId, value: AnswerValue) => void;
  setCurrentIndex: (index: number) => void;
  setLoading: (loading: boolean) => void;
  setResult: (result: Archetype | null) => void;
  setAnalysisToken: (token: number) => void;
  reset: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  currentIndex: 0,
  answers: {},
  loading: false,
  result: null,
  analysisToken: 0,
  setAnswer: (id, value) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [id]: value
      }
    })),
  setCurrentIndex: (index) => set({ currentIndex: index }),
  setLoading: (loading) => set({ loading }),
  setResult: (result) => set({ result }),
  setAnalysisToken: (token) => set({ analysisToken: token }),
  reset: () => set({ currentIndex: 0, answers: {}, loading: false, result: null, analysisToken: 0 })
}));
