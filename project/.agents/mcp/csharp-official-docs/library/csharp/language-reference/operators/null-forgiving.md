---
title: "! (null-forgiving) operator"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/operators/null-forgiving.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ! (null-forgiving) operator (C# reference)

The unary postfix `!` operator is the null-forgiving, or null-suppression, operator. In an enabled nullable annotation context, use the null-forgiving operator to suppress all nullable warnings for the preceding expression. The unary prefix `!` operator is the logical negation operator. The null-forgiving operator has no effect at run time. It only affects the compiler's static flow analysis by changing the null state of the expression. At run time, expression `x!` evaluates to the result of the underlying expression `x`.

For more information about the nullable reference types feature, see Nullable reference types.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

## Examples

One use case for the null-forgiving operator is testing the argument validation logic. For example, consider the following class:

```csharp
﻿using System.Diagnostics.CodeAnalysis;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace operators;

#nullable enable
public class Person
{
    public Person(string name) => Name = name ?? throw new ArgumentNullException(nameof(name));

    public string Name { get; }
}

[TestClass]
public class PersonTests
{
    [TestMethod, ExpectedException(typeof(ArgumentNullException))]
    public void NullNameShouldThrowTest()
    {
        var person = new Person(null!);
    }
}

public static class UseNullForgivingExample
{
    public static void Main()
    {
        Person? p = Find("John");
        if (IsValid(p))
        {
            Console.WriteLine($"Found {p!.Name}");
        }
    }

    public static bool IsValid(Person? person)
        => person is not null && person.Name is not null;

    public static Person? Find(string name) => null;
}

public static class UseAttributeExample
{
    public static void Main()
    {
        Person? p = Find("John");
        if (IsValid(p))
        {
            Console.WriteLine($"Found {p.Name}");
        }
    }

    public static bool IsValid([NotNullWhen(true)] Person? person)
        => person is not null && person.Name is not null;

    public static Person? Find(string name) => null;
}
```
By using the MSTest test framework, you can create the following test for the validation logic in the constructor:

```csharp
﻿using System.Diagnostics.CodeAnalysis;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace operators;

#nullable enable
public class Person
{
    public Person(string name) => Name = name ?? throw new ArgumentNullException(nameof(name));

    public string Name { get; }
}

[TestClass]
public class PersonTests
{
    [TestMethod, ExpectedException(typeof(ArgumentNullException))]
    public void NullNameShouldThrowTest()
    {
        var person = new Person(null!);
    }
}

public static class UseNullForgivingExample
{
    public static void Main()
    {
        Person? p = Find("John");
        if (IsValid(p))
        {
            Console.WriteLine($"Found {p!.Name}");
        }
    }

    public static bool IsValid(Person? person)
        => person is not null && person.Name is not null;

    public static Person? Find(string name) => null;
}

public static class UseAttributeExample
{
    public static void Main()
    {
        Person? p = Find("John");
        if (IsValid(p))
        {
            Console.WriteLine($"Found {p.Name}");
        }
    }

    public static bool IsValid([NotNullWhen(true)] Person? person)
        => person is not null && person.Name is not null;

    public static Person? Find(string name) => null;
}
```
Without the null-forgiving operator, the compiler generates the following warning for the preceding code: `Warning CS8625: Cannot convert null literal to non-nullable reference type`. By using the null-forgiving operator, you inform the compiler that passing `null` is expected and shouldn't generate a warning.

You can also use the null-forgiving operator when you definitely know that an expression can't be `null` but the compiler doesn't recognize that. In the following example, if the `IsValid` method returns `true`, its argument isn't `null` and you can safely dereference it:

```csharp
﻿using System.Diagnostics.CodeAnalysis;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace operators;

#nullable enable
public class Person
{
    public Person(string name) => Name = name ?? throw new ArgumentNullException(nameof(name));

    public string Name { get; }
}

[TestClass]
public class PersonTests
{
    [TestMethod, ExpectedException(typeof(ArgumentNullException))]
    public void NullNameShouldThrowTest()
    {
        var person = new Person(null!);
    }
}

public static class UseNullForgivingExample
{
    public static void Main()
    {
        Person? p = Find("John");
        if (IsValid(p))
        {
            Console.WriteLine($"Found {p!.Name}");
        }
    }

    public static bool IsValid(Person? person)
        => person is not null && person.Name is not null;

    public static Person? Find(string name) => null;
}

public static class UseAttributeExample
{
    public static void Main()
    {
        Person? p = Find("John");
        if (IsValid(p))
        {
            Console.WriteLine($"Found {p.Name}");
        }
    }

    public static bool IsValid([NotNullWhen(true)] Person? person)
        => person is not null && person.Name is not null;

    public static Person? Find(string name) => null;
}
```
Without the null-forgiving operator, the compiler generates the following warning for the `p.Name` code: `Warning CS8602: Dereference of a possibly null reference`.

If you can modify the `IsValid` method, you can use the NotNullWhen attribute to inform the compiler that an argument of the `IsValid` method can't be `null` when the method returns `true`:

```csharp
﻿using System.Diagnostics.CodeAnalysis;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace operators;

#nullable enable
public class Person
{
    public Person(string name) => Name = name ?? throw new ArgumentNullException(nameof(name));

    public string Name { get; }
}

[TestClass]
public class PersonTests
{
    [TestMethod, ExpectedException(typeof(ArgumentNullException))]
    public void NullNameShouldThrowTest()
    {
        var person = new Person(null!);
    }
}

public static class UseNullForgivingExample
{
    public static void Main()
    {
        Person? p = Find("John");
        if (IsValid(p))
        {
            Console.WriteLine($"Found {p!.Name}");
        }
    }

    public static bool IsValid(Person? person)
        => person is not null && person.Name is not null;

    public static Person? Find(string name) => null;
}

public static class UseAttributeExample
{
    public static void Main()
    {
        Person? p = Find("John");
        if (IsValid(p))
        {
            Console.WriteLine($"Found {p.Name}");
        }
    }

    public static bool IsValid([NotNullWhen(true)] Person? person)
        => person is not null && person.Name is not null;

    public static Person? Find(string name) => null;
}
```
In the preceding example, you don't need to use the null-forgiving operator because the compiler has enough information to find out that `p` can't be `null` inside the `if` statement. For more information about the attributes that allow you to provide additional information about the null state of a variable, see Upgrade APIs with attributes to define null expectations.

## C# language specification

For more information, see The null-forgiving operator section of the C# language specification.

## See also

- Remove unnecessary suppression operator (style rule IDE0080)
- C# operators and expressions
- Tutorial: Design with nullable reference types
