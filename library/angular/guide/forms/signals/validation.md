---
title: "Validation (part 1 of 3)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/forms/signals/validation.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Validation

Forms need validation to ensure users provide correct, complete data before submission. Without validation, you would need to handle data quality issues on the server, provide poor user experience with unclear error messages, and manually check every constraint.

Signal Forms provides a schema-based validation approach. Validation rules bind to fields using a schema function, run automatically when values change, and expose errors through field state signals. This enables reactive validation that updates as users interact with the form.

  File: `app.ts`

```ts
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import {Component, signal} from '@angular/core';
import {email, form, FormField, required, submit} from '@angular/forms/signals';

interface LoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [FormField],
})
export class App {
  loginModel = signal<LoginData>({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, {message: 'Email is required'});
    email(schemaPath.email, {message: 'Enter a valid email address'});

    required(schemaPath.password, {message: 'Password is required'});
  });

  onSubmit(event: Event) {
    event.preventDefault();
    submit(this.loginForm, {
      action: async () => {
        const credentials = this.loginModel();
        // In a real app, this would be async:
        // await this.authService.login(credentials);
        console.log('Logging in with:', credentials);
      },
    });
  }
}
```
  File: `app.html`

```html
<form (submit)="onSubmit($event)">
  <div>
    <label>
      Email:
      <input type="email" [formField]="loginForm.email" />
    </label>

    @if (loginForm.email().touched() && loginForm.email().invalid()) {
      <ul class="error-list">
        @for (error of loginForm.email().errors(); track error) {
          <li>{{ error.message }}</li>
        }
      </ul>
    }
  </div>

  <div>
    <label>
      Password:
      <input type="password" [formField]="loginForm.password" />
    </label>

    @if (loginForm.password().touched() && loginForm.password().invalid()) {
      <ul class="error-list">
        @for (error of loginForm.password().errors(); track error) {
          <li>{{ error.message }}</li>
        }
      </ul>
    }
  </div>

  <button type="submit" [disabled]="loginForm().invalid()">Log In</button>
</form>
```
  File: `app.css`

```css
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  padding: 1rem;
  font-family:
    Inter,
    system-ui,
    -apple-system,
    sans-serif;
}

div {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-weight: 500;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
}

input:focus {
  outline: none;
  border-color: #4285f4;
}

button {
  padding: 0.75rem 1.5rem;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #357ae8;
}

button:active {
  background-color: #2a65c8;
}

.error-list {
  color: red;
  font-size: 0.875rem;
  margin: 0.25rem 0 0 0;
  padding-left: 0;
  list-style-position: inside;
}

.error-list li {
  margin: 0;
}
```

## Validation basics

Validation in Signal Forms is defined through a schema function passed as the second argument to `form()`.

### The schema function

The schema function receives a `SchemaPathTree` object that lets you define your validation rules:

File: `app.ts`

```ts
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import {Component, signal} from '@angular/core';
import {email, form, FormField, required, submit} from '@angular/forms/signals';

interface LoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [FormField],
})
export class App {
  loginModel = signal<LoginData>({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, {message: 'Email is required'});
    email(schemaPath.email, {message: 'Enter a valid email address'});

    required(schemaPath.password, {message: 'Password is required'});
  });

  onSubmit(event: Event) {
    event.preventDefault();
    submit(this.loginForm, {
      action: async () => {
        const credentials = this.loginModel();
        // In a real app, this would be async:
        // await this.authService.login(credentials);
        console.log('Logging in with:', credentials);
      },
    });
  }
}
```

The schema function runs once during form initialization. Validation rules bind to fields using the schema path parameter (such as `schemaPath.email`, `schemaPath.password`), and validation runs automatically whenever field values change.

NOTE: The schema callback parameter (`schemaPath` in these examples) is a `SchemaPathTree` object that provides paths to all fields in your form. You can name this parameter anything you like.

### How validation works

Validation in Signal Forms follows this pattern:

1. **Define validation rules in schema** - Bind validation rules to fields in the schema function
2. **Automatic execution** - Validation rules run when field values change
3. **Error propagation** - Validation errors are exposed through field state signals
4. **Reactive updates** - UI automatically updates when validation state changes

Validation runs on every value change for interactive fields. Hidden and disabled fields don't run validation - their validation rules are skipped until the field becomes interactive again.

### Validation timing

Validation rules execute in this order:

1. **Synchronous validation** - All synchronous validation rules run when value changes
2. **Asynchronous validation** - Asynchronous validation rules run only after all synchronous validation rules pass
3. **Field state updates** - The `valid()`, `invalid()`, `errors()`, and `pending()` signals update

Synchronous validation rules (like `required()`, `email()`) complete immediately. Asynchronous validation rules (like `validateHttp()`) may take time and set the `pending()` signal to `true` while executing.

All validation rules run on every change - validation doesn't short-circuit after the first error. If a field has both `required()` and `email()` validation rules, both run, and both can produce errors simultaneously.

### Native HTML validation

Signal Forms **does not** use the browser's built-in constraint validation to run validation rules. This is by design: Signal Forms allows any component to act as a form control, not just native form elements.

Instead, your validation rules run entirely in Angular, and validation state is exposed through field state signals such as `valid()`, `invalid()`, and `errors()` rather than through the element's native validity state. The `FormRoot` directive also sets the `novalidate` attribute on the form element so the browser does not block submission.

When a field is bound to a native form element, some built-in validation rules mirror their constraint to the corresponding native attribute: `required()`, `min()`, `max()`, `minLength()`, and `maxLength()` set the `required`, `min`, `max`, `minlength`, and `maxlength` attributes when the element supports them. An exception is `pattern()`, which does not set the native `pattern` attribute. Signal Forms sets these attributes to control input behavior and to improve accessibility, **not to trigger native validation**.

NOTE: There is one case where Signal Forms reads native validity state: when the browser cannot parse a native input's value (for example, a partially typed date), Signal Forms reports it as a parse error. Even then, the error surfaces through the field's `errors()` signal like any other validation error. See Value transformation for details.

IMPORTANT: Do not rely on native validity features such as the `:valid` and `:invalid` CSS pseudo-classes, the element's `validity` property, or `validationMessage`. The browser may report some inputs as invalid as a side effect of the mirrored attributes (for example, a number input whose value is below its `min`), but this behavior varies by validation rule and input type and is not a supported way to observe validation state.

To style controls based on validation state, bind classes to field state signals (see Field state management) or configure automatic status classes (see Automatic status classes).
