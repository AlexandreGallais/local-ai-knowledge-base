---
title: "NumberFormatInfo class (part 5 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/NumberFormatInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NumberFormatInfo class (part 5 of 5)

## NumberFormatInfo.PercentPositivePattern property

```csharp
public int PercentPositivePattern { get; set; }
```

Gets or sets the format pattern for positive percent values.

Returns: The format pattern for positive percent values. The default for `NumberFormatInfo.InvariantInfo` is 0, which represents "n %", where "%" is the `NumberFormatInfo.PercentSymbol` and "n" is a number.

Exceptions:

- `ArgumentOutOfRangeException`: The property is being set to a value that is less than 0 or greater than 3.
- `InvalidOperationException`: The property is being set and the `NumberFormatInfo` object is read-only.

#### Remarks
The `PercentPositivePattern` property is used with the "P" standard format string to define pattern of positive percentage values. For more information, see Standard Numeric Format Strings. This property has one of the values in the following table. The symbol "%" is the `NumberFormatInfo.PercentSymbol` and `n` is a number.

| Value | Associated pattern |
|-------|--------------------|
| 0     | n %                |
| 1     | n%                 |
| 2     | %n                 |
| 3     | % n                |

## NumberFormatInfo.PercentSymbol property

```csharp
public string PercentSymbol { get; set; }
```

Gets or sets the string to use as the percent symbol.

Returns: The string to use as the percent symbol. The default for `NumberFormatInfo.InvariantInfo` is "%".

Exceptions:

- `ArgumentNullException`: The property is being set to `null`.
- `InvalidOperationException`: The property is being set and the `NumberFormatInfo` object is read-only.

#### Remarks
The string assigned to the `PercentSymbol` property is included in the result string when a numeric value is formatted with the "P"  or with a format string that includes the "%" .

## NumberFormatInfo.PerMilleSymbol property

```csharp
public string PerMilleSymbol { get; set; }
```

Gets or sets the string to use as the per mille symbol.

Returns: The string to use as the per mille symbol. The default for `NumberFormatInfo.InvariantInfo` is "‰", which is the Unicode character U+2030.

Exceptions:

- `ArgumentNullException`: The property is being set to `null`.
- `InvalidOperationException`: The property is being set and the `NumberFormatInfo` object is read-only.

#### Remarks
The string assigned to the `PerMilleSymbol` property is included in the result string when a numeric value is formatted with a format string that includes the "‰" .

## NumberFormatInfo.PositiveInfinitySymbol property

```csharp
public string PositiveInfinitySymbol { get; set; }
```

Gets or sets the string that represents positive infinity.

Returns: The string that represents positive infinity. The default for `NumberFormatInfo.InvariantInfo` is "Infinity".

Exceptions:

- `ArgumentNullException`: The property is being set to `null`.
- `InvalidOperationException`: The property is being set and the `NumberFormatInfo` object is read-only.

#### Remarks
For more information on positive infinity, see `Double` or `Single`.

## NumberFormatInfo.PositiveSign property

```csharp
public string PositiveSign { get; set; }
```

Gets or sets the string that denotes that the associated number is positive.

Returns: The string that denotes that the associated number is positive. The default for `NumberFormatInfo.InvariantInfo` is "+".

Exceptions:

- `ArgumentNullException`: In a set operation, the value to be assigned is `null`.
- `InvalidOperationException`: The property is being set and the `NumberFormatInfo` object is read-only.

#### Remarks
This property is used only for parsing numeric strings, not for formatting.

## NumberFormatInfo.Clone() method

```csharp
public object Clone ();
```

Creates a shallow copy of the `NumberFormatInfo` object.

Returns: A new object copied from the original `NumberFormatInfo` object.

#### Remarks
The clone is writable even if the original `NumberFormatInfo` object is read-only. Therefore, the properties of the clone can be modified with user-defined patterns.

A shallow copy of an object is a copy of the object only. If the object contains references to other objects, the shallow copy will not create copies of the referred objects. It will refer to the original objects instead. On the other hand, a deep copy of an object creates a copy of the object and a copy of everything directly or indirectly referenced by that object. In the case of a `NumberFormatInfo` object, a shallow copy is sufficient for copying all instance properties, because all properties that return object references are `static` (`Shared` in Visual Basic).

#### Examples
The following example uses the `NumberFormatInfo.Clone` method to create a read/write copy of a `NumberFormatInfo` object that represents the numeric formatting conventions of the current culture.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/Clone/isreadonly1.cs._

## NumberFormatInfo.GetFormat(Type) method

```csharp
public object? GetFormat (Type? formatType);
```

Gets an object of the specified type that provides a number formatting service.

Parameters:

- `formatType`: The `Type` of the required formatting service.

Returns: The current `NumberFormatInfo`, if `formatType` is the same as the type of the current `NumberFormatInfo`; otherwise, `null`.

#### Remarks
The `Format(String, IFormatProvider)` methods supported by the base data types invoke this method when the current `NumberFormatInfo` is passed as the `IFormatProvider` parameter. This method implements `IFormatProvider.GetFormat`.

## NumberFormatInfo.GetInstance(IFormatProvider) method

```csharp
public static System.Globalization.NumberFormatInfo GetInstance (IFormatProvider? formatProvider);
```

Gets the `NumberFormatInfo` associated with the specified `IFormatProvider`.

Parameters:

- `formatProvider`: The `IFormatProvider` used to get the `NumberFormatInfo`.

-or-

`null` to get `NumberFormatInfo.CurrentInfo`.

Returns: The `NumberFormatInfo` associated with the specified `IFormatProvider`.

#### Remarks
This method uses the `IFormatProvider.GetFormat` method of `formatProvider` using `NumberFormatInfo` as the Type parameter. If `formatProvider` is `null` or if `IFormatProvider.GetFormat` returns `null`, this method returns `NumberFormatInfo.CurrentInfo`.

Your application gets a `NumberFormatInfo` object for a specific culture using one of the following methods:

- Through the `NumberFormat` property.
- Through the `NumberFormatInfo.GetInstance` method where `provider` is a `CultureInfo`.

A `NumberFormatInfo` object is created only for the invariant culture or for specific cultures, not for neutral cultures. For more information about the invariant culture, specific cultures, and neutral cultures, see the `CultureInfo` class.

## NumberFormatInfo.ReadOnly(NumberFormatInfo) method

```csharp
public static System.Globalization.NumberFormatInfo ReadOnly (System.Globalization.NumberFormatInfo nfi);
```

Returns a read-only `NumberFormatInfo` wrapper.

Parameters:

- `nfi`: The `NumberFormatInfo` to wrap.

Returns: A read-only `NumberFormatInfo` wrapper around `nfi`.

Exceptions:

- `ArgumentNullException`: `nfi` is `null`.

#### Remarks
This wrapper prevents any modifications to `nfi`.

Attempting to perform an assignment to a property of a read-only `NumberFormatInfo` causes an `InvalidOperationException`.
