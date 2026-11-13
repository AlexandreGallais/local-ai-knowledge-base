---
title: "How to articles"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/how-to/index.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to (C#)

In the How to section of the C# Guide, you can find quick answers to common questions. In some cases, articles may be listed in multiple sections. We wanted to make them easy to find for multiple search paths.

## General C# concepts

There are several tips and tricks that are common C# developer practices:

- Initialize objects using an object initializer.
- Use operator overloading.
- Implement and call a custom extension member.
- Create a new method for an `enum` type using extension member.

### Class, record, and struct members

You create classes, records, and structs to implement your program. These techniques are commonly used when writing classes, records, or structs.

- Declare automatically implemented properties.
- Declare and use read/write properties.
- Define constants.
- Override the `ToString` method to provide string output.
- Define abstract properties.
- Use the xml documentation features to document your code.
- Explicitly implement interface members to keep your public interface concise.
- Explicitly implement members of two interfaces.

### Working with collections

These articles help you work with collections of data.

- Initialize a dictionary with a collection initializer.

## Working with strings

Strings are the fundamental data type used to display or manipulate text. These articles demonstrate common practices with strings.

- Compare strings.
- Modify the contents of a string.
- Determine if a string represents a number.
- Use `String.Split` to separate strings.
- Combine multiple strings into one.
- Search for text in a string.

## Convert between types

You may need to convert an object to a different type.

- Determine if a string represents a number.
- Convert between strings that represent hexadecimal numbers and the number.
- Convert a string to a `DateTime`.
- Convert a byte array to an int.
- Convert a string to a number.
- Use pattern matching, the `as` and `is` operators to safely cast to a different type.
- Define custom type conversions.
- Determine if a type is a nullable value type.
- Convert between nullable and non-nullable value types.

## Equality and ordering comparisons

You may create types that define their own rules for equality or define a
natural ordering among objects of that type.

- Test for reference-based equality.
- Define value-based equality for a type.

## Exception handling

.NET programs report that methods did not
successfully complete their work by throwing exceptions. In these articles you'll learn to work
with exceptions.

- Handle exceptions using `try` and `catch`.
- Cleanup resources using `finally` clauses.
- Recover from non-CLS (Common Language Specification) exceptions.

## Delegates and events

Delegates and events provide a capability for strategies that involve
loosely coupled blocks of code.

- Declare, instantiate, and use delegates.
- Combine multicast delegates.

Events provide a mechanism to publish or subscribe to notifications.

- Subscribe and unsubscribe from events.
- Implement events declared in interfaces.
- Conform to .NET guidelines when your code publishes events.
- Raise events defined in base classes from derived classes.
- Implement custom event accessors.

## LINQ practices

LINQ enables you to write code to query any data source that supports the
LINQ query expression pattern. These articles help you understand the pattern
and work with different data sources.

- Query a collection.
- Use `var` in query expressions.
- Return subsets of element properties from a query.
- Write queries with complex filtering.
- Sort elements of a data source.
- Sort elements on multiple keys.
- Control the type of a projection.
- Count occurrences of a value in a source sequence.
- Calculate intermediate values.
- Debug empty query results.
- Add custom methods to LINQ queries.

## Multiple threads and async processing

Modern programs often use asynchronous operations. These articles will help you learn
to use these techniques.

- Improve async performance using `System.Threading.Tasks.Task.WhenAll`.
- Make multiple web requests in parallel using `async` and `await`.
- Use a thread pool.

## Command line args to your program

Typically, C# programs have command line arguments. These articles teach you to access and process
those command line arguments.

- Retrieve all command line arguments with `for`.
