---
title: "Building a template-driven form (part 2 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/forms/template-driven-forms.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Building a template-driven form (part 2 of 2)

## Track control states

Adding the `NgModel` directive to a control adds class names to the control that describe its state.
These classes can be used to change a control's style based on its state.

The following table describes the class names that Angular applies based on the control's state.

| States                           | Class if true | Class if false |
| :------------------------------- | :------------ | :------------- |
| The control has been visited.    | `ng-touched`  | `ng-untouched` |
| The control's value has changed. | `ng-dirty`    | `ng-pristine`  |
| The control's value is valid.    | `ng-valid`    | `ng-invalid`   |

Angular also applies the `ng-submitted` class to `form` elements upon submission, but not to the controls inside the `form` element.

You use these CSS classes to define the styles for your control based on its status.

### Observe control states

To see how the classes are added and removed by the framework, open the browser's developer tools and inspect the `` element that represents the actor name.

1. Using your browser's developer tools, find the `` element that corresponds to the **Name** input box.
   You can see that the element has multiple CSS classes in addition to "form-control".

1. When you first bring it up, the classes indicate that it has a valid value, that the value has not been changed since initialization or reset, and that the control has not been visited since initialization or reset.

   ```html
   <input class="form-control ng-untouched ng-pristine ng-valid" />
   ```

1. Take the following actions on the **Name** `` box, and observe which classes appear.
   - Look but don't touch.
     The classes indicate that it is untouched, pristine, and valid.

   - Click inside the name box, then click outside it.
     The control has now been visited, and the element has the `ng-touched` class instead of the `ng-untouched` class.

   - Add slashes to the end of the name.
     It is now touched and dirty.

   - Erase the name.
     This makes the value invalid, so the `ng-invalid` class replaces the `ng-valid` class.

### Create visual feedback for states

The `ng-valid`/`ng-invalid` pair is particularly interesting, because you want to send a
strong visual signal when the values are invalid.
You also want to mark required fields.

You can mark required fields and invalid data at the same time with a colored bar
on the left of the input box.

To change the appearance in this way, take the following steps.

1. Add definitions for the `ng-*` CSS classes.
1. Add these class definitions to a new `forms.css` file.
1. Add the new file to the project as a sibling to `index.html`:

   File: `forms.css`

```css
.ng-valid[required], .ng-valid.required  {
  border-left: 5px solid #42A948; /* green */
}

.ng-invalid:not(form)  {
  border-left: 5px solid #a94442; /* red */
}
```

1. In the `index.html` file, update the `<head>` tag to include the new style sheet.

   File: `index.html (styles)`

```html
<link rel="stylesheet" href="assets/forms.css" />
```

### Show and hide validation error messages

The **Name** input box is required and clearing it turns the bar red.
That indicates that something is wrong, but the user doesn't know what is wrong or what to do about it.
You can provide a helpful message by checking for and responding to the control's state.

The **Skill** select box is also required, but it doesn't need this kind of error handling because the selection box already constrains the selection to valid values.

To define and show an error message when appropriate, take the following steps.

### Add a local reference to the input
Extend the `input` tag with a template reference variable that you can use to access the input box's Angular control from within the template. In the example, the variable is `#name="ngModel"`.

The template reference variable (`#name`) is set to `"ngModel"` because that is the value of the `NgModel.exportAs` property. This property tells Angular how to link a reference variable to a directive.

### Add the error message
Add a `` that contains a suitable error message.

### Make the error message conditional
Show or hide the error message by binding properties of the `name` control to the message `` element's `hidden` property.

File: `actor-form.component.html (hidden-error-msg)`

```html
<div [hidden]="name.valid || name.pristine" class="alert alert-danger">
```

### Add a conditional error message to name
Add a conditional error message to the `name` input box, as in the following example.

File: `actor-form.component.html (excerpt)`

```html
<label for="name">Name</label>
<input
  type="text"
  class="form-control"
  id="name"
  required
  [(ngModel)]="model.name"
  name="name"
  #name="ngModel"
/>
<div [hidden]="name.valid || name.pristine" class="alert alert-danger">
  Name is required
</div>
```

In this example, you hide the message when the control is either valid or _pristine_.
Pristine means the user hasn't changed the value since it was displayed in this form.
If you ignore the `pristine` state, you would hide the message only when the value is valid.
If you arrive in this component with a new, blank actor or an invalid actor, you'll see the error message immediately, before you've done anything.

You might want the message to display only when the user makes an invalid change.
Hiding the message while the control is in the `pristine` state achieves that goal.
You'll see the significance of this choice when you add a new actor to the form in the next step.

## Add a new actor

This exercise shows how you can respond to a native HTML button-click event by adding to the model data.
To let form users add a new actor, you will add a **New Actor** button that responds to a click event.

1. In the template, place a "New Actor" `` element at the bottom of the form.
1. In the component file, add the actor-creation method to the actor data model.

   File: `actor-form.component.ts (New Actor method)`

```ts
newActor() {
  this.model = new Actor(42, '', '');
}
```

1. Bind the button's click event to an actor-creation method, `newActor()`.

   File: `actor-form.component.html (New Actor button)`

```html
<button type="button" class="btn btn-default" (click)="newActor()">New Actor</button>
```

1. Run the application again and click the **New Actor** button.

   The form clears, and the _required_ bars to the left of the input box are red, indicating invalid `name` and `skill` properties.
   Notice that the error messages are hidden.
   This is because the form is pristine; you haven't changed anything yet.

1. Enter a name and click **New Actor** again.

   Now the application displays a `Name is required` error message, because the input box is no longer pristine.
   The form remembers that you entered a name before clicking **New Actor**.

1. To restore the pristine state of the form controls, clear all of the flags imperatively by calling the form's `reset()` method after calling the `newActor()` method.

   File: `actor-form.component.html (Reset the form)`

```html
<button type="button" class="btn btn-default" (click)="newActor(); actorForm.reset()">
  New Actor
</button>
```

   Now clicking **New Actor** resets both the form and its control flags.

## Submit the form with `ngSubmit`

The user should be able to submit this form after filling it in.
The **Submit** button at the bottom of the form does nothing on its own, but it does trigger a form-submit event because of its type (`type="submit"`).

To respond to this event, take the following steps.

### Listen to ngOnSubmit
Bind the form's `ngSubmit` event property to the actor-form component's `onSubmit()` method.

File: `actor-form.component.html (ngSubmit)`

```html
<form (ngSubmit)="onSubmit()" #actorForm="ngForm">
```

### Bind the disabled property
Use the template reference variable, `#actorForm` to access the form that contains the **Submit** button and create an event binding.

You will bind the form property that indicates its overall validity to the **Submit** button's `disabled` property.

File: `actor-form.component.html (submit-button)`

```html
<button type="submit" class="btn btn-success" [disabled]="!actorForm.form.valid">
  Submit
</button>
```

### Run the application
Notice that the button is enabled — although it doesn't do anything useful yet.

### Delete the Name value
This violates the "required" rule, so it displays the error message —and notice that it also disables the **Submit** button.

You didn't have to explicitly wire the button's enabled state to the form's validity.
The `FormsModule` did this automatically when you defined a template reference variable on the enhanced form element, then referred to that variable in the button control.

### Respond to form submission

To show a response to form submission, you can hide the data entry area and display something else in its place.

### Wrap the form
Wrap the entire form in a `` and bind its `hidden` property to the `ActorFormComponent.submitted` property.

File: `actor-form.component.html (excerpt)`

```html
<div [hidden]="submitted">
  <h1>Actor Form</h1>
  <form (ngSubmit)="onSubmit()" #actorForm="ngForm">
```

The main form is visible from the start because the `submitted` property is false until you submit the form, as this fragment from the `ActorFormComponent` shows:

File: `actor-form.component.ts (submitted)`

```ts
submitted = false;

onSubmit() {
  this.submitted = true;
}
```

When you click the **Submit** button, the `submitted` flag becomes true and the form disappears.

### Add the submitted state
To show something else while the form is in the submitted state, add the following HTML below the new `` wrapper.

File: `actor-form.component.html (excerpt)`

```html
<div [hidden]="!submitted">
  <h2>You submitted the following:</h2>
  <div class="row">
    <div class="col-xs-3">Name</div>
    <div class="col-xs-9">{{ model.name }}</div>
  </div>
  <div class="row">
    <div class="col-xs-3">Studio</div>
    <div class="col-xs-9">{{ model.studio }}</div>
  </div>
  <div class="row">
    <div class="col-xs-3">Skill</div>
    <div class="col-xs-9">{{ model.skill }}</div>
  </div>
  <br />
  <button type="button" class="btn btn-primary" (click)="submitted = false">Edit</button>
</div>
```

This ``, which shows a read-only actor with interpolation bindings, appears only while the component is in the submitted state.

The alternative display includes an _Edit_ button whose click event is bound to an expression that clears the `submitted` flag.

### Test the Edit button
Click the *Edit* button to switch the display back to the editable form.

## Summary

The Angular form discussed in this page takes advantage of the following
framework features to provide support for data modification, validation, and more.

- An Angular HTML form template
- A form component class with a `@Component` decorator
- Handling form submission by binding to the `NgForm.ngSubmit` event property
- Template-reference variables such as `#actorForm` and `#name`
- `[(ngModel)]` syntax for two-way data binding
- The use of `name` attributes for validation and form-element change tracking
- The reference variable's `valid` property on input controls indicates whether a control is valid or should show error messages
- Controlling the **Submit** button's enabled state by binding to `NgForm` validity
- Custom CSS classes that provide visual feedback to users about controls that are not valid

Here's the code for the final version of the application:

    File: `actor-form.component.ts`

```ts
import {Component} from '@angular/core';

import {Actor} from '../actor';
import {FormsModule} from '@angular/forms';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-actor-form',
  templateUrl: './actor-form.component.html',
  imports: [FormsModule, JsonPipe],
})
export class ActorFormComponent {
  skills = ['Method Acting', 'Singing', 'Dancing', 'Swordfighting'];

  model = new Actor(18, 'Tom Cruise', this.skills[3], 'CW Productions');

  submitted = false;

  onSubmit() {
    this.submitted = true;
  }
```
    File: `actor-form.component.html`

```html
<div class="container">
  <div [hidden]="submitted">
    <h1>Actor Form</h1>
    <form (ngSubmit)="onSubmit()" #actorForm="ngForm">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          [(ngModel)]="model.name"
          name="name"
          #name="ngModel"
        />
        <div [hidden]="name.valid || name.pristine" class="alert alert-danger">
          Name is required
        </div>
      </div>

      <div class="form-group">
        <label for="studio">Studio Affiliation</label>
        <input
          type="text"
          class="form-control"
          id="studio"
          [(ngModel)]="model.studio"
          name="studio"
        />
      </div>

      <div class="form-group">
        <label for="skill">Skill</label>
        <select
          class="form-control"
          id="skill"
          required
          [(ngModel)]="model.skill"
          name="skill"
          #skill="ngModel"
        >
          @for (skill of skills; track $index) {
            <option [value]="skill">{{ skill }}</option>
          }
        </select>
        <div [hidden]="skill.valid || skill.pristine" class="alert alert-danger">
          skill is required
        </div>
      </div>

      <button type="submit" class="btn btn-success" [disabled]="!actorForm.form.valid">
        Submit
      </button>
      <button type="button" class="btn btn-default" (click)="newActor(); actorForm.reset()">
        New Actor
      </button>
```
    File: `actor.ts`

```ts
export class Actor {
  constructor(
    public id: number,
    public name: string,
    public skill: string,
    public studio?: string,
  ) {}
}
```
    File: `app.component.html`

```html
<app-actor-form />
```
    File: `app.component.ts`

```ts
import {Component} from '@angular/core';
import {ActorFormComponent} from './actor-form/actor-form.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [ActorFormComponent],
})
export class AppComponent {}
```
    File: `main.ts`

```ts
import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {provideZoneChangeDetection} from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [provideZoneChangeDetection({eventCoalescing: true})],
}).catch((err) => console.error(err));
```
    File: `forms.css`

```css
.ng-valid[required], .ng-valid.required  {
  border-left: 5px solid #42A948; /* green */
}

.ng-invalid:not(form)  {
  border-left: 5px solid #a94442; /* red */
}
```
