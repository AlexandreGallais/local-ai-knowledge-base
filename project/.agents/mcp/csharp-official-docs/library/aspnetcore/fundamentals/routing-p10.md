---
title: "Routing in ASP.NET Core (part 10 of 10)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/routing.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Routing in ASP.NET Core (part 10 of 10)

## Guidance for library authors

This section contains guidance for library authors building on top of routing. These details are intended to ensure that app developers have a good experience using libraries and frameworks that extend routing.

### Define endpoints

To create a framework that uses routing for URL matching, start by defining a user experience that builds on top of `Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseEndpoints*`.

**DO** build on top of `Microsoft.AspNetCore.Routing.IEndpointRouteBuilder`. This allows users to compose your framework with other ASP.NET Core features without confusion. Every ASP.NET Core template includes routing. Assume routing is present and familiar for users.

```csharp
// Your framework
app.MapMyFramework(...);

app.MapHealthChecks("/healthz");
```

**DO** return a sealed concrete type from a call to `MapMyFramework(...)` that implements `Microsoft.AspNetCore.Builder.IEndpointConventionBuilder`. Most framework `Map...` methods follow this pattern. The `IEndpointConventionBuilder` interface:

* Allows for metadata to be composed.
* Is targeted by a variety of extension methods.

Declaring your own type allows you to add your own framework-specific functionality to the builder. It's ok to wrap a framework-declared builder and forward calls to it.

```csharp
// Your framework
app.MapMyFramework(...)
    .RequireAuthorization()
    .WithMyFrameworkFeature(awesome: true);

app.MapHealthChecks("/healthz");
```

**CONSIDER** writing your own `Microsoft.AspNetCore.Routing.EndpointDataSource`. `EndpointDataSource` is the low-level primitive for declaring and updating a collection of endpoints. `EndpointDataSource` is a powerful API used by controllers and Razor Pages. For more information, see Dynamic endpoint routing.

The routing tests have a basic <example-value> of a non-updating data source.

**CONSIDER** implementing `Microsoft.AspNetCore.Routing.EndpointDataSource.GetGroupedEndpoints*`. This gives complete control over running group conventions and the final metadata on the grouped endpoints. For example, this allows custom `EndpointDataSource` implementations to run endpoint filters added to groups.

**DO NOT** attempt to register an `EndpointDataSource` by default. Require users to register your framework in `Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseEndpoints*`. The philosophy of routing is that nothing is included by default, and that `UseEndpoints` is the place to register endpoints.

### Creating routing-integrated middleware

**CONSIDER** defining metadata types as an interface.

**DO** make it possible to use metadata types as an attribute on classes and methods.

```csharp
public interface ICoolMetadata
{
    bool IsCool { get; }
}

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class CoolMetadataAttribute : Attribute, ICoolMetadata
{
    public bool IsCool => true;
}
```
Frameworks like controllers and Razor Pages support applying metadata attributes to types and methods. If you declare metadata types:

* Make them accessible as attributes.
* Most users are familiar with applying attributes.

Declaring a metadata type as an interface adds another layer of flexibility:

* Interfaces are composable.
* Developers can declare their own types that combine multiple policies.

**DO** make it possible to override metadata, as shown in the following example:

```csharp
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class SuppressCoolMetadataAttribute : Attribute, ICoolMetadata
{
    public bool IsCool => false;
}

[CoolMetadata]
public class MyController : Controller
{
    public void MyCool() { }

    [SuppressCoolMetadata]
    public void Uncool() { }
}
```
The best way to follow these guidelines is to avoid defining **marker metadata**:

* Don't just look for the presence of a metadata type.
* Define a property on the metadata and check the property.

The metadata collection is ordered and supports overriding by priority. In the case of controllers, metadata on the action method is most specific.

**DO** make middleware useful with and without routing:

```csharp
app.UseAuthorization(new AuthorizationPolicy() { ... });

// Your framework
app.MapMyFramework(...).RequireAuthorization();
```

As an example of this guideline, consider the authorization middleware. A configured fallback policy applies when the middleware can't produce a policy from authorization metadata, including:

* Endpoints without authorization metadata that produces a policy.
* Requests that don't match an endpoint.

This behavior makes the authorization middleware useful outside of routing and for traditional middleware programming. For complete policy selection rules, see Policy-based authorization in ASP.NET Core.

## Debug diagnostics

For detailed routing diagnostic output, set `Logging:LogLevel:Microsoft` to `Debug`. In the `Development` environment, set the log level in `appsettings.Development.json`:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Debug",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  }
}
```

## Related content

View or download sample code (how to download)
