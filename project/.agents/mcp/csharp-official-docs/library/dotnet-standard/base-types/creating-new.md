---
title: "Creating New Strings (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/creating-new.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Create new strings in .NET

.NET allows strings to be created using simple assignment, and also overloads a class constructor to support string creation using a number of different parameters. .NET also provides several methods in the `System.String` class that create new string objects by combining several strings, arrays of strings, or objects.

## Create strings using assignment

The easiest way to create a new `System.String` object is simply to assign a string literal to a `System.String` object.

## Create strings using a class constructor

You can use overloads of the `System.String` class constructor to create strings from character arrays. You can also create a new string by duplicating a particular character a specified number of times. The `System.String.#ctor(System.ReadOnlySpan{System.Char})` constructor overload accepts a `System.ReadOnlySpan`1` or a stack-allocated `System.Span`1` of characters and avoids allocating an intermediate character array on the managed heap when you build small strings of a known size, although the resulting string instance is still allocated on the managed heap.
