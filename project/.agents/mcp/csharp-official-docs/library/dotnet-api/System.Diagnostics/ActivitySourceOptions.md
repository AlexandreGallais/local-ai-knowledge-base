---
title: "ActivitySourceOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/ActivitySourceOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ActivitySourceOptions class

Namespace: `System.Diagnostics`

```csharp
public class ActivitySourceOptions
```

Options for creating an `ActivitySource`.

To be added.

## ActivitySourceOptions.ActivitySourceOptions(String) constructor

```csharp
public ActivitySourceOptions (string name);
```

Constructs a new instance of `ActivitySourceOptions`.

Parameters:

- `name`: The name of the `ActivitySourceOptions` object

To be added.

## ActivitySourceOptions.Name property

```csharp
public string Name { get; set; }
```

Gets or sets the `ActivitySourceOptions` object name. Cannot be `null`.

Returns: To be added.

To be added.

## ActivitySourceOptions.Scope property

```csharp
public object? Scope { get; set; }
```

To be added.

Returns: To be added.

To be added.

## ActivitySourceOptions.Tags property

```csharp
public System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>>? Tags { get; set; }
```

Gets or sets the optional list of key-value pair tags associated with the `ActivitySourceOptions`.

Returns: To be added.

To be added.

## ActivitySourceOptions.TelemetrySchemaUrl property

```csharp
public string? TelemetrySchemaUrl { get; set; }
```

Gets or sets the location of a Schema file that can be retrieved using HTTP or HTTPS protocol.

Returns: To be added.

To be added.

## ActivitySourceOptions.Version property

```csharp
public string? Version { get; set; }
```

Gets or sets the `ActivitySourceOptions` version.

Returns: The `ActivitySourceOptions` version. The default value is the empty string.

To be added.
