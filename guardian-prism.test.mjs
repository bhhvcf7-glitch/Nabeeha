import test from 'node:test';
import assert from 'node:assert/strict';
import { mixedResidual, expectedLoss, decide, thresholds, holdValue, audit, fatigue } from '../artifacts/mobile/lib/guardian-prism.js';

const r = mixedResidual([[.5,.02],[.3,.03],[.2,.4]]);
test('T01 mixed residual correctly weighted',()=>assert.ok(Math.abs(r-.099)<1e-10));
test('T02 invalid shares rejected',()=>assert.throws(()=>mixedResidual([[.8,.02]])));
test('T03 negative rates rejected',()=>assert.throws(()=>mixedResidual([[1,-.01]])));
test('T04 allow cost at 0 risk',()=>assert.equal(expectedLoss(0).allow,0));
test('T05 block cost at 100% risk',()=>assert.equal(expectedLoss(1).block,0));
test('T06 invalid prior rejected',()=>assert.throws(()=>expectedLoss(1.2)));
test('T07 allow decision low risk',()=>assert.equal(decide(0),'allow'));
test('T08 verification for medium risk',()=>assert.equal(decide(.3),'verify'));
test('T09 block decision high risk',()=>assert.equal(decide(.9),'block'));
test('T10 calibrated thresholds',()=>assert.ok(Math.abs(thresholds(r).verifyBlock - 560/1451)<1e-12));
test('T11 strong signal can justify hold',()=>assert.equal(holdValue(.3,.8,.1,.05,'E2').recommended,true));
test('T12 weak E0 evidence cannot justify hold',()=>assert.equal(holdValue(.3,.8,.1,.05,'E0').recommended,false));
test('T13 audit floor samples low risk',()=>assert.equal(audit(.0001,0,.01),'verify_audit'));
test('T14 fatigue cooldown and social risk',()=>{assert.equal(fatigue(2,3).challengeAllowed,false);assert.ok(fatigue(2,3).socialResidualMultiplier>1)});
