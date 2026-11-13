---
title: "Method parameters and modifiers (part 3 of 3)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/keywords/method-parameters.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Method parameters and modifiers (part 3 of 3)

## `params` modifier

The parameter with the `params` keyword must be the last parameter in the method declaration. You can only use one `params` keyword in a method declaration.

You must declare the `params` parameter as a collection type. Recognized collection types include:

- A single-dimensional *array type* `T[]`, where the *element type* is `T`.
- A *span type*:
  - `System.Span<T>`
  - `System.ReadOnlySpan<T>`
  In these types, the *element type* is `T`.
- A *type* with an accessible *create method* that has a corresponding *element type*. The *create method* uses the same attribute as collection expressions.
- A *struct* or *class type* that implements `System.Collections.Generic.IEnumerable`1` where:
  - The *type* has a constructor that you can invoke without arguments, and the constructor is at least as accessible as the declaring member.
  - The *type* has an instance (not an extension) method `Add` where:
    - The method can be invoked with a single value argument.
    - If the method is generic, the type arguments can be inferred from the argument.
    - The method is at least as accessible as the declaring member.
  In this case, the *element type* is the *iteration type* of the *type*.
- An *interface type*:
  - `System.Collections.Generic.IEnumerable`1`
  - `System.Collections.Generic.IReadOnlyCollection`1`
  - `System.Collections.Generic.IReadOnlyList`1`
  - `System.Collections.Generic.ICollection`1`
  - `System.Collections.Generic.IList`1`
  In these types, the *element type* is `T`.

Before C# 13, you must use a single-dimensional array for the parameter.

When you call a method with a `params` parameter, you can pass in:

- A comma-separated list of arguments of the type of the array elements.
- A collection of arguments of the specified type.
- No arguments. If you send no arguments, the length of the `params` list is zero.

The following example demonstrates various ways to send arguments to a `params` parameter.

```csharp
public static void ParamsModifierExample(params int[] list)
{
    for (int i = 0; i < list.Length; i++)
    {
        System.Console.Write(list[i] + " ");
    }
    System.Console.WriteLine();
}

public static void ParamsModifierObjectExample(params object[] list)
{
    for (int i = 0; i < list.Length; i++)
    {
        System.Console.Write(list[i] + " ");
    }
    System.Console.WriteLine();
}

public static void TryParamsCalls()
{
    // You can send a comma-separated list of arguments of the
    // specified type.
    ParamsModifierExample(1, 2, 3, 4);
    ParamsModifierObjectExample(1, 'a', "test");

    // A params parameter accepts zero or more arguments.
    // The following calling statement displays only a blank line.
    ParamsModifierObjectExample();

    // An array argument can be passed, as long as the array
    // type matches the parameter type of the method being called.
    int[] myIntArray = { 5, 6, 7, 8, 9 };
    ParamsModifierExample(myIntArray);

    object[] myObjArray = { 2, 'b', "test", "again" };
    ParamsModifierObjectExample(myObjArray);

    // The following call causes a compiler error because the object
    // array cannot be converted into an integer array.
    //ParamsModifierExample(myObjArray);

    // The following call does not cause an error, but the entire
    // integer array becomes the first element of the params array.
    ParamsModifierObjectExample(myIntArray);
}
/*
Output:
    1 2 3 4
    1 a test

    5 6 7 8 9
    2 b test again
    System.Int32[]
*/
```
Overload resolution can cause ambiguity when the argument for a `params` parameter is a collection type. The collection type of the argument must be convertible to the collection type of the parameter. When different overloads provide better conversions for that parameter, that method might be better. However, if the argument to the `params` parameter is either discrete elements or missing, all overloads with different `params` parameter types are equal for that parameter.

For more information, see the section on Argument lists in the C# Language Specification. The language specification is the definitive source for C# syntax and usage.
