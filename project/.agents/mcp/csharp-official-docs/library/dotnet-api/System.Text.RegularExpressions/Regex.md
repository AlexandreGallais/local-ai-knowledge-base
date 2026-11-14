---
title: "Regex class (part 1 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.RegularExpressions/Regex.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Regex class

Namespace: `System.Text.RegularExpressions`

```csharp
public class Regex : System.Runtime.Serialization.ISerializable
```

Represents an immutable regular expression. Also contains static methods that
allow use of regular expressions without instantiating a Regex explicitly.

The `Regex` class represents the .NET regular expression engine.
It can be used to quickly parse large amounts of text to find specific character patterns;
to extract, edit, replace, or delete text substrings; and to add the extracted strings to a
collection to generate a report.

## Regex.Regex() constructor

```csharp
protected Regex ();
```

Initializes a new instance of the `Regex` class.

#### Remarks
Note that this constructor is protected; it can only be called by classes derived from the `Regex` class.

## Regex.Regex(String) constructor

```csharp
public Regex (string pattern);
```

Initializes a new instance of the `Regex` class for the specified regular expression.

Parameters:

- `pattern`: The regular expression pattern to match.

Exceptions:

- `ArgumentException`: A regular expression parsing error occurred.
- `ArgumentNullException`: `pattern` is `null`.

#### Remarks

The `pattern` parameter consists of regular expression language elements that symbolically describe the string to match. For more information about regular expressions, see the .NET Regular Expressions and Regular Expression Language - Quick Reference topics.

Calling the `%23ctor` constructor is equivalent to calling the `%23ctor` constructor with a value of `None` for the `options` argument.

A `Regex` object is immutable, which means that it can be used only for the match pattern you define when you create it. However, it can be used any number of times without being recompiled.

This constructor instantiates a regular expression object that attempts a case-sensitive match of any alphabetical characters defined in `pattern`. For a case-insensitive match, use the `%23ctor` constructor.

#### Examples
The following example illustrates how to use this constructor to instantiate a regular expression that matches any word that begins with the letters "a" or "t".

_Code sample not included: ~/snippets/csharp/System.Text.RegularExpressions/Regex/.ctor/constructors1.cs._

Note that the regular expression pattern cannot match the word "The" at the beginning of the text, because comparisons are case-sensitive by default. For an example of case-insensitive comparison, see the `%23ctor` constructor.

## Regex.Regex(SerializationInfo, StreamingContext) constructor

```csharp
protected Regex (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `Regex` class by using serialized data.

Parameters:

- `info`: The object that contains a serialized pattern and `RegexOptions` information.
- `context`: The destination for this serialization. (This parameter is not used; specify `null`.)

Exceptions:

- `ArgumentException`: A regular expression parsing error occurred.
- `ArgumentNullException`: The pattern that `info` contains is `null`.
- `ArgumentOutOfRangeException`: `info` contains an invalid `RegexOptions` flag.
- `PlatformNotSupportedException`: Serialization of `Regex` objects is not supported.

To be added.

## Regex.Regex(String, RegexOptions) constructor

```csharp
public Regex (string pattern, System.Text.RegularExpressions.RegexOptions options);
```

Initializes a new instance of the `Regex` class for the specified regular expression,
with options that modify the pattern.

Parameters:

- `pattern`: The regular expression pattern to match.
- `options`: A bitwise combination of the enumeration values that modify the regular expression.

Exceptions:

- `ArgumentException`: A regular expression parsing error occurred.
- `ArgumentNullException`: `pattern` is `null`.
- `ArgumentOutOfRangeException`: `options` is not a valid `RegexOptions` value.

#### Remarks

The `pattern` parameter consists of regular expression language elements that symbolically describe the string to match. For more information about regular expressions, see the .NET Regular Expressions and Regular Expression Language - Quick Reference topics.

A `Regex` object is immutable, which means that it can be used only for the match parameters you define when you create it. However, it can be used any number of times without being recompiled.

#### Examples
The following example illustrates how to use this constructor to instantiate a regular expression that matches any word that begins with the letters "a" or "t".

_Code sample not included: ~/snippets/csharp/System.Text.RegularExpressions/Regex/.ctor/Constructors2.cs._

Note that the match collection includes the word "The" that begins the text because the `options` parameter has defined case-insensitive comparisons.

## Regex.Regex(String, RegexOptions, TimeSpan) constructor

```csharp
public Regex (string pattern, System.Text.RegularExpressions.RegexOptions options, TimeSpan matchTimeout);
```

Initializes a new instance of the `Regex` class for the specified regular expression,
with options that modify the pattern and a value that specifies how long a pattern matching method
should attempt a match before it times out.

Parameters:

- `pattern`: The regular expression pattern to match.
- `options`: A bitwise combination of the enumeration values that modify the regular expression.
- `matchTimeout`: A time-out interval, or `Regex.InfiniteMatchTimeout` to indicate that the method should not time out.

Exceptions:

- `ArgumentException`: A regular expression parsing error occurred.
- `ArgumentNullException`: `pattern` is `null`.
- `ArgumentOutOfRangeException`: `options` is not a valid `RegexOptions` value, or
`matchTimeout` is negative, zero, or greater than approximately 24 days.

#### Remarks
The `pattern` parameter consists of regular expression language elements that symbolically describe the string to match. For more information about regular expressions, see the .NET Regular Expressions and Regular Expression Language - Quick Reference topics.

A `Regex` object is immutable, which means that it can be used only for the match pattern that you define when you create it. However, it can be used any number of times without being recompiled.

The `matchTimeout` parameter specifies how long a pattern-matching method should try to find a match before it times out. If no match is found in that time interval, the pattern-matching method throws a `RegexMatchTimeoutException` exception. `matchTimeout` overrides any default time-out value defined for the application domain in which the `Regex` object is created. The instance pattern-matching methods that observe the `matchTimeout` time-out interval include the following:

-   `Regex.IsMatch`

-   `Regex.Match`

-   `Regex.Matches`

-   `Regex.Replace`

-   `Regex.Split`

-   `Match.NextMatch`

Setting a time-out interval prevents regular expressions that rely on excessive backtracking from appearing to stop responding when they process input that contains near matches. For more information, see Best Practices for Regular Expressions and Backtracking. To set a reasonable time-out interval, consider the following factors:

- The length and complexity of the regular expression pattern. Longer and more complex regular expressions require more time than shorter and simpler ones.

- The expected machine load. Processing takes more time on systems that have high CPU and memory utilization.

#### Examples
The following example calls the `%23ctor` constructor to instantiate a `Regex` object with a time-out value of one second. The regular expression pattern `(a+)+$`, which matches one or more sequences of one or more "a" characters at the end of a line, is subject to excessive backtracking. If a `RegexMatchTimeoutException` is thrown, the example increases the time-out value up to the maximum value of three seconds. Otherwise, it abandons the attempt to match the pattern.

_Code sample not included: ~/snippets/csharp/System.Text.RegularExpressions/Regex/.ctor/ctor1.cs._

## Regex.CacheSize property

```csharp
public static int CacheSize { get; set; }
```

Gets or sets the maximum number of entries in the current static cache of regular expression
instances.

Returns: The maximum number of entries in the static cache.

Exceptions:

- `ArgumentOutOfRangeException`: The value in a set operation is less than zero.

The `Regex` class maintains an internal cache of regular expression instances used in
static `Regex` method calls, such as `Regex.Match` or
`Regex.Replace`. If the value specified in a set operation is
less than the current cache size, cache entries are discarded until the cache size is equal to the
specified value.

By default, the cache holds 15 static regular expression instances. Your application typically
will not have to modify the size of the cache. Use the `Regex.CacheSize` property only when
you want to turn off caching or when you have an unusually large cache.

## Regex.CapNames property

```csharp
protected System.Collections.IDictionary? CapNames { get; set; }
```

Gets or sets a dictionary that maps named capturing groups to their index values.

Returns: A dictionary that maps named capturing groups to their index values.

Exceptions:

- `ArgumentNullException`: The value assigned to the `Regex.CapNames` property in a set operation is `null`.

#### Remarks
Note that this property is protected; it can only be accessed from a class derived from the `Regex` class.

A set operation attempts to convert the value assigned to the property to a `Hashtable` object; if this conversion fails, it calls the `%23ctor` constructor.

## Regex.Caps property

```csharp
protected System.Collections.IDictionary? Caps { get; set; }
```

Gets or sets a dictionary that maps numbered capturing groups to their index values.

Returns: A dictionary that maps numbered capturing groups to their index values.

Exceptions:

- `ArgumentNullException`: The value assigned to the `Regex.Caps` property in a set operation is `null`.

#### Remarks
Note that this property is protected; it can only be accessed from a class derived from the `Regex` class.

A set operation attempts to convert the value assigned to the property to a `Hashtable` object; if this conversion fails, it calls the `%23ctor` constructor.

## Regex.MatchTimeout property

```csharp
public TimeSpan MatchTimeout { get; }
```

Gets the time-out interval of the current instance.

Returns: The maximum time interval that can elapse in a pattern-matching operation before a
`RegexMatchTimeoutException` is thrown, or `Regex.InfiniteMatchTimeout` if
time-outs are disabled.

The `Regex.MatchTimeout` property defines the approximate maximum time interval for a
`Regex` instance to execute a single matching operation before the operation times out.
The regular expression engine throws a `RegexMatchTimeoutException` exception during
its next timing check after the time-out interval has elapsed. This prevents the regular expression
engine from processing input strings that require excessive backtracking. For more information, see
Backtracking
and
Best Practices for Regular Expressions.

This property is read-only. You can set its value explicitly for an individual `Regex`
object by calling the `Regex.#ctor` constructor; and you can
set its value for all `Regex` matching operations in an application domain by calling
the `AppDomain.SetData` method and providing a `TimeSpan`
value for the "REGEX_DEFAULT_MATCH_TIMEOUT" property.

If you do not explicitly set a time-out interval, the default value
`Regex.InfiniteMatchTimeout` is used, and matching operations do not time out.

## Regex.Options property

```csharp
public System.Text.RegularExpressions.RegexOptions Options { get; }
```

Gets the options that were passed into the `Regex` constructor.

Returns: One or more members of the `RegexOptions` enumeration that represent options that were passed
to the `Regex` constructor.

The value of the `Regex.Options` property consists of one or more members of the
`RegexOptions` enumeration. If no options were defined in the constructor,
its value is `RegexOptions.None`. The `Regex.Options` property does
not reflect inline options defined in the regular expression pattern itself.

## Regex.RightToLeft property

```csharp
public bool RightToLeft { get; }
```

Gets a value that indicates whether the regular expression searches from right to left.

Returns: `true` if the regular expression searches from right to left; otherwise,
`false`.

#### Remarks
`Regex.RightToLeft` is `true` if the `Regex` instance was created with the `RightToLeft` option.

## Regex.CompileToAssembly(RegexCompilationInfo[], AssemblyName) method

```csharp
public static void CompileToAssembly (System.Text.RegularExpressions.RegexCompilationInfo[] regexinfos, System.Reflection.AssemblyName assemblyname);
```

Compiles one or more specified `Regex` objects to a named assembly.

Parameters:

- `regexinfos`: An array that describes the regular expressions to compile.
- `assemblyname`: The file name of the assembly.

Exceptions:

- `ArgumentException`: The value of the `assemblyname` parameter's `AssemblyName.Name` property is an empty or null string.

-or-

The regular expression pattern of one or more objects in `regexinfos` contains invalid syntax.
- `ArgumentNullException`: `assemblyname` or `regexinfos` is `null`.
- `PlatformNotSupportedException`: Creating an assembly of compiled regular expressions is not supported.

To be added.
