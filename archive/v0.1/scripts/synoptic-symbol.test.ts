// Tests of the synoptic symbol template: its view function, and the TypeScript lint of F8 on it.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  describe,
  it,
} from 'node:test';
import {
  toValveView,
  type ValveSymbolInputs,
} from '../code/templates/typescript-angular/synoptic-symbol.ts';
import {
  prepareProject,
  run,
  TEMPLATE,
  writeSource,
} from './lint-sample.ts';

const CLOSED_VALVE: ValveSymbolInputs = {
  tagName: 'V101',
  positionState: 'closed',
  alarmPriority: 'none',
  alarmState: 'normal',
  isOutOfService: false,
};

describe('synoptic symbol view', () => {
  it('gives each position state its data attribute and its word', () => {
    const view = toValveView(CLOSED_VALVE);

    assert.equal(view.attributes['data-position'], 'closed');
    assert.equal(view.stateText, 'CLOSED');
    assert.equal(view.accessibleName, 'Valve V101, CLOSED');
  });
  it('shows the measured opening of an intermediate valve', () => {
    const view = toValveView({
      ...CLOSED_VALVE,
      positionState: 'intermediate',
      actualPositionPercent: 42.4,
    });

    assert.equal(view.stateText, '42 %');
  });
  it('flashes the badge of an unacknowledged alert', () => {
    const view = toValveView({
      ...CLOSED_VALVE,
      alarmPriority: 'warning',
      alarmState: 'unacknowledged',
    });

    assert.equal(view.isBadgeFlashing, true);
    assert.equal(view.badgeLetter, 'W');
    assert.equal(view.attributes['data-alarm-state'], 'unacknowledged');
  });
  it('keeps the badge of an acknowledged alert steady', () => {
    const view = toValveView({
      ...CLOSED_VALVE,
      alarmPriority: 'alarm',
      alarmState: 'acknowledged',
    });

    assert.equal(view.isBadgeFlashing, false);
    assert.equal(view.badgeLetter, 'A');
  });
});
describe('synoptic symbol lint', () => {
  it('passes npm run check of the TypeScript and Angular template', () => {
    const project = prepareProject();

    writeSource(project, 'src/app/synoptic-symbol.ts', readFileSync(join(TEMPLATE, 'synoptic-symbol.ts'), 'utf8'));
    run(project, 'fix');
    const result = run(project, 'check');

    assert.equal(result.status, 0, result.output);
  });
});
