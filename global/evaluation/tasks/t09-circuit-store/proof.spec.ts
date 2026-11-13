import { TestBed } from '@angular/core/testing';
import {
  describe,
  expect,
  it,
} from 'vitest';
import type { Valve } from './valve';
import { CircuitStore } from './circuit.store';
import { ValveApi } from './valve-api';

const VALVES: readonly Valve[] = [
  {
    id: 'V-101',
    isOpen: true,
  },
  {
    id: 'V-102',
    isOpen: false,
  },
];

function createStore(): InstanceType<typeof CircuitStore> {
  TestBed.configureTestingModule({
    providers: [
      {
        provide: ValveApi,
        useValue: { getAll: async () => await Promise.resolve(VALVES) },
      },
    ],
  });
  return TestBed.inject(CircuitStore);
}

describe('proof of t09', () => {
  it('loads the valves, counts the open ones, then selects and clears', async () => {
    const store = createStore();

    await store.loadValves();
    expect(store.openValveCount()).toBe(1);
    expect(store.isLoadingValves()).toBe(false);
    store.selectValve('V-102');
    expect(store.selectedValve()?.isOpen).toBe(false);
    store.clearValveSelection();
    expect(store.selectedValve()).toBeUndefined();
  });
});
