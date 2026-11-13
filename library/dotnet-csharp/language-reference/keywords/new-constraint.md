---
title: "new constraint"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/keywords/new-constraint.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# new constraint (C# Reference)

The `new` constraint specifies that a type argument in a generic class or method declaration must have a public parameterless constructor. To use the `new` constraint, the type can't be abstract.

Apply the `new` constraint to a type parameter when a generic class creates new instances of the type, as shown in the following example:

```csharp
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KeywordsUberProject
{
    class ItemFactory<T> where T : new()
    {
        public T GetNewItem()
        {
            return new T();
        }
    }

    public class ItemFactory2<T>
        where T : IComparable, new()
    {  }

    public class BaseC
    {
        public int x;
        public void Invoke() { }
    }
    public class DerivedC : BaseC
    {
        new public void Invoke() { }
    }

    namespace newModifier //to allow reuse of BaseC and DerivedC
    {
        public class BaseC
        {
            public static int x = 55;
            public static int y = 22;
        }

        public class DerivedC : BaseC
        {
            // Hide field 'x'.
            new public static int x = 100;

            static void Main()
            {
                // Display the new value of x:
                Console.WriteLine(x);

                // Display the hidden value of x:
                Console.WriteLine(BaseC.x);

                // Display the unhidden member y:
                Console.WriteLine(y);
            }
        }
        /*
        Output:
        100
        55
        22
        */

    namespace newModifier2
    {
    public class BaseC
    {
        public class NestedC
        {
            public int x = 200;
            public int y;
        }
    }

    public class DerivedC : BaseC
    {
        // Nested type hiding the base type members.
        new public class NestedC
        {
            public int x = 100;
            public int y;
            public int z;
        }

        static void Main()
        {
            // Creating an object from the overlapping class:
            NestedC c1  = new NestedC();

            // Creating an object from the hidden class:
            BaseC.NestedC c2 = new BaseC.NestedC();

            Console.WriteLine(c1.x);
            Console.WriteLine(c2.x);
        }
    }
    /*
    Output:
    100
    200
    */
        }
    }
}
```
When you use the `new()` constraint with other constraints, you must specify it last:

```csharp
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KeywordsUberProject
{
    class ItemFactory<T> where T : new()
    {
        public T GetNewItem()
        {
            return new T();
        }
    }

    public class ItemFactory2<T>
        where T : IComparable, new()
    {  }

    public class BaseC
    {
        public int x;
        public void Invoke() { }
    }
    public class DerivedC : BaseC
    {
        new public void Invoke() { }
    }

    namespace newModifier //to allow reuse of BaseC and DerivedC
    {
        public class BaseC
        {
            public static int x = 55;
            public static int y = 22;
        }

        public class DerivedC : BaseC
        {
            // Hide field 'x'.
            new public static int x = 100;

            static void Main()
            {
                // Display the new value of x:
                Console.WriteLine(x);

                // Display the hidden value of x:
                Console.WriteLine(BaseC.x);

                // Display the unhidden member y:
                Console.WriteLine(y);
            }
        }
        /*
        Output:
        100
        55
        22
        */

    namespace newModifier2
    {
    public class BaseC
    {
        public class NestedC
        {
            public int x = 200;
            public int y;
        }
    }

    public class DerivedC : BaseC
    {
        // Nested type hiding the base type members.
        new public class NestedC
        {
            public int x = 100;
            public int y;
            public int z;
        }

        static void Main()
        {
            // Creating an object from the overlapping class:
            NestedC c1  = new NestedC();

            // Creating an object from the hidden class:
            BaseC.NestedC c2 = new BaseC.NestedC();

            Console.WriteLine(c1.x);
            Console.WriteLine(c2.x);
        }
    }
    /*
    Output:
    100
    200
    */
        }
    }
}
```
For more information, see Constraints on Type Parameters.

You can also use the `new` keyword to create an instance of a type or as a member declaration modifier.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

## C# language specification

For more information, see the Type parameter constraints section of the C# language specification.

## See also

- C# Keywords
- Generics
