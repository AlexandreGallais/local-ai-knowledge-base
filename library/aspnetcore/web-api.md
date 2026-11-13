---
title: "Create web APIs with ASP.NET Core (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/web-api/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Create web APIs with ASP.NET Core

ASP.NET Core supports creating web APIs using controllers or using Minimal APIs. *Controllers* in a web API are classes that derive from `Microsoft.AspNetCore.Mvc.ControllerBase`. Controllers are activated and disposed on a per request basis.

This article shows how to use controllers for handling web API requests. For information on creating web APIs without controllers, see Tutorial: Create a Minimal API with ASP.NET Core.

> **Important:**
> Starting with ASP.NET Core 10, known API endpoints no longer redirect to login pages when using cookie authentication. Instead, they return 401/403 status codes. For details, see API endpoint authentication behavior in ASP.NET Core.

## ControllerBase class

A controller-based web API consists of one or more controller classes that derive from `Microsoft.AspNetCore.Mvc.ControllerBase`. The web API project template provides a starter controller:

```csharp
[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
```

Web API controllers should typically derive from `Microsoft.AspNetCore.Mvc.ControllerBase` rather from `Microsoft.AspNetCore.Mvc.Controller`. `Controller` derives from `Microsoft.AspNetCore.Mvc.ControllerBase` and adds support for views, so it's for handling web pages, not web API requests. If the same controller must support views and web APIs, derive from `Controller`.

The `ControllerBase` class provides many properties and methods that are useful for handling HTTP requests. For example, `Microsoft.AspNetCore.Mvc.ControllerBase.CreatedAtAction*` returns a 201 status code:

```csharp
[HttpPost]
[ProducesResponseType(StatusCodes.Status201Created)]
[ProducesResponseType(StatusCodes.Status400BadRequest)]
public ActionResult<Pet> Create(Pet pet)
{
    pet.Id = _petsInMemoryStore.Any() ? 
             _petsInMemoryStore.Max(p => p.Id) + 1 : 1;
    _petsInMemoryStore.Add(pet);

    return CreatedAtAction(nameof(GetById), new { id = pet.Id }, pet);
}
```

The following table contains examples of methods in `ControllerBase`.

|Method   |Notes    |
|---------|---------|
|`Microsoft.AspNetCore.Mvc.ControllerBase.BadRequest*`| Returns 400 status code.|
|`Microsoft.AspNetCore.Mvc.ControllerBase.NotFound*`|Returns 404 status code.|
|`Microsoft.AspNetCore.Mvc.ControllerBase.PhysicalFile*`|Returns a file.|
|`Microsoft.AspNetCore.Mvc.ControllerBase.TryUpdateModelAsync*`|Invokes model binding.|
|`Microsoft.AspNetCore.Mvc.ControllerBase.TryValidateModel*`|Invokes model validation.|

For a list of all available methods and properties, see `Microsoft.AspNetCore.Mvc.ControllerBase`.

## Attributes

The `Microsoft.AspNetCore.Mvc` namespace provides attributes that can be used to configure the behavior of web API controllers and action methods. The following example uses attributes to specify the supported HTTP action verb and any known HTTP status codes that could be returned:

```csharp
[HttpPost]
[ProducesResponseType(StatusCodes.Status201Created)]
[ProducesResponseType(StatusCodes.Status400BadRequest)]
public ActionResult<Pet> Create(Pet pet)
{
    pet.Id = _petsInMemoryStore.Any() ? 
             _petsInMemoryStore.Max(p => p.Id) + 1 : 1;
    _petsInMemoryStore.Add(pet);

    return CreatedAtAction(nameof(GetById), new { id = pet.Id }, pet);
}
```

Here are some more examples of attributes that are available.

| Attribute | Notes |
|--|--|
| `[Route]` | Specifies URL pattern for a controller or action. |
| `[Bind]` | Specifies prefix and properties to include for model binding. |
| `[HttpGet]` | Identifies an action that supports the HTTP GET action verb. |
| `[Consumes]` | Specifies data types that an action accepts. |
| `[Produces]` | Specifies data types that an action returns. |

For a list that includes the available attributes, see the `Microsoft.AspNetCore.Mvc` namespace.

## ApiController attribute

The `[ApiController]` attribute can be applied to a controller class to enable the following opinionated, API-specific behaviors:

* Attribute routing requirement
* Automatic HTTP 400 responses
* Binding source parameter inference
* Multipart/form-data request inference
* Problem details for error status codes

### Attribute on specific controllers

The `[ApiController]` attribute can be applied to specific controllers, as in the following example from the project template:

```csharp
[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
```

### Attribute on multiple controllers

One approach to using the attribute on more than one controller is to create a custom base controller class annotated with the `[ApiController]` attribute. The following example shows a custom base class and a controller that derives from it:

```csharp
[ApiController]
public class MyControllerBase : ControllerBase
{
}
```

```csharp
[Produces(MediaTypeNames.Application.Json)]
[Route("[controller]")]
public class PetsController : MyControllerBase
```

### Attribute on an assembly

The `[ApiController]` attribute can be applied to an assembly. When the `[ApiController]` attribute is applied to an assembly, all controllers in the assembly have the `[ApiController]` attribute applied. There's no way to opt out for individual controllers. Apply the assembly-level attribute to the `Program.cs` file:

```csharp
using Microsoft.AspNetCore.Mvc;
[assembly: ApiController]

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
```

## Attribute routing requirement

The `[ApiController]` attribute makes attribute routing a requirement. For example:

```csharp
[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
```

Actions are inaccessible via conventional routes defined by `UseEndpoints`, `Microsoft.AspNetCore.Builder.MvcApplicationBuilderExtensions.UseMvc*`, or `Microsoft.AspNetCore.Builder.MvcApplicationBuilderExtensions.UseMvcWithDefaultRoute*`.

## Automatic HTTP 400 responses

The `[ApiController]` attribute makes model validation errors automatically trigger an HTTP 400 response. Consequently, the following code is unnecessary in an action method:

```csharp
if (!ModelState.IsValid)
{
    return BadRequest(ModelState);
}
```

ASP.NET Core MVC uses the `Microsoft.AspNetCore.Mvc.Infrastructure.ModelStateInvalidFilter` action filter to do the preceding check.

### Default BadRequest response

The default response type for an HTTP 400 response is `Microsoft.AspNetCore.Mvc.ValidationProblemDetails`. The following response body is an example of the serialized type:

```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "traceId": "|7fb5e16a-4c8f23bbfc974667.",
  "errors": {
    "": [
      "A non-empty request body is required."
    ]
  }
}
```

The `ValidationProblemDetails` type:

* Provides a machine-readable format for specifying errors in web API responses.
* Complies with the RFC 7807 specification.

To make automatic and custom responses consistent, call the `Microsoft.AspNetCore.Mvc.ControllerBase.ValidationProblem*` method instead of `Microsoft.AspNetCore.Mvc.ControllerBase.BadRequest*`. `ValidationProblem` returns a `Microsoft.AspNetCore.Mvc.ValidationProblemDetails` object as well as the automatic response.

### Log automatic 400 responses

To log automatic 400 responses, set the `Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.InvalidModelStateResponseFactory` delegate property to perform custom processing. By default, `InvalidModelStateResponseFactory` uses `Microsoft.AspNetCore.Mvc.Infrastructure.ProblemDetailsFactory` to create an instance of `Microsoft.AspNetCore.Mvc.ValidationProblemDetails`.

The following example shows how to retrieve an instance of `Microsoft.Extensions.Logging.ILogger`1` to log information about an automatic 400 response:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
      // To preserve the default behavior, capture the original delegate to call later.
        var builtInFactory = options.InvalidModelStateResponseFactory;

        options.InvalidModelStateResponseFactory = context =>
        {
            var logger = context.HttpContext.RequestServices
                                .GetRequiredService<ILogger<Program>>();

            // Perform logging here.
            // ...

            // Invoke the default behavior, which produces a ValidationProblemDetails
            // response.
            // To produce a custom response, return a different implementation of 
            // IActionResult instead.
            return builtInFactory(context);
        };
    });

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
```

### Disable automatic 400 response

To disable the automatic 400 behavior, set the `Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.SuppressModelStateInvalidFilter` property to `true`. Add the following highlighted code:

```csharp
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        options.SuppressConsumesConstraintForFormFileParameters = true;
        options.SuppressInferBindingSourcesForParameters = true;
        options.SuppressModelStateInvalidFilter = true;
        options.SuppressMapClientErrors = true;
        options.ClientErrorMapping[StatusCodes.Status404NotFound].Link =
            "https://httpstatuses.com/404";
    });

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
```
