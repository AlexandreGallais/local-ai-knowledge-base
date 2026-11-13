---
title: "URL rewriting middleware in ASP.NET Core (part 2 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/url-rewriting.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# URL rewriting middleware in ASP.NET Core (part 2 of 4)

## Extension and options

Establish URL rewrite and redirect rules by creating an instance of the RewriteOptions class with extension methods for each of the rewrite rules. Chain multiple rules ***in the order that they should be processed***. The `RewriteOptions` are passed into the URL rewriting middleware as it's added to the request pipeline with `Microsoft.AspNetCore.Builder.RewriteBuilderExtensions.UseRewriter*`:

```csharp
using Microsoft.AspNetCore.Rewrite;
using RewriteRules;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

using (StreamReader apacheModRewriteStreamReader =
    File.OpenText("ApacheModRewrite.txt"))
using (StreamReader iisUrlRewriteStreamReader =
    File.OpenText("IISUrlRewrite.xml"))
{
    var options = new RewriteOptions()
        .AddRedirect("redirect-rule/(.*)", "redirected/$1")
        .AddRewrite(@"^rewrite-rule/(\d+)/(\d+)", "rewritten?var1=$1&var2=$2",
            skipRemainingRules: true)
        .AddApacheModRewrite(apacheModRewriteStreamReader)
        .AddIISUrlRewrite(iisUrlRewriteStreamReader)
        .Add(MethodRules.RedirectXmlFileRequests)
        .Add(MethodRules.RewriteTextFileRequests)
        .Add(new RedirectImageRequests(".png", "/png-images"))
        .Add(new RedirectImageRequests(".jpg", "/jpg-images"));

    app.UseRewriter(options);
}

app.UseStaticFiles();

app.Run(context => context.Response.WriteAsync(
    $"Rewritten or Redirected Url: " +
    $"{context.Request.Path + context.Request.QueryString}"));

app.Run();
```

In the preceding code, `MethodRules` is a user defined class. See `RewriteRules.cs` in this article for more information.

### Authorization and URL rewriting

When a rule changes the request path, routing evaluates the new path and can select a different endpoint than the one that matched the original path. Authorization must run for the endpoint that's finally selected. Otherwise, the authorization requirements of that endpoint aren't applied.

An app that calls `UseRewriter` and protects any endpoint with authorization must add the authentication and authorization middleware explicitly, and must add it after `UseRewriter`:

```csharp
app.UseRewriter(options);
app.UseAuthentication();
app.UseAuthorization();
```

When the app calls `UseRouting` explicitly, use the following order:

```csharp
app.UseRewriter(options);
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
```

Both of the following configurations evaluate authorization against the endpoint selected for the original path rather than the rewritten path:

* Relying on the authentication and authorization middleware that's added automatically when the corresponding services are registered, without calling `UseAuthentication` and `UseAuthorization`.
* Calling `UseAuthentication` and `UseAuthorization` before `UseRewriter`.

> **Important:**
> Explicitly add and order the authentication and authorization middleware after `UseRewriter` as shown earlier. Keep the app updated to the latest supported patch release to ensure the framework's built-in authorization behavior includes the newest fixes.

### Redirect non-www to www

Three options permit the app to redirect non-`www` requests to `www`:

* `Microsoft.AspNetCore.Rewrite.RewriteOptionsExtensions.AddRedirectToWwwPermanent*`: Permanently redirect the request to the `www` subdomain if the request is non-`www`. Redirects with a Status308PermanentRedirect status code.

* `Microsoft.AspNetCore.Rewrite.RewriteOptionsExtensions.AddRedirectToWww*`: Redirect the request to the `www` subdomain if the incoming request is non-`www`. Redirects with a Status307TemporaryRedirect status code. An overload permits  providing the status code for the response. Use a field of the `Microsoft.AspNetCore.Http.StatusCodes` class for a status code assignment.

### URL redirect

Use `Microsoft.AspNetCore.Rewrite.RewriteOptionsExtensions.AddRedirect*` to redirect requests. The first parameter contains the .NET regular expression (Regex) for matching on the path of the incoming URL. The second parameter is the replacement string. The third parameter, if present, specifies the status code. If the status code isn't specified, the status code defaults to 302 - Found, which indicates that the resource is temporarily moved or replaced.

```csharp
using Microsoft.AspNetCore.Rewrite;
using RewriteRules;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

using (StreamReader apacheModRewriteStreamReader =
    File.OpenText("ApacheModRewrite.txt"))
using (StreamReader iisUrlRewriteStreamReader =
    File.OpenText("IISUrlRewrite.xml"))
{
    var options = new RewriteOptions()
        .AddRedirect("redirect-rule/(.*)", "redirected/$1")
        .AddRewrite(@"^rewrite-rule/(\d+)/(\d+)", "rewritten?var1=$1&var2=$2",
            skipRemainingRules: true)
        .AddApacheModRewrite(apacheModRewriteStreamReader)
        .AddIISUrlRewrite(iisUrlRewriteStreamReader)
        .Add(MethodRules.RedirectXmlFileRequests)
        .Add(MethodRules.RewriteTextFileRequests)
        .Add(new RedirectImageRequests(".png", "/png-images"))
        .Add(new RedirectImageRequests(".jpg", "/jpg-images"));

    app.UseRewriter(options);
}

app.UseStaticFiles();

app.Run(context => context.Response.WriteAsync(
    $"Rewritten or Redirected Url: " +
    $"{context.Request.Path + context.Request.QueryString}"));

app.Run();
```

In a browser with developer tools enabled, make a request to the sample app with the path `/redirect-rule/1234/5678`. The regular expression matches the request path on `redirect-rule/(.*)`, and the path is replaced with `/redirected/1234/5678`. The redirect URL is sent back to the client with a *302 - Found* status code. The browser makes a new request at the redirect URL, which appears in the browser's address bar. Since no rules in the sample app match on the redirect URL:

* The second request receives a *200 - OK* response from the app.
* The body of the response shows the redirect URL.

A round trip is made to the server when a URL is *redirected*.

> **Warning:**
> Be cautious when establishing redirect rules. Redirect rules are evaluated on every request to the app, including after a redirect. It's easy to accidentally create a loop of ***infinite*** redirects.

The part of the expression contained within parentheses is called a capture group. The dot (`.`) of the expression means *match any character*. The asterisk (`*`) indicates *match the preceding character zero or more times*. Therefore, the last two path segments of the URL, `1234/5678`, are captured by capture group `(.*)`. Any value provided in the request URL after `redirect-rule/` is captured by this single capture group.

In the replacement string, captured groups are injected into the string with the dollar sign (`$`) followed by the sequence number of the capture. The first capture group value is obtained with `$1`, the second with `$2`, and they continue in sequence for the capture groups in the regular expression. There's only one captured group in the redirect rule regular expression in `redirect-rule/(.*)`, so there's only one injected group in the replacement string, which is `$1`. When the rule is applied, the URL becomes `/redirected/1234/5678`.

Try `/redirect-rule/1234/5678` with the browser tools on the network tab.

#### Redirect rule safety

The middleware expands capture groups and variables in a replacement string and then interprets the result as the redirect destination. A broad capture such as `(.*)` isn't inherently unsafe when a trusted local prefix constrains the destination. A rule is unsafe when request-derived text can control the complete destination, construct the `scheme://` prefix, or determine the authority (host) of an absolute URI.

```csharp
// Unsafe: $1 can supply a complete redirect destination.
options.AddRedirect("legacy/(.*)", "$1");

// Safe: The trusted prefix keeps the destination within the app.
options.AddRedirect("legacy/(.*)", "/archive/$1");

// Safe: The scheme and authority are fixed.
options.AddRedirect("legacy/(.*)", "https://example.com/$1");

// Unsafe unless $1 is validated against an allow list of hosts.
options.AddRedirect("go/(.*)", "https://$1/path");
```

Use a fixed local prefix when redirecting within the app. For external redirects, use a fixed host or validate the host against an allow list. Imported IIS URL Rewrite and Apache `mod_rewrite` rules also expand back-references and variables. Importing a rule doesn't validate its resulting substitution, so review imported rules by the same criteria.

Depending on the API, imported-rule options, and replacement, the original query string might be preserved or appended to the destination. Include query parameters when reviewing whether request-derived data can affect a redirect. For more information about validating redirect destinations, see Prevent open redirect attacks in ASP.NET Core.

### URL redirect to a secure endpoint

Use `Microsoft.AspNetCore.Rewrite.RewriteOptionsExtensions.AddRedirectToHttps*` to redirect HTTP requests to the same host and path using the HTTPS protocol. If the status code isn't supplied, the middleware defaults to *302 - Found*. If the port isn't supplied:

* The middleware defaults to `null`.
* The scheme changes to `https` (HTTPS protocol), and the client accesses the resource on port 443.

The following example shows how to set the status code to `301 - Moved Permanently` and change the port to the HTTPS port used by Kestrel on localhost. In production, the HTTPS port is set to null:

```csharp
using Microsoft.AspNetCore.Rewrite;
using RewriteRules;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

int? localhostHTTPSport = null;
if (app.Environment.IsDevelopment())
{
    localhostHTTPSport = Int32.Parse(Environment.GetEnvironmentVariable(
                   "ASPNETCORE_URLS")!.Split(new Char[] { ':', ';' })[2]);
}

using (StreamReader apacheModRewriteStreamReader =
    File.OpenText("ApacheModRewrite.txt"))
using (StreamReader iisUrlRewriteStreamReader =
    File.OpenText("IISUrlRewrite.xml"))
{
    var options = new RewriteOptions()
        // localhostHTTPport not needed for production, used only with localhost.
        .AddRedirectToHttps(301, localhostHTTPSport)
        .AddRedirect("redirect-rule/(.*)", "redirected/$1")
        .AddRewrite(@"^rewrite-rule/(\d+)/(\d+)", "rewritten?var1=$1&var2=$2",
            skipRemainingRules: true)
        .AddApacheModRewrite(apacheModRewriteStreamReader)
        .AddIISUrlRewrite(iisUrlRewriteStreamReader)
        .Add(MethodRules.RedirectXmlFileRequests)
        .Add(MethodRules.RewriteTextFileRequests)
        .Add(new RedirectImageRequests(".png", "/png-images"))
        .Add(new RedirectImageRequests(".jpg", "/jpg-images"));

    app.UseRewriter(options);
}

app.UseStaticFiles();

app.Run(context => context.Response.WriteAsync(
    $"Rewritten or Redirected Url: " +
    $"{context.Request.Path + context.Request.QueryString}"));

app.Run();
```

Use `Microsoft.AspNetCore.Rewrite.RewriteOptionsExtensions.AddRedirectToHttpsPermanent*` to redirect insecure requests to the same host and path with secure HTTPS protocol on port 443. The middleware sets the status code to `301 - Moved Permanently`.

```csharp
using Microsoft.AspNetCore.Rewrite;
using RewriteRules;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

using (StreamReader apacheModRewriteStreamReader =
    File.OpenText("ApacheModRewrite.txt"))
using (StreamReader iisUrlRewriteStreamReader =
    File.OpenText("IISUrlRewrite.xml"))
{
    var options = new RewriteOptions()
        .AddRedirectToHttpsPermanent()
        .AddRedirect("redirect-rule/(.*)", "redirected/$1")
        .AddRewrite(@"^rewrite-rule/(\d+)/(\d+)", "rewritten?var1=$1&var2=$2",
            skipRemainingRules: true)
        .AddApacheModRewrite(apacheModRewriteStreamReader)
        .AddIISUrlRewrite(iisUrlRewriteStreamReader)
        .Add(MethodRules.RedirectXmlFileRequests)
        .Add(MethodRules.RewriteTextFileRequests)
        .Add(new RedirectImageRequests(".png", "/png-images"))
        .Add(new RedirectImageRequests(".jpg", "/jpg-images"));

    app.UseRewriter(options);
}

app.UseStaticFiles();

app.Run(context => context.Response.WriteAsync(
    $"Rewritten or Redirected Url: " +
    $"{context.Request.Path + context.Request.QueryString}"));

app.Run();
```

> **Note:**
> When redirecting to a secure endpoint without the requirement for additional redirect rules, we recommend using HTTPS redirection middleware. For more information, see Enforce HTTPS.

The sample app demonstrates how to use `AddRedirectToHttps` or `AddRedirectToHttpsPermanent`. Make an insecure HTTP request to the app at `http://redirect6.azurewebsites.net/iis-rules-rewrite/xyz`. When testing HTTP to HTTPS redirection with localhost:

* Use the HTTP URL, which has a different port than the HTTPS URL. The HTTP URL is in the `Properties/launchSettings.json` file.
* Removing the `s` from `https://localhost/{port}` fails because localhost doesn't respond on HTTP to the HTTPS port.

The following image shows the F12 browser tools image of a request to `http://redirect6.azurewebsites.net/iis-rules-rewrite/xyz`  using the preceding code:
