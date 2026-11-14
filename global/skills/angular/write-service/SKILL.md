---
name: write-service
description: Use when you write or change an Angular service - a server API, a shared helper - and its test.
---

# Write an Angular service

## Rules

- Angular 22: `@Service()` from `@angular/core` for a new singleton service; `@Injectable` stays in
  old code. `inject()`, never constructor parameters.
- A service holds no state of the screen: state goes in a NgRx Signals store (skill `write-store`).
- The HTTP client comes from `HttpClient`; never `fetch` in a component.

## Steps

1. Read the version of `@angular/core` in `package.json`.
2. Generate the file, then adapt it: `npx --no -- ng generate service <path/name>`.
   No Angular CLI: copy `valve-api.ts` from `/opt/local-ai-base/skills/angular/write-store/assets/composed-store/`.
3. Write each method with its return type. An observable turned into a promise:
   `firstValueFrom(source, { defaultValue: ... })`.
4. Write the test with `provideHttpClient()` and `provideHttpClientTesting()`; check the request with
   `HttpTestingController.expectOne`, then `verify()`. Follow `valve-api.spec.ts` of the template.
5. A store uses the service: inject it once, in the first feature of the store (`withProps`).
6. Run the build, the lint and the tests of the project until 0 errors.

## Example

Wrong:

```ts
@Injectable({ providedIn: 'root' })
export class ValveApi {
  constructor(private http: HttpClient) {}
}
```

Right:

```ts
@Service()
export class ValveApi {
  private readonly http = inject(HttpClient);
}
```

## Final check

- Has each method its return type, and the service no screen state?
- Does the test check the request and call `verify()`?
- Did format, lint, build and tests end at 0 errors?
