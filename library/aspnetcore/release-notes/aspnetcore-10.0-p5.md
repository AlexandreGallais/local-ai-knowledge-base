---
title: "What's new in ASP.NET Core in .NET 10 (part 5 of 9)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-10.0.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# What's new in ASP.NET Core in .NET 10 (part 5 of 9)

### Persistent component state support for enhanced navigation

Blazor now supports handling persistent component state during enhanced navigation. State persisted during enhanced navigation can be read by interactive components on the page.

By default, persistent component state is only loaded by interactive components when they're initially loaded on the page. This prevents important state, such as data in an edited webform, from being overwritten if additional enhanced navigation events to the same page occur after the component is loaded.

If the data is read-only and doesn't change frequently, opt-in to allow updates during enhanced navigation by setting `AllowUpdates = true` on the `[PersistentState]` attribute. This is useful for scenarios such as displaying cached data that's expensive to fetch but doesn't change often. The following example demonstrates the use of `AllowUpdates` for weather forecast data:

```csharp
[PersistentState(AllowUpdates = true)]
public WeatherForecast[]? Forecasts { get; set; }

protected override async Task OnInitializedAsync()
{
    Forecasts ??= await ForecastService.GetForecastAsync();
}
```

To skip restoring state during prerendering, set `RestoreBehavior` to `SkipInitialValue`:

```csharp
[PersistentState(RestoreBehavior = RestoreBehavior.SkipInitialValue)]
public string NoPrerenderedData { get; set; }
```

To skip restoring state during reconnection, set `RestoreBehavior` to `SkipLastSnapshot`. This can be useful to ensure fresh data after reconnection:

```csharp
[PersistentState(RestoreBehavior = RestoreBehavior.SkipLastSnapshot)]
public int CounterNotRestoredOnReconnect { get; set; }
```

Call `PersistentComponentState.RegisterOnRestoring` to register a callback for imperatively controlling how state is restored, similar to how `Microsoft.AspNetCore.Components.PersistentComponentState.RegisterOnPersisting*` provides full control of how state is persisted.

### Blazor WebAssembly respects the current UI culture setting

In .NET 9 or earlier, standalone Blazor WebAssembly apps load UI globalization resources based on `System.Globalization.CultureInfo.DefaultThreadCurrentCulture`. If you want to additionally load globalization data for your localization culture defined by `System.Globalization.CultureInfo.DefaultThreadCurrentUICulture`, upgrade the app to .NET 10 or later.

## Blazor Hybrid

This section describes new features for Blazor Hybrid.

### New .NET MAUI Blazor Hybrid with a Blazor Web App and ASP.NET Core Identity article and sample

A new article and sample app has been added for .NET MAUI Blazor Hybrid and Web App using ASP.NET Core Identity.

For more information, see the following resources:

* .NET MAUI Blazor Hybrid and Web App with ASP.NET Core Identity
* `MauiBlazorWebIdentity` sample app (`dotnet/blazor-samples` GitHub repository)

## SignalR

This section describes new features for SignalR.

## Minimal APIs

This section describes new features for Minimal APIs.

### Treating empty string in form post as null for nullable value types

When using the `[FromForm]` attribute with a complex object in Minimal APIs, empty string values in a form post are now converted to `null` rather than causing a parse failure. This behavior matches the processing logic for form posts not associated with complex objects in Minimal APIs.

```csharp
using Microsoft.AspNetCore.Http;

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.MapPost("/todo", ([FromForm] Todo todo) => TypedResults.Ok(todo));

app.Run();

public class Todo
{
  public int Id { get; set; }
  public DateOnly? DueDate { get; set; } // Empty strings map to `null`
  public string Title { get; set; }
  public bool IsCompleted { get; set; }
}
```

Thanks to @nvmkpk for contributing this change!

### Validation support in Minimal APIs

Support for validation in Minimal APIs is now available. This feature allows you to request validation of data sent to your API endpoints. Enabling validation allows the ASP.NET Core runtime to perform any validations defined on the:

* Query
* Header
* Request body

Validations are defined using attributes in the `DataAnnotations` namespace. Developers customize the behavior of the validation system by:

* Creating custom `[Validation]` attribute implementations.
* Implementing the `IValidatableObject` interface for complex validation logic.

If validation fails, the runtime returns a 400 Bad Request response with details of the validation errors.

#### Enable built-in validation support for Minimal APIs

Enable the built-in validation support for Minimal APIs by calling the `AddValidation` extension method to register the required services in the service container for your application:

```csharp
builder.Services.AddValidation();
```

The implementation automatically discovers types that are defined in Minimal API handlers or as base types of types defined in Minimal API handlers. An endpoint filter performs validation on these types and is added for each endpoint.

> **Note:**
> `AddValidation` uses a source generator that only discovers validatable types within the assembly where `AddValidation` is called. If the Minimal API endpoints are defined in a different assembly, call `AddValidation` from within that assembly. For more information, see Validation in ASP.NET Core.

> **Note:**
> `Microsoft.Extensions.DependencyInjection.ValidationServiceCollectionExtensions.AddValidation*` validates properties and objects using data annotations on bound parameters and request models. It does not validate or reject unmapped JSON properties. By default, `System.Text.Json` sets `System.Text.Json.JsonSerializerOptions.UnmappedMemberHandling` to `System.Text.Json.Serialization.JsonUnmappedMemberHandling.Skip`. To reject requests containing unexpected JSON properties, configure `JsonSerializerOptions.UnmappedMemberHandling = JsonUnmappedMemberHandling.Disallow`.

Validation can be disabled for specific endpoints by using the `DisableValidation` extension method, as in the following example:

```csharp
app.MapPost("/products",
    ([EvenNumber(ErrorMessage = "Product ID must be even")] int productId, [Required] string name)
        => TypedResults.Ok(productId))
    .DisableValidation();
```

> **Note:**
> Several small improvements and fixes have been made to the Minimal APIs validation generator introduced in ASP.NET Core for .NET 10. To support future enhancements, the underlying validation resolver APIs are now marked as experimental. The top-level `AddValidation` APIs and the built-in validation filter remain stable and non-experimental.

#### Validation with record types

Minimal APIs also support validation with C# record types. Record types can be validated using attributes from the `System.ComponentModel.DataAnnotations` namespace, similar to classes. For example:

```csharp
public record Product(
    [Required] string Name,
    [Range(1, 1000)] int Quantity);
```

When using record types as parameters in Minimal API endpoints, validation attributes are automatically applied in the same way as class types:

```csharp
app.MapPost("/products", (Product product) =>
{
    // Endpoint logic here
    return TypedResults.Ok(product);
});
```

### Minimal API Validation integration with IProblemDetailsService

Error responses from the validation logic for Minimal APIs can now be customized by an `IProblemDetailsService` implementation provided in the application services collection (Dependency Injection container). This enables more consistent and user-specific error responses.

### Support for Server-Sent Events (SSE)

ASP.NET Core now supports returning a ServerSentEvents result using the TypedResults.ServerSentEvents API. This feature is supported in both Minimal APIs and controller-based apps.

Server-Sent Events is a server push technology that allows a server to send a stream of event messages to a client over a single HTTP connection. In .NET the event messages are represented as `SseItem<T>` objects, which may contain an event type, an ID, and a data payload of type `T`.

The TypedResults class has a new static method called ServerSentEvents that can be used to return a `ServerSentEvents` result. The first parameter to this method is an `IAsyncEnumerable<SseItem<T>>` that represents the stream of event messages to be sent to the client.

The following example illustrates how to use the `TypedResults.ServerSentEvents` API to return a stream of heart rate events as JSON objects to the client:

```csharp
app.MapGet("<example-value>", (CancellationToken <example-value>) =>
{
    async IAsyncEnumerable<HeartRateRecord> GetHeartRate(
        [EnumeratorCancellation] CancellationToken <example-value>)
    {
        while (!cancellationToken.IsCancellationRequested)
        {
            var heartRate = Random.Shared.Next(60, 100);
            yield return HeartRateRecord.Create(heartRate);
            await Task.Delay(2000, cancellationToken);
        }
    }

    return TypedResults.ServerSentEvents(GetHeartRate(cancellationToken),
                                                  eventType: "heartRate");
});
```
For more information, see:

- Server-Sent Events on MDN.
- Minimal API sample app using the `TypedResults.ServerSentEvents` API to return a stream of heart rate events as string, `ServerSentEvents`, and JSON objects to the client.
- Controller API sample app using the `TypedResults.ServerSentEvents` API to return a stream of heart rate events as string, `ServerSentEvents`, and JSON objects to the client.

### Validation APIs moved to Microsoft.Extensions.Validation

The validation APIs have moved to the `Microsoft.Extensions.Validation` namespace and NuGet package. This change makes the APIs usable outside of ASP.NET Core HTTP scenarios. The public APIs and behavior remain unchanged—only the package and namespace are different. Existing projects don't require code changes, as old references redirect to the new implementation.

### Enhanced validation for classes and records

Validation attributes can now be applied to both classes and records with consistent code generation and validation behavior. This enhancement improves flexibility when designing models using records in ASP.NET Core apps.

Community contribution: Thanks to @marcominerva!
