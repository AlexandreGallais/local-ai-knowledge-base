---
title: "Type conversions, casting, and boxing (part 2 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/fundamentals/types/conversions.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Type conversions, casting, and boxing (part 2 of 2)

## Understand boxing and unboxing

Boxing converts a struct or other value type to `object` or to an implemented interface type. Unboxing extracts the value type from that object reference.

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
Boxing allocates memory on the managed heap, and unboxing requires a type check. In hot paths, avoid unnecessary boxing because it adds allocations and extra work.

## Parse text by using Parse and TryParse

When you convert user input or file content, start with `TryParse`. It avoids exceptions for expected invalid input and makes failure handling explicit. All parsing APIs create a new object or value type instance from the source string; they don't modify the source.

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
Use `Parse` when input is guaranteed to be valid, such as controlled test data. Use `TryParse` for user input, network payloads, and file data.

## Core conversion APIs

Use these APIs most often in everyday code:

- `System.Int32.Parse(System.String)`
- `System.Int32.TryParse*`
- `System.Double.TryParse*`
- `System.Decimal.TryParse*`
- `System.IConvertible`

For advanced conversion behavior and all overloads, review the API reference for the specific target type.

## See also

- Type system overview
- Built-in types and literals
- Pattern matching
- How to safely cast by using pattern matching and the is and as operators
