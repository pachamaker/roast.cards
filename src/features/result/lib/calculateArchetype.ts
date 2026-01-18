import { ARCHETYPES } from "../../../data/archetypes";
import type { ArchetypeMatrix } from "../../../data/archetypes";
import type { Answers } from "../../quiz/model/types";

const PARAM_WEIGHTS: Record<keyof ArchetypeMatrix, number> = {
  // УРОВЕНЬ 1: БАЗОВЫЕ ВОЗМОЖНОСТИ (Определяют "стадию жизни")
  money: 1.8,     // Самый сильный фильтр
  time: 1.6,      
  energy: 1.5,    

  // УРОВЕНЬ 2: СОЦИАЛЬНЫЙ СТАТУС И РОЛЬ
  freedom: 1.4,   
  intellect: 1.3, 
  social: 1.1,    

  // УРОВЕНЬ 3: ПОКАЗАТЕЛИ УСПЕШНОСТИ / ЦЕНА (Финальные штрихи)
  health: 1.0,    
  nerves: 1.0    
};

const BASE_KEYS: Array<keyof ArchetypeMatrix> = ["money", "time", "energy"];
const BASE_FACTOR = 0.6;
const SUPER_FACTOR = 0.4;

const calculateWeightedDistance = (
  userStats: Answers,
  archetypeMatrix: ArchetypeMatrix,
  keys?: Array<keyof ArchetypeMatrix>
) => {
  let distance = 0;
  (keys ?? (Object.keys(archetypeMatrix) as Array<keyof ArchetypeMatrix>)).forEach((key) => {
    const value = userStats[key] ?? 0;
    const weight = PARAM_WEIGHTS[key] ?? 1;
    distance += weight * Math.pow(value - archetypeMatrix[key], 2);
  });
  return Math.sqrt(distance);
};

export const calculateArchetype = (userStats: Answers) => {
  let minDistance = Infinity;
  let bestArchetype = ARCHETYPES.normie;

  Object.values(ARCHETYPES).forEach((archetype) => {
    const baseDistance = calculateWeightedDistance(userStats, archetype.matrix, BASE_KEYS);
    const superDistance = calculateWeightedDistance(userStats, archetype.matrix);
    const totalDistance = baseDistance * BASE_FACTOR + superDistance * SUPER_FACTOR;
    if (totalDistance < minDistance) {
      minDistance = totalDistance;
      bestArchetype = archetype;
    }
  });

  return bestArchetype;
};
