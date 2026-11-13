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

// The store is tested through its public API; the server is replaced by a fake.
function createStore(): CircuitStore {
  const fakeApi: Pick<ValveApi, 'getAll'> = { getAll: async () => await Promise.resolve(VALVES) };

  TestBed.configureTestingModule({
    providers: [{
      provide: ValveApi,
      useValue: fakeApi,
    }],
  });

  return TestBed.inject(CircuitStore);
}

describe('CircuitStore', () => {
  it('loads the valves and counts the open ones', async () => {
    const store = createStore();

    await store.loadValves();
    expect(store.valves()).toEqual(VALVES);
    expect(store.openValveCount()).toBe(1);
    expect(store.isLoadingValves()).toBe(false);
  });
  it('selects a loaded valve, then clears the selection', async () => {
    const store = createStore();

    await store.loadValves();
    store.selectValve('V-102');
    expect(store.selectedValve()?.isOpen).toBe(false);
    store.clearValveSelection();
    expect(store.selectedValve()).toBeUndefined();
  });
});
