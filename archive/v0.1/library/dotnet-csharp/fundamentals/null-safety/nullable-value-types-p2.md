---
title: "Nullable value types in C# (part 2 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/null-safety/nullable-value-types.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Nullable value types in C# (part 2 of 2)

## Get a value with a fallback

When you need a non-nullable value from a nullable, use `GetValueOrDefault` or the null-coalescing `??` operator:

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
The `??` operator is often cleaner inline:

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
Both approaches return the actual value when one is present, and the fallback you specify when it isn't.

## Arithmetic with nullable value types

Arithmetic and comparison operators on nullable value types are *lifted*: when either operand is `null`, the result is `null` rather than an error.

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
Null propagates through arithmetic by default. To prevent a null result from cascading further, extract the value with `??` or `GetValueOrDefault` before you use it in a calculation.

## See also

- Null safety overview
- Null operators
- Nullable value types (language reference)
- Nullable reference types
