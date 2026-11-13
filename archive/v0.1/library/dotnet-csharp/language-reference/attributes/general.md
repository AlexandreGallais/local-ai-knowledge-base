---
title: "Attributes interpreted by the compiler: Miscellaneous (part 1 of 3)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/attributes/general.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Miscellaneous attributes interpreted by the C# compiler

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

You can apply several attributes to elements in your code to add semantic meaning to those elements:

- `Conditional`: Make execution of a method dependent on a preprocessor identifier.
- `Obsolete`: Mark a type or member for (potential) future removal.
- `Deprecated`: (Windows Foundation) Mark a type or member for (potential) future removal.
- `Experimental`: Mark a type or member as experimental.
- `SetsRequiredMembers`: Indicate that a constructor sets all required properties.
- `AttributeUsage`: Declare the language elements where an attribute can be applied.
- `AsyncMethodBuilder`: Declare an async method builder type.
- `InterpolatedStringHandler`: Define an interpolated string builder for a known scenario.
- `ModuleInitializer`: Declare a method that initializes a module.
- `SkipLocalsInit`: Elide the code that initializes local variable storage to 0.
- `UnscopedRef`: Declare that a `ref` variable normally interpreted as `scoped` should be treated as unscoped.
- `OverloadResolutionPriority`: Add a tiebreaker attribute to influence overload resolution for possibly ambiguous overloads.
- `EnumeratorCancellation`: Specify the parameter for a cancellation token in an async enumerator.
- `CollectionBuilder`: Specify the builder method for a collection type when a collection expression is converted to that collection type.
- `InlineArray`: Specify that a `struct` type is an *inline array*.
- `IUnknownConstant`: Specifies how a missing argument should be supplied for a default parameter.
- `IDispatchConstant`: Specifies how a missing argument should be supplied for a default parameter.
- `ExtendedLayoutAttribute`: Instructs the compiler to set the `ExtendedLayout` flag in the type's metadata.

The compiler uses those semantic meanings to alter its output and report possible mistakes by developers using your code.

## `Conditional` attribute

The `Conditional` attribute makes the execution of a method dependent on a preprocessing identifier. The `Conditional` attribute is an alias for `System.Diagnostics.ConditionalAttribute`, and can be applied to a method or an attribute class.

In the following example, `Conditional` is applied to a method to enable or disable the display of program-specific diagnostic information:

```csharp
﻿#define TRACE_ON
using System.Diagnostics;

namespace AttributeExamples;

public class Trace
{
    [Conditional("TRACE_ON")]
    public static void Msg(string msg)
    {
        Console.WriteLine(msg);
    }
}

public class TraceExample
{
    public static void Main()
    {
        Trace.Msg("Now in Main...");
        Console.WriteLine("Done.");
    }
}
```
If the `TRACE_ON` identifier isn't defined, the trace output isn't displayed.

The `Conditional` attribute is often used with the `DEBUG` identifier to enable trace and logging features for debug builds but not in release builds, as shown in the following example:

```csharp
﻿using System.Diagnostics;

namespace AttributeExamples;

public class Conditionals
{
    [Conditional("DEBUG")]
    static void DebugMethod()
    {
    }

    [Conditional("A"), Conditional("B")]
    static void DoIfAorB()
    {
        // ...
    }
}

[Conditional("DEBUG")]
public class DocumentationAttribute : System.Attribute
{
    string text;

    public DocumentationAttribute(string text)
    {
        this.text = text;
    }
}

class SampleClass
{
    // This attribute will only be included if DEBUG is defined.
    [Documentation("This method displays an integer.")]
    static void DoWork(int i)
    {
        System.Console.WriteLine(i.ToString());
    }
}
```
When a method marked conditional is called, the presence or absence of the specified preprocessing symbol determines whether the compiler includes or omits calls to the method. If the symbol is defined, the call is included; otherwise, the call is omitted. A conditional method must be a method in a class or struct declaration and must have a `void` return type. Using `Conditional` is cleaner, more elegant, and less error-prone than enclosing methods inside `#if…#endif` blocks.

If a method has multiple `Conditional` attributes, compiler includes calls to the method if one or more conditional symbols are defined (the symbols are logically linked together by using the OR operator). In the following example, the presence of either `A` or `B` results in a method call:

```csharp
﻿using System.Diagnostics;

namespace AttributeExamples;

public class Conditionals
{
    [Conditional("DEBUG")]
    static void DebugMethod()
    {
    }

    [Conditional("A"), Conditional("B")]
    static void DoIfAorB()
    {
        // ...
    }
}

[Conditional("DEBUG")]
public class DocumentationAttribute : System.Attribute
{
    string text;

    public DocumentationAttribute(string text)
    {
        this.text = text;
    }
}

class SampleClass
{
    // This attribute will only be included if DEBUG is defined.
    [Documentation("This method displays an integer.")]
    static void DoWork(int i)
    {
        System.Console.WriteLine(i.ToString());
    }
}
```
### Using `Conditional` with attribute classes

The `Conditional` attribute can also be applied to an attribute class definition. In the following example, the custom attribute `Documentation` adds information to the metadata if `DEBUG` is defined.

```csharp
﻿using System.Diagnostics;

namespace AttributeExamples;

public class Conditionals
{
    [Conditional("DEBUG")]
    static void DebugMethod()
    {
    }

    [Conditional("A"), Conditional("B")]
    static void DoIfAorB()
    {
        // ...
    }
}

[Conditional("DEBUG")]
public class DocumentationAttribute : System.Attribute
{
    string text;

    public DocumentationAttribute(string text)
    {
        this.text = text;
    }
}

class SampleClass
{
    // This attribute will only be included if DEBUG is defined.
    [Documentation("This method displays an integer.")]
    static void DoWork(int i)
    {
        System.Console.WriteLine(i.ToString());
    }
}
```
## `Obsolete` and `Deprecated` attribute

The `Obsolete` attribute marks a code element as no longer recommended for use. Use of an entity marked obsolete generates a warning or an error. The `Obsolete` attribute is a single-use attribute and can be applied to any entity that allows attributes. `Obsolete` is an alias for `System.ObsoleteAttribute`.

In the following example, the `Obsolete` attribute is applied to class `A` and to method `B.OldMethod`. Because the second argument of the attribute constructor applied to `B.OldMethod` is set to `true`, this method causes a compiler error, whereas using class `A` produces a warning. Calling `B.NewMethod`, however, produces no warning or error. For example, when you use it with the previous definitions, the following code generates two warnings and one error:

```csharp

namespace AttributeExamples
{
    [Obsolete("use class B")]
    public class A
    {
        public void Method() { }
    }

    public class B
    {
        [Obsolete("use NewMethod", true)]
        public void OldMethod() { }

        public void NewMethod() { }
    }

    public static class ObsoleteProgram
    {
        public static void Main()
        {
            // Generates 2 warnings:
            A a = new A();

            // Generate no errors or warnings:
            B b = new B();
            b.NewMethod();

            // Generates an error, compilation fails.
            // b.OldMethod();
        }
    }
}

namespace ExampleConstantInterpolation
{
    public class B
    {
        [Obsolete($"use {nameof(NewMethod)} instead", true)]
        public void OldMethod() { }

        public void NewMethod() { }
    }

}
```
The string provided as the first argument to the attribute constructor is displayed as part of the warning or error. Two warnings for class `A` are generated: one for the declaration of the class reference, and one for the class constructor. The `Obsolete` attribute can be used without arguments, but including an explanation what to use instead is recommended. You can use constant string interpolation and the `nameof` operator to ensure the names match:

```csharp
public class B
{
    [Obsolete($"use {nameof(NewMethod)} instead", true)]
    public void OldMethod() { }

    public void NewMethod() { }
}
```
The Windows Foundation Metadata libraries use the `Windows.Foundation.Metadata.DeprecatedAttribute` instead of the `ObsoleteAttribute`.

## `Experimental` attributes

Types, methods, and assemblies can be marked with the `System.Diagnostics.CodeAnalysis.ExperimentalAttribute` to indicate an experimental feature. The compiler issues a warning if you access a method or type annotated with the `System.Diagnostics.CodeAnalysis.ExperimentalAttribute`. All types declared in an assembly or module marked with the `Experimental` attribute are experimental. The compiler issues a warning if you access any of them. You can disable these warnings to pilot an experimental feature.

> **Warning:**
> Experimental features are subject to changes. The APIs can change, or they can be removed in future updates. Including experimental features is a way for library authors to get feedback on ideas and concepts for future development. Use extreme caution when using any feature marked as experimental. You can learn more about how APIs are marked as experimental in our article on preview APIs.

You can read more details about the `Experimental` attribute in the feature specification.

The Windows Foundation Metadata libraries use the `Windows.Foundation.Metadata.ExperimentalAttribute` instead.

## `SetsRequiredMembers` attribute

The `SetsRequiredMembers` attribute informs the compiler that a constructor sets all `required` members in that class or struct. The compiler assumes any constructor with the `System.Diagnostics.CodeAnalysis.SetsRequiredMembersAttribute` attribute initializes all `required` members. Any code that invokes such a constructor doesn't need object initializers to set required members. Adding the `SetsRequiredMembers` attribute is primarily useful for positional records and primary constructors.
