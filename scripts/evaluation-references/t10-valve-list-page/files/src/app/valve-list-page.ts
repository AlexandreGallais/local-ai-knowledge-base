import {
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import type { StateFilter } from './valve-filter.feature';
import type { ValveRow } from './valve-row';
import { ValveListStore } from './valve-list.store';

/** The valves of a circuit, with a filter on their state. */
@Component({
  providers: [ValveListStore],
  selector: 'app-valve-list-page',
  templateUrl: './valve-list-page.html',
})
export class ValveListPage {
  protected readonly store = inject(ValveListStore);
  public readonly valves = input.required<readonly ValveRow[]>();
  protected readonly filters: readonly StateFilter[] = [
    'all',
    'open',
    'closed',
    'fault',
  ];

  public constructor() {
    effect(() => {
      this.store.setRows(this.valves());
    });
  }

  protected onFilterChange(event: Event): void {
    const value = event.target instanceof HTMLSelectElement ? event.target.value : 'all';

    this.store.setStateFilter(this.filters.find((filter) => filter === value) ?? 'all');
  }
}
