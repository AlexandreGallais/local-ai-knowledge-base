---
title: "TupleExtensions class (part 6 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TupleExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TupleExtensions class (part 6 of 7)

## TupleExtensions.ToTuple<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11,T12,T13,T14,T15,T16,T17,T18,T19,T20,T21>(ValueTuple<T15,T16,T17,T18,T19,T20,T21>>>) method

```csharp
public static Tuple<T1,T2,T3,T4,T5,T6,T7,Tuple<T8,T9,T10,T11,T12,T13,T14,Tuple<T15,T16,T17,T18,T19,T20,T21>>> ToTuple<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11,T12,T13,T14,T15,T16,T17,T18,T19,T20,T21> (this (T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21) value);
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
- `T11`: The type of the eleventh element, or `value``.Rest.Item4`.
- `T12`: The type of the twelfth element, or `value``.Rest.Item5`.
- `T13`: The type of the thirteenth element, or `value``.Rest.Item6`.
- `T14`: The type of the fourteenth element, or `value``.Rest.Item7`.
- `T15`: The type of the fifteenth element, or `value``.Rest.Rest.Item1`.
- `T16`: The type of the sixteenth element, or `value``.Rest.Rest.Item2`.
- `T17`: The type of the seventeenth element, or `value``.Rest.Rest.Item3`.
- `T18`: The type of the eighteenth element, or `value``.Rest.Rest.Item4`.
- `T19`: The type of the nineteenth element, or `value``.Rest.Rest.Item5`.
- `T20`: The type of the twentieth element, or `value``.Rest.Rest.Item6`.
- `T21`: The type of the twenty-first element, or `value``.Rest.Rest.Item7`.
- `value`: The value tuple instance to convert to a tuple.

Returns: The converted tuple.

To be added.

## TupleExtensions.ToValueTuple<T1>(Tuple<T1>) method

```csharp
public static (T1) ToValueTuple<T1> (this Tuple<T1> value);
```

Converts an instance of the `Tuple` class to an instance of the  `ValueTuple` structure.

Parameters:

- `T1`: The type of the first element.
- `value`: The tuple object to convert to a value tuple.

Returns: The converted value tuple instance.

To be added.

## TupleExtensions.ToValueTuple<T1,T2>(Tuple<T1,T2>) method

```csharp
public static (T1, T2) ToValueTuple<T1,T2> (this Tuple<T1,T2> value);
```

Converts an instance of the `Tuple` class to an instance of the  `ValueTuple` structure.

Parameters:

- `T1`: The type of the first element.
- `T2`: The type of the second element.
- `value`: The tuple object to convert to a value tuple.

Returns: The converted value tuple instance.

To be added.

## TupleExtensions.ToValueTuple<T1,T2,T3>(Tuple<T1,T2,T3>) method

```csharp
public static (T1, T2, T3) ToValueTuple<T1,T2,T3> (this Tuple<T1,T2,T3> value);
```

Converts an instance of the `Tuple` class to an instance of the  `ValueTuple` structure.

Parameters:

- `T1`: The type of the first element.
- `T2`: The type of the second element.
- `T3`: The type of the third element.
- `value`: The tuple object to convert to a value tuple.

Returns: The converted value tuple instance.

To be added.

## TupleExtensions.ToValueTuple<T1,T2,T3,T4>(Tuple<T1,T2,T3,T4>) method

```csharp
public static (T1, T2, T3, T4) ToValueTuple<T1,T2,T3,T4> (this Tuple<T1,T2,T3,T4> value);
```

Converts an instance of the `Tuple` class to an instance of the  `ValueTuple` structure.

Parameters:

- `T1`: The type of the first element.
- `T2`: The type of the second element.
- `T3`: The type of the third element.
- `T4`: The type of the fourth element.
- `value`: The tuple object to convert to a value tuple.

Returns: The converted value tuple instance.

To be added.

## TupleExtensions.ToValueTuple<T1,T2,T3,T4,T5>(Tuple<T1,T2,T3,T4,T5>) method

```csharp
public static (T1, T2, T3, T4, T5) ToValueTuple<T1,T2,T3,T4,T5> (this Tuple<T1,T2,T3,T4,T5> value);
```

Converts an instance of the `Tuple` class to an instance of the  `ValueTuple` structure.

Parameters:

- `T1`: The type of the first element.
- `T2`: The type of the second element.
- `T3`: The type of the third element.
- `T4`: The type of the fourth element.
- `T5`: The type of the fifth element.
- `value`: The tuple object to convert to a value tuple.

Returns: The converted value tuple instance.

To be added.

## TupleExtensions.ToValueTuple<T1,T2,T3,T4,T5,T6>(Tuple<T1,T2,T3,T4,T5,T6>) method

```csharp
public static (T1, T2, T3, T4, T5, T6) ToValueTuple<T1,T2,T3,T4,T5,T6> (this Tuple<T1,T2,T3,T4,T5,T6> value);
```

Converts an instance of the `Tuple` class to an instance of the  `ValueTuple` structure.

Parameters:

- `T1`: The type of the first element.
- `T2`: The type of the second element.
- `T3`: The type of the third element.
- `T4`: The type of the fourth element.
- `T5`: The type of the fifth element.
- `T6`: The type of the sixth element.
- `value`: The tuple object to convert to a value tuple.

Returns: The converted value tuple instance.

To be added.

## TupleExtensions.ToValueTuple<T1,T2,T3,T4,T5,T6,T7>(Tuple<T1,T2,T3,T4,T5,T6,T7>) method

```csharp
public static (T1, T2, T3, T4, T5, T6, T7) ToValueTuple<T1,T2,T3,T4,T5,T6,T7> (this Tuple<T1,T2,T3,T4,T5,T6,T7> value);
```

Converts an instance of the `Tuple` class to an instance of the  `ValueTuple` structure.

Parameters:

- `T1`: The type of the first element.
- `T2`: The type of the second element.
- `T3`: The type of the third element.
- `T4`: The type of the fourth element.
- `T5`: The type of the fifth element.
- `T6`: The type of the sixth element.
- `T7`: The type of the seventh element.
- `value`: The tuple object to convert to a value tuple.

Returns: The converted value tuple instance.

To be added.

## TupleExtensions.ToValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>(Tuple<T8>>) method

```csharp
public static (T1, T2, T3, T4, T5, T6, T7, T8) ToValueTuple<T1,T2,T3,T4,T5,T6,T7,T8> (this Tuple<T1,T2,T3,T4,T5,T6,T7,Tuple<T8>> value);
```

Converts an instance of the `Tuple` class to an instance of the  `ValueTuple` structure.

Parameters:

- `T1`: The type of the first element.
- `T2`: The type of the second element.
- `T3`: The type of the third element.
- `T4`: The type of the fourth element.
- `T5`: The type of the fifth element.
- `T6`: The type of the sixth element.
- `T7`: The type of the seventh element.
- `T8`: The type of the eighth element, or `value``.Rest.Item1`.
- `value`: The tuple object to convert to a value tuple.

Returns: The converted value tuple instance.

To be added.

## TupleExtensions.ToValueTuple<T1,T2,T3,T4,T5,T6,T7,T8,T9>(Tuple<T8,T9>>) method

```csharp
public static (T1, T2, T3, T4, T5, T6, T7, T8, T9) ToValueTuple<T1,T2,T3,T4,T5,T6,T7,T8,T9> (this Tuple<T1,T2,T3,T4,T5,T6,T7,Tuple<T8,T9>> value);
```

Converts an instance of the `Tuple` class to an instance of the  `ValueTuple` structure.

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
- `value`: The tuple object to convert to a value tuple.

Returns: The converted value tuple instance.

To be added.

## TupleExtensions.ToValueTuple<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10>(Tuple<T8,T9,T10>>) method

```csharp
public static (T1, T2, T3, T4, T5, T6, T7, T8, T9, T10) ToValueTuple<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10> (this Tuple<T1,T2,T3,T4,T5,T6,T7,Tuple<T8,T9,T10>> value);
```

Converts an instance of the `Tuple` class to an instance of the  `ValueTuple` structure.

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
- `value`: The tuple object to convert to a value tuple.

Returns: The converted value tuple instance.

To be added.

## TupleExtensions.ToValueTuple<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11>(Tuple<T8,T9,T10,T11>>) method

```csharp
public static (T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11) ToValueTuple<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11> (this Tuple<T1,T2,T3,T4,T5,T6,T7,Tuple<T8,T9,T10,T11>> value);
```

Converts an instance of the `Tuple` class to an instance of the  `ValueTuple` structure.

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
- `T11`: The type of the eleventh element, or `value``.Rest.Item4`.
- `value`: The tuple object to convert to a value tuple.

Returns: The converted value tuple instance.

To be added.

## TupleExtensions.ToValueTuple<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11,T12>(Tuple<T8,T9,T10,T11,T12>>) method

```csharp
public static (T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12) ToValueTuple<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11,T12> (this Tuple<T1,T2,T3,T4,T5,T6,T7,Tuple<T8,T9,T10,T11,T12>> value);
```

Converts an instance of the `Tuple` class to an instance of the  `ValueTuple` structure.

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
- `T11`: The type of the eleventh element, or `value``.Rest.Item4`.
- `T12`: The type of the twelfth element, or `value``.Rest.Item5`.
- `value`: The tuple object to convert to a value tuple.

Returns: The converted value tuple instance.

To be added.

## TupleExtensions.ToValueTuple<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11,T12,T13>(Tuple<T8,T9,T10,T11,T12,T13>>) method

```csharp
public static (T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13) ToValueTuple<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11,T12,T13> (this Tuple<T1,T2,T3,T4,T5,T6,T7,Tuple<T8,T9,T10,T11,T12,T13>> value);
```

Converts an instance of the `Tuple` class to an instance of the  `ValueTuple` structure.

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
- `T11`: The type of the eleventh element, or `value``.Rest.Item4`.
- `T12`: The type of the twelfth element, or `value``.Rest.Item5`.
- `T13`: The type of the thirteenth element, or `value``.Rest.Item6`.
- `value`: The tuple object to convert to a value tuple.

Returns: The converted value tuple instance.

To be added.

## TupleExtensions.ToValueTuple<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11,T12,T13,T14>(Tuple<T8,T9,T10,T11,T12,T13,T14>>) method

```csharp
public static (T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14) ToValueTuple<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11,T12,T13,T14> (this Tuple<T1,T2,T3,T4,T5,T6,T7,Tuple<T8,T9,T10,T11,T12,T13,T14>> value);
```

Converts an instance of the `Tuple` class to an instance of the  `ValueTuple` structure.

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
- `T11`: The type of the eleventh element, or `value``.Rest.Item4`.
- `T12`: The type of the twelfth element, or `value``.Rest.Item5`.
- `T13`: The type of the thirteenth element, or `value``.Rest.Item6`.
- `T14`: The type of the fourteenth element, or `value``.Rest.Item7`.
- `value`: The tuple object to convert to a value tuple.

Returns: The converted value tuple instance.

To be added.

## TupleExtensions.ToValueTuple<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11,T12,T13,T14,T15>(Tuple<T15>>>) method

```csharp
public static (T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15) ToValueTuple<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11,T12,T13,T14,T15> (this Tuple<T1,T2,T3,T4,T5,T6,T7,Tuple<T8,T9,T10,T11,T12,T13,T14,Tuple<T15>>> value);
```

Converts an instance of the `Tuple` class to an instance of the  `ValueTuple` structure.

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
- `T11`: The type of the eleventh element, or `value``.Rest.Item4`.
- `T12`: The type of the twelfth element, or `value``.Rest.Item5`.
- `T13`: The type of the thirteenth element, or `value``.Rest.Item6`.
- `T14`: The type of the fourteenth element, or `value``.Rest.Item7`.
- `T15`: The type of the fifteenth element, or `value``.Rest.Rest.Item1`.
- `value`: The tuple object to convert to a value tuple.

Returns: The converted value tuple instance.

To be added.
