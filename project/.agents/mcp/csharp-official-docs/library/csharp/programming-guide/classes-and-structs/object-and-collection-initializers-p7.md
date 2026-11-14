---
title: "Object and collection initializers (part 7 of 20)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/programming-guide/classes-and-structs/object-and-collection-initializers.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Object and collection initializers (part 7 of 20)

## Object initializers with anonymous types

Although you can use object initializers in any context, they're especially useful in Language-Integrated Query (LINQ) expressions. Query expressions frequently use anonymous types, which you can only initialize by using an object initializer, as shown in the following declaration.

```csharp
var pet = new { Age = 10, Name = "Fluffy" };
```

By using anonymous types, the `select` clause in a LINQ query expression can transform objects of the original sequence into objects whose value and shape differ from the original. You might want to store only a part of the information from each object in a sequence. In the following example, assume that a product object (`p`) contains many fields and methods, and that you're only interested in creating a sequence of objects that contain the product name and the unit price.

```csharp
﻿namespace object_collection_initializers;

public class BasicObjectInitializers
{
    public class Cat
    {
        // Automatically implemented properties.
        public int Age { get; set; }
        public string? Name { get; set; }

        public Cat()
        {
        }

        public Cat(string name)
        {
            this.Name = name;
        }
    }

    public class CatOwner
    {
        public IList<Cat> Cats { get; } = new List<Cat>();
    }

    public class Matrix
    {
        private double[,] storage = new double[3, 3];

        public double this[int row, int column]
        {
            // The embedded array will throw out of range exceptions as appropriate.
            get { return storage[row, column]; }
            set { storage[row, column] = value; }
        }
    }

    public class Product
    {
        public string? ProductName { get; set; }
        public decimal UnitPrice { get; set; }
    }

    public static void ObjectInitializerExamples()
    {
        Cat cat = new Cat { Age = 10, Name = "Fluffy" };
        Cat sameCat = new Cat("Fluffy"){ Age = 10 };

        var identity = new Matrix
        {
            [0, 0] = 1.0,
            [0, 1] = 0.0,
            [0, 2] = 0.0,

            [1, 0] = 0.0,
            [1, 1] = 1.0,
            [1, 2] = 0.0,

            [2, 0] = 0.0,
            [2, 1] = 0.0,
            [2, 2] = 1.0,
        };

        var products = new List<Product>();

        var productInfos =
            from p in products
            select new { p.ProductName, p.UnitPrice };

        List<Cat> cats =
        [
            new Cat { Name = "Sylvester", Age = 8 },
            new Cat { Name = "Whiskers", Age = 2 },
            new Cat { Name = "Sasha", Age = 14 }
        ];

        List<Cat?> moreCats = new List<Cat?>
        {
            new Cat{ Name = "Furrytail", Age=5 },
            new Cat{ Name = "Peaches", Age=4 },
            null
        };

        List<Cat> allCats = [.. cats, .. moreCats];

        List<Cat> additionalCats = [.. cats, new Cat { Name = "Furrytail", Age = 5 }, .. moreCats];

        var numbers = new Dictionary<int, string>
        {
            [7] = "seven",
            [9] = "nine",
            [13] = "thirteen"
        };

        var moreNumbers = new Dictionary<int, string>
        {
            {19, "nineteen" },
            {23, "twenty-three" },
            {42, "forty-two" }
        };

        {
            CatOwner owner = new CatOwner
            {
                Cats =
                {
                    new Cat{ Name = "Sylvester", Age=8 },
                    new Cat{ Name = "Whiskers", Age=2 },
                    new Cat{ Name = "Sasha", Age=14 }
                }
            };
        }

        {
            CatOwner owner = new ();
            owner.Cats.Add(new Cat{ Name = "Sylvester", Age=8 });
            owner.Cats.Add(new Cat{ Name = "Whiskers", Age=2 });
            owner.Cats.Add(new Cat{ Name = "Sasha", Age=14 });
        }

        InitializationSample.Main();
        FullExample.Main();
        DictionaryExample.Main();
    }
}

// The following code consolidates examples from the topic.
public class InitializationSample
{
    public class Cat
    {
        // Automatically implemented properties.
        public int Age { get; set; }
        public string? Name { get; set; }

        public Cat() { }

        public Cat(string name)
        {
            Name = name;
        }
    }

    public static void Main()
    {
        Cat cat = new Cat { Age = 10, Name = "Fluffy" };
        Cat sameCat = new Cat("Fluffy"){ Age = 10 };

        List<Cat> cats =
        [
            new Cat { Name = "Sylvester", Age = 8 },
            new Cat { Name = "Whiskers", Age = 2 },
            new Cat { Name = "Sasha", Age = 14 }
        ];

        List<Cat?> moreCats = new List<Cat?>
        {
            new Cat { Name = "Furrytail", Age = 5 },
            new Cat { Name = "Peaches", Age = 4 },
            null
        };

        List<Cat> allCats = [.. cats, new Cat { Name = "Łapka", Age = 5 }, cat, .. moreCats];

        // Display results.
        foreach (Cat? c in allCats)
        {
            if (c != null)
            {
                System.Console.WriteLine(c.Name);
            }
            else
            {
                System.Console.WriteLine("List element has null value.");
            }
        }
    }
    // Output:
    // Sylvester
    // Whiskers
    // Sasha
    // Łapka
    // Fluffy
    // Furrytail
    // Peaches
    // List element has null value.
}

public class FullExample
{
    class FormattedAddresses : IEnumerable<string>
    {
        private List<string> internalList = new();
        public IEnumerator<string> GetEnumerator() => internalList.GetEnumerator();

        System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator() => internalList.GetEnumerator();

        public void Add(string firstname, string lastname,
            string street, string city,
            string state, string zipcode) => internalList.Add($"""
            {firstname} {lastname}
            {street}
            {city}, {state} {zipcode}
            """
            );
    }

    public static void Main()
    {
        FormattedAddresses addresses = new FormattedAddresses()
        {
            {"John", "Doe", "123 Street", "Topeka", "KS", "00000" },
            {"Jane", "Smith", "456 Street", "Topeka", "KS", "00000" }
        };

        Console.WriteLine("Address Entries:");

        foreach (string addressEntry in addresses)
        {
            Console.WriteLine("\r\n" + addressEntry);
        }
    }

    /*
        * Prints:

        Address Entries:

        John Doe
        123 Street
        Topeka, KS 00000

        Jane Smith
        456 Street
        Topeka, KS 00000
        */
}

public class DictionaryExample
{
    class RudimentaryMultiValuedDictionary<TKey, TValue> : IEnumerable<KeyValuePair<TKey, List<TValue>>> where TKey : <example-value>
    {
        private Dictionary<TKey, List<TValue>> internalDictionary = new Dictionary<TKey, List<TValue>>();

        public IEnumerator<KeyValuePair<TKey, List<TValue>>> GetEnumerator() => internalDictionary.GetEnumerator();

        System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator() => internalDictionary.GetEnumerator();

        public List<TValue> this[TKey key]
        {
            get => internalDictionary[key];
            set => Add(key, value);
        }

        public void Add(TKey key, params TValue[] values) => Add(key, (IEnumerable<TValue>)values);

        public void Add(TKey key, IEnumerable<TValue> values)
        {
            if (!internalDictionary.TryGetValue(key, out List<TValue>? storedValues))
            {
                internalDictionary.Add(key, storedValues = new());
            }
            storedValues.AddRange(values);
        }
    }

    public static void Main()
    {
        RudimentaryMultiValuedDictionary<string, string> rudimentaryMultiValuedDictionary1
            = new RudimentaryMultiValuedDictionary<string, string>()
            {
                {"Group1", "Bob", "John", "Mary" },
                {"Group2", "Eric", "Emily", "Debbie", "Jesse" }
            };
        RudimentaryMultiValuedDictionary<string, string> rudimentaryMultiValuedDictionary2
            = new RudimentaryMultiValuedDictionary<string, string>()
            {
                ["Group1"] = new List<string>() { "Bob", "John", "Mary" },
                ["Group2"] = new List<string>() { "Eric", "Emily", "Debbie", "Jesse" }
            };
        RudimentaryMultiValuedDictionary<string, string> rudimentaryMultiValuedDictionary3
            = new RudimentaryMultiValuedDictionary<string, string>()
            {
                {"Group1", new string []{ "Bob", "John", "Mary" } },
                { "Group2", new string[]{ "Eric", "Emily", "Debbie", "Jesse" } }
            };

        Console.WriteLine("Using first multi-valued dictionary created with a collection initializer:");

        foreach (KeyValuePair<string, List<string>> group in rudimentaryMultiValuedDictionary1)
        {
            Console.WriteLine($"\r\nMembers of group {group.Key}: ");

            foreach (string member in group.Value)
            {
                Console.WriteLine(member);
            }
        }

        Console.WriteLine("\r\nUsing second multi-valued dictionary created with a collection initializer using indexing:");

        foreach (KeyValuePair<string, List<string>> group in rudimentaryMultiValuedDictionary2)
        {
            Console.WriteLine($"\r\nMembers of group {group.Key}: ");

            foreach (string member in group.Value)
            {
                Console.WriteLine(member);
            }
        }
        Console.WriteLine("\r\nUsing third multi-valued dictionary created with a collection initializer using indexing:");

        foreach (KeyValuePair<string, List<string>> group in rudimentaryMultiValuedDictionary3)
        {
            Console.WriteLine($"\r\nMembers of group {group.Key}: ");

            foreach (string member in group.Value)
            {
                Console.WriteLine(member);
            }
        }
    }

    /*
        * Prints:

        Using first multi-valued dictionary created with a collection initializer:

        Members of group Group1:
        Bob
        John
        Mary

        Members of group Group2:
        Eric
        Emily
        Debbie
        Jesse

        Using second multi-valued dictionary created with a collection initializer using indexing:

        Members of group Group1:
        Bob
        John
        Mary

        Members of group Group2:
        Eric
        Emily
        Debbie
        Jesse

        Using third multi-valued dictionary created with a collection initializer using indexing:

        Members of group Group1:
        Bob
        John
        Mary

        Members of group Group2:
        Eric
        Emily
        Debbie
        Jesse
        */
}
```
When you execute this query, the `productInfos` variable contains a sequence of objects that you can access in a `foreach` statement as shown in this example:

```csharp
foreach(var p in productInfos){...}
```

Each object in the new anonymous type has two public properties that receive the same names as the properties or fields in the original object. You can also rename a field when you create an anonymous type. The following example renames the `UnitPrice` field to `Price`.

```csharp
select new {p.ProductName, Price = p.UnitPrice};
```

## Object initializers with the `required` modifier

Use the `required` keyword to force callers to set the value of a property or field by using an object initializer. You don't need to set required properties as constructor parameters. The compiler ensures all callers initialize those values.

```csharp
public class Pet
{
    public required int Age;
    public string Name;
}

// `Age` field is necessary to be initialized.
// You don't need to initialize `Name` property
var pet = new Pet() { Age = 10};

// Compiler error:
// Error CS9035 Required member 'Pet.Age' must be set in the object initializer or attribute constructor.
// var pet = new Pet();
```

It's a typical practice to guarantee that your object is properly initialized, especially when you have multiple fields or properties to manage and don't want to include them all in the constructor.

## Object initializers with the `init` accessor

By using an `init` accessor, you can make sure the object doesn't change after initializtion. It helps to restrict the setting of the property value.

```csharp
public class Person
{
    public string FirstName { get; set; }
    public string LastName { get; init; }
}

// The `LastName` property can be set only during initialization. It CAN'T be modified afterwards.
// The `FirstName` property can be modified after initialization.
var pet = new Person() { FirstName = "Joe", LastName = "Doe"};

// You can assign the FirstName property to a different value.
pet.FirstName = "Jane";

// Compiler error:
// Error CS8852  Init - only property or indexer 'Person.LastName' can only be assigned in an object initializer,
//               or on 'this' or 'base' in an instance constructor or an 'init' accessor.
// pet.LastName = "Kowalski";
```

Required init-only properties support immutable structures while allowing natural syntax for users of the type.
