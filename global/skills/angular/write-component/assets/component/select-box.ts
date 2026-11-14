import {
  booleanAttribute,
  Component,
  computed,
  input,
  model,
  signal,
} from '@angular/core';

import {
  isListMoveKey,
  moveActiveIndex,
} from './move-active-index';

/** One choice of the select box. */
export interface SelectOption {
  readonly isDisabled?: boolean;
  readonly label: string;
  readonly value: string;
}

let nextUid = 0;

/**
 * A select-only combobox, made without a component library (APG pattern "select-only combobox").
 * The DOM focus stays on the combobox; aria-activedescendant names the active option.
 */
@Component({
  selector: 'app-select-box',
  styleUrl: './select-box.scss',
  templateUrl: './select-box.html',
})
export class SelectBox {
  public readonly isDisabled = input(
    false,
    { transform: booleanAttribute },
  );

  public readonly label = input.required<string>();

  public readonly options = input.required<readonly SelectOption[]>();

  public readonly placeholder = input('');

  /** Two-way value: [(value)]="mode". */
  public readonly value = model<string | undefined>(undefined);

  protected readonly activeIndex = signal(-1);

  protected readonly isOpen = signal(false);

  protected readonly activeDescendantId = computed(() => this.isOpen() && this.activeIndex() >= 0 ? this.optionId(this.activeIndex()) : undefined);

  private readonly uid = nextUid++;

  protected readonly labelId = `select-box-${String(this.uid)}-label`;

  protected readonly listId = `select-box-${String(this.uid)}-list`;

  protected readonly selectedLabel = computed(() => this.options().find((option) => option.value === this.value())?.label ?? this.placeholder());

  protected choose(index: number): void {
    const option = this.options()[index];

    if (option === undefined || option.isDisabled === true) {
      return;
    }

    this.value.set(option.value);
    this.close();
  }

  // A click on an option: the list handles it for all its options, so that no option needs a
  // focus of its own (the focus stays on the combobox).
  protected chooseFromPointer(event: MouseEvent): void {
    const option = event.target instanceof Element ? event.target.closest('[role="option"]') : undefined;

    this.choose(Number(option?.getAttribute('data-index') ?? -1));
  }

  protected close(): void {
    this.isOpen.set(false);
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (this.isDisabled()) {
      return;
    }

    if (isListMoveKey(event.key)) {
      event.preventDefault();
      this.open();
      this.activeIndex.set(moveActiveIndex(
        this.activeIndex(),
        this.options().length,
        event.key,
      ));
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (this.isOpen()) {
        this.choose(this.activeIndex());
      } else {
        this.open();
      }
    } else if (event.key === 'Escape' && this.isOpen()) {
      event.preventDefault();
      this.close();
    }
  }

  protected optionId(index: number): string {
    return `${this.listId}-option-${String(index)}`;
  }

  protected toggle(): void {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  private open(): void {
    if (this.isDisabled() || this.isOpen()) {
      return;
    }

    this.isOpen.set(true);
    this.activeIndex.set(Math.max(
      this
        .options()
        .findIndex((option) => option.value === this.value()),
      0,
    ));
  }
}
