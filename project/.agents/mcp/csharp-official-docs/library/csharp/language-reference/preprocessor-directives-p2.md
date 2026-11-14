---
title: "Preprocessor directives (part 2 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/preprocessor-directives.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Preprocessor directives (part 2 of 2)

## Error and warning information

You can use the following directives to generate user-defined compiler errors and warnings, and control line information:

- `#error`: Generate a compiler error with a specified message.
- `#warning`: Generate a compiler warning, with a specific message.
- `#line`: Change the line number printed with compiler messages.

Use `#error` to generate a CS1029 user-defined error from a specific location in your code. For example:

```csharp
#error Deprecated code in this method.
```

> **Note:**
> The compiler treats `#error version` in a special way and reports a compiler error, CS8304, with a message containing the used compiler and language versions.

Use `#warning` to generate a CS1030 level one compiler warning from a specific location in your code. For example:

```csharp
#warning Deprecated code in this method.
```

Use `#line` to modify the compiler's line numbering and (optionally) the file name output for errors and warnings.

The following example shows how to report two warnings associated with line numbers. The `#line 200` directive forces the next line's number to be 200 (although the default is #6), and until the next `#line` directive, the filename is reported as "Special." The `#line default` directive returns the line numbering to its default numbering, which counts the lines renumbered by the previous directive.

```csharp
class MainClass
{
    static void Main()
    {
#line 200 "Special"
        int i;
        int j;
#line default
        char c;
        float f;
#line hidden // numbering not affected
        string s;
        double d;
    }
}
```

Compilation produces the following output:

```console
Special(200,13): warning CS0168: The variable 'i' is declared but never used
Special(201,13): warning CS0168: The variable 'j' is declared but never used
MainClass.cs(9,14): warning CS0168: The variable 'c' is declared but never used
MainClass.cs(10,15): warning CS0168: The variable 'f' is declared but never used
MainClass.cs(12,16): warning CS0168: The variable 's' is declared but never used
MainClass.cs(13,16): warning CS0168: The variable 'd' is declared but never used
```

The `#line` directive might be used in an automated, intermediate step in the build process. For example, if you remove lines from the original source code file, but you still want the compiler to generate output based on the original line numbering in the file, you can remove lines and then simulate the original line numbering by using `#line`.

The `#line hidden` directive hides the successive lines from the debugger, such that when the developer steps through the code, any lines between a `#line hidden` and the next `#line` directive (assuming that it isn't another `#line hidden` directive) are stepped over. This option can also be used to allow ASP.NET to differentiate between user-defined and machine-generated code. Although ASP.NET is the primary consumer of this feature, it's likely that more source generators make use of it.

A `#line hidden` directive doesn't affect file names or line numbers in error reporting. That is, if the compiler finds an error in a hidden block, the compiler reports the current file name and line number of the error.

The `#line filename` directive specifies the file name you want to appear in the compiler output. By default, the actual name of the source code file is used. The file name must be in double quotation marks ("") and must follow a line number.

You can use a new form of the `#line` directive:

```csharp
#line (1, 1) - (5, 60) 10 "partial-class.cs"
/*34567*/int b = 0;
```

The components of this form are:

- `(1, 1)`:  The start line and column for the first character on the line following the directive. In this example, the next line is reported as line 1, column 1.
- `(5, 60)`: The end line and column for the marked region.
- `10`: The column offset for the `#line` directive to take effect. In this example, the 10th column is reported as column one. The declaration `int b = 0;` begins at that column. This field is optional. If omitted, the directive takes effect on the first column.
- `"partial-class.cs"`: The name of the output file.

The preceding example generates the following warning:

```dotnetcli
partial-class.cs(1,5,1,6): warning CS0219: The variable 'b' is assigned but its value is never used
```

After remapping, the variable `b` is on the first line, at character six, of the file `partial-class.cs`.

Domain-specific languages (DSLs) typically use this format to provide a better mapping from the source file to the generated C# output. The most common use of this extended `#line` directive is to remap warnings or errors that appear in a generated file to the original source. For example, consider this razor page:

```razor
@page "/"
Time: @DateTime.NowAndThen
```

The property `DateTime.Now` is typed incorrectly as `DateTime.NowAndThen`. The generated C# for this razor snippet looks like the following, in `page.g.cs`:

```csharp
  _builder.Add("Time: ");
#line (2, 6) - (2, 27) 15 "page.razor"
  _builder.Add(DateTime.NowAndThen);
```

The compiler output for the preceding snippet is:

```dotnetcli
page.razor(2, 2, 2, 27)error CS0117: 'DateTime' does not contain a definition for 'NowAndThen'
```

Line 2, column 6 in `page.razor` is where the text `@DateTime.NowAndThen` begins, noted by `(2, 6)` in the directive. That span of `@DateTime.NowAndThen` ends at line 2, column 27, noted by the `(2, 27)` in the directive. The text for `DateTime.NowAndThen` begins in column 15 of `page.g.cs`, noted by the `15` in the directive. The compiler reports the error in its location in `page.razor`. The developer can navigate directly to the error in their source code, not the generated source.

To see more examples of this format, see Line directives in the C# specification.

## Pragmas

The compiler uses `#pragma` to get special instructions for compiling the file where it appears. The compiler must support the pragmas you use. In other words, you can't use `#pragma` to create custom preprocessing instructions.

- `#pragma warning`: Enable or disable warnings.
- `#pragma checksum`: Generate a checksum.

```csharp
#pragma pragma-name pragma-arguments
```

`pragma-name` is the name of a recognized pragma. `pragma-arguments` is the pragma-specific arguments.

### #pragma warning

`#pragma warning` can enable or disable certain warnings. The `#pragma warning disable format` and `#pragma warning enable format` control how Visual Studio formats code blocks.

```csharp
#pragma warning disable warning-list
#pragma warning restore warning-list
```

`warning-list` is a comma-separated list of warning numbers, such as `414, CS3021`. The "CS" prefix is optional. When you don't specify warning numbers, `disable` disables all warnings and `restore` enables all warnings.

> **Note:**
> To find warning numbers in Visual Studio, build your project and then look for the warning numbers in the **Output** window.

The `disable` takes effect beginning on the next line of the source file. The warning is restored on the line following the `restore`. If there's no `restore` in the file, the warnings restore to their default state at the first line of any later files in the same compilation.

```csharp
// pragma_warning.cs
using System;

#pragma warning disable 414, CS3021
[CLSCompliant(false)]
public class C
{
    int i = 1;
    static void Main()
    {
    }
}
#pragma warning restore CS3021
[CLSCompliant(false)]  // CS3021
public class D
{
    int i = 1;
    public static void F()
    {
    }
}
```

Another form of the `warning` pragma disables or restores Visual Studio formatting commands in blocks of code:

```csharp
#pragma warning disable format
#pragma warning restore format
```

Visual Studio format commands don't modify text in blocks of code where `disable format` is in effect. Format commands, such as `Ctrl+K`, `Ctrl+D`, don't modify those regions of code. This pragma gives you fine control over the visual presentation of your code.

### #pragma checksum

Generates checksums for source files to help with debugging ASP.NET pages.

```csharp
#pragma checksum "filename" "{guid}" "checksum bytes"
```

The directive uses `"filename"` as the name of the file to monitor for changes or updates, `"{guid}"` as the Globally Unique Identifier (GUID) for the hash algorithm, and `"checksum_bytes"` as the string of hexadecimal digits representing the bytes of the checksum. You must provide an even number of hexadecimal digits. An odd number of digits results in a compile-time warning, and the directive is ignored.

The Visual Studio debugger uses a checksum to make sure that it always finds the right source. The compiler computes the checksum for a source file, and then emits the output to the program database (PDB) file. The debugger uses the PDB to compare against the checksum that it computes for the source file.

This solution doesn't work for ASP.NET projects, because the computed checksum is for the generated source file, rather than the .aspx file. To address this problem, `#pragma checksum` provides checksum support for ASP.NET pages.

When you create an ASP.NET project in Visual C#, the generated source file contains a checksum for the .aspx file, from which the source is generated. The compiler then writes this information into the PDB file.

If the compiler doesn't find a `#pragma checksum` directive in the file, it computes the checksum and writes the value to the PDB file.

```csharp
class TestClass
{
    static int Main()
    {
        #pragma checksum "file.cs" "{406EA660-64CF-4C82-B6F0-42D48172A799}" "ab007f1d23d9" // New checksum
    }
}
```
