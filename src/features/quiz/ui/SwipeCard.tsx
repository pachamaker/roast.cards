import { motion, useMotionValue, useTransform, type PanInfo } from "framer-motion";
import type { Question, SwipeDirection } from "../model/types";
import { QUESTIONS } from "../../../data/questions";

interface Props {
  data: Question;
  index: number;
  onSwipe: (direction: SwipeDirection, id: Question["id"], isSwipe: boolean) => void;
  onInteract?: () => void;
}

export const SwipeCard = ({ data, index, onSwipe, onInteract }: Props) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0.4, 1, 1, 1, 0.4]);

  const nopeOpacity = useTransform(x, [-150, -50], [1, 0]);
  const likeOpacity = useTransform(x, [50, 150], [0, 1]);
  const mehOpacity = useTransform(y, [-150, -50, 50, 150], [1, 0, 0, 1]);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) onSwipe("right", data.id, true);
    else if (info.offset.x < -100) onSwipe("left", data.id, true);
    else if (info.offset.y < -100 || info.offset.y > 100) onSwipe("up", data.id, true);
  };

  return (
    <motion.div
      style={{ x, y, rotate, opacity }}
      drag
      dragConstraints={{ left: -140, right: 140, top: -160, bottom: 160 }}
      dragElastic={0.4}
      onDragStart={onInteract}
      onDragEnd={handleDragEnd}
      className="absolute -top-3 left-0 w-full h-[52vh] sm:h-[60vh] sm:top-0 bg-white border-[3px] border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center p-5 sm:p-6 touch-none cursor-grab active:cursor-grabbing z-10 rounded-sm"
    >
      <motion.div
        style={{ opacity: nopeOpacity }}
        className="absolute top-8 right-8 border-[3px] border-black bg-red-500 text-white font-black text-2xl px-4 py-2 rotate-12 z-20"
      >
        НЕТ
      </motion.div>
      <motion.div
        style={{ opacity: likeOpacity }}
        className="absolute top-8 left-8 border-[3px] border-black bg-green-500 text-white font-black text-2xl px-4 py-2 -rotate-12 z-20"
      >
        ДА
      </motion.div>
      <motion.div
        style={{ opacity: mehOpacity }}
        className="absolute bottom-20 border-[3px] border-black bg-yellow-400 text-black font-black text-2xl px-4 py-2 z-20"
      >
        50/50
      </motion.div>

      <div className="text-7xl sm:text-8xl mb-5 sm:mb-6 filter drop-shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
        {data.icon}
      </div>
      <h2 className="text-xl font-black uppercase tracking-tighter bg-black text-white px-3 py-1 mb-6 rotate-1">
        {data.label}
      </h2>
      <p className="text-2xl font-black text-center text-black w-full leading-none">{data.q}</p>

      <div className="absolute bottom-4 right-4 font-mono text-[10px] font-bold bg-black text-white px-2 py-0.5">
        {index + 1} / {QUESTIONS.length}
      </div>
    </motion.div>
  );
};
