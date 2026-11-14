---
title: "interface keyword"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/keywords/interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# :::no-loc text="interface"::: (C# Reference)

An interface defines a contract. Any `class`, `record`, or `struct` that implements that contract must provide an implementation of the members defined in the interface.

An interface can define a default implementation for a member. It can also define `static` members to provide a single implementation for common functionality.

An interface can define `static abstract` or `static virtual` members to declare that an implementing type must provide the declared members. Typically, `static virtual` methods declare that an implementation must define a set of overloaded operators.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

In the following example, class `ImplementationClass` must implement a method named `SampleMethod` that has no parameters and returns `void`.

```csharp
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace csrefKeywordsMethodParams
{
    class Child
    {
        private int age;
        private string name;

        // Default constructor:
        public Child()
        {
            name = "N/A";
        }

        // Constructor:
        public Child(string name, int age)
        {
            this.name = name;
            this.age = age;
        }

        // Printing method:
        public void PrintChild()
        {
            Console.WriteLine("{0}, {1} years old.", name, age);
        }
    }

    class StringTest
    {
        static void Main()
        {
            // Create objects by using the new operator:
            Child child1 = new Child("Craig", 11);
            Child child2 = new Child("Sally", 10);

            // Create an object using the default constructor:
            Child child3 = new Child();

            // Display results:
            Console.Write("Child #1: ");
            child1.PrintChild();
            Console.Write("Child #2: ");
            child2.PrintChild();
            Console.Write("Child #3: ");
            child3.PrintChild();
        }
    }
    /* Output:
        Child #1: Craig, 11 years old.
        Child #2: Sally, 10 years old.
        Child #3: N/A, 0 years old.
    */

    interface ISampleInterface
    {
        void SampleMethod();
    }

    class ImplementationClass : ISampleInterface
    {
        // Explicit interface member implementation:
        void ISampleInterface.SampleMethod()
        {
            // Method implementation.
        }

        static void Main()
        {
            // Declare an interface instance.
            ISampleInterface obj = new ImplementationClass();

            // Call the member.
            obj.SampleMethod();
        }
    }
}
```
For more information and examples, see Interfaces.

## Access modifiers

An interface can be a member of a namespace or a class. You can declare a top-level interface, one declared in a namespace but not nested inside another type, as `public` or `internal`. The default is `internal`. You can declare nested interface declarations, declared inside another type, by using any access modifier.

Interface members *without* an implementation (abstract members) are implicitly `public` and can't have any other access modifier. Interface members *with* a default implementation are `private` by default if you don't specify an access modifier, but you can declare any access modifier (`public`, `private`, `protected`, or `internal`).

## Interface members

An interface declaration can contain the following members:

- Methods.
- Properties.
- Indexers.
- Events.
- Constants.
- Operators.
- A static constructor.
- Nested types.
- Static fields, methods, properties, indexers, and events.
- Explicit access modifiers (the default access for abstract methods is `public`).

## Default interface members

Member declarations typically don't contain a body. However, an interface member can declare a body. Member bodies in an interface are the *default implementation*. By using members with bodies, the interface can provide a default implementation for classes and structs that don't provide an overriding implementation.

> **Important:**
> If you add default interface members, any `ref struct` that implements the interface must explicitly declare that member.

## Static interface members and runtime support

Starting with C# 15, you can declare and use non-virtual static interface members even when the target runtime doesn't support default interface implementations. For example, a static helper method provides a single implementation that you call on the interface type:

```csharp
public interface IMeasurement
{
    public static double ToMeters(double centimeters) => centimeters / 100;
}
```

The call `IMeasurement.ToMeters(250)` doesn't require an implementing type or runtime dispatch through that type. This compatibility change applies to non-virtual static members, not instance default implementations or `static abstract` and `static virtual` members. Those features retain their runtime requirements. The `protected`, `protected internal`, and `private protected` access modifiers on interface members also still require a runtime that supports default interface implementations.

## Static abstract and virtual members

An interface can declare `static abstract` and `static virtual` members for all member types except fields. By declaring these members, an interface can require that implementing types define operators or other static members. This feature enables generic algorithms to specify number-like behavior. You can see examples in the numeric types in the .NET runtime, such as `System.Numerics.INumber`1`. These interfaces define common mathematical operators implemented by many numeric types. The compiler must resolve calls to `static virtual` and `static abstract` methods at compile time. The `static virtual` and `static abstract` methods declared in interfaces don't have a runtime dispatch mechanism analogous to `virtual` or `abstract` methods declared in classes. Instead, the compiler uses type information available at compile time. Therefore, `static virtual` methods are almost exclusively declared in generic interfaces. Furthermore, most interfaces that declare `static virtual` or `static abstract` methods declare that one of the type parameters must implement the declared interface. For example, the `INumber<T>` interface declares that `T` must implement `INumber<T>`. The compiler uses the type argument to resolve calls to the methods and operators declared in the interface declaration. For example, the `int` type implements `INumber<int>`. When the type parameter `T` denotes the type argument `int`, the `static` members declared on `int` are invoked. Alternatively, when `double` is the type argument, the `static` members declared on the `double` type are invoked.

> **Important:**
> Method dispatch for `static abstract` and `static virtual` methods declared in interfaces is resolved by using the compile-time type of an expression. If the runtime type of an expression is derived from a different compile-time type, the static methods on the base (compile-time) type are called.

You can try this feature by working with the tutorial on static abstract members in interfaces.

## Interface inheritance

Interfaces can't contain instance state. While static fields are now permitted, instance fields aren't permitted in interfaces. Instance auto-properties aren't supported in interfaces, as they would implicitly declare a hidden field. This rule has a subtle effect on property declarations. In an interface declaration, the following code doesn't declare an automatically implemented property as it does in a `class` or `struct`. Instead, it declares a property that doesn't have a default implementation but must be implemented in any type that implements the interface:

```csharp
public interface INamed
{
  public string Name {get; set;}
}
```

An interface can inherit from one or more base interfaces. When an interface inherits from another interface, a type implementing the derived interface must implement all the members in the base interfaces in addition to those members declared in the derived interface, as shown in the following code:

```csharp
public interface I1
{
    void M1();
}

public interface I2 : I1
{
    void M2();
}

public class C : I2
{
    // implements I1.M1
    public void M1() { }
    // implements I2.M2
    public void M2() { }
}
```
When an interface overrides a method implemented in a base interface, it must use the explicit interface implementation syntax.

When a base type list contains a base class and interfaces, the base class must come first in the list.

A class that implements an interface can explicitly implement members of that interface. An explicitly implemented member can't be accessed through a class instance, but only through an instance of the interface. In addition, default interface members can only be accessed through an instance of the interface.

For more information about explicit interface implementation, see Explicit Interface Implementation.

## Example interface implementation

The following example demonstrates interface implementation. In this example, the interface contains the property declaration and the class contains the implementation. Any instance of a class that implements `IPoint` has integer properties `x` and `y`.

```csharp
﻿using System;

namespace Keywords;
interface IPoint
{
    // Property signatures:
    int X { get; set; }

    int Y { get; set; }

    double Distance { get; }
}

class Point : IPoint
{
    // Constructor:
    public Point(int x, int y)
    {
        X = x;
        Y = y;
    }

    // Property implementation:
    public int X { get; set; }

    public int Y { get; set; }

    // Property implementation
    public double Distance =>
       Math.Sqrt(X * X + Y * Y);
}

class MainClass
{
    static void PrintPoint(IPoint p)
    {
        Console.WriteLine("x={0}, y={1}", p.X, p.Y);
    }

    static void Main()
    {
        IPoint p = new Point(2, 3);
        Console.Write("My Point: ");
        PrintPoint(p);
    }
}
// Output: My Point: x=2, y=3

public interface I1
{
    void M1();
}

public interface I2 : I1
{
    void M2();
}

public class C : I2
{
    // implements I1.M1
    public void M1() { }
    // implements I2.M2
    public void M2() { }
}
```
## C# language specification

For more information, see the Interfaces section of the C# language specification, including Interface operators and Interface static constructors.

## See also

- C# Keywords
- Reference Types
- Interfaces
- Using Properties
- Using Indexers
