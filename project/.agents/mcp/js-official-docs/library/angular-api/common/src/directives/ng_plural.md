# common/src/directives/ng_plural

## NgPlural

```ts
export class NgPlural
```

@ngModule CommonModule

@usageNotes
```html
<some-element [ngPlural]="value">
  <ng-template ngPluralCase="=0">there is nothing</ng-template>
  <ng-template ngPluralCase="=1">there is one</ng-template>
  <ng-template ngPluralCase="few">there are a few</ng-template>
</some-element>
```

@description

Adds / removes DOM sub-trees based on a numeric value. Tailored for pluralization.

Displays DOM sub-trees that match the switch expression value, or failing that, DOM sub-trees
that match the switch expression's pluralization category.

To use this directive you must provide a container element that sets the `[ngPlural]` attribute
to a switch expression. Inner elements with a `[ngPluralCase]` will display based on their
expression:
- if `[ngPluralCase]` is set to a value starting with `=`, it will only display if the value
  matches the switch expression exactly,
- otherwise, the view will be treated as a "category match", and will only display if exact
  value matches aren't found and the value maps to its category for the defined locale.

See http://cldr.unicode.org/index/cldr-spec/plural-rules

@publicApi

## NgPluralCase

```ts
export class NgPluralCase
```

@ngModule CommonModule

@description

Creates a view that will be added/removed from the parent {@link NgPlural} when the
given expression matches the plural expression according to CLDR rules.

@usageNotes
```html
<some-element [ngPlural]="value">
  <ng-template ngPluralCase="=0">...</ng-template>
  <ng-template ngPluralCase="other">...</ng-template>
</some-element>
```

See {@link NgPlural} for more details and example.

@publicApi