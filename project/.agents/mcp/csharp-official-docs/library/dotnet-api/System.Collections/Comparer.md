---
title: "Comparer class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/Comparer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Comparer class

Namespace: `System.Collections`

```csharp
public sealed class Comparer : System.Collections.IComparer, System.Runtime.Serialization.ISerializable
```

Compares two objects for equivalence, where string comparisons are case-sensitive.

#### Remarks
This class is the default implementation of the `IComparer` interface. The `CaseInsensitiveComparer` class is the implementation of the `IComparer` interface that performs case-insensitive string comparisons. `Comparer<T>` is the generic equivalent of this class.

Comparison procedures use the `Thread.CurrentCulture` of the current thread unless otherwise specified. String comparisons might have different results depending on the culture. For more information on culture-specific comparisons, see the `Globalization` namespace and Globalization and Localization.

#### Examples
The following code example shows how `Comparer.Compare` returns different values depending on the culture associated with the `Comparer`.

_Code sample not included: ~/snippets/csharp/System.Collections/Comparer/Overview/comparercultures.cs._

## Comparer.Comparer(CultureInfo) constructor

```csharp
public Comparer (System.Globalization.CultureInfo culture);
```

Initializes a new instance of the `Comparer` class using the specified `CultureInfo`.

Parameters:

- `culture`: The `CultureInfo` to use for the new `Comparer`.

Exceptions:

- `ArgumentNullException`: `culture` is `null`.

#### Remarks
Comparison procedures use the specified `CultureInfo` to determine the sort order and casing rules. String comparisons might have different results depending on the culture. For more information on culture-specific comparisons, see the `Globalization` namespace and Globalization and Localization.

#### Examples
The following code example shows how `Comparer.Compare` returns different values depending on the culture associated with the `Comparer`.

_Code sample not included: ~/snippets/csharp/System.Collections/Comparer/Overview/comparercultures.cs._

## Comparer.Compare(Object, Object) method

```csharp
public int Compare (object? a, object? b);
```

Performs a case-sensitive comparison of two objects of the same type and returns a value indicating whether one is less than, equal to, or greater than the other.

Parameters:

- `a`: The first object to compare.
- `b`: The second object to compare.

Returns: A signed integer that indicates the relative values of `a` and `b`, as shown in the following table.

-  Less than zero

: `a` is less than `b`.

-  Zero

: `a` equals `b`.

-  Greater than zero

: `a` is greater than `b`.

Exceptions:

- `ArgumentException`: Neither `a` nor `b` implements the `IComparable` interface.

-or-

`a` and `b` are of different types and neither one can handle comparisons with the other.

#### Remarks
If `a` implements `IComparable`, then `a`. `CompareTo` (`b`) is returned; otherwise, if `b` implements `IComparable`, then the negated result of `b`. `CompareTo` (`a`) is returned.

Comparing `null` with any type is allowed and does not generate an exception when using `IComparable`. When sorting, `null` is considered to be less than any other object.

String comparisons might have different results depending on the culture. For more information on culture-specific comparisons, see the `Globalization` namespace and Globalization and Localization.

#### Examples
The following code example shows how `Comparer.Compare` returns different values depending on the culture associated with the `Comparer`.

_Code sample not included: ~/snippets/csharp/System.Collections/Comparer/Overview/comparercultures.cs._

## Comparer.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Populates a `SerializationInfo` object with the data required for serialization.

Parameters:

- `info`: The object to populate with data.
- `context`: The context information about the source or destination of the serialization.

Exceptions:

- `ArgumentNullException`: `info` is `null`.

To be added.

## Comparer.Default field

```csharp
public static readonly System.Collections.Comparer Default;
```

Represents an instance of `Comparer` that is associated with the `Thread.CurrentCulture` of the current thread. This field is read-only.

#### Remarks
Comparison procedures use the `Thread.CurrentCulture` of the current thread to determine the sort order and casing rules. String comparisons might have different results depending on the culture. For more information on culture-specific comparisons, see the `Globalization` namespace and Globalization and Localization.

## Comparer.DefaultInvariant field

```csharp
public static readonly System.Collections.Comparer DefaultInvariant;
```

Represents an instance of `Comparer` that is associated with `CultureInfo.InvariantCulture`. This field is read-only.

#### Remarks
Comparison procedures use the `CultureInfo.InvariantCulture` to determine the sort order and casing rules. String comparisons might have different results depending on the culture. For more information on culture-specific comparisons, see the `Globalization` namespace and Globalization and Localization.

#### Examples
The following code example shows how `Comparer.Compare` returns different values depending on the culture associated with the `Comparer`.

_Code sample not included: ~/snippets/csharp/System.Collections/Comparer/Overview/comparercultures.cs._
