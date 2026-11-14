---
title: "CharEnumerator class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/CharEnumerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CharEnumerator class

Namespace: `System`

```csharp
public sealed class CharEnumerator : ICloneable, System.Collections.Generic.IEnumerator<char>
```

Supports iterating over a `String` object and reading its individual characters. This class cannot be inherited.

#### Remarks
A `CharEnumerator` provides read-only access to the characters in a referenced `String` object. For example, the `foreach` statement of the Microsoft Visual Basic and C# programming languages, which iterates through the elements of a collection, retrieves a `CharEnumerator` from a `String` object in order to iterate through the characters in that object.

> **Important:**
> The `CharEnumerator` class enumerates individual 16-bit `Char` instances. It does not consider graphemes (that is, a character followed by one or more combiding characters) or surrogate pairs (that is, characters outside the Unicode Basic <example-value> Plane) as single characters. For an enumerator that handles these types of characters as a single unit, use the `StringInfo` class.

There is no public constructor for `CharEnumerator`. Instead, call a `String` object's `String.GetEnumerator` method to obtain a `CharEnumerator` that is initialized to reference the string.

A `CharEnumerator` maintains an internal index to the characters in the string the `CharEnumerator` references. The state of the index is invalid when it references a character position logically before the first character or after the last character in the string, and valid when it references a character within the string. The index is initialized to a position logically before the first character, and is set to a position after the last character when the iteration is complete. An exception is thrown if you attempt to access a character while the index is invalid.

The `CharEnumerator.MoveNext` method increments the index by one, so the first and subsequent characters are accessed in turn. The `CharEnumerator.Reset` method sets the index to a position logically before the first character. The `Current` property retrieves the character currently referenced by index. The `CharEnumerator.Clone` method creates a copy of the `CharEnumerator`.

> **Note:**
>  Several independent instances of `CharEnumerator` across one or more threads can have access to a single instance of `String`. This class is implemented to support the `IEnumerator` interface. For more information regarding the use of an enumerator, see the `IEnumerator` topic.

#### Examples
The following example uses the `CharEnumerator` class to enumerate the individual characters in a string. It instantiates a `CharEnumerator` object by calling the `String.GetEnumerator` method, moves from one character to the next by calling the `CharEnumerator.MoveNext` method, and displays the current character by retrieving the value of the `Current` property.

_Code sample not included: ~/snippets/csharp/System/CharEnumerator/Overview/CharEnumerator1.cs._

Note, however, that the same operation can be performed somewhat more intuitively by using `foreach` (in C#) or `For Each` (in Visual Basic), as the following example shows.

_Code sample not included: ~/snippets/csharp/System/CharEnumerator/Overview/CharEnumerator1.cs._

## CharEnumerator.Current property

```csharp
public char Current { get; }
```

Gets the currently referenced character in the string enumerated by this `CharEnumerator` object.

Returns: The Unicode character currently referenced by this `CharEnumerator` object.

Exceptions:

- `InvalidOperationException`: The index is invalid; that is, it is before the first or after the last character of the enumerated string.

#### Remarks
The `CharEnumerator` class maintains an internal index to the enumerated string, and the `Current` property returns the character that is currently referenced by the index. This property should be invoked only when the index is valid; otherwise, an exception is thrown.

The index is always invalid for an empty string (""). The index is also invalid after the `String.GetEnumerator` or `CharEnumerator.Reset` method is called. After either of these methods is called, invoke the `CharEnumerator.MoveNext` method to adjust the index to the first character in the enumerated string. The index is valid whenever the `CharEnumerator.MoveNext` method returns `true`.

`CharEnumerator.Current` does not move the index, and consecutive calls to `CharEnumerator.Current` return the same character until `CharEnumerator.MoveNext`, `CharEnumerator.Reset`, or `String.GetEnumerator` is called.

#### Examples
The following example uses the `CharEnumerator` class to enumerate the individual characters in a string. It instantiates a `CharEnumerator` object by calling the `String.GetEnumerator` method, moves from one character to the next by calling the `CharEnumerator.MoveNext` method, and displays the current character by retrieving the value of the `Current` property.

_Code sample not included: ~/snippets/csharp/System/CharEnumerator/Overview/CharEnumerator1.cs._

Note, however, that the same operation can be performed somewhat more intuitively by using `foreach` (in C#) or `For Each` (in Visual Basic), as the following example shows.

_Code sample not included: ~/snippets/csharp/System/CharEnumerator/Overview/CharEnumerator1.cs._

## CharEnumerator.System.Collections.IEnumerator.Current property

```csharp
object? System.Collections.IEnumerator.Current { get; }
```

Gets the currently referenced character in the string enumerated by this `CharEnumerator` object. For a description of this member, see `IEnumerator.Current`.

Returns: The boxed Unicode character currently referenced by this `CharEnumerator` object.

Exceptions:

- `InvalidOperationException`: Enumeration has not started.

-or-

Enumeration has ended.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `CharEnumerator` instance is cast to an `IEnumerator` interface.

## CharEnumerator.Clone() method

```csharp
public object Clone ();
```

Creates a copy of the current `CharEnumerator` object.

Returns: An `Object` that is a copy of the current `CharEnumerator` object.

#### Remarks
The return value is a copy of this instance of `CharEnumerator` and its current state. This is useful for saving your state while iterating through a `String` object.

For example, suppose your application uses an original instance of `CharEnumerator` to iterate through each character in a `String`. When some unique character is encountered, your application pauses processing and invokes the `CharEnumerator.Clone` method. In effect, this saves the `CharEnumerator` object's index in the `String`.

Your application uses the clone to navigate to another part of the `String` to perform some auxiliary processing. The side-effect of this navigation is the clone loses track of the position where processing stopped. However, when the auxiliary processing is complete, your application discards the clone and uses the original `CharEnumerator` instance to resume working on the `String` where the original processing stopped.

> **Note:**
>  This method is implemented to support the `ICloneable` interface.

## CharEnumerator.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the current instance of the `CharEnumerator` class.

#### Remarks
Call `CharEnumerator.Dispose` when you are finished using the `CharEnumerator`. The `CharEnumerator.Dispose` method leaves the `CharEnumerator` in an unusable state. After calling `CharEnumerator.Dispose`, you must release all references to the `CharEnumerator` so the garbage collector can reclaim the memory that the `CharEnumerator` was occupying.

For more information, see Cleaning Up Unmanaged Resources and Implementing a Dispose Method.

> **Note:**
>  Always call `CharEnumerator.Dispose` before you release your last reference to the `CharEnumerator`. Otherwise, the resources it is using will not be freed until the garbage collector calls the `CharEnumerator` object's `Finalize` method.

## CharEnumerator.MoveNext() method

```csharp
public bool MoveNext ();
```

Increments the internal index of the current `CharEnumerator` object to the next character of the enumerated string.

Returns: `true` if the index is successfully incremented and within the enumerated string; otherwise, `false`.

#### Remarks
The `CharEnumerator` class maintains an internal index to the enumerated string, and the `CharEnumerator.MoveNext` method increments the index by one. Call `CharEnumerator.MoveNext` after calling `String.GetEnumerator` or `CharEnumerator.Reset` to increment the current character position to the first character in the enumerated string. Check that the return value is `true` to determine that the current character position is valid.

If the index is already beyond the last character of the enumerated string, the index is not changed and `false` is returned.

Notice that if the enumerated string is empty (""), the state of the `CharEnumerator` is always invalid. This is because the internal index for the `CharEnumerator` is initially before the first character of the enumerated string and is therefore invalid. `CharEnumerator.MoveNext` logically sets the index after the last (nonexistent) character of the enumerated string, which is also invalid.

#### Examples
The following example uses the `CharEnumerator` class to enumerate the individual characters in a string. It instantiates a `CharEnumerator` object by calling the `String.GetEnumerator` method, moves from one character to the next by calling the `CharEnumerator.MoveNext` method, and displays the current character by retrieving the value of the `Current` property.

_Code sample not included: ~/snippets/csharp/System/CharEnumerator/Overview/CharEnumerator1.cs._

Note, however, that the same operation can be performed somewhat more intuitively by using `foreach` (in C#) or `For Each` (in Visual Basic), as the following example shows.

_Code sample not included: ~/snippets/csharp/System/CharEnumerator/Overview/CharEnumerator1.cs._

## CharEnumerator.Reset() method

```csharp
public void Reset ();
```

Initializes the index to a position logically before the first character of the enumerated string.

#### Remarks
The `CharEnumerator` class maintains an internal index to the enumerated string, and the `CharEnumerator.Reset` method sets the index to the invalid state.
