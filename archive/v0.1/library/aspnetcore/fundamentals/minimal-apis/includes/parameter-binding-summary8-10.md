---
title: "parameter-binding-summary8-10"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/minimal-apis/includes/parameter-binding-summary8-10.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# parameter-binding-summary8-10

Parameter binding is the process of converting request data into strongly typed parameters that are expressed by route handlers. A binding source determines where parameters are bound from. Binding sources can be explicit or inferred based on HTTP method and parameter type.

Supported binding sources:

* Route values
* Query string
* Header
* Body (as JSON)
* Form values
* Services provided by dependency injection
* Custom

The following GET route handler uses some of these parameter binding sources:

```csharp
var builder = WebApplication.CreateBuilder(args);

// Added as service
builder.Services.AddSingleton<Service>();

var app = builder.Build();

app.MapGet("/{id}", (int id,
                     int page,
                     [FromHeader(Name = "X-CUSTOM-HEADER")] string customHeader,
                     Service service) => { });

class Service { }
```
### Key <example-value> binding features

* **Explicit binding**: Use attributes like `[FromRoute]`, `[FromQuery]`, `[FromHeader]`, `[FromBody]`, `[FromForm]`, and `[FromServices]` to explicitly specify binding sources.
* **Form binding**: Bind form values using `[FromForm]` attribute, including support for `IFormFile` and `IFormFileCollection` for file uploads.
* **Complex types**: Bind to collections and complex types from forms, query strings, and headers.
* **Custom binding**: Implement custom binding logic using `TryParse`, `BindAsync`, or the `IBindableFromHttpContext<T>` interface.
* **Optional parameters**: Support nullable types and default values for optional parameters.
* **Dependency injection**: Parameters are automatically bound from services registered in the DI container.
* **Special types**: Automatic binding for `HttpContext`, `HttpRequest`, `HttpResponse`, `CancellationToken`, `ClaimsPrincipal`, `Stream`, and `PipeReader`.

---

**Learn more:** For detailed information on parameter binding including advanced scenarios, validation, binding precedence, and troubleshooting, see Parameter binding in Minimal API applications.
