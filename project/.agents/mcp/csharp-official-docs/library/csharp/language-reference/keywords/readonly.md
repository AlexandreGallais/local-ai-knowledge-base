---
title: "readonly keyword"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/keywords/readonly.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# readonly (C# reference)

Use the `readonly` keyword as a modifier in five contexts:

- In a field declaration, `readonly` means you can only assign the field during the declaration or in a constructor in the same class. You can assign and reassign a readonly field multiple times within the field declaration and constructor.

  You can't assign a `readonly` field after the constructor finishes. This rule affects value types and reference types differently:

  - Because value types directly contain their data, a field that is a  `readonly` value type is immutable.
  - Because reference types contain a reference to their data, a field that is a `readonly` reference type must always refer to the same object. That object might not be immutable. The `readonly` modifier prevents replacing the field value with a different instance of the reference type. However, the modifier doesn't prevent the instance data of the field from being modified through the read-only field.

  > **Warning:**
  > An externally visible type that contains an externally visible read-only field that is a mutable reference type might be a security vulnerability and might trigger warning CA2104 : "Do not declare read only mutable reference types."

- In a `readonly struct` type definition, `readonly` means the structure type is immutable. For more information, see the `readonly` struct section of the Structure types article.
- In an instance member declaration within a structure type, `readonly` means an instance member doesn't modify the state of the structure. For more information, see the `readonly` instance members section of the Structure types article.
- In a `ref readonly` method return, the `readonly` modifier indicates that the method returns a reference and writes aren't allowed to that reference.
  - To declare a `ref readonly` parameter to a method.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

## Readonly field example

In this example, you can't change the value of the `year` field in the `ChangeYear` method, even though the class constructor assigns a value to it:

```csharp
﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Keywords
{
    class Age
    {
        private readonly int _year;
        Age(int year)
        {
            _year = year;
        }
        void ChangeYear()
        {
            //_year = 1967; // Compile error if uncommented.
        }
    }

    public class SamplePoint
    {
        public int x;
        // Initialize a readonly field
        public readonly int y = 25;
        public readonly int z;

        public SamplePoint()
        {
            // Initialize a readonly instance field
            z = 24;
        }

        public SamplePoint(int p1, int p2, int p3)
        {
            x = p1;
            y = p2;
            z = p3;
        }

        public static void Main()
        {
            SamplePoint p1 = new SamplePoint(11, 21, 32);   // OK
            Console.WriteLine($"p1: x={p1.x}, y={p1.y}, z={p1.z}");
            SamplePoint p2 = new SamplePoint();
            p2.x = 55;   // OK
            Console.WriteLine($"p2: x={p2.x}, y={p2.y}, z={p2.z}");
        }
        /*
         Output:
            p1: x=11, y=21, z=32
            p2: x=55, y=25, z=24
        */
    }

    public static class ReadonlyKeywordExamples
    {
        public static void Examples()
        {
            SamplePoint.Main();
            ReadonlyRefReturns();
        }

        private static readonly SamplePoint s_origin = new SamplePoint(0, 0, 0);
        public static ref readonly SamplePoint Origin => ref s_origin;

        private static void ReadonlyRefReturns()
        {
            Console.WriteLine(Origin);
        }
    }

    public struct ReadonlyRefReadonlyExample
    {
        private int _data;

        public readonly ref readonly int ReadonlyRefReadonly(ref int reference)
        {
            // _data = 1; // Compile error if uncommented.
            return ref reference;
        }
    }
}
```
You can assign a value to a `readonly` field only in the following contexts:

- When you initialize the variable in the declaration, for example:

  ```csharp
  public readonly int y = 5;
  ```

- In an instance constructor of the class that contains the instance field declaration.
- In the static constructor of the class that contains the static field declaration.

These constructor contexts are also the only contexts in which it's valid to pass a `readonly` field as an out or ref parameter.

> **Note:**
> The `readonly` keyword is different from the const keyword. You can only initialize a `const` field at the declaration of the field. You can assign a `readonly` field multiple times in the field declaration and in any constructor. Therefore, `readonly` fields can have different values depending on the constructor used. Also, while a `const` field is a compile-time constant, the `readonly` field can be used for run-time constants as in the following example:
>
> ```csharp
> public static readonly uint timeStamp = (uint)DateTime.Now.Ticks;
> ```

```csharp
﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Keywords
{
    class Age
    {
        private readonly int _year;
        Age(int year)
        {
            _year = year;
        }
        void ChangeYear()
        {
            //_year = 1967; // Compile error if uncommented.
        }
    }

    public class SamplePoint
    {
        public int x;
        // Initialize a readonly field
        public readonly int y = 25;
        public readonly int z;

        public SamplePoint()
        {
            // Initialize a readonly instance field
            z = 24;
        }

        public SamplePoint(int p1, int p2, int p3)
        {
            x = p1;
            y = p2;
            z = p3;
        }

        public static void Main()
        {
            SamplePoint p1 = new SamplePoint(11, 21, 32);   // OK
            Console.WriteLine($"p1: x={p1.x}, y={p1.y}, z={p1.z}");
            SamplePoint p2 = new SamplePoint();
            p2.x = 55;   // OK
            Console.WriteLine($"p2: x={p2.x}, y={p2.y}, z={p2.z}");
        }
        /*
         Output:
            p1: x=11, y=21, z=32
            p2: x=55, y=25, z=24
        */
    }

    public static class ReadonlyKeywordExamples
    {
        public static void Examples()
        {
            SamplePoint.Main();
            ReadonlyRefReturns();
        }

        private static readonly SamplePoint s_origin = new SamplePoint(0, 0, 0);
        public static ref readonly SamplePoint Origin => ref s_origin;

        private static void ReadonlyRefReturns()
        {
            Console.WriteLine(Origin);
        }
    }

    public struct ReadonlyRefReadonlyExample
    {
        private int _data;

        public readonly ref readonly int ReadonlyRefReadonly(ref int reference)
        {
            // _data = 1; // Compile error if uncommented.
            return ref reference;
        }
    }
}
```
In the preceding example, if you use a statement like the following example:

```csharp
p2.y = 66;        // Error
```

you get the compiler error message:

**A readonly field cannot be assigned to (except in a constructor or a variable initializer)**

## Readonly instance members

Use the `readonly` modifier to declare that an instance member doesn't modify the state of a struct.

```csharp
public readonly double Sum()
{
    return X + Y;
}
```
> **Note:**
> For a read/write property, you can add the `readonly` modifier to the `get` accessor. Some `get` accessors perform a calculation and cache the result, rather than simply returning the value of a private field. By adding the `readonly` modifier to the `get` accessor, you guarantee that the `get` accessor doesn't modify the internal state of the object by caching any result.

For more examples, see the `readonly` instance members section of the Structure types article.

## Ref readonly return example

A `readonly` modifier on a `ref return` indicates that the returned reference can't be modified. The following example returns a reference to the origin. It uses the `readonly` modifier to indicate that callers can't modify the origin:

```csharp
﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Keywords
{
    class Age
    {
        private readonly int _year;
        Age(int year)
        {
            _year = year;
        }
        void ChangeYear()
        {
            //_year = 1967; // Compile error if uncommented.
        }
    }

    public class SamplePoint
    {
        public int x;
        // Initialize a readonly field
        public readonly int y = 25;
        public readonly int z;

        public SamplePoint()
        {
            // Initialize a readonly instance field
            z = 24;
        }

        public SamplePoint(int p1, int p2, int p3)
        {
            x = p1;
            y = p2;
            z = p3;
        }

        public static void Main()
        {
            SamplePoint p1 = new SamplePoint(11, 21, 32);   // OK
            Console.WriteLine($"p1: x={p1.x}, y={p1.y}, z={p1.z}");
            SamplePoint p2 = new SamplePoint();
            p2.x = 55;   // OK
            Console.WriteLine($"p2: x={p2.x}, y={p2.y}, z={p2.z}");
        }
        /*
         Output:
            p1: x=11, y=21, z=32
            p2: x=55, y=25, z=24
        */
    }

    public static class ReadonlyKeywordExamples
    {
        public static void Examples()
        {
            SamplePoint.Main();
            ReadonlyRefReturns();
        }

        private static readonly SamplePoint s_origin = new SamplePoint(0, 0, 0);
        public static ref readonly SamplePoint Origin => ref s_origin;

        private static void ReadonlyRefReturns()
        {
            Console.WriteLine(Origin);
        }
    }

    public struct ReadonlyRefReadonlyExample
    {
        private int _data;

        public readonly ref readonly int ReadonlyRefReadonly(ref int reference)
        {
            // _data = 1; // Compile error if uncommented.
            return ref reference;
        }
    }
}
```
The type returned doesn't need to be a `readonly struct`. Any type that `ref` can return can also be returned by `ref readonly`.

## Readonly ref readonly return example

You can also use a `ref readonly return` with `readonly` instance members on `struct` types:

```csharp
public struct ReadonlyRefReadonlyExample
{
    private int _data;

    public readonly ref readonly int ReadonlyRefReadonly(ref int reference)
    {
        // _data = 1; // Compile error if uncommented.
        return ref reference;
    }
}
```
The method essentially returns a `readonly` reference together with the instance member (in this case a method) being `readonly` (not able to modify any instance fields).

## C# language specification

For more information, see the C# Language Specification. The language specification is the definitive source for C# syntax and usage.

## See also

- Add readonly modifier (style rule IDE0044)
- C# Keywords
- Modifiers
- const
- Fields
