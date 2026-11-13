---
title: "Configuration in ASP.NET Core (part 4 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/configuration/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Configuration in ASP.NET Core (part 4 of 5)

## File Configuration Provider

`Microsoft.Extensions.Configuration.FileConfigurationProvider` is the base class for loading configuration from the file system. The following configuration providers derive from `FileConfigurationProvider`:

* INI Configuration Provider
* JSON Configuration Provider
* XML Configuration Provider

### INI Configuration Provider

The `Microsoft.Extensions.Configuration.Ini.IniConfigurationProvider` loads configuration from INI file key-value pairs. The following example demonstrates how to use the provider. Overloads can specify whether the file is optional and if the configuration is reloaded on file changes.

`IniConfig.ini`:

```ini
[ConnectionStrings]
DefaultConnection="Data Source=LocalSqlServer\\MSSQLDev;"

[Logging:LogLevel]
Default=Debug
Microsoft=Debug
```

`IniConfig.Production.ini`:

```ini
[ConnectionStrings]
DefaultConnection="Data Source=LocalSqlServer\\MSSQLProd;"

[Logging:LogLevel]
Default=Information
Microsoft=Warning
```

Load the configuration by calling `Microsoft.Extensions.Configuration.IniConfigurationExtensions.AddIniFile*`. The following example creates a configuration source for each of the preceding files. The non-environmental file reloads configuration if the file is changed (`reloadOnChange` parameter, default: `false`). The environmental version of the file specifies that the file is optional (`optional` parameter, default: `false`). If you want to specify reloading the file on change (`reloadOnChange: true`), then you must also specify whether or not the file is optional (`optional`).

```csharp
builder.Configuration
    .AddIniFile("IniConfig.ini", optional: false, reloadOnChange: true);
    .AddIniFile($"IniConfig.{builder.Environment.EnvironmentName}.ini", optional: true);
```

### JSON Configuration Provider

The `Microsoft.Extensions.Configuration.Json.JsonConfigurationProvider` loads configuration from JSON file key-value pairs. The following example demonstrates how to use the provider. Overloads can specify whether the file is optional and if the configuration is reloaded on file changes.

Call `Microsoft.Extensions.Configuration.JsonConfigurationExtensions.AddJsonFile*` with the file path (or file name if the file is at the root of the app). The following makes the file optional (`optional` parameter, default: `false`) and specifies that the configuration is reloaded if the file is changed (`reloadOnChange` parameter, default: `false`). If you want to specify reloading the file on change (`reloadOnChange: true`), then you must also specify whether or not the file is optional (`optional`).

```csharp
builder.Configuration.AddJsonFile("config.json", optional: true, reloadOnChange: true);
```

### XML Configuration Provider

The `Microsoft.Extensions.Configuration.Xml.XmlConfigurationProvider` loads configuration from XML file key-value pairs. The following example demonstrates how to use the provider. Overloads can specify whether the file is optional and if the configuration is reloaded on file changes.

`XmlFile.xml`:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
  <ConnectionStrings>
    <DefaultConnection>Data Source=LocalSqlServer\\MSSQLDev;</DefaultConnectionString>
  </ConnectionStrings>
  <Logging>
    <LogLevel>
      <Default>Debug</Default>
      <Microsoft>Debug</Microsoft>
    </LogLevel>
  </Logging>
</configuration>
```

`XmlFile.Production.xml`:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
  <ConnectionStrings>
    <DefaultConnectionString>Data Source=LocalSqlServer\\MSSQLProd;</DefaultConnectionString>
  </ConnectionStrings>
  <Logging>
    <LogLevel>
      <Default>Information</Default>
      <Microsoft>Warning</Microsoft>
    </LogLevel>
  </Logging>
</configuration>
```

Load the configuration by calling `Microsoft.Extensions.Configuration.XmlConfigurationExtensions.AddXmlFile*`. The following example creates a configuration source for each of the preceding files. The non-environmental file reloads configuration if the file is changed (`reloadOnChange` parameter, default: `false`). The environmental version of the file specifies that the file is optional (`optional` parameter, default: `false`). If you want to specify reloading the file on change (`reloadOnChange: true`), then you must also specify whether or not the file is optional (`optional`).

```csharp
builder.Configuration
    .AddXmlFile("XmlFile.xml", optional: false, reloadOnChange: true);
    .AddXmlFile($"XmlFile.{builder.Environment.EnvironmentName}.xml", optional: true);
```

Repeating elements that use the same element name work if the `name` attribute is used to distinguish the elements:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <section name="section0">
    <key name="key0">value 00</key>
    <key name="key1">value 01</key>
  </section>
  <section name="section1">
    <key name="key0">value 10</key>
    <key name="key1">value 11</key>
  </section>
</configuration>
```

```csharp
var value_00 = Config["section:section0:key:key0"];
var value_01 = Config["section:section0:key:key1"];
var value_10 = Config["section:section1:key:key0"];
var value_11 = Config["section:section1:key:key1"];
```

Attributes that supply values are supported:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <key <example-value>"value" />
  <section>
    <key <example-value>"value" />
  </section>
</configuration>
```

The previous configuration loads the following keys with `value`:

* `key:<example-value>`
* `section:key:<example-value>`

## Key-Per-File Configuration Provider

The `Microsoft.Extensions.Configuration.KeyPerFile.KeyPerFileConfigurationProvider` uses a directory's files as configuration key-value pairs. The key is the file name. The value contains the file's contents. The Key-Per-File Configuration Provider is used in Docker hosting scenarios.

To activate key-per-file configuration, call the `Microsoft.Extensions.Configuration.KeyPerFileConfigurationBuilderExtensions.AddKeyPerFile*` extension method on an instance of `Microsoft.Extensions.Configuration.ConfigurationBuilder`. The `directoryPath` to the files must be an absolute path.

Overloads permit specifying:

* An `Action<KeyPerFileConfigurationSource>` delegate that configures the source.
* Whether the directory is optional and the path to the directory.

The double-underscore (`__`) is used as a configuration key <example-value> in file names. For example, the file name `Logging__LogLevel__System` produces the configuration key `Logging:LogLevel:System`.

```csharp
var path = Path.Combine(Directory.GetCurrentDirectory(), "path/to/files");
builder.Configuration.AddKeyPerFile(directoryPath: path, optional: true);
```

## Memory Configuration Provider

The `Microsoft.Extensions.Configuration.Memory.MemoryConfigurationProvider` uses an in-memory collection as configuration key-value pairs.

The following code adds a memory collection to the configuration system:

```csharp
var configSettings = new Dictionary<string, string>
{
    { "ConnectionStrings:DefaultConnection", "Data Source=LocalSqlServer\\MSSQLDev;" },
    { "Logging:LogLevel:Default", "Information" }
};

builder.Configuration.AddInMemoryCollection(configSettings);
```

## Kestrel endpoint configuration

Kestrel-specific endpoint configuration overrides all cross-server endpoint configurations. Cross-server endpoint configurations include:

* `UseUrls`.
* `--urls` on the command line.
* The `ASPNETCORE_URLS` environment variable.

Consider the following Kestrel configuration section in an `appsettings.json` file:

```json
"Kestrel": {
  "Endpoints": {
    "Https": {
      "Url": "https://localhost:9999"
    }
  }
},
```

The app is launched on the command line with `dotnet run` and the following cross-server endpoint configuration:

```dotnetcli
dotnet run --urls="https://localhost:7777"
```

Kestrel binds to the endpoint configured specifically for Kestrel in the `appsettings.json` file (`https://localhost:9999`) and not the cross-server endpoint configuration passed to the `dotnet run` command (`https://localhost:7777`).

However, consider the Kestrel-specific endpoint configured as an environment variable:

* Key: `Kestrel__Endpoints__Https__Url`
* Value: `https://localhost:8888`

In the preceding environment variable, "`Https`" is the name of the Kestrel-specific endpoint. The preceding app settings configuration also defines a Kestrel-specific endpoint named `Https`. Per the default host configuration providers, environment variables read by the Environment Variables Configuration Provider are read after `appsettings.{ENVIRONMENT}.json`. Therefore, the preceding environment variable (`Kestrel__Endpoints__Https__Url`) is used for the `Https` endpoint.

## Extract a single value from configuration with type conversion (`GetValue`)

`Microsoft.Extensions.Configuration.ConfigurationBinder.GetValue*` extracts a single value from configuration with a specified key and converts it to the specified type:

```csharp
var number = Config.GetValue<int>("NumberKey", 99);
```

In the preceding code:

* `Config` is an injected `Microsoft.Extensions.Configuration.IConfiguration`.
* If `NumberKey` isn't found in the configuration, the default value of `99` is used.

## Work with sections, get a section's children, and determine if a section exists

For the examples that follow, consider the following `subsection.json` file:

```json
{
  "section0": {
    "key0": "value00",
    "key1": "value01"
  },
  "section1": {
    "key0": "value10",
    "key1": "value11"
  },
  "section2": {
    "subsection0": {
      "key0": "value200",
      "key1": "value201"
    },
    "subsection1": {
      "key0": "value210",
      "key1": "value211"
    }
  }
}
```

A configuration provider is added for `subsection.json` by calling `AddJsonFile`.

### `GetSection`

`Microsoft.Extensions.Configuration.IConfiguration.GetSection*` returns a configuration subsection with the specified subsection key.

The following code returns values for `section1`, where `Config` is an injected `Microsoft.Extensions.Configuration.IConfiguration`:

```csharp
var subsection = Config.GetSection("section1");
var value1 = subsection["key0"];
var value2 = subsection["key1"];
```

The following code returns values for `section2:subsection0`, where `Config` is an injected `Microsoft.Extensions.Configuration.IConfiguration`:

```csharp
var subsection = Config.GetSection("section2:subsection0");
var value1 = subsection["key0"];
var value2 = subsection["key1"];
```

`Microsoft.Extensions.Configuration.IConfiguration.GetSection*` never returns `null`. If a matching section isn't found, an empty `Microsoft.Extensions.Configuration.IConfigurationSection` is returned.

When `Microsoft.Extensions.Configuration.IConfiguration.GetSection*` returns a matching section, `Microsoft.Extensions.Configuration.IConfigurationSection.Value` isn't populated. A `Microsoft.Extensions.Configuration.IConfigurationSection.Key` and `Microsoft.Extensions.Configuration.IConfigurationSection.Path` are returned when the section exists.

### `GetChildren` and `Exists`

The following code calls:

* `Microsoft.Extensions.Configuration.ConfigurationExtensions.Exists*` to verify that `section2` exists.
* `Microsoft.Extensions.Configuration.IConfiguration.GetChildren*` and returns values for the subsections of `section2`.

```csharp
var section = Config.GetSection("section2");

if (!section.Exists())
{
    throw new Exception("section2 doesn't exist!");
}

var children = section.GetChildren();

foreach (var subSection in children)
{
    int i = 0;
    var key1 = subSection.Key + ":key" + i++.ToString();
    var key2 = subSection.Key + ":key" + i.ToString();
    Console.WriteLine($"{key1} value: {section[key1]}");
    Console.WriteLine($"{key2} value: {section[key2]}");
}
```

Output:

> :::no-loc text="subsection0:key0 value: value200":::
> :::no-loc text="subsection0:key1 value: value201":::
> :::no-loc text="subsection1:key0 value: value210":::
> :::no-loc text="subsection1:key1 value: value211":::

## Bind an array

The `Microsoft.Extensions.Configuration.ConfigurationBinder.Bind*` supports binding arrays to objects using array indices in configuration keys. Any array format that exposes a numeric key <example-value> is capable of array binding to a POCO class array.

`array.json`:

```json
{
  "array": {
    "entries": {
      "0": "value00",
      "1": "value10",
      "2": "value20",
      "4": "value40",
      "5": "value50"
    }
  }
}
```

A configuration provider is added for `array.json` by calling `AddJsonFile`.

The following code reads the configuration values.

`ArrayExample.cs`:

```csharp
public class ArrayExample
{
    public string[]? Entries { get; set; } 
}
```

```csharp
var array = Config.GetSection("array").Get<ArrayExample>();

if (array is null)
{
    throw new ArgumentNullException(nameof(array));
}

for (int j = 0; j < array.Entries?.Length; j++)
{
    Console.WriteLine($"Index: {j} Value: {array.Entries[j]}");
}
```

Output:

```console
Index: 0 Value: value00
Index: 1 Value: value10
Index: 2 Value: value20
Index: 3 Value: value40
Index: 4 Value: value50
```

In the preceding output, Index 3 has value `value40`, corresponding to `"4": "value40",` in `array.json`. The bound array indices are continuous and not bound to the configuration key index. The configuration binder isn't capable of binding `null` values or creating `null` entries in bound objects.

The missing configuration item for Index 3 can be supplied before binding to the `ArrayExample` instance by any configuration provider that reads the Index 3 key/value pair. In the following example, assume that the values provided by `array.json` in the preceding example are provided by an in-memory collection. The example shows how to load the Index 3 value from the JSON Configuration Provider before the collection is bound.

`value3.json`:

```json
{
  "array:entries:3": "value30"
}
```

```csharp
var configSettings = new Dictionary<string, string>
{
    { "array:entries:0", "value00" },
    { "array:entries:1", "value10" },
    { "array:entries:2", "value20" },
    { "array:entries:4", "value40" },
    { "array:entries:5", "value50" }
};

builder.Configuration.AddInMemoryCollection(configSettings);
builder.Configuration.AddJsonFile("value3.json", optional: false, 
    reloadOnChange: false);
```

The preceding code results in the following bound array:

```console
Index: 0 Value: value00
Index: 1 Value: value10
Index: 2 Value: value20
Index: 3 Value: value30
Index: 4 Value: value40
Index: 5 Value: value50
```
