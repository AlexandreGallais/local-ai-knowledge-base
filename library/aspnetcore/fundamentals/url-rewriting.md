---
title: "URL rewriting middleware in ASP.NET Core (part 1 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/url-rewriting.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# URL rewriting middleware in ASP.NET Core

-->
-->

By Kirk Larkin and Rick Anderson

This article introduces URL rewriting with instructions on how to use URL rewriting middleware in ASP.NET Core apps.

URL rewriting is the act of modifying request URLs based on one or more predefined rules. URL rewriting creates an abstraction between resource locations and their addresses so that the locations and addresses aren't tightly linked. URL rewriting is valuable in several scenarios to:

* Move or replace server resources temporarily or permanently and maintain stable locators for those resources.
* Split request processing across different apps or across areas of one app.
* Remove, add, or reorganize URL segments on incoming requests.
* Optimize public URLs for Search Engine Optimization (SEO).
* Permit the use of friendly public URLs to help visitors predict the content returned by requesting a resource.
* Redirect insecure requests to secure endpoints.
* Prevent hotlinking, where an external site uses a hosted static asset on another site by linking the asset into its own content.

***URL rewriting can reduce the performance of an app***. Limit the number and complexity of rules.

## URL redirect and URL rewrite

The difference in wording between *URL redirect* and *URL rewrite* is subtle but has important implications for providing resources to clients. ASP.NET Core's URL rewriting middleware is capable of meeting the need for both.

A *URL redirect* involves a client-side operation, where the client is instructed to access a resource at a different address than the client originally requested. This requires a round trip to the server. The redirect URL returned to the client appears in the browser's address bar when the client makes a new request for the resource.

If `/resource` is *redirected* to `/different-resource`, the server responds that the client should obtain the resource at `/different-resource` with a status code indicating that the redirect is either temporary or permanent.

When redirecting requests to a different URL, indicate whether the redirect is permanent or temporary by specifying the status code with the response:

* The `301 - Moved Permanently` status code is used where the resource has a new, permanent URL and that all future requests for the resource should use the new URL. *The client may cache and reuse the response when a 301 status code is received.*

* The `302 - Found` status code is used where the redirection is temporary or generally subject to change. The 302 status code indicates to the client not to store the URL and use it in the future.

For more information on status codes, see RFC 9110: Status Code Definitions.

A *URL rewrite* is a server-side operation that provides a resource from a different resource address than the client requested. Rewriting a URL doesn't require a round trip to the server. The rewritten URL isn't returned to the client and doesn't appear in the browser's address bar.

If `/resource` is *rewritten* to `/different-resource`, the server *internally* fetches and returns the resource at `/different-resource`.

Although the client might be able to retrieve the resource at the rewritten URL, the client isn't informed that the resource exists at the rewritten URL when it makes its request and receives the response.

## URL rewriting sample app

Explore the features of the URL rewriting middleware with the sample app. The app applies redirect and rewrite rules and shows the redirected or rewritten URL for several scenarios.

## When to use URL rewriting middleware

Use URL rewriting middleware when the following approaches aren't satisfactory:

* URL Rewrite module with IIS on Windows Server
* Apache mod_rewrite module on Apache Server
* URL rewriting on Nginx

Use the URL rewriting middleware when the app is hosted on HTTP.sys server.

The main reasons to use the server-based URL rewriting technologies in IIS, Apache, and Nginx are:

* The middleware doesn't support the full features of these modules.

  Some of the features of the server modules don't work with ASP.NET Core projects, such as the `IsFile` and `IsDirectory` constraints of the IIS Rewrite module. In these scenarios, use the middleware instead.
* The performance of the middleware probably doesn't match that of the modules.

  Benchmarking is the only way to know with certainty which approach degrades performance the most or if degraded performance is negligible.
