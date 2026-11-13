import { TestBed } from '@angular/core/testing';
import {
  describe,
  expect,
  it,
} from 'vitest';
import { ValveBadge } from './valve-badge';

describe('proof of t07', () => {
  it('shows the tag and the state, and emits the tag on a click', async () => {
    const fixture = TestBed.createComponent(ValveBadge);
    const emitted: string[] = [];

    fixture.componentRef.setInput('tagName', 'V-101');
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentInstance.selected.subscribe((tag: string) => {
      emitted.push(tag);
    });
    await fixture.whenStable();
    const button = document.querySelector<HTMLButtonElement>('button');

    expect(button?.textContent).toContain('V-101');
    expect(button?.textContent).toContain('OPEN');
    button?.click();
    await fixture.whenStable();
    expect(emitted).toEqual(['V-101']);
  });
});
