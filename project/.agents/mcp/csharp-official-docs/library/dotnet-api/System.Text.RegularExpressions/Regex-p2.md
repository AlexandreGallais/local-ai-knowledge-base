---
title: "Regex class (part 2 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.RegularExpressions/Regex.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Regex class (part 2 of 9)

## Regex.CompileToAssembly(RegexCompilationInfo[], AssemblyName, CustomAttributeBuilder[]) method

```csharp
public static void CompileToAssembly (System.Text.RegularExpressions.RegexCompilationInfo[] regexinfos, System.Reflection.AssemblyName assemblyname, System.Reflection.Emit.CustomAttributeBuilder[]? attributes);
```

Compiles one or more specified `Regex` objects to a named assembly with the specified attributes.

Parameters:

- `regexinfos`: An array that describes the regular expressions to compile.
- `assemblyname`: The file name of the assembly.
- `attributes`: An array that defines the attributes to apply to the assembly.

Exceptions:

- `ArgumentException`: The value of the `assemblyname` parameter's `AssemblyName.Name` property is an empty or null string.

-or-

The regular expression pattern of one or more objects in `regexinfos` contains invalid syntax.
- `ArgumentNullException`: `assemblyname` or `regexinfos` is `null`.
- `PlatformNotSupportedException`: Creating an assembly of compiled regular expressions is not supported.

#### Remarks
The `CompileToAssembly` method generates a .NET Framework assembly in which each regular expression defined in the `regexinfos` array is represented by a class. Typically, the `CompileToAssembly` method is called from a separate application that generates an assembly of compiled regular expressions. Each regular expression included in the assembly has the following characteristics:

- It is derived from the `Regex` class.

- It is assigned the fully qualified name that is defined by the `fullnamespace` and `name` parameters of its corresponding `RegexCompilationInfo` object.

- It has a default (or parameterless) constructor.

Ordinarily, the code that instantiates and uses the compiled regular expression is found in an assembly or application that is separate from the code that creates the assembly.

Because the `Regex.CompileToAssembly` method generates a .NET Framework assembly from a method call instead of using a particular language's class definition keyword (such as `class` in C# or `Class`...`End Class` in Visual Basic), it does not allow .NET Framework attributes to be assigned to the assembly by using the development language's standard attribute syntax. The `attributes` parameter provides an alternative method for defining the attributes that apply to the assembly. For each attribute that you want to apply to the assembly, do the following:

1.  Create an array of `Type` objects representing the parameter types of the attribute constructor that you want to call.

2.  Retrieve a `Type` object representing the attribute class that you want to apply to the new assembly.

3.  Call the `Type.GetConstructor` method of the attribute `Type` object to retrieve a `ConstructorInfo` object representing the attribute constructor that you want to call. Pass the `Type.GetConstructor` method the array of `Type` objects that represents the constructor's parameter types.

4.  Create a `Object` array that defines the parameters to pass to the attribute's constructor.

5.  Instantiate a `CustomAttributeBuilder` object by passing its constructor the `ConstructorInfo` object retrieved in step 3 and the `Object` array created in step 4.

You can then pass an array of these `CustomAttributeBuilder` objects instead of the `attributes` parameter to the `CompileToAssembly` method.

#### Examples
The following example creates an assembly named RegexLib.dll and applies the `AssemblyTitleAttribute` attribute to it. The assembly includes two compiled regular expressions. The first, `Utilities.RegularExpressions.DuplicatedString`, matches two identical contiguous words. The second, `Utilities.RegularExpressions.EmailAddress`, checks whether a string has the correct format to be an email address.

_Code sample not included: ~/snippets/csharp/System.Text.RegularExpressions/Regex/CompileToAssembly/Compile3.cs._

You can verify that the `AssemblyTitleAttribute` attribute has been applied to the assembly by examining its manifest with a reflection utility such as ILDasm.

The regular expression that checks a string for duplicate words is then instantiated and used by the following example.

_Code sample not included: ~/snippets/csharp/System.Text.RegularExpressions/Regex/CompileToAssembly/Compile2.cs._

Successful compilation of this second example requires a reference to RegexLib.dll (the assembly created by the first example) to be added to the project.

## Regex.CompileToAssembly(RegexCompilationInfo[], AssemblyName, CustomAttributeBuilder[], String) method

```csharp
public static void CompileToAssembly (System.Text.RegularExpressions.RegexCompilationInfo[] regexinfos, System.Reflection.AssemblyName assemblyname, System.Reflection.Emit.CustomAttributeBuilder[]? attributes, string? resourceFile);
```

Compiles one or more specified `Regex` objects and a specified resource file
to a named assembly with the specified attributes.

Parameters:

- `regexinfos`: An array that describes the regular expressions to compile.
- `assemblyname`: The file name of the assembly.
- `attributes`: An array that defines the attributes to apply to the assembly.
- `resourceFile`: The name of the Win32 resource file to include in the assembly.

Exceptions:

- `ArgumentException`: The value of the `assemblyname` parameter's `AssemblyName.Name` property is an empty or null string.

-or-

The regular expression pattern of one or more objects in `regexinfos` contains invalid syntax.
- `ArgumentNullException`: `assemblyname` or `regexinfos` is `null`.
- `COMException`: The `resourceFile` parameter designates an invalid Win32 resource file.
- `FileNotFoundException`: The file designated by the `resourceFile` parameter cannot be found.
- `PlatformNotSupportedException`: Creating an assembly of compiled regular expressions is not supported.

#### Remarks
The `CompileToAssembly` method generates a .NET Framework assembly in which each regular expression defined in the `regexinfos` array is represented by a class. Typically, the `CompileToAssembly` method is called from a separate application that generates an assembly of compiled regular expressions. Each regular expression included in the assembly has the following characteristics:

- It is derived from the `Regex` class.

- It is assigned the fully qualified name that is defined by the `fullnamespace` and `name` parameters of its corresponding `RegexCompilationInfo` object.

- It has a default (or parameterless) constructor.

Ordinarily, the code that instantiates and uses the compiled regular expression is found in an assembly or application that is separate from the code that creates the assembly.

Because the `Regex.CompileToAssembly` method generates a .NET Framework assembly from a method call instead of using a particular language's class definition keyword (such as `class` in C# or `Class`...`End Class` in Visual Basic), it does not allow .NET Framework attributes to be assigned to the assembly by using the development language's standard attribute syntax. The `attributes` parameter provides an alternative method for defining the attributes that apply to the assembly. For each attribute that you want to apply to the assembly, do the following:

1.  Create an array of `Type` objects representing the parameter types of the attribute constructor that you want to call.

2.  Retrieve a `Type` object representing the attribute class that you want to apply to the new assembly.

3.  Call the `Type.GetConstructor` method of the attribute `Type` object to retrieve a `ConstructorInfo` object representing the attribute constructor that you want to call. Pass the `Type.GetConstructor` method the array of `Type` objects that represents the constructor's parameter types

4.  Create a `Object` array that defines the parameters to pass to the attribute's constructor.

5.  Instantiate a `CustomAttributeBuilder` object by passing its constructor the `ConstructorInfo` object retrieved in step 3 and the `Object` array created in step 4.

You can then pass an array of these `CustomAttributeBuilder` objects instead of the `attributes` parameter to the `CompileToAssembly` method.

## Regex.Count(Char>) method

```csharp
public int Count (ReadOnlySpan<char> input);
```

Searches an input span for all occurrences of a regular expression and returns the number of matches.

Parameters:

- `input`: The span to search for a match.

Returns: The number of matches.

To be added.

## Regex.Count(String) method

```csharp
public int Count (string input);
```

Searches an input string for all occurrences of a regular expression and returns the number of matches.

Parameters:

- `input`: The string to search for a match.

Returns: The number of matches.

Exceptions:

- `ArgumentNullException`: `input` is null.

To be added.

## Regex.Count(Char>, Int32) method

```csharp
public int Count (ReadOnlySpan<char> input, int startat);
```

Searches an input span for all occurrences of a regular expression and returns the number of matches.

Parameters:

- `input`: The span to search for a match.
- `startat`: The zero-based character position at which to start the search.

Returns: The number of matches.

To be added.

## Regex.Count(Char>, String) method

```csharp
public static int Count (ReadOnlySpan<char> input, string pattern);
```

Searches an input span for all occurrences of a regular expression and returns the number of matches.

Parameters:

- `input`: The span to search for a match.
- `pattern`: The regular expression pattern to match.

Returns: The number of matches.

Exceptions:

- `RegexParseException`: A regular expression parsing error occurred.

To be added.

## Regex.Count(String, String) method

```csharp
public static int Count (string input, string pattern);
```

Searches an input string for all occurrences of a regular expression and returns the number of matches.

Parameters:

- `input`: The string to search for a match.
- `pattern`: The regular expression pattern to match.

Returns: The number of matches.

Exceptions:

- `ArgumentNullException`: `input` or `pattern` is null.
- `RegexParseException`: A regular expression parsing error occurred.

To be added.

## Regex.Count(Char>, String, RegexOptions) method

```csharp
public static int Count (ReadOnlySpan<char> input, string pattern, System.Text.RegularExpressions.RegexOptions options);
```

Searches an input span for all occurrences of a regular expression and returns the number of matches.

Parameters:

- `input`: The span to search for a match.
- `pattern`: The regular expression pattern to match.
- `options`: A bitwise combination of the enumeration values that specify options for matching.

Returns: The number of matches.

Exceptions:

- `ArgumentOutOfRangeException`: `options` is not a valid bitwise combination of RegexOptions values.
- `RegexParseException`: A regular expression parsing error occurred.

To be added.

## Regex.Count(String, String, RegexOptions) method

```csharp
public static int Count (string input, string pattern, System.Text.RegularExpressions.RegexOptions options);
```

Searches an input string for all occurrences of a regular expression and returns the number of matches.

Parameters:

- `input`: The string to search for a match.
- `pattern`: The regular expression pattern to match.
- `options`: A bitwise combination of the enumeration values that specify options for matching.

Returns: The number of matches.

Exceptions:

- `ArgumentNullException`: `input` or `pattern` is null.
- `ArgumentOutOfRangeException`: `options` is not a valid bitwise combination of RegexOptions values.
- `RegexParseException`: A regular expression parsing error occurred.

To be added.

## Regex.Count(Char>, String, RegexOptions, TimeSpan) method

```csharp
public static int Count (ReadOnlySpan<char> input, string pattern, System.Text.RegularExpressions.RegexOptions options, TimeSpan matchTimeout);
```

Searches an input span for all occurrences of a regular expression and returns the number of matches.

Parameters:

- `input`: The span to search for a match.
- `pattern`: The regular expression pattern to match.
- `options`: A bitwise combination of the enumeration values that specify options for matching.
- `matchTimeout`: A time-out interval, or `Regex.InfiniteMatchTimeout` to indicate that the method should not time out.

Returns: The number of matches.

Exceptions:

- `ArgumentOutOfRangeException`: `options` is not a valid bitwise combination of RegexOptions values, or `matchTimeout` is negative, zero, or greater than approximately 24 days.
- `RegexParseException`: A regular expression parsing error occurred.

To be added.

## Regex.Count(String, String, RegexOptions, TimeSpan) method

```csharp
public static int Count (string input, string pattern, System.Text.RegularExpressions.RegexOptions options, TimeSpan matchTimeout);
```

Searches an input string for all occurrences of a regular expression and returns the number of matches.

Parameters:

- `input`: The string to search for a match.
- `pattern`: The regular expression pattern to match.
- `options`: A bitwise combination of the enumeration values that specify options for matching.
- `matchTimeout`: A time-out interval, or `Regex.InfiniteMatchTimeout` to indicate that the method should not time out.

Returns: The number of matches.

Exceptions:

- `ArgumentNullException`: `input` or `pattern` is null.
- `ArgumentOutOfRangeException`: `options` is not a valid bitwise combination of RegexOptions values, or `matchTimeout` is negative, zero, or greater than approximately 24 days.
- `RegexParseException`: A regular expression parsing error occurred.

To be added.

## Regex.EnumerateMatches(Char>) method

```csharp
public System.Text.RegularExpressions.Regex.ValueMatchEnumerator EnumerateMatches (ReadOnlySpan<char> input);
```

Searches an input span for all occurrences of a regular expression and returns a `ValueMatchEnumerator` to iterate over the matches.

Parameters:

- `input`: The span to search for a match.

Returns: A `ValueMatchEnumerator` to iterate over the matches.

Each match won't actually happen until `ValueMatchEnumerator.MoveNext` is invoked on the enumerator, with one match being performed per `ValueMatchEnumerator.MoveNext` call.
Since the evaluation of the match happens lazily, any changes to the passed in input in between calls to `ValueMatchEnumerator.MoveNext` will affect the match results.
The enumerator returned by this method, as well as the structs returned by the enumerator that wrap each match found in the input are ref structs which
make this method be amortized allocation free.
