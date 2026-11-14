---
title: "ASP.NET Core Blazor globalization and localization (part 1 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/globalization-localization.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor globalization and localization

This article explains how to render globalized and localized content to users in different cultures and languages.

## Globalization and localization

For globalization, Blazor provides number and date formatting. For localization, Blazor renders content using the .NET Resources system.

A limited set of ASP.NET Core's localization features are supported:

✔️Supported: `Microsoft.Extensions.Localization.IStringLocalizer` and `Microsoft.Extensions.Localization.IStringLocalizer`1` are supported in Blazor apps.

❌Not supported: `Microsoft.AspNetCore.Mvc.Localization.IHtmlLocalizer` and `Microsoft.AspNetCore.Mvc.Localization.IViewLocalizer` are ASP.NET Core MVC features and *not supported* in Blazor apps.

For Blazor apps, localized validation messages for forms validation using data annotations are supported through two paths:

* The static resource path using `System.ComponentModel.DataAnnotations.DisplayAttribute.ResourceType` for display names and `System.ComponentModel.DataAnnotations.ValidationAttribute.ErrorMessageResourceType` for localized error messages. This approach is supported in every release.
* `Microsoft.Extensions.Validation`, which resolves validation messages and display names through `Microsoft.Extensions.Localization.IStringLocalizer`. Available for Blazor apps that enable the validation pipeline with `AddValidation()`. For details, see Validation in ASP.NET Core.

This article describes how to use Blazor's globalization and localization features based on:

* The `Accept-Language` header, which is set by the browser based on a user's language preferences in browser settings.
* A culture set by the app not based on the value of the `Accept-Language` header. The setting can be static for all users or dynamic based on app logic. When the setting is based on the user's preference, the setting is usually saved for reload on future visits.

For additional general information, see the following resources:

* Globalization and localization in ASP.NET Core
* .NET Fundamentals: Globalization
* .NET Fundamentals: Localization

Often, the terms *language* and *culture* are used interchangeably when dealing with globalization and localization concepts.

In this article, *language* refers to selections made by a user in their browser's settings. The user's language selections are submitted in browser requests in the `Accept-Language` header. Browser settings usually use the word "language" in the UI.

*Culture* pertains to members of .NET and Blazor API. For example, a user's request can include the `Accept-Language` header specifying a *language* from the user's perspective, but the app ultimately sets the `System.Globalization.CultureInfo.CurrentCulture` ("culture") property from the language that the user requested. API usually uses the word "culture" in its member names.

The guidance in this article doesn't cover setting the page's HTML language attribute (`<html lang="...">`), which accessibility tools use. You can set the value statically by assigning a language to the `lang` attribute of the `<html>` tag or to `document.documentElement.lang` in JavaScript. You can dynamically set the value of `document.documentElement.lang` with JS interop.

> **Note:**
> The code examples in this article adopt nullable reference types (NRTs) and .NET compiler null-state static analysis, which are supported in ASP.NET Core in .NET 6 or later. When targeting .NET 5 or earlier, remove the null type designation (`?`) from the article's examples.

## Globalization

The `@bind` attribute directive applies formats and parses values for display based on the user's first preferred language that the app supports. `@bind` supports the `@bind:culture` parameter to provide a `System.Globalization.CultureInfo` for parsing and formatting a value.

The current culture can be accessed from the `System.Globalization.CultureInfo.CurrentCulture` property.

`System.Globalization.CultureInfo.InvariantCulture` is used for the following field types (``, where the `{TYPE}` placeholder is the type):

* `date`
* `number`

The preceding field types:

* Are displayed using their appropriate browser-based formatting rules.
* Can't contain free-form text.
* Provide user interaction characteristics based on the browser's implementation.

Blazor provides built-in support to render values in the current culture. Therefore, specifying a culture with `@bind:culture` isn't recommended when using the `date` and `number` field types.

The following field types have specific formatting requirements and aren't supported by all of the major browsers, so they aren't supported by Blazor:

* `datetime-local`
* `month`
* `week`

For current browser support of the preceding types, see Can I use.

By default, Blazor loads a subset of globalization data that contains the app's culture. To load all globalization data, set `<BlazorWebAssemblyLoadAllGlobalizationData>` to `true` in the app's project file (`.csproj`):

```xml
<PropertyGroup>
  <BlazorWebAssemblyLoadAllGlobalizationData>true</BlazorWebAssemblyLoadAllGlobalizationData>
</PropertyGroup>
```

## .NET globalization and International Components for Unicode (ICU) support (Blazor WebAssembly)

Blazor WebAssembly uses a reduced globalization API and set of built-in International Components for Unicode (ICU) locales.

In WebAssembly (Wasm) apps, when globalization invariant mode is disabled, an ICU data file is loaded. There are four basic types of these files:

* `icudt.dat`: Full data
* `icudt_EFIGS.dat`: Data for locales: `en-*`, `fr-FR`, `es-ES`, `it-IT`, and `de-DE`.
* `icudt_CJK.dat`: Data for locales: `en-*`, `ja`, `ko`, and `zh-*`.
* `icudt_no_CJK.dat`: Data for all locales from `icudt.dat`, excluding `ja`, `ko`, and `zh-*`.

Specify one file to load with the `<BlazorIcuDataFileName>` MSBuild property in the app's project file (`.csproj`). The following example loads the `icudt_no_CJK.dat` file:

```xml
<PropertyGroup>
  <BlazorIcuDataFileName>icudt_no_CJK.dat</BlazorIcuDataFileName>
</PropertyGroup>
```

`<BlazorIcuDataFileName>` only accepts a single file. The file can be a custom file created by the developer. To create a custom ICU file, see WASM Globalization Icu: Custom ICU.

If a file isn't specified with `<BlazorIcuDataFileName>`, the app's culture is checked, and the corresponding ICU file is loaded for its culture. For example, the `en-US` culture results in loading the `icudt_EFIGS.dat` file. For `zh-CN`, the `icudt_CJK.dat` file is used.

For more information, see .NET globalization and ICU: ICU on WebAssembly.

## Invariant globalization

*This section only applies to client-side Blazor scenarios.*

If the app doesn't require localization, configure the app to support the invariant culture, which is generally based on United States English (`en-US`). Using invariant globalization reduces the app's download size and results in faster app startup. Set the `InvariantGlobalization` property to `true` in the app's project file (`.csproj`):

```xml
<PropertyGroup>
  <InvariantGlobalization>true</InvariantGlobalization>
</PropertyGroup>
```

Alternatively, configure invariant globalization with the following approaches:

* In `runtimeconfig.json`:

  ```json
  {
    "runtimeOptions": {
      "configProperties": {
        "System.Globalization.Invariant": true
      }
    }
  }
  ```

* With an environment variable:

  * Key: `DOTNET_SYSTEM_GLOBALIZATION_INVARIANT`
  * Value: `true` or `1`

For more information, see Runtime configuration options for globalization (.NET documentation).

## Timezone information

*This section only applies to client-side Blazor scenarios.*

Adopting invariant globalization only results in using non-localized timezone names. To trim timezone code and data, which reduces the app's download size and results in faster app startup, apply the `<InvariantTimezone>` MSBuild property with a value of `true` in the app's project file:

```xml
<PropertyGroup>
  <InvariantTimezone>true</InvariantTimezone>
</PropertyGroup>
```

> **Note:**
> `<BlazorEnableTimeZoneSupport>` overrides an earlier `<InvariantTimezone>` setting. We recommend removing the `<BlazorEnableTimeZoneSupport>` setting.

## Client-side prerendering in a Blazor Web App preserves the server's culture

By default, client-side prerendering on the server (`.Client` project in a Blazor Web App) persists the server's `System.Globalization.CultureInfo.CurrentCulture` and `System.Globalization.CultureInfo.CurrentUICulture` into component state and applies them on the client before satellite assemblies load.

Apps that require the client to choose a culture independently of the server can opt out with `WebAssemblyComponentsOptions.UseCultureFromServer` in the Blazor Web App's `Program` file:

```csharp
builder.Services.AddRazorComponents()
    .AddInteractiveWebAssemblyComponents(options =>
    {
        options.UseCultureFromServer = false;
    });
```

## Demonstration component

The following `CultureExample1` component can be used to demonstrate Blazor globalization and localization concepts covered by this article.

`CultureExample1.razor`:

```razor
@page "/culture-example-1"
@using System.Globalization

<h1>Culture Example 1</h1>

<ul>
    <li><b>CurrentCulture</b>: @CultureInfo.CurrentCulture</li>
    <li><b>CurrentUICulture</b>: @CultureInfo.CurrentUICulture</li>
</ul>

<h2>Rendered values</h2>

<ul>
    <li><b>Date</b>: @dt</li>
    <li><b>Number</b>: @number.ToString("N2")</li>
</ul>

<h2><code>&lt;input&gt;</code> elements that don't set a <code>type</code></h2>

<p>
    The following <code>&lt;input&gt;</code> elements use
    <code>CultureInfo.CurrentCulture</code>.
</p>

<ul>
    <li><label><b>Date:</b> <input @bind="dt" /></label></li>
    <li><label><b>Number:</b> <input @bind="number" /></label></li>
</ul>

<h2><code>&lt;input&gt;</code> elements that set a <code>type</code></h2>

<p>
    The following <code>&lt;input&gt;</code> elements use
    <code>CultureInfo.InvariantCulture</code>.
</p>

<ul>
    <li><label><b>Date:</b> <input type="date" @bind="dt" /></label></li>
    <li><label><b>Number:</b> <input type="number" @bind="number" /></label></li>
</ul>

@code {
    private DateTime dt = DateTime.Now;
    private double number = 1999.69;
}
```

The number string format (`N2`) in the preceding example (`.ToString("N2")`) is a standard .NET numeric format specifier. The `N2` format is supported for all numeric types, includes a group separator, and renders up to two decimal places.

Optionally, add a menu item to the navigation in the `NavMenu` component (`NavMenu.razor`) for the `CultureExample1` component.
