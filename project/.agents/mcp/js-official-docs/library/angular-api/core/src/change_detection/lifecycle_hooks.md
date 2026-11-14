# core/src/change_detection/lifecycle_hooks

## OnChanges

```ts
export interface OnChanges
```

@description
A lifecycle hook that is called when the value of one or more component or directive inputs
change. This includes both signal-based and decorator-based inputs.
Define an `ngOnChanges()` method to handle the changes.

@see {@link DoCheck}
@see {@link OnInit}
@see [Lifecycle hooks guide](guide/components/lifecycle)

@usageNotes
The following snippet shows how a component can implement this interface to
define an on-changes handler for an input property. While you should prefer
`computed` and `effect` when working with signal-based inputs, the `ngOnChanges`
method does include value changes for signal-based inputs.

```ts
@Component({ ... })
export class UserProfile implements OnChanges {
  userId = input<number>(0);
  ngOnChanges(changes: SimpleChanges<UserProfile>) {
    // changes.userId contains the old and new value.
  }
}
```

@publicApi

## OnChanges.ngOnChanges

```ts
ngOnChanges(changes: SimpleChanges): void
```

A callback method that is invoked immediately after the
default change detector has checked data-bound properties
if at least one has changed, and before the view and content
children are checked.
@param changes The changed properties.

## OnInit

```ts
export interface OnInit
```

@description
A lifecycle hook that is called after Angular has initialized
all data-bound properties of a directive.
Define an `ngOnInit()` method to handle any additional initialization tasks.

@see {@link AfterContentInit}
@see [Lifecycle hooks guide](guide/components/lifecycle)

@usageNotes
The following snippet shows how a component can implement this interface to
define its own initialization method.

{@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnInit'}

@publicApi

## OnInit.ngOnInit

```ts
ngOnInit(): void
```

A callback method that is invoked immediately after the
default change detector has checked the directive's
data-bound properties for the first time,
and before any of the view or content children have been checked.
It is invoked only once when the directive is instantiated.

## DoCheck

```ts
export interface DoCheck
```

A lifecycle hook that invokes a custom change-detection function for a directive,
in addition to the check performed by the default change-detector on the input
bindings for this directive usage in the parent template. Note that this hook is
invoked even when the directive's own change detection is skipped (e.g., with
the `OnPush` change detection strategy). Developers might use this hook to
implement a custom change detection strategy for some of the inputs.

The default change-detection algorithm looks for differences by comparing
bound-property values by reference across change detection runs. You can use this
hook to check for and respond to changes by some other means.

When the default change detector detects changes to the directive's input bindings,
it invokes `ngOnChanges()` if supplied, regardless of whether you perform
additional change detection.
Typically, you should not use both `DoCheck` and `OnChanges` to respond to
changes on the same input.

@see {@link OnChanges}
@see [Lifecycle hooks guide](guide/components/lifecycle)

@usageNotes
The following snippet shows how a component can implement this interface
to invoke it own change-detection cycle.

{@example core/ts/metadata/lifecycle_hooks_spec.ts region='DoCheck'}

@publicApi

## DoCheck.ngDoCheck

```ts
ngDoCheck(): void
```

A callback method that performs change-detection, invoked
after the default change-detector has checked the directive's input
bindings in the parent template.
See `KeyValueDiffers` and `IterableDiffers` for implementing
custom change checking for collections.

## OnDestroy

```ts
export interface OnDestroy
```

A lifecycle hook that is called when a directive, pipe, or service is destroyed.
Use for any custom cleanup that needs to occur when the
instance is destroyed.
@see [Lifecycle hooks guide](guide/components/lifecycle)

@usageNotes
The following snippet shows how a component can implement this interface
to define its own custom clean-up method.

{@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnDestroy'}

@publicApi

## OnDestroy.ngOnDestroy

```ts
ngOnDestroy(): void
```

A callback method that performs custom clean-up, invoked immediately
before a directive, pipe, or service instance is destroyed.

## AfterContentInit

```ts
export interface AfterContentInit
```

@description
A lifecycle hook that is called after Angular has fully initialized
all content of a directive. It will run only once when the projected content is initialized.
Define an `ngAfterContentInit()` method to handle any additional initialization tasks.

@see {@link OnInit}
@see {@link AfterViewInit}
@see [Lifecycle hooks guide](guide/components/lifecycle)

@usageNotes
The following snippet shows how a component can implement this interface to
define its own content initialization method.

{@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterContentInit'}

@publicApi

## AfterContentInit.ngAfterContentInit

```ts
ngAfterContentInit(): void
```

A callback method that is invoked immediately after
Angular has completed initialization of all of the directive's
content.
It is invoked only once when the directive is instantiated.

## AfterContentChecked

```ts
export interface AfterContentChecked
```

@description
A lifecycle hook that is called after the default change detector has
completed checking all content of a directive. It will run after the content
has been checked and most of the time it's during a change detection cycle.

@see {@link AfterViewChecked}
@see [Lifecycle hooks guide](guide/components/lifecycle)

@usageNotes
The following snippet shows how a component can implement this interface to
define its own after-check functionality.

{@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterContentChecked'}

@publicApi

## AfterContentChecked.ngAfterContentChecked

```ts
ngAfterContentChecked(): void
```

A callback method that is invoked immediately after the
default change detector has completed checking all of the directive's
content.

## AfterViewInit

```ts
export interface AfterViewInit
```

@description
A lifecycle hook that is called after Angular has fully initialized
a component's view.
Define an `ngAfterViewInit()` method to handle any additional initialization tasks.

@see {@link OnInit}
@see {@link AfterContentInit}
@see [Lifecycle hooks guide](guide/components/lifecycle)

@usageNotes
The following snippet shows how a component can implement this interface to
define its own view initialization method.

{@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterViewInit'}

@publicApi

## AfterViewInit.ngAfterViewInit

```ts
ngAfterViewInit(): void
```

A callback method that is invoked immediately after
Angular has completed initialization of a component's view.
It is invoked only once when the view is instantiated.

## AfterViewChecked

```ts
export interface AfterViewChecked
```

@description
A lifecycle hook that is called after the default change detector has
completed checking a component's view for changes.

@see {@link AfterContentChecked}
@see [Lifecycle hooks guide](guide/components/lifecycle)

@usageNotes
The following snippet shows how a component can implement this interface to
define its own after-check functionality.

{@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterViewChecked'}

@publicApi

## AfterViewChecked.ngAfterViewChecked

```ts
ngAfterViewChecked(): void
```

A callback method that is invoked immediately after the
default change detector has completed one change-check cycle
for a component's view.