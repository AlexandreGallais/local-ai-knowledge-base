---
title: "class keyword"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/keywords/class.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# class (C# Reference)

Declare classes by using the `class` keyword, as shown in the following example:

```csharp
class TestClass
{
    // Methods, properties, fields, events, delegates
    // and nested classes go here.
}
```

C# supports only single inheritance. In other words, a class can inherit implementation from one base class only. However, a class can implement more than one interface.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

For more information on classes, interfaces, and inheritance see the article on inheritance in the fundamentals section.

You can declare classes directly within a namespace. Don't nest these classes within other classes. You can make these classes either `public` or `internal`. By default, classes are `internal`.

You can declare class members, including nested classes, as `public`, `protected internal`, `protected`, `internal`, `private`, or `private protected`. By default, members are `private`.

For more information, see Access Modifiers.

You can declare generic classes that have type parameters. For more information, see Generic Classes.

A class can contain declarations of the following members:

- Constructors
- Constants
- Fields
- Finalizers
- Methods
- Properties
- Indexers
- Operators
- Events
- Delegates
- Classes
- Interfaces
- Structure types
- Enumeration types

## Example

The following example demonstrates declaring class fields, constructors, and methods. It also demonstrates object instantiation and printing instance data. In this example, two classes are declared. The first class, `Child`, contains two private fields (`name` and `age`), two public constructors, and one public method. The second class, `StringTest`, contains `Main`.

```csharp
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace csrefKeywordsMethodParams
{
    class Child
    {
        private int age;
        private string name;

        // Default constructor:
        public Child()
        {
            name = "N/A";
        }

        // Constructor:
        public Child(string name, int age)
        {
            this.name = name;
            this.age = age;
        }

        // Printing method:
        public void PrintChild()
        {
            Console.WriteLine("{0}, {1} years old.", name, age);
        }
    }

    class StringTest
    {
        static void Main()
        {
            // Create objects by using the new operator:
            Child child1 = new Child("Craig", 11);
            Child child2 = new Child("Sally", 10);

            // Create an object using the default constructor:
            Child child3 = new Child();

            // Display results:
            Console.Write("Child #1: ");
            child1.PrintChild();
            Console.Write("Child #2: ");
            child2.PrintChild();
            Console.Write("Child #3: ");
            child3.PrintChild();
        }
    }
    /* Output:
        Child #1: Craig, 11 years old.
        Child #2: Sally, 10 years old.
        Child #3: N/A, 0 years old.
    */

    interface ISampleInterface
    {
        void SampleMethod();
    }

    class ImplementationClass : ISampleInterface
    {
        // Explicit interface member implementation:
        void ISampleInterface.SampleMethod()
        {
            // Method implementation.
        }

        static void Main()
        {
            // Declare an interface instance.
            ISampleInterface obj = new ImplementationClass();

            // Call the member.
            obj.SampleMethod();
        }
    }
}
```
## Comments

You can only access the private fields (`name` and `age`) through the public method of the `Child` class. For example, you can't print the child's name from the `Main` method by using a statement like this:

```csharp
Console.Write(child1.name);   // Error
```

Accessing private members of `Child` from `Main` is only possible if `Main` is a member of the class. Types declared inside a class without an access modifier default to `private`, so the data members in this example are still `private` if the keyword is removed. Finally, for the object created by using the parameterless constructor (`child3`), the `age` field is initialized to zero by default.

## C# language specification

For more information, see the C# Language Specification. The language specification is the definitive source for C# syntax and usage.

## See also

- C# Keywords
- Reference Types
