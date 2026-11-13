import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

import type { Valve } from './valve';

@Component({
  selector: 'app-valve-list',
  template: `
    <p>Open valves: {{ openCount() }}</p>
    <ul>
      @for (valve of valves(); track valve.id) {
        <li [class.fault]="valve.state === 'fault'">
          <button type="button" (click)="selected.emit(valve.id)">{{ valve.label }}</button>
        </li>
      } @empty {
        <li>No valve</li>
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValveList {
  public readonly valves = input.required<readonly Valve[]>();
  public readonly selected = output<string>();
  protected readonly openCount = computed(
    () => this.valves().filter((valve) => valve.state === 'open').length,
  );
}
