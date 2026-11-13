---
title: "protected keyword"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/keywords/protected.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# protected (C# Reference)

The `protected` keyword is a member access modifier.

> **Note:**
> This article covers `protected` access. The `protected` keyword is also part of the `protected internal` and `private protected` access modifiers.

You can access a protected member within its class and by derived class instances.

For a comparison of `protected` with the other access modifiers, see Accessibility Levels.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

You can access a protected member of a base class in a derived class only if the access occurs through the derived class type. For example, consider the following code segment:

```csharp
namespace Example1
{
    class BaseClass
    {
        protected int myValue = 123;
    }

    class DerivedClass : BaseClass
    {
        static void Main()
        {
            var baseObject = new BaseClass();
            var derivedObject = new DerivedClass();

            // Error CS1540, because myValue can only be accessed through
            // the derived class type, not through the base class type.
            // baseObject.myValue = 10;

            // OK, because this class derives from BaseClass.
            derivedObject.myValue = 10;
        }
    }
}
```
The statement `baseObject.myValue = 10` generates an error because it accesses the protected member through a base class reference (`baseObject` is of type `BaseClass`). You can only access protected members through the derived class type or types derived from it.

Unlike `private protected`, the `protected` access modifier allows access from derived classes **in any assembly**. Unlike `protected internal`, it doesn't allow access from non-derived classes within the same assembly.

You can't declare struct members as protected because structs can't be inherited.

In this example, the class `DerivedPoint` is derived from `Point`. Therefore, you can access the protected members of the base class directly from the derived class.

```csharp
namespace Example2
{
    class Point
    {
        protected int x;
        protected int y;
    }

    class DerivedPoint: Point
    {
        static void Main()
        {
            var dpoint = new DerivedPoint();

            // Direct access to protected members.
            dpoint.x = 10;
            dpoint.y = 15;
            Console.WriteLine($"x = {dpoint.x}, y = {dpoint.y}");
        }
    }
    // Output: x = 10, y = 15
}
```
If you change the access levels of `x` and `y` to private, the compiler returns the error messages:

`'Point.y' is inaccessible due to its protection level.`

`'Point.x' is inaccessible due to its protection level.`

The following example demonstrates that `protected` members are accessible from derived classes even when they're in different assemblies:

```csharp
// Assembly1.cs
// Compile with: /target:library
namespace Assembly1
{
    public class BaseClass
    {
        protected int myValue = 0;
    }
}
```
```csharp
// Assembly2.cs
// Compile with: /reference:Assembly1.dll
namespace Assembly2
{
    using Assembly1;
    
    class DerivedClass : BaseClass
    {
        void Access()
        {
            // OK, because protected members are accessible from
            // derived classes in any assembly
            myValue = 10;
        }
    }
}
```
This cross-assembly accessibility is what distinguishes `protected` from `private protected` (which restricts access to the same assembly) but is similar to `protected internal` (though `protected internal` also allows same-assembly access from non-derived classes).

## C# language specification

For more information, see Declared accessibility in the C# Language Specification. The language specification is the definitive source for C# syntax and usage.

## See also

- C# Keywords
- Access Modifiers
- Accessibility Levels
- Modifiers
- public
- private
- internal
- Security concerns for internal virtual keywords
