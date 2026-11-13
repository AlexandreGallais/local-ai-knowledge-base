---
title: "Generic types and methods (part 5 of 6)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/types/generics.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Generic types and methods (part 5 of 6)

## Type constraints

*Constraints* restrict which type arguments a generic type or method accepts. Constraints let you call methods or access properties on the type parameter that wouldn't be available on `object` alone:

```csharp
List<int> scores = [95, 87, 72, 91];
Dictionary<string, decimal> prices = new()
{
    ["Widget"] = 19.99m,
    ["Gadget"] = 29.99m
};
Task<string> greeting = Task.FromResult("Hello, generics!");
Func<int, bool> isPositive = n => n > 0;

Console.WriteLine($"First score: {scores[0]}");
Console.WriteLine($"Widget price: {prices["Widget"]:C}");
Console.WriteLine($"Greeting: {await greeting}");
Console.WriteLine($"Is 5 positive? {isPositive(5)}");

GenericCollectionsExample();
GenericMethodsExample();
CollectionExpressionsExample();
SpreadOperatorExample();
DictionaryExpressionsExample();
DictionarySpreadExample();
ConstraintsExample();
VarianceExample();
CustomGenericExample();

static void GenericCollectionsExample()
{
    // A strongly typed list of strings
    List<string> names = ["Alice", "Bob", "Carol"];
    names.Add("Dave");
    // names.Add(42); // Compile-time error: can't add an int to List<string>

    // A dictionary mapping string keys to int values
    var inventory = new Dictionary<string, int>
    {
        ["Apples"] = 50,
        ["Oranges"] = 30
    };
    inventory["Bananas"] = 25;

    // A set that prevents duplicates
    HashSet<int> uniqueIds = [1, 2, 3, 1, 2];
    Console.WriteLine($"Unique count: {uniqueIds.Count}"); // 3

    // A FIFO queue
    Queue<string> tasks = new();
    tasks.Enqueue("Build");
    tasks.Enqueue("Test");
    Console.WriteLine($"Next task: {tasks.Dequeue()}"); // Build
}

static void GenericMethodsExample()
{
    static void Print<T>(T value) =>
        Console.WriteLine($"Value: {value}");

    Print(42);        // Compiler infers T as int
    Print("hello");   // Compiler infers T as string
    Print(3.14);      // Compiler infers T as double
}

static void CollectionExpressionsExample()
{
    // Create a list with a collection expression
    List<string> fruits = ["Apple", "Banana", "Cherry"];

    // Create an array
    int[] numbers = [1, 2, 3, 4, 5];

    // Works with any supported collection type
    IReadOnlyList<double> temperatures = [72.0, 68.5, 75.3];

    Console.WriteLine($"Fruits: {string.Join(", ", fruits)}");
    Console.WriteLine($"Numbers: {string.Join(", ", numbers)}");
    Console.WriteLine($"Temps: {string.Join(", ", temperatures)}");
}

static void SpreadOperatorExample()
{
    List<int> first = [1, 2, 3];
    List<int> second = [4, 5, 6];

    // Spread both lists into a new combined list
    List<int> combined = [.. first, .. second];
    Console.WriteLine(string.Join(", ", combined));
    // Output: 1, 2, 3, 4, 5, 6

    // Add extra elements alongside spreads
    List<int> withExtras = [0, .. first, 99, .. second];
    Console.WriteLine(string.Join(", ", withExtras));
    // Output: 0, 1, 2, 3, 99, 4, 5, 6
}

static void DictionaryExpressionsExample()
{
    Dictionary<string, int> scores = new()
    {
        ["Alice"] = 95,
        ["Bob"] = 87,
        ["Carol"] = 92
    };

    foreach (var (name, score) in scores)
    {
        Console.WriteLine($"{name}: {score}");
    }
}

static void DictionarySpreadExample()
{
    Dictionary<string, int> defaults = new()
    {
        ["Timeout"] = 30,
        ["Retries"] = 3
    };
    Dictionary<string, int> overrides = new()
    {
        ["Timeout"] = 60
    };

    // Merge defaults and overrides into a new dictionary
    Dictionary<string, int> config = new(defaults);
    foreach (var (key, value) in overrides)
    {
        config[key] = value;
    }

    Console.WriteLine($"Timeout: {config["Timeout"]}");  // 60
    Console.WriteLine($"Retries: {config["Retries"]}");   // 3
}

static void ConstraintsExample()
{
    static T Max<T>(T a, T b) where T : IComparable<T> =>
        a.CompareTo(b) >= 0 ? a : b;

    Console.WriteLine(Max(3, 7));          // 7
    Console.WriteLine(Max("apple", "banana")); // banana

    static T CreateDefault<T>() where T : new() => new T();

    var list = CreateDefault<List<int>>(); // Creates an empty List<int>
    Console.WriteLine($"Empty list count: {list.Count}"); // 0
}

static void VarianceExample()
{
    // Covariance: IEnumerable<Dog> can be used as IEnumerable<Animal>
    // because IEnumerable<out T> is covariant
    List<Dog> dogs = [new("Rex"), new("Buddy")];
    IEnumerable<Animal> animals = dogs; // Allowed because Dog derives from Animal

    foreach (var animal in animals)
    {
        Console.WriteLine(animal.Name);
    }

    // Contravariance: Action<Animal> can be used as Action<Dog>
    // because Action<in T> is contravariant
    Action<Animal> printAnimal = a => Console.WriteLine($"Animal: {a.Name}");
    Action<Dog> printDog = printAnimal; // Allowed because any Animal handler can handle Dog

    printDog(new Dog("Spot"));
}

static void CustomGenericExample()
{
    var list = new GenericList<int>();
    for (var i = 0; i < 5; i++)
    {
        list.AddHead(i);
    }

    foreach (var item in list)
    {
        Console.Write($"{item} ");
    }
    Console.WriteLine();
    // Output: 4 3 2 1 0
}

public class GenericList<T>
{
    private class Node(T data)
    {
        public T Data { get; set; } = data;
        public Node? Next { get; set; }
    }

    private Node? head;

    public void AddHead(T data)
    {
        var node = new Node(data) { Next = head };
        head = node;
    }

    public IEnumerator<T> GetEnumerator()
    {
        var current = head;
        while (current is not null)
        {
            yield return current.Data;
            current = current.Next;
        }
    }
}

public record Animal(string Name);
public record Dog(string Name) : Animal(Name);
```
The most common constraints are:

| Constraint | Meaning |
|---|---|
| `where T : class` | `T` must be a reference type |
| `where T : struct` | `T` must be a non-nullable value type |
| `where T : new()` | `T` must have a public parameterless constructor |
| `where T : BaseClass` | `T` must derive from `BaseClass` |
| `where T : IInterface` | `T` must implement `IInterface` |

You can combine constraints: `where T : class, IComparable<T>, new()`. Less common constraints include `where T : System.Enum`, `where T : System.Delegate`, and `where T : unmanaged` for specialized scenarios. For the complete list, see Constraints on type parameters.

## Covariance and contravariance

*Covariance* and *contravariance* describe how generic types behave with inheritance. They determine whether you can use a more derived or less derived type argument than originally specified:

```csharp
List<int> scores = [95, 87, 72, 91];
Dictionary<string, decimal> prices = new()
{
    ["Widget"] = 19.99m,
    ["Gadget"] = 29.99m
};
Task<string> greeting = Task.FromResult("Hello, generics!");
Func<int, bool> isPositive = n => n > 0;

Console.WriteLine($"First score: {scores[0]}");
Console.WriteLine($"Widget price: {prices["Widget"]:C}");
Console.WriteLine($"Greeting: {await greeting}");
Console.WriteLine($"Is 5 positive? {isPositive(5)}");

GenericCollectionsExample();
GenericMethodsExample();
CollectionExpressionsExample();
SpreadOperatorExample();
DictionaryExpressionsExample();
DictionarySpreadExample();
ConstraintsExample();
VarianceExample();
CustomGenericExample();

static void GenericCollectionsExample()
{
    // A strongly typed list of strings
    List<string> names = ["Alice", "Bob", "Carol"];
    names.Add("Dave");
    // names.Add(42); // Compile-time error: can't add an int to List<string>

    // A dictionary mapping string keys to int values
    var inventory = new Dictionary<string, int>
    {
        ["Apples"] = 50,
        ["Oranges"] = 30
    };
    inventory["Bananas"] = 25;

    // A set that prevents duplicates
    HashSet<int> uniqueIds = [1, 2, 3, 1, 2];
    Console.WriteLine($"Unique count: {uniqueIds.Count}"); // 3

    // A FIFO queue
    Queue<string> tasks = new();
    tasks.Enqueue("Build");
    tasks.Enqueue("Test");
    Console.WriteLine($"Next task: {tasks.Dequeue()}"); // Build
}

static void GenericMethodsExample()
{
    static void Print<T>(T value) =>
        Console.WriteLine($"Value: {value}");

    Print(42);        // Compiler infers T as int
    Print("hello");   // Compiler infers T as string
    Print(3.14);      // Compiler infers T as double
}

static void CollectionExpressionsExample()
{
    // Create a list with a collection expression
    List<string> fruits = ["Apple", "Banana", "Cherry"];

    // Create an array
    int[] numbers = [1, 2, 3, 4, 5];

    // Works with any supported collection type
    IReadOnlyList<double> temperatures = [72.0, 68.5, 75.3];

    Console.WriteLine($"Fruits: {string.Join(", ", fruits)}");
    Console.WriteLine($"Numbers: {string.Join(", ", numbers)}");
    Console.WriteLine($"Temps: {string.Join(", ", temperatures)}");
}

static void SpreadOperatorExample()
{
    List<int> first = [1, 2, 3];
    List<int> second = [4, 5, 6];

    // Spread both lists into a new combined list
    List<int> combined = [.. first, .. second];
    Console.WriteLine(string.Join(", ", combined));
    // Output: 1, 2, 3, 4, 5, 6

    // Add extra elements alongside spreads
    List<int> withExtras = [0, .. first, 99, .. second];
    Console.WriteLine(string.Join(", ", withExtras));
    // Output: 0, 1, 2, 3, 99, 4, 5, 6
}

static void DictionaryExpressionsExample()
{
    Dictionary<string, int> scores = new()
    {
        ["Alice"] = 95,
        ["Bob"] = 87,
        ["Carol"] = 92
    };

    foreach (var (name, score) in scores)
    {
        Console.WriteLine($"{name}: {score}");
    }
}

static void DictionarySpreadExample()
{
    Dictionary<string, int> defaults = new()
    {
        ["Timeout"] = 30,
        ["Retries"] = 3
    };
    Dictionary<string, int> overrides = new()
    {
        ["Timeout"] = 60
    };

    // Merge defaults and overrides into a new dictionary
    Dictionary<string, int> config = new(defaults);
    foreach (var (key, value) in overrides)
    {
        config[key] = value;
    }

    Console.WriteLine($"Timeout: {config["Timeout"]}");  // 60
    Console.WriteLine($"Retries: {config["Retries"]}");   // 3
}

static void ConstraintsExample()
{
    static T Max<T>(T a, T b) where T : IComparable<T> =>
        a.CompareTo(b) >= 0 ? a : b;

    Console.WriteLine(Max(3, 7));          // 7
    Console.WriteLine(Max("apple", "banana")); // banana

    static T CreateDefault<T>() where T : new() => new T();

    var list = CreateDefault<List<int>>(); // Creates an empty List<int>
    Console.WriteLine($"Empty list count: {list.Count}"); // 0
}

static void VarianceExample()
{
    // Covariance: IEnumerable<Dog> can be used as IEnumerable<Animal>
    // because IEnumerable<out T> is covariant
    List<Dog> dogs = [new("Rex"), new("Buddy")];
    IEnumerable<Animal> animals = dogs; // Allowed because Dog derives from Animal

    foreach (var animal in animals)
    {
        Console.WriteLine(animal.Name);
    }

    // Contravariance: Action<Animal> can be used as Action<Dog>
    // because Action<in T> is contravariant
    Action<Animal> printAnimal = a => Console.WriteLine($"Animal: {a.Name}");
    Action<Dog> printDog = printAnimal; // Allowed because any Animal handler can handle Dog

    printDog(new Dog("Spot"));
}

static void CustomGenericExample()
{
    var list = new GenericList<int>();
    for (var i = 0; i < 5; i++)
    {
        list.AddHead(i);
    }

    foreach (var item in list)
    {
        Console.Write($"{item} ");
    }
    Console.WriteLine();
    // Output: 4 3 2 1 0
}

public class GenericList<T>
{
    private class Node(T data)
    {
        public T Data { get; set; } = data;
        public Node? Next { get; set; }
    }

    private Node? head;

    public void AddHead(T data)
    {
        var node = new Node(data) { Next = head };
        head = node;
    }

    public IEnumerator<T> GetEnumerator()
    {
        var current = head;
        while (current is not null)
        {
            yield return current.Data;
            current = current.Next;
        }
    }
}

public record Animal(string Name);
public record Dog(string Name) : Animal(Name);
```
- **Covariance** (`out T`): An `IEnumerable<Dog>` can be used where `IEnumerable<Animal>` is expected because `Dog` derives from `Animal`. The `out` keyword on the type parameter enables this. Covariant type parameters can only appear in output positions (return types).
- **Contravariance** (`in T`): An `Action<Animal>` can be used where `Action<Dog>` is expected because any action that handles `Animal` can also handle `Dog`. The `in` keyword enables this. Contravariant type parameters can only appear in input positions (parameters).

Many built-in interfaces and delegates are already variant: `IEnumerable<out T>`, `IReadOnlyList<out T>`, `Func<out TResult>`, and `Action<in T>`. You benefit from variance automatically when working with these types. For an in-depth treatment of designing variant interfaces and delegates, see Covariance and contravariance.
