import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

/**
 * Shows the state of an equipment as a word in a colored badge.
 * @example
 * <lib-status-badge [state]="'fault'" />
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-status-badge',
  styleUrl: './status-badge.css',
  templateUrl: './status-badge.html',
})
export class StatusBadge {
  public readonly state = input.required<'fault' | 'off' | 'on'>();

  protected readonly label = computed(() => this.state().toUpperCase());
}
