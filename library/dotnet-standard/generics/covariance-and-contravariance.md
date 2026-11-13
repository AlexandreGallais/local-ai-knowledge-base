---
title: "Covariance and Contravariance in Generics (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/generics/covariance-and-contravariance.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Covariance and contravariance in generics

*Covariance* and *contravariance* describe how reference conversions work between constructed generic types when their type arguments are related by inheritance, for example, between `IEnumerable<Derived>` and `IEnumerable<Base>`. Variance is a property of a generic interface or delegate type's type parameter, and it controls which implicit conversions exist between constructed types that use different type arguments. By default, generic type parameters are *invariant*—even if one type argument derives from another, the corresponding constructed generic types, such as `List<Derived>` and `List<Base>`, are unrelated unless the type parameter is explicitly declared as *covariant* or *contravariant*.

The following definitions and examples assume a base class named `Base` and a derived class named `Derived`.

- *Invariant* type arguments require you to use exactly the type specified. You can't substitute a derived or base type.

     For example, you can't assign an instance of `List<Base>` to a variable of type `List<Derived>`, or vice versa.

- *Covariant* type parameters let you substitute a more derived type for the original type argument.

     For example, you can assign an instance of `IEnumerable<Derived>` to a variable of type `IEnumerable<Base>`.

- *Contravariant* type parameters let you substitute a base type for a derived type argument instead of the original.

     For example, you can assign an instance of `Action<Base>` to a variable of type `Action<Derived>`.

 Covariant type parameters enable you to make assignments that look much like ordinary Polymorphism, as shown in the following code.

 ```csharp
﻿using System;
using System.Collections.Generic;

class Base {}
class Derived : Base {}

class C
{
    public static void Main()
    {
        IEnumerable<Derived> d = new List<Derived>();
        IEnumerable<Base> b = d;
    }
}
```

 The `System.Collections.Generic.List`1` class implements the `System.Collections.Generic.IEnumerable`1` interface, so `List<Derived>` (`List(Of Derived)` in Visual Basic) implements `IEnumerable<Derived>`. The covariant type parameter does the rest.

 Contravariance, on the other hand, seems counterintuitive. The following example creates a delegate of type `Action<Base>` (`Action(Of Base)` in Visual Basic), and then assigns that delegate to a variable of type `Action<Derived>`.

 ```csharp
﻿using System;

class Base {}
class Derived : Base {}

class Example
{
    static void Main()
    {
        Action<Base> b = (target) => { Console.WriteLine(target.GetType().Name); };
        Action<Derived> d = b;
        d(new Derived());
    }
}
```

 This seems backward, but it is type-safe code that compiles and runs. The lambda expression matches the delegate it's assigned to, so it defines a method that takes one parameter of type `Base` and that has no return value. The resulting delegate can be assigned to a variable of type `Action<Derived>` because the type parameter `T` of the `System.Action`1` delegate is contravariant. The code is type-safe because `T` specifies a parameter type. When the delegate of type `Action<Base>` is invoked as if it were a delegate of type `Action<Derived>`, its argument must be of type `Derived`. This argument can always be passed safely to the underlying method, because the method's parameter is of type `Base`.

 In general, a covariant type parameter can be used as the return type of a delegate, and contravariant type parameters can be used as parameter types. For an interface, covariant type parameters can be used as the return types of the interface's methods, and contravariant type parameters can be used as the parameter types of the interface's methods.

 Covariance and contravariance are collectively referred to as *variance*. A generic type parameter that is not marked covariant or contravariant is referred to as *invariant*. A brief summary of facts about variance in the common language runtime:

- Variant type parameters are restricted to generic interface and generic delegate types.

- A generic interface or generic delegate type can have both covariant and contravariant type parameters.

- Variance applies only to reference types; if you specify a value type for a variant type parameter, that type parameter is invariant for the resulting constructed type.

- Variance does not apply to delegate combination. That is, given two delegates of types `Action<Derived>` and `Action<Base>` (`Action(Of Derived)` and `Action(Of Base)` in Visual Basic), you cannot combine the second delegate with the first although the result would be type safe. Variance allows the second delegate to be assigned to a variable of type `Action<Derived>`, but delegates can combine only if their types match exactly.

- Starting in C# 9, covariant return types are supported. An overriding method can declare a more derived return type the method it overrides, and an overriding, read-only property can declare a more derived type.

## Generic interfaces with covariant type parameters

Several generic interfaces have covariant type parameters, for example, `System.Collections.Generic.IEnumerable`1`, `System.Collections.Generic.IEnumerator`1`, `System.Linq.IQueryable`1`, and `System.Linq.IGrouping`2`. All the type parameters of these interfaces are covariant, so the type parameters are used only for the return types of the members.

 The following example illustrates covariant type parameters. The example defines two types: `Base` has a static method named `PrintBases` that takes an `IEnumerable<Base>` (`IEnumerable(Of Base)` in Visual Basic) and prints the elements. `Derived` inherits from `Base`. The example creates an empty `List<Derived>` (`List(Of Derived)` in Visual Basic) and demonstrates that this type can be passed to `PrintBases` and assigned to a variable of type `IEnumerable<Base>` without casting. `System.Collections.Generic.List`1` implements `System.Collections.Generic.IEnumerable`1`, which has a single covariant type parameter. The covariant type parameter is the reason why an instance of `IEnumerable<Derived>` can be used instead of `IEnumerable<Base>`.

 ```csharp
using System;
using System.Collections.Generic;

class Base
{
    public static void PrintBases(IEnumerable<Base> bases)
    {
        foreach(Base b in bases)
        {
            Console.WriteLine(b);
        }
    }
}

class Derived : Base
{
    public static void Main()
    {
        List<Derived> dlist = new List<Derived>();

        Derived.PrintBases(dlist);
        IEnumerable<Base> bIEnum = dlist;
    }
}
```

## Generic interfaces with contravariant type parameters

Several generic interfaces have contravariant type parameters; for example: `System.Collections.Generic.IComparer`1`, `System.IComparable`1`, and `System.Collections.Generic.IEqualityComparer`1`. These interfaces have only contravariant type parameters, so the type parameters are used only as parameter types in the members of the interfaces.

 The following example illustrates contravariant type parameters. The example defines an abstract (`MustInherit` in Visual Basic) `Shape` class with an `Area` property. The example also defines a `ShapeAreaComparer` class that implements `IComparer<Shape>` (`IComparer(Of Shape)` in Visual Basic). The implementation of the `System.Collections.Generic.IComparer`1.Compare*` method is based on the value of the `Area` property, so `ShapeAreaComparer` can be used to sort `Shape` objects by area.

 The `Circle` class inherits `Shape` and overrides `Area`. The example creates a `System.Collections.Generic.SortedSet`1` of `Circle` objects, using a constructor that takes an `IComparer<Circle>` (`IComparer(Of Circle)` in Visual Basic). However, instead of passing an `IComparer<Circle>`, the example passes a `ShapeAreaComparer` object, which implements `IComparer<Shape>`. The example can pass a comparer of a less derived type (`Shape`) when the code calls for a comparer of a more derived type (`Circle`), because the type parameter of the `System.Collections.Generic.IComparer`1` generic interface is contravariant.

 When a new `Circle` object is added to the `SortedSet<Circle>`, the `IComparer<Shape>.Compare` method (`IComparer(Of Shape).Compare` method in Visual Basic) of the `ShapeAreaComparer` object is called each time the new element is compared to an existing element. The parameter type of the method (`Shape`) is less derived than the type that is being passed (`Circle`), so the call is type safe. Contravariance enables `ShapeAreaComparer` to sort a collection of any single type, as well as a mixed collection of types, that derive from `Shape`.

 ```csharp
using System;
using System.Collections.Generic;

abstract class Shape
{
    public virtual double Area { get { return 0; }}
}

class Circle : Shape
{
    private double r;
    public Circle(double radius) { r = radius; }
    public double Radius { get { return r; }}
    public override double Area { get { return Math.PI * r * r; }}
}

class ShapeAreaComparer : System.Collections.Generic.IComparer<Shape>
{
    int IComparer<Shape>.Compare(Shape a, Shape b)
    {
        if (a == null) return b == null ? 0 : -1;
        return b == null ? 1 : a.Area.CompareTo(b.Area);
    }
}

class Program
{
    static void Main()
    {
        // You can pass <example-value>, which implements IComparer<Shape>,
        // even though the constructor for SortedSet<Circle> expects
        // IComparer<Circle>, because type parameter T of IComparer<T> is
        // contravariant.
        SortedSet<Circle> circlesByArea =
            new SortedSet<Circle>(new ShapeAreaComparer())
                { new Circle(7.2), new Circle(100), null, new Circle(.01) };

        foreach (Circle c in circlesByArea)
        {
            Console.WriteLine(c == null ? "null" : "Circle with area " + c.Area);
        }
    }
}

/* This code example produces the following output:

null
Circle with area 0.000314159265358979
Circle with area 162.860163162095
Circle with area 31415.9265358979
 */
```
