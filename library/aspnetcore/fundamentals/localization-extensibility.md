---
title: "Localization Extensibility"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/localization-extensibility.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Localization Extensibility

-->
-->

By Hisham Bin Ateya

This article:

* Lists the extensibility points on the localization APIs.
* Provides instructions on how to extend ASP.NET Core app localization.

## Extensible Points in Localization APIs

ASP.NET Core localization APIs are built to be extensible. Extensibility allows developers to customize the localization according to their needs. For instance, OrchardCore has a `POStringLocalizer`. `POStringLocalizer` describes in detail using Portable Object localization to use `PO` files to store localization resources.

This article lists the two main extensibility points that localization APIs provide:

* `Microsoft.AspNetCore.Localization.RequestCultureProvider`
* `Microsoft.Extensions.Localization.IStringLocalizer`

## Localization Culture Providers

ASP.NET Core localization APIs have four default providers that can determine the current culture of an executing request:

* `Microsoft.AspNetCore.Localization.QueryStringRequestCultureProvider`
* `Microsoft.AspNetCore.Localization.CookieRequestCultureProvider`
* `Microsoft.AspNetCore.Localization.AcceptLanguageHeaderRequestCultureProvider`
* `Microsoft.AspNetCore.Localization.CustomRequestCultureProvider`

The preceding providers are described in detail in the localization middleware documentation. If the default providers don't meet your needs, build a custom provider using one of the following approaches:

### Use CustomRequestCultureProvider

`Microsoft.AspNetCore.Localization.CustomRequestCultureProvider` provides a custom `Microsoft.AspNetCore.Localization.RequestCultureProvider` that uses a simple delegate to determine the current localization culture:

```csharp
options.AddInitialRequestCultureProvider(new CustomRequestCultureProvider(async context =>
{
    var currentCulture = "en";
    var segments = context.Request.Path.Value.Split(new char[] { '/' }, 
        StringSplitOptions.RemoveEmptyEntries);

    if (segments.Length > 1 && segments[0].Length == 2)
    {
        currentCulture = segments[0];
    }

    var requestCulture = new ProviderCultureResult(currentCulture);

    return Task.FromResult(requestCulture);
}));
```

### Use a new implementation of RequestCultureProvider

A new implementation of `Microsoft.AspNetCore.Localization.RequestCultureProvider` can be created that determines the request culture information from a custom source. For example, the custom source can be a configuration file or database.

The following example shows `AppSettingsRequestCultureProvider`, which extends the `Microsoft.AspNetCore.Localization.RequestCultureProvider` to determine the request culture information from `appsettings.json`:

```csharp
public class AppSettingsRequestCultureProvider : RequestCultureProvider
{
    public string CultureKey { get; set; } = "culture";

    public string UICultureKey { get; set; } = "ui-culture";

    public override Task<ProviderCultureResult> DetermineProviderCultureResult(HttpContext httpContext)
    {
        if (httpContext == null)
        {
            throw new ArgumentNullException();
        }

        var configuration = httpContext.RequestServices.GetService<IConfigurationRoot>();
        var culture = configuration[CultureKey];
        var uiCulture = configuration[UICultureKey];

        if (culture == null && uiCulture == null)
        {
            return Task.FromResult((ProviderCultureResult)null);
        }

        if (culture != null && uiCulture == null)
        {
            uiCulture = culture;
        }

        if (culture == null && uiCulture != null)
        {
            culture = uiCulture;
        }
        
        var providerResultCulture = new ProviderCultureResult(culture, uiCulture);

        return Task.FromResult(providerResultCulture);
    }
}
```

## Localization resources

ASP.NET Core localization provides `Microsoft.Extensions.Localization.ResourceManagerStringLocalizer`. `Microsoft.Extensions.Localization.ResourceManagerStringLocalizer` is an implementation of `Microsoft.Extensions.Localization.IStringLocalizer` that uses `resx` to store localization resources.

You aren't limited to using `resx` files. By implementing `IStringLocalizer`, any data source can be used.

The following example projects implement `Microsoft.Extensions.Localization.IStringLocalizer`:

* EFStringLocalizer
* JsonStringLocalizer
* SqlLocalizer
