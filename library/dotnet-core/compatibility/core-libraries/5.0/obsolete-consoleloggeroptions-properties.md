---
title: "Breaking change: Obsolete properties on ConsoleLoggerOptions"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/5.0/obsolete-consoleloggeroptions-properties.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Obsolete properties on ConsoleLoggerOptions

The `Microsoft.Extensions.Logging.Console.ConsoleLoggerFormat` type and some properties on `Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions` are now obsolete.

## Change description

Starting in .NET 5, the `Microsoft.Extensions.Logging.Console.ConsoleLoggerFormat` type and several properties on `Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions` are obsolete. The obsolete properties are:

- `Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.DisableColors`
- `Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.IncludeScopes`
- `Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.TimestampFormat`
- `Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.UseUtcTimestamp`
- `Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.Format`

With the introduction of new formatters, these properties are now available on the individual formatters.

## Reason for change

The `Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.Format` property is an enumeration type, which cannot represent a custom formatter.

The remaining properties were set on `Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions` and applied to both of the built-in formats for console logs. However, with the introduction of a new formatter API, it makes more sense for formatting to be represented on the formatter-specific options. This change provides better separation between the logger and logger formatters.

## Version introduced

5.0

## Recommended action

- Use the new `Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.FormatterName` property in place of the `Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.Format` property. For example:

  ```csharp
  loggingBuilder.AddConsole(options =>
  {
    options.FormatterName = ConsoleFormatterNames.Systemd;
  });
  ```

  There are several differences between `Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.FormatterName` and `Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.Format`:

  - `Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.Format` has only two possible options: `Default` and `Systemd`.
  - `Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.FormatterName` is case insensitive and can be any string. The reserved, built-in names are `Simple`, `Systemd`, and `Json` (.NET 5 and later).
  - `"Format": "Systemd"` maps to `"FormatterName": "Systemd"`.
  - `"Format": "Default"` maps to `"FormatterName": "Simple"`.

- For the `Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.DisableColors`, `Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.IncludeScopes`, `Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.TimestampFormat`, and `Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.UseUtcTimestamp` properties, use the corresponding property on the new `Microsoft.Extensions.Logging.Console.ConsoleFormatterOptions`, `Microsoft.Extensions.Logging.Console.JsonConsoleFormatterOptions`, or `Microsoft.Extensions.Logging.Console.SimpleConsoleFormatterOptions` types instead. For example, the corresponding setting for `Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.DisableColors` is `Microsoft.Extensions.Logging.Console.SimpleConsoleFormatterOptions.ColorBehavior`.

  Previous code:

  ```csharp
  loggingBuilder.AddConsole(options =>
  {
      options.DisableColors = true;
  });
  ```

  New code:

  ```csharp
  loggingBuilder.AddSimpleConsole(options =>
  {
      options.ColorBehavior = LoggerColorBehavior.Disabled;
  });
  ```

The following two JSON snippets show how the configuration file changes. Old configuration file:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "None",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    },

    "Console": {
      "LogLevel": {
        "Default": "Information"
      },
      "Format": "Systemd",
      "IncludeScopes": true,
      "TimestampFormat": "HH:mm:ss",
      "UseUtcTimestamp": true
    }
  },
  "AllowedHosts": "*"
}
```

New configuration file:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "None",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    },

    "Console": {
      "LogLevel": {
        "Default": "Information"
      },
      "FormatterName": "Systemd",
      "FormatterOptions": {
        "IncludeScopes": true,
        "TimestampFormat": "HH:mm:ss",
        "UseUtcTimestamp": true
      }
    }
  },
  "AllowedHosts": "*"
}
```

## Affected APIs

- `Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.DisableColors`
- `Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.IncludeScopes`
- `Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.TimestampFormat`
- `Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.UseUtcTimestamp`
- `Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.Format`
