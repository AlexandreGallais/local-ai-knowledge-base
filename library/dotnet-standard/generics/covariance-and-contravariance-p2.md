---
title: "Covariance and Contravariance in Generics (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/generics/covariance-and-contravariance.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Covariance and Contravariance in Generics (part 2 of 2)

## Generic delegates with variant type parameters

The `Func` generic delegates, such as `System.Func`2`, have covariant return types and contravariant parameter types. The `Action` generic delegates, such as `System.Action`2`, have contravariant parameter types. This means that the delegates can be assigned to variables that have more derived parameter types and (in the case of the `Func` generic delegates) less derived return types.

> **Note:**
> The last generic type parameter of the `Func` generic delegates specifies the type of the return value in the delegate signature. It is covariant (`out` keyword), whereas the other generic type parameters are contravariant (`in` keyword).

 The following code illustrates this. The first piece of code defines a class named `Base`, a class named `Derived` that inherits `Base`, and another class with a `static` method (`Shared` in Visual Basic) named `MyMethod`. The method takes an instance of `Base` and returns an instance of `Derived`. (If the argument is an instance of `Derived`, `MyMethod` returns it; if the argument is an instance of `Base`, `MyMethod` returns a new instance of `Derived`.) In `Main()`, the example creates an instance of `Func<Base, Derived>` (`Func(Of Base, Derived)` in Visual Basic) that represents `MyMethod`, and stores it in the variable `f1`.

 ```csharp
using System;

public class Base {}
public class Derived : Base {}

public class Program
{
    public static Derived MyMethod(Base b)
    {
        return b as Derived ?? new Derived();
    }

    static void Main()
    {
        Func<Base, Derived> f1 = MyMethod;

        // Covariant return type.
        Func<Base, Base> f2 = f1;
        Base b2 = f2(new Base());

        // Contravariant parameter type.
        Func<Derived, Derived> f3 = f1;
        Derived d3 = f3(new Derived());

        // Covariant return type and contravariant parameter type.
        Func<Derived, Base> f4 = f1;
        Base b4 = f4(new Derived());
    }
}
```

 The second piece of code shows that the delegate can be assigned to a variable of type `Func<Base, Base>` (`Func(Of Base, Base)` in Visual Basic), because the return type is covariant.

 ```csharp
using System;

public class Base {}
public class Derived : Base {}

public class Program
{
    public static Derived MyMethod(Base b)
    {
        return b as Derived ?? new Derived();
    }

    static void Main()
    {
        Func<Base, Derived> f1 = MyMethod;

        // Covariant return type.
        Func<Base, Base> f2 = f1;
        Base b2 = f2(new Base());

        // Contravariant parameter type.
        Func<Derived, Derived> f3 = f1;
        Derived d3 = f3(new Derived());

        // Covariant return type and contravariant parameter type.
        Func<Derived, Base> f4 = f1;
        Base b4 = f4(new Derived());
    }
}
```

 The third piece of code shows that the delegate can be assigned to a variable of type `Func<Derived, Derived>` (`Func(Of Derived, Derived)` in Visual Basic), because the parameter type is contravariant.

 ```csharp
using System;

public class Base {}
public class Derived : Base {}

public class Program
{
    public static Derived MyMethod(Base b)
    {
        return b as Derived ?? new Derived();
    }

    static void Main()
    {
        Func<Base, Derived> f1 = MyMethod;

        // Covariant return type.
        Func<Base, Base> f2 = f1;
        Base b2 = f2(new Base());

        // Contravariant parameter type.
        Func<Derived, Derived> f3 = f1;
        Derived d3 = f3(new Derived());

        // Covariant return type and contravariant parameter type.
        Func<Derived, Base> f4 = f1;
        Base b4 = f4(new Derived());
    }
}
```

 The final piece of code shows that the delegate can be assigned to a variable of type `Func<Derived, Base>` (`Func(Of Derived, Base)` in Visual Basic), combining the effects of the contravariant parameter type and the covariant return type.

 ```csharp
using System;

public class Base {}
public class Derived : Base {}

public class Program
{
    public static Derived MyMethod(Base b)
    {
        return b as Derived ?? new Derived();
    }

    static void Main()
    {
        Func<Base, Derived> f1 = MyMethod;

        // Covariant return type.
        Func<Base, Base> f2 = f1;
        Base b2 = f2(new Base());

        // Contravariant parameter type.
        Func<Derived, Derived> f3 = f1;
        Derived d3 = f3(new Derived());

        // Covariant return type and contravariant parameter type.
        Func<Derived, Base> f4 = f1;
        Base b4 = f4(new Derived());
    }
}
```

### Variance in non-generic delegates

 In the preceding code, the signature of `MyMethod` exactly matches the signature of the constructed generic delegate: `Func<Base, Derived>` (`Func(Of Base, Derived)` in Visual Basic). The example shows that this generic delegate can be stored in variables or method parameters that have more derived parameter types and less derived return types, as long as all the delegate types are constructed from the generic delegate type `System.Func`2`.

 This is an important point. The effects of covariance and contravariance in the type parameters of generic delegates are similar to the effects of covariance and contravariance in ordinary delegate binding (see Variance in Delegates (C#) and Variance in Delegates (Visual Basic)). However, variance in delegate binding works with all delegate types, not just with generic delegate types that have variant type parameters. Furthermore, variance in delegate binding enables a method to be bound to any delegate that has more restrictive parameter types and a less restrictive return type, whereas the assignment of generic delegates works only if both delegate types are constructed from the same generic type definition.

 The following example shows the combined effects of variance in delegate binding and variance in generic type parameters. The example defines a type hierarchy that includes three types, from least derived (`Type1`) to most derived (`Type3`). Variance in ordinary delegate binding is used to bind a method with a parameter type of `Type1` and a return type of `Type3` to a generic delegate with a parameter type of `Type2` and a return type of `Type2`. The resulting generic delegate is then assigned to another variable whose generic delegate type has a parameter of type `Type3` and a return type of `Type1`, using the covariance and contravariance of generic type parameters. The second assignment requires both the variable type and the delegate type to be constructed from the same generic type definition, in this case, `System.Func`2`.

 ```csharp
using System;

public class Type1 {}
public class Type2 : Type1 {}
public class Type3 : Type2 {}

public class Program
{
    public static Type3 MyMethod(Type1 t)
    {
        return t as Type3 ?? new Type3();
    }

    static void Main()
    {
        Func<Type2, Type2> f1 = MyMethod;

        // Covariant return type and contravariant parameter type.
        Func<Type3, Type1> f2 = f1;
        Type1 t1 = f2(new Type3());
    }
}
```

## Define variant generic interfaces and delegates

Visual Basic and C# have keywords that enable you to mark the generic type parameters of interfaces and delegates as covariant or contravariant.

 A covariant type parameter is marked with the `out` keyword (`Out` keyword in Visual Basic). You can use a covariant type parameter as the return value of a method that belongs to an interface, or as the return type of a delegate. You cannot use a covariant type parameter as a generic type constraint for interface methods.

> **Note:**
> If a method of an interface has a parameter that is a generic delegate type, a covariant type parameter of the interface type can be used to specify a contravariant type parameter of the delegate type.

 A contravariant type parameter is marked with the `in` keyword (`In` keyword in Visual Basic). You can use a contravariant type parameter as the type of a parameter of a method that belongs to an interface, or as the type of a parameter of a delegate. You can use a contravariant type parameter as a generic type constraint for an interface method.

 Only interface types and delegate types can have variant type parameters. An interface or delegate type can have both covariant and contravariant type parameters.

 Visual Basic and C# do not allow you to violate the rules for using covariant and contravariant type parameters, or to add covariance and contravariance annotations to the type parameters of types other than interfaces and delegates.

 For information and example code, see Variance in Generic Interfaces (C#) and Variance in Generic Interfaces (Visual Basic).

## List of types

The following interface and delegate types have covariant and/or contravariant type parameters.

|Type|Covariant type parameters|Contravariant type parameters|
|----------|-------------------------------|-----------------------------------|
|`System.Action`1` to `System.Action`16`||Yes|
|`System.Comparison`1`||Yes|
|`System.Converter`2`|Yes|Yes|
|`System.Func`1`|Yes||
|`System.Func`2` to `System.Func`17`|Yes|Yes|
|`System.IComparable`1`||Yes|
|`System.Predicate`1`||Yes|
|`System.Collections.Generic.IComparer`1`||Yes|
|`System.Collections.Generic.IEnumerable`1`|Yes||
|`System.Collections.Generic.IEnumerator`1`|Yes||
|`System.Collections.Generic.IEqualityComparer`1`||Yes|
|`System.Linq.IGrouping`2`|Yes||
|`System.Linq.IOrderedEnumerable`1`|Yes||
|`System.Linq.IOrderedQueryable`1`|Yes||
|`System.Linq.IQueryable`1`|Yes||

## See also

- Covariance and Contravariance (C#)
- Covariance and Contravariance (Visual Basic)
- Variance in Delegates (C#)
- Variance in Delegates (Visual Basic)
