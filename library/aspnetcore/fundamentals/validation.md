---
title: "Validation in ASP.NET Core (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/validation.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Validation in ASP.NET Core

`Microsoft.Extensions.Validation` provides model validation for Blazor and Minimal API projects.

Validation rules are declared the same way in both frameworks, using data annotations attributes and `System.ComponentModel.DataAnnotations.IValidatableObject`. This article describes the validation behavior that both frameworks share:

Asynchronous validation attributes and `System.ComponentModel.DataAnnotations.IAsyncValidatableObject` are also supported.

* Minimal APIs use the service to validate a request before the endpoint handler runs. For guidance on how validation is surfaced in an endpoint, see Minimal APIs quick reference.
* Blazor uses the service through the `Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator` component. For guidance on how validation is surfaced in a form, see ASP.NET Core Blazor forms validation.

While the API in the `Microsoft.Extensions.Validation` NuGet package can be used in scenarios outside ASP.NET Core, this article focuses on ASP.NET Core. The API isn't supported for MVC or Razor Pages. For validation guidance that applies to MVC and Razor Pages, see Model validation in ASP.NET Core MVC.

## Register validation services

Call `Microsoft.Extensions.DependencyInjection.ValidationServiceCollectionExtensions.AddValidation*` on `Microsoft.AspNetCore.Builder.WebApplicationBuilder.Services` in the app's `Program` file:

```csharp
builder.Services.AddValidation();
```

For Minimal APIs, this enables automatic validation of supported parameters before the endpoint handler runs.

Blazor forms can perform basic top-level DataAnnotations validation without calling `AddValidation`. Registering the service enables nested object and collection validation when the form model is discovered by the validation source generator.

Generated validation metadata also enables message localization.

Validation uses a source generator that creates metadata for validatable types in the assembly where `AddValidation` is called. For types declared in another assembly, see Register validation across assemblies.

> **Note:**
> `AddValidation` validates properties and objects using data annotations on bound models. It doesn't automatically validate or reject unmapped JSON properties. By default, `System.Text.Json` sets `System.Text.Json.JsonSerializerOptions.UnmappedMemberHandling` to `System.Text.Json.Serialization.JsonUnmappedMemberHandling.Skip`. To reject requests containing unmapped JSON payload properties, configure `JsonSerializerOptions.UnmappedMemberHandling = JsonUnmappedMemberHandling.Disallow`.

### Behavior without generated validation metadata

The consequence of omitting `Microsoft.Extensions.DependencyInjection.ValidationServiceCollectionExtensions.AddValidation*`, or of calling it without the required type being discovered by the source generator, differs by framework, as shown in the following table.

Framework | Behavior without generated validation metadata
--- | ---
Minimal APIs | No automatic validation runs. Invalid input reaches the endpoint handler instead of being rejected before the handler executes.
Blazor | The `Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator` component falls back to `System.ComponentModel.DataAnnotations.Validator`, which validates top-level properties only. Nested objects, collection items, and the `Microsoft.Extensions.Validation` message-localization pipeline aren't supported on the fallback path.

Missing metadata doesn't produce a runtime exception or log entry. Build analyzers report many unsupported configurations, but other missing-metadata cases might not produce a diagnostic. For checks to perform when expected validation is missing, see Troubleshoot generated validation metadata.

## How validation runs

Minimal APIs begin with endpoint parameter validation. Blazor begins with validation of the form's model. Both frameworks then use the same model validation order and object-graph traversal.

### Minimal API parameter validation

For each supported endpoint parameter:

1. Validate `System.ComponentModel.DataAnnotations.ValidationAttribute` instances applied directly to the parameter.
1. If the parameter value is an `IEnumerable`, validate each non-`null` element. Otherwise, validate the parameter value itself.

### Model validation order

When validating a model:

1. Validate the attributes on each property, then validate the property's value. If the value is an `IEnumerable`, validate each non-`null` element. If property validation produces an error, the remaining steps are skipped.
1. Validate attributes applied to the model type. If type-level validation produces an error, the remaining step is skipped.
1. Run `System.ComponentModel.DataAnnotations.IValidatableObject.Validate*` if the model implements `System.ComponentModel.DataAnnotations.IValidatableObject`.

### Nested objects and collections

Validation recurses into nested objects and collection items, so a rule declared on a nested property is enforced when the root model is validated. Without generated validation metadata, Blazor only validates the top-level properties of a form model.

To validate a nested object graph:

1. Call `Microsoft.Extensions.DependencyInjection.ValidationServiceCollectionExtensions.AddValidation*` in the `Program` file where services are registered.
1. Declare model types in C# files (`.cs`), not in Razor component files (`.razor`).
1. Annotate the root model type with `Microsoft.Extensions.Validation.ValidatableTypeAttribute` (`[ValidatableType]`). Types reachable from the root are discovered automatically.

In the following example, only the root `Order` type is annotated. The other model types are reachable from `Order` and are included in its validation graph.

`Order.cs`:

```csharp
using System.ComponentModel.DataAnnotations;
using Microsoft.Extensions.Validation;

[ValidatableType]
public class Order
{
    public Customer Customer { get; set; } = new();
    public List<OrderItem> OrderItems { get; set; } = [];
}

public class Customer
{
    [Required(ErrorMessage = "Name is required.")]
    public string? FullName { get; set; }

    public ShippingAddress ShippingAddress { get; set; } = new();
}

public class ShippingAddress
{
    [Required(ErrorMessage = "Street is required.")]
    public string? Street { get; set; }
}

public class OrderItem
{
    [Required(ErrorMessage = "Description is required.")]
    public string? Description { get; set; }

    [Range(1, 1000)]
    public int Quantity { get; set; }
}
```

Errors from nested members use paths such as `Customer.ShippingAddress.Street` or `OrderItems[0].Description`.

For model types defined in another assembly or in a Blazor Web App's `.Client` project, see Register validation across assemblies.

### Skip validation

Apply `Microsoft.Extensions.Validation.SkipValidationAttribute` to a property or parameter to skip validation for that property or parameter. Apply it to a type to skip validation for all properties and parameters of that type, including nested properties when the type is complex.

## Write custom validation rules

When the built-in validation attributes don't express a rule, write a custom `System.ComponentModel.DataAnnotations.ValidationAttribute` or implement `System.ComponentModel.DataAnnotations.IValidatableObject` on the model. Both are discovered and executed by `Microsoft.Extensions.Validation` in Blazor and Minimal API apps.

### Custom validation attributes

Derive from `System.ComponentModel.DataAnnotations.ValidationAttribute` and override `System.ComponentModel.DataAnnotations.ValidationAttribute.IsValid*` to validate a single value.

Pass the validation context's `System.ComponentModel.DataAnnotations.ValidationContext.MemberName` when creating the `System.ComponentModel.DataAnnotations.ValidationResult`. Without a member name, the result isn't associated with a field, which prevents the error from being displayed next to the corresponding input in a Blazor form:

```csharp
using System.ComponentModel.DataAnnotations;

public class EvenNumberAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value,
        ValidationContext validationContext)
    {
        if (value is int number && number % 2 != 0)
        {
            return new ValidationResult(
                "The value must be an even number.",
                [ validationContext.MemberName! ]);
        }

        return ValidationResult.Success;
    }
}
```

Apply the attribute to a property in the same way as a built-in attribute:

```csharp
public class Order
{
    [EvenNumber]
    public int Quantity { get; set; }
}
```

### Resolve services in a validation attribute

A validation attribute obtains services from dependency injection (DI) through the validation context, which makes rules that require a database lookup or a configured option possible:

```csharp
protected override ValidationResult? IsValid(object? value,
    ValidationContext validationContext)
{
    var catalog = validationContext.GetService<IProductCatalog>();

    // ...
}
```

For a service that must be resolved, use `Microsoft.Extensions.DependencyInjection.ServiceProviderServiceExtensions.GetRequiredService*`. Services resolved this way must be registered in the app's service container.

### Class-level validation with `IValidatableObject`

Implement `System.ComponentModel.DataAnnotations.IValidatableObject` for a rule that spans several properties because an attribute applied to one property can't reliably observe the others. Class-level validation runs after property validation and only if property validation succeeds:

```csharp
using System.ComponentModel.DataAnnotations;

public class DateRange : IValidatableObject
{
    public DateOnly Start { get; set; }
    public DateOnly End { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (End < Start)
        {
            yield return new ValidationResult(
                "End date must fall on or after the start date.",
                [ nameof(End) ]);
        }
    }
}
```

For rules that require I/O, such as a database or web API call, see the Asynchronous validation support section instead.

> **Note:**
> In a Blazor form that uses static server-side rendering (static SSR), custom attributes aren't enforced by the browser unless the attribute also supplies a client-side rule. For more information, see ASP.NET Core Blazor client-side form validation in static SSR.
