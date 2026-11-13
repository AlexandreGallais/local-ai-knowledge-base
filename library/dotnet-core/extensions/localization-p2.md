---
title: "Localization (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/extensions/localization.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Localization (part 2 of 2)

## Put it all together

To exemplify an app using both message services, along with localization and resource files, consider the following *Program.cs* file:

```csharp
﻿using System.Globalization;
using Localization.Example;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using static System.Console;
using static System.Text.Encoding;

[assembly: RootNamespace("Localization.Example")]

OutputEncoding = Unicode;

if (args is [var cultureName])
{
    CultureInfo.CurrentCulture =
        CultureInfo.CurrentUICulture =
            CultureInfo.GetCultureInfo(cultureName);
}

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

builder.Services.AddLocalization();
builder.Services.AddTransient<MessageService>();
builder.Services.AddTransient<ParameterizedMessageService>();
builder.Logging.SetMinimumLevel(LogLevel.Warning);

using IHost host = builder.Build();

IServiceProvider services = host.Services;

ILogger logger =
    services.GetRequiredService<ILoggerFactory>()
        .CreateLogger("Localization.Example");

MessageService messageService =
    services.GetRequiredService<MessageService>();
logger.LogWarning(
    "{Msg}",
    messageService.GetGreetingMessage());

ParameterizedMessageService parameterizedMessageService =
    services.GetRequiredService<ParameterizedMessageService>();
logger.LogWarning(
    "{Msg}",
    parameterizedMessageService.GetFormattedMessage(
        DateTime.Today.AddDays(-3), 37.63));

await host.RunAsync();
```
In the preceding C# code:

- The `Microsoft.Extensions.Localization.RootNamespaceAttribute` sets `"Localization.Example"` as the root namespace.
- The `System.Console.OutputEncoding` is assigned to `System.Text.Encoding.Unicode`.
- When a single argument is passed to `args`, the `System.Globalization.CultureInfo.CurrentCulture` and `System.Globalization.CultureInfo.CurrentUICulture` are assigned the result of `System.Globalization.CultureInfo.GetCultureInfo(System.String)` given the `arg[0]`.
- The `Microsoft.Extensions.Hosting.Host` is created with defaults.
- The localization services, `MessageService`, and `ParameterizedMessageService` are registered to the `IServiceCollection` for DI.
- To remove noise, logging is configured to ignore any log level lower than a warning.
- The `MessageService` is resolved from the `IServiceProvider` instance and its resulting message is logged.
- The `ParameterizedMessageService` is resolved from the `IServiceProvider` instance and its resulting formatted message is logged.

Each of the `*MessageService` classes defines a set of *.resx* files, each with a single entry. Here is the example content for the `MessageService` resource files, starting with *MessageService.resx*:

```xml
﻿<?xml version="1.0" encoding="utf-8"?>
<root>
  <data name="GreetingMessage" xml:space="preserve">
    <value>Hi friends, the ".NET" developer community is excited to see you here!</value>
  </data>
</root>
```
*MessageService.sr-Cyrl-RS.resx*:

```xml
﻿<?xml version="1.0" encoding="utf-8"?>
<root>
  <data name="GreetingMessage" xml:space="preserve">
    <value>Здраво пријатељи, ".NЕТ" девелопер заједница је узбуђена што вас види овде!</value>
  </data>
</root>
```
*MessageService.sr-Latn.resx*:

```xml
﻿<?xml version="1.0" encoding="utf-8"?>
<root>
  <data name="GreetingMessage" xml:space="preserve">
    <value>Zdravo prijatelji, ".NET" developer zajednica je uzbuđena što vas vidi ovde!</value>
  </data>
</root>
```
Here is the example content for the `ParameterizedMessageService` resource files, starting with *ParameterizedMessageService.resx*:

```xml
﻿<?xml version="1.0" encoding="utf-8"?>
<root>
  <data name="DinnerPriceFormat" xml:space="preserve">
    <value>On {0:D} my dinner cost {1:C}.</value>
  </data>
</root>
```
*ParameterizedMessageService.sr-Cyrl-RS.resx*:

```xml
﻿<?xml version="1.0" encoding="utf-8"?>
<root>
  <data name="DinnerPriceFormat" xml:space="preserve">
    <value>У {0:D} моја вечера је коштала {1:C}.</value>
  </data>
</root>
```
*ParameterizedMessageService.sr-Latn.resx*:

```xml
﻿<?xml version="1.0" encoding="utf-8"?>
<root>
  <data name="DinnerPriceFormat" xml:space="preserve">
    <value>U {0:D} moja večera je koštala {1:C}.</value>
  </data>
</root>
```
> **Tip:**
> All of the resource file XML comments, schema, and `<resheader>` elements are intentionally omitted for brevity.

### Example runs

The following example runs show the various localized outputs, given targeted locales.

Consider `"sr-Latn"`:

```dotnetcli
dotnet run --project .\example\example.csproj sr-Latn

warn: Localization.Example[0]
      Zdravo prijatelji, ".NET" developer zajednica je uzbuđena što vas vidi ovde!
warn: Localization.Example[0]
      U utorak, 03. avgust 2021. moja večera je koštala 37,63 ¤.
```

When omitting an argument to the .NET CLI to run the project, the default system culture is used—in this case `"en-US"`:

```dotnetcli
dotnet run --project .\example\example.csproj

warn: Localization.Example[0]
      Hi friends, the ".NET" developer community is excited to see you here!
warn: Localization.Example[0]
      On Tuesday, August 3, 2021 my dinner cost $37.63.
```

When passing `"sr-Cryl-RS"`, the correct corresponding resource files are found and the localization applied:

```dotnetcli
dotnet run --project .\example\example.csproj sr-Cryl-RS

warn: Localization.Example[0]
      Здраво пријатељи, ".NЕТ" девелопер заједница је узбуђена што вас види овде!
warn: Localization.Example[0]
      У уторак, 03. август 2021. моја вечера је коштала 38 RSD.
```

The sample application does not provide resource files for `"fr-CA"`, but when called with that culture, the non-localized resource files are used.

> **Warning:**
> Since the culture is found but the correct resource files are not, when formatting is applied you end up with partial localization:
>
> ```dotnetcli
> dotnet run --project .\example\example.csproj fr-CA
>
> warn: Localization.Example[0]
>      Hi friends, the ".NET" developer community is excited to see you here!
> warn: Localization.Example[0]
>      On mardi 3 août 2021 my dinner cost 37,63 $.
>```

## See also

- Globalizing and localizing .NET applications
- Package and deploy resources in .NET apps
- `Microsoft.Extensions.Localization`
- Dependency injection in .NET
- Logging in .NET
- ASP.NET Core localization
