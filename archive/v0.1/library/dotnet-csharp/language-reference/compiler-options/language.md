---
title: "Compiler Options - language feature rules (part 1 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/compiler-options/language.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# C# compiler options for language feature rules

The following options control how the compiler interprets language features. The new MSBuild syntax is shown in **Bold**. The older *csc.exe* syntax is shown in `code style`.

- **CheckForOverflowUnderflow** / `-checked`: Generate overflow checks.
- **AllowUnsafeBlocks** / `-unsafe`: Allow `unsafe` code.
- **DefineConstants** / `-define`: Define conditional compilation symbols.
- **LangVersion** / `-langversion`: Specify language version such as `default` (latest major version), or `latest` (latest version, including minor versions).
- **Nullable** / `-nullable`: Enable nullable context, or nullable warnings.

> **Note:**
> For more information about configuring these options for your project, see Compiler options.

## CheckForOverflowUnderflow

The **CheckForOverflowUnderflow** option controls the default overflow-checking context that defines the program behavior if integer arithmetic overflows.

```xml
<CheckForOverflowUnderflow>true</CheckForOverflowUnderflow>
```

When **CheckForOverflowUnderflow** is `true`, the default context is a checked context and overflow checking is enabled. When **CheckForOverflowUnderflow** is `false`, the default context is an unchecked context. The default value for this option is `false`, which means overflow checking is disabled.

You can also explicitly control the overflow-checking context for parts of your code by using the `checked` and `unchecked` statements.

For information about how the overflow-checking context affects operations and what operations it affects, see the article about `checked` and `unchecked` statements.

## AllowUnsafeBlocks

The **AllowUnsafeBlocks** compiler option allows code that uses the unsafe keyword to compile. The default value for this option is `false`, meaning unsafe code isn't allowed.

```xml
<AllowUnsafeBlocks>true</AllowUnsafeBlocks>
```

For more information about unsafe code, see Unsafe Code and Pointers.

### Enable the updated memory safety rules

The updated memory safety rules are a preview feature in C# 15 and .NET 11. They use two independent compiler settings:

- The `preview` language version enables the new syntax and pointer relaxations.
- The `updated-memory-safety-rules` compiler feature enables the updated rules, including *requires-unsafe* caller obligations, and causes the compiler to record the choice in the assembly with the `System.Runtime.CompilerServices.MemorySafetyRulesAttribute` attribute.

A future stable SDK property, `MemorySafetyRules`, is planned as a third activation tier for when the feature exits preview (for example, `<MemorySafetyRules>2</MemorySafetyRules>`), but that property isn't implemented yet.

For a project, use both settings:

```xml
<PropertyGroup>
  <LangVersion>preview</LangVersion>
  <Features>$(Features);updated-memory-safety-rules</Features>
</PropertyGroup>
```

For a file-based program, add the equivalent directives:

```csharp
#:property Features=$(Features);updated-memory-safety-rules
#:property LangVersion=preview
```

The **AllowUnsafeBlocks** property is independent. It controls whether the source can use the `unsafe` keyword. A project can enable the updated rules without allowing unsafe code, in which case it receives errors when it calls requires-unsafe APIs.

Whether one assembly enforces the updated rules against another depends on which side opts in:

- **Updated-model caller, updated-model callee**: The callee's `unsafe` markers travel through metadata. The caller wraps each call to a requires-unsafe member in an `unsafe` block.
- **Updated-model caller, original-model callee**: A compatibility mode treats any callee member with a pointer type in its signature as requires-unsafe, so the call site needs an enclosing `unsafe` block. This mode keeps a pointer-based API from silently losing its `unsafe` requirement.
- **Original-model caller, updated-model callee**: The original pointer rules still apply. A requires-unsafe member that has no pointer type in its signature becomes callable from safe code, because the original-model caller can't read the new markers.

## DefineConstants

The **DefineConstants** option defines symbols in all source code files of your program.

```xml
<DefineConstants>name;name2</DefineConstants>
```

This option specifies the names of one or more symbols that you want to define. The **DefineConstants** option has the same effect as the #define preprocessor directive except that the compiler option is in effect for all files in the project. A symbol remains defined in a source file until an #undef directive in the source file removes the definition. When you use the `-define` option, an `#undef` directive in one file has no effect on other source code files in the project. You can use symbols created by this option with #if, #else, #elif, and #endif to compile source files conditionally. The C# compiler itself defines no symbols or macros that you can use in your source code; all symbol definitions must be user-defined.

> **Note:**
> The C# `#define` directive doesn't allow a symbol to have a value, as in languages such as C++. For example, `#define` can't create a macro or define a constant. If you need to define a constant, use an `enum` variable. If you want to create a C++-style macro, consider alternatives such as generics. Since macros are notoriously error-prone, C# disallows their use but provides safer alternatives.

## LangVersion

The default language version for the C# compiler depends on the target framework for your application and the version of the SDK or Visual Studio installed. Those rules are defined in C# language versioning.

> **Warning:**
>
> Don't set the `LangVersion` element to `latest`. The `latest` setting means the installed compiler uses its latest version. That version can change from machine to machine, making builds unreliable. In addition, it enables language features that might require runtime or library features that aren't included in the current SDK.

The **LangVersion** option causes the compiler to accept only syntax that's included in the specified C# language specification, for example:

```xml
<LangVersion>9.0</LangVersion>
```

Some preview features require a separate opt-in in addition to `<LangVersion>preview</LangVersion>`. For example, the C# 15 updated memory safety rules use the `updated-memory-safety-rules` compiler feature. For more information, see Enable the updated memory safety rules.

The following values are valid:

| Value                         | Meaning                                                                                                 |
|-------------------------------|---------------------------------------------------------------------------------------------------------|
| `preview`                     | The compiler accepts all valid language syntax from the latest preview version.                         |
| `latest`                      | The compiler accepts syntax from the latest released version of the compiler (including minor version). |
| `latestMajor`or `default` | The compiler accepts syntax from the latest released major version of the compiler.                     |
| `15.0`                        | The compiler accepts only syntax that is included in C# 15 or lower.                                    |
| `14.0`                        | The compiler accepts only syntax that is included in C# 14 or lower.                                    |
| `13.0`                        | The compiler accepts only syntax that is included in C# 13 or lower.                                    |
| `12.0`                        | The compiler accepts only syntax that is included in C# 12 or lower.                                    |
| `11.0`                        | The compiler accepts only syntax that is included in C# 11 or lower.                                    |
| `10.0`                        | The compiler accepts only syntax that is included in C# 10 or lower.                                    |
| `9.0`                         | The compiler accepts only syntax that is included in C# 9 or lower.                                     |
| `8.0`                         | The compiler accepts only syntax that is included in C# 8.0 or lower.                                   |
| `7.3`                         | The compiler accepts only syntax that is included in C# 7.3 or lower.                                   |
| `7.2`                         | The compiler accepts only syntax that is included in C# 7.2 or lower.                                   |
| `7.1`                         | The compiler accepts only syntax that is included in C# 7.1 or lower.                                   |
| `7`                           | The compiler accepts only syntax that is included in C# 7.0 or lower.                                   |
| `6`                           | The compiler accepts only syntax that is included in C# 6.0 or lower.                                   |
| `5`                           | The compiler accepts only syntax that is included in C# 5.0 or lower.                                   |
| `4`                           | The compiler accepts only syntax that is included in C# 4.0 or lower.                                   |
| `3`                           | The compiler accepts only syntax that is included in C# 3.0 or lower.                                   |
| `ISO-2`or `2`             | The compiler accepts only syntax that is included in ISO/IEC 23270:2006 C# (2.0).                       |
| `ISO-1`or `1`             | The compiler accepts only syntax that is included in ISO/IEC 23270:2003 C# (1.0/1.2).                   |

### Considerations

- To ensure that your project uses the default compiler version recommended for your target framework, don't use the **LangVersion** option. Update the target framework to access newer language features.

- Specifying **LangVersion** with the `default` value is different from omitting the **LangVersion** option. Specifying `default` uses the latest version of the language that the compiler supports, without taking into account the target framework. For example, building a project that targets .NET 6 from Visual Studio version 17.6 uses C# 10 if **LangVersion** isn't specified, but uses C# 11 if **LangVersion** is set to `default`.

- The **LangVersion** compiler option doesn't affect metadata referenced by your C# application.

- Because each version of the C# compiler contains extensions to the language specification, **LangVersion** doesn't give you the equivalent functionality of an earlier version of the compiler.

- While C# version updates generally coincide with major .NET releases, the new syntax and features aren't necessarily tied to that specific framework version. Each specific feature has its own minimum .NET API or common language runtime requirements that might allow it to run on down-level frameworks by including NuGet packages or other libraries.

- Regardless of which **LangVersion** setting you use, use the current version of the common language runtime to create your *.exe* or *.dll*. One exception is friend assemblies and ModuleAssemblyName, which work under **-langversion:ISO-1**.

For other ways to specify the C# language version, see C# language versioning.

For information about how to set this compiler option programmatically, see `VSLangProj80.CSharpProjectConfigurationProperties3.LanguageVersion*`.

### C# language specification

| Version          | Link                       | Description                                                  |
|------------------|----------------------------|--------------------------------------------------------------|
| C# 8.0 and later | download PDF   | C# Language Specification Version 7: .NET Foundation         |
| C# 7.3           | download PDF   | Standard ECMA-334 7th Edition                                |
| C# 6.0           | download PDF   | Standard ECMA-334 6th Edition                                |
| C# 5.0           | Download PDF   | Standard ECMA-334 5th Edition                                |
| C# 3.0           | Download DOC   | C# Language Specification Version 3.0: Microsoft Corporation |
| C# 2.0           | Download PDF   | Standard ECMA-334 4th Edition                                |
| C# 1.2           | Download DOC | Standard ECMA-334 2nd Edition                                |
| C# 1.0           | Download DOC   | Standard ECMA-334 1st Edition                                |

### Minimum SDK version needed to support all language features

The following table lists the minimum versions of the SDK with the C# compiler that supports the corresponding language version:

| C# version | Minimum SDK version                                                                  |
|------------|--------------------------------------------------------------------------------------|
| C# 12      | Microsoft Visual Studio/Build Tools 2022 version 17.8, or .NET 8 SDK                 |
| C# 11      | Microsoft Visual Studio/Build Tools 2022 version 17.4, or .NET 7 SDK                 |
| C# 10      | Microsoft Visual Studio/Build Tools 2022, or .NET 6 SDK                              |
| C# 9.0     | Microsoft Visual Studio/Build Tools 2019 version 16.8, or .NET 5 SDK                 |
| C# 8.0     | Microsoft Visual Studio/Build Tools 2019, version 16.3, or .NET Core 3.0 SDK         |
| C# 7.3     | Microsoft Visual Studio/Build Tools 2017, version 15.7                               |
| C# 7.2     | Microsoft Visual Studio/Build Tools 2017, version 15.5                               |
| C# 7.1     | Microsoft Visual Studio/Build Tools 2017, version 15.3                               |
| C# 7.0     | Microsoft Visual Studio/Build Tools 2017                                             |
| C# 6       | Microsoft Visual Studio/Build Tools 2015                                             |
| C# 5       | Microsoft Visual Studio/Build Tools 2012 or bundled .NET Framework 4.5 compiler      |
| C# 4       | Microsoft Visual Studio/Build Tools 2010 or bundled .NET Framework 4.0 compiler      |
| C# 3       | Microsoft Visual Studio/Build Tools 2008 or bundled .NET Framework 3.5 compiler      |
| C# 2       | Microsoft Visual Studio/Build Tools 2005 or bundled .NET Framework 2.0 compiler      |
| C# 1.0/1.2 | Microsoft Visual Studio/Build Tools .NET 2002 or bundled .NET Framework 1.0 compiler |
