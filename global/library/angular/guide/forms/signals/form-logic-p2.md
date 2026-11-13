---
title: "Adding form logic (part 2 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/forms/signals/form-logic.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Adding form logic (part 2 of 2)

## Delay input operations with `debounce()`

The `debounce()` rule delays updating the form model. This is useful for performance optimization and reducing unnecessary operations during rapid input.

### What debouncing does

Without debouncing, every keystroke immediately updates the form model. This can trigger:

- Expensive computed signals that recalculate on every change
- Validation checks after each character
- API calls or other side effects tied to the model value

Debouncing delays these updates and reduces unnecessary work.

### Basic <example-value>

You can debounce a field by specifying a delay in milliseconds:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, debounce} from '@angular/forms/signals';

@Component({
  selector: 'app-search',
  imports: [FormField],
  template: `
    <label>
      Search
      <input [formField]="searchForm.query" />
    </label>

    <p>Searching for: {{ searchForm.query().value() }}</p>
  `,
})
export class Search {
  searchModel = signal({
    query: '',
  });

  searchForm = form(this.searchModel, (schemaPath) => {
    debounce(schemaPath.query, 300);
  });
}
```

With a 300ms debounce:

- User types in the input field
- Form model updates only after 300ms of typing inactivity
- If user keeps typing, the timer resets with each keystroke
- Once user pauses for 300ms, the model updates with the final value

### Timing guarantees

The `debounce()` function ensures users don't lose data through these mechanisms:

- **When marked as touched:** The value syncs immediately, aborting any pending debounce delay. This happens when the field loses focus (blur) or when explicitly marked as touched.
- **On form submission:** All fields are marked as touched before validation, which ensures all debounced values sync immediately.

This means users can type quickly, tab away, or submit the form without waiting for debounce delays to expire.

### Custom debounce logic

For advanced control, provide a debouncer function that controls when to synchronize the value. This function is called every time the control value is updated and can return either `undefined` to synchronize immediately, or a Promise that prevents synchronization until it resolves:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, debounce} from '@angular/forms/signals';

@Component({
  selector: 'app-search',
  imports: [FormField],
  template: `
    <label>
      Search
      <input [formField]="searchForm.query" />
    </label>
  `,
})
export class Search {
  searchModel = signal({
    query: '',
  });

  searchForm = form(this.searchModel, (schemaPath) => {
    debounce(schemaPath.query, (context, abortSignal) => {
      // Return a promise that resolves after 500ms, or right away when the debounce is aborted
      return new Promise<void>((resolve) => {
        const timeoutId = setTimeout(resolve, 500);
        abortSignal.addEventListener(
          'abort',
          () => {
            clearTimeout(timeoutId);
            resolve();
          },
          {once: true},
        );
      });
    });
  });
}
```

The debouncer function can return:

- `undefined` to synchronize the value immediately
- A `Promise<void>` that prevents synchronization until it resolves

Use cases for custom debounce logic:

- Implementing custom timing logic beyond simple delays
- Coordinating synchronization with external events
- Conditional debouncing based on application state

### When to use debouncing

Debouncing is most useful when:

- You have expensive computed signals that depend on the field value
- The field triggers API calls or other side effects
- You want to reduce validation overhead during rapid typing
- Performance profiling shows model updates are causing slowdowns

Don't use debouncing if:

- The field needs immediate updates for good UX (such as calculator inputs)
- The performance benefit is negligible
- Users expect real-time feedback

## Associate data with a field using `metadata()`

Metadata attaches reactive data to a field. Validation rules use this system internally, and you can publish your own keys for application-specific information like help text, configuration, or computed display values.

Signal Forms provides pre-defined metadata keys that built-in validators populate automatically:

| Key          | Populated by         | Read via              |
| ------------ | -------------------- | --------------------- |
| `REQUIRED`   | `required()`         | `field().required()`  |
| `MIN`        | `min()`, `minDate()` | `field().min()`       |
| `MAX`        | `max()`, `maxDate()` | `field().max()`       |
| `MIN_LENGTH` | `minLength()`        | `field().minLength()` |
| `MAX_LENGTH` | `maxLength()`        | `field().maxLength()` |
| `PATTERN`    | `pattern()`          | `field().pattern()`   |

The `[formField]` directive automatically binds five of these (`REQUIRED`, `MIN`, `MAX`, `MIN_LENGTH`, and `MAX_LENGTH`) to the corresponding HTML attribute on a native form control. `PATTERN` is the exception, because Signal Forms supports multiple patterns per field but the HTML `pattern` attribute accepts only a single regular expression.

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, required, min, max} from '@angular/forms/signals';

@Component({
  selector: 'app-age',
  imports: [FormField],
  template: `
    <label>
      Age (between {{ ageForm.age().min?.() }} and {{ ageForm.age().max?.() }})
      <input type="number" [formField]="ageForm.age" />
    </label>

    @if (ageForm.age().required()) {
      <span class="required-indicator">*</span>
    }
  `,
})
export class Age {
  ageModel = signal({age: 0});

  ageForm = form(this.ageModel, (schemaPath) => {
    required(schemaPath.age);
    min(schemaPath.age, 18);
    max(schemaPath.age, 120);
  });
}
```

### Reactive metadata

Validation rules can derive their constraints from other fields, making the published metadata reactive:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, max} from '@angular/forms/signals';

@Component({
  selector: 'app-inventory',
  imports: [FormField],
  template: `
    <label>
      Item
      <select [formField]="inventoryForm.item">
        <option value="widget">Widget</option>
        <option value="gadget">Gadget</option>
      </select>
    </label>

    <label>
      Quantity (max: {{ inventoryForm.quantity().max?.() }})
      <input type="number" [formField]="inventoryForm.quantity" />
    </label>
  `,
})
export class Inventory {
  inventoryModel = signal({
    item: 'widget',
    quantity: 0,
  });

  inventoryForm = form(this.inventoryModel, (schemaPath) => {
    max(schemaPath.quantity, ({valueOf}) => {
      const item = valueOf(schemaPath.item);
      return item === 'widget' ? 100 : 50;
    });
  });
}
```

The `max()` validation rule sets the `MAX` metadata reactively based on the selected item, so any template or control reading `field().max()` updates whenever the item changes.

For deeper coverage, including how to define custom keys, combine contributions with reducers, and use managed metadata for lifecycle-aware objects, see the Field metadata guide.

## Combining rules

You can apply multiple rules to the same field, and you can use conditional logic to apply entire groups of rules based on form state.

### Multiple rules on one field

Apply multiple rules to configure all aspects of a field's behavior:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, disabled, hidden, debounce, metadata} from '@angular/forms/signals';
import {PLACEHOLDER} from './metadata-keys';

@Component({
  selector: 'app-promo',
  imports: [FormField],
  template: `
    @if (!promoForm.promoCode().hidden()) {
      <label>
        Promo Code
        <input [formField]="promoForm.promoCode" />
      </label>
    }
  `,
})
export class Promo {
  promoModel = signal({
    hasAccount: false,
    subscriptionType: 'free' as 'free' | 'premium',
    promoCode: '',
  });

  promoForm = form(this.promoModel, (schemaPath) => {
    disabled(schemaPath.promoCode, {
      when: ({valueOf}) => (!valueOf(schemaPath.hasAccount) ? 'You must have an account' : false),
    });
    hidden(schemaPath.promoCode, {
      when: ({valueOf}) => valueOf(schemaPath.subscriptionType) === 'free',
    });
    debounce(schemaPath.promoCode, 300);
    metadata(schemaPath.promoCode, PLACEHOLDER, () => 'Enter promo code');
  });
}
```

These rules work together:

- Hidden takes precedence - if the field is hidden, disabled state doesn't matter
- Disabled prevents editing regardless of readonly state
- Debouncing affects model updates regardless of other state
- Metadata is independent and always available

### Conditional logic with applyWhen

Use `applyWhen()` to conditionally apply entire groups of rules:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, applyWhen, required, pattern} from '@angular/forms/signals';

@Component({
  selector: 'app-address',
  imports: [FormField],
  template: `
    <label>
      Country
      <select [formField]="addressForm.country">
        <option value="US">United States</option>
        <option value="CA">Canada</option>
      </select>
    </label>

    <label>
      Zip/Postal Code
      <input [formField]="addressForm.zipCode" />
    </label>
  `,
})
export class Address {
  addressModel = signal({
    country: 'US',
    zipCode: '',
  });

  addressForm = form(this.addressModel, (schemaPath) => {
    applyWhen(
      schemaPath,
      ({valueOf}) => valueOf(schemaPath.country) === 'US',
      (schemaPath) => {
        // Only applied when country is US
        required(schemaPath.zipCode);
        pattern(schemaPath.zipCode, /^\d{5}(-\d{4})?$/);
      },
    );
  });
}
```

The `applyWhen()` function receives:

1. A path to apply logic to (often the root form path)
2. A reactive logic function that returns `true` (apply) or `false` (don't apply)
3. A schema function that defines the conditional rules

The conditional rules only run when the condition is true. This is useful for complex forms where validation rules or behavior changes based on user choices.

### Reusable schema functions

Extract common rule configurations into reusable functions:

```ts
import {SchemaPath, debounce, metadata, maxLength, form} from '@angular/forms/signals';
import {PLACEHOLDER} from './metadata-keys';

function emailFieldConfig(path: SchemaPath<string>) {
  debounce(path, 300);
  metadata(path, PLACEHOLDER, () => 'user@example.com');
  maxLength(path, 255);
}

// Use in multiple forms
const contactForm = form(contactModel, (schemaPath) => {
  emailFieldConfig(schemaPath.email);
  emailFieldConfig(schemaPath.alternateEmail);
});

const registrationForm = form(registrationModel, (schemaPath) => {
  emailFieldConfig(schemaPath.email);
});
```

This pattern is useful when you have standard field configurations that you use across multiple forms in your application.

## Next steps

To learn more about Signal Forms, check out these related guides:

- Field State Management - Learn how to use the state signals created by these functions in your templates and component logic
- Validation - Learn about validation rules and error handling
- Custom Controls - Learn how custom controls can read metadata and state to configure themselves automatically
