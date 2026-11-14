---
title: "TupleExtensions class (part 4 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TupleExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TupleExtensions class (part 4 of 7)

## TupleExtensions.Deconstruct<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11,T12,T13,T14,T15,T16,T17,T18,T19,T20>(Tuple<T15,T16,T17,T18,T19,T20>>>, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20) method

```csharp
public static void Deconstruct<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11,T12,T13,T14,T15,T16,T17,T18,T19,T20> (this Tuple<T1,T2,T3,T4,T5,T6,T7,Tuple<T8,T9,T10,T11,T12,T13,T14,Tuple<T15,T16,T17,T18,T19,T20>>> value, out T1 item1, out T2 item2, out T3 item3, out T4 item4, out T5 item5, out T6 item6, out T7 item7, out T8 item8, out T9 item9, out T10 item10, out T11 item11, out T12 item12, out T13 item13, out T14 item14, out T15 item15, out T16 item16, out T17 item17, out T18 item18, out T19 item19, out T20 item20);
```

Deconstructs a tuple with 20 elements into separate variables.

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
- `T11`: The type of the eleventh element.
- `T12`: The type of the twelfth element.
- `T13`: The type of the thirteenth element.
- `T14`: The type of the fourteenth element.
- `T15`: The type of the fifteenth element.
- `T16`: The type of the sixteenth element.
- `T17`: The type of the seventeenth element.
- `T18`: The type of the eighteenth element.
- `T19`: The type of the nineteenth element.
- `T20`: The type of the twentieth element.
- `value`: The 20-element tuple to deconstruct into 20 separate variables.
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
- `item11`: When this method returns, contains the value of the eleventh element, or `value``.Rest.Item4`.
- `item12`: When this method returns, contains the value of the twelfth element, or `value``.Rest.Item5`.
- `item13`: When this method returns, contains the value of the thirteenth element, or `value``.Rest.Item6`.
- `item14`: When this method returns, contains the value of the fourteenth element, or `value``.Rest.Item7`.
- `item15`: When this method returns, contains the value of the fifteenth element, or `value``.Rest.Rest.Item1`.
- `item16`: When this method returns, contains the value of the sixteenth element, or `value``.Rest.Rest.Item2`.
- `item17`: When this method returns, contains the value of the seventeenth element, or `value``.Rest.Rest.Item3`.
- `item18`: When this method returns, contains the value of the eighteenth element, or `value``.Rest.Rest.Item4`.
- `item19`: When this method returns, contains the value of the nineteenth element, or `value``.Rest.Rest.Item5`.
- `item20`: When this method returns, contains the value of the twentieth element, or `value``.Rest.Rest.Item6`.

To be added.

## TupleExtensions.Deconstruct<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11,T12,T13,T14,T15,T16,T17,T18,T19,T20,T21>(Tuple<T15,T16,T17,T18,T19,T20,T21>>>, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21) method

```csharp
public static void Deconstruct<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11,T12,T13,T14,T15,T16,T17,T18,T19,T20,T21> (this Tuple<T1,T2,T3,T4,T5,T6,T7,Tuple<T8,T9,T10,T11,T12,T13,T14,Tuple<T15,T16,T17,T18,T19,T20,T21>>> value, out T1 item1, out T2 item2, out T3 item3, out T4 item4, out T5 item5, out T6 item6, out T7 item7, out T8 item8, out T9 item9, out T10 item10, out T11 item11, out T12 item12, out T13 item13, out T14 item14, out T15 item15, out T16 item16, out T17 item17, out T18 item18, out T19 item19, out T20 item20, out T21 item21);
```

Deconstructs a tuple with 21 elements into separate variables.

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
- `T11`: The type of the eleventh element.
- `T12`: The type of the twelfth element.
- `T13`: The type of the thirteenth element.
- `T14`: The type of the fourteenth element.
- `T15`: The type of the fifteenth element.
- `T16`: The type of the sixteenth element.
- `T17`: The type of the seventeenth element.
- `T18`: The type of the eighteenth element.
- `T19`: The type of the nineteenth element.
- `T20`: The type of the twentieth element.
- `T21`: The type of the twenty-first element.
- `value`: The 21-element tuple to deconstruct into 21 separate variables.
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
- `item11`: When this method returns, contains the value of the eleventh element, or `value``.Rest.Item4`.
- `item12`: When this method returns, contains the value of the twelfth element, or `value``.Rest.Item5`.
- `item13`: When this method returns, contains the value of the thirteenth element, or `value``.Rest.Item6`.
- `item14`: When this method returns, contains the value of the fourteenth element, or `value``.Rest.Item7`.
- `item15`: When this method returns, contains the value of the fifteenth element, or `value``.Rest.Rest.Item1`.
- `item16`: When this method returns, contains the value of the sixteenth element, or `value``.Rest.Rest.Item2`.
- `item17`: When this method returns, contains the value of the seventeenth element, or `value``.Rest.Rest.Item3`.
- `item18`: When this method returns, contains the value of the eighteenth element, or `value``.Rest.Rest.Item4`.
- `item19`: When this method returns, contains the value of the nineteenth element, or `value``.Rest.Rest.Item5`.
- `item20`: When this method returns, contains the value of the twentieth element, or `value``.Rest.Rest.Item6`.
- `item21`: When this method returns, contains the value of the twenty-first element, or `value``.Rest.Rest.Item7`.

#### Remarks
This method is implemented primarily to support the tuple language features in C#.

Because the .NET tuple types implement tuples with more than 7 elements by nesting a tuple in `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.Rest`,  `item8` through `item21` are elements of nested tuples.

## TupleExtensions.ToTuple<T1>(ValueTuple<T1>) method

```csharp
public static Tuple<T1> ToTuple<T1> (this (T1) value);
```

Converts an instance of the `ValueTuple` structure to an instance of the  `Tuple` class.

Parameters:

- `T1`: The type of the first element.
- `value`: The value tuple instance to convert to a tuple.

Returns: The converted tuple.

To be added.

## TupleExtensions.ToTuple<T1,T2>(ValueTuple<T1,T2>) method

```csharp
public static Tuple<T1,T2> ToTuple<T1,T2> (this (T1, T2) value);
```

Converts an instance of the `ValueTuple` structure to an instance of the  `Tuple` class.

Parameters:

- `T1`: The type of the first element.
- `T2`: The type of the second element.
- `value`: The value tuple instance to convert to a tuple.

Returns: The converted tuple.

To be added.

## TupleExtensions.ToTuple<T1,T2,T3>(ValueTuple<T1,T2,T3>) method

```csharp
public static Tuple<T1,T2,T3> ToTuple<T1,T2,T3> (this (T1, T2, T3) value);
```

Converts an instance of the `ValueTuple` structure to an instance of the  `Tuple` class.

Parameters:

- `T1`: The type of the first element.
- `T2`: The type of the second element.
- `T3`: The type of the third element.
- `value`: The value tuple instance to convert to a tuple.

Returns: The converted tuple.

To be added.

## TupleExtensions.ToTuple<T1,T2,T3,T4>(ValueTuple<T1,T2,T3,T4>) method

```csharp
public static Tuple<T1,T2,T3,T4> ToTuple<T1,T2,T3,T4> (this (T1, T2, T3, T4) value);
```

Converts an instance of the `ValueTuple` structure to an instance of the  `Tuple` class.

Parameters:

- `T1`: The type of the first element.
- `T2`: The type of the second element.
- `T3`: The type of the third element.
- `T4`: The type of the fourth element.
- `value`: The value tuple instance to convert to a tuple.

Returns: The converted tuple.

To be added.

## TupleExtensions.ToTuple<T1,T2,T3,T4,T5>(ValueTuple<T1,T2,T3,T4,T5>) method

```csharp
public static Tuple<T1,T2,T3,T4,T5> ToTuple<T1,T2,T3,T4,T5> (this (T1, T2, T3, T4, T5) value);
```

Converts an instance of the `ValueTuple` structure to an instance of the  `Tuple` class.

Parameters:

- `T1`: The type of the first element.
- `T2`: The type of the second element.
- `T3`: The type of the third element.
- `T4`: The type of the fourth element.
- `T5`: The type of the fifth element.
- `value`: The value tuple instance to convert to a tuple.

Returns: The converted tuple.

To be added.

## TupleExtensions.ToTuple<T1,T2,T3,T4,T5,T6>(ValueTuple<T1,T2,T3,T4,T5,T6>) method

```csharp
public static Tuple<T1,T2,T3,T4,T5,T6> ToTuple<T1,T2,T3,T4,T5,T6> (this (T1, T2, T3, T4, T5, T6) value);
```

Converts an instance of the `ValueTuple` structure to an instance of the  `Tuple` class.

Parameters:

- `T1`: The type of the first element.
- `T2`: The type of the second element.
- `T3`: The type of the third element.
- `T4`: The type of the fourth element.
- `T5`: The type of the fifth element.
- `T6`: The type of the sixth element.
- `value`: The value tuple instance to convert to a tuple.

Returns: The converted tuple.

To be added.

## TupleExtensions.ToTuple<T1,T2,T3,T4,T5,T6,T7>(ValueTuple<T1,T2,T3,T4,T5,T6,T7>) method

```csharp
public static Tuple<T1,T2,T3,T4,T5,T6,T7> ToTuple<T1,T2,T3,T4,T5,T6,T7> (this (T1, T2, T3, T4, T5, T6, T7) value);
```

Converts an instance of the `ValueTuple` structure to an instance of the  `Tuple` class.

Parameters:

- `T1`: The type of the first element.
- `T2`: The type of the second element.
- `T3`: The type of the third element.
- `T4`: The type of the fourth element.
- `T5`: The type of the fifth element.
- `T6`: The type of the sixth element.
- `T7`: The type of the seventh element.
- `value`: The value tuple instance to convert to a tuple.

Returns: The converted tuple.

To be added.

## TupleExtensions.ToTuple<T1,T2,T3,T4,T5,T6,T7,T8>(ValueTuple<T8>>) method

```csharp
public static Tuple<T1,T2,T3,T4,T5,T6,T7,Tuple<T8>> ToTuple<T1,T2,T3,T4,T5,T6,T7,T8> (this (T1, T2, T3, T4, T5, T6, T7, T8) value);
```

Converts an instance of the `ValueTuple` structure to an instance of the  `Tuple` class.

Parameters:

- `T1`: The type of the first element.
- `T2`: The type of the second element.
- `T3`: The type of the third element.
- `T4`: The type of the fourth element.
- `T5`: The type of the fifth element.
- `T6`: The type of the sixth element.
- `T7`: The type of the seventh element.
- `T8`: The type of the eighth element, or `value``.Rest.Item1`.
- `value`: The value tuple instance to convert to a tuple.

Returns: The converted tuple.

To be added.

## TupleExtensions.ToTuple<T1,T2,T3,T4,T5,T6,T7,T8,T9>(ValueTuple<T8,T9>>) method

```csharp
public static Tuple<T1,T2,T3,T4,T5,T6,T7,Tuple<T8,T9>> ToTuple<T1,T2,T3,T4,T5,T6,T7,T8,T9> (this (T1, T2, T3, T4, T5, T6, T7, T8, T9) value);
```

Converts an instance of the `ValueTuple` structure to an instance of the  `Tuple` class.

Parameters:

- `T1`: The type of the first element.
- `T2`: The type of the second element.
- `T3`: The type of the third element.
- `T4`: The type of the fourth element.
- `T5`: The type of the fifth element.
- `T6`: The type of the sixth element.
- `T7`: The type of the seventh element.
- `T8`: The type of the eighth element, or `value``.Rest.Item1`.
- `T9`: The type of the ninth element, or `value``.Rest.Item2`.
- `value`: The value tuple instance to convert to a tuple.

Returns: The converted tuple.

To be added.

## TupleExtensions.ToTuple<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10>(ValueTuple<T8,T9,T10>>) method

```csharp
public static Tuple<T1,T2,T3,T4,T5,T6,T7,Tuple<T8,T9,T10>> ToTuple<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10> (this (T1, T2, T3, T4, T5, T6, T7, T8, T9, T10) value);
```

Converts an instance of the `ValueTuple` structure to an instance of the  `Tuple` class.

Parameters:

- `T1`: The type of the first element.
- `T2`: The type of the second element.
- `T3`: The type of the third element.
- `T4`: The type of the fourth element.
- `T5`: The type of the fifth element.
- `T6`: The type of the sixth element.
- `T7`: The type of the seventh element.
- `T8`: The type of the eighth element, or `value``.Rest.Item1`.
- `T9`: The type of the ninth element, or `value``.Rest.Item2`.
- `T10`: The type of the tenth element, or `value``.Rest.Item3`.
- `value`: The value tuple instance to convert to a tuple.

Returns: The converted tuple.

To be added.
