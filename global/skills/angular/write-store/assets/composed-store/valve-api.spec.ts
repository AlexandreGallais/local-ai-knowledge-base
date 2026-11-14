import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  describe,
  expect,
  it,
} from 'vitest';

import type { Valve } from './valve';

import { ValveApi } from './valve-api';

describe('ValveApi', () => {
  it('reads the valves from the server', async () => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    const api = TestBed.inject(ValveApi);
    const server = TestBed.inject(HttpTestingController);
    const valves: Valve[] = [{
      id: 'V-101',
      isOpen: true,
    }];
    const answer = api.getAll();

    server
      .expectOne('/api/valves')
      .flush(valves);
    expect(await answer).toEqual(valves);
    server.verify();
  });
});
