---
title: "Null operators in C# (part 1 of 6)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/null-safety/null-operators.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# C# null operators

> **Tip:**
> This article is part of the **Fundamentals** section for developers who know at least one programming language and are learning C#. If you're new to programming, start with the Get started tutorials first. For the complete operator reference, see Member access operators and null-coalescing operators in the language reference.

C# provides several operators that make null-safe code concise. Instead of nesting `if (x != null)` guards throughout your code, these operators let you express null-safe access, fallback values, and null tests in a single expression.

This article covers `?.` and `?[]` for null-conditional access, `??` for null-coalescing, `??=` for null-coalescing assignment, and `is null`/`is not null` for null pattern matching.

## Null-conditional member access `?.`

The `?.` operator accesses a member only when the object is non-null. When the object is `null`, the entire expression evaluates to `null` instead of throwing a `System.NullReferenceException`:

```csharp
namespace NullOperatorsSample;

public record Address(string Street, string City, string State);
public record Customer(string Name, Address? Address);
public record Order(string Id, Customer? Customer);

public sealed class AppConfig
{
    public string? Theme { get; set; }
    public string[]? Tags  { get; set; }
}

public static class Program
{
    public static void Main()
    {
        ShowNullConditionalMember();
        ShowNullConditionalMemberChain();
        ShowNullConditionalIndexer();
        ShowNullConditionalChain();
        ShowNullConditionalDelegate();
        ShowNullCoalescing();
        ShowNullCoalescingAssignment();
        ShowNullConditionalAssignment();
        ShowIsNull();
        ShowIsNotNull();
        ShowCombinedPattern();
        ShowNullForgiving();
    }

    private static void ShowNullConditionalMember()
    {
        string? name = null;

        // Without ?., accessing a member on null throws NullReferenceException:
        // int len = name.Length; // throws if name is null

        // ?. returns null instead of throwing:
        int? len = name?.Length;
        Console.WriteLine(len.HasValue); // False

        name = "C#";
        Console.WriteLine(name?.Length); // 2
    }

    private static void ShowNullConditionalMemberChain()
    {
        string? input = null;

        // Chain ?. across multiple method calls — short-circuits at the first null:
        string? upper = input?.Trim()?.ToUpperInvariant();
        Console.WriteLine(upper ?? "(none)"); // (none)

        input = "  hello  ";
        Console.WriteLine(input?.Trim()?.ToUpperInvariant()); // HELLO
    }

    private static void ShowNullConditionalIndexer()
    {
        string[]? tags = null;

        // ?[] accesses an element only when the collection is non-null
        string? first = tags?[0];
        Console.WriteLine(first ?? "(none)"); // (none)

        tags = ["csharp", "dotnet", "nullable"];
        Console.WriteLine(tags?[0]);          // csharp
    }

    private static void ShowNullConditionalChain()
    {
        var order = new Order("ORD-001", null);

        // Each ?. short-circuits when null: Customer is null, so Address and City are never accessed
        string? city = order.Customer?.Address?.City;
        Console.WriteLine(city ?? "(no city)"); // (no city)

        var fullOrder = new Order("ORD-002",
            new Customer("Alice", new Address("123 Main St", "Springfield", "IL")));

        Console.WriteLine(fullOrder.Customer?.Address?.City); // Springfield
    }

    private static void ShowNullConditionalDelegate()
    {
        EventHandler? clicked = null;

        // No subscribers — ?.Invoke does nothing instead of throwing NullReferenceException
        clicked?.Invoke(null, EventArgs.Empty);

        clicked += (_, _) => Console.WriteLine("Button clicked!");

        // With a subscriber — ?.Invoke calls the handler
        clicked?.Invoke(null, EventArgs.Empty);
        // Output: Button clicked!
    }

    private static void ShowNullCoalescing()
    {
        string? username = null;

        // ?? returns the right-hand value when the left-hand is null
        string display = username ?? "Guest";
        Console.WriteLine(display); // Guest

        username = "alice";
        display  = username ?? "Guest";
        Console.WriteLine(display); // alice
    }

    private static void ShowNullCoalescingAssignment()
    {
        List<string>? cache = null;

        // ??= assigns only when the variable is null
        cache ??= LoadData();
        Console.WriteLine(cache.Count); // 3

        // cache is already non-null, so LoadData() isn't called again
        cache ??= LoadData();
        Console.WriteLine(cache.Count); // 3

        static List<string> LoadData() => ["alpha", "beta", "gamma"];
    }

    private static void ShowNullConditionalAssignment()
    {
        AppConfig? config = new AppConfig();

        // Assigns only when config is non-null (C# 14)
        config?.Theme = "dark";
        Console.WriteLine(config?.Theme); // dark

        AppConfig? missing = null;
        missing?.Theme = "light";                         // no-op: missing is null
        Console.WriteLine(missing?.Theme ?? "(no config)"); // (no config)
    }

    private static void ShowIsNull()
    {
        string? input = null;

        // is null is the preferred test — unaffected by operator overloading
        if (input is null)
        {
            Console.WriteLine("No input provided.");
        }

        // == null also works, but a custom == operator can change its behavior
        if (input == null)
        {
            Console.WriteLine("Still no input.");
        }
    }

    private static void ShowIsNotNull()
    {
        string? value = "hello";

        if (value is not null)
        {
            Console.WriteLine(value.ToUpper()); // HELLO
        }
    }

    private static void ShowCombinedPattern()
    {
        Order? order = GetPendingOrder();

        // Chain ?. for safe traversal, ?? for a fallback, is null for a clear guard
        string city = order?.Customer?.Address?.City ?? "unknown";

        if (order is null)
        {
            Console.WriteLine("No pending order.");
        }
        else
        {
            Console.WriteLine($"Shipping to: {city}");
        }
        // Output: No pending order.
    }

    private static void ShowNullForgiving()
    {
        string? name = FindUser("alice");

        // Use ! only when you have information the compiler doesn't.
        // FindUser guarantees a non-null result for known usernames.
        int length = name!.Length;
        Console.WriteLine(length); // 5
    }

    private static Order? GetPendingOrder() => null;

    private static string? FindUser(string username) =>
        username == "alice" ? "alice" : null;
}
```
The `?.` operator *short-circuits*: when the left-hand side is `null`, everything to the right is skipped. No method calls run and no side effects occur.

You can chain multiple `?.` operators in a single expression. The chain stops at the first `null` it encounters:

```csharp
namespace NullOperatorsSample;

public record Address(string Street, string City, string State);
public record Customer(string Name, Address? Address);
public record Order(string Id, Customer? Customer);

public sealed class AppConfig
{
    public string? Theme { get; set; }
    public string[]? Tags  { get; set; }
}

public static class Program
{
    public static void Main()
    {
        ShowNullConditionalMember();
        ShowNullConditionalMemberChain();
        ShowNullConditionalIndexer();
        ShowNullConditionalChain();
        ShowNullConditionalDelegate();
        ShowNullCoalescing();
        ShowNullCoalescingAssignment();
        ShowNullConditionalAssignment();
        ShowIsNull();
        ShowIsNotNull();
        ShowCombinedPattern();
        ShowNullForgiving();
    }

    private static void ShowNullConditionalMember()
    {
        string? name = null;

        // Without ?., accessing a member on null throws NullReferenceException:
        // int len = name.Length; // throws if name is null

        // ?. returns null instead of throwing:
        int? len = name?.Length;
        Console.WriteLine(len.HasValue); // False

        name = "C#";
        Console.WriteLine(name?.Length); // 2
    }

    private static void ShowNullConditionalMemberChain()
    {
        string? input = null;

        // Chain ?. across multiple method calls — short-circuits at the first null:
        string? upper = input?.Trim()?.ToUpperInvariant();
        Console.WriteLine(upper ?? "(none)"); // (none)

        input = "  hello  ";
        Console.WriteLine(input?.Trim()?.ToUpperInvariant()); // HELLO
    }

    private static void ShowNullConditionalIndexer()
    {
        string[]? tags = null;

        // ?[] accesses an element only when the collection is non-null
        string? first = tags?[0];
        Console.WriteLine(first ?? "(none)"); // (none)

        tags = ["csharp", "dotnet", "nullable"];
        Console.WriteLine(tags?[0]);          // csharp
    }

    private static void ShowNullConditionalChain()
    {
        var order = new Order("ORD-001", null);

        // Each ?. short-circuits when null: Customer is null, so Address and City are never accessed
        string? city = order.Customer?.Address?.City;
        Console.WriteLine(city ?? "(no city)"); // (no city)

        var fullOrder = new Order("ORD-002",
            new Customer("Alice", new Address("123 Main St", "Springfield", "IL")));

        Console.WriteLine(fullOrder.Customer?.Address?.City); // Springfield
    }

    private static void ShowNullConditionalDelegate()
    {
        EventHandler? clicked = null;

        // No subscribers — ?.Invoke does nothing instead of throwing NullReferenceException
        clicked?.Invoke(null, EventArgs.Empty);

        clicked += (_, _) => Console.WriteLine("Button clicked!");

        // With a subscriber — ?.Invoke calls the handler
        clicked?.Invoke(null, EventArgs.Empty);
        // Output: Button clicked!
    }

    private static void ShowNullCoalescing()
    {
        string? username = null;

        // ?? returns the right-hand value when the left-hand is null
        string display = username ?? "Guest";
        Console.WriteLine(display); // Guest

        username = "alice";
        display  = username ?? "Guest";
        Console.WriteLine(display); // alice
    }

    private static void ShowNullCoalescingAssignment()
    {
        List<string>? cache = null;

        // ??= assigns only when the variable is null
        cache ??= LoadData();
        Console.WriteLine(cache.Count); // 3

        // cache is already non-null, so LoadData() isn't called again
        cache ??= LoadData();
        Console.WriteLine(cache.Count); // 3

        static List<string> LoadData() => ["alpha", "beta", "gamma"];
    }

    private static void ShowNullConditionalAssignment()
    {
        AppConfig? config = new AppConfig();

        // Assigns only when config is non-null (C# 14)
        config?.Theme = "dark";
        Console.WriteLine(config?.Theme); // dark

        AppConfig? missing = null;
        missing?.Theme = "light";                         // no-op: missing is null
        Console.WriteLine(missing?.Theme ?? "(no config)"); // (no config)
    }

    private static void ShowIsNull()
    {
        string? input = null;

        // is null is the preferred test — unaffected by operator overloading
        if (input is null)
        {
            Console.WriteLine("No input provided.");
        }

        // == null also works, but a custom == operator can change its behavior
        if (input == null)
        {
            Console.WriteLine("Still no input.");
        }
    }

    private static void ShowIsNotNull()
    {
        string? value = "hello";

        if (value is not null)
        {
            Console.WriteLine(value.ToUpper()); // HELLO
        }
    }

    private static void ShowCombinedPattern()
    {
        Order? order = GetPendingOrder();

        // Chain ?. for safe traversal, ?? for a fallback, is null for a clear guard
        string city = order?.Customer?.Address?.City ?? "unknown";

        if (order is null)
        {
            Console.WriteLine("No pending order.");
        }
        else
        {
            Console.WriteLine($"Shipping to: {city}");
        }
        // Output: No pending order.
    }

    private static void ShowNullForgiving()
    {
        string? name = FindUser("alice");

        // Use ! only when you have information the compiler doesn't.
        // FindUser guarantees a non-null result for known usernames.
        int length = name!.Length;
        Console.WriteLine(length); // 5
    }

    private static Order? GetPendingOrder() => null;

    private static string? FindUser(string username) =>
        username == "alice" ? "alice" : null;
}
```
