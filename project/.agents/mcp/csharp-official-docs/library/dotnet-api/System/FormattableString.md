---
title: "FormattableString class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/FormattableString.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FormattableString class

Namespace: `System`

```csharp
public abstract class FormattableString : IFormattable
```

Represents a composite format string, along with the arguments to be formatted.

#### Remarks
A composite format string consists of fixed text intermixed with indexed placeholders, called format items, that correspond to the objects in the list. The formatting operation yields a result string that consists of the original fixed text intermixed with the string representation of the objects in the list. Composite formatting is supported by methods such as `String.Format`, `Console.WriteLine`, and `StringBuilder.AppendFormat`.  For more information on composite formatting, see Composite Formatting.

A `FormattableString` instance may result from an interpolated string in C# or Visual Basic.

## FormattableString.FormattableString() constructor

```csharp
protected FormattableString ();
```

Instantiates a new instance of the `FormattableString` class.

To be added.

## FormattableString.ArgumentCount property

```csharp
public abstract int ArgumentCount { get; }
```

Gets the number of arguments to be formatted.

Returns: The number of arguments to be formatted.

#### Remarks
The arguments can be retrieved from the object array returned by the `FormattableString.GetArguments` method, or they can be retrieved individually by index number from the `FormattableString.GetArgument` method. The indexes of individual arguments range from zero to `FormattableString.ArgumentCount` - 1.

## FormattableString.Format property

```csharp
public abstract string Format { get; }
```

Returns the composite format string.

Returns: The composite format string.

#### Remarks
A composite format string consists of zero or more runs of fixed text intermixed with one or more format items, which are indicated by an index number delimited with brackets (for example, `{0}`). The index of each format item corresponds to an argument in an object list that follows the composite format string. For example, in the following statement:

_Code sample not included: ~/snippets/csharp/System/FormattableString/Format/Composite1.cs._

the composite format string is `"Name = {0}, hours = {1:hh}"`.

## FormattableString.CurrentCulture(FormattableString) method

```csharp
public static string CurrentCulture (FormattableString formattable);
```

Returns a result string in which arguments are formatted by using the conventions of the current culture.

Parameters:

- `formattable`: The string to be formatted.

Returns: The string that results from formatting the current instance by using the conventions of the current culture.

#### Remarks

This static method may be imported in C# or F# by:

```csharp
    using static System.FormattableString;
```

``fsharp
open type System.FormattableString
```

Within the scope of that import directive, an interpolated string may be formatted in the current culture by writing, for example:

```csharp
CurrentCulture($"{{ lat = {latitude}; lon = {longitude} }}");
```

```fsharp
CurrentCulture $"{{ lat = {latitude}; lon = {longitude} }}"
```

## FormattableString.GetArgument(Int32) method

```csharp
public abstract object? GetArgument (int index);
```

Returns the argument at the specified index position.

Parameters:

- `index`: The index of the argument. Its value can range from zero to one less than the value of `FormattableString.ArgumentCount`.

Returns: The argument.

To be added.

## FormattableString.GetArguments() method

```csharp
public abstract object?[] GetArguments ();
```

Returns an object array that contains one or more objects to format.

Returns: An object array that contains one or more objects to format.

#### Remarks
Clients should not modify the contents of the array.

## FormattableString.Invariant(FormattableString) method

```csharp
public static string Invariant (FormattableString formattable);
```

Returns a result string in which arguments are formatted by using the conventions of the invariant culture.

Parameters:

- `formattable`: The object to convert to a result string.

Returns: The string that results from formatting the current instance by using the conventions of the invariant culture.

Exceptions:

- `ArgumentNullException`: `formattable` is `null`.

#### Remarks
This static method can be imported in C# by the following statement:

```csharp
using static System.FormattableString;
```

Within the scope that `using static` directive, an interpolated string may be formatted using the conventions of the invariant culture by code such as the following:

```csharp
Invariant($"{{ lat = {latitude}; lon = {longitude} }}")
```

## FormattableString.System.IFormattable.ToString(String, IFormatProvider) method

```csharp
string IFormattable.ToString (string ignored, IFormatProvider formatProvider);
```

Returns the string that results from formatting the format string along with its arguments by using the formatting conventions of a specified culture.

Parameters:

- `ignored`: A string. This argument is ignored.
- `formatProvider`: An object that provides culture-specific formatting information.

Returns: A string formatted using the conventions of the `formatProvider` parameter.

#### Remarks
This implementation calls the derived class' `ToString` implementation.

This member is an explicit interface implementation. It can be used only when the `FormattableString` instance is cast to an `IFormattable` interface.

## FormattableString.ToString() method

```csharp
public override string ToString ();
```

Returns the string that results from formatting the composite format string along with its arguments by using the formatting conventions of the current culture.

Returns: A result string formatted by using the conventions of the current culture.

To be added.

## FormattableString.ToString(IFormatProvider) method

```csharp
public abstract string ToString (IFormatProvider? formatProvider);
```

Returns the string that results from formatting the composite format string along with its arguments by using the formatting conventions of a specified culture.

Parameters:

- `formatProvider`: An object that provides culture-specific formatting information.

Returns: A result string formatted by using the conventions of `formatProvider`.

To be added.
