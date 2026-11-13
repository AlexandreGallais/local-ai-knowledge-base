---
title: "ASP.NET Core Blazor forms overview (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/forms/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor forms overview

-->
-->

This article explains how to use forms in Blazor.

## Input components and forms

The Blazor framework supports forms and provides built-in input components:

* Bound to an object or model that can use data annotations.
  * HTML forms with the `<form>` element.
  * `Microsoft.AspNetCore.Components.Forms.EditForm` components.
* Built-in input components.

In Blazor Web Apps that use static server-side rendering (static SSR), input components automatically participate in client-side validation when the form contains a `Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator` component. For details, see ASP.NET Core Blazor client-side form validation in static SSR.

> **Note:**
> Unsupported ASP.NET Core validation features are covered in the Unsupported validation features section.

The `Microsoft.AspNetCore.Components.Forms` namespace provides:

* Classes for managing form elements, state, and validation.
* Access to built-in :::no-loc text="Input*"::: components.

A project created from the Blazor project template includes the namespace in the app's imports file (`_Imports.razor`), which makes the namespace available to the app's Razor components.

Standard HTML forms are supported. Create a form using the normal HTML `<form>` tag and specify an `@onsubmit` handler for handling the submitted form request.

`StarshipPlainForm.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/StarshipPlainForm.razor._
In the preceding `StarshipPlainForm` component:

* The form is rendered where the `<form>` element appears. The form is named with the `@formname` directive attribute, which uniquely identifies the form to the Blazor framework.
* The model is created in the component's `@code` block and held in a `public` property (`Model`). The `[SupplyParameterFromForm]` attribute indicates that the value of the associated property should be supplied from the form data. Data in the request that matches the property's name is bound to the property.
* The `Microsoft.AspNetCore.Components.Forms.InputText` component is an input component for editing string values. The `@bind-Value` directive attribute binds the `Model.Id` model property to the `Microsoft.AspNetCore.Components.Forms.InputText` component's `Microsoft.AspNetCore.Components.Forms.InputBase`1.Value` property.
* The `Submit` method is registered as a handler for the  `@onsubmit` callback. The handler is called when the form is submitted by the user.

> **Important:**
> Always use the `@formname` directive attribute with a unique form name.

Blazor enhances page navigation and form handling by intercepting the request in order to apply the response to the existing DOM, preserving as much of the rendered form as possible. The enhancement avoids the need to fully load the page and provides a much smoother user experience, similar to a single-page app (SPA), although the component is rendered on the server. For more information, see ASP.NET Core Blazor navigation.

Streaming rendering is supported for plain HTML forms. Note that when `POST`ing a form, only DOM updates inside the form's handlers are streamed (for example, `@onsubmit`). Updates inside `OnInitializedAsync` are only streamed for `GET` requests. For more information, see Allow streaming the loading phase of POST responses (`dotnet/aspnetcore` #50994).

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

The preceding example includes antiforgery support by including an `Microsoft.AspNetCore.Components.Forms.AntiforgeryToken` component in the form. Antiforgery support is explained further in the Antiforgery support section of this article.

To submit a form based on another element's DOM events, for example `oninput` or `onblur`, use JavaScript to submit the form (`submit`).

Instead of using plain forms in Blazor apps, a form is typically defined with Blazor's built-in form support using the framework's `Microsoft.AspNetCore.Components.Forms.EditForm` component. The following Razor component demonstrates typical elements, components, and Razor code to render a webform using an `Microsoft.AspNetCore.Components.Forms.EditForm` component.

`Starship1.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Starship1.razor._
In the preceding `Starship1` component:

* The `Microsoft.AspNetCore.Components.Forms.EditForm` component is rendered where the `<EditForm>` element appears. The form is named with the `Microsoft.AspNetCore.Components.Forms.EditForm.FormName` property, which uniquely identifies the form to the Blazor framework.
* The model is created in the component's `@code` block and held in a `public` property (`Model`). The property is assigned to the `Microsoft.AspNetCore.Components.Forms.EditForm.Model` parameter. The `[SupplyParameterFromForm]` attribute indicates that the value of the associated property should be supplied from the form data. Data in the request that matches the property's name is bound to the property.
* The `Microsoft.AspNetCore.Components.Forms.InputText` component is an input component for editing string values. The `@bind-Value` directive attribute binds the `Model.Id` model property to the `Microsoft.AspNetCore.Components.Forms.InputText` component's `Microsoft.AspNetCore.Components.Forms.InputBase`1.Value` property.
* The `Submit` method is registered as a handler for the `Microsoft.AspNetCore.Components.Forms.EditForm.OnSubmit` callback. The handler is called when the form is submitted by the user.

> **Important:**
> Always use the `Microsoft.AspNetCore.Components.Forms.EditForm.FormName` property with a unique form name.

Blazor enhances page navigation and form handling for `Microsoft.AspNetCore.Components.Forms.EditForm` components. For more information, see ASP.NET Core Blazor navigation.

Streaming rendering is supported for `Microsoft.AspNetCore.Components.Forms.EditForm`. Note that when `POST`ing a form, only DOM updates inside the form's handlers are streamed (for example, `OnValidSubmit`). Updates inside `OnInitializedAsync` are only streamed for `GET` requests. For more information, see Allow streaming the loading phase of POST responses (`dotnet/aspnetcore` #50994).

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

&dagger;For more information on property binding, see ASP.NET Core Blazor data binding.

In the next example, the preceding component is modified to create the form in the `Starship2` component:

* `Microsoft.AspNetCore.Components.Forms.EditForm.OnSubmit` is replaced with `Microsoft.AspNetCore.Components.Forms.EditForm.OnValidSubmit`, which processes assigned event handler if the form is valid when submitted by the user.
* A `Microsoft.AspNetCore.Components.Forms.ValidationSummary` component is added to display validation messages when the form is invalid on form submission.
* The data annotations validator (`Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator` component&dagger;) attaches validation support using data annotations:
  * If the `` form field is left blank when the **`Submit`** button is selected, an error appears in the validation summary (`Microsoft.AspNetCore.Components.Forms.ValidationSummary` component&Dagger;) ("`The Id field is required.`") and `Submit` is **not** called.
  * If the `` form field contains more than ten characters when the **`Submit`** button is selected, an error appears in the validation summary ("`Id is too long.`"). `Submit` is **not** called.
  * If the `` form field contains a valid value when the **`Submit`** button is selected, `Submit` is called.

&dagger;The `Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator` component is covered in the Data Annotations Validator component and custom validation section. &Dagger;The `Microsoft.AspNetCore.Components.Forms.ValidationSummary` component is covered in the Validation Summary and Validation Message components section.

`Starship2.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Starship2.razor._
## Handle form submission

The `Microsoft.AspNetCore.Components.Forms.EditForm` provides the following callbacks for handling form submission:

* Use `Microsoft.AspNetCore.Components.Forms.EditForm.OnValidSubmit` to assign an event handler to run when a form with valid fields is submitted.
* Use `Microsoft.AspNetCore.Components.Forms.EditForm.OnInvalidSubmit` to assign an event handler to run when a form with invalid fields is submitted.
* Use `Microsoft.AspNetCore.Components.Forms.EditForm.OnSubmit` to assign an event handler to run regardless of the form fields' validation status. The form is validated by calling `Microsoft.AspNetCore.Components.Forms.EditContext.Validate*` in the event handler method. If `Microsoft.AspNetCore.Components.Forms.EditContext.Validate*` returns `true`, the form is valid.

During static server-side rendering (static SSR), when a `<form>` or `Microsoft.AspNetCore.Components.Forms.EditForm` doesn't specify an explicit `action` attribute, Blazor automatically renders an `action` attribute set to the current request's root-relative path and query string, which is derived from `Microsoft.AspNetCore.Components.NavigationManager.Uri`.

## Clear a form or field

Reset a form by clearing its model back to its default state, which can be performed inside or outside of an `Microsoft.AspNetCore.Components.Forms.EditForm`'s markup:

```razor
<button @onclick="ClearForm">Clear form</button>

...

private void ClearForm() => Model = new();
```

Alternatively, use an explicit Razor expression:

```razor
<button @onclick="@(() => Model = new())">Clear form</button>
```

Reset a field by clearing its model value back to its default state:

```razor
<button @onclick="ResetId">Reset Identifier</button>

...

private void ResetId() => Model!.Id = string.Empty;
```

Alternatively, use an explicit Razor expression:

```razor
<button @onclick="@(() => Model!.Id = string.Empty)">Reset Identifier</button>
```

There's no need to call `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` in the preceding examples because `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` is automatically called by the Blazor framework to rerender the component after an event handler is invoked. If an event handler isn't used to invoke the methods that clear a form or field, then developer code should call `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` to rerender the component.
