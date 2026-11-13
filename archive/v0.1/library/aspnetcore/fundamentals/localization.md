---
title: "Globalization and localization in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/localization.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Globalization and localization in ASP.NET Core

-->
-->

By Rick Anderson, Damien Bowden, Bart Calixto, Nadeem Afana, and Hisham Bin Ateya

A multilingual website allows a website to reach a wider audience. ASP.NET Core provides services and middleware for localizing into different languages and cultures.

For Blazor localization guidance, which adds to or supersedes the guidance in this article, see ASP.NET Core Blazor globalization and localization.

## Terms

* Globalization (G11N): The process of making an app support different languages and regions. The abbreviation comes from the first and last letters and the number of letters between them.
* Localization (L10N): The process of customizing a globalized app for specific languages and regions.
* Internationalization (I18N): Both globalization and localization.
* Culture: A language and, optionally, a region.
* Neutral culture: A culture that has a specified language, but not a region (for example "en", "es").
* Specific culture: A culture that has a specified language and region (for example, "en-US", "en-GB", "es-CL").
* Parent culture: The neutral culture that contains a specific culture (for example, "en" is the parent culture of "en-US" and "en-GB").
* Locale: A locale is the same as a culture.

## Language and country/region codes

The RFC 4646 format for the culture name is `<language code>-<country/region code>`, where `<language code>` identifies the language and `<country/region code>` identifies the subculture. For example, `es-CL` for Spanish (Chile), `en-US` for English (United States), and `en-AU` for English (Australia). RFC 4646 is a combination of an ISO 639 two-letter lowercase culture code associated with a language and an ISO 3166 two-letter uppercase subculture code associated with a country or region. For more information, see `System.Globalization.CultureInfo`.

## Tasks to localize an app

Globalizing and localizing an app involves the following tasks:

* Make an ASP.NET Core app's content localizable.
* Provide localized resources for the cultures the app supports
* Implement a strategy to select the culture for each request

View or download sample code (how to download)

## Related content

* Url culture provider using middleware as filters in ASP.NET Core
* Applying the RouteDataRequest CultureProvider globally with middleware as filters
* `IStringLocalizer` : Uses the `System.Resources.ResourceManager` and `System.Resources.ResourceReader` to provide culture-specific resources at run time. The interface has an indexer and an `IEnumerable` for returning localized strings.
* `IHtmlLocalizer`: For resources that contain HTML.
* View and DataAnnotations
* Troubleshoot ASP.NET Core localization
* Globalizing and localizing .NET applications
* Resources in .resx Files
* Localization & Generics
* Tim Heuer's ResX Viewer and Editor (Visual Studio Code)
