---
title: "Tag Helpers in forms in ASP.NET Core (part 3 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/mvc/views/working-with-forms.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Tag Helpers in forms in ASP.NET Core (part 3 of 4)

## The Label Tag Helper

* Generates the label caption and `for` attribute on a \ element for an expression name.

* HTML Helper alternative: `Html.LabelFor`.

The `Label Tag Helper`  provides the following benefits over a pure HTML label element:

* You automatically get the descriptive label value from the `Display` attribute. The intended display name might change over time, and the combination of `Display` attribute and Label Tag Helper will apply the `Display` everywhere it's used.

* Less markup in source code.

* Strong typing with the model property.

Sample:

```csharp
﻿using System.ComponentModel.DataAnnotations;

namespace FormsTagHelper.ViewModels
{
    public class SimpleViewModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email Address")]
        public string Email { get; set; }
    }
}
```

```cshtml
﻿@model SimpleViewModel

<form asp-controller="Demo" asp-action="RegisterLabel" method="post">
    <label asp-for="Email"></label>
    <input asp-for="Email" /> <br />
</form>
```

The following HTML is generated for the `` element:

```html
<label for="Email">Email Address</label>
```

The Label Tag Helper generated the `for` attribute value of "Email", which is the ID associated with the `` element. The Tag Helpers generate consistent `id` and `for` elements so they can be correctly associated. The caption in this sample comes from the `Display` attribute. If the model didn't contain a `Display` attribute, the caption would be the property name of the expression. To override the default caption, add a caption inside the label tag.

## The Validation Tag Helpers

There are two Validation Tag Helpers. The `Validation Message Tag Helper` (which displays a validation message for a single property on your model), and the `Validation Summary Tag Helper` (which displays a summary of validation errors). The `Input Tag Helper` adds HTML5 client side validation attributes to input elements based on data annotation attributes on your model classes. Validation is also performed on the server. The Validation Tag Helper displays these error messages when a validation error occurs.

### The Validation Message Tag Helper

* Adds the HTML5  `data-valmsg-for="property"` attribute to the span element, which attaches the validation error messages on the input field of the specified model property. When a client side validation error occurs, jQuery displays the error message in the `` element.

* Validation also takes place on the server. Clients might have JavaScript disabled and some validation can only be done on the server side.

* HTML Helper alternative: `Html.ValidationMessageFor`.

The `Validation Message Tag Helper`  is used with the `asp-validation-for` attribute on an HTML span element.

```cshtml
<span asp-validation-for="Email"></span>
```

The Validation Message Tag Helper will generate the following HTML:

```html
<span class="field-validation-valid"
  data-valmsg-for="Email"
  data-valmsg-replace="true"></span>
```

You generally use the `Validation Message Tag Helper`  after an `Input` Tag Helper for the same property. Doing so displays any validation error messages near the input that caused the error.

> **Note:**
> You must have a view with the correct JavaScript and jQuery script references in place for client side validation. For more information, see Model Validation.

When a server side validation error occurs (for example when you have custom server side validation or client-side validation is disabled), MVC places that error message as the body of the `` element.

```html
<span class="field-validation-error" data-valmsg-for="Email"
            data-valmsg-replace="true">
   The Email Address field is required.
</span>
```

### The Validation Summary Tag Helper

* Targets `` elements with the `asp-validation-summary` attribute.

* HTML Helper alternative: `@Html.ValidationSummary`.

The `Validation Summary Tag Helper`  is used to display a summary of validation messages. The `asp-validation-summary` attribute value can be any of the following:

| asp-validation-summary | Validation messages displayed |
|------------------------|-------------------------------|
| `All`                  | Property and model level      |
| `ModelOnly`            | Model                         |
| `None`                 | None                          |

### Sample

In the following example, the data model has `DataAnnotation` attributes, which generates validation error messages on the `` element. When a validation error occurs, the Validation Tag Helper displays the error message:

```csharp
﻿using System.ComponentModel.DataAnnotations;

namespace FormsTagHelper.ViewModels
{
    public class RegisterViewModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email Address")]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
```

```cshtml
﻿@model RegisterViewModel

<form asp-controller="Demo" asp-action="RegisterValidation" method="post">
    <div asp-validation-summary="ModelOnly"></div>
    <label>Email: <input asp-for="Email" /></label> <br />
    <span asp-validation-for="Email"></span><br />
    <label>Password: <input asp-for="<example-value>" /></label><br />
    <span asp-validation-for="<example-value>"></span><br />
    <button type="submit">Register</button>
</form>
```

The generated HTML (when the model is valid):

```html
<form action="/DemoReg/Register" method="post">
  <label>Email: <input name="Email" id="Email" type="email" value=""
   data-val-required="The Email field is required."
   data-val-email="The Email field is not a valid email address."
   data-val="true"></label><br>
  <span class="field-validation-valid" data-valmsg-replace="true"
   data-valmsg-for="Email"></span><br>
  <label>Password: <input name="<example-value>" id="<example-value>" type="<example-value>"
   data-val-required="<example-value>" data-val="<example-value>"></label><br>
  <span class="field-validation-valid" data-valmsg-replace="true"
   data-valmsg-for="<example-value>"></span><br>
  <button type="submit">Register</button>
  <input name="<example-value>" type="<example-value>" value="<example-value>">
</form>
```
