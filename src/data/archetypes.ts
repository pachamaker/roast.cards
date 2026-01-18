import {
  Activity,
  AlertTriangle,
  Barcode,
  BookOpen,
  Briefcase,
  Crown,
  Dumbbell,
  Fingerprint,
  Frown,
  Ghost,
  HeartCrack,
  Lock,
  Meh,
  MessageCircle,
  Plane,
  RefreshCw,
  Rocket,
  ScanLine,
  ShoppingBag,
  Sparkles,
  TrendingDown,
  User,
  Zap
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ArchetypeId =
  | "son_of_moms_friend"
  | "survival_error"
  | "galley_slave"
  | "major_nepo"
  | "hustler_scheme"
  | "crypto_hamster"
  | "startup_hobo"
  | "credit_slave"
  | "busy_broke"
  | "grindset_psycho"
  | "gym_rat"
  | "bali_bum"
  | "relocant"
  | "wish_master"
  | "biohacker"
  | "wb_addict"
  | "sad_genius"
  | "taxi_philosopher"
  | "insta_fake"
  | "dating_veteran"
  | "doom_scroller"
  | "gaslighter"
  | "anxiety_prime"
  | "hikka"
  | "bore_nerd"
  | "weekend_alcoholic"
  | "moms_handsome"
  | "clumsy"
  | "normie";

export interface Archetype {
  id: ArchetypeId;
  title: string;
  stats: string;
  desc: string;
  rarity: string;
  color: string;
  icon: LucideIcon;
  image?: string;
}

export const ARCHETYPES: Record<ArchetypeId, Archetype> = {
  son_of_moms_friend: {
    id: "son_of_moms_friend",
    title: "СЫН МАМИНОЙ ПОДРУГИ",
    stats: "ЧСВ: 100% | ДУША: 404",
    desc: "Ты — галлюцинация. У тебя всё настолько идеально, что хочется блевать. Тебя никто не любит, тебе просто завидуют и ждут, когда ты споткнешься.",
    rarity: "ЛЕГЕНДА",
    color: "bg-yellow-500",
    icon: Crown,
    image: "/assets/archetypes/son_of_moms_friend.webp"
  },
  survival_error: {
    id: "survival_error",
    title: "БИОЛОГИЧЕСКИЙ ТУПИК",
    stats: "ПОЛЬЗА: 0% | ПОТРЕБЛЕНИЕ: 100%",
    desc: "Эволюция на тебе не просто отдохнула, она ушла в запой. Ты потребляешь кислород, не давая миру ничего взамен. Твой вклад в историю — углеродный след.",
    rarity: "МУСОР",
    color: "bg-gray-600",
    icon: Ghost,
    image: "/assets/archetypes/survival_error.webp"
  },
  galley_slave: {
    id: "galley_slave",
    title: "КОРПОРАТИВНЫЙ РАБ",
    stats: "ЗП: ЕСТЬ | ЖИЗНЬ: НЕТ",
    desc: "Твой босс купил себе новую дачу, пока ты закрывал дедлайн в выходные. Ты продал свою молодость за ДМС и бесплатное печенье в офисе.",
    rarity: "ЭПИК",
    color: "bg-emerald-600",
    icon: Briefcase,
    image: "/assets/archetypes/galley_slave.webp"
  },
  major_nepo: {
    id: "major_nepo",
    title: "ПАПИНА КАРТА",
    stats: "УДАЧА: 100 | ЛИЧНОСТЬ: 0",
    desc: "Если забрать у тебя деньги родителей, ты умрешь от голода перед полным холодильником. Ты не личность, ты — дорогой аксессуар своей семьи.",
    rarity: "РЕДКИЙ",
    color: "bg-purple-500",
    icon: Crown,
    image: "/assets/archetypes/major_nepo.webp"
  },
  hustler_scheme: {
    id: "hustler_scheme",
    title: "СКАМЕР-НЕУДАЧНИК",
    stats: "ПОНТЫ: МАКС | СОВЕСТЬ: МИН",
    desc: "Крутишь схемы, мутишь темы, но всё равно стреляешь сотку до зарплаты. Твой 'успешный бизнес' — это перепродажа воздуха лохам.",
    rarity: "РЕДКИЙ",
    color: "bg-slate-800",
    icon: Zap,
    image: "/assets/archetypes/hustler_scheme.webp"
  },
  crypto_hamster: {
    id: "crypto_hamster",
    title: "ФИНАНСОВЫЙ ДОНОР",
    stats: "ПОРТФЕЛЬ: -99% | ИНТЕЛЛЕКТ: <50",
    desc: "Ты кормовая база для китов. Покупаешь на хаях, прокатываешься на хуях. Твой инвестиционный портфель вызывает жалость даже у бомжей.",
    rarity: "ОБЫЧНЫЙ",
    color: "bg-yellow-600",
    icon: TrendingDown,
    image: "/assets/archetypes/crypto_hamster.webp"
  },
  startup_hobo: {
    id: "startup_hobo",
    title: "СЕО ПУСТОТЫ",
    stats: "ЭГО: ИЛОН МАСК | БЮДЖЕТ: ДОШИК",
    desc: "У тебя 'стартап', который изменит мир, но ты не можешь оплатить коммуналку. Ты безработный с красивым названием в ЛинкедИн.",
    rarity: "РЕДКИЙ",
    color: "bg-indigo-500",
    icon: Rocket,
    image: "/assets/archetypes/startup_hobo.webp"
  },
  credit_slave: {
    id: "credit_slave",
    title: "ИПОТЕЧНЫЙ КРЕПОСТНОЙ",
    stats: "ВЛАДЕЛЕЦ: БАНК",
    desc: "Ты существуешь только для того, чтобы банк мог начислять проценты. Твоя 'собственная' квартира станет твоей, когда ты будешь уже стар и никому не нужен.",
    rarity: "ЭПИК",
    color: "bg-red-800",
    icon: Barcode,
    image: "/assets/archetypes/credit_slave.webp"
  },
  busy_broke: {
    id: "busy_broke",
    title: "ГЕНЕРАТОР ШУМА",
    stats: "СУЕТА: 100% | СМЫСЛ: 0%",
    desc: "Ты постоянно занят, но результат твоей жизни — ноль. Ты как белка в колесе, только белка хотя бы выглядит мило, а ты просто потный и дерганый.",
    rarity: "ОБЫЧНЫЙ",
    color: "bg-stone-600",
    icon: RefreshCw,
    image: "/assets/archetypes/busy_broke.webp"
  },
  grindset_psycho: {
    id: "grindset_psycho",
    title: "БИОРОБОТ",
    stats: "КПД: 146% | ВЫГОРАНИЕ: ЗАВТРА",
    desc: "Ты оптимизировал свою жизнь так, что в ней не осталось жизни. Ты умрешь самым продуктивным трупом на кладбище. Поздравляю.",
    rarity: "ЭПИК",
    color: "bg-red-600",
    icon: Zap,
    image: "/assets/archetypes/grindset_psycho.webp"
  },
  gym_rat: {
    id: "gym_rat",
    title: "ПРОТЕИНОВЫЙ МОЗГ",
    stats: "БИЦЕПС: ЕСТЬ | МЫСЛИ: НЕТ",
    desc: "Твое тело — храм, в котором давно никто не молится. Ты можешь поднять 100 кг, но поддержать разговор сложнее, чем 'где тут штанга?'.",
    rarity: "ОБЫЧНЫЙ",
    color: "bg-orange-600",
    icon: Dumbbell,
    image: "/assets/archetypes/gym_rat.webp"
  },
  bali_bum: {
    id: "bali_bum",
    title: "ДУХОВНЫЙ ПАРАЗИТ",
    stats: "ВИБРАЦИИ: ВЫСОКИЕ | ПОЛЬЗА: НИЗКАЯ",
    desc: "Ты 'познаешь себя' за счет сдачи бабушкиной квартиры. Твоя духовность заканчивается там, где нужно реально работать руками.",
    rarity: "РЕДКИЙ",
    color: "bg-cyan-500",
    icon: Plane,
    image: "/assets/archetypes/bali_bum.webp"
  },
  relocant: {
    id: "relocant",
    title: "ГРАЖДАНИН НИГДЕ",
    stats: "РОДИНА: 404 | ТЫКВЕННЫЙ ЛАТТЕ: ЕСТЬ",
    desc: "Чужой среди своих, чужой среди чужих. Ты скучаешь по березкам, сидя в коворкинге Тбилиси, но никому ты там не нужен.",
    rarity: "РЕДКИЙ",
    color: "bg-blue-400",
    icon: Plane,
    image: "/assets/archetypes/relocant.webp"
  },
  wish_master: {
    id: "wish_master",
    title: "ЖЕРТВА ВСЕЛЕННОЙ",
    stats: "ЛОГИКА: ОТКЛ | МАГИЯ: ВКЛ",
    desc: "Ты дышишь маткой и клеишь карту желаний, вместо того чтобы включить мозг. Вселенная тебя слышит и ржёт над тобой.",
    rarity: "ОБЫЧНЫЙ",
    color: "bg-pink-400",
    icon: Sparkles,
    image: "/assets/archetypes/wish_master.webp"
  },
  biohacker: {
    id: "biohacker",
    title: "ИПОХОНДРИК 2.0",
    stats: "БАДЫ: ВМЕСТО ЕДЫ | ЖИЗНЬ: ПО ГРАФИКУ",
    desc: "Ты жрешь таблетки горстями, чтобы прожить 120 лет. Спойлер: ты умрешь абсолютно здоровым, но в полном одиночестве, потому что всех зае**л своим режимом.",
    rarity: "РЕДКИЙ",
    color: "bg-teal-500",
    icon: Activity,
    image: "/assets/archetypes/biohacker.webp"
  },
  wb_addict: {
    id: "wb_addict",
    title: "ШОПОГОЛИК-НИЩЕБРОД",
    stats: "ШКАФ: ЗАБИТ | КОШЕЛЕК: ПУСТ",
    desc: "Ты заполняешь внутреннюю пустоту китайским барахлом с Вайлдберриз. Твоя квартира похожа на склад неликвида.",
    rarity: "ОБЫЧНЫЙ",
    color: "bg-purple-600",
    icon: ShoppingBag,
    image: "/assets/archetypes/wb_addict.webp"
  },
  sad_genius: {
    id: "sad_genius",
    title: "ДИВАННЫЙ ФИЛОСОФ",
    stats: "ИНТЕЛЛЕКТ: 200 | РЕАЛИЗАЦИЯ: 0",
    desc: "Ты считаешь себя непризнанным гением, но по факту ты просто ленивое чмо с энциклопедическими знаниями бесполезной херни.",
    rarity: "РЕДКИЙ",
    color: "bg-indigo-600",
    icon: ScanLine,
    image: "/assets/archetypes/sad_genius.webp"
  },
  taxi_philosopher: {
    id: "taxi_philosopher",
    title: "ЭКСПЕРТ ПО ВСЕМУ",
    stats: "МНЕНИЕ: ВАЖНОЕ | СЛУШАТЕЛИ: ПАССАЖИРЫ",
    desc: "Ты знаешь, как управлять страной, но не можешь управлять собственной жизнью. Твой уровень компетенции — комментарии в ВКонтакте.",
    rarity: "ЭПИК",
    color: "bg-yellow-700",
    icon: BookOpen,
    image: "/assets/archetypes/taxi_philosopher.webp"
  },
  insta_fake: {
    id: "insta_fake",
    title: "ЦИФРОВАЯ ЭСКОРТНИЦА",
    stats: "ФИЛЬТРЫ: 100% | РЕАЛЬНОСТЬ: 0%",
    desc: "Твоя жизнь существует только в сторис. Ты не ешь еду, пока не сфоткаешь. Внутри ты так же пуст, как твои охваты без накрутки.",
    rarity: "ОБЫЧНЫЙ",
    color: "bg-pink-500",
    icon: Sparkles,
    image: "/assets/archetypes/insta_fake.webp"
  },
  dating_veteran: {
    id: "dating_veteran",
    title: "ОДНОРАЗОВЫЙ ЧЕЛОВЕК",
    stats: "СВАЙПЫ: ∞ | ЛЮБОВЬ: 404",
    desc: "Ты ищешь идеального партнера, будучи ходячим набором комплексов. Тебя используют на одну ночь, потому что на большее ты не тянешь.",
    rarity: "ЭПИК",
    color: "bg-rose-500",
    icon: HeartCrack,
    image: "/assets/archetypes/dating_veteran.webp"
  },
  doom_scroller: {
    id: "doom_scroller",
    title: "ПОТРЕБИТЕЛЬ КОНТЕНТА",
    stats: "МОЗГ: РАЗЖИЖЕН",
    desc: "Ты проживаешь чужие жизни через экран телефона, потому что твоя собственная слишком уныла. Твой палец накачан лучше, чем пресс.",
    rarity: "ОБЫЧНЫЙ",
    color: "bg-slate-500",
    icon: Meh,
    image: "/assets/archetypes/doom_scroller.webp"
  },
  gaslighter: {
    id: "gaslighter",
    title: "ЭМОЦИОНАЛЬНЫЙ УПЫРЬ",
    stats: "ТОКСИЧНОСТЬ: РАДИОАКТИВЕН",
    desc: "Рядом с тобой вянут цветы и дохнут коты. Ты питаешься чужими страданиями и считаешь это 'сложным характером'.",
    rarity: "ТОКСИК",
    color: "bg-red-900",
    icon: MessageCircle,
    image: "/assets/archetypes/gaslighter.webp"
  },
  anxiety_prime: {
    id: "anxiety_prime",
    title: "КОМОК НЕРВОВ",
    stats: "ПУЛЬС: 200 | ПРИЧИНА: НЕТ",
    desc: "Ты боишься звонков, курьеров и собственных мыслей. Твоя зона комфорта сузилась до размеров одеяла, под которым ты дрожишь.",
    rarity: "ОБЫЧНЫЙ",
    color: "bg-violet-600",
    icon: Frown,
    image: "/assets/archetypes/anxiety_prime.webp"
  },
  hikka: {
    id: "hikka",
    title: "ОШИБКА СОЦИАЛИЗАЦИИ",
    stats: "ДРУЗЬЯ: В ИНТЕРНЕТЕ",
    desc: "Ты боишься кассирши в 'Пятерочке'. Твой мир ограничен монитором, а социальные навыки на уровне табуретки.",
    rarity: "РЕДКИЙ",
    color: "bg-zinc-800",
    icon: Lock,
    image: "/assets/archetypes/hikka.webp"
  },
  bore_nerd: {
    id: "bore_nerd",
    title: "ЭНЕРГЕТИЧЕСКИЙ ВАМПИР",
    stats: "ЗАНУДСТВО: СМЕРТЕЛЬНО",
    desc: "Люди притворяются мертвыми, когда ты заходишь в комнату. Ты исправляешь 'тся' и 'ться', потому что это единственный способ почувствовать превосходство.",
    rarity: "РЕДКИЙ",
    color: "bg-gray-500",
    icon: ScanLine,
    image: "/assets/archetypes/bore_nerd.webp"
  },
  weekend_alcoholic: {
    id: "weekend_alcoholic",
    title: "АЛКОНАВТ ВЫХОДНОГО ДНЯ",
    stats: "ПЕЧЕНЬ: ПОКИНУЛА ЧАТ",
    desc: "Ты работаешь, чтобы пить. В пятницу ты герой, в понедельник ты овощ. Твой единственный способ расслабиться ведет к циррозу.",
    rarity: "ЭПИК",
    color: "bg-amber-700",
    icon: AlertTriangle,
    image: "/assets/archetypes/weekend_alcoholic.webp"
  },
  moms_handsome: {
    id: "moms_handsome",
    title: "НАРЦИСС С АЛИЭКСПРЕСС",
    stats: "ЭГО: НЕБОСКРЕБ | ЦЕННОСТЬ: САРАЙ",
    desc: "Ты считаешь себя подарком судьбы, но чек давно потерян и вернуть тебя нельзя. Никто не ценит тебя так высоко, как ты сам.",
    rarity: "ОБЫЧНЫЙ",
    color: "bg-rose-400",
    icon: User,
    image: "/assets/archetypes/moms_handsome.webp"
  },
  clumsy: {
    id: "clumsy",
    title: "ХОДЯЧАЯ КАТАСТРОФА",
    stats: "ЛОВКОСТЬ: -100",
    desc: "Руки из жопы — это не диагноз, это твой стиль жизни. Тебе нельзя доверять даже полив кактуса — ты его утопишь.",
    rarity: "ОБЫЧНЫЙ",
    color: "bg-orange-500",
    icon: AlertTriangle,
    image: "/assets/archetypes/clumsy.webp"
  },
  normie: {
    id: "normie",
    title: "СЕРАЯ МАССА",
    stats: "УНИКАЛЬНОСТЬ: 0%",
    desc: "Ты — массовка. Если тебя завтра заменят нейросетью, никто даже не заметит разницы. Твоя биография поместится на трамвайном билете.",
    rarity: "ОБЫЧНЫЙ",
    color: "bg-gray-400",
    icon: Meh,
    image: "/assets/archetypes/normie.webp"
  }
};

export const DEFAULT_ARCHETYPE = ARCHETYPES.normie;
export const FALLBACK_ICON = Fingerprint;
