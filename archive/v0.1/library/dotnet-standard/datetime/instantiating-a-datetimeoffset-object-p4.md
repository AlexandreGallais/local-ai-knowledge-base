---
title: "Instantiating a DateTimeOffset object (part 4 of 16)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/datetime/instantiating-a-datetimeoffset-object.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Instantiating a DateTimeOffset object (part 4 of 16)

## DateTimeOffset constructors

The `System.DateTimeOffset` type defines six constructors. Four of them correspond directly to `System.DateTime` constructors, with an additional parameter of type `System.TimeSpan` that defines the date and time's offset from UTC. These allow you to define a `System.DateTimeOffset` value based on the value of its individual date and time components. For example, the following code uses these four constructors to instantiate `System.DateTimeOffset` objects with identical values of 5/1/2008 8:06:32 +01:00.
