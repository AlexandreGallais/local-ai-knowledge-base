# common/src/directives/ng_switch

## NgSwitch

```ts
export class NgSwitch
```

@ngModule CommonModule

@description
The `[ngSwitch]` directive on a container specifies an expression to match against.
The expressions to match are provided by `ngSwitchCase` directives on views within the container.
- Every view that matches is rendered.
- If there are no matches, a view with the `ngSwitchDefault` directive is rendered.
- Elements within the `[NgSwitch]` statement but outside of any `NgSwitchCase`
or `ngSwitchDefault` directive are preserved at the location.

@usageNotes
Define a container element for the directive, and specify the switch expression
to match against as an attribute:

```html
<container-element [ngSwitch]="switch_expression">
```

Within the container, `*ngSwitchCase` statements specify the match expressions
as attributes. Include `*ngSwitchDefault` as the final case.

```html
<container-element [ngSwitch]="switch_expression">
   <some-element *ngSwitchCase="match_expression_1">...</some-element>
...
   <some-element *ngSwitchDefault>...</some-element>
</container-element>
```

### Usage Examples

The following example shows how to use more than one case to display the same view:

```html
<container-element [ngSwitch]="switch_expression">
  <!-- the same view can be shown in more than one case -->
  <some-element *ngSwitchCase="match_expression_1">...</some-element>
  <some-element *ngSwitchCase="match_expression_2">...</some-element>
  <some-other-element *ngSwitchCase="match_expression_3">...</some-other-element>
  <!--default case when there are no matches -->
  <some-element *ngSwitchDefault>...</some-element>
</container-element>
```

The following example shows how cases can be nested:
```html
<container-element [ngSwitch]="switch_expression">
      <some-element *ngSwitchCase="match_expression_1">...</some-element>
      <some-element *ngSwitchCase="match_expression_2">...</some-element>
      <some-other-element *ngSwitchCase="match_expression_3">...</some-other-element>
      <ng-container *ngSwitchCase="match_expression_3">
        <!-- use a ng-container to group multiple root nodes -->
        <inner-element></inner-element>
        <inner-other-element></inner-other-element>
      </ng-container>
      <some-element *ngSwitchDefault>...</some-element>
    </container-element>
```

@publicApi
@see {@link NgSwitchCase}
@see {@link NgSwitchDefault}
@see [Structural Directives](guide/directives/structural-directives)

@deprecated 20.0
Use the `@switch` block instead. Intent to remove in a future major release

## NgSwitch.ngSwitch

```ts
set ngSwitch(newValue: any)
```

@deprecated Use the `@switch` block instead. Intent to remove in a future major release

## NgSwitchCase

```ts
export class NgSwitchCase implements DoCheck
```

@ngModule CommonModule

@description
Provides a switch case expression to match against an enclosing `ngSwitch` expression.
When the expressions match, the given `NgSwitchCase` template is rendered.
If multiple match expressions match the switch expression value, all of them are displayed.

@usageNotes

Within a switch container, `*ngSwitchCase` statements specify the match expressions
as attributes. Include `*ngSwitchDefault` as the final case.

```html
<container-element [ngSwitch]="switch_expression">
  <some-element *ngSwitchCase="match_expression_1">...</some-element>
  ...
  <some-element *ngSwitchDefault>...</some-element>
</container-element>
```

Each switch-case statement contains an in-line HTML template or template reference
that defines the subtree to be selected if the value of the match expression
matches the value of the switch expression.

As of Angular v17 the NgSwitch directive uses strict equality comparison (`===`) instead of
loose equality (`==`) to match different cases.

@publicApi
@see {@link NgSwitch}
@see {@link NgSwitchDefault}

@deprecated 20.0
Use the `@case` block within a `@switch` block instead. Intent to remove in a future major release

## NgSwitchCase.ngSwitchCase

```ts
ngSwitchCase: any
```

Stores the HTML template to be selected on match.
@deprecated Use the `@case` block within a `@switch` block instead. Intent to remove in a future major release

## NgSwitchDefault

```ts
export class NgSwitchDefault
```

@ngModule CommonModule

@description

Creates a view that is rendered when no `NgSwitchCase` expressions
match the `NgSwitch` expression.
This statement should be the final case in an `NgSwitch`.

@publicApi
@see {@link NgSwitch}
@see {@link NgSwitchCase}

@deprecated 20.0
Use the `@default` block within a `@switch` block instead. Intent to remove in a future major release