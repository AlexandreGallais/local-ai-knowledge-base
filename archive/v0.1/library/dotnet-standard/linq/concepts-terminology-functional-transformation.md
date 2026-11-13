---
title: "Concepts and terminology (functional transformation) - LINQ to XML"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/linq/concepts-terminology-functional-transformation.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Concepts and terminology (functional transformation) (LINQ to XML)

This article introduces the concepts and terminology of pure functional transformations. The functional transformation approach to transforming data yields code that's often quicker to program, more expressive, and easier to debug and maintain than more traditional, imperative programming.

Note that the articles in this section aren't intended to fully explain functional programming. Instead, these articles identify some of the functional programming capabilities that make it easier to transform XML from one shape to another.

## What is pure functional transformation

In *pure functional transformation*, a set of functions, called *pure functions*, define how to transform a set of structured data from its original form into another form. The word "pure" indicates that the functions are *composable*, which requires that they're:

- *Self-contained*, so that they can be freely ordered and rearranged without entanglement or interdependencies with the rest of the program. Pure transformations have no knowledge of or effect upon their environment. That is, the functions used in the transformation have no *side effects*.
- *Stateless*, so that executing the same function or specific set of functions on the same input will always result in the same output. Pure transformations have no memory of their prior use.

> **Important:**
> In the rest of this tutorial, the term "pure function" is used in a general sense to indicate a programming approach, and not a specific language feature.
>
> Note that pure functions must be implemented as methods in C#, and as functions in Visual Basic.
>
> You shouldn't confuse pure functions with pure virtual methods in C++. The latter indicates that the containing class is abstract and that no method body is supplied.

### Functional programming

*Functional programming* is a programming approach that directly supports pure functional transformation.

Historically, general-purpose functional programming languages, such as ML, Scheme, Haskell, and F#, have been primarily of interest to the academic community. Although it has always been possible to write pure functional transformations in C# and Visual Basic, the difficulty of doing so has not made it an attractive option to most programmers. In recent versions of these languages, however, new language constructs such as lambda expressions and type inference make functional programming much easier and more productive.

For more information about functional programming, see Functional programming vs. imperative programming.

#### Domain-specific functional programming languages

Although general functional programming languages haven't been widely adopted, some domain-specific functional programming languages have had better success. For example, Cascading Style Sheets (CSS) are used to determine the look and feel of many web pages, and Extensible Stylesheet Language Transformations (XSLT) style sheets are used extensively in XML data manipulation. For more information about XSLT, see XSLT Transformations.

## Terminology

The following list defines some terms related to functional transformations.

higher-order (first-class) function \
A function that can be treated as a programmatic object. For example, a higher-order function can be passed to or returned from other functions. In C# and Visual Basic, delegates and lambda expressions are language features that support higher-order functions. To write a higher-order function, you declare one or more arguments to take delegates, and you often use lambda expressions when calling it. Many of the standard query operators are higher-order functions.

For more information, see Standard Query Operators Overview (C#) and Standard Query Operators Overview (Visual Basic).

lambda expression \
Essentially, an inline anonymous function that can be used wherever a delegate type is expected. This is a simplified definition of lambda expressions, but it's adequate for the purposes of this tutorial.

For more information, see Lambda expressions (C# Programming Guide) and Lambda Expressions (Visual Basic)).

collection \
A structured set of data, usually of a uniform type. To be compatible with LINQ, a collection must implement the `System.Collections.IEnumerable` interface or the `System.Linq.IQueryable` interface (or one of their generic counterparts, `System.Collections.Generic.IEnumerator`1` or `System.Linq.IQueryable`1`).

tuple (anonymous types) \
A mathematical concept, a tuple is a finite sequence of objects, each of a specific type. A tuple is also known as an ordered list. Tuples and anonymous types are language implementations of this concept, which enable an unnamed type to be declared and an object of that type to be instantiated at the same time.

For more information, see Tuples (C# Language reference), Anonymous Types (C# Programming Guide), and Anonymous Types (Visual Basic).

type inference (implicit typing) \
The ability of a compiler to determine the type of a variable in the absence of an explicit type declaration.

For more information, see Implicitly typed local variables (C# Programming Guide) and Local Type Inference (Visual Basic).

deferred execution and lazy evaluation \
The delaying of evaluation of an expression until its resolved value is actually required. Deferred execution is supported in collections.

For more C# information, see Introduction to LINQ Queries (C#) and Deferred Execution and Lazy Evaluation in LINQ to XML (C#).

For more Visual Basic <example-value>, see Basic Query Operations (Visual Basic) and Deferred Execution and Lazy Evaluation in LINQ to XML (Visual Basic).

These language features will be used in code samples throughout this section.

## See also

- Introduction to pure functional transformations
- Functional programming vs. imperative programming
