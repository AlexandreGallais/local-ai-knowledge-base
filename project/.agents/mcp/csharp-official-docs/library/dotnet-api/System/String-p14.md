---
title: "String class (part 14 of 26)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/String.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# String class (part 14 of 26)

## String.Intern(String) method

```csharp
public static string Intern (string str);
```

Retrieves the system's reference to the specified `String`.

Parameters:

- `str`: A string to search for in the intern pool.

Returns: The system's reference to `str`, if it is interned; otherwise, a new reference to a string with the value of `str`.

Exceptions:

- `ArgumentNullException`: `str` is `null`.

> ![NOTE]
> While `String.Intern` guarantees that two strings with equal values return the same interned reference, it doesn't guarantee that the returned reference is the same as a string literal.

The common language runtime maintains a table, called the *intern pool*, that holds a single reference for each unique string value. The `String.Intern` method uses the intern pool to search for a string equal to the value of `str`. If no such string exists, a reference to `str` is added to the pool, and that reference is returned. (In contrast, the `IsInterned` method returns a null reference if the requested string doesn't exist in the intern pool.)

The intern pool can be used by the runtime to conserve string storage. However, automatic interning of string literals isn't guaranteed—depending on how the assembly was compiled and executed, some literals might not be added to the pool.

In the following example, the string `s1` has a value of "MyTest". The `StringBuilder` class generates a new string object that has the same value as `s1`. A reference to that string is assigned to `s2`. The `String.Intern` method searches for a string that has the same value as `s2`. If `s1` was already interned (for example, because the assembly requires string-literal interning), the method returns the same reference as `s1`, which is then assigned to `s3`, and `s1` and `s3` compare equal. Otherwise, a new interned entry is created for `s2` and assigned to `s3`, and `s1` and `s3` compare unequal. In either case, `s1` and `s2` compare unequal because they refer to different objects.

_Code sample not included: ~/snippets/csharp/System/String/Intern/Intern1.cs._

#### Performance considerations

If you're trying to reduce the total amount of memory your application allocates, keep in mind that interning a string has two unwanted side effects. First, the memory allocated for interned `String` objects is not likely to be released until the common language runtime (CLR) terminates. The reason is that the CLR's reference to the interned `String` object can persist after your application, or even your application domain, terminates. Second, to intern a string, you must first create the string. The memory used by the `String` object must still be allocated, even though the memory will eventually be garbage collected.

The `NoStringInterning` enumeration member marks an assembly as not requiring string-literal interning. By default, the C# compiler emits a `CompilationRelaxationsAttribute` with the `NoStringInterning` flag on each assembly for better performance, which means string literals are not guaranteed to be added to the intern pool. You can customize `NoStringInterning` on an assembly using the `CompilationRelaxationsAttribute` attribute.

When you publish an app using native AOT, turning off `NoStringInterning` is not supported. With native AOT, string literals aren't guaranteed to be added to the intern pool, so `String.Intern` might not find a match for a string that appears to be a literal in source code.

The following example creates two strings with equal values and demonstrates that interning them yields the same reference.

_Code sample not included: ~/snippets/csharp/System/String/Intern/string_intern.cs._

## String.IsInterned(String) method

```csharp
public static string? IsInterned (string str);
```

Retrieves a reference to a specified `String`.

Parameters:

- `str`: The string to search for in the intern pool.

Returns: A reference to `str` if it is in the common language runtime intern pool; otherwise, `null`.

Exceptions:

- `ArgumentNullException`: `str` is `null`.

#### Remarks
The common language runtime automatically maintains a table, called the intern pool, which contains a single instance of each unique literal string constant declared in a program, as well as any unique instance of `String` you add programmatically by calling the `String.Intern` method.

The intern pool conserves string storage. If you assign a literal string constant to several variables, each variable is set to reference the same constant in the intern pool instead of referencing several different instances of `String` that have identical values.

This method looks up `str` in the intern pool. If `str` has already been interned, a reference to that instance is returned; otherwise, `null` is returned.

Compare this method to the `String.Intern` method.

This method does not return a Boolean value. If you call the method because you want a Boolean value that indicates whether a particular string is interned, you can use code such as the following.

_Code sample not included: ~/snippets/csharp/System/String/IsInterned/isinternedex1.cs._

#### Examples
The following example demonstrates how to use `IsInterned` to check whether strings are in the intern pool and to verify reference equality of interned strings.

_Code sample not included: ~/snippets/csharp/System/String/IsInterned/isin.cs._

## String.IsNormalized() method

```csharp
public bool IsNormalized ();
```

Indicates whether this string is in Unicode normalization form C.

Returns: `true` if this string is in normalization form C; otherwise, `false`.

Exceptions:

- `ArgumentException`: The current instance contains invalid Unicode characters.

#### Remarks
Some Unicode characters have multiple equivalent binary representations consisting of sets of combining and/or composite Unicode characters. The existence of multiple representations for a single character complicates searching, sorting, matching, and other operations.

The Unicode standard defines a process called normalization that returns one binary representation when given any of the equivalent binary representations of a character. Normalization can be performed with several algorithms, called normalization forms, that obey different rules. .NET currently supports normalization forms C, D, KC, and KD.

For a description of supported Unicode normalization forms, see `NormalizationForm`.

## String.IsNormalized(NormalizationForm) method

```csharp
public bool IsNormalized (System.Text.NormalizationForm normalizationForm);
```

Indicates whether this string is in the specified Unicode normalization form.

Parameters:

- `normalizationForm`: A Unicode normalization form.

Returns: `true` if this string is in the normalization form specified by the `normalizationForm` parameter; otherwise, `false`.

Exceptions:

- `ArgumentException`: The current instance contains invalid Unicode characters.

#### Remarks
Some Unicode characters have multiple equivalent binary representations consisting of sets of combining and/or composite Unicode characters. The existence of multiple representations for a single character complicates searching, sorting, matching, and other operations.

The Unicode standard defines a process called normalization that returns one binary representation when given any of the equivalent binary representations of a character. Normalization can be performed with several algorithms, called normalization forms, that obey different rules. .NET currently supports normalization forms C, D, KC, and KD.

For a description of supported Unicode normalization forms, see `NormalizationForm`.

## String.IsNullOrEmpty(String) method

```csharp
public static bool IsNullOrEmpty (string? value);
```

Indicates whether the specified string is `null` or an empty string ("").

Parameters:

- `value`: The string to test.

Returns: `true` if the `value` parameter is `null` or an empty string (""); otherwise, `false`.

`String.IsNullOrEmpty` is a convenience method that enables you to simultaneously test whether a `String` is `null` or its value is `Empty`. It is equivalent to the following code:

_Code sample not included: ~/snippets/csharp/System/String/IsNullOrEmpty/isnullorempty1.cs._

You can use the `String.IsNullOrWhiteSpace` method to test whether a string is `null`, its value is `Empty`,  or it consists only of white-space characters.

#### What is a null string?

A string is `null` if it has not been assigned a value (in C++ and Visual Basic) or if it has explicitly been assigned a value of `null`. Although the composite formatting feature can gracefully handle a null string, as the following example shows, attempting to call one if its members throws a `NullReferenceException`.

_Code sample not included: ~/snippets/csharp/System/String/IsNullOrEmpty/NullString1.cs._

#### What is an empty string?

A string is empty if it's explicitly assigned an empty string ("") or `Empty`. An empty string has a `Length` of 0. The following example creates an empty string and displays its value and its length.

_Code sample not included: ~/snippets/csharp/System/String/IsNullOrEmpty/NullString1.cs._

The following example examines three strings and determines whether each string has a value, is an empty string, or is `null`.

_Code sample not included: ~/snippets/csharp/System/String/IsNullOrEmpty/inoe.cs._

## String.IsNullOrWhiteSpace(String) method

```csharp
public static bool IsNullOrWhiteSpace (string? value);
```

Indicates whether a specified string is `null`, empty, or consists only of white-space characters.

Parameters:

- `value`: The string to test.

Returns: `true` if the `value` parameter is `null` or `String.Empty`, or if `value` consists exclusively of white-space characters.

#### Remarks
`String.IsNullOrWhiteSpace` is a convenience method that is similar to the following  code, except that it offers superior performance:

_Code sample not included: ~/snippets/csharp/System/String/IsNullOrWhiteSpace/isnullorwhitespace.cs._

White-space characters are defined by the Unicode standard. The `String.IsNullOrWhiteSpace` method interprets any character that returns a value of `true` when it is passed to the `Char.IsWhiteSpace` method as a white-space character.

#### Examples
The following example creates a string array, and then passes each element of the array to the `String.IsNullOrWhiteSpace` method.

_Code sample not included: ~/snippets/csharp/System/String/IsNullOrWhiteSpace/isnullorwhitespace1.cs._

## String.Join(Char, Object[]) method

```csharp
public static string Join (char separator, params object?[] values);
```

Concatenates the string representations of an array of objects, using the specified separator between each member.

Parameters:

- `separator`: The character to use as a separator. `separator` is included in the returned string only if `values` has more than one element.
- `values`: An array of objects whose string representations will be concatenated.

Returns: A string that consists of the elements of `values` delimited by the `separator` character.

-or-

`String.Empty` if `values` has zero elements.

Exceptions:

- `ArgumentNullException`: `values` is `null`.
- `OutOfMemoryException`: The length of the resulting string overflows the maximum allowed length (<see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>).

To be added.

## String.Join(Char, Object>) method

```csharp
public static string Join (char separator, scoped ReadOnlySpan<object?> values);
```

Concatenates the string representations of a span of objects, using the specified separator between each member.

Parameters:

- `separator`: The character to use as a separator. `separator` is included in the returned string only if value has more than one element.
- `values`: A span of objects whose string representations will be concatenated.

Returns: A string that consists of the elements of `values` delimited by the `separator` character.
-or- `String.Empty` if `values` has zero elements.

To be added.

## String.Join(Char, String>) method

```csharp
public static string Join (char separator, scoped ReadOnlySpan<string?> value);
```

Concatenates a span of strings, using the specified separator between each member.

Parameters:

- `separator`: The character to use as a separator. `separator` is included in the returned string only if `value` has more than one element.
- `value`: A span that contains the elements to concatenate.

Returns: A string that consists of the elements of `value` delimited by the `separator` string.
-or- `String.Empty` if `value` has zero elements.

To be added.

## String.Join(Char, String[]) method

```csharp
public static string Join (char separator, params string?[] value);
```

Concatenates an array of strings, using the specified separator between each member.

Parameters:

- `separator`: The character to use as a separator. `separator` is included in the returned string only if `value` has more than one element.
- `value`: An array of strings to concatenate.

Returns: A string that consists of the elements of `value` delimited by the `separator` character.

-or-

`String.Empty` if `value` has zero elements.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `OutOfMemoryException`: The length of the resulting string overflows the maximum allowed length (<see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>).

To be added.
