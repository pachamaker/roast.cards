export type QuestionId =
  | "time"
  | "money"
  | "energy"
  | "health"
  | "nerves"
  | "intellect"
  | "social"
  | "freedom";

export interface Question {
  id: QuestionId;
  label: string;
  icon: string;
  q: string;
}

export type AnswerValue = 0 | 50 | 100;

export type Answers = Record<QuestionId, AnswerValue>;
export type PartialAnswers = Partial<Answers>;

export type SwipeDirection = "left" | "right" | "up";
