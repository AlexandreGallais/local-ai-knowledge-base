---
title: "StringComparer class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/StringComparer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringComparer class

Namespace: `System`

```csharp
public abstract class StringComparer : System.Collections.Generic.IComparer<string>, System.Collections.Generic.IEqualityComparer<string>, System.Collections.IComparer, System.Collections.IEqualityComparer
```

Represents a string comparison operation that uses specific case and culture-based or ordinal comparison rules.

An object derived from the `StringComparer` class embodies string-based comparison, equality, and hash code operations that take into account both case and culture-specific comparison rules. You can use the `StringComparer` class to create a type-specific comparison to sort the elements in a generic collection. Classes such as `Hashtable`, `Dictionary<T1,T2>`, `SortedList`, and `SortedList<T1,T2>` use the `StringComparer` class for sorting purposes.

A comparison operation that is represented by the `StringComparer` class is defined to be either case-sensitive or case-insensitive, and use either word (culture-sensitive) or ordinal (culture-insensitive) comparison rules. For more information about word and ordinal comparison rules, see `CompareOptions`.

> **Note:**
> You can download the Default Unicode Collation Element Table, the latest version of the sort weight table. The specific version of the sort weight table depends on the version of the International Components for Unicode libraries installed on the system. For information on ICU versions and the Unicode versions that they implement, see Downloading ICU.

#### Implemented properties

You might be confused about how to use the `StringComparer` class properties because of a seeming contradiction. The `StringComparer` class is declared `abstract` (`MustInherit` in Visual Basic), which means its members can be invoked only on an object of a class derived from the `StringComparer` class. The contradiction is that each property of the `StringComparer` class is declared `static` (`Shared` in Visual Basic), which means the property can be invoked without first creating a derived class.

You can call a `StringComparer` property directly because each property actually returns an instance of an anonymous class that is derived from the `StringComparer` class. Consequently, the type of each property value is `StringComparer`, which is the base class of the anonymous class, not the type of the anonymous class itself. Each `StringComparer` class property returns a `StringComparer` object that supports predefined case and comparison rules.

The following example demonstrates the properties and the `StringComparer.Create` method of the `StringComparer` class. The example illustrates how different `StringComparer` objects sort three versions of the Latin letter I.

_Code sample not included: ~/snippets/csharp/System/StringComparer/Overview/omni.cs._

## StringComparer.StringComparer() constructor

```csharp
protected StringComparer ();
```

Initializes a new instance of the `StringComparer` class.

To be added.

## StringComparer.CurrentCulture property

```csharp
public static StringComparer CurrentCulture { get; }
```

Gets a `StringComparer` object that performs a case-sensitive string comparison using the word comparison rules of the current culture.

Returns: A new `StringComparer` object.

#### Remarks
The `StringComparer` returned by the `CurrentCulture` property can be used when strings are linguistically relevant. For example, if strings are displayed to the user, or if strings are the result of user interaction, culture-sensitive string comparison should be used to order the string data.

The current culture is the `CultureInfo` object associated with the current thread.

The `CurrentCulture` property actually returns an instance of an anonymous class derived from the `StringComparer` class.

Each call to the `CurrentCulture` property `get` accessor returns a new `StringComparer` object, as the following code shows.

_Code sample not included: ~/snippets/csharp/System/StringComparer/CurrentCulture/CompareObjects.cs._

To improve performance, you can store the `StringComparer` object in a local variable rather than retrieve the value of the `CurrentCulture` property multiple times.

#### Examples
The following code example demonstrates the properties and the `StringComparer.Create` method of the `StringComparer` class. The example illustrates how different `StringComparer` objects sort three versions of the Latin letter I.

_Code sample not included: ~/snippets/csharp/System/StringComparer/Overview/omni.cs._

## StringComparer.CurrentCultureIgnoreCase property

```csharp
public static StringComparer CurrentCultureIgnoreCase { get; }
```

Gets a `StringComparer` object that performs case-insensitive string comparisons using the word comparison rules of the current culture.

Returns: A new object for string comparison.

#### Remarks
The current culture is the `CultureInfo` object associated with the current thread; it is returned by the `CurrentCulture` property.

The `StringComparer` returned by the `CurrentCultureIgnoreCase` property can be used when strings are linguistically relevant but their case is not. For example, if strings are displayed to the user but case is unimportant, culture-sensitive, case-insensitive string comparison should be used to order the string data.

The `CurrentCultureIgnoreCase` property actually returns an instance of an anonymous class derived from the `StringComparer` class.

Each call to the `CurrentCultureIgnoreCase` property `get` accessor returns a new `StringComparer` object, as the following code shows.

_Code sample not included: ~/snippets/csharp/System/StringComparer/CurrentCulture/CompareObjects.cs._

To improve performance, you can store the `StringComparer` object in a local variable rather than retrieve the value of the `CurrentCultureIgnoreCase` property multiple times.

## StringComparer.InvariantCulture property

```csharp
public static StringComparer InvariantCulture { get; }
```

Gets a `StringComparer` object that performs a case-sensitive string comparison using the word comparison rules of the invariant culture.

Returns: A new `StringComparer` object.

#### Remarks
The `StringComparer` returned by the `InvariantCulture` property compares strings in a linguistically relevant manner, but it is not suitable for display in any particular culture. Its major application is to order strings in a way that will be identical across cultures.

The invariant culture is the `CultureInfo` object returned by the `InvariantCulture` property.

The `InvariantCulture` property actually returns an instance of an anonymous class derived from the `StringComparer` class.

#### Examples
The following code example demonstrates the properties and the `StringComparer.Create` method of the `StringComparer` class. The example illustrates how different `StringComparer` objects sort three versions of the Latin letter I.

_Code sample not included: ~/snippets/csharp/System/StringComparer/Overview/omni.cs._

## StringComparer.InvariantCultureIgnoreCase property

```csharp
public static StringComparer InvariantCultureIgnoreCase { get; }
```

Gets a `StringComparer` object that performs a case-insensitive string comparison using the word comparison rules of the invariant culture.

Returns: A new `StringComparer` object.

#### Remarks
The `StringComparer` returned by the `InvariantCultureIgnoreCase` property compares strings in a linguistically relevant manner that ignores case, but it is not suitable for display in any particular culture. Its major application is to order strings in a way that will be identical across cultures.

The invariant culture is the `CultureInfo` object returned by the `InvariantCulture` property.

The `InvariantCultureIgnoreCase` property actually returns an instance of an anonymous class derived from the `StringComparer` class.

## StringComparer.Ordinal property

```csharp
public static StringComparer Ordinal { get; }
```

Gets a `StringComparer` object that performs a case-sensitive ordinal string comparison.

Returns: A `StringComparer` object.

#### Remarks
The `StringComparer` returned by the `Ordinal` property performs a simple byte comparison that is independent of language. This is most appropriate when comparing strings that are generated programmatically or when comparing case-sensitive resources such as passwords.

The `Ordinal` property actually returns an instance of an anonymous class derived from the `StringComparer` class.

#### Examples
The following code example demonstrates the properties and the `StringComparer.Create` method of the `StringComparer` class. The example illustrates how different `StringComparer` objects sort three versions of the Latin letter I.

_Code sample not included: ~/snippets/csharp/System/StringComparer/Overview/omni.cs._

## StringComparer.OrdinalIgnoreCase property

```csharp
public static StringComparer OrdinalIgnoreCase { get; }
```

Gets a `StringComparer` object that performs a case-insensitive ordinal string comparison.

Returns: A `StringComparer` object.

#### Remarks
The `StringComparer` returned by the `OrdinalIgnoreCase` property treats the characters in the strings to compare as if they were converted to uppercase using the conventions of the invariant culture, and then performs a simple byte comparison that is independent of language. This is most appropriate when comparing strings that are generated programmatically or when comparing case-insensitive resources such as paths and filenames.

The `OrdinalIgnoreCase` property actually returns an instance of an anonymous class derived from the `StringComparer` class.

#### Examples
The following code example demonstrates the properties and the `StringComparer.Create` method of the `StringComparer` class. The example illustrates how different `StringComparer` objects sort three versions of the Latin letter I.

_Code sample not included: ~/snippets/csharp/System/StringComparer/Overview/omni.cs._

## StringComparer.Compare(Object, Object) method

```csharp
public int Compare (object? x, object? y);
```

When overridden in a derived class, compares two objects and returns an indication of their relative sort order.

Parameters:

- `x`: An object to compare to `y`.
- `y`: An object to compare to `x`.

Returns: A signed integer that indicates the relative values of `x` and `y`, as shown in the following table.

-  Less than zero

: `x` precedes  `y` in the sort order, or `x` is `null` and `y` is not `null`.

-  Zero

: `x` is equal to `y`, or `x` and `y` are both `null`.

-  Greater than zero

: `x` follows `y` in the sort order, or `y` is `null` and `x` is not `null`.

Exceptions:

- `ArgumentException`: Neither `x` nor `y` is a `String` object, and neither `x` nor `y` implements the `IComparable` interface.

#### Remarks
The `Compare` method is slightly more efficient than the `Compare` method because no conversion of the `x` and `y` arguments is needed to perform the comparison.

## StringComparer.Compare(String, String) method

```csharp
public abstract int Compare (string? x, string? y);
```

When overridden in a derived class, compares two strings and returns an indication of their relative sort order.

Parameters:

- `x`: A string to compare to `y`.
- `y`: A string to compare to `x`.

Returns: A signed integer that indicates the relative values of `x` and `y`, as shown in the following table.

-  Less than zero

: `x` precedes `y` in the sort order, or `x` is `null` and `y` is not `null`.

-  Zero

: `x` is equal to `y`, or `x` and `y` are both `null`.

-  Greater than zero

: `x` follows `y` in the sort order, or `y` is `null` and `x` is not `null`.

#### Remarks
The `Compare` method is slightly more efficient than the `Compare` method because no conversion of the `x` and `y` arguments is needed to perform the comparison.

## StringComparer.Create(CultureInfo, Boolean) method

```csharp
public static StringComparer Create (System.Globalization.CultureInfo culture, bool ignoreCase);
```

Creates a `StringComparer` object that compares strings according to the rules of a specified culture.

Parameters:

- `culture`: A culture whose linguistic rules are used to perform a string comparison.
- `ignoreCase`: `true` to specify that comparison operations be case-insensitive; `false` to specify that comparison operations be case-sensitive.

Returns: A new `StringComparer` object that performs string comparisons according to the comparison rules used by the `culture` parameter and the case rule specified by the `ignoreCase` parameter.

Exceptions:

- `ArgumentNullException`: `culture` is `null`.

#### Examples
The following code example demonstrates the properties and the `StringComparer.Create` method of the `StringComparer` class. The example illustrates how different `StringComparer` objects sort three versions of the Latin letter I.

_Code sample not included: ~/snippets/csharp/System/StringComparer/Overview/omni.cs._

## StringComparer.Create(CultureInfo, CompareOptions) method

```csharp
public static StringComparer Create (System.Globalization.CultureInfo culture, System.Globalization.CompareOptions options);
```

Creates a `StringComparer` object that compares strings according to the rules of a specified culture and string options.

Parameters:

- `culture`: A culture whose linguistic rules are used to perform a string comparison.
- `options`: A bitwise combination of the `CompareOptions` values.

Returns: A new `StringComparer` object that performs string comparisons according to the comparison rules used by the `culture` parameter and the specified `options`.

Exceptions:

- `ArgumentNullException`: `culture` is `null`.
- `ArgumentException`: `options` has invalid flags.

To be added.

## StringComparer.Equals(Object, Object) method

```csharp
public bool Equals (object? x, object? y);
```

When overridden in a derived class, indicates whether two objects are equal.

Parameters:

- `x`: An object to compare to `y`.
- `y`: An object to compare to `x`.

Returns: `true` if `x` and `y` refer to the same object, or `x` and `y` are both the same type of object and those objects are equal, or both `x` and `y` are `null`; otherwise, `false`.

#### Remarks
Because the runtime does not have to unbox `x` or `y` if they are value types or attempt to downcast `x` or `y` to strings if they are reference types, the `Equals` method may be slightly more efficient than the `Equals` method.
