---
title: "Parameter binding in Minimal API applications (part 1 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/minimal-apis/parameter-binding.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Parameter Binding in Minimal API apps

-->
-->

Parameter binding is the process of converting request data into strongly typed parameters that are expressed by route handlers. A binding source determines where parameters are bound from. Binding sources can be explicit or inferred based on HTTP method and parameter type.

Supported binding sources:

* Route values
* Query string
* Header
* Body (as JSON)
* Form values
* Services provided by dependency injection
* Custom

> **Note:**
> C# union types are supported only as the body (as JSON). Non-body sources—route values, query string, headers, and form values—bind string values without JSON parsing, so they can't dispatch to a union case.

The following `GET` route handler uses some of these parameter binding sources:

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
The following table shows the relationship between the parameters used in the preceding example and the associated binding sources.

| Parameter | Binding Source |
|--|--|
| `id` | route value |
| `page` | query string |
| `customHeader` | header |
| `service` | Provided by dependency injection |

For example, given the following HTTP request:

```http
GET /42?page=3 HTTP/1.1
Host: example.com
X-CUSTOM-HEADER: hello
```

* `42` in `/42` matches `{id}` in the route template `/{id}` and binds to the `id` route parameter.
* `page=3` in `?page=3` matches the query string key `page` and binds to the `page` parameter.
* `X-CUSTOM-HEADER: hello` matches the `[FromHeader(Name = "X-CUSTOM-HEADER")]` header attribute and binds to `customHeader`.
* `service` is resolved from the dependency injection (DI) container, rather than from the incoming HTTP request.

The HTTP methods `GET`, `HEAD`, `OPTIONS`, and `DELETE` don't implicitly bind from body. To bind from body (as JSON) for these HTTP methods, bind explicitly with `[FromBody]` or read from the `Microsoft.AspNetCore.Http.HttpRequest`.

The following example POST route handler uses a binding source of body (as JSON) for the `person` parameter:

```csharp
var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.MapPost("/", (Person person) => { });

record Person(string Name, int Age);
```
The parameters in the preceding examples are all bound from request data automatically. To demonstrate the convenience that parameter binding provides, the following route handlers show how to read request data directly from the request:

```csharp
app.MapGet("/{id}", (HttpRequest request) =>
{
    var id = request.RouteValues["id"];
    var page = request.Query["page"];
    var customHeader = request.Headers["X-CUSTOM-HEADER"];

    // ...
});

app.MapPost("/", async (HttpRequest request) =>
{
    var person = await request.ReadFromJsonAsync<Person>();

    // ...
});
```
## Explicit Parameter Binding

Attributes can be used to explicitly declare where parameters are bound from.

```csharp
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Added as service
builder.Services.AddSingleton<Service>();

var app = builder.Build();

app.MapGet("/{id}", ([FromRoute] int id,
                     [FromQuery(Name = "p")] int page,
                     [FromServices] Service service,
                     [FromHeader(Name = "Content-Type")] string contentType) 
                     => {});

class Service { }

record Person(string Name, int Age);
```
| Parameter | Binding Source |
| --------- | -------------- |
| `id`      | route value with the name `id` |
| `page`    | query string with the name `"p"`|
| `service`   | Provided by dependency injection |
| `contentType` | header with the name `"Content-Type"` |

### Explicit binding from form values

The `[FromForm]` attribute binds form values:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/FormBinding/Program.cs._
An alternative is to use the `[AsParameters]` attribute with a custom type that has properties annotated with `[FromForm]`. For example, the following code binds from form values to properties of the `NewTodoRequest` record struct:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/FormBinding/Program.cs._
_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/FormBinding/Program.cs._
For more information, see the section on AsParameters later in this article.

The complete sample code is in the AspNetCore.Docs.Samples repository.

### Secure binding from IFormFile and IFormFileCollection

Complex form binding is supported using `Microsoft.AspNetCore.Http.IFormFile` and `Microsoft.AspNetCore.Http.IFormFileCollection` using the `[FromForm]`:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/IFormFile/Program.cs._
Parameters bound to the request with `[FromForm]` include an antiforgery token. The antiforgery token is validated when the request is processed. For more information, see Antiforgery with Minimal APIs.

For more information, see Form binding in Minimal APIs.

The complete sample code is in the AspNetCore.Docs.Samples repository.

## Parameter binding with dependency injection

Parameter binding for Minimal APIs binds parameters through dependency injection when the type is configured as a service. It's not necessary to explicitly apply the `[FromServices]` attribute to a parameter. In the following code, both actions return the time:

```csharp
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<IDateTime, SystemDateTime>();

var app = builder.Build();

app.MapGet("/",   (               IDateTime dateTime) => dateTime.Now);
app.MapGet("/fs", ([FromServices] IDateTime dateTime) => dateTime.Now);
app.Run();
```
## Optional parameters

Parameters declared in route handlers are treated as required:

* If a request matches the route, the route handler only runs if all required parameters are provided in the request.
* Failure to provide all required parameters results in an error.

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/products", (int pageNumber) => $"Requesting page {pageNumber}");

app.Run();
```
| URI | result |
| --------- | -------------- |
| `/products?pageNumber=3` | 3 returned |
| `/products` | `BadHttpRequestException`: Required parameter "int pageNumber" wasn't provided from query string. |
| `/products/1` | HTTP 404 error, no matching route |

To make `pageNumber` optional, define the type as optional or provide a default value:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/products", (int? pageNumber) => $"Requesting page {pageNumber ?? 1}");

string ListProducts(int pageNumber = 1) => $"Requesting page {pageNumber}";

app.MapGet("/products2", ListProducts);

app.Run();
```
| URI | result |
| --------- | -------------- |
| `/products?pageNumber=3` | 3 returned |
| `/products` | 1 returned |
| `/products2` | 1 returned |

The preceding nullable and default value applies to all sources:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapPost("/products", (Product? product) => { });

app.Run();
```
The preceding code calls the method with a null product if no request body is sent.

**NOTE**: If invalid data is provided and the parameter is nullable, the route handler is ***not*** run.

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/products", (int? pageNumber) => $"Requesting page {pageNumber ?? 1}");

app.Run();
```
| URI | result |
| --------- | -------------- |
| `/products?pageNumber=3` | `3` returned |
| `/products` | `1` returned |
| `/products?pageNumber=two` | `BadHttpRequestException`: Failed to bind parameter `"Nullable<int> pageNumber"` from "two". |
| `/products/two` | HTTP 404 error, no matching route |

See the Binding Failures section for more information.
