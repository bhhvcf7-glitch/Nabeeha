/** Nabeeha Guardian PRISM - educational risk engine. No live payment authorization. */
export function mixedResidual(types) {
  if (!Array.isArray(types) || !types.length || types.some(([s, r]) => s < 0 || r < 0 || r > 1)) throw new Error('Invalid mixture');
  if (Math.abs(types.reduce((total, [share]) => total + share, 0) - 1) > 1e-9) throw new Error('Shares must sum to one');
  return types.reduce((total, [share, residual]) => total + share * residual, 0);
}
export function expectedLoss(p, residual = .099) {
  if (![p, residual].every(x => Number.isFinite(x) && x >= 0 && x <= 1)) throw new Error('Probability out of range');
  return { allow: 9000 * p, verify: 9000 * residual * p + 40 * (1 - p), block: 600 * (1 - p) };
}
export function decide(p, residual = .099) {
  const costs = expectedLoss(p, residual);
  return Object.keys(costs).reduce((best, option) => costs[option] < costs[best] ? option : best, 'allow');
}
export function thresholds(residual = .099) {
  return { allowVerify: 40 / (9000 * (1 - residual) + 40), verifyBlock: 560 / (9000 * residual + 560) };
}
export function holdValue(p, sensitivity, falsePositive, residual = .099, evidence = 'E2') {
  if (![p, sensitivity, falsePositive].every(x => Number.isFinite(x) && x >= 0 && x <= 1)) throw new Error('Probability out of range');
  const baseline = Math.min(...Object.values(expectedLoss(p, residual)));
  const positiveAttack = p * sensitivity;
  const positiveLegitimate = (1 - p) * falsePositive;
  const negativeAttack = p * (1 - sensitivity);
  const negativeLegitimate = (1 - p) * (1 - falsePositive);
  const bestWeighted = (attack, legitimate) => {
    const mass = attack + legitimate;
    return mass ? mass * Math.min(...Object.values(expectedLoss(attack / mass, residual))) : 0;
  };
  const hold = bestWeighted(positiveAttack, positiveLegitimate) + bestWeighted(negativeAttack, negativeLegitimate) + 25 * (1-p);
  const value = baseline - hold;
  return { baseline, hold, value, recommended: value > 0 && evidence !== 'E0' };
}
export function audit(p, randomValue, floor = .01) {
  if (randomValue < 0 || randomValue >= 1 || floor < 0 || floor > 1) throw new Error('Invalid audit sample');
  const action = decide(p);
  return action === 'allow' && randomValue < floor ? 'verify_audit' : action;
}
export function fatigue(challengesInWindow, fastApprovals) {
  return { challengeAllowed: challengesInWindow < 2, socialResidualMultiplier: Math.min(2.5, 1 + .4 * fastApprovals) };
}
