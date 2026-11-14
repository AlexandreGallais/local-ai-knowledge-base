---
title: "ByteConverter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/ByteConverter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ByteConverter class

Namespace: `System.ComponentModel`

```csharp
public class ByteConverter : System.ComponentModel.BaseNumberConverter
```

Provides a type converter to convert 8-bit unsigned integer objects to and from various other representations.

#### Remarks
This converter can only convert an 8-bit unsigned integer to and from a string.

For more information about type converters, see the `TypeConverter` base class.

> **Note:**
>  You should never create an instance of a `ByteConverter`. Instead, call the `TypeDescriptor.GetConverter` method of `TypeDescriptor`. For more information, see the examples in the `TypeConverter` base class.

#### Examples
The following code example declares and initializes an 8-bit unsigned integer and a string. The code then converts each of them to the other's type, respectively.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BooleanConverter/Overview/converters.cs._

## ByteConverter.ByteConverter() constructor

```csharp
public ByteConverter ();
```

Initializes a new instance of the `ByteConverter` class.

To be added.
