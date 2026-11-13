---
id: testbed-v22
title: Test a component, a service and a route with the zoneless TestBed
topic: angular-testing
summary: The zoneless TestBed of Angular 22 for components, signals, HTTP and routes, with wrong and right examples.
tool: angular
version: "22"
checked: 2026-11-13
sources: [S48, S49, S50, S52, S55, S65, S74, S82]
license: MIT, written for this base from CC BY 4.0 sources
---

# Test a component, a service and a route with the zoneless TestBed

Contents: 1. Rules · 2. A component · 3. HTTP · 4. A route · Sources

## 1. Rules (Angular tests)

- `TestBed` is zoneless by default, even with `zone.js` loaded, and applies the OnPush rules: change state through signals or `setInput`. [S49]
- Wait for the render with `await fixture.whenStable()`. Run effects with `TestBed.tick()`. [S48] [S52]
- Take the expected value from the request, never from the component code. Query the DOM as a user does: text, role, label.
- Mock only the boundaries: HTTP through `HttpTestingController`, never `HttpClient` by hand; never mock the router. [S50] [S55]
- Never assert the calls of a spy when the DOM or the result shows the behavior. [S82] Agents add mocks more often than people do. [S74]
- For time, use `vi.useFakeTimers()` and `await vi.advanceTimersByTimeAsync(ms)`, then `vi.useRealTimers()`; never `fakeAsync` in new code. [S65]
- A test fails: fix the code under test. Never change, skip or delete the test to make it pass.

## 2. A component (inputs, outputs, signals)

Wrong: the input set as a field, a forced detection, the expected text copied from the template code.

```ts
it('works', () => {
  const fixture = TestBed.createComponent(ValveStatus);
  fixture.componentInstance.isOpen = true as never;
  fixture.detectChanges();
  expect(fixture.nativeElement.innerHTML).toContain('<span class="state">');
});
```

Right:

```ts
it('shows OPEN for an open valve', async () => {
  const fixture = TestBed.createComponent(ValveStatus);

  fixture.componentRef.setInput('isOpen', true);
  await fixture.whenStable();

  expect(fixture.nativeElement.textContent).toContain('OPEN');
});
```

- An output: subscribe to it, `fixture.componentInstance.closed.subscribe(...)`, then act and assert. [S48]
- A child component: stub it with `overrideComponent`; never `NO_ERRORS_SCHEMA` everywhere. [S48]

## 3. HTTP (HttpTestingController)

```ts
beforeEach(() => {
  TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
});

afterEach(() => {
  TestBed.inject(HttpTestingController).verify();
});

it('reads one valve', async () => {
  const pending = firstValueFrom(TestBed.inject(ValveApi).get('V-101'));
  const request = TestBed.inject(HttpTestingController).expectOne('/api/valves/V-101');

  request.flush({ tag: 'V-101', isOpen: true });

  expect(await pending).toEqual({ tag: 'V-101', isOpen: true });
});
```

- `provideHttpClient()` comes before `provideHttpClientTesting()`. [S50]
- `httpResource`: create it in an injection context, `TestBed.tick()` to send the request, `expectOne` and `flush`, then `await TestBed.inject(ApplicationRef).whenStable()`. [S50]

## 4. A route (RouterTestingHarness)

```ts
TestBed.configureTestingModule({ providers: [provideRouter([{ path: 'valves/:tag', component: ValveDetail }])] });
const harness = await RouterTestingHarness.create();
await harness.navigateByUrl('/valves/V-101', ValveDetail);

expect(harness.routeNativeElement?.textContent).toContain('V-101');
```

[S55]

## Sources

- [S48] Angular, "Component testing scenarios", v22, <https://angular.dev/guide/testing/components-scenarios>, read 2026-11-13, CC BY 4.0, summarized.
- [S49] Angular, "Zoneless", v22, <https://angular.dev/guide/zoneless>, read 2026-11-13, CC BY 4.0, summarized.
- [S50] Angular, "Test requests", v22, <https://angular.dev/guide/http/testing>, read 2026-11-13, CC BY 4.0, summarized.
- [S52] Angular, "TestBed", API reference, v22, <https://angular.dev/api/core/testing/TestBed>, read 2026-11-13, CC BY 4.0, summarized.
- [S55] Angular, "Testing routing and navigation", v22, <https://angular.dev/guide/routing/testing>, read 2026-11-13, CC BY 4.0, summarized.
- [S65] Vitest, "Vi" API reference, v5.1.0, <https://vitest.dev/api/vi>, read 2026-11-13, summarized.
- [S74] A. Hora, R. Robbes, "Are Coding Agents Generating Over-Mocked Tests? An Empirical Study", MSR 2026, arXiv:2602.00409, <https://arxiv.org/html/2602.00409v1>, read 2026-11-13, summarized.
- [S82] A. Eagle, "Testing on the Toilet: Change-Detector Tests Considered Harmful", Google Testing Blog, 2015-01-27, <https://testing.googleblog.com/2015/01/testing-on-toilet-change-detector-tests.html>, read 2026-11-13, summarized.
