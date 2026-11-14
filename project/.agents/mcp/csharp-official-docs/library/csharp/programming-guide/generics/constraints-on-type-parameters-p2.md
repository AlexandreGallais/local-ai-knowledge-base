---
title: "Constraints on type parameters (part 2 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/programming-guide/generics/constraints-on-type-parameters.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Constraints on type parameters (part 2 of 2)

## Delegate constraints

You can use `System.Delegate` or `System.MulticastDelegate` as a base class constraint. The Common Language Runtime (CLR) always allowed this constraint, but the C# language disallowed it. The `System.Delegate` constraint enables you to write code that works with delegates in a type-safe manner. The following code defines an extension method that combines two delegates provided they're the same type:

```csharp
extension<TDelegate>(TDelegate source) where TDelegate : System.Delegate
{
    public TDelegate? TypeSafeCombine(TDelegate target)
        => Delegate.Combine(source, target) as TDelegate;
}
```
You can use the preceding method to combine delegates that are the same type:

```csharp
Action first = () => Console.WriteLine("this");
Action second = () => Console.WriteLine("that");

var combined = first.TypeSafeCombine(second);
combined!();

Func<bool> test = () => true;
// Combine signature ensures combined delegates must
// have the same type.
//var badCombined = first.TypeSafeCombine(test);
```
If you uncomment the last line, it doesn't compile. Both `first` and `test` are delegate types, but they're different delegate types.

## Enum constraints

You can also specify the `System.Enum` type as a base class constraint. The CLR always allowed this constraint, but the C# language disallowed it. Generics using `System.Enum` provide type-safe programming to cache results from using the static methods in `System.Enum`. The following sample finds all the valid values for an enum type, and then builds a dictionary that maps those values to its string representation.

```csharp
extension<T>(T) where T : System.Enum
{
    public static Dictionary<int, string> EnumNamedValues()
    {
        var result = new Dictionary<int, string>();
        var values = Enum.GetValues(typeof(T));

        foreach (int item in values)
            result.Add(item, Enum.GetName(typeof(T), item)!);
        return result;
    }
}
```
`Enum.GetValues` and `Enum.GetName` use reflection, which has performance implications. You can call `EnumNamedValues` to build a collection that is cached and reused rather than repeating the calls that require reflection.

You could use it as shown in the following sample to create an enum and build a dictionary of its values and names:

```csharp
enum Rainbow
{
    Red,
    Orange,
    Yellow,
    Green,
    Blue,
    Indigo,
    Violet
}
```
```csharp
var map = Rainbow.EnumNamedValues();

foreach (var pair in map)
    Console.WriteLine($"{pair.Key}:\t{pair.Value}");
```
## Type arguments implement declared interface

Some scenarios require that an argument supplied for a type parameter implement that interface. For example:

```csharp
public interface IAdditionSubtraction<T> where T : IAdditionSubtraction<T>
{
    static abstract T operator +(T left, T right);
    static abstract T operator -(T left, T right);
}
```
This pattern enables the C# compiler to determine the containing type for the overloaded operators, or any `static virtual` or `static abstract` method. It provides the syntax so that the addition and subtraction operators can be defined on a containing type. Without this constraint, the parameters and arguments would be required to be declared as the interface, rather than the type parameter:

```csharp
public interface IAdditionSubtraction<T> where T : IAdditionSubtraction<T>
{
    static abstract IAdditionSubtraction<T> operator +(
        IAdditionSubtraction<T> left,
        IAdditionSubtraction<T> right);

    static abstract IAdditionSubtraction<T> operator -(
        IAdditionSubtraction<T> left,
        IAdditionSubtraction<T> right);
}
```

The preceding syntax would require implementers to use explicit interface implementation for those methods. Providing the extra constraint enables the interface to define the operators in terms of the type parameters. Types that implement the interface can implicitly implement the interface methods.

## Allows ref struct

The `allows ref struct` anti-constraint declares that the corresponding type argument can be a `ref struct` type. Instances of that type parameter must obey the following rules:

- It can't be boxed.
- It participates in ref safety rules.
- Instances can't be used where a `ref struct` type isn't allowed, such as `static` fields.
- Instances can be marked with the `scoped` modifier.

The `allows ref struct` clause isn't inherited. In the following code:

```csharp
class SomeClass<T, S>
    where T : allows ref struct
    where S : T
{
    // etc
}
```

The argument for `S` can't be a `ref struct` because `S` doesn't have the `allows ref struct` clause.

A type parameter that has the `allows ref struct` clause can't be used as a type argument unless the corresponding type parameter also has the `allows ref struct` clause. This rule is demonstrated in the following example:

```csharp
public class Allow<T> where T : allows ref struct
{

}

public class Disallow<T>
{
}

public class Example<T> where T : allows ref struct
{
    private Allow<T> fieldOne; // Allowed. T is allowed to be a ref struct

    private Disallow<T> fieldTwo; // Error. T is not allowed to be a ref struct
}
```

The preceding sample shows that a type argument that might be a `ref struct` type can't be substituted for a type parameter that can't be a `ref struct` type.

## See also

- `System.Collections.Generic`
- Introduction to Generics
- Generic Classes
- new Constraint
