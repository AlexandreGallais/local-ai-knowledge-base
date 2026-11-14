---
title: "CaseInsensitiveComparer class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/CaseInsensitiveComparer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CaseInsensitiveComparer class

Namespace: `System.Collections`

```csharp
public class CaseInsensitiveComparer : System.Collections.IComparer
```

Compares two objects for equivalence, ignoring the case of strings.

#### Remarks

`CaseInsensitiveComparer` implements the `IComparer` interface supporting case-insensitive comparisons on strings, just as `CaseInsensitiveHashCodeProvider` implements the `IHashCodeProvider` interface supporting case-insensitive comparisons on strings.

> **Important:**
>  We don't recommend that you use the `CaseInsensitiveComparer` class for new development. Instead, we recommend that you use the `StringComparer` object returned by the `CurrentCultureIgnoreCase`,  `InvariantCultureIgnoreCase`, or `OrdinalIgnoreCase` property.

The `Comparer` class is the default implementation of the `IComparer` interface and performs case-sensitive string comparisons.

The objects used as keys by a `Hashtable` are required to override the `Object.GetHashCode` method (or the `IHashCodeProvider` interface) and the `Object.Equals` method (or the `IComparer` interface). The implementation of both methods or interfaces must handle case sensitivity the same way; otherwise, the `Hashtable` might behave incorrectly. For example, when creating a `Hashtable`, you must use this class with the `CaseInsensitiveHashCodeProvider` class or any case-insensitive `IHashCodeProvider` implementation.

String comparisons might have different results depending on the culture. For more information on culture-specific comparisons, see the `Globalization` namespace and Globalization and Localization.

#### Examples
The following code example creates a case-sensitive hash table and a case-insensitive hash table and demonstrates the difference in their behavior, even if both contain the same elements.

_Code sample not included: ~/snippets/csharp/System.Collections/CaseInsensitiveComparer/Overview/caseinsensitive.cs._

## CaseInsensitiveComparer.CaseInsensitiveComparer() constructor

```csharp
public CaseInsensitiveComparer ();
```

Initializes a new instance of the `CaseInsensitiveComparer` class using the `Thread.CurrentCulture` of the current thread.

#### Remarks
When the `CaseInsensitiveComparer` instance is created using this constructor, the `Thread.CurrentCulture` of the current thread is saved. Comparison procedures use the saved culture to determine the sort order and casing rules; therefore, string comparisons might have different results depending on the culture. For more information on culture-specific comparisons, see the `Globalization` namespace and Globalization and Localization.

#### Examples
The following code example creates a case-sensitive hash table and a case-insensitive hash table and demonstrates the difference in their behavior, even if both contain the same elements.

_Code sample not included: ~/snippets/csharp/System.Collections/CaseInsensitiveComparer/Overview/caseinsensitive.cs._

## CaseInsensitiveComparer.CaseInsensitiveComparer(CultureInfo) constructor

```csharp
public CaseInsensitiveComparer (System.Globalization.CultureInfo culture);
```

Initializes a new instance of the `CaseInsensitiveComparer` class using the specified `CultureInfo`.

Parameters:

- `culture`: The `CultureInfo` to use for the new `CaseInsensitiveComparer`.

Exceptions:

- `ArgumentNullException`: `culture` is `null`.

#### Remarks
Comparison procedures use the specified `CultureInfo` to determine the sort order and casing rules. String comparisons might have different results depending on the culture. For more information on culture-specific comparisons, see the `Globalization` namespace and Globalization and Localization.

#### Examples
The following code example creates a case-sensitive hash table and a case-insensitive hash table and demonstrates the difference in their behavior, even if both contain the same elements.

_Code sample not included: ~/snippets/csharp/System.Collections/CaseInsensitiveComparer/Overview/caseinsensitive.cs._

## CaseInsensitiveComparer.Default property

```csharp
public static System.Collections.CaseInsensitiveComparer Default { get; }
```

Gets an instance of `CaseInsensitiveComparer` that is associated with the `Thread.CurrentCulture` of the current thread and that is always available.

Returns: An instance of `CaseInsensitiveComparer` that is associated with the `Thread.CurrentCulture` of the current thread.

#### Remarks
When the `CaseInsensitiveComparer` instance is created using the parameterless constructor, the `Thread.CurrentCulture` of the current thread is saved. Comparison procedures use the saved culture to determine the sort order and casing rules; therefore, string comparisons might have different results depending on the culture. For more information on culture-specific comparisons, see the `Globalization` namespace and Globalization and Localization.

## CaseInsensitiveComparer.DefaultInvariant property

```csharp
public static System.Collections.CaseInsensitiveComparer DefaultInvariant { get; }
```

Gets an instance of `CaseInsensitiveComparer` that is associated with `CultureInfo.InvariantCulture` and that is always available.

Returns: An instance of `CaseInsensitiveComparer` that is associated with `CultureInfo.InvariantCulture`.

#### Remarks
Comparison procedures use the `CultureInfo.InvariantCulture` to determine the sort order and casing rules. String comparisons might have different results depending on the culture. For more information on culture-specific comparisons, see the `Globalization` namespace and Globalization and Localization.

#### Examples
The following code example creates a case-sensitive hash table and a case-insensitive hash table and demonstrates the difference in their behavior, even if both contain the same elements.

_Code sample not included: ~/snippets/csharp/System.Collections/CaseInsensitiveComparer/Overview/caseinsensitive.cs._

## CaseInsensitiveComparer.Compare(Object, Object) method

```csharp
public int Compare (object? a, object? b);
```

Performs a case-insensitive comparison of two objects of the same type and returns a value indicating whether one is less than, equal to, or greater than the other.

Parameters:

- `a`: The first object to compare.
- `b`: The second object to compare.

Returns: A signed integer that indicates the relative values of `a` and `b`, as shown in the following table.

-  Less than zero

: `a` is less than `b`, with casing ignored.

-  Zero

: `a` equals `b`, with casing ignored.

-  Greater than zero

: `a` is greater than `b`, with casing ignored.

Exceptions:

- `ArgumentException`: Neither `a` nor `b` implements the `IComparable` interface.

-or-

`a` and `b` are of different types.

#### Remarks
If `a` and `b` are both strings, this method uses `CompareInfo.Compare` to compare the strings with the casing ignored; otherwise, it uses the `IComparable` implementation of either object. That is, if `a` implements `IComparable`, then this method returns the result of `a`. `CompareTo` (`b`); otherwise, if `b` implements `IComparable`, then it returns the negated result of `b`. `CompareTo` (`a`).

Comparing `null` with any type is allowed and does not generate an exception when using `IComparable`. When sorting, `null` is considered to be less than any other object.

String comparisons might have different results depending on the culture. For more information on culture-specific comparisons, see the `Globalization` namespace and Globalization and Localization.
