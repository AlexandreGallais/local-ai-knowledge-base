---
title: "Work with the application model in ASP.NET Core (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/mvc/controllers/application-model.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Work with the application model in ASP.NET Core (part 2 of 2)

## Custom routing convention

Use an `Microsoft.AspNetCore.Mvc.ApplicationModels.IApplicationModelConvention` to customize how routing works. For example, the following convention incorporates controllers' namespaces into their routes, replacing `.` in the namespace with `/` in the route:

```csharp
﻿using Microsoft.AspNetCore.Mvc.ApplicationModels;
using System.Linq;

namespace AppModelSample.Conventions
{
    public class NamespaceRoutingConvention : IApplicationModelConvention
    {
        public void Apply(ApplicationModel application)
        {
            foreach (var controller in application.Controllers)
            {
                var hasAttributeRouteModels = controller.Selectors
                    .Any(selector => selector.AttributeRouteModel != null);

                if (!hasAttributeRouteModels
                    && controller.ControllerName.Contains("Namespace")) // affect one controller in this sample
                {
                    // Replace the . in the namespace with a / to create the attribute route
                    // Ex: MySite.Admin namespace will correspond to MySite/Admin attribute route
                    // Then attach [controller], [action] and optional {id?} token.
                    // [Controller] and [action] is replaced with the controller and action
                    // name to generate the final template
                    controller.Selectors[0].AttributeRouteModel = new AttributeRouteModel()
                    {
                        Template = controller.ControllerType.Namespace.Replace('.', '/') + "/[controller]/[action]/{id?}"
                    };
                }
            }

            // You can continue to put attribute route templates for the controller actions depending on the way you want them to behave
        }
    }
}
```

The convention is added as an option in `Startup.ConfigureServices`:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddMvc(options =>
    {
        options.Conventions.Add(new ApplicationDescription("My Application Description"));
        options.Conventions.Add(new NamespaceRoutingConvention());
    });
}
```

> **Tip:**
> Add conventions to middleware via `Microsoft.AspNetCore.Mvc.MvcOptions` using the following approach. The `{CONVENTION}` placeholder is the convention to add:
>
> ```csharp
> services.Configure<MvcOptions>(c => c.Conventions.Add({CONVENTION}));
> ```

The following example applies a convention to routes that aren't using attribute routing where the controller has  `Namespace` in its name:

```csharp
using Microsoft.AspNetCore.Mvc;

namespace AppModelSample.Controllers
{
    public class NamespaceRoutingController : Controller
    {
        // using NamespaceRoutingConvention
        // route: /AppModelSample/Controllers/NamespaceRouting/Index
        public string Index()
        {
            return "This demonstrates namespace routing.";
        }
    }
}
```

## Use `ApiExplorer` to document an app

The application model exposes an `Microsoft.AspNetCore.Mvc.ApplicationModels.ApiExplorerModel` property at each level that can be used to traverse the app's structure. This can be used to generate help pages for web APIs using tools like Swagger. The `ApiExplorer` property exposes an `Microsoft.AspNetCore.Mvc.ApplicationModels.ApiExplorerModel.IsVisible` property that can be set to specify which parts of the app's model should be exposed. Configure this setting using a convention:

```csharp
using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace AppModelSample.Conventions
{
    public class EnableApiExplorerApplicationConvention : IApplicationModelConvention
    {
        public void Apply(ApplicationModel application)
        {
            application.ApiExplorer.IsVisible = true;
        }
    }
}
```

Using this approach (and additional conventions if required), API visibility is enabled or disabled at any level within an app.

### Custom API description providers with `IApiDescriptionProvider`

Starting with .NET 9, ASP.NET Core includes built-in OpenAPI document generation in the `Microsoft.AspNetCore.OpenApi` package. To programmatically inspect or modify the generated OpenAPI output, use document, operation, and schema transformers rather than implementing `Microsoft.AspNetCore.Mvc.ApiExplorer.IApiDescriptionProvider` directly. For more information, see Generate OpenAPI documents.
