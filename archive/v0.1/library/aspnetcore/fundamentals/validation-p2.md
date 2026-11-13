---
title: "Validation in ASP.NET Core (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/validation.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Validation in ASP.NET Core (part 2 of 3)

## Asynchronous validation support

`Microsoft.Extensions.Validation` supports asynchronous validation. Apply custom implementations of `AsyncValidationAttribute` to parameters, types, or properties, and they're called asynchronously. In addition, types can implement `IAsyncValidatableObject` as well.

Asynchronous validation operations can run in parallel, and their execution and completion order isn't guaranteed. Validation rules must not depend on a particular order.

`IAsyncValidatableObject` and `AsyncValidationAttribute` require synchronous **and** asynchronous validation logic. For example, the `Validate` and `ValidateAsync` methods of `IAsyncValidatableObject` must be implemented for objects that use the interface. However, validation never calls both methods. If validation is called through an asynchronous code path, only `ValidateAsync` is called. If validation is called through a synchronous code path, only `Validate` is called.

For Minimal API validation, `Microsoft.Extensions.Validation` always calls the asynchronous path and never the synchronous path.

Blazor form validation calls the asynchronous path for per-field validation and when the form is validated with `Microsoft.AspNetCore.Components.Forms.EditContext.ValidateAsync*`, which is what `Microsoft.AspNetCore.Components.Forms.EditForm` uses on submit. The synchronous path is only reached through the `Microsoft.AspNetCore.Components.Forms.EditContext.Validate*` method, which is obsolete in .NET 11 or later. Asynchronous rules therefore work in Blazor forms without additional configuration.

If your implementation can't support the synchronous path, throw `System.InvalidOperationException`.

The following example performs property-level asynchronous validation with a custom `AsyncValidationAttribute`. The attribute uses a hypothetical `IUserService` to check whether an email address is already registered. Empty values are left to `System.ComponentModel.DataAnnotations.RequiredAttribute`, and the cancellation token is passed to the asynchronous operation:

```csharp
using System.ComponentModel.DataAnnotations;
using Microsoft.Extensions.DependencyInjection;

public sealed class UniqueEmailAttribute : AsyncValidationAttribute
{
    public UniqueEmailAttribute()
    {
        ErrorMessage = "Email is already registered.";
    }

    protected override async Task<ValidationResult?> IsValidAsync(
        object? value,
        ValidationContext validationContext,
        CancellationToken <example-value>)
    {
        if (value is not string email || string.IsNullOrWhiteSpace(email))
        {
            return ValidationResult.Success;
        }

        var userService =
            validationContext.GetRequiredService<IUserService>();

        return await userService.IsEmailExistsAsync(
            email, cancellationToken)
                ? new ValidationResult(
                    FormatErrorMessage(validationContext.DisplayName),
                    [validationContext.MemberName!])
                : ValidationResult.Success;
    }

    protected override ValidationResult? IsValid(
        object? value, ValidationContext validationContext)
    {
        throw new InvalidOperationException(
            "Synchronous validation isn't supported.");
    }
}

public class RegistrationModel
{
    [Required, EmailAddress, UniqueEmail]
    public string Email { get; set; } = string.Empty;
}
```

The following example shows object-level asynchronous validation with `IAsyncValidatableObject`. It uses a hypothetical `IUserService` to check a database for an existing email address. Because the rule requires asynchronous I/O, the required synchronous `Validate` implementation throws `System.InvalidOperationException`.

```csharp
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;

public class ValidateUser : IAsyncValidatableObject
{
    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;

    // Asynchronous validation path
    public async IAsyncEnumerable<ValidationResult> ValidateAsync(
        ValidationContext validationContext,
        [EnumeratorCancellation] CancellationToken <example-value> = default)
    {
        var userService = validationContext.GetService<IUserService>();

        if (userService is not null)
        {
            // Asynchronous call that checks a database via a service
            if (await userService.IsEmailExistsAsync(Email, cancellationToken))
            {
                yield return new ValidationResult(
                    "Email is already registered.", new[] { nameof(Email) });
            }
        }
    }

    // Synchronous validation path that throws InvalidOperationException
    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        throw new InvalidOperationException("Synchronous validation isn't supported.");
    }
}
```

## Localize validation messages

Validation error messages and the display names of validated members are localized by `Microsoft.Extensions.Validation`. The same rules apply wherever the model is validated, so a message localizes identically in a Minimal API endpoint and in a Blazor form.

### Activate localization

Localization activates automatically when an `Microsoft.Extensions.Localization.IStringLocalizerFactory` is available in the service container. Call `Microsoft.Extensions.DependencyInjection.LocalizationServiceCollectionExtensions.AddLocalization*` to register the standard localization services, then call `Microsoft.Extensions.DependencyInjection.ValidationServiceCollectionExtensions.AddValidation*`:

```csharp
builder.Services.AddLocalization();
builder.Services.AddValidation();
```

There's no separate package or additional opt-in call.

> **Important:**
> `AddLocalization` registers localization services but doesn't select the culture for a request or circuit. Validation resource lookup uses `System.Globalization.CultureInfo.CurrentUICulture`. For request culture providers, including query string, cookie, and `Accept-Language` header selection, see Strategies for selecting language and culture in a localized ASP.NET Core app. For configuring culture selection across Blazor render modes, see ASP.NET Core Blazor globalization and localization.

```csharp
using System.ComponentModel.DataAnnotations;
using Microsoft.Extensions.Validation;

[ValidatableType]
public class CustomerModel
{
    // "CustomerName" is looked up as the resource key for the display name.
    [Display(Name = "CustomerName")]
    // "NameRequired" is looked up as the resource key for the error message.
    [Required(ErrorMessage = "NameRequired")]
    public string? Name { get; set; }
}
```

By default, keys are resolved against the resources of the type that declares the member. If a key doesn't resolve, the attribute's built-in error message is used, so a missing resource degrades to the non-localized message rather than surfacing the key to the user.

### Message lookup keys

When `System.ComponentModel.DataAnnotations.ValidationAttribute.ErrorMessage` is set, its value is the lookup key and it takes precedence.

When `ErrorMessage` isn't set, conventional keys are tried in order from most to least specific:

1. `{DeclaringType}_{MemberName}_{AttributeType}_Error`
1. `{DeclaringType}_{AttributeType}_Error`
1. `{AttributeType}_Error`

For example, a `System.ComponentModel.DataAnnotations.RequiredAttribute` on the `Name` property of `CustomerModel` is looked up in this order: `CustomerModel_Name_RequiredAttribute_Error`, `CustomerModel_RequiredAttribute_Error`, and `RequiredAttribute_Error`. If none resolve, the attribute's built-in message is used.

This makes it possible to translate or override the default message of an attribute across an entire app without setting `ErrorMessage` on every attribute instance:

```csharp
[ValidatableType]
public class CustomerModel
{
    // Resolves the localized string for 'RequiredAttribute_Error'.
    [Required]
    public string? Name { get; set; }
}
```

Two details affect key <example-value>:

* The member segment is skipped for type-level attributes that report no member names.
* A nullable value type contributes its underlying type name.

### Where resource files are located

Keys are resolved from `.resx` files through ASP.NET Core's standard `Microsoft.Extensions.Localization.IStringLocalizer` infrastructure, so the usual naming and placement conventions apply. Per-type resolution is the default and needs no configuration beyond the resources path:

```csharp
builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");
builder.Services.AddValidation();
```

Under the configured `ResourcesPath`, the type's full name minus the project's root namespace is used as a dotted path. For a project root namespace of `Contoso`, French messages for `Contoso.Models.Customer` are read from `Resources/Models/Customer.fr.resx` (equivalently `Resources/Models.Customer.fr.resx`). For a full description of the conventions, see Provide localized resources for languages and cultures in an ASP.NET Core app.

For per-type lookup, place the resource files in the project that declares the validated type. For example, if a Blazor Web App's form models are declared in its `.Client` project, place their per-type resources in that project. The model assembly's root namespace and the configured `ResourcesPath` determine the resource name.

### Use a shared resource file

To resolve keys from one resource file for every validated type instead of per-type resources, set `ValidationOptions.LocalizerProvider`:

```csharp
builder.Services.AddValidation(options =>
{
    options.LocalizerProvider = (_, factory) => factory.Create(typeof(ValidationMessages));
});
```

The delegate also receives the validated type, so an app can select different resources for different model types.

The marker type passed to `factory.Create` identifies both the resource name and the assembly containing the resource. This makes a shared resource in the host project an alternative to placing per-type resources in a referenced model assembly.

### Localize from a source other than resource files

To read localized strings from a database, JSON files, or another source, register a custom `Microsoft.Extensions.Localization.IStringLocalizerFactory`. A user-registered factory takes precedence over the default resource file implementation:

```csharp
builder.Services.AddSingleton<IStringLocalizerFactory, JsonStringLocalizerFactory>();
builder.Services.AddValidation();
```

### Attributes that localize themselves

Attributes configured with `System.ComponentModel.DataAnnotations.ValidationAttribute.ErrorMessageResourceType` or `System.ComponentModel.DataAnnotations.DisplayAttribute.ResourceType` perform their own resource lookup and aren't processed by the `Microsoft.Extensions.Validation` localizer.

### Format a custom attribute's message

A custom attribute that substitutes its own values into a message template implements `IValidationMessageFormatter`. The framework calls `FormatMessage` with the culture, the localized template, and the resolved display name:

```csharp
using System.Globalization;
using System.ComponentModel.DataAnnotations;
using Microsoft.Extensions.Validation;

public sealed class DivisibleByAttribute : ValidationAttribute, IValidationMessageFormatter
{
    public int Divisor { get; init; }

    // Fills {0} with the display name and {1} with the divisor.
    public string FormatMessage(CultureInfo culture, string template, string displayName) =>
        string.Format(culture, template, displayName, Divisor);
}
```

> **Note:**
> This localization pipeline requires `Microsoft.Extensions.Validation`. A Blazor form whose model isn't discovered by the validation source generator falls back to `System.ComponentModel.DataAnnotations.Validator`. Attributes configured to localize themselves with `ErrorMessageResourceType` continue to do so, but the generated lookup conventions and `ValidationOptions.LocalizerProvider` aren't available. For more information, see Behavior without generated validation metadata.
