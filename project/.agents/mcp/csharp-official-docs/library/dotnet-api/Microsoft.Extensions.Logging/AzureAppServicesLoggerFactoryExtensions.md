---
title: "AzureAppServicesLoggerFactoryExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/AzureAppServicesLoggerFactoryExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AzureAppServicesLoggerFactoryExtensions class

Namespace: `Microsoft.Extensions.Logging`

```csharp
public static class AzureAppServicesLoggerFactoryExtensions
```

Provides extension methods for adding Azure diagnostics logger.

To be added.

## AzureAppServicesLoggerFactoryExtensions.AddAzureWebAppDiagnostics(ILoggingBuilder) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddAzureWebAppDiagnostics (this Microsoft.Extensions.Logging.ILoggingBuilder builder);
```

Adds an Azure Web Apps diagnostics logger.

Parameters:

- `builder`: The extension method argument.

To be added.

## AzureAppServicesLoggerFactoryExtensions.AddAzureWebAppDiagnostics(ILoggingBuilder, AzureBlobLoggerOptions>) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddAzureWebAppDiagnostics (this Microsoft.Extensions.Logging.ILoggingBuilder builder, Action<Microsoft.Extensions.Logging.AzureAppServices.AzureBlobLoggerOptions> configureBlobLoggerOptions);
```

Adds an Azure Web Apps diagnostics logger.

Parameters:

- `builder`: The extension method argument.
- `configureBlobLoggerOptions`: An Action to configure the `AzureBlobLoggerOptions`.

To be added.
