---
title: "Razor Pages route and app conventions in ASP.NET Core (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/razor-pages/razor-pages-conventions.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Razor Pages route and app conventions in ASP.NET Core (part 2 of 2)

## Page route action conventions

The default route model provider that derives from `Microsoft.AspNetCore.Mvc.ApplicationModels.IPageRouteModelProvider` invokes conventions which are designed to provide extensibility points for configuring page routes.

### Folder route model convention

Use `Microsoft.AspNetCore.Mvc.ApplicationModels.PageConventionCollection.AddFolderRouteModelConvention*` to create and add an `Microsoft.AspNetCore.Mvc.ApplicationModels.IPageRouteModelConvention` that invokes an action on the `Microsoft.AspNetCore.Mvc.ApplicationModels.PageRouteModel` for all of the pages under the specified folder.

The sample app uses `Microsoft.AspNetCore.Mvc.ApplicationModels.PageConventionCollection.AddFolderRouteModelConvention*` to add an `{otherPagesTemplate?}` route template to the pages in the *OtherPages* folder:

```csharp
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
```

The `Microsoft.AspNetCore.Mvc.ApplicationModels.AttributeRouteModel.Order` property for the `Microsoft.AspNetCore.Mvc.ApplicationModels.AttributeRouteModel` is set to `2`. This ensures that the template for `{globalTemplate?}` (set earlier in the topic to `1`) is given priority for the first route data value position when a single route value is provided. If a page in the *Pages/OtherPages* folder is requested with a route parameter value (for example, `/OtherPages/Page1/RouteDataValue`), "RouteDataValue" is loaded into `RouteData.Values["globalTemplate"]` (`Order = 1`) and not `RouteData.Values["otherPagesTemplate"]` (`Order = 2`) due to setting the `Order` property.

Wherever possible, don't set the `Order`, which results in `Order = 0`. Rely on routing to select the correct route.

Request the sample's Page1 page at `localhost:5000/OtherPages/Page1/GlobalRouteValue/OtherPagesRouteValue` and inspect the result:

### Page route model convention

Use `Microsoft.AspNetCore.Mvc.ApplicationModels.PageConventionCollection.AddPageRouteModelConvention*` to create and add an `Microsoft.AspNetCore.Mvc.ApplicationModels.IPageRouteModelConvention` that invokes an action on the `Microsoft.AspNetCore.Mvc.ApplicationModels.PageRouteModel` for the page with the specified name.

The sample app uses `AddPageRouteModelConvention` to add an `{aboutTemplate?}` route template to the About page:

```csharp
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
```

The `Microsoft.AspNetCore.Mvc.ApplicationModels.AttributeRouteModel.Order` property for the `Microsoft.AspNetCore.Mvc.ApplicationModels.AttributeRouteModel` is set to `2`. This ensures that the template for `{globalTemplate?}` (set earlier in the topic to `1`) is given priority for the first route data value position when a single route value is provided. If the About page is requested with a route parameter value at `/About/RouteDataValue`, "RouteDataValue" is loaded into `RouteData.Values["globalTemplate"]` (`Order = 1`) and not `RouteData.Values["aboutTemplate"]` (`Order = 2`) due to setting the `Order` property.

Wherever possible, don't set the `Order`, which results in `Order = 0`. Rely on routing to select the correct route.

Request the sample's About page at `localhost:{port}/About/GlobalRouteValue/AboutRouteValue` and inspect the result:

The logger output displays:

```dotnetcli
info: SampleApp.Pages.AboutModel[0]
       /About/GlobalRouteValue/AboutRouteValue   Order = 2 Template = About/{globalTemplate?}/{aboutTemplate?}
```

## Use a parameter transformer to customize page routes

See Parameter transformers.

## Configure a page route

Use `Microsoft.Extensions.DependencyInjection.PageConventionCollectionExtensions.AddPageRoute*` to configure a route to a page at the specified page path. Generated links to the page use the specified route. `Microsoft.Extensions.DependencyInjection.PageConventionCollectionExtensions.AddPageRoute*` uses `Microsoft.AspNetCore.Mvc.ApplicationModels.PageConventionCollection.AddPageRouteModelConvention*` to establish the route.

The sample app creates a route to `/TheContactPage` for the `Contact` Razor Page:

```csharp
options.Conventions.AddPageRoute("/Contact", "TheContactPage/{text?}");
```

The `Contact` page can also be reached at `/`Contact1` via its default route.

The sample app's custom route to the `Contact` page allows for an optional `text` route segment (`{text?}`). The page also includes this optional segment in its `@page` directive in case the visitor accesses the page at its `/Contact` route:

```cshtml
﻿@page "{text?}"
@model ContactModel
@{
    ViewData["Title"] = "Contact";
}

<h1>@ViewData["Title"]</h1>
<h2>@Model.Message</h2>

<address>
    One Microsoft Way<br>
    Redmond, WA 98052-6399<br>
    <abbr title="Phone">P:</abbr>
    425.555.0100
</address>

<address>
    <strong>Support:</strong> <a href="mailto:user@example.com">user@example.com</a><br>
    <strong>Marketing:</strong> <a href="mailto:user@example.com">user@example.com</a>
</address>

<p>@Model.RouteDataTextTemplateValue</p>
```

Note that the URL generated for the **Contact** link in the rendered page reflects the updated route:

Visit the `Contact` page at either its ordinary route, `/Contact`, or the custom route, `/TheContactPage`. If you supply an additional `text` route segment, the page shows the HTML-encoded segment that you provide:

## Page model action conventions

The default page model provider that implements `Microsoft.AspNetCore.Mvc.ApplicationModels.IPageApplicationModelProvider` invokes conventions which are designed to provide extensibility points for configuring page models. These conventions are useful when building and modifying page discovery and processing scenarios.

For the examples in this section, the sample app uses an `AddHeaderAttribute` class, which is a `Microsoft.AspNetCore.Mvc.Filters.ResultFilterAttribute`, that applies a response header:

```csharp
public class AddHeaderAttribute : ResultFilterAttribute
{
    private readonly string _name;
    private readonly string[] _values;

    public AddHeaderAttribute(string name, string[] values)
    {
        _name = name;
        _values = values;
    }

    public override void OnResultExecuting(ResultExecutingContext context)
    {
        context.HttpContext.Response.Headers.Add(_name, _values);
        base.OnResultExecuting(context);
    }
}
```

Using conventions, the sample demonstrates how to apply the attribute to all of the pages in a folder and to a single page.

**Folder app model convention**

Use `Microsoft.AspNetCore.Mvc.ApplicationModels.PageConventionCollection.AddFolderApplicationModelConvention*` to create and add an `Microsoft.AspNetCore.Mvc.ApplicationModels.IPageApplicationModelConvention` that invokes an action on `Microsoft.AspNetCore.Mvc.ApplicationModels.PageApplicationModel` instances for all pages under the specified folder.

The sample demonstrates the use of `AddFolderApplicationModelConvention` by adding a header, `OtherPagesHeader`, to the pages inside the *OtherPages* folder of the app:

```csharp
options.Conventions.AddFolderApplicationModelConvention("/OtherPages", model =>
{
    model.Filters.Add(new AddHeaderAttribute(
        "OtherPagesHeader", new string[] { "OtherPages Header Value" }));
});
```

Request the sample's Page1 page at `localhost:5000/OtherPages/Page1` and inspect the headers to view the result:

**Page app model convention**

Use `Microsoft.AspNetCore.Mvc.ApplicationModels.PageConventionCollection.AddPageApplicationModelConvention*` to create and add an `Microsoft.AspNetCore.Mvc.ApplicationModels.IPageApplicationModelConvention` that invokes an action on the `Microsoft.AspNetCore.Mvc.ApplicationModels.PageApplicationModel` for the page with the specified name.

The sample demonstrates the use of `AddPageApplicationModelConvention` by adding a header, `AboutHeader`, to the About page:

```csharp
options.Conventions.AddPageApplicationModelConvention("/About", model =>
{
    model.Filters.Add(new AddHeaderAttribute(
        "AboutHeader", new string[] { "About Header Value" }));
});
```

Request the sample's About page at `localhost:5000/About` and inspect the headers to view the result:

**Configure a filter**

`Microsoft.Extensions.DependencyInjection.PageConventionCollectionExtensions.ConfigureFilter*` configures the specified filter to apply. You can implement a filter class, but the sample app shows how to implement a filter in a lambda expression, which is implemented behind-the-scenes as a factory that returns a filter:

```csharp
options.Conventions.ConfigureFilter(model =>
{
    if (model.RelativePath.Contains("OtherPages/Page2"))
    {
        return new AddHeaderAttribute(
            "OtherPagesPage2Header",
            new string[] { "OtherPages/Page2 Header Value" });
    }
    return new EmptyFilter();
});
```

The page app model is used to check the relative path for segments that lead to the Page2 page in the *OtherPages* folder. If the condition passes, a header is added. If not, the `EmptyFilter` is applied.

`EmptyFilter` is an Action filter. Since Action filters are ignored by Razor Pages, the `EmptyFilter` has no effect as intended if the path doesn't contain `OtherPages/Page2`.

Request the sample's Page2 page at `localhost:5000/OtherPages/Page2` and inspect the headers to view the result:

**Configure a filter factory**

`Microsoft.Extensions.DependencyInjection.PageConventionCollectionExtensions.ConfigureFilter*` configures the specified factory to apply filters to all Razor Pages.

The sample app provides an example of using a filter factory by adding a header, `FilterFactoryHeader`, with two values to the app's pages:

```csharp
options.Conventions.ConfigureFilter(new AddHeaderWithFactory());
```

`AddHeaderWithFactory.cs`:

```csharp
public class AddHeaderWithFactory : IFilterFactory
{
    // Implement IFilterFactory
    public IFilterMetadata CreateInstance(IServiceProvider serviceProvider)
    {
        return new AddHeaderFilter();
    }

    private class AddHeaderFilter : IResultFilter
    {
        public void OnResultExecuting(ResultExecutingContext context)
        {
            context.HttpContext.Response.Headers.Add(
                "FilterFactoryHeader", 
                new string[] 
                { 
                    "Filter Factory Header Value 1",
                    "Filter Factory Header Value 2"
                });
        }

        public void OnResultExecuted(ResultExecutedContext context)
        {
        }
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
}
```

Request the sample's About page at `localhost:5000/About` and inspect the headers to view the result:

## MVC Filters and the Page filter (IPageFilter)

MVC Action filters are ignored by Razor Pages, since Razor Pages use handler methods. Other types of MVC filters are available for you to use: Authorization, Exception, Resource, and Result. For more information, see the Filters topic.

The Page filter (`Microsoft.AspNetCore.Mvc.Filters.IPageFilter`) is a filter that applies to Razor Pages. For more information, see Filter methods for Razor Pages.

## Additional resources

* Razor Pages Routing
* Razor Pages authorization conventions in ASP.NET Core
* Areas in ASP.NET Core
