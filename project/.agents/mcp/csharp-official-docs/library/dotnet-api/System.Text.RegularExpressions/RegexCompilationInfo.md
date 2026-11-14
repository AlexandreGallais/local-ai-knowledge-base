---
title: "RegexCompilationInfo class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.RegularExpressions/RegexCompilationInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RegexCompilationInfo class

Namespace: `System.Text.RegularExpressions`

```csharp
public class RegexCompilationInfo
```

Provides information about a regular expression that is used to compile a regular expression to a stand-alone assembly.

#### Remarks
An array of `RegexCompilationInfo` objects is passed to the `Regex.CompileToAssembly` method to provide information about each regular expression to be included in the assembly. Each compiled regular expression that is included in the assembly is represented as a class derived from `Regex`. The properties of the `RegexCompilationInfo` type define the regular expression's class name, its fully qualified name (that is, its namespace and its type name), its regular expression pattern, any additional options (such as whether the regular expression is case-insensitive), and a time-out interval that specifies how long the regular expression engine should search for a match.

You can instantiate a `RegexCompilationInfo` object by calling its overloaded class constructor.

## RegexCompilationInfo.RegexCompilationInfo(String, RegexOptions, String, String, Boolean) constructor

```csharp
public RegexCompilationInfo (string pattern, System.Text.RegularExpressions.RegexOptions options, string name, string fullnamespace, bool ispublic);
```

Initializes a new instance of the `RegexCompilationInfo` class that contains information
about a regular expression to be included in an assembly.

Parameters:

- `pattern`: The regular expression to compile.
- `options`: The regular expression options to use when compiling the regular expression.
- `name`: The name of the type that represents the compiled regular expression.
- `fullnamespace`: The namespace to which the new type belongs.
- `ispublic`: `true` to make the compiled regular expression publicly visible; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `pattern` is `null`, or `name` is `null`,
or `fullnamespace` is `null`.
- `ArgumentException`: `name` is `String.Empty`.

#### Remarks
Each parameter of the `%23ctor` constructor directly corresponds to a property of the `RegexCompilationInfo` class. Because all properties are read/write, their values can also be assigned directly.

The `Regex.CompileToAssembly` method generates an assembly that contains compiled regular expressions. Therefore, you should not specify `Compiled` as one of the values of `options`.

If `ispublic` is `true`, the compiled regular expression class is given public accessibility. That is, it can be instantiated from code that executes in any assembly. If `ispublic` is `false`, the compiled regular expression class is given `internal` (in C#) or `Friend` (in Visual Basic) accessibility. That is, it can be instantiated only from code that executes in the same assembly as the regular expression class.

#### Examples
The following example creates and uses a compiled regular expression in two steps.

In the first step, compile and execute the following code example. The `RegexCompilationInfo.%23ctor` constructor in the code example defines a compiled regular expression. The result of executing the code is an assembly named FishRegex.dll that contains a compiled regular expression type named `FishRegex`.

_Code sample not included: ~/snippets/csharp/System.Text.RegularExpressions/RegexCompilationInfo/.ctor/genFishRegex.cs._

In the second step, compile the following code example using a reference to FishRegex.dll, and then run the resulting executable file. The executable file matches a target string by using the `FishRegex` type, and displays the match, group, capture group, and index position of the matches in the target string.

_Code sample not included: ~/snippets/csharp/System.Text.RegularExpressions/RegexCompilationInfo/.ctor/useFishRegex.cs._

## RegexCompilationInfo.RegexCompilationInfo(String, RegexOptions, String, String, Boolean, TimeSpan) constructor

```csharp
public RegexCompilationInfo (string pattern, System.Text.RegularExpressions.RegexOptions options, string name, string fullnamespace, bool ispublic, TimeSpan matchTimeout);
```

Initializes a new instance of the `RegexCompilationInfo` class that contains information
about a regular expression with a specified time-out value to be included in an assembly.

Parameters:

- `pattern`: The regular expression to compile.
- `options`: The regular expression options to use when compiling the regular expression.
- `name`: The name of the type that represents the compiled regular expression.
- `fullnamespace`: The namespace to which the new type belongs.
- `ispublic`: `true` to make the compiled regular expression publicly visible; otherwise, `false`.
- `matchTimeout`: The default time-out interval for the regular expression.

Exceptions:

- `ArgumentNullException`: `pattern` is `null`, or `name` is `null`,
or `fullnamespace` is `null`.
- `ArgumentException`: `name` is `String.Empty`.
- `ArgumentOutOfRangeException`: `matchTimeout` is negative, zero, or greater than approximately 24 days.

#### Remarks
Each parameter of the `%23ctor` constructor directly corresponds to a property of the `RegexCompilationInfo` class. Because all properties are read/write, their values can also be assigned directly.

The `Regex.CompileToAssembly` method generates an assembly that contains compiled regular expressions. Therefore, you should not specify `Compiled` as one of the values of `options`.

If `ispublic` is `true`, the compiled regular expression class is given public accessibility. That is, it can be instantiated from code that executes in any assembly. If `ispublic` is `false`, the compiled regular expression class is given `internal` (in C#) or `Friend` (in Visual Basic) accessibility. That is, it can be instantiated only from code that executes in the same assembly as the regular expression class.

The `matchTimeout` parameter defines the default time-out interval for the compiled regular expression. This value represents the approximate amount of time that a compiled regular expression object will execute a single matching operation before the operation times out and the regular expression engine throws a `RegexMatchTimeoutException` exception during its next timing check. For additional information about the time-out value, see the `MatchTimeout` property.

> **Important:**
>  We recommend that you always set a default time-out value for a compiled regular expression. Consumers of your regular expression library can override that time-out value by passing a `TimeSpan` value that represents the new time-out interval to this constructor overload.

#### Examples
The following example defines a single compiled regular expression named `DuplicateChars` that identifies two or more occurrences of the same character in an input string. The compiled regular expression has a default time-out of 2 seconds. When you execute the example, it creates a class library named RegexLib.dll that contains the compiled regular expression.

_Code sample not included: ~/snippets/csharp/System.Text.RegularExpressions/RegexCompilationInfo/.ctor/example1.cs._

The regular expression pattern `(\w)\1+` is defined as shown in the following table.

|Pattern|Description|
|-------------|-----------------|
|`(\w)`|Match any word character and assign it to the first capturing group.|
|`\1+`|Match one or more occurrences of the value of the first captured group.|

The following example uses the `DuplicatedChars` regular expression to identify duplicate characters in a string array. When it calls the `DuplicatedChars` constructor, it changes the time-out interval to .5 seconds.

_Code sample not included: ~/snippets/csharp/System.Text.RegularExpressions/RegexCompilationInfo/.ctor/example1a.cs._

## RegexCompilationInfo.IsPublic property

```csharp
public bool IsPublic { get; set; }
```

Gets or sets a value that indicates whether the compiled regular expression has public visibility.

Returns: `true` if the regular expression has public visibility; otherwise, `false`.

#### Remarks
If the `IsPublic` property is `false`, the regular expression class defined by the current instance can be instantiated only by code that is executing in the assembly that contains the class. However, because the `Regex.CompileToAssembly` method generates an assembly that contains only compiled regular expressions and does not allow additional code to be added, there is generally no reason to assign this property a value of `false`.

## RegexCompilationInfo.MatchTimeout property

```csharp
public TimeSpan MatchTimeout { get; set; }
```

Gets or sets the regular expression's default time-out interval.

Returns: The default maximum time interval that can elapse in a pattern-matching operation before a
`RegexMatchTimeoutException` is thrown, or `Regex.InfiniteMatchTimeout` if time-outs are disabled.

#### Remarks
The `MatchTimeout` property defines the default time-out interval for the compiled regular expression. This value represents the approximate amount of time that a compiled regular expression will execute a single matching operation before the operation times out and the regular expression engine throws a `RegexMatchTimeoutException` exception during its next timing check.

> **Important:**
>  We recommend that you always set a default time-out value for a compiled regular expression. Consumers of your regular expression library can override that time-out value by passing a `TimeSpan` value that represents the new time-out interval to the compiled regular expression's class constructor.

You can assign a default time-out value to a `RegexCompilationInfo` object in any of the following ways:

- By calling the `AppDomain.SetData` method and providing the string representation of a `TimeSpan` value for the "REGEX_DEFAULT_MATCH_TIMEOUT" property.

- By calling the `%23ctor` constructor and providing a value for the `matchTimeout` parameter.

- By setting the value of this property.

To set a reasonable time-out interval, consider the following factors:

- The length and complexity of the regular expression pattern. Longer and more complex regular expressions require more time than shorter and simpler ones.

- The expected machine load. Processing takes more time on systems with high CPU and memory utilization.

#### Examples
The following example defines a single compiled regular expression named `DuplicateChars` that identifies two or more occurrences of the same character in an input string. The compiled regular expression has a default time-out of 2 seconds. When you execute the example, it creates a class library named RegexLib.dll that contains the compiled regular expression.

_Code sample not included: ~/snippets/csharp/System.Text.RegularExpressions/RegexCompilationInfo/.ctor/example1.cs._

The regular expression pattern `(\w)\1+` is defined as shown in the following table.

|Pattern|Description|
|-------------|-----------------|
|`(\w)`|Match any word character and assign it to the first capturing group.|
|`\1+`|Match one or more occurrences of the value of the first captured group.|

The following example uses the `DuplicatedChars` regular expression to identify duplicate characters in a string array. When it calls the `DuplicatedChars` constructor, it changes the time-out interval to .5 seconds.

_Code sample not included: ~/snippets/csharp/System.Text.RegularExpressions/RegexCompilationInfo/.ctor/example1a.cs._

## RegexCompilationInfo.Name property

```csharp
public string Name { get; set; }
```

Gets or sets the name of the type that represents the compiled regular expression.

Returns: The name of the new type.

Exceptions:

- `ArgumentNullException`: The value for this property is `null`.
- `ArgumentException`: The value for this property is an empty string.

#### Remarks
The `RegexCompilationInfo` class is used to define a compiled regular expression, which is represented as a class derived from `Regex`. The `Name` property defines the class name of the regular expression type, and the `RegexCompilationInfo.Namespace` and `RegexCompilationInfo.Name` properties together define its fully qualified name.

## RegexCompilationInfo.Namespace property

```csharp
public string Namespace { get; set; }
```

Gets or sets the namespace to which the new type belongs.

Returns: The namespace of the new type.

Exceptions:

- `ArgumentNullException`: The value for this property is `null`.

#### Remarks
The `RegexCompilationInfo` class is used to define a compiled regular expression, which is represented as a class derived from `Regex`. The `Namespace` property defines the namespace that contains the compiled regular expression type, and the `RegexCompilationInfo.Namespace` and `RegexCompilationInfo.Name` properties together define its fully qualified name.

## RegexCompilationInfo.Options property

```csharp
public System.Text.RegularExpressions.RegexOptions Options { get; set; }
```

Gets or sets the options to use when compiling the regular expression.

Returns: A bitwise combination of the enumeration values.

#### Remarks
The `Regex.CompileToAssembly` method generates an assembly that contains compiled regular expressions. Therefore, you do not have to specify `Compiled` as one of the values of this property. If it is present, the `Compiled` option is ignored.

## RegexCompilationInfo.Pattern property

```csharp
public string Pattern { get; set; }
```

Gets or sets the regular expression to compile.

Returns: The regular expression to compile.

Exceptions:

- `ArgumentNullException`: The value for this property is `null`.

#### Remarks
The `Pattern` property can contain any valid regular expression. If the value of the `Pattern` property is not a syntactically correct regular expression pattern, the call to the `Regex.CompileToAssembly` method throws an `ArgumentException`.
