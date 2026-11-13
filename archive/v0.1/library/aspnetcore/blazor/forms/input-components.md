---
title: "ASP.NET Core Blazor input components"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/forms/input-components.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor input components

-->
-->

This article describes Blazor's built-in input components.

## Input components

The Blazor framework provides built-in input components to receive and validate user input. The built-in input components in the following table are supported in an `Microsoft.AspNetCore.Components.Forms.EditForm` with an `Microsoft.AspNetCore.Components.Forms.EditContext`.

The components in the table are also supported outside of a form in Razor component markup. Inputs are validated when they're changed and when a form is submitted.

| Input component | Rendered as… |
| --------------- | ------------------- |
| `Microsoft.AspNetCore.Components.Forms.InputCheckbox` | `` |
| `Microsoft.AspNetCore.Components.Forms.InputDate`1` | `` |
| `Microsoft.AspNetCore.Components.Forms.InputFile` | `` |
| `Microsoft.AspNetCore.Components.Forms.InputNumber`1` | `` |
| `Microsoft.AspNetCore.Components.Forms.InputRadio`1` | `` |
| `Microsoft.AspNetCore.Components.Forms.InputRadioGroup`1` | Group of child `Microsoft.AspNetCore.Components.Forms.InputRadio`1` |
| `Microsoft.AspNetCore.Components.Forms.InputSelect`1` | `<select>` |
| `Microsoft.AspNetCore.Components.Forms.InputText` | `` |
| `Microsoft.AspNetCore.Components.Forms.InputTextArea` | `<textarea>` |
| `Label<TValue>` (.NET 11 or later) | `` |

For more information on the `Microsoft.AspNetCore.Components.Forms.InputFile` component, see ASP.NET Core Blazor file uploads.

All of the input components, including `Microsoft.AspNetCore.Components.Forms.EditForm`, support arbitrary attributes. Any attribute that doesn't match a component parameter is added to the rendered HTML element.

Input components provide default behavior for validating when a field is changed:

* For input components in a form with an `Microsoft.AspNetCore.Components.Forms.EditContext`, the default validation behavior includes updating the field CSS class to reflect the field's state as valid or invalid with validation styling of the underlying HTML element.
* For controls that don't have an `Microsoft.AspNetCore.Components.Forms.EditContext`, the default validation reflects the valid or invalid state but doesn't provide validation styling to the underlying HTML element.

Some components include useful parsing logic. For example, `Microsoft.AspNetCore.Components.Forms.InputDate`1` and `Microsoft.AspNetCore.Components.Forms.InputNumber`1` handle unparseable values gracefully by registering unparseable values as validation errors. Types that can accept null values also support nullability of the target field (for example, `int?` for a nullable integer).

The `Microsoft.AspNetCore.Components.Forms.InputNumber`1` component supports the `type="range"` attribute, which creates a range input that supports model binding and form validation, typically rendered as a slider or dial control rather than a text box:

```razor
<InputNumber @bind-Value="..." max="..." min="..." step="..." type="range" />
```

For more information on the `Microsoft.AspNetCore.Components.Forms.InputFile` component, see ASP.NET Core Blazor file uploads.

## Example form

The following `Starship` type, which is used in several of this article's examples and examples in other *Forms* node articles, defines a diverse set of properties with data annotations:

* `Id` is required because it's annotated with the `System.ComponentModel.DataAnnotations.RequiredAttribute`. `Id` requires a value of at least one character but no more than 16 characters using the `System.ComponentModel.DataAnnotations.StringLengthAttribute`.
* `Description` is optional because it isn't annotated with the `System.ComponentModel.DataAnnotations.RequiredAttribute`.
* `Classification` is required.
* The `MaximumAccommodation` property defaults to zero but requires a value from one to 100,000 per its `System.ComponentModel.DataAnnotations.RangeAttribute`.
* `IsValidatedDesign` requires that the property have a `true` value, which matches a selected state when the property is bound to a checkbox in the UI (``).
* `ProductionDate` is a `System.DateTime` and required.

`Starship.cs`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Starship.cs._
The following form accepts and validates user input using:

* The properties and validation defined in the preceding `Starship` model.
* Several of Blazor's built-in input components.

When the model property for the ship's classification (`Classification`) is set, the option matching the model is checked. For example, `checked="@(Model!.Classification == "Exploration")"` for the classification of an exploration ship. The reason for explicitly setting the checked option is that the value of a `<select>` element is only present in the browser. If the form is rendered on the server after it's submitted, any state from the client is overridden with state from the server, which doesn't ordinarily mark an option as checked. By setting the checked option from the model property, the classification always reflects the model's state. This preserves the classification selection across form submissions that result in the form rerendering on the server. In situations where the form isn't rerendered on the server, such as when the Interactive Server render mode is applied directly to the component, explicit assignment of the checked option from the model isn't necessary because Blazor preserves the state for the `<select>` element on the client.

`Starship3.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Starship3.razor._
The `Microsoft.AspNetCore.Components.Forms.EditForm` in the preceding example creates an `Microsoft.AspNetCore.Components.Forms.EditContext` based on the assigned `Starship` instance (`Model="..."`) and handles a valid form. The next example demonstrates how to assign an `Microsoft.AspNetCore.Components.Forms.EditContext` to a form and validate when the form is submitted.

In the following example:

* A shortened version of the earlier `Starfleet Starship Database` form (`Starship3` component) is used that only accepts a value for the starship's Id. The other `Starship` properties receive valid default values when an instance of the `Starship` type is created.
* The `Submit` method executes when the **`Submit`** button is selected.
* The form is validated by calling `Microsoft.AspNetCore.Components.Forms.EditContext.Validate*` in the `Submit` method.
* Logging is executed depending on the validation result.

`Starship4.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Starship4.razor._
> **Note:**
> Changing the `Microsoft.AspNetCore.Components.Forms.EditContext` after it's assigned is **not** supported.

## Multiple option selection with the `InputSelect` component

Binding supports `multiple` option selection with the `Microsoft.AspNetCore.Components.Forms.InputSelect`1` component. The `@onchange` event provides an array of the selected options via event arguments (`ChangeEventArgs`). The value must be bound to an array type, which results in the `Microsoft.AspNetCore.Components.Forms.InputSelect`1` component automatically adding the `multiple` attribute to the `<select>` element when the component is rendered.

In the following example, the user must select at least two starship classifications but no more than three classifications.

`Starship5.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Starship5.razor._
For information on how empty strings and `null` values are handled in data binding, see the Binding `InputSelect` options to C# object `null` values section.

## Binding `InputSelect` options to C# object `null` values

For information on how empty strings and `null` values are handled in data binding, see ASP.NET Core Blazor data binding.

## Display name support

Several built-in components support display names with the `Microsoft.AspNetCore.Components.Forms.InputBase`1.DisplayName` parameter.

In the `Starfleet Starship Database` form (`Starship3` component) of the Example form section, the production date of a new starship doesn't specify a display name:

```razor
<label>
    Production Date:
    <InputDate @bind-Value="Model!.ProductionDate" />
</label>
```

If the field contains an invalid date when the form is submitted, the error message doesn't display a friendly name. The field name, "`ProductionDate`" doesn't have a space between "`Production`" and "`Date`" when it appears in the validation summary:

> The ProductionDate field must be a date.

Set the `Microsoft.AspNetCore.Components.Forms.InputBase`1.DisplayName` property to a friendly name with a space between the words "`Production`" and "`Date`":

```razor
<label>
    Production Date:
    <InputDate @bind-Value="Model!.ProductionDate" 
        DisplayName="Production Date" />
</label>
```

The validation summary displays the friendly name when the field's value is invalid:

> The Production Date field must be a date.

The `DisplayName` component can be used to display property names from metadata attributes

```csharp
[Required, DisplayName("Production Date")]
public DateTime ProductionDate { get; set; }
```

The `[Display]` attribute on the model class property is supported:

```csharp
[Required, Display(Name = "Production Date")]
public DateTime ProductionDate { get; set; }
```

Between the two approaches, the `[Display]` attribute is recommended, which makes additional properties available. The `[Display]` attribute also enables assigning a resource type for localization. When both attributes are present, `[Display]` takes precedence over `[DisplayName]`. If neither attribute is present, the component falls back to the property name.

Use the `DisplayName` component in labels or table headers:

```razor
<label>
    <DisplayName For="@(() => Model!.ProductionDate)" />
    <InputDate @bind-Value="Model!.ProductionDate" />
</label>
```

## `Label` component

The `Label` component renders a `` element that automatically extracts the display name from a model property using `[Display]` or `[DisplayName]` attributes. This simplifies form creation by eliminating the need to manually specify label text.

### Nested pattern

The nested pattern wraps the input component inside the label:

```razor
<Label For="() => Model!.ProductionDate">
    <InputDate @bind-Value="Model!.ProductionDate" />
</Label>
```

This renders:

```html
<label>Production Date<input type="date" ... /></label>
```

### Non-nested pattern

For accessibility requirements or styling flexibility, use the non-nested pattern where the label's `for` attribute references the input's `id`:

```razor
<Label For="() => Model!.ProductionDate" />
<InputDate @bind-Value="Model!.ProductionDate" />
```

This renders:

```html
<label for="Model_ProductionDate">Production Date</label>
<input id="Model_ProductionDate" type="date" ... />
```

The `id` attribute is automatically sanitized to create a valid HTML id (dots are replaced with underscores to avoid CSS selector conflicts).

Input components automatically generate an `id` attribute based on the bound expression. If an explicit `id` is provided, it takes precedence:

```razor
<Label For="() => Model!.ProductionDate" for="prod-date" />
<InputDate @bind-Value="Model!.ProductionDate" id="prod-date" />
```

## Error message template support

`Microsoft.AspNetCore.Components.Forms.InputDate`1` and `Microsoft.AspNetCore.Components.Forms.InputNumber`1` support error message templates:

* `Microsoft.AspNetCore.Components.Forms.InputDate`1.ParsingErrorMessage`
* `Microsoft.AspNetCore.Components.Forms.InputNumber`1.ParsingErrorMessage`

In the `Starfleet Starship Database` form (`Starship3` component) of the Example form section with a friendly display name assigned, the `Production Date` field produces an error message using the following default error message template:

```css
The {0} field must be a date.
```

The position of the `{0}` placeholder is where the value of the `Microsoft.AspNetCore.Components.Forms.InputBase`1.DisplayName` property appears when the error is displayed to the user.

```razor
<label>
    Production Date:
    <InputDate @bind-Value="Model!.ProductionDate" 
        DisplayName="Production Date" />
</label>
```

> The Production Date field must be a date.

Assign a custom template to `Microsoft.AspNetCore.Components.Forms.InputDate`1.ParsingErrorMessage` to provide a custom message:

```razor
<label>
    Production Date:
    <InputDate @bind-Value="Model!.ProductionDate" 
        DisplayName="Production Date" 
        ParsingErrorMessage="The {0} field has an incorrect date value." />
</label>
```

> The Production Date field has an incorrect date value.

## `InputHidden` component to handle hidden input fields in forms

The `InputHidden` component provides a hidden input field for storing string values.

In the following example, a hidden input field is created for the form's `Parameter` property. When the form is submitted, the value of the hidden field is displayed:

```razor
<EditForm Model="Parameter" OnValidSubmit="Submit" FormName="InputHidden Example">
    <InputHidden id="hidden" @bind-Value="Parameter" />
    <button type="submit">Submit</button>
</EditForm>

@if (submitted)
{
    <p>Hello @Parameter!</p>
}

@code {
    private bool submitted;

    [SupplyParameterFromForm] 
    public string Parameter { get; set; } = "stranger";

    private void Submit() => submitted = true;
}
```
