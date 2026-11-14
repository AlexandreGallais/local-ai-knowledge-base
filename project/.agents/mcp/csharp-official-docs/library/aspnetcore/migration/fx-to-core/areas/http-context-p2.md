---
title: "Migrate ASP.NET Framework HttpContext to ASP.NET Core (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/migration/fx-to-core/areas/http-context.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Migrate ASP.NET Framework HttpContext to ASP.NET Core (part 2 of 2)

## Complete rewrite to ASP.NET Core HttpContext

Choose this approach when you're performing a complete migration and can rewrite HttpContext-related code to use ASP.NET Core's native implementation.

ASP.NET Core's HttpContext provides a more modular and extensible design compared to ASP.NET Framework. This approach offers the best performance but requires more code changes during migration.

### Overview

`HttpContext` has significantly changed in ASP.NET Core. When migrating HTTP modules or handlers to middleware, you'll need to update your code to work with the new `HttpContext` API.

In ASP.NET Core middleware, the `Invoke` method takes a parameter of type `HttpContext`:

```csharp
public async Task Invoke(HttpContext context)
```

This `HttpContext` is different from the ASP.NET Framework version and requires different approaches to access request and response information.

### Property translations

This section shows how to translate the most commonly used properties of `System.Web.HttpContext` to the equivalent `Microsoft.AspNetCore.Http.HttpContext` in ASP.NET Core.

#### HttpContext properties

* **`System.Web.HttpContext.Items`** → **`Microsoft.AspNetCore.Http.HttpContext.Items`**

  ```csharp
IDictionary<object, object> items = httpContext.Items;
```

* ***No equivalent*** → **`Microsoft.AspNetCore.Http.HttpContext.TraceIdentifier`**

  ```csharp
string requestId = httpContext.TraceIdentifier;
```

  Unique request ID for logging

#### HttpRequest properties

* **`System.Web.HttpRequest.HttpMethod`** → **`Microsoft.AspNetCore.Http.HttpRequest.Method`**

  ```csharp
string httpMethod = httpContext.Request.Method;
```

* **`System.Web.HttpRequest.QueryString`** → **`Microsoft.AspNetCore.Http.HttpRequest.QueryString`**

  ```csharp
IQueryCollection queryParameters = httpContext.Request.Query;

// If no query parameter "key" used, values will have 0 items
// If single value used for a key (...?key=v1), values will have 1 item ("v1")
// If key has multiple values (...?key=v1&key=v2), values will have 2 items ("v1" and "v2")
IList<string> values = queryParameters["key"];

// If no query parameter "key" used, value will be ""
// If single value used for a key (...?key=v1), value will be "v1"
// If key has multiple values (...?key=v1&key=v2), value will be "v1,v2"
string value = queryParameters["key"].ToString();
```

* **`System.Web.HttpRequest.Url`** / **`System.Web.HttpRequest.RawUrl`** → **Multiple properties**

  ```csharp
// using Microsoft.AspNetCore.Http.Extensions;
var url = httpContext.Request.GetDisplayUrl();
```

  Use Request.Scheme, Host, PathBase, Path, QueryString

* **`System.Web.HttpRequest.IsSecureConnection`** → **`Microsoft.AspNetCore.Http.HttpRequest.IsHttps`**

  ```csharp
var isSecureConnection = httpContext.Request.IsHttps;
```

* **`System.Web.HttpRequest.UserHostAddress`** → **`Microsoft.AspNetCore.Http.ConnectionInfo.RemoteIpAddress`**

  ```csharp
var userHostAddress = httpContext.Connection.RemoteIpAddress?.ToString();
```

* **`System.Web.HttpRequest.Cookies`** → **`Microsoft.AspNetCore.Http.HttpRequest.Cookies`**

  ```csharp
IRequestCookieCollection cookies = httpContext.Request.Cookies;
string unknownCookieValue = cookies["unknownCookie"]; // will be null (no exception)
string knownCookieValue = cookies["cookie1name"];     // will be actual value
```

* **`System.Web.HttpRequest.RequestContext`** → **`Microsoft.AspNetCore.Routing.RoutingHttpContextExtensions.GetRouteData*`**

  ```csharp
var routeValue = httpContext.GetRouteValue("key");
```

* **`System.Web.HttpRequest.Headers`** → **`Microsoft.AspNetCore.Http.HttpRequest.Headers`**

  ```csharp
// using Microsoft.AspNetCore.Http.Headers;
// using Microsoft.Net.Http.Headers;

IHeaderDictionary headersDictionary = httpContext.Request.Headers;

// GetTypedHeaders extension method provides strongly typed access to many headers
var requestHeaders = httpContext.Request.GetTypedHeaders();
CacheControlHeaderValue cacheControlHeaderValue = requestHeaders.CacheControl;

// For unknown header, unknownheaderValues has zero items and unknownheaderValue is ""
IList<string> unknownheaderValues = headersDictionary["unknownheader"];
string unknownheaderValue = headersDictionary["unknownheader"].ToString();

// For known header, knownheaderValues has 1 item and knownheaderValue is the value
IList<string> knownheaderValues = headersDictionary[HeaderNames.AcceptLanguage];
string knownheaderValue = headersDictionary[HeaderNames.AcceptLanguage].ToString();
```

* **`System.Web.HttpRequest.UserAgent`** → **`Microsoft.AspNetCore.Http.HttpRequest.Headers`**

  ```csharp
string userAgent = headersDictionary[HeaderNames.UserAgent].ToString();
```

* **`System.Web.HttpRequest.UrlReferrer`** → **`Microsoft.AspNetCore.Http.HttpRequest.Headers`**

  ```csharp
string urlReferrer = headersDictionary[HeaderNames.Referer].ToString();
```

* **`System.Web.HttpRequest.ContentType`** → **`Microsoft.AspNetCore.Http.HttpRequest.ContentType`**

  ```csharp
// using Microsoft.Net.Http.Headers;

MediaTypeHeaderValue mediaHeaderValue = requestHeaders.ContentType;
string contentType = mediaHeaderValue?.MediaType.ToString();   // ex. application/x-www-form-urlencoded
string contentMainType = mediaHeaderValue?.Type.ToString();    // ex. application
string contentSubType = mediaHeaderValue?.SubType.ToString();  // ex. x-www-form-urlencoded

System.Text.Encoding requestEncoding = mediaHeaderValue?.Encoding;
```

* **`System.Web.HttpRequest.Form`** → **`Microsoft.AspNetCore.Http.HttpRequest.Form`**

  ```csharp
if (httpContext.Request.HasFormContentType)
{
    IFormCollection form;

    form = httpContext.Request.Form; // sync
    // Or
    form = await httpContext.Request.ReadFormAsync(); // async

    string firstName = form["firstname"];
    string lastName = form["lastname"];
}
```

  **Warning**: Read form values only if content type is *x-www-form-urlencoded* or *form-data*

* **`System.Web.HttpRequest.InputStream`** → **`Microsoft.AspNetCore.Http.HttpRequest.Body`**

  ```csharp
string inputBody;
using (var reader = new System.IO.StreamReader(
    httpContext.Request.Body, System.Text.Encoding.UTF8))
{
    inputBody = reader.ReadToEnd();
}
```

  **Warning**: Use only in handler middleware at end of pipeline. Body can only be read once per request

#### HttpResponse properties

* **`System.Web.HttpResponse.Status`** / **`System.Web.HttpResponse.StatusDescription`** → **`Microsoft.AspNetCore.Http.HttpResponse.StatusCode`**

  ```csharp
// using Microsoft.AspNetCore.Http;
httpContext.Response.StatusCode = StatusCodes.Status200OK;
```

* **`System.Web.HttpResponse.ContentEncoding`** / **`System.Web.HttpResponse.ContentType`** → **`Microsoft.AspNetCore.Http.HttpResponse.ContentType`**

  ```csharp
// using Microsoft.Net.Http.Headers;
var mediaType = new MediaTypeHeaderValue("application/json");
mediaType.Encoding = System.Text.Encoding.UTF8;
httpContext.Response.ContentType = mediaType.ToString();
```

* **`System.Web.HttpResponse.ContentType`** → **`Microsoft.AspNetCore.Http.HttpResponse.ContentType`**

  ```csharp
httpContext.Response.ContentType = "text/html";
```

* **`System.Web.HttpResponse.Output`** → **`Microsoft.AspNetCore.Http.HttpResponseWritingExtensions.WriteAsync*`**

  ```csharp
string responseContent = GetResponseContent();
await httpContext.Response.WriteAsync(responseContent);
```

* **`System.Web.HttpResponse.TransmitFile*`** → **See request features**

  Serving files is discussed in Request Features in ASP.NET Core

* **`System.Web.HttpResponse.Headers`** → **`Microsoft.AspNetCore.Http.HttpResponse.OnStarting*`**

  ```csharp
// using Microsoft.AspNet.Http.Headers;
// using Microsoft.Net.Http.Headers;

private Task SetHeaders(object context)
{
    var httpContext = (HttpContext)context;

    // Set header with single value
    httpContext.Response.Headers["ResponseHeaderName"] = "headerValue";

    // Set header with multiple values
    string[] responseHeaderValues = new string[] { "headerValue1", "headerValue1" };
    httpContext.Response.Headers["ResponseHeaderName"] = responseHeaderValues;

    // Translating ASP.NET 4's HttpContext.Response.RedirectLocation  
    httpContext.Response.Headers[HeaderNames.Location] = "http://www.example.com";
    // Or
    httpContext.Response.Redirect("http://www.example.com");

    // GetTypedHeaders extension method provides strongly typed access to many headers
    var responseHeaders = httpContext.Response.GetTypedHeaders();

    // Translating ASP.NET 4's HttpContext.Response.CacheControl 
    responseHeaders.CacheControl = new CacheControlHeaderValue
    {
        MaxAge = new System.TimeSpan(365, 0, 0, 0)
        // Many more properties available 
    };

    // If you use .NET Framework 4.6+, Task.CompletedTask will be a bit faster
    return Task.FromResult(0);
}
```

  Must use callback pattern to set headers before response starts

* **`System.Web.HttpResponse.Cookies`** → **`Microsoft.AspNetCore.Http.HttpResponse.OnStarting*`**

  ```csharp
private Task SetCookies(object context)
{
    var httpContext = (HttpContext)context;

    IResponseCookies responseCookies = httpContext.Response.Cookies;

    responseCookies.Append("cookie1name", "cookie1value");
    responseCookies.Append("cookie2name", "cookie2value",
        new CookieOptions { Expires = System.DateTime.Now.AddDays(5), HttpOnly = true });

    // If you use .NET Framework 4.6+, Task.CompletedTask will be a bit faster
    return Task.FromResult(0); 
}
```

  Must use callback pattern to set cookies before response starts

* Setting response headers:

    ```csharp
    public async Task Invoke(HttpContext httpContext)
    {
        // Set callback to execute before response starts
        httpContext.Response.OnStarting(SetHeaders, state: httpContext);
        // ... rest of middleware logic
    }
    ```

* Setting response cookies:

```csharp
public async Task Invoke(HttpContext httpContext)
{
    // Set callbacks to execute before response starts
    httpContext.Response.OnStarting(SetCookies, state: httpContext);
    httpContext.Response.OnStarting(SetHeaders, state: httpContext);
    // ... rest of middleware logic
}
```

## System.Web adapters

> **Note:**
> This makes use of the System.Web Adapters to simplify migration.

Choose this approach when you have extensive HttpContext usage across shared libraries or when performing an incremental migration where you want to minimize code changes.

The System.Web adapters provide a compatibility layer that allows you to use familiar `System.Web.HttpContext` APIs in ASP.NET Core applications. This approach is particularly useful when:

* You have shared libraries that use `System.Web.HttpContext`
* You're performing an incremental migration
* You want to minimize code changes during the migration process

### Benefits of using System.Web adapters

* **Minimal code changes**: Keep your existing `System.Web.HttpContext` usage patterns
* **Shared libraries**: Libraries can work with both ASP.NET Framework and ASP.NET Core
* **Incremental migration**: Migrate applications piece by piece without breaking shared dependencies
* **Faster migration**: Reduce the time needed to migrate complex applications

### Considerations

* **Performance**: While good, adapters introduce some overhead compared to native ASP.NET Core APIs
* **Feature parity**: Not all `System.Web.HttpContext` features are available through adapters
* **Long-term strategy**: Consider eventually migrating to native ASP.NET Core APIs for best performance

For more information about System.Web adapters, see the System.Web adapters documentation.

## Related content

* HTTP Handlers and HTTP Modules Overview
* HttpContext in ASP.NET Core
* Middleware
* Configuration
* System.Web adapters
