# router/testing/src/router_testing_harness

## RouterTestingHarness

```ts
export class RouterTestingHarness
```

A testing harness for the `Router` to reduce the boilerplate needed to test routes and routed
components.

@publicApi

## RouterTestingHarness.create

```ts
static async create(initialUrl?: string): Promise<RouterTestingHarness>
```

Creates a `RouterTestingHarness` instance.

The `RouterTestingHarness` also creates its own root component with a `RouterOutlet` for the
purposes of rendering route components.

Throws an error if an instance has already been created.
Use of this harness also requires `destroyAfterEach: true` in the `ModuleTeardownOptions`

@param initialUrl The target of navigation to trigger before returning the harness.

## RouterTestingHarness.fixture

```ts
public readonly fixture: ComponentFixture<{routerOutletData: WritableSignal<unknown>}>
```

Fixture of the root component of the RouterTestingHarness

## RouterTestingHarness.detectChanges

```ts
detectChanges(): void
```

Instructs the root fixture to run change detection.

## RouterTestingHarness.routeDebugElement

```ts
get routeDebugElement(): DebugElement | null
```

The `DebugElement` of the `RouterOutlet` component. `null` if the outlet is not activated.

## RouterTestingHarness.routeNativeElement

```ts
get routeNativeElement(): HTMLElement | null
```

The native element of the `RouterOutlet` component. `null` if the outlet is not activated.

## RouterTestingHarness.navigateByUrl

```ts
async navigateByUrl(url: string): Promise<null | {}>
```

Triggers a `Router` navigation and waits for it to complete.

The root component with a `RouterOutlet` created for the harness is used to render `Route`
components. The root component is reused within the same test in subsequent calls to
`navigateForTest`.

When testing `Routes` with a guards that reject the navigation, the `RouterOutlet` might not be
activated and the `activatedComponent` may be `null`.

{@example router/testing/test/router_testing_harness_examples.spec.ts region='Guard'}

@param url The target of the navigation. Passed to `Router.navigateByUrl`.
@returns The activated component instance of the `RouterOutlet` after navigation completes
    (`null` if the outlet does not get activated).

## RouterTestingHarness.navigateByUrl

```ts
async navigateByUrl<T>(url: string, requiredRoutedComponentType: Type<T>): Promise<T>
```

Triggers a router navigation and waits for it to complete.

The root component with a `RouterOutlet` created for the harness is used to render `Route`
components.

{@example router/testing/test/router_testing_harness_examples.spec.ts region='RoutedComponent'}

The root component is reused within the same test in subsequent calls to `navigateByUrl`.

This function also makes it easier to test components that depend on `ActivatedRoute` data.

{@example router/testing/test/router_testing_harness_examples.spec.ts region='ActivatedRoute'}

@param url The target of the navigation. Passed to `Router.navigateByUrl`.
@param requiredRoutedComponentType After navigation completes, the required type for the
    activated component of the `RouterOutlet`. If the outlet is not activated or a different
    component is activated, this function will throw an error.
@returns The activated component instance of the `RouterOutlet` after navigation completes.