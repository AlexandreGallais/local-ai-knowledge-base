---
title: "Breaking change: Repeated XML elements include index"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/extensions/6.0/repeated-xml-elements.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Repeated XML elements include index

When `Microsoft.Extensions.Configuration.Xml` is used to read an XML document that has repeated XML elements without a `Name` attribute, the `Configuration` entries created with these repeated elements now have an index appended to their configuration path.

## Version introduced

.NET 6

## Previous behavior

Consider the following XML snippets that show repeated elements without a distinguishing `Name` attribute.

```xml
<settings>
  <Data ConnectionString="TestConnectionString" />
  <Data Provider="MySql" />
</settings>
```

```xml
<configuration>
    <Level1>
        <Level2 Key1="Value1" />
        <Level2 Key2="Value2" />
    </Level1>
</configuration>
```

The configurations created from these XML files were:

```txt
Data:ConnectionString = TestConnectionString
Data:Provider = MySql
```

and

```txt
Level1:Level2:Key1 = Value1
Level1:Level2:Key2 = Value2
```

respectively.

## New behavior

The configurations created from the XML files in the Previous behavior section are now:

```txt
Data:0:ConnectionString = TestConnectionString
Data:1:Provider = MySql
```

and

```txt
Level1:Level2:0:Key1 = Value1
Level1:Level2:1:Key2 = Value2
```

respectively.

## Type of breaking change

This change can affect binary compatibility.

## Reason for change

This change was introduced to fully support repeated XML elements that don't have a `Name` attribute. The previous behavior only allowed for repeated elements to set unique values (using attributes or subelements). If repeated XML elements had the same attribute, an exception was thrown.

## Recommended action

To get the original behavior, you can update your XML to collapse the two attributes into the same element. For example:

```xml
<configuration>
    <Level1>
        <Level2 Key1="Value1" Key2="Value2" />
    </Level1>
</configuration>
```

Alternatively, you can update your code to expect indices (such as 0, 1, 2) in the `IConfiguration` keys:

```csharp
configRoot.GetSection("Level1:Level2")
```

becomes

```csharp
configRoot.GetSection("Level1:Level2:0")
```

## Affected APIs

- `Microsoft.Extensions.Configuration.XmlConfigurationExtensions`
- `Microsoft.Extensions.Configuration.Xml.XmlStreamConfigurationProvider`
- `Microsoft.Extensions.Configuration.Xml.XmlConfigurationSource`

## See also

- XML configuration provider
