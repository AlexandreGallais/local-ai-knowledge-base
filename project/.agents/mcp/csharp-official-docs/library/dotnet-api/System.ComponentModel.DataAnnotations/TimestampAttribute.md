---
title: "TimestampAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/TimestampAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TimestampAttribute class

Namespace: `System.ComponentModel.DataAnnotations`

```csharp
public sealed class TimestampAttribute : Attribute
```

Specifies the data type of the column as a row version.

#### Remarks
A row version type (also known as a sequence number) is a binary number that is guaranteed to be unique in the database. It does not represent an actual time. Row version data is not visually meaningful. Therefore, when the `TimestampAttribute` attribute is used with a Dynamic Data field, the column is not displayed unless the `ScaffoldColumnAttribute` attribute of the column is explicitly set to `true`.

For more information, see rowversion.

## TimestampAttribute.TimestampAttribute() constructor

```csharp
public TimestampAttribute ();
```

Initializes a new instance of the `TimestampAttribute` class.

To be added.
