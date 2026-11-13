---
title: "Generic Delegates for Manipulating Arrays and Lists"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/generics/delegates-for-manipulating-arrays-and-lists.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Generic Delegates for Manipulating Arrays and Lists

This topic provides an overview of generic delegates for conversions, search predicates, and actions to be taken on elements of an array or collection.

## Generic Delegates for Manipulating Arrays and Lists

 The `System.Action`1` generic delegate represents a method that performs some action on an element of the specified type. You can create a method that performs the desired action on the element, create an instance of the `System.Action`1` delegate to represent that method, and then pass the array and the delegate to the `System.Array.ForEach*` static generic method. The method is called for every element of the array.

 The `System.Collections.Generic.List`1` generic class also provides a `System.Collections.Generic.List`1.ForEach*` method that uses the `System.Action`1` delegate. This method is not generic.

> **Note:**
> This makes an interesting point about generic types and methods. The `System.Array.ForEach*` method must be static (`Shared` in Visual Basic) and generic because `System.Array` is not a generic type; the only reason you can specify a type for `System.Array.ForEach*` to operate on is that the method has its own type parameter list. By contrast, the nongeneric `System.Collections.Generic.List`1.ForEach*` method belongs to the generic class `System.Collections.Generic.List`1`, so it simply uses the type parameter of its class. The class is strongly typed, so the method can be an instance method.

 The `System.Predicate`1` generic delegate represents a method that determines whether a particular element meets criteria you define. You can use it with the following static generic methods of `System.Array` to search for an element or a set of elements: `System.Array.Exists*`, `System.Array.Find*`, `System.Array.FindAll*`, `System.Array.FindIndex*`, `System.Array.FindLast*`, `System.Array.FindLastIndex*`, and `System.Array.TrueForAll*`.

 `System.Predicate`1` also works with the corresponding nongeneric instance methods of the `System.Collections.Generic.List`1` generic class.

 The `System.Comparison`1` generic delegate allows you to provide a sort order for array or list elements that do not have a native sort order, or to override the native sort order. Create a method that performs the comparison, create an instance of the `System.Comparison`1` delegate to represent your method, and then pass the array and the delegate to the `System.Array.Sort``1(``0[],System.Comparison{``0})` static generic method. The `System.Collections.Generic.List`1` generic class provides a corresponding instance method overload, `System.Collections.Generic.List`1.Sort(System.Comparison{`0})`.

 The `System.Converter`2` generic delegate allows you to define a conversion between two types, and to convert an array of one type into an array of the other, or to convert a list of one type to a list of the other. Create a method that converts the elements of the existing list to a new type, create a delegate instance to represent the method, and use the `System.Array.ConvertAll*` generic static method to produce an array of the new type from the original array, or the `System.Collections.Generic.List`1.ConvertAll``1(System.Converter{`0,``0})` generic instance method to produce a list of the new type from the original list.

### Chaining Delegates

 Many of the methods that use these delegates return an array or list, which can be passed to another method. For example, if you want to select certain elements of an array, convert those elements to a new type, and save them in a new array, you can pass the array returned by the `System.Array.FindAll*` generic method to the `System.Array.ConvertAll*` generic method. If the new element type lacks a natural sort order, you can pass the array returned by the `System.Array.ConvertAll*` generic method to the `System.Array.Sort``1(``0[],System.Comparison{``0})` generic method.

## See also

- `System.Collections.Generic`
- `System.Collections.ObjectModel`
- Generics
- Generic Collections in the .NET
- Generic Interfaces
- Covariance and Contravariance
