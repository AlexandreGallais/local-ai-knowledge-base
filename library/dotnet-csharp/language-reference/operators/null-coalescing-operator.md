---
title: "?? and ??= operators - null-coalescing operators (part 1 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/operators/null-coalescing-operator.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# `??` and `??=` operators - the null-coalescing operators

The null-coalescing operator `??` returns the value of its left-hand operand if it's not `null`. Otherwise, it evaluates the right-hand operand and returns its result. The `??` operator doesn't evaluate its right-hand operand if the left-hand operand evaluates to non-null. The null-coalescing assignment operator `??=` assigns the value of its right-hand operand to its left-hand operand only if the left-hand operand evaluates to `null`. The `??=` operator doesn't evaluate its right-hand operand if the left-hand operand evaluates to non-null.

```csharp
﻿using System.Diagnostics.CodeAnalysis;

namespace operators;

public static class NullCoalescingOperator
{
    public static void Examples()
    {
        WithNullConditional();
        WithNullableTypes();
        NullCoalescingAssignment();
    }

    public record class Human(string FirstName, string LastName)
    {
        public string FirstName { get; set; } = FirstName;
    }
    public static void AddMessageAtIndex()
    {
        List<string> messages = new List<string>(10);
        Human person = new Human("First", "Last");
        person?.FirstName = "Scott";
        messages?[5] = "five";

        int index = 0;
        int[] values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        values?[2] = GenerateNextIndex();
        int GenerateNextIndex() => index++;

        if (values is not null)
        {
            values[2] = GenerateNextIndex();
        }
    }

    private static void WithNullConditional()
    {
        double SumNumbers(List<double[]> setsOfNumbers, int indexOfSetToSum)
        {
            return setsOfNumbers?[indexOfSetToSum]?.Sum() ?? double.NaN;
        }

        var sum = SumNumbers(null, 0);
        Console.WriteLine(sum);  // output: NaN
    }

    private static void WithNullableTypes()
    {
        int? a = null;
        int b = a ?? -1;
        Console.WriteLine(b);  // output: -1
    }

    private class Person
    {
        string name;

        public string Name
        {
            get => name;
            set => name = value ?? throw new ArgumentNullException(nameof(value), "Name cannot be null");
        }
    }

    private static void Display<T>(T a, T backup)
    {
        Console.WriteLine(a ?? backup);
    }

    private static void NullCoalescingAssignment()
    {
        List<int>? numbers = null;
        int? a = null;

        Console.WriteLine((numbers is null)); // expected: true
        // if numbers is null, initialize it. Then, add 5 to numbers
        (numbers ??= new List<int>()).Add(5);
        Console.WriteLine(string.Join(" ", numbers));  // output: 5
        Console.WriteLine((numbers is null)); // expected: false        

        
        Console.WriteLine((a is null)); // expected: true
        Console.WriteLine((a ?? 3)); // expected: 3 since a is still null 
        // if a is null then assign 0 to a and add a to the list
        numbers.Add(a ??= 0);
        Console.WriteLine((a is null)); // expected: false        
        Console.WriteLine(string.Join(" ", numbers));  // output: 5 0
        Console.WriteLine(a);  // output: 0	        
    }
}
```
The left-hand operand of the `??=` operator must be a variable, a property, or an indexer element.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

The type of the left-hand operand of the `??` and `??=` operators can't be a non-nullable value type. In particular, you can use the null-coalescing operators with unconstrained type parameters:

```csharp
﻿using System.Diagnostics.CodeAnalysis;

namespace operators;

public static class NullCoalescingOperator
{
    public static void Examples()
    {
        WithNullConditional();
        WithNullableTypes();
        NullCoalescingAssignment();
    }

    public record class Human(string FirstName, string LastName)
    {
        public string FirstName { get; set; } = FirstName;
    }
    public static void AddMessageAtIndex()
    {
        List<string> messages = new List<string>(10);
        Human person = new Human("First", "Last");
        person?.FirstName = "Scott";
        messages?[5] = "five";

        int index = 0;
        int[] values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        values?[2] = GenerateNextIndex();
        int GenerateNextIndex() => index++;

        if (values is not null)
        {
            values[2] = GenerateNextIndex();
        }
    }

    private static void WithNullConditional()
    {
        double SumNumbers(List<double[]> setsOfNumbers, int indexOfSetToSum)
        {
            return setsOfNumbers?[indexOfSetToSum]?.Sum() ?? double.NaN;
        }

        var sum = SumNumbers(null, 0);
        Console.WriteLine(sum);  // output: NaN
    }

    private static void WithNullableTypes()
    {
        int? a = null;
        int b = a ?? -1;
        Console.WriteLine(b);  // output: -1
    }

    private class Person
    {
        string name;

        public string Name
        {
            get => name;
            set => name = value ?? throw new ArgumentNullException(nameof(value), "Name cannot be null");
        }
    }

    private static void Display<T>(T a, T backup)
    {
        Console.WriteLine(a ?? backup);
    }

    private static void NullCoalescingAssignment()
    {
        List<int>? numbers = null;
        int? a = null;

        Console.WriteLine((numbers is null)); // expected: true
        // if numbers is null, initialize it. Then, add 5 to numbers
        (numbers ??= new List<int>()).Add(5);
        Console.WriteLine(string.Join(" ", numbers));  // output: 5
        Console.WriteLine((numbers is null)); // expected: false        

        
        Console.WriteLine((a is null)); // expected: true
        Console.WriteLine((a ?? 3)); // expected: 3 since a is still null 
        // if a is null then assign 0 to a and add a to the list
        numbers.Add(a ??= 0);
        Console.WriteLine((a is null)); // expected: false        
        Console.WriteLine(string.Join(" ", numbers));  // output: 5 0
        Console.WriteLine(a);  // output: 0	        
    }
}
```
The null-coalescing operators are right-associative. That is, expressions of the form

```csharp
a ?? b ?? c
d ??= e ??= f
```

are evaluated as

```csharp
a ?? (b ?? c)
d ??= (e ??= f)
```
