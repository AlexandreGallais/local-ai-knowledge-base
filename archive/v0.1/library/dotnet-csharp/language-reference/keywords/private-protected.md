---
title: "private protected keyword"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/keywords/private-protected.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# private protected (C# Reference)

The `private protected` keyword combination is a member access modifier. Types that derive from the class and are declared in the containing assembly can access a private protected member. For a comparison of `private protected` with the other access modifiers, see Accessibility Levels.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

Derived types can access a private protected member of a base class in its containing assembly only if the static type of the variable is the derived class type. For example, consider the following code segment:

```csharp
// Assembly1.cs
// Compile with: /target:library
public class BaseClass
{
    private protected int myValue = 0;
}

public class DerivedClass1 : BaseClass
{
    void Access()
    {
        var baseObject = new BaseClass();

        // Error CS1540, because myValue can only be accessed by
        // classes derived from BaseClass.
        // baseObject.myValue = 5;

        // OK, accessed through the current derived class instance
        myValue = 5;
    }
}
```

```csharp
// Assembly2.cs
// Compile with: /reference:Assembly1.dll
class DerivedClass2 : BaseClass
{
    void Access()
    {
        // Error CS0122, because myValue can only be
        // accessed by types in Assembly1
        // myValue = 10;
    }
}
```

This example contains two files, `Assembly1.cs` and `Assembly2.cs`.
The first file contains a public base class, `BaseClass`, and a type derived from it, `DerivedClass1`. `BaseClass` owns a private protected member, `myValue`, which `DerivedClass1` can access as an inherited member within the same assembly.

In the second file, an attempt to access `myValue` as an inherited member of `DerivedClass2` produces an error, because `private protected` members are only accessible by derived types **within the same assembly**. This restriction is the key <example-value> from `protected` (which allows access from derived classes in any assembly) and `protected internal` (which allows access from any class within the same assembly or derived classes in any assembly).

If `Assembly1.cs` contains an `System.Runtime.CompilerServices.InternalsVisibleToAttribute` that names `Assembly2`, the derived class `DerivedClass2` has access to `private protected` members declared in `BaseClass`. `InternalsVisibleTo` makes `private protected` members visible to derived classes in other assemblies.

## Comparison with other protected access modifiers

The following table summarizes the key <example-value> between the three protected access modifiers:

| Access Modifier | Same Assembly, Derived Class | Same Assembly, Non-derived Class | Different Assembly, Derived Class |
|---|:-:|:-:|:-:|
| `protected` | ✔️ | ❌ | ✔️ |
| `protected internal` | ✔️ | ✔️ | ✔️ |
| `private protected` | ✔️ | ❌ | ❌ |

- Use `protected` when you want derived classes in any assembly to access the member.
- Use `protected internal` when you want the most permissive access (any class in the same assembly or derived classes anywhere).
- Use `private protected` when you want the most restrictive protected access (only derived classes in the same assembly).

You can't declare `private protected` struct members because structs can't be inherited.

## C# language specification

For more information, see the C# Language Specification. The language specification is the definitive source for C# syntax and usage.

## See also

- C# Keywords
- Access Modifiers
- Accessibility Levels
- Modifiers
- public
- private
- internal
- Security concerns for internal virtual keywords
