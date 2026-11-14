---
title: "Nullable value types (part 2 of 6)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/builtin-types/nullable-value-types.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Nullable value types (part 2 of 6)

## Examination of an instance of a nullable value type

To check an instance of a nullable value type for `null` and get a value of an underlying type, use the `is` operator with a type pattern:

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
You can always use the following read-only properties to check and get a value of a nullable value type variable:

- `System.Nullable`1.HasValue*` shows whether an instance of a nullable value type has a value of its underlying type.

- `System.Nullable`1.Value*` gets the value of an underlying type if `System.Nullable`1.HasValue*` is `true`. If `System.Nullable`1.HasValue*` is `false`, the `System.Nullable`1.Value` property throws an `System.InvalidOperationException`.

The following example uses the `HasValue` property to check whether the variable contains a value before displaying it:

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
You can also compare a variable of a nullable value type with `null` instead of using the `HasValue` property, as the following example shows:

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
