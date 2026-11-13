import {
  Component,
  inject,
} from '@angular/core';

import { UsersStore } from './users.store';

@Component({
  selector: 'app-user-list',
  styleUrl: './user-list.scss',
  templateUrl: './user-list.html',
})
export class UserList {
  protected readonly store = inject(UsersStore);
}
