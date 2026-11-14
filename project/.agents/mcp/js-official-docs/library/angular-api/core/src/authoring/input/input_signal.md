# core/src/authoring/input/input_signal

## InputOptionsWithoutTransform

```ts
export type InputOptionsWithoutTransform<T> = // Note: We still keep a notion of `transform` for auto-completion. Omit<InputOptions<T, T>, 'transform'> & {transform?: undefined}
```

Signal input options without the transform option.

@publicApi 19.0

## InputSignalWithTransform

```ts
export interface InputSignalWithTransform<T, TransformT> extends Signal<T>
```

`InputSignalWithTransform` represents a special `Signal` for a
directive/component input with a `transform` function.

Signal inputs with transforms capture an extra generic for their transform write
type. Transforms can expand the accepted bound values for an input while ensuring
value retrievals of the signal input are still matching the generic input type.

```ts
class MyDir {
  disabled = input(false, {
    transform: (v: string|boolean) => convertToBoolean(v),
  }); // InputSignalWithTransform<boolean, string|boolean>

  click() {
    this.disabled() // always returns a `boolean`.
  }
}
```

@see {@link InputSignal} for additional information.

@publicApi 19.0

## InputSignal

```ts
export interface InputSignal<T> extends InputSignalWithTransform<T, T> {}
```

`InputSignal` represents a special `Signal` for a directive/component input.

An input signal is similar to a non-writable signal except that it also
carries additional type-information for transforms, and that Angular internally
updates the signal whenever a new value is bound.

@see {@link InputOptionsWithTransform} for inputs with transforms.

@publicApi 19.0