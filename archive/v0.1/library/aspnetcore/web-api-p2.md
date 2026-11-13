---
title: "Create web APIs with ASP.NET Core (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/web-api/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Create web APIs with ASP.NET Core (part 2 of 2)

## Binding source parameter inference

A binding source attribute defines the location at which an action parameter's value is found. The following binding source attributes exist:

|Attribute|Binding source |
|---------|---------|
|`[FromBody]`     | Request body |
|`[FromForm]`     | Form data in the request body |
|`[FromHeader]` | Request header |
|`[FromQuery]`   | Request query string parameter |
|`[FromRoute]`   | Route data from the current request |
|`[FromServices]` | The request service injected as an action parameter |
|`[AsParameters]` | Method parameters |

> **Warning:**
> Don't use `[FromRoute]` when values might contain `%2f` (that is `/`). `%2f` won't be unescaped to `/`. Use `[FromQuery]` if the value might contain `%2f`.

Without the `[ApiController]` attribute or binding source attributes like `[FromQuery]`, the ASP.NET Core runtime attempts to use the complex object model binder. The complex object model binder pulls data from value providers in a defined order.

In the following example, the `[FromQuery]` attribute indicates that the `discontinuedOnly` parameter value is provided in the request URL's query string:

```csharp
[HttpGet]
public ActionResult<List<Product>> Get(
    [FromQuery] bool discontinuedOnly = false)
{
    List<Product> products = null;

    if (discontinuedOnly)
    {
        products = _productsInMemoryStore.Where(p => p.IsDiscontinued).ToList();
    }
    else
    {
        products = _productsInMemoryStore;
    }

    return products;
}
```

The `[ApiController]` attribute applies inference rules for the default data sources of action parameters. These rules save you from having to identify binding sources manually by applying attributes to the action parameters. The binding source inference rules behave as follows:

* `[FromServices]` is inferred for complex type parameters registered in the DI Container.
* `[FromBody]` is inferred for complex type parameters not registered in the DI Container. An exception to the `[FromBody]` inference rule is any complex, built-in type with a special meaning, such as `Microsoft.AspNetCore.Http.IFormCollection` and `System.Threading.CancellationToken`. The binding source inference code ignores those special types.
* `[FromForm]` is inferred for action parameters of type `Microsoft.AspNetCore.Http.IFormFile` and `Microsoft.AspNetCore.Http.IFormFileCollection`. It's not inferred for any simple or user-defined types.
* `[FromRoute]` is inferred for any action parameter name matching a parameter in the route template. When more than one route matches an action parameter, any route value is considered `[FromRoute]`.
* `[FromQuery]` is inferred for any other action parameters.

### FromBody inference notes

`[FromBody]` isn't inferred for simple types such as `string` or `int`. Therefore, the `[FromBody]` attribute should be used for simple types when that functionality is needed.

When an action has more than one parameter bound from the request body, an exception is thrown. For example, all of the following action method signatures cause an exception:

* `[FromBody]` inferred on both because they're complex types.

  ```csharp
  [HttpPost]
  public IActionResult Action1(Product product, Order order)
  ```

* `[FromBody]` attribute on one, inferred on the other because it's a complex type.

  ```csharp
  [HttpPost]
  public IActionResult Action2(Product product, [FromBody] Order order)
  ```

* `[FromBody]` attribute on both.

  ```csharp
  [HttpPost]
  public IActionResult Action3([FromBody] Product product, [FromBody] Order order)
  ```

### FromServices inference notes

Parameter binding binds parameters through dependency injection when the type is configured as a service. This means it's not required to explicitly apply the `[FromServices]` attribute to a parameter. In the following code, both actions return the time:

```csharp
[Route("[controller]")]
[ApiController]
public class MyController : ControllerBase
{
    public ActionResult GetWithAttribute([FromServices] IDateTime dateTime) 
                                                        => Ok(dateTime.Now);

    [Route("noAttribute")]
    public ActionResult Get(IDateTime dateTime) => Ok(dateTime.Now);
}
```

In rare cases, automatic DI can break apps that have a type in DI that is also accepted in an API controller's action methods. It's not common to have a type in DI and as an argument in an API controller action.

To disable `[FromServices]` inference for a single action parameter, apply the desired binding source attribute to the parameter. For example, apply the `[FromBody]` attribute to an action parameter that should be bound from the body of the request.

To disable `[FromServices]` inference globally, set DisableImplicitFromServicesParameters to `true`:

```csharp
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddSingleton<IDateTime, SystemDateTime>();

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.DisableImplicitFromServicesParameters = true;
});

var app = builder.Build();

app.MapControllers();

app.Run();
```

Types are checked at app startup with `Microsoft.Extensions.DependencyInjection.IServiceProviderIsService` to determine if an argument in an API controller action comes from DI or from the other sources.

The mechanism to infer binding source of API Controller action parameters uses the following rules:

* A previously specified `BindingInfo.BindingSource` is never overwritten.
* A complex type parameter, registered in the DI container, is assigned `BindingSource.Services`.
* A complex type parameter, not registered in the DI container, is assigned `BindingSource.Body`.
* A parameter with a name that appears as a route value in ***any*** route template is assigned `BindingSource.Path`.
* All other parameters are `BindingSource.Query`.

### Disable inference rules

To disable binding source inference, set `Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.SuppressInferBindingSourcesForParameters` to `true`:

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
        options.DisableImplicitFromServicesParameters = true;
    });

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
```

## Multipart/form-data request inference

The `[ApiController]` attribute applies an inference rule for action parameters of type `Microsoft.AspNetCore.Http.IFormFile` and `Microsoft.AspNetCore.Http.IFormFileCollection`. The `multipart/form-data` request content type is inferred for these types.

To disable the default behavior, set the `Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.SuppressConsumesConstraintForFormFileParameters` property to `true`:

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

## Problem details for error status codes

MVC transforms an error result (a result with status code 400 or higher) to a result with `Microsoft.AspNetCore.Mvc.ProblemDetails`. The `ProblemDetails` type is based on the RFC 7807 specification for providing machine-readable error details in an HTTP response.

Consider the following code in a controller action:

```csharp
if (pet == null)
{
    return NotFound();
}
```

The `NotFound` method produces an HTTP 404 status code with a `ProblemDetails` body. For example:

```json
{
  type: "https://tools.ietf.org/html/rfc7231#section-6.5.4",
  title: "Not Found",
  status: 404,
  traceId: "0HLHLV31KRN83:00000001"
}
```

### Disable ProblemDetails response

The automatic creation of a `ProblemDetails` for error status codes is disabled when the `Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.SuppressMapClientErrors` property is set to `true`. Add the following code:

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

## Define supported request content types with the [Consumes] attribute

By default, an action supports all available request content types. For example, if an app is configured to support both JSON and XML input formatters, an action supports multiple content types, including `application/json` and `application/xml`.

The [Consumes] attribute allows an action to limit the supported request content types. Apply the `[Consumes]` attribute to an action or controller, specifying one or more content types:

```csharp
[HttpPost]
[Consumes("application/xml")]
public IActionResult CreateProduct(Product product)
```

In the preceding code, the `CreateProduct` action specifies the content type `application/xml`. Requests routed to this action must specify a `Content-Type` header of `application/xml`. Requests that don't specify a `Content-Type` header of `application/xml` result in a 415 Unsupported Media Type response.

The `[Consumes]` attribute also allows an action to influence its selection based on an incoming request's content type by applying a type constraint. Consider the following example:

```csharp
[ApiController]
[Route("api/[controller]")]
public class ConsumesController : ControllerBase
{
    [HttpPost]
    [Consumes("application/json")]
    public IActionResult PostJson(IEnumerable<int> values) =>
        Ok(new { Consumes = "application/json", Values = values });

    [HttpPost]
    [Consumes("application/x-www-form-urlencoded")]
    public IActionResult PostForm([FromForm] IEnumerable<int> values) =>
        Ok(new { Consumes = "application/x-www-form-urlencoded", Values = values });
}
```

In the preceding code, `ConsumesController` is configured to handle requests sent to the `https://localhost:5001/api/Consumes` URL. Both of the controller's actions, `PostJson` and `PostForm`, handle POST requests with the same URL. Without the `[Consumes]` attribute applying a type constraint, an ambiguous match exception is thrown.

The `[Consumes]` attribute is applied to both actions. The `PostJson` action handles requests sent with a `Content-Type` header of `application/json`. The `PostForm` action handles requests sent with a `Content-Type` header of `application/x-www-form-urlencoded`.

## Additional resources

* View or download sample code. (How to download).
* Controller action return types in ASP.NET Core web API
* Handle errors in ASP.NET Core APIs
* Custom formatters in ASP.NET Core Web API
* Format response data in ASP.NET Core Web API
* ASP.NET Core web API documentation with Swagger / OpenAPI
* Routing to controller actions in ASP.NET Core
* Use port tunneling Visual Studio to debug web APIs
* Create a web API with ASP.NET Core
