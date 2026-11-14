---
title: "StringBuilder class (part 2 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/StringBuilder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringBuilder class (part 2 of 11)

| Technique | Pros | Cons |
|-----------|------|------|
|Search string values before adding them to the `StringBuilder` object.|Useful for determining whether a substring exists.|Cannot be used when the index position of a substring is important.|
|Call `StringBuilder.ToString` and search the returned `String` object.|Easy to use if you assign all the text to a `StringBuilder` object, and then begin to modify it.|Cumbersome to repeatedly call `StringBuilder.ToString` if you must make modifications before all text is added to the `StringBuilder` object.You must remember to work from the end of the `StringBuilder` object's text if you're making changes.|
|Use the `Chars` property to sequentially search a range of characters.|Useful if you're concerned with individual characters or a small substring.|Cumbersome if the number of characters to search is large or if the search logic is complex.Results in very poor performance for objects that have grown very large through repeated method calls. |
|Convert the `StringBuilder` object to a `String` object, and perform modifications on the `String` object.|Useful if the number of modifications is small.|Negates the performance benefit of the `StringBuilder` class if the number of modifications is large.|

Let's examine these techniques in greater detail.

- If the goal of the search is to determine whether a particular substring exists (that is, if you aren't interested in the position of the substring), you can search strings before storing them in the `StringBuilder` object. The following example provides one possible implementation. It defines a `StringBuilderFinder` class whose constructor is passed a reference to a `StringBuilder` object and the substring to find in the string. In this case, the example tries to determine whether recorded temperatures are in Fahrenheit or Celsius, and adds the appropriate introductory text to the beginning of the `StringBuilder` object. A random number generator is used to select an array that contains data in either degrees Celsius or degrees Fahrenheit.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Overview/pattern1.cs._

- Call the `StringBuilder.ToString` method to convert the `StringBuilder` object to a `String` object. You can search the string by using methods such as `String.LastIndexOf` or `String.StartsWith`, or you can use regular expressions and the `Regex` class to search for patterns. Because both `StringBuilder` and `String` objects use UTF-16 encoding to store characters, the index positions of characters, substrings, and regular expression matches are the same in both objects. This enables you to use `StringBuilder` methods to make changes at the same position at which that text is found in the `String` object.

> **Note:**
> If you adopt this approach, you should work from the end of the `StringBuilder` object to its beginning so that you don't have to repeatedly convert the `StringBuilder` object to a string.

The following example illustrates this approach. It stores four occurrences of each letter of the English alphabet in a `StringBuilder` object. It then converts the text to a `String` object and uses a regular expression to identify the starting position of each four-character sequence. Finally, it adds an underscore before each four-character sequence except for the first sequence, and converts the first character of the sequence to uppercase.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Overview/pattern2.cs._

- Use the `StringBuilder.Chars` property to sequentially search a range of characters in a `StringBuilder` object. This approach might not be practical if the number of characters to be searched is large or the search logic is particularly complex. For the performance implications of character-by-character index-based access for very large, chunked `StringBuilder` objects, see the documentation for the `StringBuilder.Chars` property.

The following example is identical in functionality to the previous example but differs in implementation. It uses the `Chars` property to detect when a character value has changed, inserts an underscore at that position, and converts the first character in the new sequence to uppercase.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Overview/pattern3.cs._

- Store all the unmodified text in the `StringBuilder` object, call the `StringBuilder.ToString` method to convert the `StringBuilder` object to a `String` object, and perform the modifications on the `String` object. You can use this approach if you have only a few modifications; otherwise, the cost of working with immutable strings might negate the performance benefits of using a `StringBuilder` object.

The following example is identical in functionality to the previous two examples but differs in implementation. It creates a `StringBuilder` object, converts it to a `String` object, and then uses a regular expression to perform all remaining modifications on the string. The `Replace` method uses a lambda expression to perform the replacement on each match.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Overview/pattern4.cs._

#### Convert the StringBuilder object to a string

You must convert the `StringBuilder` object to a `String` object before you can pass the string represented by the `StringBuilder` object to a method that has a `String` parameter or display it in the user interface. You perform this conversion by calling the `StringBuilder.ToString` method. For an illustration, see the previous example, which calls the `StringBuilder.ToString` method to convert a `StringBuilder` object to a string so that it can be passed to a regular expression method.

The following example shows how to call many of the methods defined by the `StringBuilder` class.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Overview/StringBuilder.cs._

## StringBuilder.StringBuilder() constructor

```csharp
public StringBuilder ();
```

Initializes a new instance of the `StringBuilder` class.

#### Remarks
The string value of this instance is set to `Empty`, and the capacity is set to the implementation-specific default capacity.

#### Examples
The following example demonstrates how to call the `StringBuilder.%23ctor` constructor with no parameters.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/.ctor/constructors.cs._

## StringBuilder.StringBuilder(Int32) constructor

```csharp
public StringBuilder (int capacity);
```

Initializes a new instance of the `StringBuilder` class using the specified capacity.

Parameters:

- `capacity`: The suggested starting size of this instance.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is less than zero.

#### Remarks
The `capacity` parameter defines the maximum number of characters that can be stored in the memory allocated by the current instance. Its value is assigned to the `Capacity` property. If the number of characters to be stored in the current instance exceeds this `capacity` value, the `StringBuilder` object allocates additional memory to store them.

The string value of this instance is set to `Empty`. If `capacity` is zero, the implementation-specific default capacity is used.

#### Examples
The following example demonstrates how to call the `StringBuilder.%23ctor` constructor with a specified capacity.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/.ctor/constructors.cs._

## StringBuilder.StringBuilder(String) constructor

```csharp
public StringBuilder (string? value);
```

Initializes a new instance of the `StringBuilder` class using the specified string.

Parameters:

- `value`: The string used to initialize the value of the instance. If `value` is `null`, the new `StringBuilder` will contain the empty string (that is, it contains `String.Empty`).

#### Remarks
If `value` is `null`, the new `StringBuilder` will contain the empty string (that is, it contains `Empty`).

#### Examples
The following example demonstrates how to call the `StringBuilder.%23ctor` constructor with the specified string.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/.ctor/constructors.cs._

## StringBuilder.StringBuilder(Int32, Int32) constructor

```csharp
public StringBuilder (int capacity, int maxCapacity);
```

Initializes a new instance of the `StringBuilder` class that starts with a specified capacity and can grow to a specified maximum.

Parameters:

- `capacity`: The suggested starting size of the `StringBuilder`.
- `maxCapacity`: The maximum number of characters the current string can contain.

Exceptions:

- `ArgumentOutOfRangeException`: `maxCapacity` is less than one, `capacity` is less than zero, or `capacity` is greater than `maxCapacity`.

#### Remarks
The `capacity` parameter defines the maximum number of characters that can be stored in the memory allocated by the current instance. Its value is assigned to the `Capacity` property. If the number of characters to be stored in the current instance exceeds this `capacity` value, the `StringBuilder` object allocates additional memory to store them.

If `capacity` is zero, the implementation-specific default capacity is used.

The `maxCapacity` property defines the maximum number of characters that the current instance can hold. Its value is assigned to the `MaxCapacity` property. If the number of characters to be stored in the current instance exceeds this `maxCapacity` value, the `StringBuilder` object does not allocate additional memory, but instead throws an exception.

#### Examples
The following example demonstrates how to call the `StringBuilder.%23ctor` constructor with a specified capacity and maximum capacity.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/.ctor/constructors.cs._

## StringBuilder.StringBuilder(String, Int32) constructor

```csharp
public StringBuilder (string? value, int capacity);
```

Initializes a new instance of the `StringBuilder` class using the specified string and capacity.

Parameters:

- `value`: The string used to initialize the value of the instance. If `value` is `null`, the new `StringBuilder` will contain the empty string (that is, it contains `String.Empty`).
- `capacity`: The suggested starting size of the `StringBuilder`.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is less than zero.

#### Remarks
The `capacity` parameter defines the maximum number of characters that can be stored in the memory allocated by the current instance. Its value is assigned to the `Capacity` property. If the number of characters to be stored in the current instance exceeds this `capacity` value, the `StringBuilder` object allocates additional memory to store them.

If `capacity` is zero, the implementation-specific default capacity is used.

#### Examples
The following example demonstrates how to call the `StringBuilder.%23ctor` constructor with an initial string and a specified capacity.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/.ctor/constructors.cs._

## StringBuilder.StringBuilder(String, Int32, Int32, Int32) constructor

```csharp
public StringBuilder (string? value, int startIndex, int length, int capacity);
```

Initializes a new instance of the `StringBuilder` class from the specified substring and capacity.

Parameters:

- `value`: The string that contains the substring used to initialize the value of this instance. If `value` is `null`, the new `StringBuilder` will contain the empty string (that is, it contains `String.Empty`).
- `startIndex`: The position within `value` where the substring begins.
- `length`: The number of characters in the substring.
- `capacity`: The suggested starting size of the `StringBuilder`.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is less than zero.

-or-

`startIndex` plus `length` is not a position within `value`.

#### Remarks
The `capacity` parameter defines the maximum number of characters that can be stored in the memory allocated by the current instance. Its value is assigned to the `Capacity` property. If the number of characters to be stored in the current instance exceeds this `capacity` value, the `StringBuilder` object allocates additional memory to store them.

If `capacity` is zero, the implementation-specific default capacity is used.

#### Examples
The following example demonstrates how to call the `StringBuilder.%23ctor` constructor with the specified string.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/.ctor/constructors.cs._

## StringBuilder.Capacity property

```csharp
public int Capacity { get; set; }
```

Gets or sets the maximum number of characters that can be contained in the memory allocated by the current instance.

Returns: The maximum number of characters that can be contained in the memory allocated by the current instance. Its value can range from `StringBuilder.Length` to `StringBuilder.MaxCapacity`.

Exceptions:

- `ArgumentOutOfRangeException`: The value specified for a set operation is less than the current length of this instance.

-or-

The value specified for a set operation is greater than the maximum capacity.

#### Remarks
`StringBuilder.Capacity` does not affect the string value of the current instance. `StringBuilder.Capacity` can be decreased as long as it is not less than `StringBuilder.Length`.

The `StringBuilder` dynamically allocates more space when required and increases `StringBuilder.Capacity` accordingly. For performance reasons, a `StringBuilder` might allocate more memory than needed. The amount of memory allocated is implementation-specific.

#### Examples
The following example demonstrates the `Capacity` property.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Capacity/cap.cs._
