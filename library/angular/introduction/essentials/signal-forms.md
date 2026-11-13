---
title: "Forms with signals"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/introduction/essentials/signal-forms.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Forms with signals

Signal Forms manage form state using Angular signals to provide automatic synchronization between your data model and the UI with Angular Signals.

This guide walks you through the core concepts to create forms with Signal Forms. Here's how it works:

## Creating your first form

### 1. Create a form model with `signal()`

Every form starts by creating a signal that holds your form's data model:

```ts
interface LoginData {
  email: string;
  password: string;
}

const loginModel = signal<LoginData>({
  email: '',
  password: '',
});
```

### 2. Pass the form model to `form()` to create a `FieldTree`

Then, you pass your form model into the `form()` function to create a **field tree** - an object structure that mirrors your model's shape, allowing you to access fields with dot notation.

Both the root form object and its nested properties are `FieldTree` nodes:

```ts
const loginForm = form(loginModel);

loginForm; // is a FieldTree
loginForm.email; // is also a FieldTree
```

### 3. Bind HTML inputs with `[formField]` directive

Next, you bind your HTML inputs to the form using the `[formField]` directive, which creates two-way binding between them:

```html
<input type="email" [formField]="loginForm.email" />
<input type="password" [formField]="loginForm.password" />
```

As a result, user changes (such as typing in the field) automatically updates the form.

NOTE: The `[formField]` directive also syncs field state for attributes like `required`, `disabled`, and `readonly` when appropriate.

### 4. Read state with `FieldTree` signals

You can access state for any part of the tree by calling the `FieldTree` node as a function. This returns a state object containing reactive signals for the value, validation status, and interaction state:

```ts
loginForm(); // Returns state for the whole form
loginForm.email(); // Returns state for the email field
```

To read the current value, access the `value()` signal:

```html
<!-- Render values that update automatically as user types -->
<p>Form value: {{ loginForm().value() | json }}</p>
<p>Email: {{ loginForm.email().value() }}</p>
```

```ts
// Get the current value
const currentEmail = loginForm.email().value();
```

### 5. Update values with `set()`

You can programmatically update values using the `value.set()` method on any node. This updates both the `FieldTree` and the underlying model signal:

```ts
// Update the value programmatically
loginForm.email().value.set('alice@wonderland.com');
```

As a result, both the field value and the model signal are updated automatically:

```ts
// The model signal is also updated
console.log(loginModel().email); // 'alice@wonderland.com'
```

### Complete example

  File: `app.ts`

```ts
import {Component, signal} from '@angular/core';
import {form, FormField} from '@angular/forms/signals';

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

  loginForm = form(this.loginModel);

  onSubmit(event: Event) {
    event.preventDefault();

    // Perform login logic here
    const credentials = this.loginModel();
    console.log('Logging in with:', credentials);

    // e.g., await this.authService.login(credentials);
  }
}
```
  File: `app.html`

```html
<form (submit)="onSubmit($event)">
  <label>
    Email:
    <input type="email" [formField]="loginForm.email" />
  </label>

  <label>
    Password:
    <input type="password" [formField]="loginForm.password" />
  </label>

  <p>Hello {{ loginForm.email().value() }}!</p>
  <p>Password length: {{ loginForm.password().value().length }}</p>

  <button type="submit">Log In</button>
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
  font-family: Inter, system-ui, -apple-system, sans-serif;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
}

p {
  margin: 0.5rem 0;
  color: #666;
}
```

## Basic usage

The `[formField]` directive works with all standard HTML input types. Here are the most common patterns:

### Text inputs

Text inputs work with various `type` attributes and textareas:

```html
<!-- Text and email -->
<input type="text" [formField]="form.name" />
<input type="email" [formField]="form.email" />
```

#### Numbers

Number inputs automatically convert between strings and numbers:

```html
<!-- Number - automatically converts to number type -->
<input type="number" [formField]="form.age" />
```

#### Date and time

Date inputs store values as `YYYY-MM-DD` strings, and time inputs use `HH:mm` format:

```html
<!-- Date and time - stores as ISO format strings -->
<input type="date" [formField]="form.eventDate" />
<input type="time" [formField]="form.eventTime" />
```

If you need to convert date strings to Date objects, you can do so by passing the field value into `Date()`:

```ts
const dateObject = new Date(form.eventDate().value());
```

#### Multiline text

Textareas work the same way as text inputs:

```html
<!-- Textarea -->
<textarea [formField]="form.message" rows="4"></textarea>
```

### Checkboxes

Checkboxes bind to boolean values:

```html
<!-- Single checkbox -->
<label>
  <input type="checkbox" [formField]="form.agreeToTerms" />
  I agree to the terms
</label>
```

#### Multiple checkboxes

For multiple options, create a separate boolean `formField` for each:

```html
<label>
  <input type="checkbox" [formField]="form.emailNotifications" />
  Email notifications
</label>
<label>
  <input type="checkbox" [formField]="form.smsNotifications" />
  SMS notifications
</label>
```

### Radio buttons

Radio buttons work similarly to checkboxes. As long as the radio buttons use the same `[formField]` value, Signal Forms will automatically bind the same `name` attribute to all of them:

```html
<label>
  <input type="radio" value="free" [formField]="form.plan" />
  Free
</label>
<label>
  <input type="radio" value="premium" [formField]="form.plan" />
  Premium
</label>
```

When a user selects a radio button, the form `formField` stores the value from that radio button's `value` attribute. For example, selecting "Premium" sets `form.plan().value()` to `"premium"`.

### Select dropdowns

Select elements work with both static and dynamic options:

```angular-html
<!-- Static options -->
<select [formField]="form.country">
  <option value="">Select a country</option>
  <option value="us">United States</option>
  <option value="ca">Canada</option>
</select>

<!-- Dynamic options with @for -->
<select [formField]="form.productId">
  <option value="">Select a product</option>
  @for (product of products; track product.id) {
    <option [value]="product.id">{{ product.name }}</option>
  }
</select>
```

NOTE: Multiple select (`<select multiple>`) is not supported by the `[formField]` directive at this time.

## Validation and state

Signal Forms provides built-in validators that you can apply to your form fields. To add validation, pass a schema function as the second argument to `form()`:

```ts
const loginForm = form(loginModel, (schemaPath) => {
  debounce(schemaPath.email, 500);
  required(schemaPath.email);
  email(schemaPath.email);
});
```

The schema function receives a **schema path** parameter that provides paths to your fields for configuring validation rules.

Common validators include:

- **`required()`** - Ensures the field has a value
- **`email()`** - Validates email format
- **`min()`** / **`max()`** - Validates number ranges
- **`minLength()`** / **`maxLength()`** - Validates string or collection length
- **`pattern()`** - Validates against a regex pattern

You can also customize error messages by passing an options object as the second argument to the validator:

```ts
required(schemaPath.email, {message: 'Email is required'});
email(schemaPath.email, {message: 'Please enter a valid email address'});
```

Each node in the `FieldTree` exposes its validation and interaction state through reactive signals.

### FieldTree State Signals

Every node in the tree, including the root form object, provides the same signals to track its state. Since every node is a `FieldTree`, the API for monitoring validity and interaction is identical at every level.

| State        | Description                                                                     |
| ------------ | ------------------------------------------------------------------------------- |
| `valid()`    | Returns `true` if the node passes all validation rules                          |
| `invalid()`  | Returns `true` if there are validation errors                                   |
| `pending()`  | Returns `true` if async validation is in progress                               |
| `touched()`  | Returns `true` if the user has focused and blurred the field or any child field |
| `dirty()`    | Returns `true` if the value has been changed by the user                        |
| `disabled()` | Returns `true` if the node is disabled                                          |
| `readonly()` | Returns `true` if the node is readonly                                          |
| `errors()`   | Returns an array of validation errors with `kind` and `message` properties      |

### Complete example {#complete-example-validation}

  File: `app.ts`

```ts
import {Component, signal} from '@angular/core';
import {email, form, FormField, required} from '@angular/forms/signals';

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
    // Perform login logic here
    const credentials = this.loginModel();
    console.log('Logging in with:', credentials);
    // e.g., await this.authService.login(credentials);
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
      <div class="error-list">
        @for (error of loginForm.password().errors(); track error) {
          <p>{{ error.message }}</p>
        }
      </div>
    }
  </div>

  <button type="submit">Log In</button>
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

.error-list p {
  margin: 0;
}
```

## Next steps

To learn more about Signal Forms and how it works, check out the in-depth guides:

- Overview - Introduction to Signal Forms and when to use them
- Form models - Creating and managing form data with signals
- Field state management - Working with validation state, interaction tracking, and field visibility
- Validation - Built-in validators, custom validation rules, and async validation

  - Modular design with dependency injection
