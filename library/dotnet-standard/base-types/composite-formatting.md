---
title: "Composite formatting (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/composite-formatting.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Composite formatting

The .NET composite formatting feature takes a list of objects and a composite format string as input. A composite format string consists of fixed text intermixed with indexed placeholders, called format items. These format items correspond to the objects in the list. The formatting operation yields a result string that consists of the original fixed text intermixed with the string representation of the objects in the list.

> **Important:**
> Instead of using composite format strings, you can use *interpolated strings* if the language and its version that you're using support them. An interpolated string contains *interpolated expressions*. Each interpolated expression is resolved with the expression's value and included in the result string when the string is assigned. For more information, see String interpolation (C# Reference) and Interpolated strings (Visual Basic Reference).

The following methods support the composite formatting feature:

- `System.String.Format*`, which returns a formatted result string.
- `System.Text.StringBuilder.AppendFormat*`, which appends a formatted result string to a `System.Text.StringBuilder` object.
- Some overloads of the `System.Console.WriteLine*` method, which display a formatted result string to the console.
- Some overloads of the `System.IO.TextWriter.WriteLine*` method, which write the formatted result string to a stream or file. The classes derived from `System.IO.TextWriter`, such as `System.IO.StreamWriter` and `System.Web.UI.HtmlTextWriter`, also share this functionality.
- `System.Diagnostics.Debug.WriteLine(System.String,System.Object[])`, which outputs a formatted message to trace listeners.
- The `System.Diagnostics.Trace.TraceError(System.String,System.Object[])`, `System.Diagnostics.Trace.TraceInformation(System.String,System.Object[])`, and `System.Diagnostics.Trace.TraceWarning(System.String,System.Object[])` methods, which output formatted messages to trace listeners.
- The `System.Diagnostics.TraceSource.TraceInformation(System.String,System.Object[])` method, which writes an informational method to trace listeners.

## Composite format string

A composite format string and object list are used as arguments of methods that support the composite formatting feature. A composite format string consists of zero or more runs of fixed text intermixed with one or more format items. The fixed text is any string that you choose, and each format item corresponds to an object or boxed structure in the list. The string representation of each object replaces the corresponding format item.

Consider the following `System.String.Format*` code fragment:

```csharp
string.Format("Name = {0}, hours = {1:hh}", "Fred", DateTime.Now);
```
```vb
String.Format("Name = {0}, hours = {1:hh}", "Fred", DateTime.Now)
```

The fixed text is `Name = ` and `, hours = `. The format items are `{0}`, whose index of 0 corresponds to the string literal `"Fred"`, and `{1:hh}`, whose index of 1 corresponds to the value of `DateTime.Now`.
