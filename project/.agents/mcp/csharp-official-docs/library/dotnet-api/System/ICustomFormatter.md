---
title: "ICustomFormatter interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ICustomFormatter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ICustomFormatter interface

Namespace: `System`

```csharp
public interface ICustomFormatter
```

Defines a method that supports custom formatting of the value of an object.

#### Remarks
The `ICustomFormatter` interface includes a single method, `ICustomFormatter.Format`. When this interface is implemented by a reference or value type, the `ICustomFormatter.Format` method returns a custom-formatted string representation of an object's value.

Typically, the `ICustomFormatter` interface is implemented with the `IFormatProvider` interface to customize the behavior of two .NET composite string formatting methods that include an `IFormatProvider` parameter. Specifically, the `ICustomFormatter` interface can provide custom formatting of the value of an object passed to the `Format` and `AppendFormat` methods.

Providing a custom representation of an object's value requires that you do the following:

1. Define a class that implements the `ICustomFormatter` interface and its single member, the `ICustomFormatter.Format` method.
2. Define a class that implements the `IFormatProvider` interface and its single member, the `IFormatProvider.GetFormat` method. The `IFormatProvider.GetFormat` method returns an instance of your `ICustomFormatter` implementation. Often, a single class implements both `ICustomFormatter` and `IFormatProvider`. In that case, the class's `GetFormat` implementation just returns an instance of itself.
3. Pass the `IFormatProvider` implementation as the `provider` argument of the `Format` method or a comparable method.

The .NET library method will then use your custom formatting instead of its own.

#### Examples

The following example implements `ICustomFormatter` to allow binary, octal, and hexadecimal formatting of integral values. In this example, a single class, `MyFormatter`, implements both `ICustomFormatter` and `IFormatProvider`. Its `IFormatProvider.GetFormat` method determines whether the `formatType` parameter represents an `ICustomFormatter` type. If it does, `MyFormatter` returns an instance of itself; otherwise, it returns `null`. Its `ICustomFormatter.Format` implementation determines whether the format parameter is one of the three supported format strings ("B" for binary, "O" for octal, and "H" for hexadecimal) and formats the `arg` parameter appropriately. Otherwise, if `arg` is not `null`, it calls the `arg` parameter's `IFormattable.ToString` implementation, if one exists, or its parameterless `ToString` method, if one does not. If `arg` is `null`, the method returns `Empty`.

_Code sample not included: ~/snippets/csharp/System/ICustomFormatter/Overview/myformatter.cs._

`MyFormatter` can then be used to provide custom formatting by passing a `MyFormatter` object as the `provider` parameter of the `String.Format` method, as the following example shows.

_Code sample not included: ~/snippets/csharp/System/ICustomFormatter/Overview/myformatter.cs._

## ICustomFormatter.Format(String, Object, IFormatProvider) method

```csharp
public string Format (string? format, object? arg, IFormatProvider? formatProvider);
```

Converts the value of a specified object to an equivalent string representation using specified format and culture-specific formatting information.

Parameters:

- `format`: A format string containing formatting specifications.
- `arg`: An object to format.
- `formatProvider`: An object that supplies format information about the current instance.

Returns: The string representation of the value of `arg`, formatted as specified by `format` and `formatProvider`.

#### Remarks
`ICustomFormatter.Format` is a callback method. It is called by a method that supports custom formatting, such as `Format` or `AppendFormat`. The implementation is called once for each format item in a composite format string. For example, in the following statement, the `ICustomFormatter.Format` method is called three times.

_Code sample not included: ~/snippets/csharp/System/ICustomFormatter/Overview/myformatter.cs._

The `arg` parameter is the object in the object list whose zero-based position corresponds to the index of a particular format item.

The `format` parameter contains a format string, which is the `formatString` component of a format item. If the format item has no `formatString` component, the value of `format` is `null`. If `format` is `null`, depending on the type of `arg`, you may be able to use the default format specification of your choice.

The `formatProvider` parameter is the `IFormatProvider` implementation that provides formatting for `arg`. Typically, it is an instance of your `ICustomFormatter` implementation. If `formatProvider` is `null`, ignore that parameter.

Your implementation of the `ICustomFormatter.Format` method must include the following functionality so .NET can provide formatting you do not support. If your format method does not support a format, determine whether the object being formatted implements the `IFormattable` interface. If it does, invoke the `IFormattable.ToString` method of that interface. Otherwise, invoke the default `Object.ToString` method of the underlying object. The following code illustrates this pattern.

_Code sample not included: ~/snippets/csharp/System/ICustomFormatter/Overview/myformatter.cs._

#### Examples
The following example implements `ICustomFormatter` to allow binary, octal, and hexadecimal formatting of integral values. Its `ICustomFormatter.Format` implementation determines whether the format parameter is one of the three supported format strings ("B" for binary, "O" for octal, and "H" for hexadecimal) and formats the `arg` parameter appropriately. Otherwise, if `arg` is not `null`, it calls the `arg` parameter's `IFormattable.ToString` implementation, if one exists, or its parameterless `ToString` method, if one does not. If `arg` is `null`, the method returns `Empty`.

_Code sample not included: ~/snippets/csharp/System/ICustomFormatter/Overview/myformatter.cs._

`MyFormatter` can then be used to provide custom formatting by passing a `MyFormatter` object as the `provider` parameter of the `String.Format` method, as the following example shows.

_Code sample not included: ~/snippets/csharp/System/ICustomFormatter/Overview/myformatter.cs._
