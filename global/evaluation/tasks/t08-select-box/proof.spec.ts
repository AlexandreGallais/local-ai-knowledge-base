import {
  Component,
  signal,
} from '@angular/core';
import {
  type ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import {
  describe,
  expect,
  it,
} from 'vitest';
import {
  SelectBox,
  type SelectOption,
} from './select-box';

const MODES: readonly SelectOption[] = [
  {
    label: 'Automatic',
    value: 'auto',
  },
  {
    label: 'Manual',
    value: 'manual',
  },
];

@Component({
  imports: [SelectBox],
  template: '<app-select-box label="Pump mode" [options]="modes" [(value)]="mode" />',
})
class ProofHost {
  public readonly mode = signal<string | undefined>('auto');
  protected readonly modes = MODES;
}

function combobox(): HTMLElement {
  const found = document.querySelector<HTMLElement>('[role="combobox"]');

  if (found === null) {
    throw new Error('No element with the role combobox.');
  }
  return found;
}

async function press(fixture: ComponentFixture<ProofHost>, key: string): Promise<void> {
  combobox().dispatchEvent(new KeyboardEvent('keydown', {
    bubbles: true,
    key,
  }));
  await fixture.whenStable();
}

describe('proof of t08', () => {
  it('chooses with ArrowDown and Enter, and names the active option', async () => {
    const fixture = TestBed.createComponent(ProofHost);

    await fixture.whenStable();
    await press(fixture, 'ArrowDown');
    expect(combobox().getAttribute('aria-expanded')).toBe('true');
    const active = combobox().getAttribute('aria-activedescendant') ?? '';

    expect(document.getElementById(active)?.textContent.trim()).toBe('Manual');
    await press(fixture, 'Enter');
    expect(fixture.componentInstance.mode()).toBe('manual');
    expect(combobox().getAttribute('aria-expanded')).toBe('false');
  });
  it('closes with Escape and keeps the value', async () => {
    const fixture = TestBed.createComponent(ProofHost);

    await fixture.whenStable();
    await press(fixture, 'ArrowDown');
    await press(fixture, 'Escape');
    expect(fixture.componentInstance.mode()).toBe('auto');
    expect(combobox().getAttribute('aria-expanded')).toBe('false');
  });
});
