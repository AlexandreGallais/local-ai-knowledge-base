---
title: "Attributes"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/design-guidelines/attributes.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Attributes (.NET Framework design guidelines)

> **Note:**
> This content is reprinted by permission of Pearson Education, Inc. from *Framework Design Guidelines: Conventions, Idioms, and Patterns for Reusable .NET Libraries, 2nd Edition*. That edition was published in 2008, and the book has since been fully revised in the third edition. Some of the information on this page may be out-of-date.

`System.Attribute` is a base class used to define custom attributes.

 Attributes are annotations that can be added to programming elements such as assemblies, types, members, and parameters. They are stored in the metadata of the assembly and can be accessed at run time using the reflection APIs. For example, the Framework defines the `System.ObsoleteAttribute`, which can be applied to a type or a member to indicate that the type or member has been deprecated.

 Attributes can have one or more properties that carry additional data related to the attribute. For example, `ObsoleteAttribute` could carry additional information about the release in which a type or a member got deprecated and the description of the new APIs replacing the obsolete API.

 Some properties of an attribute must be specified when the attribute is applied. These are referred to as the required properties or required arguments, because they are represented as positional constructor parameters. For example, the `System.Diagnostics.ConditionalAttribute.ConditionString` property of the `System.Diagnostics.ConditionalAttribute` is a required property.

 Properties that do not necessarily have to be specified when the attribute is applied are called optional properties (or optional arguments). They are represented by settable properties. Compilers provide special syntax to set these properties when an attribute is applied. For example, the `System.AttributeUsageAttribute.Inherited` property represents an optional argument.

 ✔️ DO name custom attribute classes with the suffix "Attribute."

 ✔️ DO apply the `System.AttributeUsageAttribute` to custom attributes.

 ✔️ DO provide settable properties for optional arguments.

 ✔️ DO provide get-only properties for required arguments.

 ✔️ DO provide constructor parameters to initialize properties corresponding to required arguments. Each parameter should have the same name (although with different casing) as the corresponding property.

 ❌ AVOID providing constructor parameters to initialize properties corresponding to the optional arguments.

 In other words, do not have properties that can be set with both a constructor and a setter. This guideline makes very explicit which arguments are optional and which are required, and avoids having two ways of doing the same thing.

 ❌ AVOID overloading custom attribute constructors.

 Having only one constructor clearly communicates to the user which arguments are required and which are optional.

 ✔️ DO seal custom attribute classes, if possible. This makes the look-up for the attribute faster.

 *Portions &copy; 2005, 2009 Microsoft Corporation. All rights reserved.*

 *Reprinted by permission of Pearson Education, Inc. from Framework Design Guidelines: Conventions, Idioms, and Patterns for Reusable .NET Libraries, 2nd Edition by Krzysztof Cwalina and Brad Abrams, published Oct 22, 2008 by Addison-Wesley Professional as part of the Microsoft Windows Development Series.*

## See also

- Framework Design Guidelines
- Usage Guidelines
