---
title: "Object class (part 5 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Object.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Object class (part 5 of 5)

## Object.ToString() method

```csharp
public virtual string? ToString ();
```

Returns a string that represents the current object.

Returns: A string that represents the current object.

`Object.ToString` is a common formatting method in .NET. It converts an object to its string representation so that it is suitable for display. (For information about formatting support in .NET, see Formatting Types.) Default implementations of the `Object.ToString` method return the fully qualified name of the object's type.

> **Important:**
> You may have reached this page by following the link from the member list of another type. That is because that type does not override `Object.ToString`. Instead, it inherits the functionality of the `Object.ToString` method.

Types frequently override the `Object.ToString` method to provide a more suitable string representation of a particular type. Types also frequently overload the `Object.ToString` method to provide support for format strings or culture-sensitive formatting.

#### The default Object.ToString() method

The default implementation of the `Object.ToString` method returns the fully qualified name of the type of the `Object`, as the following example shows.

_Code sample not included: ~/snippets/csharp/System/Object/ToString/tostring1.cs._

Because `Object` is the base class of all reference types in .NET, this behavior is inherited by reference types that do not override the `Object.ToString` method. The following example illustrates this. It defines a class named `Object1` that accepts the default implementation of all `Object` members. Its `Object.ToString` method returns the object's fully qualified type name.

_Code sample not included: ~/snippets/csharp/System/Object/ToString/tostring2.cs._

#### Override the Object.ToString() method

Types commonly override the `Object.ToString` method to return a string that represents the object instance. For example, the base types such as `Char`, `Int32`, and `String` provide `Object.ToString` implementations that return the string form of the value that the object represents. The following example defines a class, `Object2`, that overrides the `Object.ToString` method to return the type name along with its value.

_Code sample not included: ~/snippets/csharp/System/Object/ToString/tostring3.cs._

The following table lists the type categories in .NET and indicates whether or not they override the `Object.ToString` method.

| Type category | Overrides Object.ToString() | Behavior |
|---------------|-----------------------------|----------|
| Class         | n/a                         | n/a      |
| Structure     | Yes (`ValueType.ToString`) | Same as `Object.ToString()` |
| Enumeration   | Yes (`ToString`) | The member name |
| Interface     | No| n/a |
| Delegate      | No| n/a |

See the Notes to Inheritors section for additional information on overriding `Object.ToString`.

#### Overload the ToString method

In addition to overriding the parameterless `ToString` method, many types overload the `ToString` method to provide versions of the method that accept parameters. Most commonly, this is done to provide support for variable formatting and culture-sensitive formatting.

The following example overloads the `ToString` method to return a result string that includes the value of various fields of an `Automobile` class. It defines four format strings: G, which returns the model name and year; D, which returns the model name, year, and number of doors; C, which returns the model name, year, and number of cylinders; and A, which returns a string with all four field values.

_Code sample not included: ~/snippets/csharp/System/Object/ToString/tostringoverload1.cs._

The following example calls the overloaded `ToString` method to display culture-sensitive formatting of a currency value.

_Code sample not included: ~/snippets/csharp/System/Object/ToString/tostringoverload2.cs._

For more information on format strings and culture-sensitive formatting, see Formatting Types. For the format strings supported by numeric values, see Standard Numeric Format Strings and Custom Numeric Format Strings. For the format strings supported by date and time values, see Standard Date and Time Format Strings and Custom Date and Time Format Strings.

#### Extend the Object.ToString method

Because a type inherits the default `Object.ToString` method, you may find its behavior undesirable and want to change it. This is particularly true of arrays and collection classes. While you may expect the `ToString` method of an array or collection class to display the values of its members, it instead displays the type fully qualified type name, as the following example shows.

_Code sample not included: ~/snippets/csharp/System/Object/ToString/array1.cs._

You have several options to produce the result string that you'd like.

- If the type is an array, a collection object, or an object that implements the `IEnumerable` or `IEnumerable<T>` interfaces, you can enumerate its elements by using the `foreach` statement in C# or the `For Each...Next` construct in Visual Basic.

- If the class is not `sealed` (in C#) or `NotInheritable` (in Visual Basic), you can develop a wrapper class that inherits from the base class whose `Object.ToString` method you want to customize. At a minimum, this requires that you do the following:

1. Implement any necessary constructors. Derived classes do not inherit their base class constructors.
2. Override the `Object.ToString` method to return the result string that you'd like.

The following example defines a wrapper class for the `List<T>` class. It overrides the `Object.ToString` method to display the value of each method of the collection rather than the fully qualified type name.

_Code sample not included: ~/snippets/csharp/System/Object/ToString/customize1.cs._

- Develop an extension method that returns the result string that you want. Note that you can't override the default `Object.ToString` method in this way—that is, your extension class (in C#) or module (in Visual Basic) cannot have a parameterless method named `ToString` that's called in place of the original type's `ToString` method. You'll have to provide some other name for your parameterless `ToString` replacement.

The following example defines two methods that extend the `List<T>` class: a parameterless `ToString2` method, and a `ToString` method with a `String` parameter that represents a format string.

_Code sample not included: ~/snippets/csharp/System/Object/ToString/customize2.cs._

#### Notes for the Windows Runtime

When you call the `Object.ToString` method on a class in the Windows Runtime, it provides the default behavior for classes that don't override `Object.ToString`. This is part of the support that .NET provides for the Windows Runtime (see .NET Support for Windows Store Apps and Windows Runtime). Classes in the Windows Runtime don't inherit `Object`, and don't always implement a `Object.ToString`. However, they always appear to have `Object.ToString`, `Equals`, and `Object.GetHashCode` methods when you use them in your C# or Visual Basic code, and .NET provides a default behavior for these methods.

The common language runtime uses IStringable.ToString on a Windows Runtime object before falling back to the default implementation of `Object.ToString`.

> **Note:**
> Windows Runtime classes that are written in C# or Visual Basic can override the `Object.ToString` method.

#### The Windows Runtime and the IStringable Interface

The Windows Runtime includes an IStringable interface whose single method, IStringable.ToString, provides basic <example-value> support comparable to that provided by `Object.ToString`. To prevent ambiguity, you should not implement IStringable on managed types.

When managed objects are called by native code or by code written in languages such as JavaScript or C++/CX, they appear to implement IStringable. The common language runtime automatically routes calls from IStringable.ToString to `Object.ToString` if IStringable is not implemented on the managed object.

> **Warning:**
> Because the common language runtime auto-implements IStringable for all managed types in Windows Store apps, we recommend that you do not provide your own `IStringable` implementation. Implementing `IStringable` may result in unintended behavior when calling `ToString` from the Windows Runtime, C++/CX, or JavaScript.

If you do choose to implement IStringable in a public managed type that's exported in a Windows Runtime component, the following restrictions apply:

- You can define the IStringable interface only in a "class implements" relationship, as follows:

```csharp
  public class NewClass : IStringable
```

```vb
  Public Class NewClass : Implements IStringable
```

- You cannot implement IStringable on an interface.

- You cannot declare a parameter to be of type IStringable.

- IStringable cannot be the return type of a method, property, or field.

- You cannot hide your IStringable implementation from base classes by using a method definition such as the following:

```csharp
  public class NewClass : IStringable
  {
     public new string ToString()
     {
        return "New ToString in NewClass";
     }
  }
```

Instead, the IStringable.ToString implementation must always override the base class implementation. You can hide a `ToString` implementation only by invoking it on a strongly typed class instance.

Under a variety of conditions, calls from native code to a managed type that implements IStringable or hides its ToString implementation can produce unexpected behavior.
