import {
  Component,
  input,
  output,
} from '@angular/core';

/** A valve as a button: its tag and its state; a click emits its tag. */
@Component({
  selector: 'app-valve-badge',
  templateUrl: './valve-badge.html',
})
export class ValveBadge {
  public readonly isOpen = input(false);
  public readonly selected = output<string>();
  public readonly tagName = input.required<string>();

  protected select(): void {
    this.selected.emit(this.tagName());
  }
}
