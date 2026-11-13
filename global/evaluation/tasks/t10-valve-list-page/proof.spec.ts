import { TestBed } from '@angular/core/testing';
import {
  describe,
  expect,
  it,
} from 'vitest';
import { ValveListPage } from './valve-list-page';

function rows(): HTMLElement[] {
  return [...document.querySelectorAll<HTMLElement>('[data-testid="valve-row"]')];
}

describe('proof of t10', () => {
  it('shows every valve, then only the open ones', async () => {
    const fixture = TestBed.createComponent(ValveListPage);

    fixture.componentRef.setInput('valves', [
      {
        state: 'open',
        tag: 'V-101',
      },
      {
        state: 'closed',
        tag: 'V-102',
      },
      {
        state: 'fault',
        tag: 'V-103',
      },
    ]);
    await fixture.whenStable();
    expect(rows()).toHaveLength(3);
    const filter = document.querySelector<HTMLSelectElement>('[data-testid="state-filter"]');

    expect(filter).not.toBeNull();
    if (filter !== null) {
      filter.value = 'open';
      filter.dispatchEvent(new Event('change', { bubbles: true }));
    }
    await fixture.whenStable();
    expect(rows()).toHaveLength(1);
    expect(rows()[0]?.textContent).toContain('V-101');
  });
});
