---
title: "Int32Converter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/Int32Converter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Int32Converter class

Namespace: `System.ComponentModel`

```csharp
public class Int32Converter : System.ComponentModel.BaseNumberConverter
```

Provides a type converter to convert 32-bit signed integer objects to and from other representations.

#### Remarks
This converter can only convert a 32-bit signed integer object to and from a string. The `Int32` value type represents signed integers with values ranging from negative 2,147,483,648 through positive 2,147,483,647.

The `TypeConverter.ConvertFrom` method uses the `Int32.Parse` method of `Int32` with the integer value of `NumberStyles`.

The `TypeConverter.ConvertTo` method uses the general ("G") format for the string returned.

For more information about type converters, see the `TypeConverter` base class.

> **Note:**
>  You should never create an instance of an `Int32Converter`. Instead, call the `TypeDescriptor.GetConverter` method of `TypeDescriptor`. For more information, see the examples in the `TypeConverter` base class.

#### Examples
The following code example converts a variable of type `Int32` to a string and vice versa.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BooleanConverter/Overview/converters.cs._

## Int32Converter.Int32Converter() constructor

```csharp
public Int32Converter ();
```

Initializes a new instance of the `Int32Converter` class.

To be added.
