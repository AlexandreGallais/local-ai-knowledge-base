---
title: "Nullable value types in C# (part 1 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/null-safety/nullable-value-types.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Nullable value types: C# Fundamentals

> **Tip:**
> This article is part of the **Fundamentals** section for developers who know at least one programming language and are learning C#. If you're new to programming, start with the Get started tutorials first. For more details, see Nullable value types in the language reference.

A *nullable value type* `T?` represents all values of its underlying value type `T`, plus an additional `null` value. A variable of type `int?` holds any integer or `null` to represent "no value."

Value types such as `int`, `bool`, and `DateTime` can't hold `null` by default. This behavior is efficient and prevents many errors. However, this limitation creates a problem when a value might genuinely be absent. A common scenario is reading from a database: an integer column might contain a number, or it might contain no value at all (`NULL` in SQL). A plain `int` can't represent that absence, but `int?` can.

## Declare a nullable value type

Append `?` to any value type to make it nullable:

```csharp
namespace NullableValueTypesSample;

public static class Program
{
    public static void Main()
    {
        ShowDeclaration();
        ShowPatternMatching();
        ShowHasValue();
        ShowNullCheck();
        ShowGetValueOrDefault();
        ShowNullCoalescing();
        ShowLiftedOperators();
    }

    private static void ShowDeclaration()
    {
        int?    age      = null;    // integer with no value yet
        double? price    = 9.99;    // nullable double with a value
        bool?   isActive = null;    // boolean with no value

        age = 30;                   // assign a value later

        int?[] scores = [100, null, 85, null, 72]; // array with absent entries

        // Suppress unused-variable warnings — these variables are shown for documentation.
        _ = age;
        _ = price;
        _ = isActive;
        _ = scores;
    }

    private static void ShowPatternMatching()
    {
        int? temperature = 72;

        if (temperature is int degrees)
        {
            Console.WriteLine($"Temperature is {degrees}°F.");
        }
        else
        {
            Console.WriteLine("Temperature is not recorded.");
        }
        // Output: Temperature is 72°F.
    }

    private static void ShowHasValue()
    {
        int? count = 42;

        if (count.HasValue)
        {
            Console.WriteLine($"Count is {count.Value}.");
        }
        else
        {
            Console.WriteLine("Count has no value.");
        }
        // Output: Count is 42.
    }

    private static void ShowNullCheck()
    {
        int? quantity = null;

        if (quantity != null)
        {
            Console.WriteLine($"Quantity: {quantity.Value}");
        }
        else
        {
            Console.WriteLine("Quantity is not set.");
        }
        // Output: Quantity is not set.
    }

    private static void ShowGetValueOrDefault()
    {
        int? rating = null;

        int result1 = rating.GetValueOrDefault();    // 0 (default for int)
        int result2 = rating.GetValueOrDefault(-1);  // -1 (specified fallback)

        Console.WriteLine(result1); // 0
        Console.WriteLine(result2); // -1

        rating = 5;
        int result3 = rating.GetValueOrDefault(-1);  // 5 (actual value)
        Console.WriteLine(result3); // 5
    }

    private static void ShowNullCoalescing()
    {
        int? priority = null;

        int effective = priority ?? 0;  // 0 because priority is null
        Console.WriteLine(effective);   // 0

        priority  = 3;
        effective = priority ?? 0;      // 3 because priority has a value
        Console.WriteLine(effective);   // 3
    }

    private static void ShowLiftedOperators()
    {
        int? a = 10;
        int? b = 20;
        int? c = null;

        int? sum     = a + b;   // both non-null: result is 30
        int? product = a * c;   // one operand is null: result is null

        Console.WriteLine(sum);               // 30
        Console.WriteLine(product.HasValue);  // False — null propagates through arithmetic
    }
}
```
The default value of a nullable value type is `null`, not the underlying type's default.

## Check whether a value is present

The recommended way to check a nullable value type and extract its value is with a *type pattern*:

```csharp
namespace NullableValueTypesSample;

public static class Program
{
    public static void Main()
    {
        ShowDeclaration();
        ShowPatternMatching();
        ShowHasValue();
        ShowNullCheck();
        ShowGetValueOrDefault();
        ShowNullCoalescing();
        ShowLiftedOperators();
    }

    private static void ShowDeclaration()
    {
        int?    age      = null;    // integer with no value yet
        double? price    = 9.99;    // nullable double with a value
        bool?   isActive = null;    // boolean with no value

        age = 30;                   // assign a value later

        int?[] scores = [100, null, 85, null, 72]; // array with absent entries

        // Suppress unused-variable warnings — these variables are shown for documentation.
        _ = age;
        _ = price;
        _ = isActive;
        _ = scores;
    }

    private static void ShowPatternMatching()
    {
        int? temperature = 72;

        if (temperature is int degrees)
        {
            Console.WriteLine($"Temperature is {degrees}°F.");
        }
        else
        {
            Console.WriteLine("Temperature is not recorded.");
        }
        // Output: Temperature is 72°F.
    }

    private static void ShowHasValue()
    {
        int? count = 42;

        if (count.HasValue)
        {
            Console.WriteLine($"Count is {count.Value}.");
        }
        else
        {
            Console.WriteLine("Count has no value.");
        }
        // Output: Count is 42.
    }

    private static void ShowNullCheck()
    {
        int? quantity = null;

        if (quantity != null)
        {
            Console.WriteLine($"Quantity: {quantity.Value}");
        }
        else
        {
            Console.WriteLine("Quantity is not set.");
        }
        // Output: Quantity is not set.
    }

    private static void ShowGetValueOrDefault()
    {
        int? rating = null;

        int result1 = rating.GetValueOrDefault();    // 0 (default for int)
        int result2 = rating.GetValueOrDefault(-1);  // -1 (specified fallback)

        Console.WriteLine(result1); // 0
        Console.WriteLine(result2); // -1

        rating = 5;
        int result3 = rating.GetValueOrDefault(-1);  // 5 (actual value)
        Console.WriteLine(result3); // 5
    }

    private static void ShowNullCoalescing()
    {
        int? priority = null;

        int effective = priority ?? 0;  // 0 because priority is null
        Console.WriteLine(effective);   // 0

        priority  = 3;
        effective = priority ?? 0;      // 3 because priority has a value
        Console.WriteLine(effective);   // 3
    }

    private static void ShowLiftedOperators()
    {
        int? a = 10;
        int? b = 20;
        int? c = null;

        int? sum     = a + b;   // both non-null: result is 30
        int? product = a * c;   // one operand is null: result is null

        Console.WriteLine(sum);               // 30
        Console.WriteLine(product.HasValue);  // False — null propagates through arithmetic
    }
}
```
The `is int degrees` pattern matches only when `temperature` is non-null, and it simultaneously binds the value to `degrees`. You get both the null check and the value extraction in one step.

Alternatively, use the `HasValue` and `Value` properties:

```csharp
namespace NullableValueTypesSample;

public static class Program
{
    public static void Main()
    {
        ShowDeclaration();
        ShowPatternMatching();
        ShowHasValue();
        ShowNullCheck();
        ShowGetValueOrDefault();
        ShowNullCoalescing();
        ShowLiftedOperators();
    }

    private static void ShowDeclaration()
    {
        int?    age      = null;    // integer with no value yet
        double? price    = 9.99;    // nullable double with a value
        bool?   isActive = null;    // boolean with no value

        age = 30;                   // assign a value later

        int?[] scores = [100, null, 85, null, 72]; // array with absent entries

        // Suppress unused-variable warnings — these variables are shown for documentation.
        _ = age;
        _ = price;
        _ = isActive;
        _ = scores;
    }

    private static void ShowPatternMatching()
    {
        int? temperature = 72;

        if (temperature is int degrees)
        {
            Console.WriteLine($"Temperature is {degrees}°F.");
        }
        else
        {
            Console.WriteLine("Temperature is not recorded.");
        }
        // Output: Temperature is 72°F.
    }

    private static void ShowHasValue()
    {
        int? count = 42;

        if (count.HasValue)
        {
            Console.WriteLine($"Count is {count.Value}.");
        }
        else
        {
            Console.WriteLine("Count has no value.");
        }
        // Output: Count is 42.
    }

    private static void ShowNullCheck()
    {
        int? quantity = null;

        if (quantity != null)
        {
            Console.WriteLine($"Quantity: {quantity.Value}");
        }
        else
        {
            Console.WriteLine("Quantity is not set.");
        }
        // Output: Quantity is not set.
    }

    private static void ShowGetValueOrDefault()
    {
        int? rating = null;

        int result1 = rating.GetValueOrDefault();    // 0 (default for int)
        int result2 = rating.GetValueOrDefault(-1);  // -1 (specified fallback)

        Console.WriteLine(result1); // 0
        Console.WriteLine(result2); // -1

        rating = 5;
        int result3 = rating.GetValueOrDefault(-1);  // 5 (actual value)
        Console.WriteLine(result3); // 5
    }

    private static void ShowNullCoalescing()
    {
        int? priority = null;

        int effective = priority ?? 0;  // 0 because priority is null
        Console.WriteLine(effective);   // 0

        priority  = 3;
        effective = priority ?? 0;      // 3 because priority has a value
        Console.WriteLine(effective);   // 3
    }

    private static void ShowLiftedOperators()
    {
        int? a = 10;
        int? b = 20;
        int? c = null;

        int? sum     = a + b;   // both non-null: result is 30
        int? product = a * c;   // one operand is null: result is null

        Console.WriteLine(sum);               // 30
        Console.WriteLine(product.HasValue);  // False — null propagates through arithmetic
    }
}
```
Prefer the `is T value` pattern for new code. It introduces a new non-nullable variable scoped to the matched branch, which makes the intent clearer and eliminates any temptation to accidentally use `Value` outside a null check, where it would throw an `System.InvalidOperationException`.

You can also compare directly with `null`:

```csharp
namespace NullableValueTypesSample;

public static class Program
{
    public static void Main()
    {
        ShowDeclaration();
        ShowPatternMatching();
        ShowHasValue();
        ShowNullCheck();
        ShowGetValueOrDefault();
        ShowNullCoalescing();
        ShowLiftedOperators();
    }

    private static void ShowDeclaration()
    {
        int?    age      = null;    // integer with no value yet
        double? price    = 9.99;    // nullable double with a value
        bool?   isActive = null;    // boolean with no value

        age = 30;                   // assign a value later

        int?[] scores = [100, null, 85, null, 72]; // array with absent entries

        // Suppress unused-variable warnings — these variables are shown for documentation.
        _ = age;
        _ = price;
        _ = isActive;
        _ = scores;
    }

    private static void ShowPatternMatching()
    {
        int? temperature = 72;

        if (temperature is int degrees)
        {
            Console.WriteLine($"Temperature is {degrees}°F.");
        }
        else
        {
            Console.WriteLine("Temperature is not recorded.");
        }
        // Output: Temperature is 72°F.
    }

    private static void ShowHasValue()
    {
        int? count = 42;

        if (count.HasValue)
        {
            Console.WriteLine($"Count is {count.Value}.");
        }
        else
        {
            Console.WriteLine("Count has no value.");
        }
        // Output: Count is 42.
    }

    private static void ShowNullCheck()
    {
        int? quantity = null;

        if (quantity != null)
        {
            Console.WriteLine($"Quantity: {quantity.Value}");
        }
        else
        {
            Console.WriteLine("Quantity is not set.");
        }
        // Output: Quantity is not set.
    }

    private static void ShowGetValueOrDefault()
    {
        int? rating = null;

        int result1 = rating.GetValueOrDefault();    // 0 (default for int)
        int result2 = rating.GetValueOrDefault(-1);  // -1 (specified fallback)

        Console.WriteLine(result1); // 0
        Console.WriteLine(result2); // -1

        rating = 5;
        int result3 = rating.GetValueOrDefault(-1);  // 5 (actual value)
        Console.WriteLine(result3); // 5
    }

    private static void ShowNullCoalescing()
    {
        int? priority = null;

        int effective = priority ?? 0;  // 0 because priority is null
        Console.WriteLine(effective);   // 0

        priority  = 3;
        effective = priority ?? 0;      // 3 because priority has a value
        Console.WriteLine(effective);   // 3
    }

    private static void ShowLiftedOperators()
    {
        int? a = 10;
        int? b = 20;
        int? c = null;

        int? sum     = a + b;   // both non-null: result is 30
        int? product = a * c;   // one operand is null: result is null

        Console.WriteLine(sum);               // 30
        Console.WriteLine(product.HasValue);  // False — null propagates through arithmetic
    }
}
```
