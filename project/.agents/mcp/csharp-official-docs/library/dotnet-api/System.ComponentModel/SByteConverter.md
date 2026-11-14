---
title: "SByteConverter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/SByteConverter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SByteConverter class

Namespace: `System.ComponentModel`

```csharp
public class SByteConverter : System.ComponentModel.BaseNumberConverter
```

Provides a type converter to convert 8-bit unsigned integer objects to and from a string.

#### Remarks
This converter can convert only an 8-bit unsigned integer object to and from a string.

The `SByte` value type represents integers with values ranging from negative 128 to positive 127. This data type is not supported in Visual Basic.

> **Note:**
>  You should never create an instance of `SByteConverter`. Instead, call the `TypeDescriptor.GetConverter` method of `TypeDescriptor`. For more information, see the examples in the `TypeConverter` base class.

#### Examples
The following sample converts a variable of type `SByte` to a string, and vice versa.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BooleanConverter/Overview/converters.cs._

## SByteConverter.SByteConverter() constructor

```csharp
public SByteConverter ();
```

Initializes a new instance of the `SByteConverter` class.

To be added.
