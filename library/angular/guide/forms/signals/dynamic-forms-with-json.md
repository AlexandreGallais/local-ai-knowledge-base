---
title: "Dynamic Forms with JSON (part 1 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/forms/signals/dynamic-forms-with-json.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Dynamic Forms with JSON

Some forms can't define their structure at compile time. Server-driven forms, admin panels, multi-tenant applications, and CMS-managed content all need to render fields from configuration delivered at runtime, typically as JSON from a backend, an admin tool, or per-tenant settings.

This guide shows how to build forms whose model, schema, validation, and rendering are all derived from a single runtime configuration.

## When to use JSON-driven forms

This pattern is a good choice when:

- A backend defines which fields appear based on user role, feature flags, or business rules
- Non-developers configure form structure through an admin panel or CMS
- Each tenant in a multi-tenant application has its own form structure stored as configuration
- Forms need to evolve without redeploying the frontend

Use a static form (with fields defined directly in your component) when the structure is known at build time. Static forms get full TypeScript checking on every field, plus straightforward testing and tooling support.

## Defining a typed field config

When you want to render fields from runtime configuration, start with a TypeScript type that captures the shape of each field. A discriminated union by `kind` lets each variant declare its own validation options:

```ts
type FieldConfig =
  | {kind: 'text'; name: string; label: string; required?: boolean}
  | {kind: 'number'; name: string; label: string; required?: boolean; min?: number; max?: number};
```

Every variant has a name, label, and optional `required` flag. Number fields additionally accept `min` and `max` bounds. Add new variants by adding new `kind` branches.

A concrete config might look like this:

```ts
const profileConfig: FieldConfig[] = [
  {kind: 'text', name: 'fullName', label: 'Full Name', required: true},
  {kind: 'number', name: 'age', label: 'Age', required: true, min: 18, max: 120},
];
```

In practice this `FieldConfig[]` typically arrives from your backend, an admin panel, or a CMS. For brevity, the examples below use an in-component literal.

## Building the model from config

The form's model needs one entry per field with a default value matching the field's kind. A small helper handles this:

```ts
function buildModel(configs: FieldConfig[]): Record<string, string | number | null> {
  const initial: Record<string, string | number | null> = {};
  for (const config of configs) {
    initial[config.name] = config.kind === 'number' ? null : '';
  }
  return initial;
}
```

The model uses `Record<string, string | number | null>` because the keys are not known ahead of time.

In addition, numeric fields initialize to `null` rather than `0` so an empty field reads as empty. With `0`, `required()` would treat the field as already filled, and any `min()` constraint above zero would flag the field invalid before the user enters anything.

## Building the schema from config

The schema is also derived from the config. You can loop through each entry and apply the validators that match its kind:

```ts
import {required, min, max, SchemaFn, SchemaPath} from '@angular/forms/signals';

function buildSchema(configs: FieldConfig[]): SchemaFn<Record<string, string | number | null>> {
  return (path) => {
    for (const config of configs) {
      const fieldPath = path[config.name];

      if (config.required) {
        required(fieldPath);
      }

      if (config.kind === 'number') {
        const numberPath = fieldPath as unknown as SchemaPath<number | null>;
        if (config.min !== undefined) min(numberPath, config.min);
        if (config.max !== undefined) max(numberPath, config.max);
      }
    }
  };
}
```

The discriminated union narrows `config` inside each branch, so `config.min` and `config.max` are typed correctly when `config.kind === 'number'`.

## Expressing conditional rules in config

Some validation rules only make sense under certain conditions. For example, US state codes need validating only when the country is the US. Express these dependencies in the config by adding a `when` discriminator that names another field and the value it must equal:

```ts
type WhenCondition = {field: string; equals: string | number};

type FieldConfig =
  | {kind: 'text'; name: string; label: string; required?: boolean; when?: WhenCondition}
  | {
      kind: 'number';
      name: string;
      label: string;
      required?: boolean;
      min?: number;
      max?: number;
      when?: WhenCondition;
    };
```

Update `buildSchema()` to translate `when` into an `applyWhen()` call. Shared rule application logic moves into a small closure so the conditional and unconditional branches both call the same function:

```ts
import {applyWhen, required, min, max, SchemaFn, SchemaPath} from '@angular/forms/signals';

function buildSchema(configs: FieldConfig[]): SchemaFn<Record<string, string | number | null>> {
  return (rootPath) => {
    for (const config of configs) {
      const applyRules = (path: typeof rootPath) => {
        const fieldPath = path[config.name];
        if (config.required) required(fieldPath);
        if (config.kind === 'number') {
          const numberPath = fieldPath as unknown as SchemaPath<number | null>;
          if (config.min !== undefined) min(numberPath, config.min);
          if (config.max !== undefined) max(numberPath, config.max);
        }
      };

      if (config.when) {
        const {field, equals} = config.when;
        applyWhen(rootPath, ({valueOf}) => valueOf(rootPath[field]) === equals, applyRules);
      } else {
        applyRules(rootPath);
      }
    }
  };
}
```

When `applyWhen()`'s condition is true, the rules inside activate. When the condition becomes false, the rules deactivate and the field's validation state clears. Because the condition function reads through `valueOf(rootPath[field])`, the form re-evaluates the gate every time the referenced field changes.

A config that uses `when` looks like this:

```ts
const addressConfig: FieldConfig[] = [
  {kind: 'text', name: 'country', label: 'Country', required: true},
  {
    kind: 'text',
    name: 'stateCode',
    label: 'State',
    required: true,
    when: {field: 'country', equals: 'US'},
  },
];
```

The `stateCode` field only requires a value when `country` is `'US'`. Users entering any other country can leave `stateCode` blank without blocking submission.

For more complex conditions (multiple fields, ranges, or non-equality checks), extend `WhenCondition` with additional discriminators (such as `in: string[]` or `notEquals: string | number`) and translate each variant inside `buildSchema()`. The principle is the same: the config carries the data, `buildSchema()` translates it to `applyWhen()` calls.

To gate visibility instead of validation, follow the same pattern using `hidden()` on the field path. See Configuring `hidden()` state on fields for details.

## Expressing repeating fields in config

Some configurations need fields that grow and shrink at runtime, like a list of phone numbers, tags, or invoice line items. Add an `array` kind to the config and translate it to `applyEach()` so per-item rules apply uniformly as items come and go.

Extend `FieldConfig` with an `array` variant. This example uses arrays of strings; the same approach scales to arrays of objects by replacing the item shape with a record:

```ts
type FieldConfig =
  | {kind: 'text'; name: string; label: string; required?: boolean; when?: WhenCondition}
  | {
      kind: 'number';
      name: string;
      label: string;
      required?: boolean;
      min?: number;
      max?: number;
      when?: WhenCondition;
    }
  | {kind: 'array'; name: string; label: string; itemRequired?: boolean; when?: WhenCondition};
```

Update `buildModel()` to initialize array fields with an empty array. The model widens to include `string[]`:

```ts
function buildModel(configs: FieldConfig[]): Record<string, string | number | null | string[]> {
  const initial: Record<string, string | number | null | string[]> = {};
  for (const config of configs) {
    if (config.kind === 'number') initial[config.name] = null;
    else if (config.kind === 'array') initial[config.name] = [];
    else initial[config.name] = '';
  }
  return initial;
}
```

Update `buildSchema()` to apply per-item rules with `applyEach()`. The path coming from a `Record<string, string | number | null | string[]>` model is too broad for `applyEach()` (and for `min()` / `max()`) to type-check directly, so cast `fieldPath` to the appropriate shape inside each `kind` branch:

```ts
import {
  applyEach,
  applyWhen,
  required,
  min,
  max,
  SchemaFn,
  SchemaPath,
} from '@angular/forms/signals';

function buildSchema(
  configs: FieldConfig[],
): SchemaFn<Record<string, string | number | null | string[]>> {
  return (rootPath) => {
    for (const config of configs) {
      const applyRules = (path: typeof rootPath) => {
        const fieldPath = path[config.name];

        if (config.kind === 'array') {
          const arrayPath = fieldPath as unknown as SchemaPath<string[]>;
          if (config.itemRequired) {
            applyEach(arrayPath, (item) => required(item));
          }
          return;
        }

        if (config.required) required(fieldPath);

        if (config.kind === 'number') {
          const numberPath = fieldPath as unknown as SchemaPath<number | null>;
          if (config.min !== undefined) min(numberPath, config.min);
          if (config.max !== undefined) max(numberPath, config.max);
        }
      };

      if (config.when) {
        const {field, equals} = config.when;
        applyWhen(rootPath, ({valueOf}) => valueOf(rootPath[field]) === equals, applyRules);
      } else {
        applyRules(rootPath);
      }
    }
  };
}
```

The casts inside each branch are deliberate escape hatches: you're trading the compiler's structural guarantee for a runtime invariant the surrounding `kind` check enforces. Each cast is scoped to a `kind` block, so the assumption stays local and straightforward to audit.

A config that uses the `array` kind looks like this:

```ts
const contactConfig: FieldConfig[] = [
  {kind: 'text', name: 'fullName', label: 'Full name', required: true},
  {kind: 'array', name: 'phoneNumbers', label: 'Phone numbers', itemRequired: true},
];
```

To render an array field, iterate it with `@for` and let users add or remove items by updating the model signal. Add a typed accessor that returns a `FieldTree` so the iteration sees the array structure, and define methods to grow and shrink the model:

```ts
import {FieldTree} from '@angular/forms/signals';

// inside the component class
asArrayField(name: string): FieldTree<string[]> {
  return this.dynamicForm[name] as unknown as FieldTree<string[]>;
}

addItem(name: string) {
  this.model.update(current => ({
    ...current,
    [name]: [...(current[name] as string[]), ''],
  }));
}

removeItem(name: string, index: number) {
  this.model.update(current => ({
    ...current,
    [name]: (current[name] as string[]).filter((_, i) => i !== index),
  }));
}
```

`FieldTree<string[]>` is iterable, so `@for` can walk it; each item is a `FieldTree<string>` that satisfies `[formField]` directly. Leaf fields can use `Field<T>` accessors instead, since `Field<T>` is the callable signature without iteration.

In the template, render an array case like this:

```angular-html
@case ('array') {
  <fieldset>
    <legend>{{ config.label }}</legend>
    @for (item of asArrayField(config.name); track item) {
      <input type="text" [formField]="item" />
      <button type="button" (click)="removeItem(config.name, $index)">Remove</button>
    }
    <button type="button" (click)="addItem(config.name)">Add</button>
  </fieldset>
}
```

The `addItem()` method extends the model; the form re-derives the array's fields automatically. New items start with fresh validation state. The `removeItem()` method filters the model. Because arrays of primitives are tracked by position, field state is tied to the index rather than the value: when an item is removed, subsequent values shift into earlier positions and inherit their existing field state, while the trailing field is dropped.

### Tracking item identity

Signal Forms tracks each item in an array of objects by its identity. When you store a reference to a field at a specific position, that reference follows the underlying data, not the position. Reading state through the held reference returns the data even if it has moved:

```ts
const contactModel = signal([
  {name: 'Alice', phone: '555-0001'},
  {name: 'Bob', phone: '555-0002'},
]);

const contactForm = form(contactModel);

// Hold a reference to the field that's currently at index 0 (Alice).
const aliceField = contactForm[0];

// Swap the array items so Bob is at index 0, Alice at index 1.
contactModel.update(([alice, bob]) => [bob, alice]);

// The held reference still points to Alice's field, even after the swap.
console.log(aliceField().value().phone); // '555-0001' (Alice's number)
console.log(contactForm[0]().value().phone); // '555-0002' (Bob, now at index 0)
```

This identity tracking prevents bugs when sorting, reordering, or filtering, as long as the referenced item remains in the array. Stored field references remain valid even when array order changes; removing the referenced item itself orphans the held reference.

For arrays of primitives (the `phoneNumbers` example above), Signal Forms tracks items positionally instead: index 0 always refers to whatever value is currently at position 0.

Identity here is by JavaScript object reference, not by a logical id like a database key. If you replace the array with freshly-deserialized objects (for example, after a server reload), field state doesn't follow the logical item even when each item's `id` is unchanged. The guarantee covers in-memory operations like sorting, reordering, and filtering, not data refresh.
