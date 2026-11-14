---
title: "Make an ASP.NET Core app's content localizable"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/localization/make-content-localizable.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Make an ASP.NET Core app's content localizable

By Hisham Bin Ateya, Damien Bowden, Bart Calixto and Nadeem Afana

One task for localizing an app is to wrap localizable content with code that facilitates replacing that content for different cultures.

## `IStringLocalizer`

`Microsoft.Extensions.Localization.IStringLocalizer` and `Microsoft.Extensions.Localization.IStringLocalizer`1` were architected to improve productivity when developing localized apps. `IStringLocalizer` uses the `System.Resources.ResourceManager` and `System.Resources.ResourceReader` to provide culture-specific resources at run time. The interface has an indexer and an `IEnumerable` for returning localized strings. `IStringLocalizer` doesn't require storing the default language strings in a resource file. You can develop an app targeted for localization and not need to create resource files early in development.

The following code example shows how to wrap the string "About Title" for localization.

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;

namespace Localization.Controllers;

[Route("api/[controller]")]
public class AboutController : Controller
{
    private readonly IStringLocalizer<AboutController> _localizer;

    public AboutController(IStringLocalizer<AboutController> localizer)
    {
        _localizer = localizer;
    }

    [HttpGet]
    public string Get()
    {
        return _localizer["About Title"];
    }
}
```

In the preceding code, the `IStringLocalizer<T>` implementation comes from Dependency Injection. If the localized value of "About Title" isn't found, then the indexer key is returned, that is, the string "About Title".

You can leave the default language literal strings in the app and wrap them in the localizer, so that you can focus on developing the app. You develop an app with your default language and prepare it for the localization step without first creating a default resource file.

Alternatively, you can use the traditional approach and provide a key to retrieve the default language string. For many developers, the new workflow of not having a default language *.resx* file and simply wrapping the string literals can reduce the overhead of localizing an app. Other developers prefer the traditional work flow as it can be easier to work with long string literals and easier to update localized strings.

## `IHtmlLocalizer`

Use the `Microsoft.AspNetCore.Mvc.Localization.IHtmlLocalizer`1` implementation for resources that contain HTML. `Microsoft.AspNetCore.Mvc.Localization.IHtmlLocalizer` HTML-encodes arguments that are formatted in the resource string, but doesn't HTML-encode the resource string itself. In the following highlighted code, only the value of the `name` parameter is HTML-encoded.

```csharp
using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Localization;

namespace Localization.Controllers;

public class BookController : Controller
{
    private readonly IHtmlLocalizer<BookController> _localizer;

    public BookController(IHtmlLocalizer<BookController> localizer)
    {
        _localizer = localizer;
    }

    public IActionResult Hello(string name)
    {
        ViewData["Message"] = _localizer["<b>Hello</b><i> {0}</i>", name];

        return View();
    }

    public IActionResult Index()
    {
        return View();
    }

    // Pass the requestCultureFeature and requestCulture objects to the view
    // so we can get Culture/UICulture information.
     
    public IActionResult About()
    {
        IRequestCultureFeature requestCultureFeature = HttpContext.Features.Get<IRequestCultureFeature>();
        RequestCulture requestCulture = requestCultureFeature.RequestCulture;
        ViewData["requestCultureFeature"] = requestCultureFeature;
        ViewData["requestCulture"] = requestCulture;
        ViewData["Message"] = _localizer["Your application description page."];

        return View();
    }

    public IActionResult Contact()
    {
        ViewData["Message"] = _localizer["Your contact page."];
        return View();
    }

    [HttpPost]
    public IActionResult SetLanguage(string culture, string returnUrl)
    {
        Response.Cookies.Append(
            CookieRequestCultureProvider.DefaultCookieName,
            CookieRequestCultureProvider.MakeCookieValue(new RequestCulture(culture)),
            new CookieOptions { Expires = DateTimeOffset.UtcNow.AddYears(1) }
        );

        return LocalRedirect(returnUrl);
    }

    public IActionResult Error()
    {
        return View();
    } 
}
```

***NOTE:*** Generally, only localize text, not HTML.

## `IStringLocalizerFactory`

At the lowest level, `Microsoft.Extensions.Localization.IStringLocalizerFactory` can be retrieved from of Dependency Injection:

```csharp
public class TestController : Controller
{
    private readonly IStringLocalizer _localizer;
    private readonly IStringLocalizer _localizer2;

    public TestController(IStringLocalizerFactory factory)
    {
        var type = typeof(SharedResource);
        var assemblyName = new AssemblyName(type.GetTypeInfo().Assembly.FullName);
        _localizer = factory.Create(type);
        _localizer2 = factory.Create("SharedResource", assemblyName.Name);
    }       

    public IActionResult About()
    {
        ViewData["Message"] = _localizer["Your application description page."] 
            + " loc 2: " + _localizer2["Your application description page."];

        return View();
    }
```

The preceding code demonstrates each of the two factory create methods.

## Shared resources

You can partition your localized strings by controller or area, or have just one container. In the sample app, a marker class named `SharedResource` is used for shared resources. The marker class is never called:

```csharp
// Dummy class to group shared resources

namespace Localization;

public class SharedResource
{
}
```

In the following sample, the `InfoController` and the `SharedResource` localizers are used:

```csharp
public class InfoController : Controller
{
    private readonly IStringLocalizer<InfoController> _localizer;
    private readonly IStringLocalizer<SharedResource> _sharedLocalizer;

    public InfoController(IStringLocalizer<InfoController> localizer,
                   IStringLocalizer<SharedResource> sharedLocalizer)
    {
        _localizer = localizer;
        _sharedLocalizer = sharedLocalizer;
    }

    public string TestLoc()
    {
        string msg = "Shared resx: " + _sharedLocalizer["Hello!"] +
                     " Info resx " + _localizer["Hello!"];
        return msg;
    }
```

## View localization

The `Microsoft.AspNetCore.Mvc.Localization.IViewLocalizer` service provides localized strings for a view. The `ViewLocalizer` class implements this interface and finds the resource location from the view file path. The following code shows how to use the default implementation of `IViewLocalizer`:

```cshtml
﻿@using Microsoft.AspNetCore.Mvc.Localization

@inject IViewLocalizer Localizer

@{
    ViewData["Title"] = Localizer["About"];
}
<h2>@ViewData["Title"].</h2>
<h3>@ViewData["Message"]</h3>

<p>@Localizer["Use this area to provide additional information."]</p>
```

The default implementation of `IViewLocalizer` finds the resource file based on the view's file name. There's no option to use a global shared resource file. `ViewLocalizer` implements the localizer using `IHtmlLocalizer`, so Razor doesn't HTML-encode the localized string. You can parameterize resource strings, and `IViewLocalizer` HTML-encodes the parameters but not the resource string. Consider the following Razor markup:

```cshtml
@Localizer["<i>Hello</i> <b>{0}!</b>", UserManager.GetUserName(User)]
```

A French resource file could contain the following values:

| Key                        | Value                         |
| -------------------------- | ----------------------------- |
| `Hello {0}!` | `Bonjour {0} !` |

The rendered view would contain the HTML markup from the resource file.

Generally, ***only localize text***, not HTML.

To use a shared resource file in a view, inject `IHtmlLocalizer<T>`:

```cshtml
﻿@using Microsoft.AspNetCore.Mvc.Localization
@using Localization.Services

@inject IViewLocalizer Localizer
@inject IHtmlLocalizer<SharedResource> SharedLocalizer

@{
    ViewData["Title"] = Localizer["About"];
}
<h2>@ViewData["Title"].</h2>

<h1>@SharedLocalizer["Hello!"]</h1>
```

## DataAnnotations localization

DataAnnotations error messages are localized with `IStringLocalizer<T>`. Using the option `ResourcesPath = "Resources"`, the error messages in `RegisterViewModel` can be stored in either of the following paths:

* *Resources/ViewModels.Account.RegisterViewModel.fr.resx*
* *Resources/ViewModels/Account/RegisterViewModel.fr.resx*

```csharp
using System.ComponentModel.DataAnnotations;

namespace Localization.ViewModels.Account;

public class RegisterViewModel
{
    [Required(ErrorMessage = "The Email field is required.")]
    [EmailAddress(ErrorMessage = "The Email field is not a valid email address.")]
    [Display(Name = "Email")]
    public string Email { get; set; }

    [Required(ErrorMessage = "<example-value>")]
    [StringLength(8, ErrorMessage = "The {0} must be at least {2} characters long.",
                                                                 MinimumLength = 6)]
    [DataType(DataType.Password)]
    [Display(Name = "<example-value>")]
    public string Password { get; set; }

    [DataType(DataType.Password)]
    [Display(Name = "<example-value>")]
    [Compare("<example-value>", ErrorMessage =
                            "<example-value>")]
    public string ConfirmPassword { get; set; }
}
```

Non-validation attributes are localized.

### How to use one resource string for multiple classes

The following code shows how to use one resource string for validation attributes with multiple classes:

```csharp
    services.AddMvc()
        .AddDataAnnotationsLocalization(options => {
            options.DataAnnotationLocalizerProvider = (type, factory) =>
                factory.Create(typeof(SharedResource));
        });
```

In the preceding code, `SharedResource` is the class corresponding to the *.resx* file where the validation messages are stored. With this approach, DataAnnotations only uses `SharedResource`, rather than the resource for each class.

## DataAnnotations localization in Minimal APIs and Blazor

Validation error messages and the display names of validated members are localized by `Microsoft.Extensions.Validation`, which is the validation pipeline used by Minimal APIs and Blazor forms.

Localization activates automatically when an `Microsoft.Extensions.Localization.IStringLocalizerFactory` is registered. Call `Microsoft.Extensions.DependencyInjection.LocalizationServiceCollectionExtensions.AddLocalization*` together with `Microsoft.Extensions.DependencyInjection.ValidationServiceCollectionExtensions.AddValidation*`:

```csharp
builder.Services.AddLocalization();
builder.Services.AddValidation();
```

For the message lookup key <example-value>, shared resource files, custom message formatting, and the full set of options, see Validation in ASP.NET Core.

The integration doesn't apply to MVC and Razor Pages apps. For those frameworks, see Model validation in ASP.NET Core MVC.

## Configure localization services

Localization services are configured in `Program.cs`:

```csharp
builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");

builder.Services.AddMvc()
    .AddViewLocalization(LanguageViewLocationExpanderFormat.Suffix)
    .AddDataAnnotationsLocalization();
```

* `Microsoft.Extensions.DependencyInjection.LocalizationServiceCollectionExtensions.AddLocalization*` adds the localization services to the services container, including implementations for `IStringLocalizer<T>` and `IStringLocalizerFactory`. The preceding code also sets the resources path to "Resources".

* `Microsoft.Extensions.DependencyInjection.MvcLocalizationMvcBuilderExtensions.AddViewLocalization*` adds support for localized view files. In this sample, view localization is based on the view file suffix. For example "fr" in the `Index.fr.cshtml` file.

* `Microsoft.Extensions.DependencyInjection.MvcDataAnnotationsMvcBuilderExtensions.AddDataAnnotationsLocalization*` adds support for localized `DataAnnotations` validation messages through `IStringLocalizer` abstractions.

> **Note:**
> You may not be able to enter decimal commas in decimal fields. To support jQuery validation for non-English locales that use a comma (",") for a decimal point, and non US-English date formats, you must take steps to globalize your app. See this GitHub comment 4076 for instructions on adding decimal comma.

## Next steps

Localizing an app also involves the following tasks:

* Provide localized resources for the languages and cultures the app supports
* Implement a strategy to select the language/culture for each request

## Related content

* Url culture provider using middleware as filters in ASP.NET Core
* Applying the RouteDataRequest CultureProvider globally with middleware as filters
* Globalization and localization in ASP.NET Core
* Provide localized resources for languages and cultures in an ASP.NET Core app
* Strategies for selecting language and culture in a localized ASP.NET Core app
* Troubleshoot ASP.NET Core localization
* Globalizing and localizing .NET applications
* Localization.StarterWeb project used in the article.
* Resources in .resx Files
* Localization & Generics
