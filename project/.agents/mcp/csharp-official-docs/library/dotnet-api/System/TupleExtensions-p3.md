---
title: "TupleExtensions class (part 3 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TupleExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TupleExtensions class (part 3 of 7)

## TupleExtensions.Deconstruct<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11,T12,T13,T14,T15,T16>(Tuple<T15,T16>>>, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16) method

```csharp
public static void Deconstruct<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11,T12,T13,T14,T15,T16> (this Tuple<T1,T2,T3,T4,T5,T6,T7,Tuple<T8,T9,T10,T11,T12,T13,T14,Tuple<T15,T16>>> value, out T1 item1, out T2 item2, out T3 item3, out T4 item4, out T5 item5, out T6 item6, out T7 item7, out T8 item8, out T9 item9, out T10 item10, out T11 item11, out T12 item12, out T13 item13, out T14 item14, out T15 item15, out T16 item16);
```

Deconstructs a tuple with 16 elements into separate variables.

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
- `value`: The 16-element tuple to deconstruct into 16 separate variables.
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

#### Remarks
This method is implemented primarily to support the tuple language features in C#.

Because the .NET tuple types implement tuples with more than 7 elements by nesting a tuple in `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.Rest`,  `item8` through `item16` are elements of nested tuples.

## TupleExtensions.Deconstruct<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11,T12,T13,T14,T15,T16,T17>(Tuple<T15,T16,T17>>>, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17) method

```csharp
public static void Deconstruct<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11,T12,T13,T14,T15,T16,T17> (this Tuple<T1,T2,T3,T4,T5,T6,T7,Tuple<T8,T9,T10,T11,T12,T13,T14,Tuple<T15,T16,T17>>> value, out T1 item1, out T2 item2, out T3 item3, out T4 item4, out T5 item5, out T6 item6, out T7 item7, out T8 item8, out T9 item9, out T10 item10, out T11 item11, out T12 item12, out T13 item13, out T14 item14, out T15 item15, out T16 item16, out T17 item17);
```

Deconstructs a tuple with 17 elements into separate variables.

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
- `value`: The 17-element tuple to deconstruct into 17 separate variables.
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

#### Remarks
This method is implemented primarily to support the tuple language features in C#.

Because the .NET tuple types implement tuples with more than 7 elements by nesting a tuple in `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.Rest`,  `item8` through `item17` are elements of nested tuples.

## TupleExtensions.Deconstruct<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11,T12,T13,T14,T15,T16,T17,T18>(Tuple<T15,T16,T17,T18>>>, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18) method

```csharp
public static void Deconstruct<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11,T12,T13,T14,T15,T16,T17,T18> (this Tuple<T1,T2,T3,T4,T5,T6,T7,Tuple<T8,T9,T10,T11,T12,T13,T14,Tuple<T15,T16,T17,T18>>> value, out T1 item1, out T2 item2, out T3 item3, out T4 item4, out T5 item5, out T6 item6, out T7 item7, out T8 item8, out T9 item9, out T10 item10, out T11 item11, out T12 item12, out T13 item13, out T14 item14, out T15 item15, out T16 item16, out T17 item17, out T18 item18);
```

Deconstructs a tuple with 18 elements into separate variables.

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
- `value`: The 18-element tuple to deconstruct into 18 separate variables.
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

#### Remarks
This method is implemented primarily to support the tuple language features in C#.

Because the .NET tuple types implement tuples with more than 7 elements by nesting a tuple in `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.Rest`,  `item8` through `item18` are elements of nested tuples.

## TupleExtensions.Deconstruct<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11,T12,T13,T14,T15,T16,T17,T18,T19>(Tuple<T15,T16,T17,T18,T19>>>, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19) method

```csharp
public static void Deconstruct<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11,T12,T13,T14,T15,T16,T17,T18,T19> (this Tuple<T1,T2,T3,T4,T5,T6,T7,Tuple<T8,T9,T10,T11,T12,T13,T14,Tuple<T15,T16,T17,T18,T19>>> value, out T1 item1, out T2 item2, out T3 item3, out T4 item4, out T5 item5, out T6 item6, out T7 item7, out T8 item8, out T9 item9, out T10 item10, out T11 item11, out T12 item12, out T13 item13, out T14 item14, out T15 item15, out T16 item16, out T17 item17, out T18 item18, out T19 item19);
```

Deconstructs a tuple with 19 elements into separate variables.

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
- `value`: The 19-element tuple to deconstruct into 19 separate variables.
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

#### Remarks
This method is implemented primarily to support the tuple language features in C#.

Because the .NET tuple types implement tuples with more than 7 elements by nesting a tuple in `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.Rest`,  `item8` through `item19` are elements of nested tuples.
