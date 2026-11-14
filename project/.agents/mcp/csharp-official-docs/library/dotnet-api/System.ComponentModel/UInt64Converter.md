---
title: "UInt64Converter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/UInt64Converter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UInt64Converter class

Namespace: `System.ComponentModel`

```csharp
public class UInt64Converter : System.ComponentModel.BaseNumberConverter
```

Provides a type converter to convert 64-bit unsigned integer objects to and from other representations.

#### Remarks
This converter can only convert a 64-bit unsigned integer object to and from a string.

The `UInt64` value type represents unsigned integers with values ranging from 0 to 184,467,440,737,095,551,615. This data type is not supported in Visual Basic.

> **Note:**
>  You should never create an instance of a `UInt64Converter`. Instead, call the `TypeDescriptor.GetConverter` method of `TypeDescriptor`. For more information, see the examples in the `TypeConverter` base class.

#### Examples
The following code example converts a variable of type `UInt64` to a string, and vice versa.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BooleanConverter/Overview/converters.cs._

## UInt64Converter.UInt64Converter() constructor

```csharp
public UInt64Converter ();
```

Initializes a new instance of the `UInt64Converter` class.

To be added.
