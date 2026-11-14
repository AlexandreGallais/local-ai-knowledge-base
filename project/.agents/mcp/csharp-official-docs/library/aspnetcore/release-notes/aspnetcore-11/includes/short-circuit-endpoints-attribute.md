---
title: "short-circuit-endpoints-attribute"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/release-notes/aspnetcore-11/includes/short-circuit-endpoints-attribute.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# short-circuit-endpoints-attribute

### Short-circuit endpoints with an attribute

The new `[ShortCircuit]` attribute marks an endpoint to run immediately after routing, skipping the rest of the middleware pipeline. This is the attribute form of the existing `ShortCircuit()` endpoint convention, so it can be applied directly to MVC controllers and actions.

Short-circuiting is useful for endpoints that don't need authentication, CORS, or other middleware—for example a health check or a `robots.txt` response, and it avoids the cost of running that middleware. The endpoint still runs and produces its response. Pass an optional status code, such as `[ShortCircuit(404)]`, to set the response status code.

```csharp
[ApiController]
[Route("robots.txt")]
[ShortCircuit]
public class RobotsController : ControllerBase
{
    [HttpGet]
    public IActionResult Get() => Content("User-agent: *\nDisallow:", "text/plain");
}
```

The same attribute works on Minimal API endpoints, and the existing `ShortCircuit()` convention continues to work unchanged:

```csharp
app.MapGet("/health", [ShortCircuit] () => "Healthy");
```

Thank you @Porozhniakov for contributing this feature!
