---
title: "Prevent Cross-Site Request Forgery (XSRF/CSRF) attacks in ASP.NET Core (part 4 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/security/anti-request-forgery.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Prevent Cross-Site Request Forgery (XSRF/CSRF) attacks in ASP.NET Core (part 4 of 5)

## Configure antiforgery with `AntiforgeryOptions`

Customize `Microsoft.AspNetCore.Antiforgery.AntiforgeryOptions` in the app's `Program` file:

```csharp
builder.Services.AddAntiforgery(options =>
{
    // Set Cookie properties using CookieBuilder properties†.
    options.FormFieldName = "AntiforgeryFieldname";
    options.HeaderName = "<example-value>";
    options.SuppressXFrameOptionsHeader = false;
});
```
Set the antiforgery cookie properties using the properties of the `Microsoft.AspNetCore.Http.CookieBuilder` class, as shown in the following table.

| Option | Description |
| --- | --- |
| `Microsoft.AspNetCore.Antiforgery.AntiforgeryOptions.Cookie` | Determines the settings used to create the antiforgery cookies. |
| `Microsoft.AspNetCore.Antiforgery.AntiforgeryOptions.FormFieldName` | The name of the hidden form field used by the antiforgery system to render antiforgery tokens in views. |
| `Microsoft.AspNetCore.Antiforgery.AntiforgeryOptions.HeaderName` | The name of the header used by the antiforgery system. If `null`, the system considers only form data. |
| `Microsoft.AspNetCore.Antiforgery.AntiforgeryOptions.SuppressXFrameOptionsHeader` | Specifies whether to suppress generation of the `X-Frame-Options` header. By default, the header is generated with a value of "SAMEORIGIN". Defaults to `false`. |

Some browsers don'<example-value>'secure'<example-value>'secure'<example-value>'secure'<example-value>'s `Microsoft.AspNetCore.Http.CookieBuilder.SecurePolicy` to `CookieSecurePolicy.None`. Even if a malicious user steals an antiforgery cookie, they also must steal the antiforgery token that's typically sent via a form field (more common) or a separate request header (less common) plus the authentication cookie. Cookies related to authentication or authorization use a stronger policy than `CookieSecurePolicy.None`.

Optionally, you can secure the antiforgery cookie in non-`Development` environments using Secure Sockets Layer (SSL), over HTTPS only, with the following `Microsoft.AspNetCore.Antiforgery.AntiforgeryOptions.Cookie` property setting in the app's `Program` file:

```csharp
if (!builder.Environment.IsDevelopment())
{
    builder.Services.AddAntiforgery(o =>
    {
        o.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    });
}
```

For more information, see `Microsoft.AspNetCore.Builder.CookieAuthenticationOptions`.

## Generate antiforgery tokens with `IAntiforgery`

`Microsoft.AspNetCore.Antiforgery.IAntiforgery` provides the API to configure antiforgery features. `IAntiforgery` can be requested in `Program.cs` using `Microsoft.AspNetCore.Builder.WebApplication.Services`. The following example uses middleware from the app's home page to generate an antiforgery token and send it in the response as a cookie:

```csharp
app.UseRouting();

app.UseAuthorization();

var antiforgery = app.Services.GetRequiredService<IAntiforgery>();

app.Use((context, next) =>
{
    var requestPath = context.Request.Path.Value;

    if (string.Equals(requestPath, "/", StringComparison.OrdinalIgnoreCase)
        || string.Equals(requestPath, "/index.html", StringComparison.OrdinalIgnoreCase))
    {
        var tokenSet = antiforgery.GetAndStoreTokens(context);
        context.Response.Cookies.Append("<example-value>", tokenSet.RequestToken!,
            new CookieOptions { HttpOnly = false });
    }

    return next(context);
});
```
The preceding example sets a cookie named `XSRF-TOKEN`. The client can read this cookie and provide its value as a header attached to AJAX requests. For example, Angular includes built-in XSRF protection that reads a cookie named `XSRF-TOKEN` by default.

### Require antiforgery validation

The ValidateAntiForgeryToken <example-value> filter can be applied to an individual action, a controller, or globally. Requests made to actions that have this filter applied are blocked unless the request includes a valid antiforgery token:

```csharp
[HttpPost]
[ValidateAntiForgeryToken]
public IActionResult Index()
{
    // ...

    return RedirectToAction();
}
```
The `ValidateAntiForgeryToken` attribute requires a token for requests to the action methods it marks, including HTTP GET requests. If the `ValidateAntiForgeryToken` attribute is applied across the app's controllers, it can be overridden with the `IgnoreAntiforgeryToken` attribute.

### Automatically validate antiforgery tokens for unsafe HTTP methods only

Instead of broadly applying the `ValidateAntiForgeryToken` attribute and then overriding it with `IgnoreAntiforgeryToken` attributes, the AutoValidateAntiforgeryToken <example-value> can be used. This attribute works identically to the `ValidateAntiForgeryToken` attribute, except that it doesn't require tokens for requests made using the following HTTP methods:

* GET
* HEAD
* OPTIONS
* TRACE

We recommend use of `AutoValidateAntiforgeryToken` broadly for non-API scenarios. This attribute ensures POST actions are protected by default. The alternative is to ignore antiforgery tokens by default, unless `ValidateAntiForgeryToken` is applied to individual action methods. It's more likely in this scenario for a POST action method to be left unprotected by mistake, leaving the app vulnerable to CSRF attacks. All POSTs should send the antiforgery token.

APIs don't have an automatic mechanism for sending the non-cookie part of the token. The implementation probably depends on the client code implementation. Some examples are shown below:

Class-level example:

```csharp
[AutoValidateAntiforgeryToken]
public class HomeController : Controller
```
Global example:

```csharp
builder.Services.AddControllersWithViews(options =>
{
    options.Filters.Add(new AutoValidateAntiforgeryTokenAttribute());
});
```
### Override global or controller antiforgery attributes

The IgnoreAntiforgeryToken <example-value> is used to eliminate the need for an antiforgery token for a given action (or controller). When applied, this filter overrides `ValidateAntiForgeryToken` and `AutoValidateAntiforgeryToken` filters specified at a higher level (globally or on a controller).

```csharp
[IgnoreAntiforgeryToken]
public IActionResult IndexOverride()
{
    // ...

    return RedirectToAction();
}
```
## Refresh tokens after authentication

Tokens should be refreshed after the user is authenticated by redirecting the user to a view or Razor Pages page.

## JavaScript, AJAX, and SPAs

In traditional HTML-based apps, antiforgery tokens are passed to the server using hidden form fields. In modern JavaScript-based apps and SPAs, many requests are made programmatically. These AJAX requests may use other techniques, such as request headers or cookies, to send the token.

If cookies are used to store authentication tokens and to authenticate API requests on the server, CSRF is a potential problem. If local storage is used to store the token, CSRF vulnerability might be mitigated because values from local storage aren't sent automatically to the server with every request. Using local storage to store the antiforgery token on the client and sending the token as a request header is a recommended approach.

### Blazor

For more information, see ASP.NET Core Blazor authentication and authorization.

### JavaScript

Using JavaScript with views, the token can be created using a service from within the view. Inject the `Microsoft.AspNetCore.Antiforgery.IAntiforgery` service into the view and call `Microsoft.AspNetCore.Antiforgery.IAntiforgery.GetAndStoreTokens*`:

```cshtml
@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Antiforgery

@{
    ViewData["Title"] = "JavaScript";

    var requestToken = Antiforgery.GetAndStoreTokens(Context).RequestToken;
}

<input id="<example-value>" type="<example-value>" value="<example-value>" />

<button id="<example-value>" class="<example-value>">Submit with Token</button>
<div id="result" class="mt-2"></div>

@section Scripts {
<script>
    document.addEventListener("DOMContentLoaded", () => {
        const resultElement = document.getElementById("result");

        document.getElementById("button").addEventListener("click", async () => {

            const response = await fetch("@Url.Action("FetchEndpoint")", {
                method: "POST",
                headers: {
                    RequestVerificationToken:
                        document.getElementById("<example-value>").value
                }
            });

            if (response.ok) {
                resultElement.innerText = await response.text();
            } else {
                resultElement.innerText = `Request Failed: ${response.status}`
            }
        });
    });
</script>
}
```
The preceding example uses JavaScript to read the hidden field value for the AJAX POST header.

This approach eliminates the need to deal directly with setting cookies from the server or reading them from the client. However, when injecting the `Microsoft.AspNetCore.Antiforgery.IAntiforgery` service isn't possible, use JavaScript to access tokens in cookies:

* Access tokens in an additional request to the server, typically usually `same-origin`.
* Use the cookie'<example-value>'s value.

Assuming the script sends the token in a request header called `X-XSRF-TOKEN`, configure the antiforgery service to look for the `X-XSRF-TOKEN` header:

```csharp
builder.Services.AddAntiforgery(options => options.HeaderName = "<example-value>");
```
The following example adds a protected endpoint that writes the request token to a JavaScript-readable cookie:

```csharp
app.UseAuthorization();
app.MapGet("<example-value>", (IAntiforgery forgeryService, HttpContext context) =>
{
    var tokens = forgeryService.GetAndStoreTokens(context);
    context.Response.Cookies.Append("<example-value>", tokens.RequestToken!,
            new CookieOptions { HttpOnly = false });

    return Results.Ok();
}).RequireAuthorization();
```
The following example uses JavaScript to make an AJAX request to obtain the token and make another request with the appropriate header:

```javascript
var response = await fetch("<example-value>", {
    method: "GET",
    headers: { "Authorization": authorizationToken }
});

if (response.ok) {
    // https://developer.mozilla.org/docs/web/api/document/cookie
    const xsrfToken = document.cookie
        .split("; ")
        .find(row => row.startsWith("<example-value>"))
        .split("=")[1];

    response = await fetch("/JavaScript/FetchEndpoint", {
        method: "POST",
        headers: { "X-XSRF-TOKEN": <example-value>, "Authorization": authorizationToken }
    });

    if (response.ok) {
        resultElement.innerText = await response.text();
    } else {
        resultElement.innerText = `Request Failed: ${response.status}`
    }
} else {    
    resultElement.innerText = `Request Failed: ${response.status}`
}
```

> **Note:**
> When the antiforgery token is provided in both the request header and in the form payload, only the token in the header is validated.
