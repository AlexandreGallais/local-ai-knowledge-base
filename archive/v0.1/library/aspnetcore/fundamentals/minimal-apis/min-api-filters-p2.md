---
title: "Filters in Minimal API apps (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/minimal-apis/min-api-filters.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Filters in Minimal API apps (part 2 of 2)

## Register a filter on controller actions

In some scenarios, it might be necessary to apply the same filter logic for both route-handler based endpoints and controller actions. For this scenario, you can invoke `AddEndpointFilter` on `ControllerActionEndpointConventionBuilder` to support executing the same filter logic on actions and endpoints.

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers()
    .AddEndpointFilter(async (efiContext, next) =>
    {
        efiContext.HttpContext.Items["endpointFilterCalled"] = true;
        var result = await next(efiContext);
        return result;
    });

app.Run();
```

## Related content

* View or download sample code (How to download)
* ValidationFilterRouteHandlerBuilderExtensions (Validation extension methods)
* Tutorial: Create a Minimal API with ASP.NET Core
* Authentication and authorization in Minimal APIs
