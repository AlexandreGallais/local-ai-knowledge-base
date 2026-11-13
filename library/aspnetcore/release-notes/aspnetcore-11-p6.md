---
title: "What's new in ASP.NET Core in .NET 11 (part 6 of 9)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-11.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# What's new in ASP.NET Core in .NET 11 (part 6 of 9)

## Minimal APIs

This section describes new features for Minimal APIs.

### Endpoint filters observe parameter-binding failures

When a Minimal API endpoint has any filters or filter factories configured, the filter pipeline now runs even if parameter binding fails. Filters can read `HttpContext.Response.StatusCode == 400` and substitute their own response body.

In the `Development` environment, set `RouteHandlerOptions.ThrowOnBadRequest = false` so the framework returns a 400 that the filter can observe instead of throwing `Microsoft.AspNetCore.Http.BadHttpRequestException` to the developer exception page. This is already the default in non-`Development` environments.

Thank you @marcominerva for this contribution!

### C# union types

ASP.NET Core supports C# union types (C# language reference), which are new in .NET 11, anywhere `System.Text.Json` is used: JSON request and response bodies in Minimal APIs and MVC, SignalR's `JsonHubProtocol`, Blazor JavaScript interop, persistent component state, and prerendered component parameters.

```csharp
public union UnionIntString(int, string);

app.MapGet("/value", () => new UnionIntString(42));
```

Union types aren't supported for non-body binding sources such as route values, query strings, headers, and form fields.

For OpenAPI, an endpoint that returns a union is described with an `anyOf` schema listing each case type. Unlike polymorphic types, union cases don't carry a `$type` discriminator, so each case reuses its standalone component (for example, `#/components/schemas/Dog`) instead of a duplicated, prefixed one. ApiExplorer detects a union through `JsonTypeInfoKind.Union`, so the schema also flows through to Swashbuckle and NSwag. When multiple cases serialize to the same JSON shape, disambiguate them with a `[JsonUnion]` classifier. SignalR unions require the JSON hub protocol; the MessagePack and `Newtonsoft.Json` protocols don't support unions.

For examples and additional information that apply to Blazor apps, see the Component parameters section in the Components overview article and the Pass parameters section of the Dynamically-rendered ASP.NET Core Razor components article.

### Async validation for Minimal APIs

Minimal API validation now supports asynchronous validators end-to-end (dotnet/aspnetcore #66487, dotnet/aspnetcore #67183). Preview 5 shipped the building blocks for asynchronous form validation in Blazor. Preview 6 adds new asynchronous `DataAnnotations` APIs in the base libraries (`AsyncValidationAttribute` and `IAsyncValidatableObject`), and `Microsoft.Extensions.Validation` now runs them when an endpoint validates a request.

The simplest way to add an asynchronous rule is a custom validation attribute. Derive from `AsyncValidationAttribute` and implement `IsValidAsync` to query a database or call a remote API without blocking a thread. The synchronous `IsValid` is abstract too; throw from it when the attribute validates asynchronously only:

```csharp
using System.ComponentModel.DataAnnotations;
using Microsoft.Extensions.DependencyInjection;

public sealed class UniqueEmailAttribute : AsyncValidationAttribute
{
    // Synchronous IsValid. This attribute validates asynchronously only.
    protected override ValidationResult? IsValid(object? value, ValidationContext context) =>
        throw new InvalidOperationException("Validate this attribute with IsValidAsync.");

    protected override async Task<ValidationResult?> IsValidAsync(
        object? value, ValidationContext context, CancellationToken cancellationToken)
    {
        var users = context.GetRequiredService<IUserService>();
        
        if (value is string email && await users.EmailExistsAsync(email, cancellationToken))
        {
            return new ValidationResult("That email is already registered.");
        }

        return ValidationResult.Success;
    }
}
```

Apply `[UniqueEmail]` to a property like any built-in validation attribute.

For validation that spans several properties or the whole object, implement `IAsyncValidatableObject` and return results as an `IAsyncEnumerable<ValidationResult>`. Because `IAsyncValidatableObject` extends `IValidatableObject`, also implement the synchronous `Validate` method. When a type validates asynchronously only, throw from `Validate` so its validation isn't silently skipped by the synchronous APIs:

```csharp
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;

public class ReservationRequest : IAsyncValidatableObject
{
    [Required]
    public string Email { get; set; } = "";

    public DateOnly Date { get; set; }

    // Synchronous IValidatableObject. This type validates asynchronously only.
    public IEnumerable<ValidationResult> Validate(ValidationContext context) =>
        throw new InvalidOperationException("Validate this type with ValidateAsync.");

    public async IAsyncEnumerable<ValidationResult> ValidateAsync(
        ValidationContext context,
        [EnumeratorCancellation] CancellationToken cancellationToken = default)
    {
        var rooms = context.GetRequiredService<IRoomService>();

        if (!await rooms.HasAvailabilityAsync(Date, cancellationToken))
        {
            yield return new ValidationResult(
                "No rooms are available on that date.", [nameof(Date)]);
        }
    }
}
```

Register validation and the framework validates the request before the endpoint runs:

```csharp
builder.Services.AddValidation();

app.MapPost("/reservations", (ReservationRequest request) =>
    Results.Ok(request));
```

Validators run concurrently where possible: asynchronous attributes on the same member start together, collection items validate in parallel, and the framework preserves the existing ordering between member, type, and `IValidatableObject` validation.

### Short-circuit endpoints with an attribute

The new `[ShortCircuit]` attribute marks an endpoint to run immediately after routing, skipping the rest of the middleware pipeline. This is the attribute form of the existing `ShortCircuit()` endpoint convention, so it can be applied directly to MVC controllers and actions.

Short-circuiting is useful for endpoints that don't need authentication, CORS, or other middleware—for example a health check or a `robots.txt` response, and it avoids the cost of running that middleware. The endpoint still runs and produces its response. Pass an optional status code, such as `[ShortCircuit(404)]`, to set the response status code.

```csharp
[ApiController]
[Route("robots.txt")]
[ShortCircuit]
public class RobotsController : ControllerBase
{
    [HttpGet]
    public IActionResult Get() => Content("User-agent: *\nDisallow:", "text/plain");
}
```

The same attribute works on Minimal API endpoints, and the existing `ShortCircuit()` convention continues to work unchanged:

```csharp
app.MapGet("/health", [ShortCircuit] () => "Healthy");
```

Thank you @Porozhniakov for contributing this feature!

### Validation localization is built in

`Microsoft.Extensions.Validation` localizes validation messages and display names without a separate package. Calling `AddLocalization` to register an `IStringLocalizerFactory`, followed by `AddValidation`, activates localization automatically. The validation source generator emits the localization lookup into your assembly.

```csharp
builder.Services.AddLocalization();
builder.Services.AddValidation();
```

```csharp
[ValidatableType]
public class CustomerModel
{
    [Display(Name = "CustomerName")]          // resource key for the display name
    [Required(ErrorMessage = "NameRequired")] // resource key for the message
    public string? Name { get; set; }
}
```

By default, keys resolve against the resources of the type that declares the validated member. An explicit `ErrorMessage` value, such as `NameRequired` in the preceding example, is the first resource key that localization tries. When an attribute doesn't specify `ErrorMessage`, localization instead tries built-in resource-name conventions from most to least specific:

1. `{DeclaringType}_{MemberName}_{AttributeType}_Error`
1. `{DeclaringType}_{AttributeType}_Error`
1. `{AttributeType}_Error`

For example, a `[Required]` attribute on `CustomerModel.Name` resolves against `CustomerModel_Name_RequiredAttribute_Error`, `CustomerModel_RequiredAttribute_Error`, or the shared `RequiredAttribute_Error` resource. This allows the default message of an attribute to be translated once for the whole app. If no resource resolves, validation falls back to the attribute's built-in message. Use `ValidationOptions.LocalizerProvider` to resolve keys from a shared resource file instead:

```csharp
builder.Services.AddValidation(options =>
{
    options.LocalizerProvider = (_, factory) => factory.Create(typeof(ValidationMessages));
});
```

Localized strings don't have to come from resource files. Registering a custom `IStringLocalizerFactory` switches validation messages to that factory's backing store, such as a database or JSON files. A user-registered factory takes precedence over the default resource file implementation:

```csharp
builder.Services.AddSingleton<IStringLocalizerFactory, DbStringLocalizerFactory>();
builder.Services.AddValidation();
```

Attributes that already localize themselves (`ErrorMessageResourceType`, `[Display(ResourceType = ...)]`) bypass the pipeline entirely. A custom attribute that needs to substitute its own values into the message template can implement `IValidationMessageFormatter`:

```csharp
public sealed class DivisibleByAttribute : ValidationAttribute, IValidationMessageFormatter
{
    public int Divisor { get; init; }

    public string FormatMessage(CultureInfo culture, string template, string displayName)
        => string.Format(culture, template, displayName, Divisor); // {0} = name, {1} = divisor
}
```

The same localization rules apply to validation for minimal APIs and Blazor, so a message localizes identically wherever the model is used.

Complete feature coverage is available in the following articles:

* Validation in ASP.NET Core
* Minimal APIs quick reference

For more information, see Add localization support to Microsoft.Extensions.Validation (`dotnet/aspnetcore` #66646).
