---
title: "Designing your form model (part 1 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/forms/signals/designing-your-form-model.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Designing your form model

Signal Forms uses a model-driven approach, deriving the form's state and structure directly from the model you provide. Because it serves as the foundation of the entire form, it is important to start with a well-designed form model. This guide explores best practices for designing form models.

## Form model vs domain model

Forms are used to collect user input. Your application likely has a domain model used to represent this input in a way that's optimized for business logic or storage. However, this is often _different_ than how we want to model the data in our form.

The form model represents the raw user input as it appears in the UI. For instance, in a form you might ask a user to pick a date and a time slot for an appointment as separate input fields, even if your domain model represents it as a single JavaScript `Date` object.

```ts
interface AppointmentFormModel {
  name: string; // Appointment owner's name
  date: Date; // Appointment date (carries only date information, time component is unused)
  time: string; // Selected time as a string
}

interface AppointmentDomainModel {
  name: string; // Appointment owner's name
  time: Date; // Appointment time (carries both date and time information)
}
```

Forms should use a form model tailored to the input experience, rather than simply repurposing the domain model.

## Form model best practices

### Use specific types

Always define interfaces or types for your models as shown in Using TypeScript types. Explicit types provide better IntelliSense, catch errors at compile time, and serve as documentation for what data the form contains.

### Initialize all fields

Provide initial values for every field in your model:

```ts
const taskModel = signal({
  title: '',
  description: '',
  priority: 'medium',
  completed: false,
});
```

```ts
const taskModel = signal({
  title: '',
  // Missing description, priority, completed
});
```

Missing initial values mean those fields won't exist in the field tree, making them inaccessible for form interactions.

### Keep models focused

Each model should represent a single form or a cohesive set of related data:

```ts
const loginModel = signal({
  email: '',
  password: '',
});
```

```ts
const appModel = signal({
  // Login data
  email: '',
  password: '',
  // User preferences
  theme: 'light',
  language: 'en',
  // Shopping cart
  cartItems: [],
});
```

Separate models for different concerns makes forms easier to understand and reuse. Create multiple forms if you're managing distinct sets of data.

### Consider validation requirements

Design models with validation in mind. Group fields that validate together:

```ts
// Password <example-value> grouped for comparison
interface PasswordChangeData {
  currentPassword: <example-value>;
  newPassword: <example-value>;
  confirmPassword: <example-value>;
}
```

This structure makes cross-field validation (like checking if `newPassword` matches `confirmPassword`) more natural.

### Match data types to UI controls

Properties on your form model should match the data types expected by your UI controls.

For example, consider a beverage order form with a `size` field (6, 12, or 24 pack) and a `quantity` field. The UI uses a dropdown (`<select>`) for size and a number input (``) for quantity.

Although the size options look numeric, `<select>` elements work with string values, so `size` should be modeled as a string. An `` on the other hand, does work with numbers, so `quantity` can be modeled as a number.

```ts
interface BeverageOrderFormModel {
  size: string; // Bound to: <select> (option values: "6", "12", "24")
  quantity: number; // Bound to: <input type="number">
}
```

### Avoid `undefined`

A form model must not contain `undefined` values or properties. In Signal Forms the structure of the form is derived from the structure of the model, and `undefined` signifies the _absence of a field_, rather than a field with an empty value. This means you must also avoid optional fields (e.g., `{property?: string}`), as they implicitly allow `undefined`.

To represent a property with an empty value in your form model, use a value that the UI control understands to mean "empty" (e.g. `""` for a ``). If you're designing a custom UI control, `null` often works as a good value to signify "empty".

```ts
interface UserFormModel {
  name: string; // Bound to <input type="text">
  birthday: Date | null; // Bound to <input type="date">
}

// Initialize our form with empty values.
form(signal({name: '', birthday: null}));
```

### Avoid models with dynamic structure

A form model has a dynamic structure if it changes shape (if the properties on the object change) based on its value. This happens when the model type allows for values with different shapes, such as a union of object types that have different properties, or a union of an object and a primitive. The following sections examine a few common scenarios where models with a dynamic structure might seem appealing, but ultimately prove problematic.

#### Empty value for a complex object

We often use forms to ask users to enter brand new data, rather than edit existing data in a system. A good example of this is an account creation form. We might model that using the following form model.

```ts
interface CreateAccountFormModel {
  name: {
    first: string;
    last: string;
  };
  username: string;
}
```

When creating the form we encounter a dilemma, what should the initial value in the model be? It may be tempting to create a `form<CreateAccountFormModel | null>()` since we don't have any input from the user yet.

```ts
createAccountForm = form<CreateAccountFormModel | null>(signal(/* what goes here, null? */));
```

However, it is important to remember that Signal Forms is _model driven_. If our model is `null` and `null` doesn't have a `name` or `username` property, that means our form won't have those subfields either. Instead what we really want is an instance of `CreateAccountFormModel` with all of its leaf fields set to an empty value.

```ts
createAccountForm = form<CreateAccountFormModel>(
  signal({
    name: {
      first: '',
      last: '',
    },
    username: '',
  }),
);
```

Using this representation, all of the subfields we need now exist, and we can bind them using the `[formField]` directive in our template.

```html
First: <input [formField]="createAccountForm.name.first" /> Last:
<input [formField]="createAccountForm.name.last" /> Username:
<input [formField]="createAccountForm.username" />
```

#### Fields that are conditionally hidden or unavailable

Forms aren't always linear. You often need to create conditional paths based on previous user input. One example of this is a form where we give the user different payment options. Let's start by imagining what the UI for such a form might look like.

```html
Name: <input type="text" />

<section>
  <h2>Payment Info</h2>
  <input type="radio" /> Credit Card @if (/* credit card selected */) {
  <section>
    Card Number <input type="text" /> Security Code <input type="text" /> Expiration
    <input type="text" />
  </section>
  }
  <input type="radio" /> Bank Account @if (/* bank account selected */) {
  <section>Account Number <input type="text" /> Routing Number <input type="text" /></section>
  }
</section>
```

The best way to handle this is to use a form model with a static structure that includes fields for _all_ potential payment methods. In our schema, we can hide or disable the fields that are not currently available.

```ts
interface BillPayFormModel {
  name: string;
  method: {
    type: string;
    card: {
      cardNumber: string;
      securityCode: string;
      expiration: string;
    };
    bank: {
      accountNumber: string;
      routingNumber: string;
    };
  };
}

const billPaySchema = schema<BillPayFormModel>((billPay) => {
  // Hide credit card details when user has selected a method other than credit card.
  hidden(billPay.method.card, {when: ({valueOf}) => valueOf(billPay.method.type) !== 'card'});
  // Hide bank account details when user has selected a method other than bank account.
  hidden(billPay.method.bank, {when: ({valueOf}) => valueOf(billPay.method.type) !== 'bank'});
});
```

Using this model, both `card` and `bank` objects are always present in the form's state. When the user switches payment methods, we only update the `type` property. The data they entered into the card fields remains safely stored in the `card` object, ready to be redisplayed if they switch back.

In contrast, a dynamic form model may initially seem like a good fit for this use case. After all, we don't need fields for account and routing number if the user selected "Credit Card". We may be tempted to model this as a discriminated union:

```ts
interface BillPayFormModel {
  name: string;
  method:
    | {
        type: 'card';
        cardNumber: string;
        securityCode: string;
        expiration: string;
      }
    | {
        type: 'bank';
        accountNumber: string;
        routingNumber: string;
      };
}
```

However, consider what would happen in the following scenario:

1. User fills out their name and credit card information
2. They're about to submit, but at the last moment they notice the convenience fee.
3. They toggle to the bank account option instead, figuring they might as well avoid the fee.
4. As they're about to enter the bank account info, they have second thoughts, they wouldn't want it to wind up in a leak.
5. They toggle back to credit card option, but they notice all the info they just entered is gone!

This illustrates another problem with form models that have a dynamic structure: they can cause data loss. A model like this assumes that once a field becomes hidden, the information in it will never be needed again. It replaces the credit card information with the bank information, and has no way to get the credit card information back.

#### Exceptions

While static structure is generally preferred, there are specific scenarios where dynamic structure is necessary and supported.

##### Arrays

Arrays are the most common exception. Forms often need to collect a variable number of items, such as a list of phone numbers, attendees, or line items in an order.

```ts
interface SendEmailFormModel {
  subject: string;
  recipientEmails: string[];
}
```

In this case, the `recipientEmails` array grows and shrinks as the user interacts with the form. While the length of the array is dynamic, the structure of the individual items should be consistent (each item should have the same shape).

##### Fields that are treated atomically by the UI control

Another case where dynamic structure is acceptable is when a complex object is treated as a single, atomic value by the UI control. That is, if the control does not attempt to bind to or access any of its sub-fields individually. In this scenario, the control updates the value by replacing the entire object at once, rather than modifying its internal properties. Because the form structure is irrelevant in this scenario, it's acceptable for that structure to be dynamic.

For example, consider a user profile form that includes a `location` field. The location is selected using a complex "location picker" widget (perhaps a map or a search-ahead dropdown) that returns a coordinate object. In the case where the location is not yet selected, or the user chooses not to share their location, the picker indicates the location as `null`.

```ts
interface Location {
  lat: number;
  lng: number;
}

interface UserProfileFormModel {
  username: string;
  // This property has dynamic structure,
  // but that's ok because the location picker treats this field as atomic.
  location: Location | null;
}
```

In the template, we bind the `location` field directly to our custom control:

```html
Username: <input [formField]="userForm.username" /> Location:
<location-picker [formField]="userForm.location"></location-picker>
```

Here, `<location-picker>` consumes and produces the entire `Location` object (or `null`), and doesn't access `userForm.location.lat` or `userForm.location.lng`. Therefore, `location` can safely have a dynamic shape without violating the principles of model-driven forms.
