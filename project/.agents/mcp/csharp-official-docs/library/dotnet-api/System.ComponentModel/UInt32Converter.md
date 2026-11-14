---
title: "UInt32Converter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/UInt32Converter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UInt32Converter class

Namespace: `System.ComponentModel`

```csharp
public class UInt32Converter : System.ComponentModel.BaseNumberConverter
```

Provides a type converter to convert 32-bit unsigned integer objects to and from various other representations.

#### Remarks
This converter can only convert a 32-bit unsigned integer object to and from a string.

The `UInt32` value type represents unsigned integers with values ranging from 0 to 4,294,967,295. This data type is not supported in Visual Basic.

> **Note:**
>  You should never create an instance of a `UInt32Converter`. Instead, call the `TypeDescriptor.GetConverter` method of `TypeDescriptor`. For more information, see the examples in the `TypeConverter` base class.

#### Examples
The following example converts a variable of type `UInt32` to a string, and vice versa.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BooleanConverter/Overview/converters.cs._

## UInt32Converter.UInt32Converter() constructor

```csharp
public UInt32Converter ();
```

Initializes a new instance of the `UInt32Converter` class.

To be added.
