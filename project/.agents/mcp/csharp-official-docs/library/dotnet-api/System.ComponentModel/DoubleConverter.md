---
title: "DoubleConverter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/DoubleConverter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DoubleConverter class

Namespace: `System.ComponentModel`

```csharp
public class DoubleConverter : System.ComponentModel.BaseNumberConverter
```

Provides a type converter to convert double-precision, floating point number objects to and from various other representations.

#### Remarks
This converter can only convert a `Double` object to and from a string.

> **Note:**
>  You should never create an instance of `DoubleConverter`. Instead, call the `TypeDescriptor.GetConverter` method of `TypeDescriptor`. For more information, see the examples in the `TypeConverter` base class.

For more information about type converters, see the `TypeConverter` base class.

#### Examples
The following code example converts a variable of type `Double` to a string, and vice versa.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BooleanConverter/Overview/converters.cs._

## DoubleConverter.DoubleConverter() constructor

```csharp
public DoubleConverter ();
```

Initializes a new instance of the `DoubleConverter` class.

To be added.
