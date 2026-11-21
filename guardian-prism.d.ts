export function mixedResidual(types: Array<[number, number]>): number;
export function expectedLoss(p: number, residual?: number): { allow: number; verify: number; block: number };
export function decide(p: number, residual?: number): 'allow' | 'verify' | 'block';
export function thresholds(residual?: number): { allowVerify: number; verifyBlock: number };
export function holdValue(p: number, sensitivity: number, falsePositive: number, residual?: number, evidence?: string): {baseline: number; hold: number; value: number; recommended: boolean};
export function audit(p: number, randomValue: number, floor?: number): string;
export function fatigue(challengesInWindow: number, fastApprovals: number): {challengeAllowed: boolean; socialResidualMultiplier: number};
