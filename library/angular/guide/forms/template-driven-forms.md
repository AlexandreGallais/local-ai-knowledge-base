---
title: "Building a template-driven form (part 1 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/forms/template-driven-forms.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Building a template-driven form

This tutorial shows you how to create a template-driven form. The control elements in the form are bound to data properties that have input validation. The input validation helps maintain data integrity and styling to improve the user experience.

Template-driven forms use two-way data binding to update the data model in the component as changes are made in the template and vice versa.

**Template vs Reactive forms**
Angular supports two design approaches for interactive forms. Template-driven forms allow you to use form-specific directives in your Angular template. Reactive forms provide a model-driven approach to building forms.

Template-driven forms are a great choice for small or simple forms, while reactive forms are more scalable and suitable for complex forms. For a comparison of the two approaches, see Choosing an approach

You can build almost any kind of form with an Angular template — login forms, contact forms, and pretty much any business form.
You can lay out the controls creatively and bind them to the data in your object model.
You can specify validation rules and display validation errors, conditionally allow input from specific controls, trigger built-in visual feedback, and much more.

## Objectives

This tutorial teaches you how to do the following:

- Build an Angular form with a component and template
- Use `ngModel` to create two-way data bindings for reading and writing input-control values
- Provide visual feedback using special CSS classes that track the state of the controls
- Display validation errors to users and conditionally allow input from form controls based on the form status
- Share information across HTML elements using template reference variables

## Build a template-driven form

Template-driven forms rely on directives defined in the `FormsModule`.

| Directives     | Details                                                                                                                                                                                                                                                                         |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `NgModel`      | Reconciles value changes in the attached form element with changes in the data model, allowing you to respond to user input with input validation and error handling.                                                                                                           |
| `NgForm`       | Creates a top-level `FormGroup` instance and binds it to a `<form>` element to track aggregated form value and validation status. As soon as you import `FormsModule`, this directive becomes active by default on all `<form>` tags. You don't need to add a special selector. |
| `NgModelGroup` | Creates and binds a `FormGroup` instance to a DOM element.                                                                                                                                                                                                                      |

### Step overview

In the course of this tutorial, you bind a sample form to data and handle user input using the following steps.

1. Build the basic form.
   - Define a sample data model
   - Include required infrastructure such as the `FormsModule`
1. Bind form controls to data properties using the `ngModel` directive and two-way data-binding syntax.
   - Examine how `ngModel` reports control states using CSS classes
   - Name controls to make them accessible to `ngModel`
1. Track input validity and control status using `ngModel`.
   - Add custom CSS to provide visual feedback on the status
   - Show and hide validation-error messages
1. Respond to a native HTML button-click event by adding to the model data.
1. Handle form submission using the `ngSubmit` output property of the form.
   - Disable the **Submit** button until the form is valid
   - After submit, swap out the finished form for different content on the page

## Build the form

<!-- ```

```--

1. The provided sample application creates the `Actor` class which defines the data model reflected in the form.

   File: `actor.ts`

```typescript
export class Actor {
  constructor(
    public id: number,
    public name: string,
    public skill: string,
    public studio?: string,
  ) {}
}
```

1. The form layout and details are defined in the `ActorFormComponent` class.

   File: `actor-form.component.ts (v1)`

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

   The component's `selector` value of "app-actor-form" means you can drop this form in a parent template using the `<app-actor-form>` tag.

1. The following code creates a new actor instance, so that the initial form can show an example actor.

   ```typescript
const myActress = new Actor(42, 'Marilyn Monroe', 'Singing');
console.log('My actress is called ' + myActress.name); // "My actress is called Marilyn"
```

   This demo uses dummy data for `model` and `skills`.
   In a real app, you would inject a data service to get and save real data, or expose these properties as inputs and outputs.

1. The component enables the Forms feature by importing the `FormsModule` module.

   ```typescript
@Component({
  selector: 'app-actor-form',
  templateUrl: './actor-form.component.html',
  imports: [FormsModule, JsonPipe],
})
export class ActorFormComponent {
```

1. The form is displayed in the application layout defined by the root component's template.

   File: `app.component.html`

```html
<app-actor-form />
```

   The initial template defines the layout for a form with two form groups and a submit button.
   The form groups correspond to two properties of the Actor data model, name and studio.
   Each group has a label and a box for user input.
   - The **Name** `` control element has the HTML5 `required` attribute
   - The **Studio** `` control element does not because `studio` is optional

   The **Submit** button has some classes on it for styling.
   At this point, the form layout is all plain HTML5, with no bindings or directives.

1. The sample form uses some style classes from Twitter Bootstrap: `container`, `form-group`, `form-control`, and `btn`.
   To use these styles, the application's style sheet imports the library.

   File: `styles.css`

```css
@import url('https://unpkg.com/bootstrap@3.3.7/dist/css/bootstrap.min.css');
```

1. The form requires that an actor's skill is chosen from a predefined list of `skills` maintained internally in `ActorFormComponent`.
   The Angular `@for` loop iterates over the data values to populate the `<select>` element.

   File: `actor-form.component.html (skills)`

```html
<div class="form-group">
  <label for="skill">Skill</label>
  <select class="form-control" id="skill" required>
    @for (skill of skills; track $index) {
      <option [value]="skill">{{ skill }}</option>
    }
  </select>
</div>
```

If you run the application right now, you see the list of skills in the selection control.
The input elements are not yet bound to data values or events, so they are still blank and have no behavior.

## Bind input controls to data properties

The next step is to bind the input controls to the corresponding `Actor` properties with two-way data binding, so that they respond to user input by updating the data model, and also respond to programmatic changes in the data by updating the display.

The `ngModel` directive declared in the `FormsModule` lets you bind controls in your template-driven form to properties in your data model.
When you include the directive using the syntax for two-way data binding, `[(ngModel)]`, Angular can track the value and user interaction of the control and keep the view synced with the model.

1. Edit the template file `actor-form.component.html`.
1. Find the `` tag next to the **Name** label.
1. Add the `ngModel` directive, using two-way data binding syntax `[(ngModel)]="..."`.

File: `actor-form.component.html (excerpt)`

```html
<input type="text" class="form-control" id="name" required [(ngModel)]="model.name" name="name" />
TODO: remove this: {{ model.name }}
```

HELPFUL: This example has a temporary diagnostic interpolation after each input tag, `{{model.name}}`, to show the current data value of the corresponding property. The comment reminds you to remove the diagnostic lines when you have finished observing the two-way data binding at work.

### Access the overall form status

When you imported the `FormsModule` in your component, Angular automatically created and attached an NgForm directive to the `<form>` tag in the template (because `NgForm` has the selector `form` that matches `<form>` elements).

To get access to the `NgForm` and the overall form status, declare a template reference variable.

1. Edit the template file `actor-form.component.html`.
1. Update the `<form>` tag with a template reference variable, `#actorForm`, and set its value as follows.

   File: `actor-form.component.html (excerpt)`

```html
<form #actorForm="ngForm">
```

   The `actorForm` template variable is now a reference to the `NgForm` directive instance that governs the form as a whole.

1. Run the app.
1. Start typing in the **Name** input box.

   As you add and delete characters, you can see them appear and disappear from the data model.

The diagnostic line that shows interpolated values demonstrates that values are really flowing from the input box to the model and back again.

### Naming control elements

When you use `[(ngModel)]` on an element, you must define a `name` attribute for that element.
Angular uses the assigned name to register the element with the `NgForm` directive attached to the parent `<form>` element.

The example added a `name` attribute to the `` element and set it to "name", which makes sense for the actor's name.
Any unique value will do, but using a descriptive name is helpful.

1. Add similar `[(ngModel)]` bindings and `name` attributes to **Studio** and **Skill**.
1. You can now remove the diagnostic messages that show interpolated values.
1. To confirm that two-way data binding works for the entire actor model, add a new text binding with the `json` pipe at the top to the component's template, which serializes the data to a string.

After these revisions, the form template should look like the following:

File: `actor-form.component.html (excerpt)`

```html
{{ model | json }}
<div class="form-group">
  <label for="name">Name</label>
  <input
    type="text"
    class="form-control"
    id="name"
    required
    [(ngModel)]="model.name"
    name="name"
  />
</div>

<div class="form-group">
  <label for="studio">Studio</label>
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
  <select class="form-control" id="skill" required [(ngModel)]="model.skill" name="skill">
    @for (skill of skills; track $index) {
      <option [value]="skill">{{ skill }}</option>
    }
  </select>
</div>
```

You'll notice that:

- Each `` element has an `id` property.
  This is used by the `` element's `for` attribute to match the label to its input control.
  This is a standard HTML feature.

- Each `` element also has the required `name` property that Angular uses to register the control with the form.

When you have observed the effects, you can delete the `{{ model | json }}` text binding.

## Track form states

Angular applies the `ng-submitted` class to `form` elements after the form has been submitted. This class can be used to change the form's style after it has been submitted.
