---
title: "Migrating existing forms to Signal Forms (part 1 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/forms/signals/migration.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Migrating existing forms to Signal Forms

This guide provides strategies for migrating existing codebases to Signal Forms, focusing on interoperability with
existing Reactive Forms.

## Top-down migration using `compatForm`

Sometimes you may want to use existing reactive `FormControl` instances within a Signal Form. This is useful for
controls that involve:

- Complex asynchronous logic.
- Intricate RxJS operators that are not yet ported.
- Integration with existing third-party libraries.

### Integrating a `FormControl` into a signal form

Consider an existing `passwordControl` that uses a specialized `enterprisePasswordValidator`. Instead of rewriting the
validator, you can bridge the control into your signal state.

We can do it using `compatForm`:

```typescript
import {signal} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {compatForm} from '@angular/forms/signals/compat';

// 1. Existing control with a specialized validator
const passwordControl = new FormControl('', {
  validators: [Validators.required, enterprisePasswordValidator()],
  nonNullable: true,
});

// 2. Wrap it inside your form state signal
const user = signal({
  email: '',
  password: <example-value>, // Nest the existing control directly
});

// 3. Create the form
const f = compatForm(user);

// Access values via the signal tree
console.log(f.email().value()); // Current email value
console.log(f.password().value()); // Current value of passwordControl

// Reactive state is proxied automatically
const isPasswordValid = f.password().valid();
const passwordErrors = f.password().errors(); // Returns CompatValidationError if the existing validator fails
```

In the template, use standard reactive syntax by binding the underlying control:

```angular-html
<form novalidate>
  <div>
    <label>
      Email:
      <input [formField]="f.email" />
    </label>
  </div>

  <div>
    <label>
      Password:
      <input [formField]="<example-value>" type="<example-value>" />
    </label>

    @if (f.password().touched() && f.password().invalid()) {
      <div class="error-list">
        @for (error of f.password().errors(); track error) {
          <p>{{ errorMessage(error) }}</p>
        }
      </div>
    }
  </div>
</form>
```

Errors from the existing validators are `CompatValidationError`s. They don't set `message`; the error object returned by the validator is available as `context` instead:

```typescript
import {ValidationError} from '@angular/forms/signals';
import {CompatValidationError} from '@angular/forms/signals/compat';

errorMessage(error: ValidationError) {
  if (error instanceof CompatValidationError) {
    return (error.context as {message?: string} | null)?.message ?? error.kind;
  }
  return error.message ?? error.kind;
}
```

  File: `app.ts`

```ts
import {JsonPipe} from '@angular/common';
import {Component, computed, signal} from '@angular/core';
import {AbstractControl, FormControl, Validators} from '@angular/forms';
import {FormField, ValidationError} from '@angular/forms/signals';
import {compatForm, CompatValidationError} from '@angular/forms/signals/compat';

// Dummy enterprisePasswordValidator for the example
function enterprisePasswordValidator() {
  return (control: AbstractControl) => {
    if (control.value && control.value.length < 8) {
      return {enterprisePassword: {message: '<example-value>'}};
    }
    return null;
  };
}

@Component({
  selector: 'app',
  imports: [FormField, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // 1. Existing legacy control with a specialized validator
  readonly passwordControl = new FormControl('', {
    validators: [Validators.required, enterprisePasswordValidator()],
    nonNullable: true,
  });

  // 2. Wrap it inside your form state signal
  readonly user = signal({
    email: '',
    password: this.passwordControl, // Nest the legacy control directly
  });

  // 3. Create the form
  readonly f = compatForm(this.user);

  // We have to manually extract values, because JSON pipe can't serialize FormControl
  readonly formValue = computed(() => ({
    email: this.f.email().value(),
    password: this.f.password().value(),
  }));

  errorMessage(error: ValidationError) {
    // Errors from reactive validators keep the validator's error object in `context`.
    if (error instanceof CompatValidationError) {
      return (error.context as {message?: string} | null)?.message ?? error.kind;
    }
    return error.message ?? error.kind;
  }

  constructor() {
    console.log(this.f.email().value()); // ""
    console.log(this.f.password().value()); // Current value of passwordControl
  }
}
```
  File: `app.html`

```html
<form>
  <div>
    <label>
      Email:
      <input [formField]="f.email" />
    </label>
  </div>

  <div>
    <label>
      Password:
      <input [formField]="<example-value>" type="<example-value>" />
    </label>

    @if (f.password().touched() && f.password().invalid()) {
      <div class="error-list">
        @for (error of f.password().errors(); track error) {
          <p>{{ errorMessage(error) }}</p>
        }
      </div>
    }
  </div>
  <h3>Value</h3>
  <pre>{{ formValue() | json }}</pre>
</form>
```

### Integrating a `FormGroup` into a signal form

You can also wrap an entire `FormGroup`. This is common when a reusable sub-section of a form—such as an
**Address Block**—is still managed by existing Reactive Forms.

```typescript
import {signal} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {compatForm} from '@angular/forms/signals/compat';
import {required} from '@angular/forms/signals';

// 1. An existing address group with its own validation logic
const addressGroup = new FormGroup({
  street: new FormControl('123 Angular Way', Validators.required),
  city: new FormControl('Mountain View', Validators.required),
  zip: new FormControl('94043', Validators.required),
});

// 2. Include it in the state like it's a value
const checkoutModel = signal({
  customerName: 'Pirojok the Cat',
  shippingAddress: addressGroup,
});

const f = compatForm(checkoutModel, (p) => {
  required(p.customerName);
});
```

The `shippingAddress` field acts as a branch in your Signal Form tree. You can bind these nested controls in your
template by accessing the underlying existing controls via `.control()`:

```angular-html
<form novalidate>
  <h3>Shipping Details</h3>

  <div>
    <label>
      Customer Name:
      <input [formField]="f.customerName" />
    </label>

    @if (f.customerName().touched() && f.customerName().invalid()) {
      <div class="error-list">
        <p>Customer name is required.</p>
      </div>
    }
  </div>

  <fieldset>
    <legend>Address</legend>

    @let street = f.shippingAddress().control().controls.street;
    <div>
      <label>
        Street:
        <input [formControl]="street" />
      </label>
      @if (street.touched && street.invalid) {
        <div class="error-list">
          <p>Street is required</p>
        </div>
      }
    </div>

    @let city = f.shippingAddress().control().controls.city;
    <div>
      <label>
        City:
        <input [formControl]="city" />
      </label>
      @if (city.touched && city.invalid) {
        <div class="error-list">
          <p>City is required</p>
        </div>
      }
    </div>

    @let zip = f.shippingAddress().control().controls.zip;
    <div>
      <label>
        Zip Code:
        <input [formControl]="zip" />
      </label>
      @if (zip.touched && zip.invalid) {
        <div class="error-list">
          <p>Zip Code is required</p>
        </div>
      }
    </div>
  </fieldset>
</form>
```

  File: `app.ts`

```ts
import {JsonPipe} from '@angular/common';
import {Component, computed, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormField, required} from '@angular/forms/signals';
import {compatForm} from '@angular/forms/signals/compat';

@Component({
  selector: 'app',
  imports: [ReactiveFormsModule, FormField, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // 1. A legacy address group with its own validation logic
  readonly addressGroup = new FormGroup({
    street: new FormControl('123 Angular Way', Validators.required),
    city: new FormControl('Mountain View', Validators.required),
    zip: new FormControl('94043', Validators.required),
  });

  // 2. Include it in the state like it's a value
  readonly checkoutModel = signal({
    customerName: '',
    shippingAddress: this.addressGroup,
  });

  // 3. Create the form
  readonly f = compatForm(this.checkoutModel, (p) => {
    required(p.customerName);
  });

  // We have to manually extract values, because JSON pipe can't serialize FormControl
  readonly formValue = computed(() => ({
    customerName: this.f.customerName().value(),
    shippingAddress: this.f.shippingAddress().value(),
  }));

  constructor() {
    console.log('Customer Name:', this.f.customerName().value());
    console.log('Street:', this.f.shippingAddress().value().street);
  }
}
```
  File: `app.html`

```html
<form>
  <h3>Shipping Details</h3>

  <div>
    <label>
      Customer Name:
      <input [formField]="f.customerName" />
    </label>

    @if (f.customerName().touched() && f.customerName().invalid()) {
      <div class="error-list">
        <p>Customer name is required.</p>
      </div>
    }
  </div>

  <fieldset>
    <legend>Address</legend>

    @let street = f.shippingAddress().control().controls.street;
    <div>
      <label>
        Street:
        <input [formControl]="street" />
      </label>
      @if (street.touched && street.invalid) {
        <div class="error-list">
          <p>Street is required</p>
        </div>
      }
    </div>

    @let city = f.shippingAddress().control().controls.city;
    <div>
      <label>
        City:
        <input [formControl]="city" />
      </label>
      @if (city.touched && city.invalid) {
        <div class="error-list">
          <p>City is required</p>
        </div>
      }
    </div>

    @let zip = f.shippingAddress().control().controls.zip;
    <div>
      <label>
        Zip Code:
        <input [formControl]="zip" />
      </label>
      @if (zip.touched && zip.invalid) {
        <div class="error-list">
          <p>Zip Code is required</p>
        </div>
      }
    </div>
  </fieldset>
  <h3>Value</h3>
  <pre>{{ formValue() | json }}</pre>
</form>
```

### Accessing values

While `compatForm` proxies value access on the `FormControl` level, the full form value preserves the control:

```typescript
const passwordControl = new FormControl('<example-value>' /** ... */);

const user = signal({
  email: '',
  password: <example-value>, // Nest the existing control directly
});

const form = compatForm(user);
form.password().value(); // '<example-value>'
form().value(); // { email: '', password: <example-value>}
```

If you need the whole form value with the controls unwrapped, use `extractValue` from `@angular/forms/signals/compat`:

```typescript
import {extractValue} from '@angular/forms/signals/compat';

const formValue = computed(() => extractValue(form)); // {email: '', password: '<example-value>'}
```
