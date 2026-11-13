import { TestBed } from '@angular/core/testing';
import { signalStore } from '@ngrx/signals';
import {
  describe,
  expect,
  it,
} from 'vitest';

import type { Valve } from './valve';

import { withCircuitServices } from './circuit-services.feature';
import { ValveApi } from './valve-api';
import { withValves } from './valves.feature';

// A feature is tested alone, in a test store that holds only what it needs.
const ValvesTestStore = signalStore(
  withCircuitServices(),
  withValves(),
);

describe('withValves', () => {
  it('stays not loading when the server fails', async () => {
    const failingApi: Pick<ValveApi, 'getAll'> = { getAll: async () => await Promise.reject(new Error('offline')) };

    TestBed.configureTestingModule({
      providers: [
        ValvesTestStore,
        {
          provide: ValveApi,
          useValue: failingApi,
        },
      ],
    });
    const store = TestBed.inject(ValvesTestStore);

    await expect(store.loadValves()).rejects.toThrow('offline');
    expect(store.isLoadingValves()).toBe(false);
    expect(store.valves()).toEqual([] satisfies Valve[]);
  });
});
