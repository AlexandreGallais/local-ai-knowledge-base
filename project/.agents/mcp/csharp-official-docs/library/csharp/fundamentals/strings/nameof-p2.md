---
title: "The nameof operator in C# (part 2 of 4)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/fundamentals/strings/nameof.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# The nameof operator in C# (part 2 of 4)

## Argument validation

The classic use is producing the parameter name in a thrown exception. Pass `nameof(parameter)` instead of the literal string `"parameter"` so a future rename can't leave the message lying:

```csharp
using System.ComponentModel;
using System.Diagnostics.CodeAnalysis;
using System.Runtime.CompilerServices;

namespace NameofSample;

public static class Program
{
    public static void Main()
    {
        ShowBasic();
        ShowGuardClause();
        ShowThrowIfNull();
        ShowPropertyChanged();
        ShowAttributeUsage();
        ShowUnboundGenerics();
        ShowQualifiedName();
    }

    private static void ShowBasic()
    {
        // nameof produces the textual identifier of a symbol at compile time.
        Console.WriteLine(nameof(Customer));        // Customer
        Console.WriteLine(nameof(Customer.Name));   // Name

        var customer = new Customer("Ada");
        Console.WriteLine(nameof(customer));        // customer
        Console.WriteLine(nameof(customer.Name));   // Name
    }

    private static void ShowGuardClause()
    {
        try
        {
            Greet("");
        }
        catch (ArgumentException ex)
        {
            // The exception's ParamName is the literal "name", produced by nameof at compile time.
            Console.WriteLine($"{ex.ParamName}: {ex.Message}");
        }

        static void Greet(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentException("Name must be non-empty.", nameof(name));
            }
            Console.WriteLine($"Hello, {name}!");
        }
    }

    private static void ShowThrowIfNull()
    {
        // ArgumentNullException.ThrowIfNull captures the argument's name automatically
        // through [CallerArgumentExpression], so a separate nameof isn't required for
        // the null check. Use nameof for cases the helpers don't cover.
        Customer? maybeCustomer = null;

        try
        {
            Save(maybeCustomer);
        }
        catch (ArgumentNullException ex)
        {
            Console.WriteLine(ex.ParamName);   // customer
        }

        static void Save(Customer? customer)
        {
            ArgumentNullException.ThrowIfNull(customer);
            // ...
        }
    }

    private static void ShowPropertyChanged()
    {
        var person = new Person();
        person.PropertyChanged += (_, e) => Console.WriteLine($"changed: {e.PropertyName}");

        person.Name = "Ada";    // changed: Name
        person.Name = "Grace";  // changed: Name
    }

    private static void ShowAttributeUsage()
    {
        // nameof works inside attribute arguments. The compiler resolves the
        // identifier even when the attribute targets a method or its parameters.
        Console.WriteLine(NormalizeOrNull("  hi  ") ?? "<null>");   // hi
        Console.WriteLine(NormalizeOrNull(null) ?? "<null>");        // <null>

        [return: NotNullIfNotNull(nameof(input))]
        static string? NormalizeOrNull(string? input) => input?.Trim();
    }

    private static void ShowUnboundGenerics()
    {
        // Beginning in C# 14, nameof accepts an unbound generic type.
        // The result is the simple type name without any type-argument list.
        Console.WriteLine(nameof(List<>));                  // List
        Console.WriteLine(nameof(Dictionary<,>));           // Dictionary
    }

    private static void ShowQualifiedName()
    {
        // For a qualified expression, nameof returns only the final identifier.
        Console.WriteLine(nameof(System.Collections.Generic.List<int>)); // List
        Console.WriteLine(nameof(Customer.Name));                        // Name
    }
}

public sealed record Customer(string Name);

public sealed class Person : INotifyPropertyChanged
{
    private string _name = "";

    public string Name
    {
        get => _name;
        set
        {
            if (_name == value) return;
            _name = value;
            // nameof keeps the property name and the change notification in sync.
            // Renaming the property automatically updates this argument.
            OnPropertyChanged(nameof(Name));
        }
    }

    public event PropertyChangedEventHandler? PropertyChanged;

    private void OnPropertyChanged([CallerMemberName] string? propertyName = null) =>
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
}
```
For null checks specifically, prefer using exception helpers. These helpers, such as `System.ArgumentNullException.ThrowIfNull*`, capture the argument's name automatically through `System.Runtime.CompilerServices.CallerArgumentExpressionAttribute`, so a separate `nameof` isn't needed:

```csharp
using System.ComponentModel;
using System.Diagnostics.CodeAnalysis;
using System.Runtime.CompilerServices;

namespace NameofSample;

public static class Program
{
    public static void Main()
    {
        ShowBasic();
        ShowGuardClause();
        ShowThrowIfNull();
        ShowPropertyChanged();
        ShowAttributeUsage();
        ShowUnboundGenerics();
        ShowQualifiedName();
    }

    private static void ShowBasic()
    {
        // nameof produces the textual identifier of a symbol at compile time.
        Console.WriteLine(nameof(Customer));        // Customer
        Console.WriteLine(nameof(Customer.Name));   // Name

        var customer = new Customer("Ada");
        Console.WriteLine(nameof(customer));        // customer
        Console.WriteLine(nameof(customer.Name));   // Name
    }

    private static void ShowGuardClause()
    {
        try
        {
            Greet("");
        }
        catch (ArgumentException ex)
        {
            // The exception's ParamName is the literal "name", produced by nameof at compile time.
            Console.WriteLine($"{ex.ParamName}: {ex.Message}");
        }

        static void Greet(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentException("Name must be non-empty.", nameof(name));
            }
            Console.WriteLine($"Hello, {name}!");
        }
    }

    private static void ShowThrowIfNull()
    {
        // ArgumentNullException.ThrowIfNull captures the argument's name automatically
        // through [CallerArgumentExpression], so a separate nameof isn't required for
        // the null check. Use nameof for cases the helpers don't cover.
        Customer? maybeCustomer = null;

        try
        {
            Save(maybeCustomer);
        }
        catch (ArgumentNullException ex)
        {
            Console.WriteLine(ex.ParamName);   // customer
        }

        static void Save(Customer? customer)
        {
            ArgumentNullException.ThrowIfNull(customer);
            // ...
        }
    }

    private static void ShowPropertyChanged()
    {
        var person = new Person();
        person.PropertyChanged += (_, e) => Console.WriteLine($"changed: {e.PropertyName}");

        person.Name = "Ada";    // changed: Name
        person.Name = "Grace";  // changed: Name
    }

    private static void ShowAttributeUsage()
    {
        // nameof works inside attribute arguments. The compiler resolves the
        // identifier even when the attribute targets a method or its parameters.
        Console.WriteLine(NormalizeOrNull("  hi  ") ?? "<null>");   // hi
        Console.WriteLine(NormalizeOrNull(null) ?? "<null>");        // <null>

        [return: NotNullIfNotNull(nameof(input))]
        static string? NormalizeOrNull(string? input) => input?.Trim();
    }

    private static void ShowUnboundGenerics()
    {
        // Beginning in C# 14, nameof accepts an unbound generic type.
        // The result is the simple type name without any type-argument list.
        Console.WriteLine(nameof(List<>));                  // List
        Console.WriteLine(nameof(Dictionary<,>));           // Dictionary
    }

    private static void ShowQualifiedName()
    {
        // For a qualified expression, nameof returns only the final identifier.
        Console.WriteLine(nameof(System.Collections.Generic.List<int>)); // List
        Console.WriteLine(nameof(Customer.Name));                        // Name
    }
}

public sealed record Customer(string Name);

public sealed class Person : INotifyPropertyChanged
{
    private string _name = "";

    public string Name
    {
        get => _name;
        set
        {
            if (_name == value) return;
            _name = value;
            // nameof keeps the property name and the change notification in sync.
            // Renaming the property automatically updates this argument.
            OnPropertyChanged(nameof(Name));
        }
    }

    public event PropertyChangedEventHandler? PropertyChanged;

    private void OnPropertyChanged([CallerMemberName] string? propertyName = null) =>
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
}
```
Use `nameof` for the cases the helpers don't cover: `System.ArgumentException`, `System.ArgumentOutOfRangeException` (when validating something other than a single argument), and other guard messages.
