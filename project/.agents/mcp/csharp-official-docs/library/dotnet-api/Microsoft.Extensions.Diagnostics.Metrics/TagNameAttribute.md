---
title: "TagNameAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Diagnostics.Metrics/TagNameAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TagNameAttribute class

Namespace: `Microsoft.Extensions.Diagnostics.Metrics`

```csharp
public sealed class TagNameAttribute : Attribute
```

Provides tag information for strongly typed metrics.

This attribute is applied to fields or properties of a metric class to override default tag names. By default,
the tag name is the same as the respective field or property. You can use this attribute to override the default
and provide a custom tag name.

```csharp

             public class MyStrongTypeMetric
             {
                 [TagName("tag_name_as_per_some_convention1")]
                 public string Name1 { get; set; }
            
                 [TagName("tag_name_as_per_some_convention2")]
                 public string Name2;
             }
             
```

## TagNameAttribute.TagNameAttribute(String) constructor

```csharp
public TagNameAttribute (string name);
```

Initializes a new instance of the `TagNameAttribute` class.

Parameters:

- `name`: Tag name.

To be added.

## TagNameAttribute.Name property

```csharp
public string Name { get; }
```

Gets the name of the tag.

Returns: To be added.

To be added.
