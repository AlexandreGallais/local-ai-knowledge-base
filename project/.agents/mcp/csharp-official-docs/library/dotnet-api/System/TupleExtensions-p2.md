---
title: "TupleExtensions class (part 2 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TupleExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TupleExtensions class (part 2 of 7)

## TupleExtensions.Deconstruct<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11>(Tuple<T8,T9,T10,T11>>, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11) method

```csharp
public static void Deconstruct<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11> (this Tuple<T1,T2,T3,T4,T5,T6,T7,Tuple<T8,T9,T10,T11>> value, out T1 item1, out T2 item2, out T3 item3, out T4 item4, out T5 item5, out T6 item6, out T7 item7, out T8 item8, out T9 item9, out T10 item10, out T11 item11);
```

Deconstructs a tuple with 11 elements into separate variables.

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
- `value`: The 11-element tuple to deconstruct into 11 separate variables.
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

#### Remarks
This method is implemented primarily to support the tuple language features in C#.

Because the .NET tuple types implement tuples with more than 7 elements by nesting a tuple in `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.Rest`,  `item8` through `item11` are elements of nested tuples.

## TupleExtensions.Deconstruct<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11,T12>(Tuple<T8,T9,T10,T11,T12>>, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12) method

```csharp
public static void Deconstruct<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11,T12> (this Tuple<T1,T2,T3,T4,T5,T6,T7,Tuple<T8,T9,T10,T11,T12>> value, out T1 item1, out T2 item2, out T3 item3, out T4 item4, out T5 item5, out T6 item6, out T7 item7, out T8 item8, out T9 item9, out T10 item10, out T11 item11, out T12 item12);
```

Deconstructs a tuple with 12 elements into separate variables.

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
- `value`: The 12-element tuple to deconstruct into 12 separate variables.
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

#### Remarks
This method is implemented primarily to support the tuple language features in C#.

Because the .NET tuple types implement tuples with more than 7 elements by nesting a tuple in `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.Rest`,  `item8` through `item12` are elements of nested tuples.

## TupleExtensions.Deconstruct<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11,T12,T13>(Tuple<T8,T9,T10,T11,T12,T13>>, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13) method

```csharp
public static void Deconstruct<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11,T12,T13> (this Tuple<T1,T2,T3,T4,T5,T6,T7,Tuple<T8,T9,T10,T11,T12,T13>> value, out T1 item1, out T2 item2, out T3 item3, out T4 item4, out T5 item5, out T6 item6, out T7 item7, out T8 item8, out T9 item9, out T10 item10, out T11 item11, out T12 item12, out T13 item13);
```

Deconstructs a tuple with 13 elements into separate variables.

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
- `value`: The 13-element tuple to deconstruct into 13 separate variables.
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

#### Remarks
This method is implemented primarily to support the tuple language features in C#.

Because the .NET tuple types implement tuples with more than 7 elements by nesting a tuple in `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.Rest`,  `item8` through `item13` are elements of nested tuples.

## TupleExtensions.Deconstruct<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11,T12,T13,T14>(Tuple<T8,T9,T10,T11,T12,T13,T14>>, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14) method

```csharp
public static void Deconstruct<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11,T12,T13,T14> (this Tuple<T1,T2,T3,T4,T5,T6,T7,Tuple<T8,T9,T10,T11,T12,T13,T14>> value, out T1 item1, out T2 item2, out T3 item3, out T4 item4, out T5 item5, out T6 item6, out T7 item7, out T8 item8, out T9 item9, out T10 item10, out T11 item11, out T12 item12, out T13 item13, out T14 item14);
```

Deconstructs a tuple with 14 elements into separate variables.

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
- `value`: The 14-element tuple to deconstruct into 14 separate variables.
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

To be added.

## TupleExtensions.Deconstruct<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11,T12,T13,T14,T15>(Tuple<T15>>>, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15) method

```csharp
public static void Deconstruct<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11,T12,T13,T14,T15> (this Tuple<T1,T2,T3,T4,T5,T6,T7,Tuple<T8,T9,T10,T11,T12,T13,T14,Tuple<T15>>> value, out T1 item1, out T2 item2, out T3 item3, out T4 item4, out T5 item5, out T6 item6, out T7 item7, out T8 item8, out T9 item9, out T10 item10, out T11 item11, out T12 item12, out T13 item13, out T14 item14, out T15 item15);
```

Deconstructs a tuple with 15 elements into separate variables.

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
- `value`: The 15-element tuple to deconstruct into 15 separate variables.
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

#### Remarks
This method is implemented primarily to support the tuple language features in C#.

Because the .NET tuple types implement tuples with more than 7 elements by nesting a tuple in `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.Rest`,  `item8` through `item15` are elements of nested tuples.
