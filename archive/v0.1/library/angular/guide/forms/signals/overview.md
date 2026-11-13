---
title: "Forms with Angular Signals"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/forms/signals/overview.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Forms with Angular Signals

Signal Forms is a library that allows you to manage form state in Angular applications by building on the reactive foundation of signals. With automatic two-way binding, type-safe field access, and schema-based validation, Signal Forms help you create robust forms.

TIP: For a quick introduction to Signal Forms, see the Signal Forms essentials guide.

## Why Signal Forms?

Building forms in web applications involves managing several interconnected concerns: tracking field values, validating user input, handling error states, and keeping the UI synchronized with your data model. Managing these concerns separately creates boilerplate code and complexity.

Signal Forms address these challenges by:

- **Synchronizing state automatically** - Automatically syncs the form data model with bound form fields
- **Providing type safety** - Supports fully type safe schemas & bindings between your UI controls and data model
- **Centralizing validation logic** - Define all validation rules in one place using a validation schema

Signal Forms work best in new applications built with signals. If you're working with an existing application that uses reactive forms, reactive forms remain a solid choice.

NOTE: If you're coming from template or reactive forms, you may be interested in the comparison guide.

## Prerequisites

Signal Forms require:

- Angular v21 or higher

## Setup

Signal Forms are already included in the `@angular/forms` package. Import the necessary functions and directives from `@angular/forms/signals`:

```ts
import {form, FormField, required, email} from '@angular/forms/signals';
```

The `FormField` directive must be imported into any component that binds form fields to HTML inputs:

```ts
@Component({
  // ...
  imports: [FormField],
})
```

## Next steps

To learn more about how Signal Forms work, check out the following guides:

  - Signal forms essentials
  - Form models
  - Designing your form model
  - Field state management
  - Validation
  - Custom controls
  - Comparison with other form systems
