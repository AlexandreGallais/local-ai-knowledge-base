---
title: "Nullable value types (part 4 of 6)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/builtin-types/nullable-value-types.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Nullable value types (part 4 of 6)

## Lifted operators

A nullable value type `T?` supports the predefined unary and binary operators or any overloaded operators that a value type `T` supports. These operators, also known as *lifted operators*, return `null` if one or both operands are `null`. Otherwise, the operator uses the contained values of its operands to calculate the result. For example:

```csharp
﻿namespace builtin_types;

public static class NullableValueTypes
{
    public static void Examples()
    {
        DeclareAndAssign();
        ExamineValueOfNullableType();
        UseNullCoalescingOperator();
        Operators();
        ComparisonOperators();
        BoxingAndUnboxing();
        WhetherTypeIsNullable();
        GetTypeExample();
        IsOperatorExample();
    }

    private static void DeclareAndAssign()
    {
        double? pi = 3.14;
        char? letter = 'a';

        int m2 = 10;
        int? m = m2;

        bool? flag = null;

        // An array of a nullable value type:
        int?[] arr = new int?[10];
    }

    private static void ExamineValueOfNullableType()
    {
        int? a = 42;
        if (a is int valueOfA)
        {
            Console.WriteLine($"a is {valueOfA}");
        }
        else
        {
            Console.WriteLine("a does not have a value");
        }
        // Output:
        // a is 42

        int? b = 10;
        if (b.HasValue)
        {
            Console.WriteLine($"b is {b.Value}");
        }
        else
        {
            Console.WriteLine("b does not have a value");
        }
        // Output:
        // b is 10

        int? c = 7;
        if (c != null)
        {
            Console.WriteLine($"c is {c.Value}");
        }
        else
        {
            Console.WriteLine("c does not have a value");
        }
        // Output:
        // c is 7
    }

    private static void UseNullCoalescingOperator()
    {
        int? a = 28;
        int b = a ?? -1;
        Console.WriteLine($"b is {b}");  // output: b is 28

        int? c = null;
        int d = c ?? -1;
        Console.WriteLine($"d is {d}");  // output: d is -1
    }

    private static void ExplicitCast()
    {
        int? n = null;

        //int m1 = n;    // Doesn't compile
        int n2 = (int)n; // Compiles, but throws an exception if n is null
    }

    private static void Operators()
    {
        int? a = 10;
        int? b = null;
        int? c = 10;

        a++;        // a is 11
        a = a * c;  // a is 110
        a = a + b;  // a is null
    }

    private static void ComparisonOperators()
    {
        int? a = 10;
        Console.WriteLine($"{a} >= null is {a >= null}");
        Console.WriteLine($"{a} < null is {a < null}");
        Console.WriteLine($"{a} == null is {a == null}");
        // Output:
        // 10 >= null is False
        // 10 < null is False
        // 10 == null is False

        int? b = null;
        int? c = null;
        Console.WriteLine($"null >= null is {b >= c}");
        Console.WriteLine($"null == null is {b == c}");
        // Output:
        // null >= null is False
        // null == null is True
    }

    private static void BoxingAndUnboxing()
    {
        int a = 41;
        object aBoxed = a;
        int? aNullable = (int?)aBoxed;
        Console.WriteLine($"Value of aNullable: {aNullable}");

        object aNullableBoxed = aNullable;
        if (aNullableBoxed is int valueOfA)
        {
            Console.WriteLine($"aNullableBoxed is boxed int: {valueOfA}");
        }
        // Output:
        // Value of aNullable: 41
        // aNullableBoxed is boxed int: 41
    }

    private static void WhetherTypeIsNullable()
    {
        Console.WriteLine($"int? is {(IsNullable(typeof(int?)) ? "nullable" : "non nullable")} value type");
        Console.WriteLine($"int is {(IsNullable(typeof(int)) ? "nullable" : "non-nullable")} value type");

        bool IsNullable(Type type) => Nullable.GetUnderlyingType(type) != null;

        // Output:
        // int? is nullable value type
        // int is non-nullable value type
    }

    private static void GetTypeExample()
    {
        int? a = 17;
        Type typeOfA = a.GetType();
        Console.WriteLine(typeOfA.FullName);
        // Output:
        // System.Int32
    }

    private static void IsOperatorExample()
    {
        int? a = 14;
        if (a is int)
        {
            Console.WriteLine("int? instance is compatible with int");
        }

        int b = 17;
        if (b is int?)
        {
            Console.WriteLine("int instance is compatible with int?");
        }
        // Output:
        // int? instance is compatible with int
        // int instance is compatible with int?
    }
}
```
> **Note:**
> For the `bool?` type, the predefined `&` and `|` operators don't follow the rules described in this section: the result of an operator evaluation can be non-null even if one of the operands is `null`. For more information, see the Nullable Boolean logical operators section of the Boolean logical operators article.

For the comparison operators `<`, `>`, `<=`, and `>=`, if one or both operands are `null`, the result is `false`. Otherwise, the contained values of operands are compared. Don't assume that because a particular comparison (for example, `<=`) returns `false`, the opposite comparison (`>`) returns `true`. The following example shows that 10 is

- neither greater than or equal to `null`
- nor less than `null`

```csharp
﻿namespace builtin_types;

public static class NullableValueTypes
{
    public static void Examples()
    {
        DeclareAndAssign();
        ExamineValueOfNullableType();
        UseNullCoalescingOperator();
        Operators();
        ComparisonOperators();
        BoxingAndUnboxing();
        WhetherTypeIsNullable();
        GetTypeExample();
        IsOperatorExample();
    }

    private static void DeclareAndAssign()
    {
        double? pi = 3.14;
        char? letter = 'a';

        int m2 = 10;
        int? m = m2;

        bool? flag = null;

        // An array of a nullable value type:
        int?[] arr = new int?[10];
    }

    private static void ExamineValueOfNullableType()
    {
        int? a = 42;
        if (a is int valueOfA)
        {
            Console.WriteLine($"a is {valueOfA}");
        }
        else
        {
            Console.WriteLine("a does not have a value");
        }
        // Output:
        // a is 42

        int? b = 10;
        if (b.HasValue)
        {
            Console.WriteLine($"b is {b.Value}");
        }
        else
        {
            Console.WriteLine("b does not have a value");
        }
        // Output:
        // b is 10

        int? c = 7;
        if (c != null)
        {
            Console.WriteLine($"c is {c.Value}");
        }
        else
        {
            Console.WriteLine("c does not have a value");
        }
        // Output:
        // c is 7
    }

    private static void UseNullCoalescingOperator()
    {
        int? a = 28;
        int b = a ?? -1;
        Console.WriteLine($"b is {b}");  // output: b is 28

        int? c = null;
        int d = c ?? -1;
        Console.WriteLine($"d is {d}");  // output: d is -1
    }

    private static void ExplicitCast()
    {
        int? n = null;

        //int m1 = n;    // Doesn't compile
        int n2 = (int)n; // Compiles, but throws an exception if n is null
    }

    private static void Operators()
    {
        int? a = 10;
        int? b = null;
        int? c = 10;

        a++;        // a is 11
        a = a * c;  // a is 110
        a = a + b;  // a is null
    }

    private static void ComparisonOperators()
    {
        int? a = 10;
        Console.WriteLine($"{a} >= null is {a >= null}");
        Console.WriteLine($"{a} < null is {a < null}");
        Console.WriteLine($"{a} == null is {a == null}");
        // Output:
        // 10 >= null is False
        // 10 < null is False
        // 10 == null is False

        int? b = null;
        int? c = null;
        Console.WriteLine($"null >= null is {b >= c}");
        Console.WriteLine($"null == null is {b == c}");
        // Output:
        // null >= null is False
        // null == null is True
    }

    private static void BoxingAndUnboxing()
    {
        int a = 41;
        object aBoxed = a;
        int? aNullable = (int?)aBoxed;
        Console.WriteLine($"Value of aNullable: {aNullable}");

        object aNullableBoxed = aNullable;
        if (aNullableBoxed is int valueOfA)
        {
            Console.WriteLine($"aNullableBoxed is boxed int: {valueOfA}");
        }
        // Output:
        // Value of aNullable: 41
        // aNullableBoxed is boxed int: 41
    }

    private static void WhetherTypeIsNullable()
    {
        Console.WriteLine($"int? is {(IsNullable(typeof(int?)) ? "nullable" : "non nullable")} value type");
        Console.WriteLine($"int is {(IsNullable(typeof(int)) ? "nullable" : "non-nullable")} value type");

        bool IsNullable(Type type) => Nullable.GetUnderlyingType(type) != null;

        // Output:
        // int? is nullable value type
        // int is non-nullable value type
    }

    private static void GetTypeExample()
    {
        int? a = 17;
        Type typeOfA = a.GetType();
        Console.WriteLine(typeOfA.FullName);
        // Output:
        // System.Int32
    }

    private static void IsOperatorExample()
    {
        int? a = 14;
        if (a is int)
        {
            Console.WriteLine("int? instance is compatible with int");
        }

        int b = 17;
        if (b is int?)
        {
            Console.WriteLine("int instance is compatible with int?");
        }
        // Output:
        // int? instance is compatible with int
        // int instance is compatible with int?
    }
}
```
For the equality operator `==`, if both operands are `null`, the result is `true`. If only one of the operands is `null`, the result is `false`. Otherwise, the contained values of operands are compared.

For the inequality operator `!=`, if both operands are `null`, the result is `false`. If only one of the operands is `null`, the result is `true`. Otherwise, the contained values of operands are compared.

If a user-defined conversion exists between two value types, the same conversion can also be used between the corresponding nullable value types.
