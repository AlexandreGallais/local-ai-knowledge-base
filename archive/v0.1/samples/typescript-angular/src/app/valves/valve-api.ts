import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { isValve, type Valve } from './valve';

@Injectable({ providedIn: 'root' })
export class ValveApi {
  private readonly http = inject(HttpClient);

  public async loadValves(): Promise<Valve[]> {
    const body = await firstValueFrom(this.http.get<unknown>('/api/valves'));

    if (!Array.isArray(body) || !body.every(isValve)) {
      throw new Error('The valve list has a wrong shape.');
    }

    return body;
  }

  public async isOpen(id: string): Promise<boolean> {
    const valves = await this.loadValves();

    return valves.some((valve) => valve.id === id && valve.state === 'open');
  }

  public async close(id: string): Promise<void> {
    await firstValueFrom(this.http.post<unknown>(`/api/valves/${id}/close`, {}));
  }
}
