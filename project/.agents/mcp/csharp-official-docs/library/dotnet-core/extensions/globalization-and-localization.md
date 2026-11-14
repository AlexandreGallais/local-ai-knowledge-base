---
title: "Globalize and localize .NET applications"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/globalization-and-localization.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Globalize and localize .NET applications

Developing a world-ready application, including an application that can be localized into one or more languages, involves three steps: globalization, localizability review, and localization.

Globalization

This step involves designing and coding an application that is culture-neutral and language-neutral, and that supports localized user interfaces and regional data for all users. It involves making design and programming decisions that are not based on culture-specific assumptions. While a globalized application is not localized, it nevertheless is designed and written so that it can be subsequently localized into one or more languages with relative ease.

Localizability review

This step involves reviewing an application's code and design to ensure that it can be localized easily and to identify potential roadblocks for localization, and verifying that the application's executable code is separated from its resources. If the globalization stage was effective, the localizability review will confirm the design and coding choices made during globalization. The localizability stage may also identify any remaining issues so that an application's source code doesn't have to be modified during the localization stage.

Localization

This step involves customizing an application for specific cultures or regions. If the globalization and localizability steps have been performed correctly, localization consists primarily of translating the user interface.

Following these three steps provides two advantages:

- It frees you from having to retrofit an application that is designed to support a single culture, such as U.S. English, to support additional cultures.

- It results in localized applications that are more stable and have fewer bugs.

.NET provides extensive support for the development of world-ready and localized applications. In particular, many type members in the .NET class library aid globalization by returning values that reflect the conventions of either the current user's culture or a specified culture. Also, .NET supports satellite assemblies, which facilitate the process of localizing an application.

## In this section

Globalization

Discusses the first stage of creating a world-ready application, which involves designing and coding an application that is culture-neutral and language-neutral.

.NET globalization and ICU

Describes how .NET globalization uses International Components for Unicode (ICU).

Localizability review

Discusses the second stage of creating a localized application, which involves identifying potential roadblocks to localization.

Localization

Discusses the final stage of creating a localized application, which involves customizing an application's user interface for specific regions or cultures.

Culture-insensitive string operations

Describes how to use .NET methods and classes that are culture-sensitive by default to obtain culture-insensitive results.

Best practices for developing world-ready applications

Describes the best practices to follow for globalization, localization, and developing world-ready ASP.NET applications.

## Reference

- `System.Globalization` namespace

   Contains classes that define culture-related information, including the language, the country/region, the calendars in use, the format patterns for dates, currency, and numbers, and the sort order for strings.

- `System.Resources` namespace

   Provides classes for creating, manipulating, and using resources.

- `System.Text` namespace

   Contains classes representing ASCII, ANSI, Unicode, and other character encodings.

- Resgen.exe (Resource File Generator)

   Describes how to use Resgen.exe to convert .txt files and XML-based resource format (.resx) files to common language runtime binary .resources files.

- Winres.exe (Windows Forms Resource Editor)

   Describes how to use Winres.exe to localize Windows Forms forms.
