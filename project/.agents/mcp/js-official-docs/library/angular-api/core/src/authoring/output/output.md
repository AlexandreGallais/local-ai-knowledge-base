# core/src/authoring/output/output

## OutputOptions

```ts
export interface OutputOptions
```

Options for declaring an output.

@see [Customizing output names](guide/components/outputs#customizing-output-names)

@publicApi 19.0

## output

```ts
export function output<T = void>(opts?: OutputOptions): OutputEmitterRef<T>
```

The `output` function allows declaration of Angular outputs in
directives and components.

You can use outputs to emit values to parent directives and component.
Parents can subscribe to changes via:

- template event bindings. For example, `(myOutput)="doSomething($event)"`
- programmatic subscription by using `OutputRef#subscribe`.

@usageNotes

To use `output()`, import the function from `@angular/core`.

```ts
import {output} from '@angular/core';
```

Inside your component, introduce a new class member and initialize
it with a call to `output`.

```ts
@Directive({
  ...
})
export class MyDir {
  nameChange = output<string>();    // OutputEmitterRef<string>
  onClick    = output();            // OutputEmitterRef<void>
}
```

You can emit values to consumers of your directive, by using
the `emit` method from `OutputEmitterRef`.

```ts
updateName(newName: string): void {
  this.nameChange.emit(newName);
}
```

@see [Custom events with outputs](guide/components/outputs#customizing-output-names)

@initializerApiFunction {"showTypesInSignaturePreview": true}
@publicApi 19.0