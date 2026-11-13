---
title: "Breaking change: Localization: ResourceManagerWithCultureStringLocalizer class and WithCulture interface member removed"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/breaking-changes/5/localization-members-removed.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Localization: ResourceManagerWithCultureStringLocalizer class and WithCulture interface member removed

The `Microsoft.Extensions.Localization.ResourceManagerWithCultureStringLocalizer` class and `Microsoft.Extensions.Localization.ResourceManagerStringLocalizer.WithCulture` method were removed in .NET 5.

For context, see aspnet/Announcements#346 and dotnet/aspnetcore#3324. For discussion on this change, see dotnet/aspnetcore#7756.

## Version introduced

5.0

## Old behavior

The `ResourceManagerWithCultureStringLocalizer` class and the `ResourceManagerStringLocalizer.WithCulture` method are obsolete in .NET Core 3.0 and later.

## New behavior

The `ResourceManagerWithCultureStringLocalizer` class and the `ResourceManagerStringLocalizer.WithCulture` method have been removed in .NET 5. For an inventory of the changes made, see the pull request at dotnet/extensions#2562.

## Reason for change

The `ResourceManagerWithCultureStringLocalizer` class and `ResourceManagerStringLocalizer.WithCulture` method were often sources of confusion for users of localization. The confusion was especially high when creating a custom `Microsoft.Extensions.Localization.IStringLocalizer` implementation. This class and method give consumers the impression that an `IStringLocalizer` instance is expected to be "per-language, per-resource". In reality, the instance should only be "per-resource". At runtime, the `System.Globalization.CultureInfo.CurrentUICulture` property determines the language to be used.

## Recommended action

Stop using the `ResourceManagerWithCultureStringLocalizer` class and the `ResourceManagerStringLocalizer.WithCulture` method.

## Affected APIs

- `Microsoft.Extensions.Localization.ResourceManagerWithCultureStringLocalizer`
- `Microsoft.Extensions.Localization.ResourceManagerStringLocalizer.WithCulture`
