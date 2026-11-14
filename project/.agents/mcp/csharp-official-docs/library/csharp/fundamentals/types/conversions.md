---
title: "Type conversions, casting, and boxing (part 1 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/fundamentals/types/conversions.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Type conversions, casting, and boxing

> **Tip:**
> **New to developing software?** Start with the Get started tutorials first. You practice basic types there before you make conversion choices.
>
> **Experienced in another language?** C# conversions work like most statically typed languages: widening conversions are implicit, narrowing conversions need explicit casts, and parsing text should favor `TryParse` in user-facing code.

When you write C# code, you often convert values from one type to another. For example, you might convert from `int` to `long`, read text and convert it to a number, or cast a base type to a derived type.

Understanding key terms:

- A *conversion* is the process of changing a value from one type to another.
- A *cast* is the explicit syntax for conversion, written with parentheses like `(int)value`.
- An *implicit conversion* is a conversion that happens automatically when the compiler can guarantee it's safe.
- An *explicit cast* is a conversion you write in code, indicating the conversion might lose information or fail.

Match the conversion style to the situation:

- Implicit conversions happen automatically when the compiler can guarantee safety—no syntax required.
- Explicit casts are required when data might be lost or the conversion might fail.
- Pattern matching or `as` applies when you need a safe reference-type conversion that might not succeed.
- Parsing APIs apply when your source value is text.

## Implicit and explicit numeric conversions

An *implicit conversion* always succeeds. An *explicit conversion* might fail or lose information.

```csharp
namespace ConversionsSample;

public interface INamed
{
    string Name { get; }
}

public class Animal;
public class Mammal : Animal, INamed
{
    public string Name { get; init; } = "Mammal";
}

public class Reptile : Animal;

public interface ILabelled
{
    string Label { get; }
}

public readonly struct Packet(int id) : ILabelled
{
    public int Id { get; } = id;
    public string Label => $"P-{Id}";
}

public static class Program
{
    public static void Main()
    {
        ShowNumericConversions();
        ShowReferenceConversions();
        ShowAsOperator();
        ShowBoxingAndUnboxing();
        ShowParseAndTryParse();
    }

    private static void ShowNumericConversions()
    {
        int itemCount = 42;
        long widened = itemCount; // Implicit conversion.

        double average = 19.75;
        int truncated = (int)average; // Explicit cast.

        Console.WriteLine($"widened: {widened}, truncated: {truncated}");
    }

    private static void ShowReferenceConversions()
    {
        Mammal otter = new() { Name = "River otter" };
        Animal animal = otter;           // Derived to base class: always safe.
        INamed named = otter;            // Reference type to implemented interface: always safe.
        object obj = otter;              // Any reference type to object: always safe.

        Console.WriteLine(named.Name);

        Animal knownAnimal = new Mammal { Name = "River otter" };

        if (knownAnimal is Mammal mammal)
        {
            Console.WriteLine($"Pattern match succeeded: {mammal.Name}");
        }

        Animal unknownAnimal = new Reptile();
        Console.WriteLine($"Can treat as mammal: {unknownAnimal is Mammal}");
    }

    private static void ShowAsOperator()
    {
        object boxedMammal = new Mammal { Name = "Sea lion" };
        Mammal? maybeMammal = boxedMammal as Mammal;
        Console.WriteLine(maybeMammal is null ? "Not a mammal" : maybeMammal.Name);

        object boxedReptile = new Reptile();
        Mammal? noMammal = boxedReptile as Mammal;
        Console.WriteLine(noMammal is null ? "Safe null result" : noMammal.Name);
    }

    private static void ShowBoxingAndUnboxing()
    {
        int temperature = 72;
        object boxedTemperature = temperature; // Boxing.
        int unboxedTemperature = (int)boxedTemperature; // Unboxing.

        Packet packet = new(7);
        ILabelled labelledPacket = packet; // Boxing through an interface reference.

        Console.WriteLine($"Unboxed: {unboxedTemperature}, Label: {labelledPacket.Label}");
    }

    private static void ShowParseAndTryParse()
    {
        string textValue = "512";
        int parsed = int.Parse(textValue);

        string userInput = "12x";
        bool parsedSuccessfully = int.TryParse(userInput, out int safeValue);

        Console.WriteLine($"parsed: {parsed}");
        Console.WriteLine(parsedSuccessfully ? $"safe value: {safeValue}" : "Input is not a valid number.");
    }
}
```
An explicit cast tells readers that the conversion might lose information. In the sample, the `double` value is truncated when converted to `int`.

For full conversion tables, see Built-in numeric conversions.

## Convert references

Classes are reference types. Casts on them don't copy data. They change how you view the same object.

Some reference conversions are implicit. The compiler guarantees they're safe. Three situations always produce an implicit reference conversion: assigning a derived class instance to a base class variable (the derived type is a subtype of the base type), assigning a reference type instance to a variable of an interface the type implements, and assigning any reference type to an `object` variable.

```csharp
namespace ConversionsSample;

public interface INamed
{
    string Name { get; }
}

public class Animal;
public class Mammal : Animal, INamed
{
    public string Name { get; init; } = "Mammal";
}

public class Reptile : Animal;

public interface ILabelled
{
    string Label { get; }
}

public readonly struct Packet(int id) : ILabelled
{
    public int Id { get; } = id;
    public string Label => $"P-{Id}";
}

public static class Program
{
    public static void Main()
    {
        ShowNumericConversions();
        ShowReferenceConversions();
        ShowAsOperator();
        ShowBoxingAndUnboxing();
        ShowParseAndTryParse();
    }

    private static void ShowNumericConversions()
    {
        int itemCount = 42;
        long widened = itemCount; // Implicit conversion.

        double average = 19.75;
        int truncated = (int)average; // Explicit cast.

        Console.WriteLine($"widened: {widened}, truncated: {truncated}");
    }

    private static void ShowReferenceConversions()
    {
        Mammal otter = new() { Name = "River otter" };
        Animal animal = otter;           // Derived to base class: always safe.
        INamed named = otter;            // Reference type to implemented interface: always safe.
        object obj = otter;              // Any reference type to object: always safe.

        Console.WriteLine(named.Name);

        Animal knownAnimal = new Mammal { Name = "River otter" };

        if (knownAnimal is Mammal mammal)
        {
            Console.WriteLine($"Pattern match succeeded: {mammal.Name}");
        }

        Animal unknownAnimal = new Reptile();
        Console.WriteLine($"Can treat as mammal: {unknownAnimal is Mammal}");
    }

    private static void ShowAsOperator()
    {
        object boxedMammal = new Mammal { Name = "Sea lion" };
        Mammal? maybeMammal = boxedMammal as Mammal;
        Console.WriteLine(maybeMammal is null ? "Not a mammal" : maybeMammal.Name);

        object boxedReptile = new Reptile();
        Mammal? noMammal = boxedReptile as Mammal;
        Console.WriteLine(noMammal is null ? "Safe null result" : noMammal.Name);
    }

    private static void ShowBoxingAndUnboxing()
    {
        int temperature = 72;
        object boxedTemperature = temperature; // Boxing.
        int unboxedTemperature = (int)boxedTemperature; // Unboxing.

        Packet packet = new(7);
        ILabelled labelledPacket = packet; // Boxing through an interface reference.

        Console.WriteLine($"Unboxed: {unboxedTemperature}, Label: {labelledPacket.Label}");
    }

    private static void ShowParseAndTryParse()
    {
        string textValue = "512";
        int parsed = int.Parse(textValue);

        string userInput = "12x";
        bool parsedSuccessfully = int.TryParse(userInput, out int safeValue);

        Console.WriteLine($"parsed: {parsed}");
        Console.WriteLine(parsedSuccessfully ? $"safe value: {safeValue}" : "Input is not a valid number.");
    }
}
```
Going the other direction, from a base type back to a derived type, requires an explicit check, because the object might not actually be the derived type you expect. Prefer pattern matching so the test and assignment happen together.

```csharp
namespace ConversionsSample;

public interface INamed
{
    string Name { get; }
}

public class Animal;
public class Mammal : Animal, INamed
{
    public string Name { get; init; } = "Mammal";
}

public class Reptile : Animal;

public interface ILabelled
{
    string Label { get; }
}

public readonly struct Packet(int id) : ILabelled
{
    public int Id { get; } = id;
    public string Label => $"P-{Id}";
}

public static class Program
{
    public static void Main()
    {
        ShowNumericConversions();
        ShowReferenceConversions();
        ShowAsOperator();
        ShowBoxingAndUnboxing();
        ShowParseAndTryParse();
    }

    private static void ShowNumericConversions()
    {
        int itemCount = 42;
        long widened = itemCount; // Implicit conversion.

        double average = 19.75;
        int truncated = (int)average; // Explicit cast.

        Console.WriteLine($"widened: {widened}, truncated: {truncated}");
    }

    private static void ShowReferenceConversions()
    {
        Mammal otter = new() { Name = "River otter" };
        Animal animal = otter;           // Derived to base class: always safe.
        INamed named = otter;            // Reference type to implemented interface: always safe.
        object obj = otter;              // Any reference type to object: always safe.

        Console.WriteLine(named.Name);

        Animal knownAnimal = new Mammal { Name = "River otter" };

        if (knownAnimal is Mammal mammal)
        {
            Console.WriteLine($"Pattern match succeeded: {mammal.Name}");
        }

        Animal unknownAnimal = new Reptile();
        Console.WriteLine($"Can treat as mammal: {unknownAnimal is Mammal}");
    }

    private static void ShowAsOperator()
    {
        object boxedMammal = new Mammal { Name = "Sea lion" };
        Mammal? maybeMammal = boxedMammal as Mammal;
        Console.WriteLine(maybeMammal is null ? "Not a mammal" : maybeMammal.Name);

        object boxedReptile = new Reptile();
        Mammal? noMammal = boxedReptile as Mammal;
        Console.WriteLine(noMammal is null ? "Safe null result" : noMammal.Name);
    }

    private static void ShowBoxingAndUnboxing()
    {
        int temperature = 72;
        object boxedTemperature = temperature; // Boxing.
        int unboxedTemperature = (int)boxedTemperature; // Unboxing.

        Packet packet = new(7);
        ILabelled labelledPacket = packet; // Boxing through an interface reference.

        Console.WriteLine($"Unboxed: {unboxedTemperature}, Label: {labelledPacket.Label}");
    }

    private static void ShowParseAndTryParse()
    {
        string textValue = "512";
        int parsed = int.Parse(textValue);

        string userInput = "12x";
        bool parsedSuccessfully = int.TryParse(userInput, out int safeValue);

        Console.WriteLine($"parsed: {parsed}");
        Console.WriteLine(parsedSuccessfully ? $"safe value: {safeValue}" : "Input is not a valid number.");
    }
}
```
Pattern matching keeps the successful cast variable in the smallest practical scope, which improves readability.

If you need a nullable result instead of a conditional branch, use `as`:

```csharp
namespace ConversionsSample;

public interface INamed
{
    string Name { get; }
}

public class Animal;
public class Mammal : Animal, INamed
{
    public string Name { get; init; } = "Mammal";
}

public class Reptile : Animal;

public interface ILabelled
{
    string Label { get; }
}

public readonly struct Packet(int id) : ILabelled
{
    public int Id { get; } = id;
    public string Label => $"P-{Id}";
}

public static class Program
{
    public static void Main()
    {
        ShowNumericConversions();
        ShowReferenceConversions();
        ShowAsOperator();
        ShowBoxingAndUnboxing();
        ShowParseAndTryParse();
    }

    private static void ShowNumericConversions()
    {
        int itemCount = 42;
        long widened = itemCount; // Implicit conversion.

        double average = 19.75;
        int truncated = (int)average; // Explicit cast.

        Console.WriteLine($"widened: {widened}, truncated: {truncated}");
    }

    private static void ShowReferenceConversions()
    {
        Mammal otter = new() { Name = "River otter" };
        Animal animal = otter;           // Derived to base class: always safe.
        INamed named = otter;            // Reference type to implemented interface: always safe.
        object obj = otter;              // Any reference type to object: always safe.

        Console.WriteLine(named.Name);

        Animal knownAnimal = new Mammal { Name = "River otter" };

        if (knownAnimal is Mammal mammal)
        {
            Console.WriteLine($"Pattern match succeeded: {mammal.Name}");
        }

        Animal unknownAnimal = new Reptile();
        Console.WriteLine($"Can treat as mammal: {unknownAnimal is Mammal}");
    }

    private static void ShowAsOperator()
    {
        object boxedMammal = new Mammal { Name = "Sea lion" };
        Mammal? maybeMammal = boxedMammal as Mammal;
        Console.WriteLine(maybeMammal is null ? "Not a mammal" : maybeMammal.Name);

        object boxedReptile = new Reptile();
        Mammal? noMammal = boxedReptile as Mammal;
        Console.WriteLine(noMammal is null ? "Safe null result" : noMammal.Name);
    }

    private static void ShowBoxingAndUnboxing()
    {
        int temperature = 72;
        object boxedTemperature = temperature; // Boxing.
        int unboxedTemperature = (int)boxedTemperature; // Unboxing.

        Packet packet = new(7);
        ILabelled labelledPacket = packet; // Boxing through an interface reference.

        Console.WriteLine($"Unboxed: {unboxedTemperature}, Label: {labelledPacket.Label}");
    }

    private static void ShowParseAndTryParse()
    {
        string textValue = "512";
        int parsed = int.Parse(textValue);

        string userInput = "12x";
        bool parsedSuccessfully = int.TryParse(userInput, out int safeValue);

        Console.WriteLine($"parsed: {parsed}");
        Console.WriteLine(parsedSuccessfully ? $"safe value: {safeValue}" : "Input is not a valid number.");
    }
}
```
Use `as` only with reference types and nullable value types. It returns `null` when conversion fails.
