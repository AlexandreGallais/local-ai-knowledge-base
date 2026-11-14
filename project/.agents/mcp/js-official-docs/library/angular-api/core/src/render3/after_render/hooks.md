# core/src/render3/after_render/hooks

## AfterRenderOptions

```ts
export interface AfterRenderOptions
```

Options passed to `afterEveryRender` and `afterNextRender`.

@publicApi 20.0

## AfterRenderOptions.injector

```ts
injector?: Injector
```

The `Injector` to use during creation.

If this is not provided, the current injection context will be used instead (via `inject`).

## AfterRenderOptions.manualCleanup

```ts
manualCleanup?: boolean
```

Whether the hook should require manual cleanup.

If this is `false` (the default) the hook will automatically register itself to be cleaned up
with the current `DestroyRef`.

## afterEveryRender

```ts
export function afterEveryRender<E = never, W = never, M = never>( spec:
```

Register callbacks to be invoked each time the application finishes rendering, during the
specified phases. The available phases are:
- `earlyRead`
  Use this phase to **read** from the DOM before a subsequent `write` callback, for example to
  perform custom layout that the browser doesn't natively support. Prefer the `read` phase if
  reading can wait until after the write phase. **Never** write to the DOM in this phase.
- `write`
   Use this phase to **write** to the DOM. **Never** read from the DOM in this phase.
- `mixedReadWrite`
   Use this phase to read from and write to the DOM simultaneously. **Never** use this phase if
   it is possible to divide the work among the other phases instead.
- `read`
   Use this phase to **read** from the DOM. **Never** write to the DOM in this phase.

<div class="docs-alert docs-alert-critical">

You should prefer using the `read` and `write` phases over the `earlyRead` and `mixedReadWrite`
phases when possible, to avoid performance degradation.

</div>

Note that:
- Callbacks run in the following phase order *after each render*:
  1. `earlyRead`
  2. `write`
  3. `mixedReadWrite`
  4. `read`
- Callbacks in the same phase run in the order they are registered.
- Callbacks run on browser platforms only, they will not run on the server.

The first phase callback to run as part of this spec will receive no parameters. Each
subsequent phase callback in this spec will receive the return value of the previously run
phase callback as a parameter. This can be used to coordinate work across multiple phases.

Angular is unable to verify or enforce that phases are used correctly, and instead
relies on each developer to follow the guidelines documented for each value and
carefully choose the appropriate one, refactoring their code if necessary. By doing
so, Angular is better able to minimize the performance degradation associated with
manual DOM access, ensuring the best experience for the end users of your application
or library.

<div class="docs-alert docs-alert-important">

Components are not guaranteed to be [hydrated](guide/hydration) before the callback runs.
You must use caution when directly reading or writing the DOM and layout.

</div>

@param spec The callback functions to register
@param options Options to control the behavior of the callback

@usageNotes

Use `afterEveryRender` to read or write the DOM after each render.

### Example
```angular-ts
@Component({
  selector: 'my-cmp',
  template: `<span #content>{{ ... }}</span>`,
})
export class MyComponent {
  contentRef = viewChild.required<ElementRef>('content');

  constructor() {
    afterEveryRender({
      read: () => {
        console.log('content height: ' + this.contentRef().nativeElement.scrollHeight);
      }
    });
  }
}
```

@see [afterEveryRender and afterNextRender](guide/components/lifecycle#aftereveryrender-and-afternextrender)

@publicApi 20.0

## afterEveryRender

```ts
export function afterEveryRender( callback: VoidFunction, options?: AfterRenderOptions, ): AfterRenderRef
```

Register a callback to be invoked each time the application finishes rendering, during the
`mixedReadWrite` phase.

<div class="docs-alert docs-alert-critical">

You should prefer specifying an explicit phase for the callback instead, or you risk significant
performance degradation.

</div>

Note that the callback will run
- in the order it was registered
- once per render
- on browser platforms only
- during the `mixedReadWrite` phase

<div class="docs-alert docs-alert-important">

Components are not guaranteed to be [hydrated](guide/hydration) before the callback runs.
You must use caution when directly reading or writing the DOM and layout.

</div>

@param callback A callback function to register
@param options Options to control the behavior of the callback

@usageNotes

Use `afterEveryRender` to read or write the DOM after each render.

### Example
```angular-ts
@Component({
  selector: 'my-cmp',
  template: `<span #content>{{ ... }}</span>`,
})
export class MyComponent {
  contentRef = viewChild.required<ElementRef>('content');

  constructor() {
    afterEveryRender({
      read: () => {
        console.log('content height: ' + this.contentRef().nativeElement.scrollHeight);
      }
    });
  }
}
```

@publicApi 20.0

## afterNextRender

```ts
export function afterNextRender<E = never, W = never, M = never>( spec:
```

Register callbacks to be invoked the next time the application finishes rendering, during the
specified phases. The available phases are:
- `earlyRead`
  Use this phase to **read** from the DOM before a subsequent `write` callback, for example to
  perform custom layout that the browser doesn't natively support. Prefer the `read` phase if
  reading can wait until after the write phase. **Never** write to the DOM in this phase.
- `write`
   Use this phase to **write** to the DOM. **Never** read from the DOM in this phase.
- `mixedReadWrite`
   Use this phase to read from and write to the DOM simultaneously. **Never** use this phase if
   it is possible to divide the work among the other phases instead.
- `read`
   Use this phase to **read** from the DOM. **Never** write to the DOM in this phase.

<div class="docs-alert docs-alert-critical">

You should prefer using the `read` and `write` phases over the `earlyRead` and `mixedReadWrite`
phases when possible, to avoid performance degradation.

</div>

Note that:
- Callbacks run in the following phase order *once, after the next render*:
  1. `earlyRead`
  2. `write`
  3. `mixedReadWrite`
  4. `read`
- Callbacks in the same phase run in the order they are registered.
- Callbacks run on browser platforms only, they will not run on the server.

The first phase callback to run as part of this spec will receive no parameters. Each
subsequent phase callback in this spec will receive the return value of the previously run
phase callback as a parameter. This can be used to coordinate work across multiple phases.

Angular is unable to verify or enforce that phases are used correctly, and instead
relies on each developer to follow the guidelines documented for each value and
carefully choose the appropriate one, refactoring their code if necessary. By doing
so, Angular is better able to minimize the performance degradation associated with
manual DOM access, ensuring the best experience for the end users of your application
or library.

<div class="docs-alert docs-alert-important">

Components are not guaranteed to be [hydrated](guide/hydration) before the callback runs.
You must use caution when directly reading or writing the DOM and layout.

</div>

@param spec The callback functions to register
@param options Options to control the behavior of the callback

@usageNotes

Use `afterNextRender` to read or write the DOM once,
for example to initialize a non-Angular library.

### Example
```angular-ts
@Component({
  selector: 'my-chart-cmp',
  template: `<div #chart>{{ ... }}</div>`,
})
export class MyChartCmp {
  chartRef = viewChild.required<ElementRef>('chart');
  chart: MyChart|null;

  constructor() {
    afterNextRender({
      write: () => {
        this.chart = new MyChart(this.chartRef().nativeElement);
      }
    });
  }
}
```

@publicApi 20.0
@see [afterEveryRender and afterNextRender](guide/components/lifecycle#aftereveryrender-and-afternextrender)

## afterNextRender

```ts
export function afterNextRender( callback: VoidFunction, options?: AfterRenderOptions, ): AfterRenderRef
```

Register a callback to be invoked the next time the application finishes rendering, during the
`mixedReadWrite` phase.

<div class="docs-alert docs-alert-critical">

You should prefer specifying an explicit phase for the callback instead, or you risk significant
performance degradation.

</div>

Note that the callback will run
- in the order it was registered
- on browser platforms only
- during the `mixedReadWrite` phase

<div class="docs-alert docs-alert-important">

Components are not guaranteed to be [hydrated](guide/hydration) before the callback runs.
You must use caution when directly reading or writing the DOM and layout.

</div>

@param callback A callback function to register
@param options Options to control the behavior of the callback

@usageNotes

Use `afterNextRender` to read or write the DOM once,
for example to initialize a non-Angular library.

### Example
```angular-ts
@Component({
  selector: 'my-chart-cmp',
  template: `<div #chart>{{ ... }}</div>`,
})
export class MyChartCmp {
  chartRef = viewChild.required<ElementRef>('chart');
  chart: MyChart|null;

  constructor() {
    afterNextRender({
      write: () => {
        this.chart = new MyChart(this.chartRef().nativeElement);
      }
    });
  }
}
```

@publicApi 20.0