---
title: "TupleExtensions class (part 1 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TupleExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TupleExtensions class

Namespace: `System`

```csharp
public static class TupleExtensions
```

Provides extension methods for tuples to interoperate with language support for tuples in C#.

#### Remarks
Although these methods can be called directly, they are primarily intended for use by the C# compiler in creating and deconstructing tuples.

## TupleExtensions.Deconstruct<T1>(Tuple<T1>, T1) method

```csharp
public static void Deconstruct<T1> (this Tuple<T1> value, out T1 item1);
```

Deconstructs a tuple with 1 element into a separate variable.

Parameters:

- `T1`: The type of the single element.
- `value`: The 1-element tuple to deconstruct into a separate variable.
- `item1`: When this method returns, contains the value of the single element.

#### Remarks
This method is implemented primarily to support the tuple language features in C#.

## TupleExtensions.Deconstruct<T1,T2>(Tuple<T1,T2>, T1, T2) method

```csharp
public static void Deconstruct<T1,T2> (this Tuple<T1,T2> value, out T1 item1, out T2 item2);
```

Deconstructs a tuple with 2 elements into separate variables.

Parameters:

- `T1`: The type of the first element.
- `T2`: The type of the second element.
- `value`: The 2-element tuple to deconstruct into 2 separate variables.
- `item1`: When this method returns, contains the value of the first element.
- `item2`: When this method returns, contains the value of the second element.

#### Remarks
This method is implemented primarily to support the tuple language features in C#.

## TupleExtensions.Deconstruct<T1,T2,T3>(Tuple<T1,T2,T3>, T1, T2, T3) method

```csharp
public static void Deconstruct<T1,T2,T3> (this Tuple<T1,T2,T3> value, out T1 item1, out T2 item2, out T3 item3);
```

Deconstructs a tuple with 3 elements into separate variables.

Parameters:

- `T1`: The type of the first element.
- `T2`: The type of the second element.
- `T3`: The type of the third element.
- `value`: The 3-element tuple to deconstruct into 3 separate variables.
- `item1`: When this method returns, contains the value of the first element.
- `item2`: When this method returns, contains the value of the second element.
- `item3`: When this method returns, contains the value of the third element.

#### Remarks
This method is implemented primarily to support the tuple language features in C#.

## TupleExtensions.Deconstruct<T1,T2,T3,T4>(Tuple<T1,T2,T3,T4>, T1, T2, T3, T4) method

```csharp
public static void Deconstruct<T1,T2,T3,T4> (this Tuple<T1,T2,T3,T4> value, out T1 item1, out T2 item2, out T3 item3, out T4 item4);
```

Deconstructs a tuple with 4 elements into separate variables.

Parameters:

- `T1`: The type of the first element.
- `T2`: The type of the second element.
- `T3`: The type of the third element.
- `T4`: The type of the fourth element.
- `value`: The 4-element tuple to deconstruct into 4 separate variables.
- `item1`: When this method returns, contains the value of the first element.
- `item2`: When this method returns, contains the value of the second element.
- `item3`: When this method returns, contains the value of the third element.
- `item4`: When this method returns, contains the value of the fourth element.

#### Remarks
This method is implemented primarily to support the tuple language features in C#.

## TupleExtensions.Deconstruct<T1,T2,T3,T4,T5>(Tuple<T1,T2,T3,T4,T5>, T1, T2, T3, T4, T5) method

```csharp
public static void Deconstruct<T1,T2,T3,T4,T5> (this Tuple<T1,T2,T3,T4,T5> value, out T1 item1, out T2 item2, out T3 item3, out T4 item4, out T5 item5);
```

Deconstructs a tuple with 5 elements into separate variables.

Parameters:

- `T1`: The type of the first element.
- `T2`: The type of the second element.
- `T3`: The type of the third element.
- `T4`: The type of the fourth element.
- `T5`: The type of the fifth element.
- `value`: The 5-element tuple to deconstruct into 5 separate variables.
- `item1`: When this method returns, contains the value of the first element.
- `item2`: When this method returns, contains the value of the second element.
- `item3`: When this method returns, contains the value of the third element.
- `item4`: When this method returns, contains the value of the fourth element.
- `item5`: When this method returns, contains the value of the fifth element.

#### Remarks
This method is implemented primarily to support the tuple language features in C#.

## TupleExtensions.Deconstruct<T1,T2,T3,T4,T5,T6>(Tuple<T1,T2,T3,T4,T5,T6>, T1, T2, T3, T4, T5, T6) method

```csharp
public static void Deconstruct<T1,T2,T3,T4,T5,T6> (this Tuple<T1,T2,T3,T4,T5,T6> value, out T1 item1, out T2 item2, out T3 item3, out T4 item4, out T5 item5, out T6 item6);
```

Deconstructs a tuple with 6 elements into separate variables.

Parameters:

- `T1`: The type of the first element.
- `T2`: The type of the second element.
- `T3`: The type of the third element.
- `T4`: The type of the fourth element.
- `T5`: The type of the fifth element.
- `T6`: The type of the sixth element.
- `value`: The 6-element tuple to deconstruct into 6 separate variables.
- `item1`: When this method returns, contains the value of the first element.
- `item2`: When this method returns, contains the value of the second element.
- `item3`: When this method returns, contains the value of the third element.
- `item4`: When this method returns, contains the value of the fourth element.
- `item5`: When this method returns, contains the value of the fifth element.
- `item6`: When this method returns, contains the value of the sixth element.

#### Remarks
This method is implemented primarily to support the tuple language features in C#.

## TupleExtensions.Deconstruct<T1,T2,T3,T4,T5,T6,T7>(Tuple<T1,T2,T3,T4,T5,T6,T7>, T1, T2, T3, T4, T5, T6, T7) method

```csharp
public static void Deconstruct<T1,T2,T3,T4,T5,T6,T7> (this Tuple<T1,T2,T3,T4,T5,T6,T7> value, out T1 item1, out T2 item2, out T3 item3, out T4 item4, out T5 item5, out T6 item6, out T7 item7);
```

Deconstructs a tuple with 7 elements into separate variables.

Parameters:

- `T1`: The type of the first element.
- `T2`: The type of the second element.
- `T3`: The type of the third element.
- `T4`: The type of the fourth element.
- `T5`: The type of the fifth element.
- `T6`: The type of the sixth element.
- `T7`: The type of the seventh element.
- `value`: The 7-element tuple to deconstruct into 7 separate variables.
- `item1`: When this method returns, contains the value of the first element.
- `item2`: When this method returns, contains the value of the second element.
- `item3`: When this method returns, contains the value of the third element.
- `item4`: When this method returns, contains the value of the fourth element.
- `item5`: When this method returns, contains the value of the fifth element.
- `item6`: When this method returns, contains the value of the sixth element.
- `item7`: When this method returns, contains the value of the seventh element.

#### Remarks
This method is implemented primarily to support the tuple language features in C#.

## TupleExtensions.Deconstruct<T1,T2,T3,T4,T5,T6,T7,T8>(Tuple<T8>>, T1, T2, T3, T4, T5, T6, T7, T8) method

```csharp
public static void Deconstruct<T1,T2,T3,T4,T5,T6,T7,T8> (this Tuple<T1,T2,T3,T4,T5,T6,T7,Tuple<T8>> value, out T1 item1, out T2 item2, out T3 item3, out T4 item4, out T5 item5, out T6 item6, out T7 item7, out T8 item8);
```

Deconstructs a tuple with 8 elements into separate variables.

Parameters:

- `T1`: The type of the first element.
- `T2`: The type of the second element.
- `T3`: The type of the third element.
- `T4`: The type of the fourth element.
- `T5`: The type of the fifth element.
- `T6`: The type of the sixth element.
- `T7`: The type of the seventh element.
- `T8`: The type of the eighth element.
- `value`: The 8-element tuple to deconstruct into 8 separate variables.
- `item1`: When this method returns, contains the value of the first element.
- `item2`: When this method returns, contains the value of the second element.
- `item3`: When this method returns, contains the value of the third element.
- `item4`: When this method returns, contains the value of the fourth element.
- `item5`: When this method returns, contains the value of the fifth element.
- `item6`: When this method returns, contains the value of the sixth element.
- `item7`: When this method returns, contains the value of the seventh element.
- `item8`: When this method returns, contains the value of the eighth element, or `value``.Rest.Item1`.

#### Remarks
This method is implemented primarily to support the tuple language features in C#.

Because the .NET tuple types implement tuples with more than 7 elements by nesting a tuple in `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.Rest`,  `item8` is an element in a nested tuple.

## TupleExtensions.Deconstruct<T1,T2,T3,T4,T5,T6,T7,T8,T9>(Tuple<T8,T9>>, T1, T2, T3, T4, T5, T6, T7, T8, T9) method

```csharp
public static void Deconstruct<T1,T2,T3,T4,T5,T6,T7,T8,T9> (this Tuple<T1,T2,T3,T4,T5,T6,T7,Tuple<T8,T9>> value, out T1 item1, out T2 item2, out T3 item3, out T4 item4, out T5 item5, out T6 item6, out T7 item7, out T8 item8, out T9 item9);
```

Deconstructs a tuple with 9 elements into separate variables.

Parameters:

- `T1`: The type of the first element.
- `T2`: The type of the second element.
- `T3`: The type of the third element.
- `T4`: The type of the fourth element.
- `T5`: The type of the fifth element.
- `T6`: The type of the sixth element.
- `T7`: The type of the seventh element.
- `T8`: The type of the eighth element.
- `T9`: The type of the ninth element.
- `value`: The 9-element tuple to deconstruct into 9 separate variables.
- `item1`: When this method returns, contains the value of the first element.
- `item2`: When this method returns, contains the value of the second element.
- `item3`: When this method returns, contains the value of the third element.
- `item4`: When this method returns, contains the value of the fourth element.
- `item5`: When this method returns, contains the value of the fifth element.
- `item6`: When this method returns, contains the value of the sixth element.
- `item7`: When this method returns, contains the value of the seventh element.
- `item8`: When this method returns, contains the value of the eighth element, or `value``.Rest.Item1`.
- `item9`: When this method returns, contains the value of the ninth element, or `value``.Rest.Item2`.

#### Remarks
This method is implemented primarily to support the tuple language features in C#.

Because the .NET tuple types implement tuples with more than 7 elements by nesting a tuple in `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.Rest`,  `item8` and `item9` are elements of nested tuples.

## TupleExtensions.Deconstruct<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10>(Tuple<T8,T9,T10>>, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10) method

```csharp
public static void Deconstruct<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10> (this Tuple<T1,T2,T3,T4,T5,T6,T7,Tuple<T8,T9,T10>> value, out T1 item1, out T2 item2, out T3 item3, out T4 item4, out T5 item5, out T6 item6, out T7 item7, out T8 item8, out T9 item9, out T10 item10);
```

Deconstructs a tuple with 10 elements into separate variables.

Parameters:

- `T1`: The type of the first element.
- `T2`: The type of the second element.
- `T3`: The type of the third element.
- `T4`: The type of the fourth element.
- `T5`: The type of the fifth element.
- `T6`: The type of the sixth element.
- `T7`: The type of the seventh element.
- `T8`: The type of the eighth element.
- `T9`: The type of the ninth element.
- `T10`: The type of the tenth element.
- `value`: The 10-element tuple to deconstruct into 10 separate variables.
- `item1`: When this method returns, contains the value of the first element.
- `item2`: When this method returns, contains the value of the second element.
- `item3`: When this method returns, contains the value of the third element.
- `item4`: When this method returns, contains the value of the fourth element.
- `item5`: When this method returns, contains the value of the fifth element.
- `item6`: When this method returns, contains the value of the sixth element.
- `item7`: When this method returns, contains the value of the seventh element.
- `item8`: When this method returns, contains the value of the eighth element, or `value``.Rest.Item1`.
- `item9`: When this method returns, contains the value of the ninth element, or `value``.Rest.Item2`.
- `item10`: When this method returns, contains the value of the tenth element, or `value``.Rest.Item3`.

#### Remarks
This method is implemented primarily to support the tuple language features in C#.

Because the .NET tuple types implement tuples with more than 7 elements by nesting a tuple in `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.Rest`,  `item8` through `item10` are elements of nested tuples.
