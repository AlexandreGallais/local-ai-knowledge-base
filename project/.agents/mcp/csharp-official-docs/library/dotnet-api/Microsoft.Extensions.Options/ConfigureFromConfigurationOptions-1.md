---
title: "ConfigureFromConfigurationOptions<TOptions> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/ConfigureFromConfigurationOptions`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConfigureFromConfigurationOptions<TOptions> class

Namespace: `Microsoft.Extensions.Options`

```csharp
public class ConfigureFromConfigurationOptions<TOptions> : Microsoft.Extensions.Options.ConfigureOptions<TOptions> where TOptions : class
```

Configures an option instance by using `ConfigurationBinder.Bind` against an `IConfiguration`.

Parameters:

- `TOptions`: The type of options to bind.

To be added.

## ConfigureFromConfigurationOptions<TOptions>.ConfigureFromConfigurationOptions(IConfiguration) constructor

```csharp
public ConfigureFromConfigurationOptions (Microsoft.Extensions.Configuration.IConfiguration config);
```

Initializes a new instance of the `ConfigureFromConfigurationOptions<T>` class using the specified `IConfiguration` instance to bind against.

Parameters:

- `config`: The `IConfiguration` instance.

To be added.
