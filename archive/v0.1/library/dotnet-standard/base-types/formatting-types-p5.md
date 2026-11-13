---
title: "Overview: How to format numbers, dates, enums, and other types in .NET (part 5 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/formatting-types.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Overview: How to format numbers, dates, enums, and other types in .NET (part 5 of 5)

## Custom formatting with ICustomFormatter

Two composite formatting methods, `System.String.Format(System.IFormatProvider,System.String,System.Object[])` and `System.Text.StringBuilder.AppendFormat(System.IFormatProvider,System.String,System.Object[])`, include a format provider parameter that supports custom formatting. When either of these formatting methods is called, it passes a `System.Type` object that represents an `System.ICustomFormatter` interface to the format provider's `System.IFormatProvider.GetFormat*` method. The `System.IFormatProvider.GetFormat*` method is then responsible for returning the `System.ICustomFormatter` implementation that provides custom formatting.

The `System.ICustomFormatter` interface has a single method, `System.ICustomFormatter.Format(System.String,System.Object,System.IFormatProvider)`, that is called automatically by a composite formatting method, once for each format item in a composite format string. The `System.ICustomFormatter.Format(System.String,System.Object,System.IFormatProvider)` method has three parameters: a format string, which represents the `formatString` argument in a format item, an object to format, and an `System.IFormatProvider` object that provides formatting services. Typically, the class that implements `System.ICustomFormatter` also implements `System.IFormatProvider`, so this last parameter is a reference to the custom formatting class itself. The method returns a custom formatted string representation of the object to be formatted. If the method can't format the object, it should return a null reference (`Nothing` in Visual Basic).

The following example provides an `System.ICustomFormatter` implementation named `ByteByByteFormatter` that displays integer values as a sequence of two-digit hexadecimal values followed by a space.

```csharp
public class ByteByByteFormatter : IFormatProvider, ICustomFormatter
{
    public object? GetFormat(Type? formatType)
    {
        if (formatType == typeof(ICustomFormatter))
            return this;
        else
            return null;
    }

    public string Format(string? format, object? arg,
                           IFormatProvider? formatProvider)
    {
        if ((formatProvider is not null) && !formatProvider.Equals(this)) return "";

        // Handle only hexadecimal format string.
        if ((format is not null) && !format.StartsWith("X")) return "";

        byte[] bytes;

        // Handle only integral types.
        if (arg is Int16)
            bytes = BitConverter.GetBytes((Int16)arg);
        else if (arg is Int32)
            bytes = BitConverter.GetBytes((Int32)arg);
        else if (arg is Int64)
            bytes = BitConverter.GetBytes((Int64)arg);
        else if (arg is UInt16)
            bytes = BitConverter.GetBytes((UInt16)arg);
        else if (arg is UInt32)
            bytes = BitConverter.GetBytes((UInt32)arg);
        else if (arg is UInt64)
            bytes = BitConverter.GetBytes((UInt64)arg);
        else
            return "";

        string output= "";
        for (int ctr = bytes.Length - 1; ctr >= 0; ctr--)
            output += string.Format("{0:X2} ", bytes[ctr]);

        return output.Trim();
    }
}

public class Example10
{
    public static void Main()
    {
        long value = 3210662321;
        byte value1 = 214;
        byte value2 = 19;

        Console.WriteLine(string.Format(new ByteByByteFormatter(), "{0:X}", value));
        Console.WriteLine(string.Format(new ByteByByteFormatter(), "{0:X} And {1:X} = {2:X} ({2:000})",
                                        value1, value2, value1 & value2));
        Console.WriteLine(string.Format(new ByteByByteFormatter(), "{0,10:N0}", value));
    }
}
// The example displays the following output:
//       00 00 00 00 BF 5E D1 B1
//       00 D6 And 00 13 = 00 12 (018)
//       3,210,662,321
```

The following example uses the `ByteByByteFormatter` class to format integer values. The `System.ICustomFormatter.Format*` method is called more than once in the second `System.String.Format(System.IFormatProvider,System.String,System.Object[])` method call, and that the default `System.Globalization.NumberFormatInfo` provider is used in the third method call because the .`ByteByByteFormatter.Format` method doesn't recognize the "N0" format string and returns a null reference (`Nothing` in Visual Basic).

```csharp
public class ByteByByteFormatter : IFormatProvider, ICustomFormatter
{
    public object? GetFormat(Type? formatType)
    {
        if (formatType == typeof(ICustomFormatter))
            return this;
        else
            return null;
    }

    public string Format(string? format, object? arg,
                           IFormatProvider? formatProvider)
    {
        if ((formatProvider is not null) && !formatProvider.Equals(this)) return "";

        // Handle only hexadecimal format string.
        if ((format is not null) && !format.StartsWith("X")) return "";

        byte[] bytes;

        // Handle only integral types.
        if (arg is Int16)
            bytes = BitConverter.GetBytes((Int16)arg);
        else if (arg is Int32)
            bytes = BitConverter.GetBytes((Int32)arg);
        else if (arg is Int64)
            bytes = BitConverter.GetBytes((Int64)arg);
        else if (arg is UInt16)
            bytes = BitConverter.GetBytes((UInt16)arg);
        else if (arg is UInt32)
            bytes = BitConverter.GetBytes((UInt32)arg);
        else if (arg is UInt64)
            bytes = BitConverter.GetBytes((UInt64)arg);
        else
            return "";

        string output= "";
        for (int ctr = bytes.Length - 1; ctr >= 0; ctr--)
            output += string.Format("{0:X2} ", bytes[ctr]);

        return output.Trim();
    }
}

public class Example10
{
    public static void Main()
    {
        long value = 3210662321;
        byte value1 = 214;
        byte value2 = 19;

        Console.WriteLine(string.Format(new ByteByByteFormatter(), "{0:X}", value));
        Console.WriteLine(string.Format(new ByteByByteFormatter(), "{0:X} And {1:X} = {2:X} ({2:000})",
                                        value1, value2, value1 & value2));
        Console.WriteLine(string.Format(new ByteByByteFormatter(), "{0,10:N0}", value));
    }
}
// The example displays the following output:
//       00 00 00 00 BF 5E D1 B1
//       00 D6 And 00 13 = 00 12 (018)
//       3,210,662,321
```

## See also

| Title | Definition |
|-------|------------|
|Standard Numeric Format Strings|Describes standard format strings that create commonly used string representations of numeric values.|
|Custom Numeric Format Strings|Describes custom format strings that create application-specific formats for numeric values.|
|Standard Date and Time Format Strings|Describes standard format strings that create commonly used string representations of `System.DateTime` values.|
|Custom Date and Time Format Strings|Describes custom format strings that create application-specific formats for `System.DateTime` values.|
|Standard TimeSpan Format Strings|Describes standard format strings that create commonly used string representations of time intervals.|
|Custom TimeSpan Format Strings|Describes custom format strings that create application-specific formats for time intervals.|
|Enumeration Format Strings|Describes standard format strings that are used to create string representations of enumeration values.|
|Composite Formatting|Describes how to embed one or more formatted values in a string. The string can subsequently be displayed on the console or written to a stream.|
|Parsing Strings|Describes how to initialize objects to the values described by string representations of those objects. Parsing is the inverse operation of formatting.|

## Reference

- `System.IFormattable`
- `System.IFormatProvider`
- `System.ICustomFormatter`
