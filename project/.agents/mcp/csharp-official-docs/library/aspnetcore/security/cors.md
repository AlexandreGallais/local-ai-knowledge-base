---
title: "Enable Cross-Origin Requests (CORS) in ASP.NET Core (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/security/cors.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Enable Cross-Origin Requests (CORS) in ASP.NET Core

By Rick Anderson and Kirk Larkin

This article shows how **C**ross-**O**rigin **R**esource **S**haring (CORS) is enabled in an ASP.NET Core app.

Browser security prevents a web page from making requests to a different domain than the one that served the web page. This restriction is called the *same-origin policy*. The same-origin policy prevents a malicious site from reading sensitive data from another site. Sometimes, you might want to allow other sites to make cross-origin requests to your app. For more information, see the Mozilla CORS article.

Cross Origin Resource Sharing (CORS):

* Is a W3C standard that allows a server to relax the same-origin policy.
* Is **not** a security feature, CORS relaxes security. An API is not safer by allowing CORS. For more information, see How CORS works.
* Allows a server to explicitly allow some cross-origin requests while rejecting others.
* Is safer and more flexible than earlier techniques, such as JSONP.

View or download sample code (how to download)

## Same origin

Two URLs have the same origin if they have identical schemes, hosts, and ports (RFC 6454).

These two URLs have the same origin:

* `https://example.com/foo.html`
* `https://example.com/bar.html`

These URLs have different origins than the previous two URLs:

* `https://example.net`: Different domain
* `https://contoso.example.com/foo.html`: Different subdomain
* `http://example.com/foo.html`: Different scheme
* `https://example.com:9000/foo.html`: Different port

## Enable CORS

There are three ways to enable CORS:

* In middleware using a named policy or default policy.
* Using endpoint routing.
* With the [EnableCors] attribute.

Using the [EnableCors] attribute with a named policy provides the finest control in limiting endpoints that support CORS.

> **Warning:**
> `Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors*` must be called in the correct order. For more information, see Middleware order. For example, `UseCors` must be called before `Microsoft.AspNetCore.Builder.ResponseCachingExtensions.UseResponseCaching*` when using `UseResponseCaching`.

Each approach is detailed in the following sections.

## CORS with named policy and middleware

CORS middleware handles cross-origin requests. The following code applies a CORS policy to all the app's endpoints with the specified origins:

```csharp
var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy  =>
                      {
                          policy.WithOrigins("http://example.com",
                                              "http://www.contoso.com");
                      });
});

// services.AddResponseCaching();

builder.Services.AddControllers();

var app = builder.Build();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
```

The preceding code:

* Sets the policy name to `_myAllowSpecificOrigins`. The policy name is arbitrary.
* Calls the `Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors*` extension method and specifies the  `_myAllowSpecificOrigins` CORS policy. `UseCors` adds the CORS middleware. The call to `UseCors` must be placed after `UseRouting`, but before `UseAuthorization`. For more information, see Middleware order.
* Calls `Microsoft.Extensions.DependencyInjection.CorsServiceCollectionExtensions.AddCors*` with a lambda expression. The lambda takes a `Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder` object. Configuration options, such as `WithOrigins`, are described later in this article.
* Enables the `_myAllowSpecificOrigins` CORS policy for all controller endpoints. See endpoint routing to apply a CORS policy to specific endpoints.
* When using response caching middleware, call `Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors*` before `Microsoft.AspNetCore.Builder.ResponseCachingExtensions.UseResponseCaching*`.

With endpoint routing, the CORS middleware **must** be configured to execute between the calls to `UseRouting` and  `UseEndpoints`.

The `Microsoft.Extensions.DependencyInjection.MvcCorsMvcCoreBuilderExtensions.AddCors*` method call adds CORS services to the app's service container:

```csharp
var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy  =>
                      {
                          policy.WithOrigins("http://example.com",
                                              "http://www.contoso.com");
                      });
});

// services.AddResponseCaching();

builder.Services.AddControllers();

var app = builder.Build();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
```

For more information, see CORS policy options in this document.

The `Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder` methods can be chained, as shown in the following code:

```csharp
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(MyAllowSpecificOrigins,
                          policy =>
                          {
                              policy.WithOrigins("http://example.com",
                                                  "http://www.contoso.com")
                                                  .AllowAnyHeader()
                                                  .AllowAnyMethod();
                          });
});

builder.Services.AddControllers();

var app = builder.Build();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
```

Note: The specified URL must **not** contain a trailing slash (`/`). If the URL terminates with `/`, the comparison returns `false` and no header is returned.

## UseCors and UseStaticFiles order

Typically, `UseStaticFiles` is called before `UseCors`. Apps that use JavaScript to retrieve static files cross site must call `UseCors` before `UseStaticFiles`.

### CORS with default policy and middleware

The following highlighted code enables the default CORS policy:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("http://example.com",
                                "http://www.contoso.com");
        });
});

builder.Services.AddControllers();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
```

The preceding code applies the default CORS policy to all controller endpoints.

## Enable Cors with endpoint routing

With endpoint routing, CORS can be enabled on a per-endpoint basis using the `Microsoft.AspNetCore.Builder.CorsEndpointConventionBuilderExtensions.RequireCors*` set of extension methods:

```csharp
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://example.com",
                                              "http://www.contoso.com");
                      });
});

builder.Services.AddControllers();
builder.Services.AddRazorPages();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors();

app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapGet("/echo",
        context => context.Response.WriteAsync("echo"))
        .RequireCors(MyAllowSpecificOrigins);

    endpoints.MapControllers()
             .RequireCors(MyAllowSpecificOrigins);

    endpoints.MapGet("/echo2",
        context => context.Response.WriteAsync("echo2"));

    endpoints.MapRazorPages();
});

app.Run();
```

In the preceding code:

* `app.UseCors` enables the CORS middleware. Because a default policy hasn't been configured, `app.UseCors()` alone doesn't enable CORS.
* The `/echo` and controller endpoints allow cross-origin requests using the specified policy.
* The `/echo2` and Razor Pages endpoints do **not** allow cross-origin requests because no default policy was specified.

The [DisableCors] attribute does **not**  disable CORS that has been enabled by endpoint routing with `RequireCors`.

See Test CORS with [EnableCors] attribute and RequireCors method for instructions on testing code similar to the preceding.

## Enable CORS with attributes

Enabling CORS with the [EnableCors] attribute and applying a named policy to only those endpoints that require CORS provides the finest control.

The [EnableCors] attribute provides an alternative to applying CORS globally. The `[EnableCors]` attribute enables CORS for selected endpoints, rather than all endpoints:

* `[EnableCors]` specifies the default policy.
* `[EnableCors("{Policy String}")]` specifies a named policy.

The `[EnableCors]` attribute can be applied to:

* Razor Page `PageModel`
* Controller
* Controller action method

Different policies can be applied to controllers, page models, or action methods with the `[EnableCors]` attribute. When the `[EnableCors]` attribute is applied to a controller, page model, or action method, and CORS is enabled in middleware, **both** policies are applied. **We recommend against combining policies. Use the** `[EnableCors]` **attribute or middleware, not both in the same app.**

The following code applies a different policy to each method:

```csharp
[Route("api/[controller]")]
[ApiController]
public class WidgetController : ControllerBase
{
    // GET api/values
    [EnableCors("AnotherPolicy")]
    [HttpGet]
    public ActionResult<IEnumerable<string>> Get()
    {
        return new string[] { "green widget", "red widget" };
    }

    // GET api/values/5
    [EnableCors("Policy1")]
    [HttpGet("{id}")]
    public ActionResult<string> Get(int id)
    {
        return id switch
        {
            1 => "green widget",
            2 => "red widget",
            _ => NotFound(),
        };
    }
```

The following code creates two CORS policies:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("Policy1",
        policy =>
        {
            policy.WithOrigins("http://example.com",
                                "http://www.contoso.com");
        });

    options.AddPolicy("AnotherPolicy",
        policy =>
        {
            policy.WithOrigins("http://www.contoso.com")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
        });
});

builder.Services.AddControllers();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
```

For the finest control of limiting CORS requests:

* Use `[EnableCors("MyPolicy")]` with a named policy.
* Don't define a default policy.
* Don't use endpoint routing.

The code in the next section meets the preceding list.

### Disable CORS

The [DisableCors] attribute does **not**  disable CORS that has been enabled by endpoint routing.

The following code defines the CORS policy `"MyPolicy"`:

```csharp
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "MyPolicy",
        policy =>
        {
            policy.WithOrigins("http://example.com",
                                "http://www.contoso.com")
                    .WithMethods("PUT", "DELETE", "GET");
        });
});

builder.Services.AddControllers();
builder.Services.AddRazorPages();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors();

app.UseAuthorization();

app.UseEndpoints(endpoints => {
    endpoints.MapControllers();
    endpoints.MapRazorPages();
});

app.Run();
```

The following code disables CORS for the `GetValues2` action:

```csharp
[EnableCors("MyPolicy")]
[Route("api/[controller]")]
[ApiController]
public class ValuesController : ControllerBase
{
    // GET api/values
    [HttpGet]
    public IActionResult Get() =>
        ControllerContext.MyDisplayRouteInfo();

    // GET api/values/5
    [HttpGet("{id}")]
    public IActionResult Get(int id) =>
        ControllerContext.MyDisplayRouteInfo(id);

    // PUT api/values/5
    [HttpPut("{id}")]
    public IActionResult Put(int id) =>
        ControllerContext.MyDisplayRouteInfo(id);

    // GET: api/values/GetValues2
    [DisableCors]
    [HttpGet("{action}")]
    public IActionResult GetValues2() =>
        ControllerContext.MyDisplayRouteInfo();

}
```

The preceding code:

* Doesn't enable CORS with endpoint routing.
* Doesn't define a default CORS policy.
* Uses [EnableCors("MyPolicy")] to enable the `"MyPolicy"` CORS policy for the controller.
* Disables CORS for the `GetValues2` method.

See Test CORS for instructions on testing the preceding code.

## CORS policy options

This section describes the various options that can be set in a CORS policy:

* Set the allowed origins
* Set the allowed HTTP methods
* Set the allowed request headers
* Set the exposed response headers
* Credentials in cross-origin requests
* Set the preflight expiration time

`Microsoft.AspNetCore.Cors.Infrastructure.CorsOptions.AddPolicy*` is called in `Program.cs`. For some options, it may be helpful to read the How CORS works section first.
