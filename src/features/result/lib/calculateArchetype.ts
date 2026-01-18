import { ARCHETYPES } from "../../../data/archetypes";
import type { Answers } from "../../quiz/model/types";

export const calculateArchetype = (s: Answers) => {
  if (Object.values(s).every((v) => v >= 90)) return ARCHETYPES.son_of_moms_friend;
  if (Object.values(s).every((v) => v <= 10)) return ARCHETYPES.survival_error;

  if (s.money >= 90 && s.time <= 30) return ARCHETYPES.galley_slave;
  if (s.money >= 90 && s.intellect <= 40) return ARCHETYPES.major_nepo;

  if (s.money <= 20 && s.energy >= 80 && s.intellect <= 40) return ARCHETYPES.crypto_hamster;
  if (s.intellect >= 80 && s.energy >= 80 && s.money <= 20) return ARCHETYPES.startup_hobo;
  if (s.freedom >= 80 && s.nerves <= 40) return ARCHETYPES.relocant;
  if (s.intellect <= 30 && s.energy >= 70 && s.social >= 60) return ARCHETYPES.wish_master;
  if (s.intellect >= 80 && s.social >= 70 && s.money <= 40) return ARCHETYPES.taxi_philosopher;
  if (s.money <= 40 && s.time <= 40 && s.nerves <= 40) return ARCHETYPES.wb_addict;
  if (s.social >= 90 && s.nerves <= 30) return ARCHETYPES.dating_veteran;
  if (s.health >= 90 && s.intellect >= 70 && s.freedom <= 40) return ARCHETYPES.biohacker;
  if (s.intellect >= 90 && s.social <= 20 && s.nerves >= 80) return ARCHETYPES.gaslighter;

  if (s.money >= 60 && s.nerves <= 40 && s.energy >= 60) return ARCHETYPES.hustler_scheme;
  if (s.intellect >= 90 && s.money <= 30) return ARCHETYPES.sad_genius;
  if (s.health >= 80 && s.intellect <= 50) return ARCHETYPES.gym_rat;
  if (s.freedom >= 80 && s.money <= 50) return ARCHETYPES.bali_bum;
  if (s.energy >= 90 && s.time <= 20) return ARCHETYPES.grindset_psycho;
  if (s.social >= 80 && s.nerves <= 50) return ARCHETYPES.insta_fake;
  if (s.nerves <= 30 && s.time >= 70) return ARCHETYPES.doom_scroller;
  if (s.nerves <= 20 && s.intellect >= 60) return ARCHETYPES.anxiety_prime;
  if (s.social <= 20 && s.time >= 60) return ARCHETYPES.hikka;
  if (s.energy >= 70 && s.money <= 30) return ARCHETYPES.busy_broke;
  if (s.intellect >= 80 && s.social <= 30) return ARCHETYPES.bore_nerd;
  if (s.time <= 40 && s.health <= 40) return ARCHETYPES.weekend_alcoholic;
  if (s.health >= 70 && s.money <= 30 && s.social >= 60) return ARCHETYPES.moms_handsome;
  if (s.energy >= 80 && s.intellect <= 30) return ARCHETYPES.clumsy;
  if (s.freedom <= 20 && s.money <= 40) return ARCHETYPES.credit_slave;

  return ARCHETYPES.normie;
};
