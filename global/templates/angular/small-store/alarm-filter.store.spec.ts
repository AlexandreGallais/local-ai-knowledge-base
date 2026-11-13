import { TestBed } from '@angular/core/testing';
import {
  describe,
  expect,
  it,
} from 'vitest';

import { AlarmFilterStore } from './alarm-filter.store';

describe('AlarmFilterStore', () => {
  it('is not filtered at first', () => {
    const store = TestBed.inject(AlarmFilterStore);

    expect(store.isFiltered()).toBe(false);
  });
  it('is filtered once a priority is hidden, and not after a reset', () => {
    const store = TestBed.inject(AlarmFilterStore);

    store.togglePriority('low');
    expect(store.priorities()).toEqual([
      'high',
      'medium',
    ]);
    expect(store.isFiltered()).toBe(true);
    store.reset();
    expect(store.isFiltered()).toBe(false);
  });
  it('keeps the search without its outer spaces', () => {
    const store = TestBed.inject(AlarmFilterStore);

    store.setSearch('  pump ');
    expect(store.search()).toBe('pump');
  });
});
