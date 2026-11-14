---
title: "NamedConfigureFromConfigurationOptions<TOptions> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/NamedConfigureFromConfigurationOptions`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NamedConfigureFromConfigurationOptions<TOptions> class

Namespace: `Microsoft.Extensions.Options`

```csharp
public class NamedConfigureFromConfigurationOptions<TOptions> : Microsoft.Extensions.Options.ConfigureNamedOptions<TOptions> where TOptions : class
```

Configures an option instance by using `ConfigurationBinder.Bind` against an `IConfiguration`.

Parameters:

- `TOptions`: The type of options to bind.

To be added.

## NamedConfigureFromConfigurationOptions<TOptions>.NamedConfigureFromConfigurationOptions(String, IConfiguration) constructor

```csharp
public NamedConfigureFromConfigurationOptions (string? name, Microsoft.Extensions.Configuration.IConfiguration config);
```

Constructor that takes the `IConfiguration` instance to bind against.

Parameters:

- `name`: The name of the options instance.
- `config`: The `IConfiguration` instance.

To be added.

## NamedConfigureFromConfigurationOptions<TOptions>.NamedConfigureFromConfigurationOptions(String, IConfiguration, BinderOptions>) constructor

```csharp
public NamedConfigureFromConfigurationOptions (string? name, Microsoft.Extensions.Configuration.IConfiguration config, Action<Microsoft.Extensions.Configuration.BinderOptions>? configureBinder);
```

Constructor that takes the `IConfiguration` instance to bind against.

Parameters:

- `name`: The name of the options instance.
- `config`: The `IConfiguration` instance.
- `configureBinder`: Used to configure the `BinderOptions`.

To be added.
