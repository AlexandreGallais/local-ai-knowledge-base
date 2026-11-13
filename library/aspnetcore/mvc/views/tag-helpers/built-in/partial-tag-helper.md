---
title: "Partial Tag Helper in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/mvc/views/tag-helpers/built-in/partial-tag-helper.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Partial Tag Helper in ASP.NET Core

By Scott Addie

For an overview of Tag Helpers, see Tag Helpers in ASP.NET Core.

View or download sample code (how to download)

## Overview

The Partial Tag Helper is used for rendering a partial view in Razor Pages and MVC apps. Consider that it:

* Requires ASP.NET Core 2.1 or later.
* Is an alternative to HTML Helper syntax.
* Renders the partial view asynchronously.

The HTML Helper options for rendering a partial view include:

* `@await Html.PartialAsync`
* `@await Html.RenderPartialAsync`
* `@Html.Partial`
* `@Html.RenderPartial`

The *Product* model is used in samples throughout this document:

```csharp
namespace TagHelpersBuiltIn.Models
{
    public class Product
    {
        public int Number { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
```

An inventory of the Partial Tag Helper attributes follows.

## name

The `name` attribute is required. It indicates the name or the path of the partial view to be rendered. When a partial view name is provided, the view discovery process is initiated. That process is bypassed when an explicit path is provided. For all acceptable `name` values, see Partial view discovery.

The following markup uses an explicit path, indicating that `_ProductPartial.cshtml` is to be loaded from the *Shared* folder. Using the for attribute, a model is passed to the partial view for binding.

```cshtml
<partial name="Shared/_ProductPartial.cshtml" for="Product">
```

## for

The `for` attribute assigns a `Microsoft.AspNetCore.Mvc.ViewFeatures.ModelExpression` to be evaluated against the current model. A `ModelExpression` infers the `@Model.` syntax. For example, `for="Product"` can be used instead of `for="@Model.Product"`. This default inference behavior is overridden by using the `@` symbol to define an inline expression.

The following markup loads `_ProductPartial.cshtml`:

```cshtml
<partial name="_ProductPartial" for="Product">
```

The partial view is bound to the associated page model's `Product` property:

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using TagHelpersBuiltIn.Models;

namespace TagHelpersBuiltIn.Pages
{
    public class ProductModel : PageModel
    {
        public Product Product { get; set; }

        public void OnGet()
        {
            Product = new Product
            {
                Number = 1,
                Name = "Test product",
                Description = "This is a test product"
            };
        }
    }
}
```

## model

The `model` attribute assigns a model instance to pass to the partial view. The `model` attribute can't be used with the for attribute.

When neither `for` nor `model` is specified, the Partial Tag Helper falls back to passing the calling view's model (`ViewContext.ViewData.Model`) to the partial view.

In the following markup, a new `Product` object is instantiated and passed to the `model` attribute for binding:

```cshtml
<partial name="_ProductPartial"
         model='new Product { Number = 1, Name = "Test product", Description = "This is a test" }'>
```

## view-data

The `view-data` attribute assigns a `Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary` to pass to the partial view. The following markup makes the entire ViewData collection accessible to the partial view:

```cshtml
@{
    ViewData["IsNumberReadOnly"] = true;
}

<partial name="_ProductViewDataPartial" for="Product" view-data="ViewData">
```

In the preceding code, the `IsNumberReadOnly` key value is set to `true` and added to the ViewData collection. Consequently, `ViewData["IsNumberReadOnly"]` is made accessible within the following partial view:

```cshtml
@model TagHelpersBuiltIn.Models.Product

<div class="form-group">
    <label asp-for="Number"></label>
    @if ((bool)ViewData["IsNumberReadOnly"])
    {
        <input asp-for="Number" type="number" class="form-control" readonly />
    }
    else
    {
        <input asp-for="Number" type="number" class="form-control" />
    }
</div>
<div class="form-group">
    <label asp-for="Name"></label>
    <input asp-for="Name" type="text" class="form-control" />
</div>
<div class="form-group">
    <label asp-for="Description"></label>
    <textarea asp-for="Description" rows="4" cols="50" class="form-control"></textarea>
</div>
```

In this example, the value of `ViewData["IsNumberReadOnly"]` determines whether the *Number* field is displayed as read only.

## Migrate from an HTML Helper

Consider the following asynchronous HTML Helper example. A collection of products is iterated and displayed. Per the `PartialAsync` method's first parameter, the `_ProductPartial.cshtml` partial view is loaded. An instance of the `Product` model is passed to the partial view for binding.

```cshtml
@foreach (var product in Model.Products)
{
    @await Html.PartialAsync("_ProductPartial", product)
}
```

The following Partial Tag Helper achieves the same asynchronous rendering behavior as the `PartialAsync` HTML Helper. The `model` attribute is assigned a `Product` model instance for binding to the partial view.

```cshtml
@foreach (var product in Model.Products)
{
    <partial name="_ProductPartial" model="@product" />
}
```

## Related content

* Partial views in ASP.NET Core
* Views in ASP.NET Core MVC
