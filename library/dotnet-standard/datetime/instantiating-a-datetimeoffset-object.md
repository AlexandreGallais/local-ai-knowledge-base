---
title: "Instantiating a DateTimeOffset object (part 1 of 16)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/datetime/instantiating-a-datetimeoffset-object.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Instantiating a DateTimeOffset object

The `System.DateTimeOffset` structure offers a number of ways to create new `System.DateTimeOffset` values. Many of them correspond directly to the methods available for instantiating new `System.DateTime` values, with enhancements that allow you to specify the date and time value's offset from Coordinated Universal Time (UTC). In particular, you can instantiate a `System.DateTimeOffset` value in the following ways:

- By using a date and time literal.

- By calling a `System.DateTimeOffset` constructor.

- By implicitly converting a value to `System.DateTimeOffset` value.

- By parsing the string representation of a date and time.

This topic provides greater detail and code examples that illustrate these methods of instantiating new `System.DateTimeOffset` values.
