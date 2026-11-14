---
title: "Converter<TInput,TOutput> delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Converter`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Converter<TInput,TOutput> delegate

Namespace: `System`

```csharp
public delegate TOutput Converter<in TInput,out TOutput>(TInput input) where TInput : allows ref struct where TOutput : allows ref struct;
```

Represents a method that converts an object from one type to another type.

Parameters:

- `TInput`: The type of object that is to be converted.
- `TOutput`: The type the input object is to be converted to.
- `input`: The object to convert.

Returns: The `TOutput` that represents the converted `TInput`.

#### Remarks
This delegate is used by the `Array.ConvertAll` method of the `Array` class and the `List<T>.ConvertAll` method of the `List<T>` class to convert each element of the collection from one type to another.

#### Examples
This section contains two code examples. The first demonstrates the `Converter<T1,T2>` delegate with the `Array.ConvertAll` method of the `Array` class, and the second demonstrates the delegate with the `List<T>.ConvertAll` method of the `List<T>` generic class.

Example 1

The following code example defines a method named `PointFToPoint` that converts a `PointF` structure to a `Point` structure. The example then creates an array of `PointF` structures, creates a `Converter<PointF, Point>` delegate (`Converter(Of PointF, Point)` in Visual Basic) to represent the `PointFToPoint` method, and passes the delegate to the `Array.ConvertAll` method. The `Array.ConvertAll` method passes each element of the input list to the `PointFToPoint` method and puts the converted elements into a new list of `Point` structures. Both lists are displayed.

_Code sample not included: ~/snippets/csharp/System/Array/ConvertAllTInput,TOutput/source.cs._

Example 2

The following code example defines a method named `PointFToPoint` that converts a `PointF` structure to a `Point` structure. The example then creates a `List<T>` of `PointF` structures, creates a `Converter<PointF, Point>` delegate (`Converter(Of PointF, Point)` in Visual Basic) to represent the `PointFToPoint` method, and passes the delegate to the `List<T>.ConvertAll` method. The `List<T>.ConvertAll` method passes each element of the input list to the `PointFToPoint` method and puts the converted elements into a new list of `Point` structures. Both lists are displayed.

_Code sample not included: ~/snippets/csharp/System/ConverterTInput,TOutput/Overview/source.cs._
