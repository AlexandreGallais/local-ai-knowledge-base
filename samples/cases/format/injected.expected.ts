import {
  Component,
  inject,
  input,
} from '@angular/core';

import { UsersStore } from './users.store';

@Component({
  selector: 'app-user-count',
  template: '{{ store.count() }} {{ title() }}',
})
export class UserCount {
  protected readonly store = inject(UsersStore);

  public readonly title = input('Users');

  protected readonly labels = [
    'a',
    'b',
  ];
}
