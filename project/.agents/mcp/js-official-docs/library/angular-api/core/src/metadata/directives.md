# core/src/metadata/directives

## DirectiveDecorator

```ts
export interface DirectiveDecorator
```

Type of the Directive decorator / constructor function.
@publicApi

## DirectiveDecorator.new

```ts
new (obj?: Directive): Directive
```

See the `Directive` decorator.

## Directive

```ts
export interface Directive
```

Directive decorator and metadata.

@see [Built-in directives](guide/directives)
@see [Including inputs and outputs](guide/directives/directive-composition-api#including-inputs-and-outputs)
@see [Assigning a reference to an Angular directive](guide/templates/variables#assigning-a-reference-to-an-angular-directive)
@see [Referencing component children with queries](guide/components/queries)
@see [Binding to the host element](guide/components/host-elements#binding-to-the-host-element)
@see [Host directive semantics](guide/directives/directive-composition-api#host-directive-semantics)
@Annotation
@publicApi

## Directive.selector

```ts
selector?: string
```

The CSS selector that identifies this directive in a template
and triggers instantiation of the directive.

Declare as one of the following:

- `element-name`: Select by element name.
- `.class`: Select by class name.
- `[attribute]`: Select by attribute name.
- `[attribute=value]`: Select by attribute name and value.
- `:not(sub_selector)`: Select only if the element does not match the `sub_selector`.
- `selector1, selector2`: Select if either `selector1` or `selector2` matches.

Angular only allows directives to apply on CSS selectors that do not cross
element boundaries.

For the following template HTML, a directive with an `input[type=text]` selector,
would be instantiated only on the `<input type="text">` element.

```html
<form>
  <input type="text">
  <input type="radio">
<form>
```

## Directive.inputs

```ts
inputs?: ( |
```

Enumerates the set of data-bound input properties for a directive

Angular automatically updates input properties during change detection.
The `inputs` property accepts either strings or object literals that configure the directive
properties that should be exposed as inputs.

When an object literal is passed in, the `name` property indicates which property on the
class the input should write to, while the `alias` determines the name under
which the input will be available in template bindings. The `required` property indicates that
the input is required which will trigger a compile-time error if it isn't passed in when the
directive is used.

When a string is passed into the `inputs` array, it can have a format of `'name'` or
`'name: alias'` where `name` is the property on the class that the directive should write
to, while the `alias` determines the name under which the input will be available in
template bindings. String-based input definitions are assumed to be optional.

@usageNotes

The following example creates a component with two data-bound properties.

```ts
@Component({
  selector: 'bank-account',
  inputs: ['bankName', {name: 'id', alias: 'account-id'}],
  template: `
    Bank Name: {{bankName}}
    Account Id: {{id}}
  `
})
class BankAccount {
  bankName: string;
  id: string;
}
```

## Directive.outputs

```ts
outputs?: string[]
```

Enumerates the set of event-bound output properties.

When an output property emits an event, an event handler attached to that event
in the template is invoked.

The `outputs` property defines a set of `directiveProperty` to `alias`
configuration:

- `directiveProperty` specifies the component property that emits events.
- `alias` specifies the DOM property the event handler is attached to.

@usageNotes

```ts
@Component({
  selector: 'child-dir',
  outputs: [ 'bankNameChange' ],
  template: `<input (input)="bankNameChange.emit($event.target.value)" />`
})
class ChildDir {
 bankNameChange: EventEmitter<string> = new EventEmitter<string>();
}

@Component({
  selector: 'main',
  template: `
    {{ bankName }} <child-dir (bankNameChange)="onBankNameChange($event)"></child-dir>
  `
})
class MainComponent {
 bankName: string;

  onBankNameChange(bankName: string) {
    this.bankName = bankName;
  }
}
```

## Directive.providers

```ts
providers?: Provider[]
```

Configures the injector of this
directive or component with a token
that maps to a provider of a dependency.

## Directive.exportAs

```ts
exportAs?: string
```

Defines the name that can be used in the template to assign this directive to a variable.

@usageNotes

```ts
@Directive({
  selector: 'child-dir',
  exportAs: 'child'
})
class ChildDir {
}

@Component({
  selector: 'main',
  template: `<child-dir #c="child"></child-dir>`
})
class MainComponent {
}
```

## Directive.queries

```ts
queries?: {[key: string]: any}
```

Configures the queries that will be injected into the directive.

Content queries are set before the `ngAfterContentInit` callback is called.
View queries are set before the `ngAfterViewInit` callback is called.

@usageNotes

The following example shows how queries are defined
and when their results are available in lifecycle hooks:

```ts
@Component({
  selector: 'someDir',
  queries: {
    contentChildren: new ContentChildren(ChildDirective),
    viewChildren: new ViewChildren(ChildDirective)
  },
  template: '<child-directive></child-directive>'
})
class SomeDir {
  contentChildren: QueryList<ChildDirective>,
  viewChildren: QueryList<ChildDirective>

  ngAfterContentInit() {
    // contentChildren is set
  }

  ngAfterViewInit() {
    // viewChildren is set
  }
}
```

@Annotation

## Directive.host

```ts
host?: {[key: string]: string}
```

Maps class properties to host element bindings for properties,
attributes, and events, using a set of key-value pairs.

Angular automatically checks host property bindings during change detection.
If a binding changes, Angular updates the directive's host element.

When the key is a property of the host element, the property value is
propagated to the specified DOM property.

When the key is a static attribute in the DOM, the attribute value
is propagated to the specified property in the host element.

For event handling:
- The key is the DOM event that the directive listens to.
 The global target names that can be used to prefix an event name are
`document:`, `window:` and `body:`.

- The value is the statement to execute when the event occurs. If the
statement evaluates to `false`, then `preventDefault` is applied on the DOM
event. A handler method can refer to the `$event` local variable.

## Directive.jit

```ts
jit?: true
```

When present, this directive/component is ignored by the AOT compiler.
It remains in distributed code, and the JIT compiler attempts to compile it
at run time, in the browser.
To ensure the correct behavior, the app must import `@angular/compiler`.

## Directive.standalone

```ts
standalone?: boolean
```

Set `standalone` to `false` if you want to import the directive into an NgModule.

## Directive.hostDirectives

```ts
hostDirectives?: ( | Type<unknown> |
```

Standalone directives that should be applied to the host whenever the directive is matched.
By default, none of the inputs or outputs of the host directives will be available on the host,
unless they are specified in the `inputs` or `outputs` properties.

You can additionally alias inputs and outputs by putting a colon and the alias after the
original input or output name. For example, if a directive applied via `hostDirectives`
defines an input named `menuDisabled`, you can alias this to `disabled` by adding
`'menuDisabled: disabled'` as an entry to `inputs`.

## Directive

```ts
export const Directive: DirectiveDecorator = makeDecorator( 'Directive', (dir: Directive = {})
```

Type of the Directive metadata.

@publicApi

## ComponentDecorator

```ts
export interface ComponentDecorator
```

Component decorator interface

@publicApi

## ComponentDecorator.new

```ts
new (obj: Component): Component
```

See the `Component` decorator.

## Component

```ts
export interface Component extends Directive
```

Supplies configuration metadata for an Angular component.

@see [Anatomy of a component](guide/components)
@see [ChangeDetectionStrategy](guide/components/advanced-configuration#changedetectionstrategy)
@see [Using the viewProviders array](guide/di/hierarchical-dependency-injection#using-the-viewproviders-array)
@see [Style scoping](guide/components/styling#style-scoping)

@publicApi

## Component.changeDetection

```ts
changeDetection?: ChangeDetectionStrategy
```

The change-detection strategy to use for this component.

When a component is instantiated, Angular creates a change detector,
which is responsible for propagating the component's bindings.
The strategy is one of:
- `ChangeDetectionStrategy#OnPush` sets the strategy to `CheckOnce` (on demand).
- `ChangeDetectionStrategy#Eager` sets the strategy to `CheckAlways`.

NOTE: OnPush is enabled by default.

## Component.viewProviders

```ts
viewProviders?: Provider[]
```

Defines the set of injectable objects that are visible to its view DOM children.
See [example](#injecting-a-class-with-a-view-provider).

## Component.templateUrl

```ts
templateUrl?: string
```

The relative path or absolute URL of a template file for an Angular component.
If provided, do not supply an inline template using `template`.

## Component.template

```ts
template?: string
```

An inline template for an Angular component. If provided,
do not supply a template file using `templateUrl`.

## Component.styleUrl

```ts
styleUrl?: string
```

One relative path or an absolute URL for file containing a CSS stylesheet to use
in this component.

## Component.styleUrls

```ts
styleUrls?: string[]
```

Relative paths or absolute URLs for files containing CSS stylesheets to use in this component.

## Component.styles

```ts
styles?: string | string[]
```

One or more inline CSS stylesheets to use
in this component.

## Component.animations

```ts
animations?: any[]
```

One or more animation `trigger()` calls, containing
[`state()`](api/animations/state) and `transition()` definitions.
See the [Animations guide](guide/animations) and animations API documentation.

@deprecated 20.2 Use `animate.enter` or `animate.leave` instead. Intent to remove in v23

## Component.encapsulation

```ts
encapsulation?: ViewEncapsulation
```

An encapsulation policy for the component's styling.
Possible values:
- `ViewEncapsulation.Emulated`: Apply modified component styles in order to emulate
                                a native Shadow DOM CSS encapsulation behavior.
- `ViewEncapsulation.None`: Apply component styles globally without any sort of encapsulation.
- `ViewEncapsulation.ShadowDom`: Use the browser's native Shadow DOM API to encapsulate styles.

If not supplied, the value is taken from the `CompilerOptions`
which defaults to `ViewEncapsulation.Emulated`.

If the policy is `ViewEncapsulation.Emulated` and the component has no
{@link Component#styles styles} nor {@link Component#styleUrls styleUrls},
the policy is automatically switched to `ViewEncapsulation.None`.

## Component.preserveWhitespaces

```ts
preserveWhitespaces?: boolean
```

True to preserve or false to remove potentially superfluous whitespace characters
from the compiled template. Whitespace characters are those matching the `\s`
character class in JavaScript regular expressions. Default is false, unless
overridden in compiler options.

## Component.standalone

```ts
standalone?: boolean
```

Set `standalone` to `false` if you want to import the directive into an NgModule.

## Component.imports

```ts
imports?: (Type<any> | ReadonlyArray<any>)[]
```

The imports property specifies the standalone component's template dependencies — those
directives, components, and pipes that can be used within its template. Standalone components
can import other standalone components, directives, and pipes as well as existing NgModules.

This property is only available for standalone components - specifying it for components
declared in an NgModule generates a compilation error.

## Component.schemas

```ts
schemas?: SchemaMetadata[]
```

The set of schemas that declare elements to be allowed in a standalone component. Elements and
properties that are neither Angular components nor directives must be declared in a schema.

This property is only available for standalone components - specifying it for components
declared in an NgModule generates a compilation error.

## Component

```ts
export const Component: ComponentDecorator = makeDecorator( 'Component', // g3-only (c: Component = {})
```

Component decorator and metadata.

@Annotation
@publicApi

## PipeDecorator

```ts
export interface PipeDecorator
```

Type of the Pipe decorator / constructor function.

@publicApi

## PipeDecorator.new

```ts
new (obj: Pipe): Pipe
```

See the `Pipe` decorator.

## Pipe

```ts
export interface Pipe
```

Type of the Pipe metadata.

@publicApi

## Pipe.name

```ts
name: string
```

The pipe name to use in template bindings.
Typically uses lowerCamelCase
because the name cannot contain hyphens.

## Pipe.pure

```ts
pure?: boolean
```

When true, the pipe is pure, meaning that the
`transform()` method is invoked only when its input arguments
change. Pipes are pure by default.

If the pipe has internal state (that is, the result
depends on state other than its arguments), set `pure` to false.
In this case, the pipe is invoked on each change-detection cycle,
even if the arguments have not changed.

## Pipe.standalone

```ts
standalone?: boolean
```

Angular pipes marked as `standalone` do not need to be declared in an NgModule. Such
pipes don't depend on any "intermediate context" of an NgModule (ex. configured providers).

## Pipe

```ts
export const Pipe: PipeDecorator = makeDecorator( 'Pipe', (p: Pipe)
```

@Annotation
@publicApi

## InputDecorator

```ts
export interface InputDecorator
```

@publicApi

## Input

```ts
export interface Input
```

Type of metadata for an `Input` property.

@publicApi

## Input.alias

```ts
alias?: string
```

The name of the DOM property to which the input property is bound.

## Input.required

```ts
required?: boolean
```

Whether the input is required for the directive to function.

## Input.transform

```ts
transform?: (value: any)
```

Function with which to transform the input value before assigning it to the directive instance.

## Input

```ts
export const Input: InputDecorator = makePropDecorator( 'Input', (arg?: string | {alias?: string
```

@Annotation
@publicApi

## OutputDecorator

```ts
export interface OutputDecorator
```

Type of the Output decorator / constructor function.

@publicApi

## Output

```ts
export interface Output
```

Type of the Output metadata.

@publicApi

## Output.alias

```ts
alias?: string
```

The name of the DOM property to which the output property is bound.

## Output

```ts
export const Output: OutputDecorator = makePropDecorator('Output', (alias?: string)
```

@Annotation
@publicApi

## HostBindingDecorator

```ts
export interface HostBindingDecorator
```

Type of the HostBinding decorator / constructor function.

@publicApi

## HostBinding

```ts
export interface HostBinding
```

Type of the HostBinding metadata.

@publicApi

## HostBinding.hostPropertyName

```ts
hostPropertyName?: string
```

The DOM property that is bound to a data property.
This field also accepts:
  * classes, prefixed by `class.`
  * styles, prefixed by `style.`
  * attributes, prefixed by `attr.`

## HostBinding

```ts
export const HostBinding: HostBindingDecorator = makePropDecorator( 'HostBinding', (hostPropertyName?: string)
```

@Annotation
@publicApi

## HostListenerDecorator

```ts
export interface HostListenerDecorator
```

Type of the HostListener decorator / constructor function.

@publicApi

## HostListener

```ts
export interface HostListener
```

Type of the HostListener metadata.

@publicApi

## HostListener.eventName

```ts
eventName?: string
```

The DOM event to listen for.

## HostListener.args

```ts
args?: string[]
```

A set of arguments to pass to the handler method when the event occurs.

## HostListener

```ts
export const HostListener: HostListenerDecorator = makePropDecorator( 'HostListener', (eventName?: string, args?: string[])
```

@Annotation
@publicApi