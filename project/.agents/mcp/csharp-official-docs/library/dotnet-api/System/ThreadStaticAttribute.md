---
title: "ThreadStaticAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ThreadStaticAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ThreadStaticAttribute class

Namespace: `System`

```csharp
public class ThreadStaticAttribute : Attribute
```

Indicates that the value of a static field is unique for each thread.

#### Remarks

A `static` field marked with `ThreadStaticAttribute` is not shared between threads. Each executing thread has a separate instance of the field, and independently sets and gets values for that field. If the field is accessed on a different thread, it will contain a different value.

In addition to applying the `ThreadStaticAttribute` attribute to a field, you must also define it as `static` (in C# or F#) or `Shared` (in Visual Basic).

> **Note:**
> Don't specify initial values for fields marked with `ThreadStaticAttribute`. Such initialization occurs only once, when the class constructor executes, and therefore affects only one thread. If you don't specify an initial value, the field will be initialized to its default value if it's a value type, or to `null` if it's a reference type.

Use this attribute as it is, and don't derive from it.

For more information about using attributes, see Attributes.

#### Examples

The following example code demonstrates how to use the `ThreadStaticAttribute` to ensure that a static field is unique to each thread. In the code, each thread assigns a different request ID to the thread-static field and then simulates request processing across multiple method calls.

_Code sample not included: ~/snippets/csharp/System/ThreadStaticAttribute/Overview/threadsafe2a.cs._

## ThreadStaticAttribute.ThreadStaticAttribute() constructor

```csharp
public ThreadStaticAttribute ();
```

Initializes a new instance of the `ThreadStaticAttribute` class.

To be added.
