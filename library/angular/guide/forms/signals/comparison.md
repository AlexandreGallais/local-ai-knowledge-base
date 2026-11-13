---
title: "Comparison with other form approaches"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/forms/signals/comparison.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Comparison with other form approaches

Angular provides three approaches to building forms: Signal Forms, Reactive Forms, and Template-driven Forms. Each has distinct patterns for managing state, validation, and data flow. This guide helps you understand the differences and choose the right approach for your project.

## Quick comparison

| Feature          | Signal Forms                       | Reactive Forms                        | Template-driven Forms   |
| ---------------- | ---------------------------------- | ------------------------------------- | ----------------------- |
| Source of truth  | User-defined writable signal model | `FormControl`/`FormGroup`             | User model in component |
| Type safety      | Inferred from model                | Explicit with typed forms             | Minimal                 |
| Validation       | Schema with path-based validators  | List of validators passed to Controls | Directive-based         |
| State management | Signal-based                       | Observable-based                      | Angular-managed         |
| Setup            | Signal + schema function           | FormControl tree                      | NgModel in template     |
| Best for         | Signal-based apps                  | Complex forms                         | Simple forms            |
| Learning curve   | Medium                             | Medium-High                           | Low                     |
| Status           | Stable (v22+)                      | Stable                                | Stable                  |

## By example: Login form

The best way to understand the differences is to see the same form implemented in all three approaches.

  File: `Signal forms`

```angular-ts
import {Component, signal} from '@angular/core';
import {
  email,
  form,
  FormField,
  FormRoot,
  minLength,
  required,
  submit,
} from '@angular/forms/signals';

@Component({
  selector: 'app-login',
  imports: [FormField, FormRoot],
  template: `
    <form [formRoot]="loginForm" (submit)="onSubmit()">
      <div>
        <label>
          Email
          <input type="email" [formField]="loginForm.email" />
        </label>
        @if (loginForm.email().touched() && loginForm.email().invalid()) {
          <span class="error">
            {{ loginForm.email().errors()[0].message }}
          </span>
        }
      </div>

      <div>
        <label>
          Password
          <input type="password" [formField]="loginForm.password" />
        </label>
        @if (loginForm.password().touched() && loginForm.password().invalid()) {
          <span class="error">
            {{ loginForm.password().errors()[0].message }}
          </span>
        }
      </div>

      <button type="submit" [disabled]="loginForm().invalid()">Sign In</button>
    </form>
  `,
})
export class LoginComponent {
  loginModel = signal({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel, (fieldPath) => {
    required(fieldPath.email, {message: 'Email is required'});
    email(fieldPath.email, {message: 'Enter a valid email address'});

    required(fieldPath.password, {message: 'Password is required'});
    minLength(fieldPath.password, 8, {message: 'Password must be at least 8 characters'});
  });

  onSubmit() {
    // Only runs the action when the form is valid.
    submit(this.loginForm, async (field) => {
      console.log('Submitting:', field().value());
    });
  }
}
```
  File: `Reactive forms`

```ts
import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="loginForm" (submit)="onSubmit()">
      <div>
        <label>
          Email
          <input type="email" formControlName="email" />
        </label>
        @if (loginForm.controls.email.touched && loginForm.controls.email.invalid) {
          <span class="error">
            @if (loginForm.controls.email.errors?.['required']) {
              Email is required
            }
            @if (loginForm.controls.email.errors?.['email']) {
              Enter a valid email address
            }
          </span>
        }
      </div>

      <div>
        <label>
          Password
          <input type="password" formControlName="password" />
        </label>
        @if (loginForm.controls.password.touched && loginForm.controls.password.invalid) {
          <span class="error">
            @if (loginForm.controls.password.errors?.['required']) {
              Password is required
            }
            @if (loginForm.controls.password.errors?.['minlength']) {
              Password must be at least 8 characters
            }
          </span>
        }
      </div>

      <button type="submit" [disabled]="loginForm.invalid">Sign In</button>
    </form>
  `,
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      console.log('Submitting:', credentials);
    }
  }
}
```
  File: `Template-driven forms`

```ts
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  template: `
    <form #loginForm="ngForm" (submit)="onSubmit()">
      <div>
        <label>
          Email
          <input
            type="email"
            name="email"
            [(ngModel)]="email"
            #emailInput="ngModel"
            required
            email
          />
        </label>
        @if (emailInput.touched && emailInput.invalid) {
          <span class="error">
            @if (emailInput.errors?.['required']) {
              Email is required
            }
            @if (emailInput.errors?.['email']) {
              Enter a valid email address
            }
          </span>
        }
      </div>

      <div>
        <label>
          Password
          <input
            type="password"
            name="password"
            [(ngModel)]="password"
            #passwordInput="ngModel"
            required
            minlength="8"
          />
        </label>
        @if (passwordInput.touched && passwordInput.invalid) {
          <span class="error">
            @if (passwordInput.errors?.['required']) {
              Password is required
            }
            @if (passwordInput.errors?.['minlength']) {
              Password must be at least 8 characters
            }
          </span>
        }
      </div>

      <button type="submit" [disabled]="loginForm.invalid">Sign In</button>
    </form>
  `,
})
export class LoginComponent {
  email = '';
  password = '';

  onSubmit() {
    const credentials = {
      email: this.email,
      password: this.password,
    };
    console.log('Submitting:', credentials);
  }
}
```

## Understanding the differences

The three approaches make different design choices that affect how you write and maintain your forms. These differences stem from where each approach stores form state and how it manages validation.

### Where your form data lives

The most fundamental difference is where each approach considers the "source of truth" for form values.

Signal Forms stores data in a writable signal. When you need the current form values, you call the signal:

```ts
const credentials = this.loginModel(); // { email: '...', password: '...' }
```

This keeps your form data in a single reactive container that automatically notifies Angular when values change. The form structure mirrors your data model exactly.

Reactive Forms stores data inside FormControl and FormGroup instances. You access values through the form hierarchy:

```ts
const credentials = this.loginForm.value; // { email: '...', password: '...' }
```

This separates form state management from your component's data model. The form structure is explicit but requires more setup code.

Template-driven Forms stores data in component properties. You access values directly:

```ts
const credentials = {email: this.email, password: this.password};
```

This is the most direct approach but requires manually assembling values when you need them. Angular manages form state through directives in the template.

### How validation works

Each approach defines validation rules differently, affecting where your validation logic lives and how you maintain it.

Signal Forms uses a schema function where you bind validators to field paths:

```ts
loginForm = form(this.loginModel, (fieldPath) => {
  required(fieldPath.email, {message: 'Email is required'});
  email(fieldPath.email, {message: 'Enter a valid email address'});
});
```

All validation rules live together in one place. The schema function runs once during form creation, and validators execute automatically when field values change. Error messages are part of the validation definition.

Reactive Forms attaches validators when creating controls:

```ts
loginForm = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
});
```

Validators are tied to individual controls in the form structure. This distributes validation across your form definition. Error messages typically live in your template.

Template-driven Forms uses directive attributes in the template:

```html
<input [(ngModel)]="email" required email />
```

Validation rules live in your template alongside the HTML. This keeps validation close to the UI but spreads logic across template and component.

### Type safety and autocomplete

TypeScript integration differs significantly between approaches, affecting how much the compiler helps you avoid errors.

Signal Forms infers types from your model structure:

```ts
const loginModel = signal({email: '', password: ''});
const loginForm = form(loginModel);
// TypeScript knows: loginForm.email exists and returns FieldState<string>
```

You define your data shape once in the signal, and TypeScript automatically knows what fields exist and their types. Accessing `loginForm.username` (which doesn't exist) produces a type error.

Reactive Forms requires explicit type annotations with typed forms:

```ts
const loginForm = new FormGroup({
  email: new FormControl<string>(''),
  password: new FormControl<string>(''),
});
// TypeScript knows: loginForm.controls.email is FormControl<string>
```

You specify types for each control individually. TypeScript validates your form structure, but you maintain type information separately from your data model.

Template-driven Forms offers minimal type safety:

```ts
email = '';
password = '';
// TypeScript only knows these are strings, no form-level typing
```

TypeScript understands your component properties but has no knowledge of form structure or validation. You lose compile-time checking for form operations.

## Choose your approach

### Use Signal Forms if:

- You're building new signal-based applications (Angular v22+)
- You want type safety inferred from your model structure
- Schema-based validation appeals to you
- Your team is familiar with signals

### Use Reactive Forms if:

- You need production-ready stability
- You're building complex, dynamic forms
- You prefer observable-based patterns
- You need fine-grained control over form state
- You're working on an existing reactive forms codebase

### Use Template-driven Forms if:

- You're building simple forms (login, contact, search)
- You're doing rapid prototyping
- Your form logic is straightforward
- You prefer keeping form logic in templates
- You're working on an existing template-driven codebase

## Next steps

To learn more about each approach:

- **Signal Forms**: See the Overview guide to get started, or dive into Form Models, Validation, and Field State Management
- **Reactive Forms**: See the Reactive Forms guide in Angular documentation
- **Template-driven Forms**: See the Template-driven Forms guide in Angular documentation
