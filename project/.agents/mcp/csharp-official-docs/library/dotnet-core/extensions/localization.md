---
title: "Localization (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/localization.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Localization in .NET

Localization is the process of translating an application's resources into localized versions for each culture that the application will support. You should proceed to the localization step only after completing the Localizability review step to verify that the globalized application is ready for localization.

An application that is ready for localization is separated into two conceptual blocks: a block that contains all user interface elements and a block that contains executable code. The user interface block contains only localizable user-interface elements such as strings, error messages, dialog boxes, menus, embedded object resources, and so on for the neutral culture. The code block contains only the application code to be used by all supported cultures. The common language runtime supports a satellite assembly resource model that separates an application's executable code from its resources. For more information about implementing this model, see Resources in .NET.

For each localized version of your application, add a new satellite assembly that contains the localized user interface block translated into the appropriate language for the target culture. The code block for all cultures should remain the same. The combination of a localized version of the user interface block with the code block produces a localized version of your application.

In this article, you will learn how to use the `Microsoft.Extensions.Localization.IStringLocalizer`1` and `Microsoft.Extensions.Localization.IStringLocalizerFactory` implementations. All of the example source code in this article relies on the `Microsoft.Extensions.Localization` and `Microsoft.Extensions.Hosting` NuGet packages. For more information on hosting, see .NET Generic Host.

## Resource files

The primary mechanism for isolating localizable strings is with **resource files**. A resource file is an XML file with the *.resx* file extension. Resource files are translated prior to the execution of the consuming application—in other words, they represent translated content at rest. A resource file name most commonly contains a locale identifier, and takes on the following form:

**`<FullTypeName><.Locale>.resx`**

Where:

- The `<FullTypeName>` represents localizable resources for a specific type.
- The optional `<.Locale>` represents the locale of the resource file contents.

### Specifying locales

The locale should define the language, at a bare minimum, but it can also define the culture (regional language), and even the country or region. These segments are commonly delimited by the `-` character. With the added specificity of a culture, the "culture fallback" rules are applied where best matches are prioritized. The locale should map to a well-known language tag. For more information, see `System.Globalization.CultureInfo.Name`.

### Culture fallback scenarios

Imagine that your localized app supports various Serbian locales, and has the following resource files for its `MessageService`:

| File                             | Regional language             | Country Code |
|----------------------------------|-------------------------------|--------------|
| *MessageService.sr-Cyrl-RS.resx* | (Cyrillic, Serbia)            | RS           |
| *MessageService.sr-Cyrl.resx*    | Cyrillic                      |              |
| *MessageService.sr-Latn-BA.resx* | (Latin, Bosnia & Herzegovina) | BA           |
| *MessageService.sr-Latn-ME.resx* | (Latin, Montenegro)           | ME           |
| *MessageService.sr-Latn-RS.resx* | (Latin, Serbia)               | RS           |
| *MessageService.sr-Latn.resx*    | Latin                         |              |
| *MessageService.sr.resx*         | † Latin            |              |
| *MessageService.resx*            |                               |              |

*†  The default regional language for the language.*

When your app is running with the `System.Globalization.CultureInfo.CurrentCulture` set to a culture of `"sr-Cyrl-RS"` localization attempts to resolve files in the following order:

1. *MessageService.sr-Cyrl-RS.resx*
1. *MessageService.sr-Cyrl.resx*
1. *MessageService.sr.resx*
1. *MessageService.resx*

However, if your app was running with the `System.Globalization.CultureInfo.CurrentCulture` set to a culture of `"sr-Latn-BA"` localization attempts to resolve files in the following order:

1. *MessageService.sr-Latn-BA.resx*
1. *MessageService.sr-Latn.resx*
1. *MessageService.sr.resx*
1. *MessageService.resx*

The "culture fallback" rule will ignore locales when there are no corresponding matches, meaning resource file number four is selected if it's unable to find a match. If the culture was set to `"fr-FR"`, localization would end up falling to the *MessageService.resx* file which can be problematic. For more information, see The resource fallback process.

### Resource lookup

Resource files are automatically resolved as part of a lookup routine. If your project file name is different than the root namespace of your project, the assembly name might differ. This can prevent resource lookup from being otherwise successful. To address this mismatch, use the `Microsoft.Extensions.Localization.RootNamespaceAttribute` to provide a hint to the localization services. When provided, it is used during resource lookup.

The example project is named *example.csproj*, which creates an *example.dll* and *example.exe*—however, the `Localization.Example` namespace is used. Apply an `assembly` level attribute to correct this mismatch:

```csharp
[assembly: RootNamespace("Localization.Example")]
```
## Register localization services

To register localization services, call one of the `Microsoft.Extensions.DependencyInjection.LocalizationServiceCollectionExtensions.AddLocalization*` extension methods during the configuration of services. This will enable dependency injection (DI) of the following types:

- `Microsoft.Extensions.Localization.IStringLocalizer`1`
- `Microsoft.Extensions.Localization.IStringLocalizerFactory`

### Configure localization options

The `Microsoft.Extensions.DependencyInjection.LocalizationServiceCollectionExtensions.AddLocalization(Microsoft.Extensions.DependencyInjection.IServiceCollection,System.Action{Microsoft.Extensions.Localization.LocalizationOptions})` overload accepts a `setupAction` parameter of type `Action<LocalizationOptions>`. This allows you to configure localization options.

```csharp
HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

builder.Services.AddLocalization(options =>
{
    options.ResourcesPath = "Resources";
});

// Omitted for brevity.
```

Resource files can live anywhere in a project, but there are common practices in place that have proven to be successful. More often than not, the path of least resistance is followed. The preceding C# code:

- Creates the default host app builder.
- Calls `AddLocalization` on the service collection, specifying `Microsoft.Extensions.Localization.LocalizationOptions.ResourcesPath` as `"Resources"`.

This would cause the localization services to look in the *Resources* directory for resource files.

### ResourcesPath and shared resource classes

When `ResourcesPath` is configured, `IStringLocalizerFactory.Create(Type)` resolves the resource file path by computing the type's relative name (relative to the root namespace) and prepending the `ResourcesPath`. This means the placement of your shared resource class relative to the project root namespace matters.

For example, consider a shared resource class used to consolidate strings across multiple components. If `ResourcesPath = "Resources"` is set and your shared resource class `SharedResource` lives *inside* the `Resources` folder in the namespace `MyApp.Resources` (fully qualified type name `MyApp.Resources.SharedResource`), the factory resolves the base name as `Resources.SharedResource` (relative to the root namespace `MyApp`) and then prepends `ResourcesPath`, resulting in a path equivalent to `Resources/Resources/SharedResource.resx`—which doesn't match the actual file location.

You have two options to avoid this:

- **Keep the shared resource class in the root namespace.** Place `SharedResource.cs` at the project root (namespace `MyApp`), not inside the `Resources` folder. The factory then resolves the base name as `SharedResource`, and with `ResourcesPath = "Resources"`, it correctly looks for `Resources/SharedResource.resx`.

- **Use `factory.Create(string baseName, string location)`.** Provide the base name and assembly name explicitly, which gives direct control over resource file resolution:

  ```csharp
  var assemblyName = typeof(SharedResource).Assembly.GetName().Name;
  IStringLocalizer localizer = factory.Create("SharedResource", assemblyName);
  ```

  This approach works regardless of where `SharedResource.cs` is located in the project.

> **Note:**
> The same consideration applies when integrating with frameworks that use `IStringLocalizerFactory` internally. For example, ASP.NET Core's `AddDataAnnotationsLocalization` uses this factory with a shared resource class. If `ResourcesPath` is configured, use the `factory.Create(string, string)` overload. Alternatively, ensure the shared resource class is in the root namespace.

## Use `IStringLocalizer<T>` and `IStringLocalizerFactory`

After you've registered (and optionally configured) the localization services, you can use the following types with DI:

- `Microsoft.Extensions.Localization.IStringLocalizer`1`
- `Microsoft.Extensions.Localization.IStringLocalizerFactory`

To create a message service that is capable of returning localized strings, consider the following `MessageService`:

```csharp
﻿using System.Diagnostics.CodeAnalysis;
using Microsoft.Extensions.Localization;

namespace Localization.Example;

public sealed class MessageService(IStringLocalizer<MessageService> localizer)
{
    [return: NotNullIfNotNull(nameof(localizer))]
    public string? GetGreetingMessage()
    {
        LocalizedString localizedString = localizer["GreetingMessage"];

        return localizedString;
    }
}
```
In the preceding C# code:

- A `IStringLocalizer<MessageService> localizer` field is declared.
- The primary constructor defines an `IStringLocalizer<MessageService>` parameter and captures it as a `localizer` argument.
- The `GetGreetingMessage` method invokes the `Microsoft.Extensions.Localization.IStringLocalizer.Item(System.String)` passing `"GreetingMessage"` as an argument.

The `IStringLocalizer` also supports parameterized string resources, consider the following `ParameterizedMessageService`:

```csharp
﻿using System.Diagnostics.CodeAnalysis;
using Microsoft.Extensions.Localization;

namespace Localization.Example;

public class ParameterizedMessageService(IStringLocalizerFactory factory)
{
    private readonly IStringLocalizer _localizer =
        factory.Create(typeof(ParameterizedMessageService));

    [return: NotNullIfNotNull(nameof(_localizer))]
    public string? GetFormattedMessage(DateTime dateTime, double dinnerPrice)
    {
        LocalizedString localizedString = _localizer["DinnerPriceFormat", dateTime, dinnerPrice];

        return localizedString;
    }
}
```
In the preceding C# code:

- A `IStringLocalizer _localizer` field is declared.
- The primary constructor takes an `IStringLocalizerFactory` parameter, which is used to create an `IStringLocalizer` from the `ParameterizedMessageService` type, and assigns it to the `_localizer` field.
- The `GetFormattedMessage` method invokes `Microsoft.Extensions.Localization.IStringLocalizer.Item(System.String,System.Object[])`, passing `"DinnerPriceFormat"`, a `dateTime` object, and `dinnerPrice` as arguments.

> **Important:**
> The `IStringLocalizerFactory` isn't required. Instead, it is preferred for consuming services to require the `Microsoft.Extensions.Localization.IStringLocalizer`1`.

Both `Microsoft.Extensions.Localization.IStringLocalizer.Item*` indexers return a `Microsoft.Extensions.Localization.LocalizedString`, which have implicit conversions~System.String) to `string?`.
