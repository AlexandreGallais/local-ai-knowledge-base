---
title: "Migrate from ASP.NET Web API to ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/migration/fx-to-core/areas/webapi.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Migrate from ASP.NET Web API to ASP.NET Core

ASP.NET Core combines ASP.NET 4.x's MVC and Web API app models into a single programming model known as ASP.NET Core MVC.

This article shows how to migrate the Products controller created in Getting Started with ASP.NET Web API 2 to ASP.NET Core.

# Visual Studio

* Visual Studio 2022 with the **ASP.NET and web development** workload.
* .NET 6 SDK

# Visual Studio Code

* Visual Studio Code
* C# for Visual Studio Code (latest version)
* .NET 6 SDK

The Visual Studio Code instructions use the .NET CLI for ASP.NET Core development functions such as project creation. You can follow these instructions on macOS, Linux, or Windows and with any code editor. Minor changes may be required if you use something other than Visual Studio Code.

---

# Visual Studio

1. From the **File** menu, select **New** > **Project**.
1. Enter *Web API* in the search box.
1. Select the **ASP.NET Core Web API** template and select **Next**.
1. In the **Configure your new project** dialog, name the project *ProductsCore* and select **Next**.
1. In the **Additional information** dialog:
   1. Confirm the **Framework** is **.NET 6.0 (Long-term support)**.
   1. Confirm the checkbox for **Use controllers(uncheck to use Minimal APIs)** is checked.
   1. Uncheck **Enable OpenAPI support**.
   1. Select **Create**.

# Visual Studio Code

1. Open the integrated terminal.
1. Change directories (`cd`) to the folder that will contain the project folder.
1. Run the following commands to create a new web API project and open it in Visual Studio Code:

   ```dotnetcli
   dotnet new webapi -o ProductsCore --no-openapi
   cd ProductsCore
   code -r ../ProductsCore
   ```

---

## Remove the *WeatherForecast* template files

1. Remove the `WeatherForecast.cs` and `Controllers/WeatherForecastController.cs` example files from the new *ProductsCore* project.
1. Open *Properties\launchSettings.json*.
1. Change `launchUrl` properties from `weatherforcast` to `productscore`.

## The configuration for ASP.NET Core Web API

ASP.NET Core doesn't use the *App_Start* folder or the *Global.asax* file. The *web.config* file is added at publish time. For more information, see web.config file.

The `Program.cs` file:

* Replaces *Global.asax*.
* Handles all app startup tasks.

For more information, see App startup in ASP.NET Core.

The following shows the application startup code in the ASP.NET Core `Program.cs` file:

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
```

# Visual Studio

1. In **Solution Explorer**, right-click the project. Select **Add** > **New Folder**. Name the folder *Models*.
1. Right-click the **Models** folder. Select **Add** > **Class**. Name the class *Product* and select **Add**.
1. Replace the template model code with the following:

# Visual Studio Code

1. Add a folder named *Models*.
1. Add a *Product* class to the *Models* folder with the following code:

---

   ```csharp
﻿namespace ProductsCore.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Category { get; set; }
        public decimal Price { get; set; }
    }
}
```

The preceding highlighted code changes the following:

* The `?` annotation has been added to declare the `Name` and `Category` properties as nullable reference types.

By utilizing the Nullable feature introduced in C# 8, ASP.NET Core can provide additional code flow analysis and compile-time safety in the handling of reference types. For example, protecting against `null` reference exceptions.

In this case, the intent is that the `Name` and `Category` can be nullable types.

ASP.NET Core in .NET 6 projects enable nullable reference types by default. For more information, see Nullable reference types.

# Visual Studio

1. Right-click the **Controllers** folder.
1. Select **Add > Controller...**.
1. In **Add New Scaffolded Item** dialog, select **Mvc Controller - Empty** then select **Add**.
1. Name the controller *ProductsController* and select **Add**.
1. Replace the template controller code with the following:

# Visual Studio Code

1. Add a *ProductsController* class to the *Controllers* folder with the following code:

---

   ```csharp
using Microsoft.AspNetCore.Mvc;
using ProductsCore.Models;

namespace ProductsCore.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    Product[] products = new Product[]
    {
            new Product
            {
                Id = 1, Name = "Tomato Soup", Category = "Groceries", Price = 1
            },
            new Product
            {
                Id = 2, Name = "Yo-yo", Category = "Toys", Price = 3.75M
            },
            new Product
            {
                Id = 3, Name = "Hammer", Category = "Hardware", Price = 16.99M
            }
    };

    [HttpGet]
    public IEnumerable<Product> GetAllProducts()
    {
        return products;
    }

    [HttpGet("{id}")]
    public ActionResult<Product> GetProduct(int id)
    {
        var product = products.FirstOrDefault((p) => p.Id == id);
        if (product == null)
        {
            return NotFound();
        }
        return product;
    }
}
```

The preceding highlighted code changes the following, to migrate to ASP.NET Core:

* Removes using statements for the following ASP.NET 4.x components that don't exist in ASP.NET Core:

  * `ApiController` class
  * `System.Web.Http` namespace
  * `IHttpActionResult` interface

* Changes the `using ProductsApp.Models;` statement to `using ProductsCore.Models;`.
* Sets the root namespace to `ProductsCore`.
* Changes `ApiController` to `Microsoft.AspNetCore.Mvc.ControllerBase`.
* Adds `using Microsoft.AspNetCore.Mvc;` to resolve the `ControllerBase` reference.
* Changes the `GetProduct` action's return type from `IHttpActionResult` to `ActionResult<Product>`. For more info, see Controller action return types.
* Simplifies the `GetProduct` action's `return` statement to the following statement:

    ```csharp
    return product;
    ```

* Adds the following attributes which are explained in the next sections:
  * `[Route("api/[controller]")]`
  * `[ApiController]`
  * `[HttpGet]`
  * `[HttpGet("{id}")]`

## Routing

ASP.NET Core provides a minimal hosting model in which the endpoint routing middleware wraps the entire middleware pipeline, therefore routes can be added directly to the `Microsoft.AspNetCore.Builder.WebApplication` without an explicit call to `Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseEndpoints*` or `Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting*` to register routes.

`UseRouting` can still be used to specify where route matching happens, but `UseRouting` doesn't need to be explicitly called if routes should be matched at the beginning of the middleware pipeline.

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
```

**Note:** Routes added directly to the `Microsoft.AspNetCore.Builder.WebApplication` execute at the ***end*** of the pipeline.

## Routing in the migrated `ProductsController`

The migrated `ProductsController` contains the following highlighted attributes:

```csharp
using Microsoft.AspNetCore.Mvc;
using ProductsCore.Models;

namespace ProductsCore.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    Product[] products = new Product[]
    {
            new Product
            {
                Id = 1, Name = "Tomato Soup", Category = "Groceries", Price = 1
            },
            new Product
            {
                Id = 2, Name = "Yo-yo", Category = "Toys", Price = 3.75M
            },
            new Product
            {
                Id = 3, Name = "Hammer", Category = "Hardware", Price = 16.99M
            }
    };

    [HttpGet]
    public IEnumerable<Product> GetAllProducts()
    {
        return products;
    }

    [HttpGet("{id}")]
    public ActionResult<Product> GetProduct(int id)
    {
        var product = products.FirstOrDefault((p) => p.Id == id);
        if (product == null)
        {
            return NotFound();
        }
        return product;
    }
}
```

* The `[Route]` attribute configures the controller's attribute routing pattern.
* The `[ApiController]` attribute makes attribute routing a requirement for all actions in this controller.

* Attribute routing supports tokens, such as `[controller]` and `[action]`. At runtime, each token is replaced with the name of the controller or action, respectively, to which the attribute has been applied. The tokens:

  * Reduces or eliminates the need to use hard coded strings for the route.
  * Ensure routes remain synchronized with the corresponding controllers and actions when automatic rename refactorings are applied.

* HTTP Get requests are enabled for `ProductController` actions with the following attributes:

  * `[HttpGet]` attribute applied to the `GetAllProducts` action.
  * `[HttpGet("{id}")]` attribute applied to the `GetProduct` action.

Run the migrated project, and browse to `/api/products`.  For example: https://localhost:`<port>`/api/products. A full list of three products appears. Browse to `/api/products/1`. The first product appears.

View or download sample code (how to download)

## Additional resources

* Create web APIs with ASP.NET Core
* Controller action return types in ASP.NET Core web API
* Compatibility version for ASP.NET Core MVC
