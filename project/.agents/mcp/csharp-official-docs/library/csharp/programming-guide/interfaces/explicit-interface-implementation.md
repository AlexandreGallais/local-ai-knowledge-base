---
title: "Explicit Interface Implementation"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/programming-guide/interfaces/explicit-interface-implementation.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Explicit Interface Implementation (C# Programming Guide)

If a class implements two interfaces that contain a member with the same signature, then implementing that member on the class will cause both interfaces to use that member as their implementation. In the following example, all the calls to `Paint` invoke the same method. This first sample defines the types:

_Code sample not included: ~/samples/snippets/csharp/interfaces/ExplicitImplementation.cs._

The following sample calls the methods:

_Code sample not included: ~/samples/snippets/csharp/interfaces/ExplicitImplementation.cs._

But you might not want the same implementation to be called for both interfaces. To call a different implementation depending on which interface is in use, you can implement an interface member explicitly. An explicit interface implementation is a class member that is only called through the specified interface. Name the class member by prefixing it with the name of the interface and a period. For example:

_Code sample not included: ~/samples/snippets/csharp/interfaces/ExplicitImplementation.cs._

The class member `IControl.Paint` is only available through the `IControl` interface, and `ISurface.Paint` is only available through `ISurface`. Both method implementations are separate, and neither are available directly on the class. For example:

_Code sample not included: ~/samples/snippets/csharp/interfaces/ExplicitImplementation.cs._

Explicit implementation is also used to resolve cases where two interfaces each declare different members of the same name such as a property and a method. To implement both interfaces, a class has to use explicit implementation either for the property `P`, or the method `P`, or both, to avoid a compiler error. For example:

_Code sample not included: ~/samples/snippets/csharp/interfaces/ExplicitImplementation.cs._

An explicit interface implementation doesn't have an access modifier since it isn't accessible as a member of the type it's defined in. Instead, it's only accessible when called through an instance of the interface. If you specify an access modifier for an explicit interface implementation, you get compiler error CS0106. For more information, see `interface` (C# Reference).

You can define an implementation for members declared in an interface. If a class inherits a method implementation from an interface, that method is only accessible through a reference of the interface type. The inherited member doesn't appear as part of the public interface. The following sample defines a default implementation for an interface method:

_Code sample not included: ~/samples/snippets/csharp/interfaces/ExplicitImplementation.cs._

The following sample invokes the default implementation:

_Code sample not included: ~/samples/snippets/csharp/interfaces/ExplicitImplementation.cs._

Any class that implements the `IControl` interface can override the default `Paint` method, either as a public method, or as an explicit interface implementation.

## See also

- Object oriented programming
- Interfaces
- Inheritance
