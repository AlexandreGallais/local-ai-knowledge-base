---
title: "Strategies for selecting language and culture in a localized ASP.NET Core app"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/localization/select-language-culture.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Implement a strategy to select the language/culture for each request in a localized ASP.NET Core app

Hisham Bin Ateya, Damien Bowden, Bart Calixto, Nadeem Afana, and Rick Anderson

One task for localizing an app is to implement a strategy for selecting the appropriate culture for each response the app returns.

## Configure Localization middleware

The current culture on a request is set in the localization Middleware. The localization middleware is enabled in `Program.cs`. The localization middleware must be configured before any middleware that might check the request culture (for example, `app.UseMvcWithDefaultRoute()`).

```csharp
builder.Services.Configure<RequestLocalizationOptions>(options =>
{
    var supportedCultures = new[] { "en-US", "fr" };
    options.SetDefaultCulture(supportedCultures[0])
        .AddSupportedCultures(supportedCultures)
        .AddSupportedUICultures(supportedCultures);
});
```

`Microsoft.AspNetCore.Builder.ApplicationBuilderExtensions.UseRequestLocalization*` initializes a `Microsoft.AspNetCore.Builder.RequestLocalizationOptions` object. On every request the list of `Microsoft.AspNetCore.Localization.RequestCultureProvider` in the `Microsoft.AspNetCore.Builder.RequestLocalizationOptions` is enumerated and the first provider that can successfully determine the request culture is used. The default providers come from the `RequestLocalizationOptions` class:

1. `Microsoft.AspNetCore.Localization.QueryStringRequestCultureProvider`
1. `Microsoft.AspNetCore.Localization.CookieRequestCultureProvider`
1. `Microsoft.AspNetCore.Localization.AcceptLanguageHeaderRequestCultureProvider`

The default list goes from most specific to least specific. Later in the article you'll see how you can change the order and even add a custom culture provider. If none of the providers can determine the request culture, the `Microsoft.AspNetCore.Builder.RequestLocalizationOptions.DefaultRequestCulture` is used.

## QueryStringRequestCultureProvider

Some apps will use a query string to set the `System.Globalization.CultureInfo`. For apps that use the cookie or Accept-Language header approach, adding a query string to the URL is useful for debugging and testing code. By default, the `Microsoft.AspNetCore.Localization.QueryStringRequestCultureProvider` is registered as the first localization provider in the `RequestCultureProvider` list. You pass the query string parameters `culture` and `ui-culture`. The following example sets the specific culture (language and region) to Spanish/Mexico:

```
http://localhost:5000/?culture=es-MX&ui-culture=es-MX
```

If only `culture` or `ui-culture` is passed in, the query string provider sets both values using the one passed in. For example, setting just the culture will set both the `Culture` and the `UICulture`:

```
http://localhost:5000/?culture=es-MX
```

## CookieRequestCultureProvider

Production apps will often provide a mechanism to set the culture with the ASP.NET Core culture cookie. Use the `Microsoft.AspNetCore.Localization.CookieRequestCultureProvider.MakeCookieValue*` method to create a cookie.

The `Microsoft.AspNetCore.Localization.CookieRequestCultureProvider` `Microsoft.AspNetCore.Localization.CookieRequestCultureProvider.DefaultCookieName` returns the default cookie name used to track the user's preferred culture information. The default cookie name is `.AspNetCore.Culture`.

The cookie format is `c=%LANGCODE%|uic=%LANGCODE%`, where `c` is `Culture` and `uic` is `UICulture`, for example:

```
c=en-UK|uic=en-US
```

If only one of the cultures is provided and the other is empty, the provided culture is used for both culture and UI culture.

## The Accept-Language HTTP header

The Accept-Language header is settable in most browsers and was originally intended to specify the user's language. This setting indicates what the browser has been set to send or has inherited from the underlying operating system. The Accept-Language HTTP header from a browser request isn't an infallible way to detect the user's preferred language (see Setting language preferences in a browser). A production app should include a way for a user to customize their choice of culture.

## Set the Accept-Language HTTP header in Edge

1. Search **Settings** for **Preferred languages**.

1. The preferred languages are listed in the **Preferred languages** box.

1. Select **Add languages** to add to the list.

1. Select **More actions …** next to a language to change the order of preference.

## The Content-Language HTTP header

The Content-Language entity header:

* Is used to describe the languages intended for the audience.
* Allows a user to differentiate according to the users' own preferred language.

Entity headers are used in both HTTP requests and responses.

The `Content-Language` header can be added by setting the property `Microsoft.AspNetCore.Builder.RequestLocalizationOptions.ApplyCurrentCultureToResponseHeaders`.

Adding the `Content-Language` header:

* Allows the `Microsoft.AspNetCore.Localization.RequestLocalizationMiddleware` to set the `Content-Language` header with the `CurrentUICulture`.
* Eliminates the need to set the response header `Content-Language` explicitly.

```csharp
app.UseRequestLocalization(new RequestLocalizationOptions
{
    ApplyCurrentCultureToResponseHeaders = true
});
```

## Apply the RouteDataRequest CultureProvider

The `Microsoft.AspNetCore.Localization.Routing.RouteDataRequestCultureProvider` sets the culture based on the value of the `culture` route value. See Url culture provider using middleware as filters for information on:

* Using the middleware as filters feature of ASP.NET Core.
* How to use `RouteDataRequestCultureProvider` to set the culture of an app from the url.

See Applying the RouteDataRequest CultureProvider globally with middleware as filters for information on how to apply the `RouteDataRequestCultureProvider` globally.

## Use a custom provider

Suppose you want to let your customers store their language and culture in your databases. You could write a provider to look up these values for the user. The following code shows how to add a custom provider:

```csharp
private const string enUSCulture = "en-US";

services.Configure<RequestLocalizationOptions>(options =>
{
    var supportedCultures = new[]
    {
        new CultureInfo(enUSCulture),
        new CultureInfo("fr")
    };

    options.DefaultRequestCulture = new RequestCulture(culture: enUSCulture, uiCulture: enUSCulture);
    options.SupportedCultures = supportedCultures;
    options.SupportedUICultures = supportedCultures;

    options.AddInitialRequestCultureProvider(new CustomRequestCultureProvider(async context =>
    {
        // My custom request culture logic
        return await Task.FromResult(new ProviderCultureResult("en"));
    }));
});
```

Use `RequestLocalizationOptions` to add or remove localization providers.

## Change request culture providers order

`Microsoft.AspNetCore.Builder.RequestLocalizationOptions` has three default request culture providers: `Microsoft.AspNetCore.Localization.QueryStringRequestCultureProvider`, `Microsoft.AspNetCore.Localization.CookieRequestCultureProvider`, and `Microsoft.AspNetCore.Localization.AcceptLanguageHeaderRequestCultureProvider`. Use `RequestLocalizationOptions.RequestCultureProviders` property to change the order of these providers as shown in the following below:

```csharp
    app.UseRequestLocalization(options =>
    {
        var questStringCultureProvider = options.RequestCultureProviders[0];
        options.RequestCultureProviders.RemoveAt(0);
        options.RequestCultureProviders.Insert(1, questStringCultureProvider);
    });
```

In the preceding example, the order of `QueryStringRequestCultureProvider` and `CookieRequestCultureProvider` is switched, so the `RequestLocalizationMiddleware` looks for the cultures from the cookies first, then the query string.

As previously mentioned, add a custom provider via `Microsoft.AspNetCore.Builder.RequestLocalizationOptionsExtensions.AddInitialRequestCultureProvider*` which sets the order to `0`, so this provider takes the precedence over the others.

## User override culture

The RequestLocalizationOptions.CultureInfoUseUserOverride property allows the app to decide whether or not to use non-default Windows settings for the `System.Globalization.CultureInfo` `System.Globalization.CultureInfo.DateTimeFormat` and `System.Globalization.CultureInfo.NumberFormat` properties. This has ***no*** impact on Linux. This directly corresponds to `System.Globalization.CultureInfo.UseUserOverride`.

```csharp
    app.UseRequestLocalization(options =>
    {
        options.CultureInfoUseUserOverride = false;
    });
```

## Set the culture programmatically

This sample **Localization.StarterWeb** project on GitHub contains UI to set the `Culture`. The `Views/Shared/_SelectLanguagePartial.cshtml` file allows you to select the culture from the list of supported cultures:

```cshtml
﻿@using Microsoft.AspNetCore.Builder
@using Microsoft.AspNetCore.Http.Features
@using Microsoft.AspNetCore.Localization
@using Microsoft.AspNetCore.Mvc.Localization
@using Microsoft.Extensions.Options

@inject IViewLocalizer Localizer
@inject IOptions<RequestLocalizationOptions> LocOptions

@{
    var requestCulture = Context.Features.Get<IRequestCultureFeature>();
    var cultureItems = LocOptions.Value.SupportedUICultures
        .Select(c => new SelectListItem { Value = c.Name, Text = c.DisplayName })
        .ToList();
    var returnUrl = string.IsNullOrEmpty(Context.Request.Path) ? "~/" : $"~{Context.Request.Path.Value}";
}

<div title="@Localizer["Request culture provider:"] @requestCulture?.Provider?.GetType().Name">
    <form id="selectLanguage" asp-controller="Home" 
          asp-action="SetLanguage" asp-route-returnUrl="@returnUrl" 
          method="post" class="form-horizontal" role="form">
        <label asp-for="@requestCulture.RequestCulture.UICulture.Name">@Localizer["Language:"]</label> <select name="culture"
          onchange="this.form.submit();"
          asp-for="@requestCulture.RequestCulture.UICulture.Name" asp-items="cultureItems">
        </select>
    </form>
</div>
```

The `Views/Shared/_SelectLanguagePartial.cshtml` file is added to the `footer` section of the layout file so it will be available to all views:

```cshtml
<div class="container body-content" style="margin-top:60px">
    @RenderBody()
    <hr>
    <footer>
        <div class="row">
            <div class="col-md-6">
                <p>&copy; @System.DateTime.Now.Year - Localization</p>
            </div>
            <div class="col-md-6 text-right">
                @await Html.PartialAsync("_SelectLanguagePartial")
            </div>
        </div>
    </footer>
</div>
```

The `SetLanguage` method sets the culture cookie.

```csharp
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
```

You can't plug in the `_SelectLanguagePartial.cshtml` to sample code for this project. The **Localization.StarterWeb** project on GitHub has code to flow the `RequestLocalizationOptions` to a Razor partial through the Dependency Injection container.

## Model binding route data and query strings

See Globalization behavior of model binding route data and query strings.

## Next steps

Localizing an app also involves the following tasks:

* Make the app's content localizable.
* Provide localized resources for the languages and cultures the app supports

## Related content

* Url culture provider using middleware as filters in ASP.NET Core
* Applying the RouteDataRequest CultureProvider globally with middleware as filters
* Globalization and localization in ASP.NET Core
* Make an ASP.NET Core app's content localizable
* Provide localized resources for languages and cultures in an ASP.NET Core app
* Troubleshoot ASP.NET Core localization
* Globalizing and localizing .NET applications
* Localization.StarterWeb project used in the article.
* Resources in .resx Files
* Localization & Generics
