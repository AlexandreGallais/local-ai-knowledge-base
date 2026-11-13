---
title: "Enforce a Content Security Policy for ASP.NET Core Blazor (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/content-security-policy.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Enforce a Content Security Policy for ASP.NET Core Blazor

-->
-->

This article explains how to use a Content Security Policy (CSP) with ASP.NET Core Blazor apps to help protect against certain types of malicious attacks, such as Cross-Site Scripting (XSS) and clickjacking attacks. XSS is a security vulnerability where a cyberattacker places one or more malicious client-side scripts into an app's rendered content. In a clickjacking attack, a user is tricked into interactions with a decoy website that has your app embedded within it.

A CSP helps protect against these types of attacks by informing the browser of valid:

* Sources for loaded content, including scripts, stylesheets, images, and plugins.
* Actions taken by a page, specifying permitted URL targets of forms.
* When your app can be embedded into another website via `<frame>`, ``, `<object>`, or `` tags.

We recommend reading the following MDN resources when implementing a CSP:

* Content Security Policy (CSP)
* CSP reference guidance
* Content Security Policy (CSP) implementation

To apply a CSP to an app, the developer specifies several CSP content security *directives* in one or more `Content-Security-Policy` headers or `<meta>` tags. For guidance on applying a CSP to an app in C# code at startup, see ASP.NET Core Blazor startup and the *The `frame-ancestors` directive* section later in this article.

Policies are evaluated by the browser while a page is loading. The browser inspects the page's sources and determines if they meet the requirements of the content security directives. When policy directives aren't met for a resource, the browser doesn't load the resource. For example, consider a policy that doesn't allow third-party scripts. When a page contains a `<script>` tag with a third-party origin in the `src` attribute, the browser prevents the script from loading.

CSP is supported in most modern desktop and mobile browsers, including Chrome, Edge, Firefox, Opera, and Safari. CSP is recommended for Blazor apps.

> **Warning:**
> Implementing a CSP minimizes the risk of certain types of security threats and doesn't guarantee that an app is completely safe from XSS and clickjacking attacks. User agents, typically browsers, may allow users to modify or bypass <example-value> enforcement through user preferences, bookmarklets, browser extensions, third-party additions to the user agent, and other such mechanisms. Also, CSPs are only focused on remediating a subset of attacks, not all attacks that can compromise security, such as SQL injection, Cross-Site Request Forgery (CSRF), security misconfiguration, and denial-of-service (DoS) attacks.

## Policy directives

The following directives and sources are commonly used for Blazor apps. Add additional directives and sources as needed. The following directives are used in the *Apply the policy* section of this article, where example security policies for Blazor apps are provided:

* `base-uri`: Restricts the URLs for a page's `<base>` tag. Specify `self` to indicate that the app's origin, including the scheme and port number, is a valid source.
* `default-src`: Indicates a fallback for source directives that aren't explicitly specified by the policy. Specify `self` to indicate that the app's origin, including the scheme and port number, is a valid source.
* `img-src`: Indicates valid sources for images.
  * Specify `data:` to permit loading images from `data:` URLs.
  * Specify `https:` to permit loading images from HTTPS endpoints.
* `object-src`: Indicates valid sources for the `<object>`, ``, and `<applet>` tags. Specify `none` to prevent all URL sources.
* `script-src`: Indicates valid sources for scripts.
  * Specify `self` to indicate that the app's origin, including the scheme and port number, is a valid source.
  * In a client-side Blazor app:
    * Specify `wasm-unsafe-eval` to permit the client-side Blazor Mono runtime to function.
    * Specify any additional hashes with the `unsafe-hashes` source expression to permit your required *non-framework inline scripts* to load.
  * In a server-side Blazor app, specify hashes to permit required scripts to load.
* `style-src`: Indicates valid sources for stylesheets.
  * Specify `self` to indicate that the app's origin, including the scheme and port number, is a valid source.
  * If the app uses inline styles, specify `unsafe-inline` to allow the use of your inline styles.
* `connect-src`: Restricts the URLs that can be loaded using script interfaces. The scheme sources `http:`, `ws:` (WebSocket protocol), and `wss:` (WebSocket Secure protocol) are specified.
* upgrade-insecure-requests: Indicates that content URLs from insecure (HTTP) sources should be acquired securely over HTTPS.

The preceding directives are supported by all browsers except Microsoft Internet Explorer.

To obtain SHA hashes for additional inline scripts:

* Apply the CSP shown in the *Apply the policy* section.
* Access the browser's developer tools console while running the app locally. The browser calculates and displays hashes for blocked scripts when a CSP header or `meta` tag is present.
* Copy the hashes provided by the browser to the `script-src` sources. Use single quotes around each hash.

For a Content Security Policy Level 2 browser support matrix, see Can I use: Content Security Policy Level 2.

## Apply the policy

You can apply a CSP via:

* A response header issued by the host (for example, IIS) or issued by the app (see Control headers in C# code at startup).
* A `<meta>` tag. *This article only demonstrates the `<meta>` tag approach.*

To use a `<meta>` tag to apply the policy:

* Set the value of the `http-equiv` attribute to `Content-Security-Policy`.
* Place the directives in the `content` attribute value. Separate directives with a semicolon (`;`). An ending semicolon for the last directive of the policy string isn't required per the Content Security Policy Level 3 specification.
* Place the `<meta>` tag in the `<head>` content just inside the opening `<head>` tag. The policy is evaluated and enforced when the CSP markup is parsed, so the policy should appear at the top of `<head>` markup to ensure that it's enforced on all `<script>` and `<link>` tags.

The following sections show example policies. These examples are versioned with this article for each release of Blazor. To use a version appropriate for your release, select the document version with the **Version** dropdown selector on this webpage.

## The `frame-ancestors` directive

The `frame-ancestors` directive specifies valid parents that may embed a page with `<frame>`, ``, `<object>`, or `` tags. A `frame-ancestors` directive can't be applied via a `<meta>` tag-based CSP. The directive must be applied by a response header. A CSP response header can be added by a server host, or app C# code can add or update a CSP with a `frame-ancestors` directive.

Blazor Web Apps (.NET 8 or later) automatically include a response header setting the value to `'self'`:

```
Content-Security-Policy: frame-ancestors 'self'
```

To change the default value to the more restrictive `'none'` and prevent all parents from embedding the app, set the `Microsoft.AspNetCore.Components.Server.ServerComponentsEndpointOptions.ContentSecurityFrameAncestorsPolicy` option in the call to `Microsoft.AspNetCore.Builder.ServerRazorComponentsEndpointConventionBuilderExtensions.AddInteractiveServerRenderMode*` in the `Program` file. The following only takes effect when WebSocket compression is enabled (`Microsoft.AspNetCore.Components.Server.ServerComponentsEndpointOptions.ConfigureWebSocketAcceptContext` is set, which is the default for Blazor apps).

```csharp
.AddInteractiveServerRenderMode(o => o.ContentSecurityFrameAncestorsPolicy = "'none'")
```

In Blazor Server apps, a default `frame-ancestors` directive isn't added to the response headers collection. You can add a CSP header manually with middleware in the request processing pipeline:

```csharp
app.Use(async (context, next) =>
{
    context.Response.Headers.Add("Content-Security-Policy", "frame-ancestors 'none'");
    await next();
});
```

> **Warning:**
> Avoid setting the `frame-ancestors` directive value to `'null'` when WebSocket compression is enabled (compression is the default) because it makes the app vulnerable to malicious script injection and clickjacking attacks.

For more information, see CSP: frame-ancestors (MDN documentation).

### Server-side Blazor apps

The following example is a starting point for further development. At the top of `<head>` content, apply the directives described in the *Policy directives* section, along with any other directives that your app specification requires.

For Blazor Web Apps or Blazor Server apps:

```html
<meta http-equiv="Content-Security-Policy" content="
    base-uri 'self';
    default-src 'self';
    img-src data: https:;
    object-src 'none';
    script-src 'self' 'wasm-unsafe-eval';
    style-src https:;
    connect-src 'self' http: ws: wss:;
    upgrade-insecure-requests;" />
```

Blazor Web Apps have an `ImportMap` component in `<head>` content that renders an inline import map `<script>` tag. To modify the policy to permit the import map to load, see the Resolving CSP violations with Subresource Integrity (SRI) or a cryptographic nonce section.

Add additional `script-src` and `style-src` hashes as required by the app. During development, use an online tool or browser developer tools to have the hashes calculated for you. For example, the following browser tools console error reports the hash for a required script not covered by the policy:

> Refused to execute inline script because it violates the following Content Security Policy directive: " ... ". Either the 'unsafe-inline' keyword, a hash ('sha256-v8v3RKRPmN4odZ1CWM5gw80QKPCCWMcpNeOmimNL2AA='), or a nonce ('nonce-...') is required to enable inline execution.

The particular script associated with the error is displayed in the console next to the error.

For guidance on applying a CSP to an app in C# code at startup, see ASP.NET Core Blazor startup.

### Client-side Blazor apps

The following example is a starting point for further development. In the `<head>` content, apply the directives described in the *Policy directives* section:

```html
<meta http-equiv="Content-Security-Policy" content="
    base-uri 'self';
    default-src 'self';
    img-src data: https:;
    object-src 'none';
    script-src 'self' 'wasm-unsafe-eval';
    style-src 'self';
    connect-src 'none';
    upgrade-insecure-requests">
```

Add additional `script-src` and `style-src` hashes as required by the app. During development, use an online tool or browser developer tools to have the hashes calculated for you. For example, the following browser tools console error reports the hash for a required script not covered by the policy:

> Refused to execute inline script because it violates the following Content Security Policy directive: " ... ". Either the 'unsafe-inline' keyword, a hash ('sha256-v8v3RKRPmN4odZ1CWM5gw80QKPCCWMcpNeOmimNL2AA='), or a nonce ('nonce-...') is required to enable inline execution.

The particular script associated with the error is displayed in the console next to the error.
