---
title: "Razor Pages route and app conventions in ASP.NET Core (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/razor-pages/razor-pages-conventions.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Razor Pages route and app conventions in ASP.NET Core

Learn how to use page route and app model provider conventions to control page routing, discovery, and processing in Razor Pages apps.

To specify a page route, add route segments, or add parameters to a route, use the page's `@page` directive. For more information, see Custom routes.

There are reserved words that can't be used as route segments or parameter names. For more information, see Routing: Reserved routing names.

View or download sample code (how to download)

| Scenario | The sample demonstrates  |
| -------- | --------------------------- |
| Model conventionsConventions.Add`Microsoft.AspNetCore.Mvc.ApplicationModels.IPageRouteModelConvention``Microsoft.AspNetCore.Mvc.ApplicationModels.IPageApplicationModelConvention``Microsoft.AspNetCore.Mvc.ApplicationModels.IPageHandlerModelConvention` | Add a route template and header to an app's pages. |
| Page route action conventions`Microsoft.AspNetCore.Mvc.ApplicationModels.PageConventionCollection.AddFolderRouteModelConvention*``Microsoft.AspNetCore.Mvc.ApplicationModels.PageConventionCollection.AddPageRouteModelConvention*``Microsoft.Extensions.DependencyInjection.PageConventionCollectionExtensions.AddPageRoute*` | Add a route template to pages in a folder and to a single page. |
| Page model action conventions`Microsoft.AspNetCore.Mvc.ApplicationModels.PageConventionCollection.AddFolderApplicationModelConvention*``Microsoft.AspNetCore.Mvc.ApplicationModels.PageConventionCollection.AddPageApplicationModelConvention*``Microsoft.Extensions.DependencyInjection.PageConventionCollectionExtensions.ConfigureFilter*` (filter class, lambda expression, or filter factory) | Add a header to pages in a folder, add a header to a single page, and configure a filter factory to add a header to an app's pages. |

Razor Pages conventions are configured using an `Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddRazorPages*` overload that configures `Microsoft.AspNetCore.Mvc.RazorPages.RazorPagesOptions`. The following convention examples are explained later in this topic:

```csharp

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages(options =>
    {
        options.Conventions.Add( ... );
        options.Conventions.AddFolderRouteModelConvention(
            "/OtherPages", model => { ... });
        options.Conventions.AddPageRouteModelConvention(
            "/About", model => { ... });
        options.Conventions.AddPageRoute(
            "/Contact", "TheContactPage/{text?}");
        options.Conventions.AddFolderApplicationModelConvention(
            "/OtherPages", model => { ... });
        options.Conventions.AddPageApplicationModelConvention(
            "/About", model => { ... });
        options.Conventions.ConfigureFilter(model => { ... });
        options.Conventions.ConfigureFilter( ... );
    });
}
```

## Route order

Routes specify an `Microsoft.AspNetCore.Mvc.ApplicationModels.AttributeRouteModel.Order` for processing (route matching).

| Route order            | Behavior |
| :--------------: | -------- |
| -1               | The route is processed before other routes are processed. |
| 0                | Order isn't specified (default value). Not assigning `Order` (`Order = null`) defaults the route `Order` to 0 (zero) for processing. |
| 1, 2, … n | Specifies the route processing order. |

Route processing is established by convention:

* Routes are processed in sequential order (-1, 0, 1, 2, … n).
* When routes have the same `Order`, the most specific route is matched first followed by less specific routes.
* When routes with the same `Order` and the same number of parameters match a request URL, routes are processed in the order that they're added to the `Microsoft.AspNetCore.Mvc.ApplicationModels.PageConventionCollection`.

If possible, avoid depending on an established route processing order. Generally, routing selects the correct route with URL matching. If you must set route `Order` properties to route requests correctly, the app's routing scheme is probably confusing to clients and fragile to maintain. Seek to simplify the app's routing scheme. The sample app requires an explicit route processing order to demonstrate several routing scenarios using a single app. However, you should attempt to avoid the practice of setting route `Order` in production apps.

Razor Pages routing and MVC controller routing share an implementation. Information on route order in the MVC topics is available at Routing to controller actions: Ordering attribute routes.

## Model conventions

Add a delegate for `Microsoft.AspNetCore.Mvc.ApplicationModels.IPageConvention` to add model conventions that apply to Razor Pages.

### Add a route model convention to all pages

Use `Microsoft.AspNetCore.Mvc.RazorPages.RazorPagesOptions.Conventions` to create and add an `Microsoft.AspNetCore.Mvc.ApplicationModels.IPageRouteModelConvention` to the collection of `Microsoft.AspNetCore.Mvc.ApplicationModels.IPageConvention` instances that are applied during page route model construction.

The sample app contains the `GlobalTemplatePageRouteModelConvention` class to add a `{globalTemplate?}` route template to all of the pages in the app:

```csharp
using Microsoft.AspNetCore.Mvc.ApplicationModels;
namespace SampleApp.Conventions;

public class GlobalTemplatePageRouteModelConvention : IPageRouteModelConvention
{
    public void Apply(PageRouteModel model)
    {
        var selectorCount = model.Selectors.Count;
        for (var i = 0; i < selectorCount; i++)
        {
            var selector = model.Selectors[i];
            model.Selectors.Add(new SelectorModel
            {
                AttributeRouteModel = new AttributeRouteModel
                {
                    Order = 1,
                    Template = AttributeRouteModel.CombineTemplates(
                        selector.AttributeRouteModel!.Template, 
                        "{globalTemplate?}"),
                }
            });
        }
    }
}
```

In the preceding code:

* The `Microsoft.AspNetCore.Mvc.ApplicationModels.PageRouteModel` is passed to the `Microsoft.AspNetCore.Mvc.ApplicationModels.IPageRouteModelConvention.Apply*` method.
* The PageRouteModel.Selectors gets the count of selectors.
* A new `Microsoft.AspNetCore.Mvc.ApplicationModels.SelectorModel` is added which contains a `Microsoft.AspNetCore.Mvc.ApplicationModels.AttributeRouteModel`

Razor Pages options, such as adding `Microsoft.AspNetCore.Mvc.RazorPages.RazorPagesOptions.Conventions`, are added when Razor Pages is added to the service collection. For an example, see the sample app.

```csharp
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.EntityFrameworkCore;
using SampleApp.Conventions;
using SampleApp.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
                                   options.UseInMemoryDatabase("InMemoryDb"));

builder.Services.AddRazorPages(options =>
   {
       options.Conventions.Add(new GlobalTemplatePageRouteModelConvention());

       options.Conventions.AddFolderRouteModelConvention("/OtherPages", model =>
       {
           var selectorCount = model.Selectors.Count;
           for (var i = 0; i < selectorCount; i++)
           {
               var selector = model.Selectors[i];
               model.Selectors.Add(new SelectorModel
               {
                   AttributeRouteModel = new AttributeRouteModel
                   {
                       Order = 2,
                       Template = AttributeRouteModel.CombineTemplates(
                           selector.AttributeRouteModel!.Template,
                           "{otherPagesTemplate?}"),
                   }
               });
           }
       });

       options.Conventions.AddPageRouteModelConvention("/About", model =>
       {
           var selectorCount = model.Selectors.Count;
           for (var i = 0; i < selectorCount; i++)
           {
               var selector = model.Selectors[i];
               model.Selectors.Add(new SelectorModel
               {
                   AttributeRouteModel = new AttributeRouteModel
                   {
                       Order = 2,
                       Template = AttributeRouteModel.CombineTemplates(
                           selector.AttributeRouteModel!.Template,
                           "{aboutTemplate?}"),
                   }
               });
           }
       });

   });

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseAuthorization();
app.MapRazorPages();
app.Run();
```

Consider the `GlobalTemplatePageRouteModelConvention` class:

```csharp
using Microsoft.AspNetCore.Mvc.ApplicationModels;
namespace SampleApp.Conventions;

public class GlobalTemplatePageRouteModelConvention : IPageRouteModelConvention
{
    public void Apply(PageRouteModel model)
    {
        var selectorCount = model.Selectors.Count;
        for (var i = 0; i < selectorCount; i++)
        {
            var selector = model.Selectors[i];
            model.Selectors.Add(new SelectorModel
            {
                AttributeRouteModel = new AttributeRouteModel
                {
                    Order = 1,
                    Template = AttributeRouteModel.CombineTemplates(
                        selector.AttributeRouteModel!.Template, 
                        "{globalTemplate?}"),
                }
            });
        }
    }
}
```

The `Microsoft.AspNetCore.Mvc.ApplicationModels.AttributeRouteModel.Order` property for the `Microsoft.AspNetCore.Mvc.ApplicationModels.AttributeRouteModel` is set to `1`. This ensures the following route matching behavior in the sample app:

* A route template for `TheContactPage/{text?}` is added later in this topic. The `Contact Page` route has a default order of `null` (`Order = 0`), so it matches before the `{globalTemplate?}` route template which has `Order = 1`.
* The `{aboutTemplate?}` route template is show in the preceding code. The `{aboutTemplate?}` template is given an `Order` of `2`. When the About page is requested at `/About/RouteDataValue`, "RouteDataValue" is loaded into `RouteData.Values["globalTemplate"]` (`Order = 1`) and not `RouteData.Values["aboutTemplate"]` (`Order = 2`) due to setting the `Order` property.
* The `{otherPagesTemplate?}` route template is shown in the preceding code. The `{otherPagesTemplate?}` template is given an `Order` of `2`. When any page in the *Pages/OtherPages* folder is requested with a route parameter:

* For example, `/OtherPages/Page1/xyz`
* The route data value `"xyz"` is loaded into `RouteData.Values["globalTemplate"]` (`Order = 1`).
* `RouteData.Values["otherPagesTemplate"]` with (`Order = 2`) is not loaded due to the `Order` property `2` having a higher value.

**When possible, don't set the `Order`**. When `Order` is not set, it defaults to `Order = 0`. Rely on routing to select the correct route rather than the `Order` property.

Request the sample's `About` page at `localhost:{port}/About/GlobalRouteValue` and inspect the result:

The sample app uses the Rick.Docs.Samples.RouteInfo NuGet package to display routing information in the logging output. Using `localhost:{port}/About/GlobalRouteValue`, the logger displays the request, the `Order`, and the template used:

```dotnetcli
info: SampleApp.Pages.AboutModel[0]
       /About/GlobalRouteValue   Order = 1 Template = About/{globalTemplate?}
```

### Add an app model convention to all pages

Use `Microsoft.AspNetCore.Mvc.RazorPages.RazorPagesOptions.Conventions` to create and add an `Microsoft.AspNetCore.Mvc.ApplicationModels.IPageApplicationModelConvention` to the collection of `Microsoft.AspNetCore.Mvc.ApplicationModels.IPageConvention` instances that are applied during page app model construction.

To demonstrate this and other conventions later in the topic, the sample app includes an `AddHeaderAttribute` class. The class constructor accepts a `name` string and a `values` string array. These values are used in its `OnResultExecuting` method to set a response header. The full class is shown in the Page model action conventions section later in the topic.

The sample app uses the `AddHeaderAttribute` class to add a header, `GlobalHeader`, to all of the pages in the app:

```csharp
public class GlobalHeaderPageApplicationModelConvention 
    : IPageApplicationModelConvention
{
    public void Apply(PageApplicationModel model)
    {
        model.Filters.Add(new AddHeaderAttribute(
            "GlobalHeader", new string[] { "Global Header Value" }));
    }
}
```

`Program.cs`:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("InMemoryDb"));

builder.Services.AddRazorPages(options =>
   {
       options.Conventions.Add(new GlobalTemplatePageRouteModelConvention());
```

Request the sample's About page at `localhost:{port}/About` and inspect the headers to view the result:

### Add a handler model convention to all pages

Use `Microsoft.AspNetCore.Mvc.RazorPages.RazorPagesOptions.Conventions` to create and add an `Microsoft.AspNetCore.Mvc.ApplicationModels.IPageHandlerModelConvention` to the collection of `Microsoft.AspNetCore.Mvc.ApplicationModels.IPageConvention` instances that are applied during page handler model construction.

```csharp
public class GlobalPageHandlerModelConvention
    : IPageHandlerModelConvention
{
    public void Apply(PageHandlerModel model)
    {
        // Access the PageHandlerModel
    }
}
```
