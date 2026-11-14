---
title: "Int16Converter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/Int16Converter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Int16Converter class

Namespace: `System.ComponentModel`

```csharp
public class Int16Converter : System.ComponentModel.BaseNumberConverter
```

Provides a type converter to convert 16-bit signed integer objects to and from other representations.

#### Remarks
This converter can only convert a 16-bit signed integer object to and from a string. The `Int16` value type represents signed integers with values ranging from negative 32768 through positive 32767.

The `TypeConverter.ConvertFrom` method uses the `Int16.Parse` method of `Int16` with the integer value of `NumberStyles`.

The `TypeConverter.ConvertTo` method uses the general ("G") format for the string returned.

For more information about type converters, see the `TypeConverter` base class.

> **Note:**
>  You should never create an instance of an `Int16Converter`. Instead, call the `TypeDescriptor.GetConverter` method of `TypeDescriptor`. For more information, see the examples in the `TypeConverter` base class.

#### Examples
The following code example converts a variable of type `Int16` to a string, and vice versa.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BooleanConverter/Overview/converters.cs._

## Int16Converter.Int16Converter() constructor

```csharp
public Int16Converter ();
```

Initializes a new instance of the `Int16Converter` class.

To be added.
