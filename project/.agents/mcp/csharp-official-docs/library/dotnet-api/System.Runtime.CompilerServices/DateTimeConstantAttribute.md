---
title: "DateTimeConstantAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/DateTimeConstantAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTimeConstantAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class DateTimeConstantAttribute : System.Runtime.CompilerServices.CustomConstantAttribute
```

Persists an 8-byte `DateTime` constant for a field or parameter.

#### Remarks
You can apply this attribute to fields or parameters.

For more information about constant attributes, see the `CustomConstantAttribute` class.

The classes in `CompilerServices` are for compiler writers use only.

## DateTimeConstantAttribute.DateTimeConstantAttribute(Int64) constructor

```csharp
public DateTimeConstantAttribute (long ticks);
```

Initializes a new instance of the `DateTimeConstantAttribute` class with the number of 100-nanosecond ticks that represent the date and time of this instance.

Parameters:

- `ticks`: The number of 100-nanosecond ticks that represent the date and time of this instance.

To be added.

## DateTimeConstantAttribute.Value property

```csharp
public override object Value { get; }
```

Gets the number of 100-nanosecond ticks that represent the date and time of this instance.

Returns: The number of 100-nanosecond ticks that represent the date and time of this instance.

To be added.
