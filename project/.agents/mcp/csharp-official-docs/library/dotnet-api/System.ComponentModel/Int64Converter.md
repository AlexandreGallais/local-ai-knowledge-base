---
title: "Int64Converter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/Int64Converter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Int64Converter class

Namespace: `System.ComponentModel`

```csharp
public class Int64Converter : System.ComponentModel.BaseNumberConverter
```

Provides a type converter to convert 64-bit signed integer objects to and from various other representations.

#### Remarks
This converter can only convert a 64-bit signed integer object to and from a string. The `Int64` value type represents integers with values ranging from negative 9,223,372,036,854,775,808 through positive 9,223,372,036,854,775,807.

The `TypeConverter.ConvertFrom` method uses the `Int64.Parse` method of `Int64` with the integer value of `NumberStyles`.

The `TypeConverter.ConvertTo` method uses the general ("G") format for the string returned.

For more information about type converters, see the `TypeConverter` base class.

> **Note:**
>  You should never create an instance of an `Int64Converter`. Instead, call the `TypeDescriptor.GetConverter` method of `TypeDescriptor`. For more information, see the examples in the `TypeConverter` base class.

#### Examples
The following sample converts a variable of type `Int64` to a string, and vice versa.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BooleanConverter/Overview/converters.cs._

## Int64Converter.Int64Converter() constructor

```csharp
public Int64Converter ();
```

Initializes a new instance of the `Int64Converter` class.

To be added.
