import { HttpClient } from '@angular/common/http';
import {
  inject,
  Service,
} from '@angular/core';
import { firstValueFrom } from 'rxjs';

import type { Valve } from './valve';

// The server of the valves. A service is injected once, in the first feature of a store.
@Service()
export class ValveApi {
  private readonly http = inject(HttpClient);

  // An answer without a value gives an empty list rather than an error.
  public async getAll(): Promise<readonly Valve[]> {
    return await firstValueFrom(
      this.http.get<readonly Valve[]>('/api/valves'),
      { defaultValue: [] },
    );
  }
}
