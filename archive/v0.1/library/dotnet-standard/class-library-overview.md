---
title: "Overview of core .NET libraries"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/class-library-overview.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Core .NET libraries overview

.NET APIs include classes, interfaces, delegates, and value types that expedite and optimize the development process and provide access to system functionality. To facilitate interoperability between languages, most .NET types are CLS-compliant and can therefore be used from any programming language whose compiler conforms to the common language specification (CLS).

.NET types are the foundation on which .NET applications, components, and controls are built. .NET includes types that perform the following functions:

- Represent base data types and exceptions.
- Encapsulate data structures.
- Perform I/O.
- Access information about loaded types.
- Invoke .NET security checks.
- Provide data access, rich client-side GUI, and server-controlled, client-side GUI.

.NET provides a rich set of interfaces as well as abstract and concrete (non-abstract) classes. You can use the concrete classes as-is or, in many cases, derive your own classes from them. To use the functionality of an interface, you can either create a class that implements the interface or derive a class from one of the .NET classes that implements the interface.

## Naming conventions

 .NET types use a dot syntax naming scheme to represent a hierarchy. Related types are grouped into namespaces so they can be searched and referenced more easily. The first part of the full name is the namespace name. The last part of the name is the type or member name. For example, `System.Collections.Generic.List<T>` represents the `System.Collections.Generic.List`1` type, which belongs to the `System.Collections.Generic` namespace. The types in `System.Collections.Generic` can be used to work with generic collections.

 This naming scheme makes it easy for library developers who extend .NET to create hierarchical groups of types and name them in a consistent, informative manner. It also allows types to be unambiguously identified by their full name (that is, by their namespace and type name), which prevents type name collisions.

 The use of naming patterns to group related types into namespaces is a useful way to build and document class libraries. However, this naming scheme has no effect on visibility, member access, inheritance, security, or binding. A namespace can be partitioned across multiple assemblies and a single assembly can contain types from multiple namespaces. The assembly provides the formal structure for versioning, deployment, security, loading, and visibility in the common language runtime.

 For more information on namespaces and type names, see Common type system.

## System namespace

The `System` namespace is the root namespace for fundamental types in .NET. This namespace includes classes that represent the base data types used by all applications, for example, `System.Object` (the root of the inheritance hierarchy), `System.Byte`, `System.Char`, `System.Array`, `System.Int32`, and `System.String`.

Many of these types correspond to the primitive data types that a programming language uses. When you write code using .NET types, you can use the corresponding language keyword when a .NET base data type is expected. For more information, see:

- Built-in types (C# reference)
- Primitive types (Visual Basic)
- Basic types (F#)

In addition to the base data types, the `System` namespace contains over 100 classes, ranging from classes that handle exceptions to classes that deal with core runtime concepts, such as garbage collection. The `System` namespace also contains many second-level namespaces.

The .NET API reference documentation provides documentation on each namespace, its types, and their members.

## Data structures

.NET includes a set of data structures that are the workhorses of many .NET apps. These are mostly collections, but also include other types.

- `System.Array` - Represents an array of strongly typed objects that can be accessed by index. Has a fixed size, per its construction.
- `System.Collections.Generic.List`1` - Represents a strongly typed list of objects that can be accessed by index. Is automatically resized as needed.
- `System.Collections.Generic.Dictionary`2` - Represents a collection of values that are indexed by a key. Values can be accessed via key. Is automatically resized as needed.
- `System.Uri` - Provides an object representation of a uniform resource identifier (URI) and easy access to the parts of the URI.
- `System.DateTime` - Represents an instant in time, typically expressed as a date and time of day.

## Utility APIs

.NET includes a set of utility APIs that provide functionality for many important tasks.

- `System.Net.Http.HttpClient` - An API for sending HTTP requests and receiving HTTP responses from a resource identified by a URI.
- `System.Diagnostics.Debug` and `System.Diagnostics.Trace`: An API for writing logging and debugging information during application execution.
- `System.IO.StreamReader` and `System.IO.StreamWriter` - APIs for reading and writing files.
- `System.Text.Json.JsonSerializer` - An API for serializing objects or value types to JSON and deserializing JSON into objects or value types.

## App-model APIs

There are many app models that can be used with .NET, for example:

- ASP.NET Core - A web framework for building web sites and services. Supported on Windows, Linux, and macOS.
- .NET MAUI - An app platform for building native apps that run on Windows, macOS, iOS, and Android using C#.
- Windows Desktop - Includes Windows Presentation Foundation (WPF) and Windows Forms.

## See also

- Runtime libraries overview
- Common type system
- .NET API browser
