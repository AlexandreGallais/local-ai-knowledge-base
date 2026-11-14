---
title: "TagNameAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/TagNameAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TagNameAttribute class

Namespace: `Microsoft.Extensions.Logging`

```csharp
public sealed class TagNameAttribute : Attribute
```

Defines the tag name to use for a logged parameter or property.

By default, the tag name is the same as the respective parameter or property.
You can use this attribute to override the default and provide a custom tag name.

```csharp

            [LoggerMessage(1, LogLevel.Information, "My custom tag name: {my.custom.tagname}")]
            public static partial void LogMyCustomTagName(
                this ILogger logger,
                [TagName("my.custom.tagname")] string name);
            
```

## TagNameAttribute.TagNameAttribute(String) constructor

```csharp
public TagNameAttribute (string name);
```

Initializes a new instance of the `TagNameAttribute` class.

Parameters:

- `name`: The tag name to use when logging the annotated parameter or property.

To be added.

## TagNameAttribute.Name property

```csharp
public string Name { get; }
```

Gets the name of the tag to be used when logging the parameter or property.

Returns: To be added.

To be added.
