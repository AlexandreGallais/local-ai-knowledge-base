---
title: "Work with delegate types in C#"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/programming-guide/delegates/index.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Delegates (C# Programming Guide)

A delegate is a type that represents references to methods with a particular parameter list and return type. When you instantiate a delegate, you can associate the delegate instance with any method that has a compatible signature and return type. You can invoke (or call) the method through the delegate instance.

Delegates are used to pass <example-value> as arguments to other methods. Event handlers are essentially methods you invoke through delegates. When you create a custom method, a class such as a Windows control can call your method when a certain event occurs.

The following example shows a delegate declaration:

```csharp
public delegate int PerformCalculation(int x, int y);
```
You can assign any method from any accessible class or struct that matches the delegate type to the delegate. The method can be either static or an instance method. The flexibility allows you to programmatically change method calls, or plug new code into existing classes.

> **Note:**
> In the context of method overloading, the signature of a method doesn't include the return value. However, in the context of delegates, the signature does include the return value. In other words, a method must have a compatible return type as the return type declared by the delegate.

The ability to refer to a method as a parameter makes delegates ideal for defining callback methods. You can write a method that compares two objects in your application. The method can then be used in a delegate for a sort algorithm. Because the comparison code is separate from the library, the sort method can be more general.

Function pointers support similar scenarios, where you need more control over the calling convention. The code associated with a delegate is invoked by using a virtual method added to a delegate type. When you work with function pointers, you can specify different conventions.

## Explore delegate characteristics

Delegates have the following characteristics:

- Delegates allow methods to be passed as parameters.
- Delegates can be used to define callback methods.
- Delegates can be chained together, such as calling multiple methods on a single event.
- Methods don't have to match the delegate type exactly. For more information, see Using Variance in Delegates.
- Lambda expressions are a more concise way of writing inline code blocks. Lambda expressions (in certain contexts) are compiled to delegate types. For more information about lambda expressions, see Lambda expressions.

## Review related articles

For more information about delegates, see the following articles:

- Using delegates
- Delegates with named versus anonymous methods
- Using variance in delegates
- How to combine delegates (multicast delegates)
- How to declare, instantiate, and use a delegate

## Access the C# language specification

The language specification is the definitive source for C# syntax and usage. For more information, see Delegates in the C# Language Specification.

## Related links

- `System.Delegate`
- Events
