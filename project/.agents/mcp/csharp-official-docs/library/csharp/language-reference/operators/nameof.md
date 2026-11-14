---
title: "The nameof expression - evaluate the text name of a symbol"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/operators/nameof.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# nameof expression (C# reference)

A `nameof` expression produces the name of a variable, type, or member as the string constant. A `nameof` expression is evaluated at compile time and has no effect at run time. When the operand is a type or a namespace, the produced name isn't fully qualified.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

The following example shows how to use a `nameof` expression:

```csharp
﻿namespace operators;

public static class NameOfOperator
{
    public static void Examples()
    {
        Console.WriteLine(nameof(System.Collections.Generic));  // output: Generic
        Console.WriteLine(nameof(List<int>));  // output: List
        Console.WriteLine(nameof(List<>)); // output: List
        Console.WriteLine(nameof(List<int>.Count));  // output: Count
        Console.WriteLine(nameof(List<int>.Add));  // output: Add

        List<int> numbers = new List<int>() { 1, 2, 3 };
        Console.WriteLine(nameof(numbers));  // output: numbers
        Console.WriteLine(nameof(numbers.Count));  // output: Count
        Console.WriteLine(nameof(numbers.Add));  // output: Add

        var @new = 5;
        Console.WriteLine(nameof(@new));  // output: new
    }

    [ParameterString(nameof(msg))]
    public static void Method(string msg)
    {
        [ParameterString(nameof(T))]
        void LocalFunction<T>(T param) { }

        var lambdaExpression = ([ParameterString(nameof(aNumber))] int aNumber) => aNumber.ToString();
    }

    public class ParameterStringAttribute : Attribute
    {
        public ParameterStringAttribute(string parameterName) { }
    }

    private class Person
    {
        string name = string.Empty;

        public string Name
        {
            get => name;
            set => name = value ?? throw new ArgumentNullException(nameof(value), $"{nameof(Name)} cannot be null");
        }
    }
}
```
The preceding example that uses `List<>` is supported in C# 14 and later. The operand of `nameof` can be an unbound generic type, such as `List<>` or `Dictionary<,>`. The result is the simple type name without arity or any type-argument list — `nameof(List<>)` returns `"List"`. Unbound generic operands are useful in logging, diagnostic messages, and attribute arguments where the generic type name matters but the type arguments don't.

You can use a `nameof` expression to make the argument-checking code more maintainable:

```csharp
﻿namespace operators;

public static class NameOfOperator
{
    public static void Examples()
    {
        Console.WriteLine(nameof(System.Collections.Generic));  // output: Generic
        Console.WriteLine(nameof(List<int>));  // output: List
        Console.WriteLine(nameof(List<>)); // output: List
        Console.WriteLine(nameof(List<int>.Count));  // output: Count
        Console.WriteLine(nameof(List<int>.Add));  // output: Add

        List<int> numbers = new List<int>() { 1, 2, 3 };
        Console.WriteLine(nameof(numbers));  // output: numbers
        Console.WriteLine(nameof(numbers.Count));  // output: Count
        Console.WriteLine(nameof(numbers.Add));  // output: Add

        var @new = 5;
        Console.WriteLine(nameof(@new));  // output: new
    }

    [ParameterString(nameof(msg))]
    public static void Method(string msg)
    {
        [ParameterString(nameof(T))]
        void LocalFunction<T>(T param) { }

        var lambdaExpression = ([ParameterString(nameof(aNumber))] int aNumber) => aNumber.ToString();
    }

    public class ParameterStringAttribute : Attribute
    {
        public ParameterStringAttribute(string parameterName) { }
    }

    private class Person
    {
        string name = string.Empty;

        public string Name
        {
            get => name;
            set => name = value ?? throw new ArgumentNullException(nameof(value), $"{nameof(Name)} cannot be null");
        }
    }
}
```
You can use a `nameof` expression with a method parameter inside an attribute on a method or its parameter. The following code shows how to do that for an attribute on a method, a local function, and the parameter of a lambda expression:

```csharp
[ParameterString(nameof(msg))]
public static void Method(string msg)
{
    [ParameterString(nameof(T))]
    void LocalFunction<T>(T param) { }

    var lambdaExpression = ([ParameterString(nameof(aNumber))] int aNumber) => aNumber.ToString();
}
```
A `nameof` expression with a parameter is useful when you use the nullable analysis attributes or the CallerArgumentExpression attribute.

When the operand is a verbatim identifier, the `@` character isn't part of the name, as the following example shows:

```csharp
﻿namespace operators;

public static class NameOfOperator
{
    public static void Examples()
    {
        Console.WriteLine(nameof(System.Collections.Generic));  // output: Generic
        Console.WriteLine(nameof(List<int>));  // output: List
        Console.WriteLine(nameof(List<>)); // output: List
        Console.WriteLine(nameof(List<int>.Count));  // output: Count
        Console.WriteLine(nameof(List<int>.Add));  // output: Add

        List<int> numbers = new List<int>() { 1, 2, 3 };
        Console.WriteLine(nameof(numbers));  // output: numbers
        Console.WriteLine(nameof(numbers.Count));  // output: Count
        Console.WriteLine(nameof(numbers.Add));  // output: Add

        var @new = 5;
        Console.WriteLine(nameof(@new));  // output: new
    }

    [ParameterString(nameof(msg))]
    public static void Method(string msg)
    {
        [ParameterString(nameof(T))]
        void LocalFunction<T>(T param) { }

        var lambdaExpression = ([ParameterString(nameof(aNumber))] int aNumber) => aNumber.ToString();
    }

    public class ParameterStringAttribute : Attribute
    {
        public ParameterStringAttribute(string parameterName) { }
    }

    private class Person
    {
        string name = string.Empty;

        public string Name
        {
            get => name;
            set => name = value ?? throw new ArgumentNullException(nameof(value), $"{nameof(Name)} cannot be null");
        }
    }
}
```
## C# language specification

For more information, see the Nameof expressions section of the C# language specification.

## See also

- C# operators and expressions
- Convert `typeof` to `nameof` (style rule IDE0082)
