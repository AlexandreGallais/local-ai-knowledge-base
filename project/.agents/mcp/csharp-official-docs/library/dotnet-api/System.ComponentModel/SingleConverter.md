---
title: "SingleConverter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/SingleConverter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SingleConverter class

Namespace: `System.ComponentModel`

```csharp
public class SingleConverter : System.ComponentModel.BaseNumberConverter
```

Provides a type converter to convert single-precision, floating point number objects to and from various other representations.

#### Remarks
This converter can only convert a single-precision, floating point number object to and from a string. The `Single` value type represents a single-precision 32-bit number with values ranging from negative 3.402823e38 to positive 3.402823e38.

> **Note:**
>  You should never create an instance of `SingleConverter`. Instead, call the `TypeDescriptor.GetConverter` method of `TypeDescriptor`. For more information, see the examples in the `TypeConverter` base class.

#### Examples
The following sample converts a variable of type `Single` to a string, and vice versa.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BooleanConverter/Overview/converters.cs._

## SingleConverter.SingleConverter() constructor

```csharp
public SingleConverter ();
```

Initializes a new instance of the `SingleConverter` class.

To be added.
