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
  {
    isDisabled: true,
    label: 'Off',
    value: 'off',
  },
];

@Component({
  imports: [SelectBox],
  template: '<app-select-box label="Pump mode" [options]="modes" [(value)]="mode" />',
})
class Host {
  public readonly mode = signal<string | undefined>('auto');

  protected readonly modes = MODES;
}

// The element the test needs, found as a user finds it: by its role or its id.
function element(selector: string): HTMLElement {
  const found = document.querySelector<HTMLElement>(selector);

  if (found === null) {
    throw new Error(`No element "${selector}" in the page.`);
  }

  return found;
}

async function press(
  fixture: ComponentFixture<Host>,
  key: string,
): Promise<void> {
  element('[role="combobox"]').dispatchEvent(new KeyboardEvent('keydown', {
    bubbles: true,
    key,
  }));
  await fixture.whenStable();
}

async function render(): Promise<ComponentFixture<Host>> {
  const fixture = TestBed.createComponent(Host);

  await fixture.whenStable();

  return fixture;
}

describe('SelectBox', () => {
  it('opens with ArrowDown, moves, and chooses with Enter', async () => {
    const fixture = await render();

    await press(
      fixture,
      'ArrowDown',
    );
    expect(element('[role="combobox"]').getAttribute('aria-expanded')).toBe('true');
    await press(
      fixture,
      'Enter',
    );
    expect(element('[role="combobox"]').getAttribute('aria-expanded')).toBe('false');
    expect(fixture.componentInstance.mode()).toBe('manual');
    expect(element('[role="combobox"]').textContent.trim()).toBe('Manual');
  });
  it('names the active option for screen readers', async () => {
    const fixture = await render();

    await press(
      fixture,
      'ArrowDown',
    );
    const active = element('[role="combobox"]').getAttribute('aria-activedescendant') ?? '';

    expect(element(`#${active}`).textContent.trim()).toBe('Manual');
  });
  it('closes with Escape and keeps its value', async () => {
    const fixture = await render();

    await press(
      fixture,
      'ArrowDown',
    );
    await press(
      fixture,
      'Escape',
    );
    expect(element('[role="combobox"]').getAttribute('aria-expanded')).toBe('false');
    expect(fixture.componentInstance.mode()).toBe('auto');
  });
  it('never chooses a disabled option, by keyboard or by pointer', async () => {
    const fixture = await render();

    await press(
      fixture,
      'End',
    );
    await press(
      fixture,
      'Enter',
    );
    element('[data-index="2"]').click();
    await fixture.whenStable();
    expect(fixture.componentInstance.mode()).toBe('auto');
  });
  it('chooses an option clicked with the pointer', async () => {
    const fixture = await render();

    await press(
      fixture,
      'ArrowDown',
    );
    element('[data-index="1"]').click();
    await fixture.whenStable();
    expect(fixture.componentInstance.mode()).toBe('manual');
  });
});
