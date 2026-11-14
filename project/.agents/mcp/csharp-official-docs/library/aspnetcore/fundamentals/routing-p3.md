---
title: "Routing in ASP.NET Core (part 3 of 10)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/routing.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Routing in ASP.NET Core (part 3 of 10)

### URL matching

* Is the process by which routing matches an incoming request to an endpoint.
* Is based on data in the URL path and headers.
* Can be extended to consider any data in the request.

When a routing middleware executes, it sets an `Endpoint` and route values to a request feature on the `Microsoft.AspNetCore.Http.HttpContext` from the current request:

* Calling HttpContext.GetEndpoint gets the endpoint.
* `HttpRequest.RouteValues` gets the collection of route values.

Middleware that runs after the routing middleware can inspect the endpoint and take action. For example, an authorization middleware can interrogate the endpoint's metadata collection for an authorization policy. After all of the middleware in the request processing pipeline is executed, the selected endpoint's delegate is invoked.

The routing system in endpoint routing is responsible for all dispatching decisions. Because the middleware applies policies based on the selected endpoint, it's important that:

* Any decision that can affect dispatching or the application of security policies is made inside the routing system.

> **Warning:**
> For backward-compatibility, when a Controller or Razor Pages endpoint delegate is executed, the properties of `Microsoft.AspNetCore.Routing.RouteContext.RouteData` are set to appropriate values based on the request processing performed thus far.
>
> The `RouteContext` type will be marked obsolete in a future release:
>
> * Migrate `RouteData.Values` to `HttpRequest.RouteValues`.
> * Migrate `RouteData.DataTokens` to retrieve `Microsoft.AspNetCore.Routing.IDataTokensMetadata` from the endpoint metadata.

URL matching operates in a configurable set of phases. In each phase, the output is a set of matches. The set of matches can be narrowed down further by the next phase. The routing implementation does not guarantee a processing order for matching endpoints. **All** possible matches are processed at once. The URL matching phases occur in the following order. ASP.NET Core:

1. Processes the URL path against the set of endpoints and their route templates, collecting **all** of the matches.
1. Takes the preceding list and removes matches that fail with route constraints applied.
1. Takes the preceding list and removes matches that fail the set of `Microsoft.AspNetCore.Routing.MatcherPolicy` instances.
1. Uses the `Microsoft.AspNetCore.Routing.Matching.EndpointSelector` to make a final decision from the preceding list.

The list of endpoints is prioritized according to:

* The `Microsoft.AspNetCore.Routing.RouteEndpoint.Order`
* The route template precedence

All matching endpoints are processed in each phase until the `Microsoft.AspNetCore.Routing.Matching.EndpointSelector` is reached. The `EndpointSelector` is the final phase. It chooses the highest priority endpoint from the matches as the best match. If there are other matches with the same priority as the best match, an ambiguous match exception is thrown.

The route precedence is computed based on a **more specific** route template being given a higher priority. For example, consider the templates `/hello` and `/{message}`:

* Both match the URL path `/hello`.
* `/hello` is more specific and therefore higher priority.

In general, route precedence does a good job of choosing the best match for the kinds of URL schemes used in practice. Use `Microsoft.AspNetCore.Routing.RouteEndpoint.Order` only when necessary to avoid an ambiguity.

Due to the kinds of extensibility provided by routing, it isn't possible for the routing system to compute ahead of time the ambiguous routes. Consider an example such as the route templates `/{message:alpha}` and `/{message:int}`:

* The `alpha` constraint matches only alphabetic characters.
* The `int` constraint matches only numbers.
* These templates have the same route precedence, but there's no single URL they both match.
* If the routing system reported an ambiguity error at startup, it would block this valid use case.

> **Warning:**
>
> The order of operations inside `Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseEndpoints*` doesn't influence the behavior of routing, with one exception. `Microsoft.AspNetCore.Builder.ControllerEndpointRouteBuilderExtensions.MapControllerRoute*` and `Microsoft.AspNetCore.Builder.MvcAreaRouteBuilderExtensions.MapAreaRoute*` automatically assign an order value to their endpoints based on the order they are invoked. This simulates long-time behavior of controllers without the routing system providing the same guarantees as older routing implementations.
>
> Endpoint routing in ASP.NET Core:
>
> * Doesn't have the concept of routes.
> * Doesn't provide ordering guarantees. All endpoints are processed at once.

### Route template precedence and endpoint selection order

Route template precedence is a system that assigns each route template a value based on how specific it is. Route template precedence:

* Avoids the need to adjust the order of endpoints in common cases.
* Attempts to match the common-sense expectations of routing behavior.

For example, consider templates `/Products/List` and `/Products/{id}`. It would be reasonable to assume that `/Products/List` is a better match than `/Products/{id}` for the URL path `/Products/List`. This works because the literal segment `/List` is considered to have better precedence than the parameter segment `/{id}`.

The details of how precedence works are coupled to how route templates are defined:

* Templates with more segments are considered more specific.
* A segment with literal text is considered more specific than a parameter segment.
* A parameter segment with a constraint is considered more specific than one without.
* A complex segment is considered as specific as a parameter segment with a constraint.
* Catch-all parameters are the least specific. See **catch-all** in the Route templates section for important information on catch-all routes.

### URL generation concepts

URL generation:

* Is the process by which routing can create a URL path based on a set of route values.
* Allows for a logical separation between endpoints and the URLs that access them.

Endpoint routing includes the `Microsoft.AspNetCore.Routing.LinkGenerator` API. `LinkGenerator` is a singleton service available from DI. The `LinkGenerator` API can be used outside of the context of an executing request. Mvc.IUrlHelper and scenarios that rely on `Microsoft.AspNetCore.Mvc.IUrlHelper`, such as Tag Helpers, HTML Helpers, and Action Results, use the `LinkGenerator` API internally to provide link generating capabilities.

The link generator is backed by the concept of an **address** and **address schemes**. An address scheme is a way of determining the endpoints that should be considered for link generation. For example, the route name and route values scenarios many users are familiar with from controllers and Razor Pages are implemented as an address scheme.

The link generator can link to controllers and Razor Pages via the following extension methods:

* `Microsoft.AspNetCore.Routing.ControllerLinkGeneratorExtensions.GetPathByAction*`
* `Microsoft.AspNetCore.Routing.ControllerLinkGeneratorExtensions.GetUriByAction*`
* `Microsoft.AspNetCore.Routing.PageLinkGeneratorExtensions.GetPathByPage*`
* `Microsoft.AspNetCore.Routing.PageLinkGeneratorExtensions.GetUriByPage*`

Overloads of these methods accept arguments that include the `HttpContext`. These methods are functionally equivalent to Url.Action and Url.Page, but offer additional flexibility and options.

The `GetPath*` methods are most similar to `Url.Action` and `Url.Page`, in that they generate a URI containing an absolute path. The `GetUri*` methods always generate an absolute URI containing a scheme and host. The methods that accept an `HttpContext` generate a URI in the context of the executing request. The ambient route values, URL base path, scheme, and host from the executing request are used unless overridden.

`Microsoft.AspNetCore.Routing.LinkGenerator` is called with an address. Generating a URI occurs in two steps:

1. An address is bound to a list of endpoints that match the address.
1. Each endpoint's `Microsoft.AspNetCore.Routing.RouteEndpoint.RoutePattern` is evaluated until a route pattern that matches the supplied values is found. The resulting output is combined with the other URI parts supplied to the link generator and returned.

The methods provided by `Microsoft.AspNetCore.Routing.LinkGenerator` support standard link generation capabilities for any type of address. The most convenient way to use the link generator is through extension methods that perform operations for a specific address type:

| Extension Method                                                      | Description                                                         |
|-----------------------------------------------------------------------|---------------------------------------------------------------------|
| `Microsoft.AspNetCore.Routing.LinkGenerator.GetPathByAddress*` | Generates a URI with an absolute path based on the provided values. |
| `Microsoft.AspNetCore.Routing.LinkGenerator.GetUriByAddress*`  | Generates an absolute URI based on the provided values.             |

> **Warning:**
> Pay attention to the following implications of calling `Microsoft.AspNetCore.Routing.LinkGenerator` methods:
>
> * Use `GetUri*` extension methods with caution in an app configuration that doesn't validate the `Host` header of incoming requests. If the `Host` header of incoming requests isn't validated, untrusted request input can be sent back to the client in URIs in a view or page. We recommend that all production apps configure their server to validate the `Host` header against known valid values.
>
> * Use `Microsoft.AspNetCore.Routing.LinkGenerator` with caution in middleware in combination with `Map` or `MapWhen`. `Map*` changes the base path of the executing request, which affects the output of link generation. All of the `Microsoft.AspNetCore.Routing.LinkGenerator` APIs allow specifying a base path. Specify an empty base path to undo the `Map*` affect on link generation.

### Middleware example

In the following example, a middleware uses the `Microsoft.AspNetCore.Routing.LinkGenerator` API to create a link to an action method that lists store products. Using the link generator by injecting it into a class and calling `GenerateLink` is available to any class in an app:

```csharp
public class ProductsMiddleware
{
    private readonly LinkGenerator _linkGenerator;

    public ProductsMiddleware(RequestDelegate next, LinkGenerator linkGenerator) =>
        _linkGenerator = linkGenerator;

    public async Task InvokeAsync(HttpContext httpContext)
    {
        httpContext.Response.ContentType = MediaTypeNames.Text.Plain;

        var productsPath = _linkGenerator.GetPathByAction("Products", "Store");

        await httpContext.Response.WriteAsync(
            $"Go to {productsPath} to see our products.");
    }
}
```
