---
title: "The namespace keyword"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/keywords/namespace.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# The `namespace` keyword

Use the `namespace` keyword to declare a scope that contains a set of related objects. Use a namespace to organize code elements and to create globally unique types.

```csharp
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;

namespace SampleNamespace
{
    class SampleClass { }

    interface ISampleInterface { }

    struct SampleStruct { }

    enum SampleEnum { a, b }

    delegate void SampleDelegate(int i);

    namespace Nested
    {
        class SampleClass2 { }
    }
}

namespace MyCompany.Proj1
{
    class MyClass
    {
    }
}

namespace MyCompany.Proj1
{
    class MyClass1
    {
    }
}

namespace SomeNameSpace
{
    public class MyClass
    {
        static void Main()
        {
            Nested.NestedNameSpaceClass.SayHello();
        }
    }

    // a nested namespace
    namespace Nested
    {
        public class NestedNameSpaceClass
        {
            public static void SayHello()
            {
                Console.WriteLine("Hello");
            }
        }
    }
}
// Output: Hello
```
*File scoped namespace declarations* enable you to declare that all types in a file are in a single namespace. The following example is similar to the previous example but uses a file scoped namespace declaration:

```csharp
using System;

namespace SampleFileScopedNamespace;

class SampleClass { }

interface ISampleInterface { }

struct SampleStruct { }

enum SampleEnum { a, b }

delegate void SampleDelegate(int i);
```
The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

## Using statements in file-scoped namespaces

When you use *file-scoped namespaces*, the placement of `using` statements affects their scope within the file. File-scoped namespaces lower to the equivalent traditional namespace declaration that ends with a closing bracket at the end of the file. This behavior determines where `using` directives are applied as follows:

- If you place the `using` statements before the file-scoped namespace declaration, they're treated as being outside of the namespace and are interpreted as fully qualified namespaces.
- If you place the `using` statements after the file-scoped namespace declaration, they're scoped within the namespace itself.

For example:

```csharp
// This using is outside the namespace scope, so it applies globally
using System;

namespace SampleNamespace; // File-scoped namespace declaration

// This using is inside the namespace scope
using System.Text;

public class SampleClass
{
    // Class members...
}
```

In the preceding example, `System` is globally accessible, while `System.Text` applies only within `SampleNamespace`.

The preceding example doesn't include a nested namespace. File scoped namespaces can't include more namespace declarations. You can't declare a nested namespace or a second file-scoped namespace:

```csharp
namespace SampleNamespace;

class AnotherSampleClass
{
    public void AnotherSampleMethod()
    {
        System.Console.WriteLine(
            "SampleMethod inside SampleNamespace");
    }
}

namespace AnotherNamespace; // Not allowed!

namespace ANestedNamespace // Not allowed!
{
   // declarations...
}
```

Within a namespace, you can declare zero or more of the following types:

- class
- interface
- struct
- enum
- delegate
- nested namespaces can be declared except in file scoped namespace declarations

The compiler adds a default namespace. This unnamed namespace, sometimes referred to as the global namespace, is present in every file. It contains declarations not included in a declared namespace. Any identifier in the global namespace is available for use in a named namespace.

Namespaces implicitly have public access. For a discussion of the access modifiers you can assign to elements in a namespace, see Access Modifiers.

It's possible to define a namespace in two or more declarations. For example, the following example defines two classes as part of the `MyCompany` namespace:

```csharp
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;

namespace SampleNamespace
{
    class SampleClass { }

    interface ISampleInterface { }

    struct SampleStruct { }

    enum SampleEnum { a, b }

    delegate void SampleDelegate(int i);

    namespace Nested
    {
        class SampleClass2 { }
    }
}

namespace MyCompany.Proj1
{
    class MyClass
    {
    }
}

namespace MyCompany.Proj1
{
    class MyClass1
    {
    }
}

namespace SomeNameSpace
{
    public class MyClass
    {
        static void Main()
        {
            Nested.NestedNameSpaceClass.SayHello();
        }
    }

    // a nested namespace
    namespace Nested
    {
        public class NestedNameSpaceClass
        {
            public static void SayHello()
            {
                Console.WriteLine("Hello");
            }
        }
    }
}
// Output: Hello
```
The following example shows how to call a static method in a nested namespace.

```csharp
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;

namespace SampleNamespace
{
    class SampleClass { }

    interface ISampleInterface { }

    struct SampleStruct { }

    enum SampleEnum { a, b }

    delegate void SampleDelegate(int i);

    namespace Nested
    {
        class SampleClass2 { }
    }
}

namespace MyCompany.Proj1
{
    class MyClass
    {
    }
}

namespace MyCompany.Proj1
{
    class MyClass1
    {
    }
}

namespace SomeNameSpace
{
    public class MyClass
    {
        static void Main()
        {
            Nested.NestedNameSpaceClass.SayHello();
        }
    }

    // a nested namespace
    namespace Nested
    {
        public class NestedNameSpaceClass
        {
            public static void SayHello()
            {
                Console.WriteLine("Hello");
            }
        }
    }
}
// Output: Hello
```
## C# language specification

For more information, see the Namespaces section of the C# language specification.
For more information on file-scoped namespace declarations, see Namespace declarations.

## See also

- Namespace declaration preferences (IDE0160 and IDE0161)
- C# keywords
- using
- using static
- Namespace alias qualifier `::`
- Organize types with namespaces
