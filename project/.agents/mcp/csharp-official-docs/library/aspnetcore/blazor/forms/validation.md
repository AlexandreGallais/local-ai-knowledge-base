---
title: "ASP.NET Core Blazor forms validation (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/forms/validation.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor forms validation

This article explains how to validate user input in Blazor forms.

For most forms, the simplest and recommended approach is to add data annotations validation attributes to the model and place a `Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator` component in the `Microsoft.AspNetCore.Components.Forms.EditForm`. Blazor also supports custom validation through the form's `Microsoft.AspNetCore.Components.Forms.EditContext`, either directly in the form component or in a reusable validator component.

Related articles provide more detail:

* For writing and configuring model-based validation rules, including custom and asynchronous rules, nested object validation, and localization, see Validation in ASP.NET Core.
* For live browser validation in static server-side rendering (static SSR), see ASP.NET Core Blazor client-side form validation in static SSR.
* For complete validator-component and remote-validation implementations, see ASP.NET Core Blazor advanced form validation.

## Validate with data annotations

The following model uses `System.ComponentModel.DataAnnotations.RequiredAttribute` and `System.ComponentModel.DataAnnotations.RangeAttribute`:

`Starship.cs`:

```csharp
using System.ComponentModel.DataAnnotations;

public class Starship
{
    [Required]
    public string? Identifier { get; set; }

    [Range(1, 10, ErrorMessage = "Accommodation must be between 1 and 10.")]
    public int MaximumAccommodation { get; set; }
}
```

Add the model to an `EditForm`, include `DataAnnotationsValidator`, and display errors with `Microsoft.AspNetCore.Components.Forms.ValidationMessage`1` or `Microsoft.AspNetCore.Components.Forms.ValidationSummary`. The `Microsoft.AspNetCore.Components.Forms.EditForm.OnValidSubmit` callback is invoked only when validation succeeds:

```razor
<EditForm Model="Model" OnValidSubmit="Submit">
    <DataAnnotationsValidator />
    <ValidationSummary />

    <p>
        <label>
            Identifier:
            <InputText @bind-Value="Model.Identifier" />
        </label>
        <ValidationMessage For="() => Model.Identifier" />
    </p>

    <p>
        <label>
            Maximum accommodation:
            <InputNumber @bind-Value="Model.MaximumAccommodation" />
        </label>
        <ValidationMessage For="() => Model.MaximumAccommodation" />
    </p>

    <button type="submit">Submit</button>
</EditForm>

@code {
    private Starship Model { get; } = new Starship();

    private void Submit()
    {
        // Process the valid form.
    }
}
```

For a static SSR form post, assign a unique `FormName` and receive the posted model with `[SupplyParameterFromForm]`:

```razor
<EditForm Model="Model" FormName="starship" OnValidSubmit="Submit">
    ...
</EditForm>

@code {
    [SupplyParameterFromForm]
    private Starship? Model { get; set; }

    protected override void OnInitialized() => Model ??= new();
}
```

For more information about form submission and model binding across render modes, see ASP.NET Core Blazor forms overview and ASP.NET Core Blazor forms binding.

Without a `DataAnnotationsValidator` component, validation attributes on the model don't participate in the form's validation.

### When validation runs

Blazor performs field validation and full-form validation:

* Field validation runs after a field changes. In an interactive form, this occurs in .NET while the user edits the form.
* Full-form validation normally runs when `EditForm` handles submission through `OnValidSubmit` or `OnInvalidSubmit`. An `OnSubmit` handler takes control of validation, as described in Control form submission.

A static SSR form can provide live browser feedback with ASP.NET Core Blazor client-side form validation in static SSR. The form is validated again authoritatively on the server when posted.

Validation results that identify a member are associated with that field. Results without a member name are associated with the model and appear in a validation summary rather than a field's `ValidationMessage` component.

### Configure data annotations validation

`DataAnnotationsValidator` always enables DataAnnotations validation for the form. To use the extended validation capabilities provided by the `Microsoft.Extensions.Validation` package, call the `AddValidation` extension method in the `Program` file:

```csharp
builder.Services.AddValidation();
```

The `AddValidation` call registers the package's validation services and activates a source generator that creates validation metadata for discovered model types. The available behavior depends on whether that metadata includes the form's model:

| Configuration | Behavior |
|---|---|
| Generated metadata is available | Validates nested objects and collections and supports message localization. |
| Generated metadata isn't available | Validates top-level properties, but doesn't validate nested objects or collections and doesn't use the `Microsoft.Extensions.Validation` message-localization pipeline. |

When using `Microsoft.Extensions.Validation`, declare model types in C# files (`.cs`) rather than Razor component files (`.razor`). The source generator creates validation metadata from C# source and can't include model types declared in Razor components.

For configuration requirements, validation order, custom rules, nested object graphs, and generated metadata, see Validation in ASP.NET Core.

### Write model-based custom rules

When built-in attributes can't express a rule, use a custom `System.ComponentModel.DataAnnotations.ValidationAttribute` or `System.ComponentModel.DataAnnotations.IValidatableObject`. For detailed guidance, see Validation in ASP.NET Core.

## Add validation through `EditContext`

`EditForm` creates an `EditContext` automatically when its `Model` parameter is assigned. To use validation APIs directly, create the context yourself and assign it to the `Microsoft.AspNetCore.Components.Forms.EditForm.EditContext` parameter of `EditForm`. Don't assign both `Model` and `EditContext` to the same form.

Custom validation commonly uses:

* `Microsoft.AspNetCore.Components.Forms.EditContext.OnValidationRequested*` for full-form validation.
* `Microsoft.AspNetCore.Components.Forms.EditContext.OnFieldChanged*` for field validation.
* `Microsoft.AspNetCore.Components.Forms.ValidationMessageStore` to add and clear messages.
* `Microsoft.AspNetCore.Components.Forms.EditContext.NotifyValidationStateChanged*` to notify the UI after messages change.

The following interactive-form pattern adds a form-level business rule alongside data annotations validation and rechecks the rule when either relevant field changes:

```razor
@implements IDisposable

<EditForm EditContext="editContext" OnValidSubmit="Submit">
    <DataAnnotationsValidator />
    <ValidationSummary />

    ...
</EditForm>

@code {
    private Starship Model { get; } = new Starship();
    private EditContext editContext = default!;
    private ValidationMessageStore messages = default!;

    protected override void OnInitialized()
    {
        editContext = new EditContext(Model);
        messages = new ValidationMessageStore(editContext);
        editContext.OnValidationRequested += ValidateBusinessRules;
        editContext.OnFieldChanged += ValidateChangedField;
    }

    private void ValidateBusinessRules(
        object? sender, ValidationRequestedEventArgs e)
    {
        messages.Clear();
        ValidateIdentifier();
        editContext.NotifyValidationStateChanged();
    }

    private void ValidateChangedField(
        object? sender, FieldChangedEventArgs e)
    {
        if (e.FieldIdentifier.FieldName != nameof(Starship.Identifier) &&
            e.FieldIdentifier.FieldName != nameof(Starship.MaximumAccommodation))
        {
            return;
        }

        messages.Clear(
            editContext.Field(nameof(Starship.Identifier)));
        ValidateIdentifier();
        editContext.NotifyValidationStateChanged();
    }

    private void ValidateIdentifier()
    {
        if (Model.MaximumAccommodation == 1 &&
            string.IsNullOrWhiteSpace(Model.Identifier))
        {
            messages.Add(
                editContext.Field(nameof(Starship.Identifier)),
                "An identifier is required for a single-occupant ship.");
        }
    }

    private void Submit()
    {
        // Process the valid form.
    }

    public void Dispose()
    {
        editContext.OnValidationRequested -= ValidateBusinessRules;
        editContext.OnFieldChanged -= ValidateChangedField;
    }
}
```

An `OnFieldChanged` handler receives the changed field in `e.FieldIdentifier`. Clear or replace the affected messages and call `NotifyValidationStateChanged`, as the preceding example demonstrates.

Static SSR doesn't provide live .NET field validation between requests.

For asynchronous full-form validation, call `e.AddAsyncValidator` from an `OnValidationRequested` handler. For asynchronous field validation in an interactive form, call `EditContext.RegisterAsyncFieldValidator` from an `OnFieldChanged` handler. A new asynchronous validation for the same field supersedes and cancels the previous one.

For model-based asynchronous validation attributes, see Validation in ASP.NET Core. For a complete reusable validator component, see ASP.NET Core Blazor advanced form validation.

For a reusable implementation that encapsulates event subscriptions and its message store, see ASP.NET Core Blazor advanced form validation.

## Display validation messages

Use `Microsoft.AspNetCore.Components.Forms.ValidationMessage`1` to display messages associated with one field:

```razor
<ValidationMessage For="() => Model.Identifier" />
```

The `For` expression identifies the field by its model instance and property. Blazor represents this identity with a `Microsoft.AspNetCore.Components.Forms.FieldIdentifier`, so properties with the same name on different model instances are treated as different fields. Using an expression instead of a string also allows refactoring tools to update the property reference.

Use `Microsoft.AspNetCore.Components.Forms.ValidationSummary` to display messages for the form:

```razor
<ValidationSummary />
```

Assign the summary's `Model` parameter to restrict it to messages associated with a particular model:

```razor
<ValidationSummary Model="Model" />
```

To inspect current messages in code, call `Microsoft.AspNetCore.Components.Forms.EditContext.GetValidationMessages*`:

```csharp
var allMessages = editContext.GetValidationMessages();
var fieldMessages = editContext.GetValidationMessages(
    editContext.Field(nameof(Starship.Identifier)));
```

These methods read the current validation state. They don't initiate validation.

In interactive forms, `ValidationSummary` doesn't announce newly displayed errors to screen readers by default. To announce errors without moving focus, place the component inside a `div` with `role="alert"` within the `EditForm`:

```razor
<div role="alert" aria-atomic="true">
    <ValidationSummary />
</div>
```

Keep the wrapper rendered even when there are no errors, so the live region exists before its content changes. Don't place `role="alert"` directly on `ValidationSummary`: the component applies additional attributes to its generated `ul`, and replacing the list's role removes the list semantics required by its `li` elements.

## Customize validation appearance

Blazor applies CSS classes that represent field and message state:

| Element | Classes |
|---|---|
| Input | `valid` or `invalid`, plus `modified` after the user edits the field |
| Validation message | `validation-message` |
| Validation summary | `validation-summary-errors` or `validation-summary-valid` |

Inputs with asynchronous field validation use `pending` or `faulted`, optionally with `modified`, instead of `valid` or `invalid` while the corresponding state applies.

The Blazor project templates include styles for the common valid and invalid classes. Add styles for other classes as needed. `ValidationMessage` and `ValidationSummary` also accept arbitrary HTML attributes. Supplying a `class` attribute replaces the component's default class.

To change the classes applied to input components, derive from `Microsoft.AspNetCore.Components.Forms.FieldCssClassProvider`.

```csharp
using Microsoft.AspNetCore.Components.Forms;

public sealed class BootstrapFieldCssClassProvider : FieldCssClassProvider
{
    public override string GetFieldCssClass(
        EditContext editContext,
        in FieldIdentifier fieldIdentifier)
    {
        if (!editContext.IsModified(fieldIdentifier))
        {
            return string.Empty;
        }

        return editContext.IsValid(fieldIdentifier)
            ? "is-valid"
            : "is-invalid";
    }
}
```

A custom `FieldCssClassProvider` determines the complete class value for each field. If the form uses asynchronous field validation, handle `IsValidationPending(fieldIdentifier)` and `IsValidationFaulted(fieldIdentifier)` in the provider when pending or faulted classes are required.

Assign the provider to the form's `EditContext`:

```csharp
editContext.SetFieldCssClassProvider(
    new BootstrapFieldCssClassProvider());
```

For custom input markup, call `Microsoft.AspNetCore.Components.Forms.EditContextFieldClassExtensions.FieldCssClass*` to obtain the class selected by the current provider.

When an `EditForm` is assigned a model, its child content receives the generated `EditContext`. Capture the context through the `Context` parameter and call `FieldCssClass` to apply the field's classes to surrounding markup:

```razor
<EditForm Model="Model" Context="editContext">
    <DataAnnotationsValidator />

    <div class="@editContext.FieldCssClass(
        () => Model.Identifier)">
        <InputText @bind-Value="Model.Identifier" />
        <ValidationMessage For="() => Model.Identifier" />
    </div>
</EditForm>
```
