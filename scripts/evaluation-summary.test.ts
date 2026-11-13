// Tests of scripts/evaluation-summary.ts.
import assert from 'node:assert/strict';
import {
  describe,
  it,
} from 'node:test';
import { summarizeEvaluation } from './evaluation-summary.ts';

const HEADER = 'task,condition,run,success,tokens';

describe('evaluation summary', () => {
  it('passes when the base succeeds more often with no more tokens', () => {
    const summary = summarizeEvaluation([
      HEADER,
      'T1,with,1,1,1000',
      'T1,with,2,1,1200',
      'T1,without,1,0,1500',
      'T1,without,2,1,1400',
    ].join('\n'));

    assert.equal(summary.with.successRate, 1);
    assert.equal(summary.without.successRate, 0.5);
    assert.equal(summary.passes, true);
  });
  it('fails when the base costs more tokens, even with more successes', () => {
    const summary = summarizeEvaluation([
      HEADER,
      'T1,with,1,1,5000',
      'T1,without,1,0,1000',
    ].join('\n'));

    assert.equal(summary.passes, false);
  });
  it('refuses a row with a bad condition or success value', () => {
    assert.throws(() => summarizeEvaluation(`${HEADER}\nT1,maybe,1,1,10`), /Bad row/);
    assert.throws(() => summarizeEvaluation(`${HEADER}\nT1,with,1,yes,10`), /Bad row/);
  });
});
