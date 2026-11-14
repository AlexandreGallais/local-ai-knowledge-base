---
title: "?? and ??= operators - null-coalescing operators (part 2 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/operators/null-coalescing-operator.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ?? and ??= operators - null-coalescing operators (part 2 of 2)

## Examples

The `??` and `??=` operators are useful in the following scenarios:

- In expressions that use the null-conditional operators `?.` and `?[]`, use the `??` operator to provide an alternative expression to evaluate if the result of the expression with null-conditional operations is `null`:

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
- When you work with nullable value types and need to provide a value of an underlying value type, use the `??` operator to specify the value to provide if a nullable type value is `null`:

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
  Use the `System.Nullable`1.GetValueOrDefault` method if the value to use when a nullable type value is `null` should be the default value of the underlying value type.

- To make the argument-checking code more concise, use a `throw` expression as the right-hand operand of the `??` operator:

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
  The preceding example also demonstrates how to use expression-bodied members to define a property.

- Use the `??=` operator to replace code of the following form:

  ```csharp
  if (variable is null)
  {
      variable = expression;
  }
  ```

  Use the following code:

  ```csharp
  variable ??= expression;
  ```

## Operator overloadability

You can't overload the `??` and `??=` operators.

## C# language specification

For more information about the `??` operator, see The null coalescing operator section of the C# language specification.

For more information about the `??=` operator, see the Compound assignment section of the C# language specification.

## See also

- Null check can be simplified (IDE0029, IDE0030, and IDE0270)
- C# operators and expressions
- ?. and ?[] operators
- ?: operator
