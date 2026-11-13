---
title: "Custom Controls (part 2 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/forms/signals/custom-controls.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Custom Controls (part 2 of 2)

## Value transformation

Controls sometimes display values differently than the form model stores them - a date picker might display "January 15, 2024" while storing "2024-01-15", or a currency input might show "$1,234.56" while storing 1234.56.

Use `transformedValue()` (from `@angular/forms/signals`) to keep the raw value shown in the UI in sync with the model value. It takes the control's `value` model signal plus a `parse` and a `format` function, and returns a writable signal holding the raw value:

- `format` converts the model value into the raw value the template renders.
- `parse` converts what the user typed back into a model value, and can report parse errors instead.

```angular-ts
import {Component, model} from '@angular/core';
import {FormValueControl, transformedValue} from '@angular/forms/signals';

@Component({
  selector: 'number-input',
  template: `
    <input type="text" [value]="rawValue()" (input)="rawValue.set($event.target.value)" />
  `,
})
export class NumberInput implements FormValueControl<number | null> {
  readonly value = model.required<number | null>();

  protected readonly rawValue = transformedValue(this.value, {
    parse: (val: string): {value: number | null} => ({value: val ? Number(val) : null}),
    format: (val: number | null): string => val?.toString() ?? '',
  });
}
```

Writing to the returned signal (`rawValue.set(...)`) runs `parse` and writes the result into `value`. Whenever the model changes from elsewhere - a `reset()`, a schema rule, or another part of the app - `format` runs again and the raw value updates to match.

### Reporting parse errors

Sometimes the raw value has no valid model representation - a half-typed date, or letters in a numeric field. The `NumberInput` above has this problem: `Number('abc')` is `NaN`, which `parse` happily writes into the model.

Return `{error}` instead:

```ts
export class NumberInput implements FormValueControl<number | null> {
  readonly value = model.required<number | null>();

  protected readonly rawValue = transformedValue(this.value, {
    parse: (val) => {
      const parsed = val ? Number(val) : null;

      return Number.isNaN(parsed)
        ? {error: {kind: 'parse', message: `${val} is not a number`}}
        : {value: parsed};
    },
    format: (val) => val?.toString() ?? '',
  });
}
```

Return both `value` and `error` when you want to update the model _and_ flag a problem.

When the control is bound with `[formField]`, parse errors are automatically reported to the field, so they show up in the field's `errors()` signal alongside validation errors:

```angular-ts
@Component({
  imports: [NumberInput, FormField],
  template: `
    <number-input [formField]="orderForm.amount" />

    @for (error of orderForm.amount().errors(); track $index) {
      <!-- {kind: 'parse', message: '...'} is reported here too -->
      <p class="error">{{ error.message }}</p>
    }
  `,
})
export class Order {
  orderModel = signal<{amount: number | null}>({amount: null});
  orderForm = form(this.orderModel);
}
```

A field with parse errors is invalid, which blocks submission the same way a failed validation rule does.

HELPFUL: Signal Forms uses the same mechanism for native inputs. When the browser cannot parse a value (for example, a partially typed date in ``), it surfaces as a `parse` error on the field. See Native HTML validation for details.

### Resetting

Calling `reset()` on the field clears any pending parse errors and re-formats the raw value from the model, so a control left in an unparseable state returns to a clean display value:

```ts
orderForm.amount().reset();
```

## Validation integration

Controls display validation state but don't perform validation. Validation happens in the form schema - your control receives `invalid()` and `errors()` signals from the FormField directive and displays them (as shown in the StatefulInput example above).

The FormField directive also passes validation constraint values like `required`, `min`, `max`, `minLength`, `maxLength`, and `pattern`. Your control can use these to enhance the UI:

```ts
export class NumberInput implements FormValueControl<number> {
  value = model<number>(0);

  // Constraint values from schema validation rules
  required = input<boolean>(false);
  min = input<number | undefined>(undefined);
  max = input<number | undefined>(undefined);
}
```

When you add `min()` and `max()` validation rules to the schema, the FormField directive passes these values to your control. Use them to apply HTML5 attributes or show constraint hints in your template.

IMPORTANT: Don't implement validation logic in your control. Define validation rules in the form schema and let your control display the results:

```ts
// Avoid: Validation in control
export class BadControl implements FormValueControl<string> {
  value = model<string>('');
  isValid() {
    return this.value().length >= 8;
  } // Don't do this!
}
```

```ts
// Good: Validation in schema, control displays results
accountForm = form(this.accountModel, (schemaPath) => {
  minLength(schemaPath.password, 8, {message: 'Password must be at least 8 characters'});
});
```

## Making controls reusable

A custom control often carries implicit expectations about validation. An email input needs `required` and `email` rules in every form that uses it. Instead of relying on each consumer to redeclare those rules, package a companion schema alongside the control and export both from the same module:

```ts
import {schema, required, email} from '@angular/forms/signals';

export const emailFieldSchema = schema<string>((path) => {
  required(path, {message: 'Email is required'});
  email(path, {message: 'Enter a valid email address'});
});
```

A consumer imports the companion schema and composes it into their form with `apply()`:

```ts
import {form, apply} from '@angular/forms/signals';
import {emailFieldSchema} from './email-input';

registrationForm = form(this.registrationModel, (path) => {
  apply(path.email, emailFieldSchema);
});
```

`apply()` merges the companion schema's rules into the parent form at the specified path. The consumer can still add more rules to the same field because `apply()` composes with other rules rather than replacing them. See the Schemas guide for complete coverage of `schema()`, `apply()`, and conditional composition with `applyWhen()`.

### Design considerations

The consumer's model must initialize every field with a defined value. In Signal Forms, `undefined` signifies the absence of a field and not an empty value. For a reusable email control, that means the consumer should use `''` as the initial value, and not leave the property undefined. See the Form Models guide for details on choosing initial values.

In addition, controls should not register their own effects for state management. The form system manages field state through internal effects. This means that your control receives state updates through input signals. If a control needs to transform values, use `transformedValue()` as shown in the "Value transformation" section rather than an `effect()`.

## Next steps

This guide covered building custom controls that integrate with Signal Forms. Related guides explore other aspects of Signal Forms:

  - Form models
  - Field state management
  - Validation
