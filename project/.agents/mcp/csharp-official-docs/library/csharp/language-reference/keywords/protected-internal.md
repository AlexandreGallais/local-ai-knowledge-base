---
title: "protected internal keyword"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/keywords/protected-internal.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# protected internal (C# reference)

The `protected internal` keyword combination is a member access modifier. You can access a protected internal member from the current assembly or from types that are derived from the containing class. For a comparison of `protected internal` with the other access modifiers, see Accessibility Levels.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

Any type within the containing assembly can access a protected internal member of a base class. A derived class located in another assembly can access the member only if the access occurs through a variable of the derived class type. For example, consider the following code segment:

```csharp
// Assembly1.cs
// Compile with: /target:library
public class BaseClass
{
   protected internal int myValue = 0;
}

class TestAccess
{
    void Access()
    {
        var baseObject = new BaseClass();
        baseObject.myValue = 5;
    }
}
```

```csharp
// Assembly2.cs
// Compile with: /reference:Assembly1.dll
class DerivedClass : BaseClass
{
    static void Main()
    {
        var baseObject = new BaseClass();
        var derivedObject = new DerivedClass();

        // Error CS1540, because myValue can only be accessed by
        // classes derived from BaseClass.
        // baseObject.myValue = 10;

        // OK, because this class derives from BaseClass.
        derivedObject.myValue = 10;
    }
}
```

This example contains two files, `Assembly1.cs` and `Assembly2.cs`.
The first file contains a public base class, `BaseClass`, and another class, `TestAccess`. `BaseClass` owns a protected internal member, `myValue`, which the `TestAccess` type accesses because they're in the same assembly.
In the second file, an attempt to access `myValue` through an instance of `BaseClass` produces an error, while an access to this member through an instance of a derived class, `DerivedClass` succeeds. This access rule shows that `protected internal` allows access from **any class within the same assembly** or **derived classes in any assembly**, making it the most permissive of the protected access modifiers.

Struct members can't be `protected internal` because the struct can't be inherited.

## Overriding protected internal members

When you override a virtual member, the accessibility modifier of the overridden method depends on the assembly where you define the derived class.

When you define the derived class in the same assembly as the base class, all overridden members have `protected internal` access. If you define the derived class in a different assembly from the base class, overridden members have `protected` access.

```csharp
// Assembly1.cs
// Compile with: /target:library
public class BaseClass
{
    protected internal virtual int GetExampleValue()
    {
        return 5;
    }
}

public class DerivedClassSameAssembly : BaseClass
{
    // Override to return a different example value, accessibility modifiers remain the same.
    protected internal override int GetExampleValue()
    {
        return 9;
    }
}
```

```csharp
// Assembly2.cs
// Compile with: /reference:Assembly1.dll
class DerivedClassDifferentAssembly : BaseClass
{
    // Override to return a different example value, since this override
    // method is defined in another assembly, the accessibility modifiers
    // are only protected, instead of protected internal.
    protected override int GetExampleValue()
    {
        return 2;
    }
}
```

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
