import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { CircuitStore } from './circuit.store';

/** The state of one valve of the circuit, with a button that opens it. */
@Component({
  selector: 'app-valve-status',
  templateUrl: './valve-status.html',
  styleUrl: './valve-status.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValveStatus {
  readonly #store = inject(CircuitStore);
  /** The name of the valve. */
  readonly name = input.required<string>();
  /** Its state, read from the store. */
  protected readonly state = computed(() => this.#store.valves()[this.name()] ?? 'closed');

  /** Opens the valve. */
  protected open(): void {
    this.#store.setState(this.name(), 'open');
  }
}
