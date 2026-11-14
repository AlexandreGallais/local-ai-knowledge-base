---
title: "new modifier"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/keywords/new-modifier.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# new modifier (C# Reference)

When you use the `new` keyword as a declaration modifier, you explicitly hide a member that a base class provides. When you hide an inherited member, the derived version of the member replaces the base class version. You can hide a member when the base class version is visible in the derived class. The base class version isn't visible if it's marked as `private` or, in some cases, `internal`. Although you can hide `public` or `protected` members without using the `new` modifier, you get a compiler warning. If you use `new` to explicitly hide a member, it suppresses this warning.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

You can also use the `new` keyword to create an instance of a type or as a generic type constraint.

To hide an inherited member, declare it in the derived class by using the same member name, and modify it with the `new` keyword. For example:

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
In this example, `BaseC.Invoke` is hidden by `DerivedC.Invoke`. The field `x` isn't affected because it isn't hidden by a similar name.

Name hiding through inheritance takes one of the following forms:

- Generally, a constant, field, property, or type that you introduce in a class or struct hides all base class members that share its name. However, some special cases exist. For example, if you declare a new field with name `N` to have a type that isn't invocable, and a base type declares `N` to be a method, the new field doesn't hide the base declaration in invocation syntax. For more information, see the Member lookup section of the C# language specification.

- A method that you introduce in a class or struct hides properties, fields, and types that share that name in the base class. It also hides all base class methods that have the same signature.

- An indexer that you introduce in a class or struct hides all base class indexers that have the same signature.

It's an error to use both `new` and override on the same member, because the two modifiers have mutually exclusive meanings. The `new` modifier creates a new member with the same name and causes the original member to become hidden. The `override` modifier extends the implementation for an inherited member.

Using the `new` modifier in a declaration that doesn't hide an inherited member generates a warning.

## Examples

In this example, a base class, `BaseC`, and a derived class, `DerivedC`, use the same field name `x`, which hides the value of the inherited field. The example demonstrates the use of the `new` modifier. It also demonstrates how to access the hidden members of the base class by using their fully qualified names.

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
In this example, a nested class hides a class that has the same name in the base class. The example demonstrates how to use the `new` modifier to eliminate the warning message and how to access the hidden class members by using their fully qualified names.

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
If you remove the `new` modifier, the program still compiles and runs, but you get the following warning:

```text
The keyword new is required on 'MyDerivedC.x' because it hides inherited member 'MyBaseC.x'.
```

## C# language specification

For more information, see The new modifier section of the C# language specification.

## See also

- C# Keywords
- Modifiers
- Versioning with the Override and New Keywords
- Knowing When to Use Override and New Keywords
