---
title: "Dynamic Forms with JSON (part 2 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/forms/signals/dynamic-forms-with-json.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Dynamic Forms with JSON (part 2 of 2)

## Validating the config

Configs from external sources need validation before the form is built. Several failure modes can hide in untrusted JSON:

- Duplicate `name` values overwrite earlier model entries and break the `track config.name` expression in the template.
- A `when` clause that names a non-existent field fails at runtime when the condition first evaluates.
- A `when` clause that compares against an `array` field has no defined equality semantics.
- A `when.equals` value whose type doesn't match the referenced field's kind silently never matches, hiding the conditional behavior as if the rule were never active.

Catch all four at the boundary:

```ts
function validateConfigs(configs: FieldConfig[]): FieldConfig[] {
  const knownNames = new Set<string>();

  for (const config of configs) {
    if (knownNames.has(config.name)) {
      throw new Error(`Duplicate field name in config: "${config.name}"`);
    }
    knownNames.add(config.name);
  }

  for (const config of configs) {
    if (!config.when) continue;
    if (!knownNames.has(config.when.field)) {
      throw new Error(
        `Field "${config.name}" references unknown field "${config.when.field}" in its 'when' condition.`,
      );
    }
    const referenced = configs.find((c) => c.name === config.when!.field)!;
    if (referenced.kind === 'array') {
      throw new Error(
        `Field "${config.name}" cannot use 'when' to compare against array field "${config.when.field}".`,
      );
    }
    const expected = referenced.kind === 'text' ? 'string' : 'number';
    if (typeof config.when.equals !== expected) {
      throw new Error(
        `Field "${config.name}" compares ${referenced.kind} field "${config.when.field}" against a ${typeof config.when.equals} value; expected a ${expected}.`,
      );
    }
  }

  return configs;
}
```

The first pass enforces uniqueness; the second pass walks each `when` clause to confirm the referenced field exists, isn't an array, and is being compared against a value of the right type. The function returns the configs unchanged on success, so it composes cleanly with the field initializer that holds the configs in the component. Failures surface at the boundary between your application and the upstream source rather than as opaque form misbehavior later.

## Rendering the form dynamically

In the component, use `@for` to iterate the configs and `@switch` on `kind` to pick the right input control:

```angular-ts
import {Component, signal} from '@angular/core';
import {Field, FieldTree, form, FormField, FormRoot} from '@angular/forms/signals';

@Component({
  selector: 'app-dynamic-form',
  imports: [FormField, FormRoot],
  template: `
    <form [formRoot]="dynamicForm">
      @for (config of configs; track config.name) {
        @switch (config.kind) {
          @case ('text') {
            <label>
              {{ config.label }}
              <input type="text" [formField]="asTextField(config.name)" />
            </label>
          }
          @case ('number') {
            <label>
              {{ config.label }}
              <input type="number" [formField]="asNumberField(config.name)" />
            </label>
          }
          @case ('array') {
            <fieldset>
              <legend>{{ config.label }}</legend>
              @for (item of asArrayField(config.name); track item; let i = $index) {
                <input type="text" [formField]="item" />
                <button type="button" (click)="removeItem(config.name, i)">Remove</button>
              }
              <button type="button" (click)="addItem(config.name)">Add</button>
            </fieldset>
          }
        }
      }
    </form>
  `,
})
export class DynamicForm {
  configs: FieldConfig[] = validateConfigs([
    {kind: 'text', name: 'fullName', label: 'Full Name', required: true},
    {kind: 'number', name: 'age', label: 'Age', required: true, min: 18, max: 120},
    {kind: 'array', name: 'phoneNumbers', label: 'Phone numbers', itemRequired: true},
  ]);

  model = signal(buildModel(this.configs));

  dynamicForm = form(this.model, buildSchema(this.configs));

  asTextField(name: string): Field<string> {
    // <input type="text"> requires Field<string>.
    return this.dynamicForm[name] as unknown as Field<string>;
  }

  asNumberField(name: string): Field<number | null> {
    // <input type="number"> requires Field<number | null>.
    return this.dynamicForm[name] as unknown as Field<number | null>;
  }

  asArrayField(name: string): FieldTree<string[]> {
    // FieldTree (not Field) so @for can iterate the array.
    return this.dynamicForm[name] as unknown as FieldTree<string[]>;
  }

  addItem(name: string) {
    this.model.update((current) => ({
      ...current,
      [name]: [...(current[name] as string[]), ''],
    }));
  }

  removeItem(name: string, index: number) {
    this.model.update((current) => ({
      ...current,
      [name]: (current[name] as string[]).filter((_, i) => i !== index),
    }));
  }
}
```

Template type-checking treats `dynamicForm[name]` as an independent expression, so the `@switch` narrowing on `config.kind` doesn't reach the indexed access. The accessors restate that narrowing as a cast at the binding site, and the matching `kind` branch guarantees the narrowed type is correct at runtime.

Because the model and schema are both derived from the same `FieldConfig[]` at component construction, they can't drift apart for a given config. The example above assumes the config is available synchronously when the component is created.

## Next steps

JSON-driven forms keep their model and schema aligned by deriving both from the same `FieldConfig[]`. Each extension in this guide (conditional rules, repeating fields) widens the type and adds a translation step inside `buildSchema()` while preserving that alignment. The model and schema stay locked together, regardless of where the config comes from or how it grows.

For related guides cover other aspects of Signal Forms, check out:

  - Schemas and schema composability
  - Validation
  - Adding form logic
  - Field state management

For detailed API documentation, see:

- `form()` - Create a form from a model signal
- `applyWhen()` - Apply a schema conditionally based on reactive state
- `applyEach()` - Apply a schema to each item in an array field
- `FieldTree` - Navigable tree of fields exposed by `form()`
- `SchemaFn` - Type signature for schema functions
