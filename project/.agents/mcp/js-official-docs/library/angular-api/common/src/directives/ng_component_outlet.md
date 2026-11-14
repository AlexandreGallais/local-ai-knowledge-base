# common/src/directives/ng_component_outlet

## NgComponentOutlet

```ts
export class NgComponentOutlet<T = any> implements OnChanges, DoCheck, OnDestroy
```

Instantiates a {@link /api/core/Component Component} type and inserts its Host View into the current View.
`NgComponentOutlet` provides a declarative approach for dynamic component creation.

`NgComponentOutlet` requires a component type, if a falsy value is set the view will clear and
any existing component will be destroyed.

@usageNotes

### Fine tune control

You can control the component creation process by using the following optional attributes:

* `ngComponentOutletInputs`: Optional component inputs object, which will be bind to the
component.

* `ngComponentOutletInjector`: Optional custom {@link Injector} that will be used as parent for
the Component. Defaults to the injector of the current view container.

* `ngComponentOutletEnvironmentInjector`: Optional custom {@link EnvironmentInjector} which will
provide the component's environment.

* `ngComponentOutletContent`: Optional list of projectable nodes to insert into the content
section of the component, if it exists.

* `ngComponentOutletNgModule`: Optional NgModule class reference to allow loading another
module dynamically, then loading a component from that module.


### Syntax

Simple
```html
<ng-container *ngComponentOutlet="componentTypeExpression"></ng-container>
```

With inputs
```html
<ng-container *ngComponentOutlet="componentTypeExpression;
                                  inputs: inputsExpression;">
</ng-container>
```

Customized injector/content
```html
<ng-container *ngComponentOutlet="componentTypeExpression;
                                  injector: injectorExpression;
                                  content: contentNodesExpression;">
</ng-container>
```

Customized NgModule reference
```html
<ng-container *ngComponentOutlet="componentTypeExpression;
                                  ngModule: ngModuleClass;">
</ng-container>
```

### A simple example

{@example common/ngComponentOutlet/ts/module.ts region='SimpleExample'}

A more complete example with additional options:

{@example common/ngComponentOutlet/ts/module.ts region='CompleteExample'}

@publicApi
@ngModule CommonModule

@see [Using NgComponentOutlet](guide/components/programmatic-rendering#using-ngcomponentoutlet)

## NgComponentOutlet.ngComponentOutlet

```ts
ngComponentOutlet: Type<T> | null = null
```

Component that should be rendered in the outlet.

## NgComponentOutlet.componentInstance

```ts
get componentInstance(): T | null
```

Gets the instance of the currently-rendered component.
Will be null if no component has been rendered.