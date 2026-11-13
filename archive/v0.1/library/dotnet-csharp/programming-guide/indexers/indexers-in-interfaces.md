---
title: "Indexers in Interfaces"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/programming-guide/indexers/indexers-in-interfaces.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Indexers in Interfaces (C# Programming Guide)

Indexers can be declared on an interface. Accessors of interface indexers differ from the accessors of class indexers in the following ways:

- Interface accessors don't use modifiers.
- An interface accessor typically doesn't have a body.

The purpose of the accessor is to indicate whether the indexer is read-write, read-only, or write-only. You can provide an implementation for an indexer defined in an interface, but this is rare. Indexers typically define an API to access data fields, and data fields can't be defined in an interface.

The following is an example of an interface indexer accessor:

```csharp
﻿namespace interfaces
{
    public interface ISomeInterface
    {
        //...

        // Indexer declaration:
        string this[int index]
        {
            get;
            set;
        }
    }

    // Indexer on an interface:
    public interface IIndexInterface
    {
        // Indexer declaration:
        int this[int index]
        {
            get;
            set;
        }
    }

    // Implementing the interface.
    class IndexerClass : IIndexInterface
    {
        private int[] arr = new int[100];
        public int this[int index]   // indexer declaration
        {
            // The arr object will throw IndexOutOfRange exception.
            get => arr[index];
            set => arr[index] = value;
        }
    }

    public class Indexers
    {
        public static void Examples()
        {
            IndexerClass test = new IndexerClass();
            System.Random rand = System.Random.Shared;
            // Call the indexer to initialize its elements.
            for (int i = 0; i < 10; i++)
            {
                test[i] = rand.Next();
            }
            for (int i = 0; i < 10; i++)
            {
                System.Console.WriteLine($"Element #{i} = {test[i]}");
            }

            /* Sample output:
                Element #0 = 360877544
                Element #1 = 327058047
                Element #2 = 1913480832
                Element #3 = 1519039937
                Element #4 = 601472233
                Element #5 = 323352310
                Element #6 = 1422639981
                Element #7 = 1797892494
                Element #8 = 875761049
                Element #9 = 393083859
            */
        }
    }
}
```

The signature of an indexer must differ from the signatures of all other indexers declared in the same interface.

## Example

The following example shows how to implement interface indexers.

```csharp
﻿namespace interfaces
{
    public interface ISomeInterface
    {
        //...

        // Indexer declaration:
        string this[int index]
        {
            get;
            set;
        }
    }

    // Indexer on an interface:
    public interface IIndexInterface
    {
        // Indexer declaration:
        int this[int index]
        {
            get;
            set;
        }
    }

    // Implementing the interface.
    class IndexerClass : IIndexInterface
    {
        private int[] arr = new int[100];
        public int this[int index]   // indexer declaration
        {
            // The arr object will throw IndexOutOfRange exception.
            get => arr[index];
            set => arr[index] = value;
        }
    }

    public class Indexers
    {
        public static void Examples()
        {
            IndexerClass test = new IndexerClass();
            System.Random rand = System.Random.Shared;
            // Call the indexer to initialize its elements.
            for (int i = 0; i < 10; i++)
            {
                test[i] = rand.Next();
            }
            for (int i = 0; i < 10; i++)
            {
                System.Console.WriteLine($"Element #{i} = {test[i]}");
            }

            /* Sample output:
                Element #0 = 360877544
                Element #1 = 327058047
                Element #2 = 1913480832
                Element #3 = 1519039937
                Element #4 = 601472233
                Element #5 = 323352310
                Element #6 = 1422639981
                Element #7 = 1797892494
                Element #8 = 875761049
                Element #9 = 393083859
            */
        }
    }
}
```

```csharp
﻿namespace interfaces
{
    public interface ISomeInterface
    {
        //...

        // Indexer declaration:
        string this[int index]
        {
            get;
            set;
        }
    }

    // Indexer on an interface:
    public interface IIndexInterface
    {
        // Indexer declaration:
        int this[int index]
        {
            get;
            set;
        }
    }

    // Implementing the interface.
    class IndexerClass : IIndexInterface
    {
        private int[] arr = new int[100];
        public int this[int index]   // indexer declaration
        {
            // The arr object will throw IndexOutOfRange exception.
            get => arr[index];
            set => arr[index] = value;
        }
    }

    public class Indexers
    {
        public static void Examples()
        {
            IndexerClass test = new IndexerClass();
            System.Random rand = System.Random.Shared;
            // Call the indexer to initialize its elements.
            for (int i = 0; i < 10; i++)
            {
                test[i] = rand.Next();
            }
            for (int i = 0; i < 10; i++)
            {
                System.Console.WriteLine($"Element #{i} = {test[i]}");
            }

            /* Sample output:
                Element #0 = 360877544
                Element #1 = 327058047
                Element #2 = 1913480832
                Element #3 = 1519039937
                Element #4 = 601472233
                Element #5 = 323352310
                Element #6 = 1422639981
                Element #7 = 1797892494
                Element #8 = 875761049
                Element #9 = 393083859
            */
        }
    }
}
```

In the preceding example, you could use the explicit interface member implementation by using the fully qualified name of the interface member. For example

```csharp
string IIndexInterface.this[int index]
{
}
```

However, the fully qualified name is only needed to avoid ambiguity when the class is implementing more than one interface with the same indexer signature. For example, if an `Employee` class is implementing two interfaces, `ICitizen` and `IEmployee`, and both interfaces have the same indexer signature, the explicit interface member implementation is necessary. That is, the following indexer declaration:

```csharp
string IEmployee.this[int index]
{
}
```

Implements the indexer on the `IEmployee` interface, while the following declaration:

```csharp
string ICitizen.this[int index]
{
}
```

Implements the indexer on the `ICitizen` interface.

## See also

- Indexers
- Properties
- Interfaces
