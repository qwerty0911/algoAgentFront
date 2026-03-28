/** Solved.ac 스타일 난이도: 1=Bronze V … 30=Ruby I (0은 Unrated) */
const TIER_NAMES = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ruby'];
const ROMAN = ['V', 'IV', 'III', 'II', 'I'];

/**
 * @param {unknown} level
 * @returns {{ tierKey: string; label: string }}
 */
export function getSolvedAcTierDisplay(level) {
  const n = Number(level);
  if (!Number.isFinite(n) || n <= 0) {
    return { tierKey: 'unrated', label: 'Unrated' };
  }
  if (n > 30) {
    return { tierKey: 'unknown', label: `Lv. ${n}` };
  }
  const tierIdx = Math.floor((n - 1) / 5);
  const sub = (n - 1) % 5;
  const tier = TIER_NAMES[tierIdx];
  const roman = ROMAN[sub];
  return {
    tierKey: tier.toLowerCase(),
    label: `${tier} ${roman}`,
  };
}
