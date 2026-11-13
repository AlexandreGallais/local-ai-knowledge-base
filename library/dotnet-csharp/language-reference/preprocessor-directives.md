---
title: "Preprocessor directives (part 1 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/preprocessor-directives.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# C# preprocessor directives

Although the compiler doesn't have a separate preprocessor, it processes the directives described in this section as if there were one. Use these directives to help in conditional compilation. Unlike C and C++ directives, you can't use these directives to create macros. A preprocessor directive must be the only instruction on a line.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

## File-based apps

*File-based apps* are programs that you compile and run by using `dotnet run Program.cs` (or any `*.cs` file). The C# compiler ignores these preprocessor directives, but the build system parses them to produce the output. These directives generate warnings when encountered in a project-based compilation.

The C# compiler ignores any preprocessor directive that starts with `#:` or `#!`.

The `#!` preprocessor directive enables Unix operating systems to directly execute the C# file using its filename.

```csharp
#!/usr/bin/env dotnet
Console.WriteLine("Hello");
```

The first line in the file informs a Unix operating system to execute the file using `dotnet`. The `/usr/bin/env` command locates the `dotnet` executable in your PATH, making this approach portable across different Unix and macOS distributions where `dotnet` may be installed at different locations. In addition to including this line in the C# file, you need to set the *execute* (`x`) permission (`chmod +x <file>`).

The `#:` directives that are used in file-based apps are described in the file based apps reference.

Other tools can add new tokens following the `#:` convention.

## Nullable context

The `#nullable` preprocessor directive sets the *annotations* and *warning* flags in the *nullable context*. This directive controls whether nullable annotations have effect, and whether nullability warnings are given. Each flag is either *disabled* or *enabled*.

You can specify both contexts at the project level (outside of C# source code) by adding the `Nullable` element to the `PropertyGroup` element. The `#nullable` directive controls the annotation and warning flags and takes precedence over the project-level settings. A directive sets the flag it controls until another directive overrides it, or until the end of the source file.

The effect of the directives is as follows:

- `#nullable disable`: Sets the nullable context *disabled*.
- `#nullable enable`: Sets the nullable context *enabled*.
- `#nullable restore`: Restores the nullable context to project settings.
- `#nullable disable annotations`: Sets the annotations flag in the nullable context to *disabled*.
- `#nullable enable annotations`: Sets the annotations flag in the nullable context to *enabled*.
- `#nullable restore annotations`: Restores the annotations flag in the nullable context to project settings.
- `#nullable disable warnings`: Sets the warning flag in the nullable context to *disabled*.
- `#nullable enable warnings`: Sets the warning flag in the nullable context to *enabled*.
- `#nullable restore warnings`: Restores the warning flag  in the nullable context to project settings.

## Conditional compilation

Use four preprocessor directives to control conditional compilation:

- `#if`: Starts a conditional compilation. The compiler compiles the code only if the specified symbol is defined.
- `#elif`: Closes the preceding conditional compilation and opens a new conditional compilation based on if the specified symbol is defined.
- `#else`: Closes the preceding conditional compilation and opens a new conditional compilation if the previous specified symbol isn't defined.
- `#endif`: Closes the preceding conditional compilation.

The build system is also aware of predefined preprocessor symbols representing different target frameworks in SDK-style projects. They're useful when creating applications that can target more than one .NET version.

| Target Frameworks | Symbols | Additional symbols(available in .NET 5+ SDKs) | Platform symbols (available onlywhen you specify an OS-specific TFM) |
| ------------------| ------- | ------------------------------------------------ | -------------------------------------------------------------------- |
| .NET Framework    | `NETFRAMEWORK`, `NET481`, `NET48`, `NET472`, `NET471`, `NET47`, `NET462`, `NET461`, `NET46`, `NET452`, `NET451`, `NET45`, `NET40`, `NET35`, `NET20` | `NET48_OR_GREATER`, `NET472_OR_GREATER`, `NET471_OR_GREATER`, `NET47_OR_GREATER`, `NET462_OR_GREATER`, `NET461_OR_GREATER`, `NET46_OR_GREATER`, `NET452_OR_GREATER`, `NET451_OR_GREATER`, `NET45_OR_GREATER`, `NET40_OR_GREATER`, `NET35_OR_GREATER`, `NET20_OR_GREATER` | |
| .NET Standard     | `NETSTANDARD`, `NETSTANDARD2_1`, `NETSTANDARD2_0`, `NETSTANDARD1_6`, `NETSTANDARD1_5`, `NETSTANDARD1_4`, `NETSTANDARD1_3`, `NETSTANDARD1_2`, `NETSTANDARD1_1`, `NETSTANDARD1_0` | `NETSTANDARD2_1_OR_GREATER`, `NETSTANDARD2_0_OR_GREATER`, `NETSTANDARD1_6_OR_GREATER`, `NETSTANDARD1_5_OR_GREATER`, `NETSTANDARD1_4_OR_GREATER`, `NETSTANDARD1_3_OR_GREATER`, `NETSTANDARD1_2_OR_GREATER`, `NETSTANDARD1_1_OR_GREATER`, `NETSTANDARD1_0_OR_GREATER` | |
| .NET 5+ (and .NET Core) | `NET`, `NET11_0`, `NET10_0`, `NET9_0`, `NET8_0`, `NET7_0`, `NET6_0`, `NET5_0`, `NETCOREAPP`, `NETCOREAPP3_1`, `NETCOREAPP3_0`, `NETCOREAPP2_2`, `NETCOREAPP2_1`, `NETCOREAPP2_0`, `NETCOREAPP1_1`, `NETCOREAPP1_0` | `NET11_0_OR_GREATER`, `NET10_0_OR_GREATER`, `NET9_0_OR_GREATER`, `NET8_0_OR_GREATER`, `NET7_0_OR_GREATER`, `NET6_0_OR_GREATER`, `NET5_0_OR_GREATER`, `NETCOREAPP3_1_OR_GREATER`, `NETCOREAPP3_0_OR_GREATER`, `NETCOREAPP2_2_OR_GREATER`, `NETCOREAPP2_1_OR_GREATER`, `NETCOREAPP2_0_OR_GREATER`, `NETCOREAPP1_1_OR_GREATER`, `NETCOREAPP1_0_OR_GREATER` | `ANDROID`, `BROWSER`, `IOS`, `MACCATALYST`, `MACOS`, `TVOS`, `WINDOWS`,`OS` (for example `IOS15_1`),`OS_OR_GREATER` (for example `IOS15_1_OR_GREATER`) |

> **Note:**
>
> * Versionless symbols are defined regardless of the version you're targeting.
> * Version-specific symbols are only defined for the version you're targeting.
> * The `<framework>_OR_GREATER` symbols are defined for the version you're targeting and all earlier versions. For example, if you're targeting .NET Framework 2.0, the following symbols are defined: `NET20`, `NET20_OR_GREATER`, `NET11_OR_GREATER`, and `NET10_OR_GREATER`.
> * The `NETSTANDARD<x>_<y>_OR_GREATER` symbols are only defined for .NET Standard targets, and not for targets that implement .NET Standard, such as .NET Core and .NET Framework.
> * These are different from the target framework monikers (TFMs) used by the MSBuild `TargetFramework` property and NuGet.

> **Note:**
> For traditional, non-SDK-style projects, you have to manually configure the conditional compilation symbols for the different target frameworks in Visual Studio via the project's properties pages.

Other predefined symbols include the `DEBUG` and `TRACE` constants. Use `#define` to override the values set for the project. The `DEBUG` symbol, for example, is automatically set depending on your build configuration properties ("Debug" or "Release" mode).

The C# compiler compiles the code between the `#if` directive and  `#endif` directive only if the specified symbol is defined, or not defined when the `!` not operator is used. Unlike C and C++, you can't assign a numeric value to a symbol. The `#if` statement in C# is Boolean and only tests whether the symbol is defined or not. For example, the following code is compiled when `DEBUG` is defined:

```csharp
#if DEBUG
    Console.WriteLine("Debug version");
#endif
```

The following code is compiled when `MYTEST` is **not** defined:

```csharp
#if !MYTEST
    Console.WriteLine("MYTEST is not defined");
#endif
```

Use the operators `==` (equality) and `!=` (inequality) to test for the `bool` values `true` or `false`. `true` means the symbol is defined. The statement `#if DEBUG` has the same meaning as `#if (DEBUG == true)`. Use the `&&` (and), `||` (or), and `!` (not) operators to evaluate whether multiple symbols are defined. You can also group symbols and operators with parentheses.

The following example shows a complex directive that allows your code to take advantage of newer .NET features while remaining backward compatible. For example, imagine that you're using a NuGet package in your code, but the package only supports .NET 6 and up, as well as .NET Standard 2.0 and up:

```csharp
#if (NET6_0_OR_GREATER || NETSTANDARD2_0_OR_GREATER)
    Console.WriteLine("Using .NET 6+ or .NET Standard 2+ code.");
#else
    Console.WriteLine("Using older code that doesn't support the above .NET versions.");
#endif
```

`#if`, along with the `#else`, `#elif`, `#endif`, `#define`, and `#undef` directives, lets you include or exclude code based on the existence of one or more symbols. Conditional compilation can be useful when compiling code for a debug build or when compiling for a specific configuration.

`#elif` lets you create a compound conditional directive. The compiler evaluates the `#elif` expression if neither the preceding `#if` nor any preceding, optional, `#elif` directive expressions evaluate to `true`. If an `#elif` expression evaluates to `true`, the compiler evaluates all the code between the `#elif` and the next conditional directive. For example:

```csharp
#define VC7
//...
#if DEBUG
    Console.WriteLine("Debug build");
#elif VC7
    Console.WriteLine("Visual Studio 7");
#endif
```

`#else` lets you create a compound conditional directive. If none of the expressions in the preceding `#if` or (optional) `#elif` directives evaluate to `true`, the compiler evaluates all code between `#else` and the next `#endif`. `#endif` must be the next preprocessor directive after `#else`.

`#endif` specifies the end of a conditional directive, which began with the `#if` directive.

The following example shows how to define a `MYTEST` symbol in a file and then test the values of the `MYTEST` and `DEBUG` symbols. The output of this example depends on whether you built the project in **Debug** or **Release** configuration mode.

```csharp
#define MYTEST
using System;
public class MyClass
{
    static void Main()
    {
#if (DEBUG && !MYTEST)
        Console.WriteLine("DEBUG is defined");
#elif (!DEBUG && MYTEST)
        Console.WriteLine("MYTEST is defined");
#elif (DEBUG && MYTEST)
        Console.WriteLine("DEBUG and MYTEST are defined");
#else
        Console.WriteLine("DEBUG and MYTEST are not defined");
#endif
    }
}
```

The following example shows how to test for different target frameworks so you can use newer APIs when possible:

```csharp
public class MyClass
{
    static void Main()
    {
#if NET40
        WebClient _client = new WebClient();
#else
        HttpClient _client = new HttpClient();
#endif
    }
    //...
}
```

## Defining symbols

Use the following two preprocessor directives to define or undefine symbols for conditional compilation:

- `#define`: Define a symbol.
- `#undef`: Undefine a symbol.

Use `#define` to define a symbol. When you use the symbol as the expression passed to the `#if` directive, the expression evaluates to `true`, as the following example shows:

 ```csharp
 #define VERBOSE

#if VERBOSE
    Console.WriteLine("Verbose output version");
#endif
 ```

> **Note:**
> In C#, primitive constants should be defined by using the `const` keyword. A `const` declaration creates a `static` member that can't be modified at runtime. The `#define` directive can't be used to declare constant values as is typically done in C and C++. If you have several such constants, consider creating a separate "Constants" class to hold them.

Use symbols to specify conditions for compilation. Test for the symbol by using either `#if` or `#elif`. You can also use the `System.Diagnostics.ConditionalAttribute` to perform conditional compilation. You can define a symbol, but you can't assign a value to a symbol. The `#define` directive must appear in the file before you use any instructions that aren't also preprocessor directives. You can also define a symbol by using the **DefineConstants** compiler option. Undefine a symbol by using `#undef`.

## Defining regions

Define regions of code that you can collapse in an outline by using the following two preprocessor directives:

- `#region`: Start a region.
- `#endregion`: End a region.

`#region` lets you specify a block of code that you can expand or collapse when using the outlining feature of the code editor. In longer code files, it's convenient to collapse or hide one or more regions so that you can focus on the part of the file that you're currently working on. The following example shows how to define a region:

```csharp
#region MyClass definition
public class MyClass
{
    static void Main()
    {
    }
}
#endregion
```

A `#region` block must be terminated with an `#endregion` directive. A `#region` block can't overlap with an `#if` block. However, a `#region` block can be nested in an `#if` block, and an `#if` block can be nested in a `#region` block.
