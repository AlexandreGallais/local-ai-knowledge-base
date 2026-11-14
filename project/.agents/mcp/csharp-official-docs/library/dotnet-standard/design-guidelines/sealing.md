---
title: "Sealing"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/design-guidelines/sealing.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Sealing

> **Note:**
> This content is reprinted by permission of Pearson Education, Inc. from *Framework Design Guidelines: Conventions, Idioms, and Patterns for Reusable .NET Libraries, 2nd Edition*. That edition was published in 2008, and the book has since been fully revised in the third edition. Some of the information on this page may be out-of-date.

One of the features of object-oriented frameworks is that developers can extend and customize them in ways unanticipated by the framework designers. This is both the power and danger of extensible design. When you design your framework, it is, therefore, very important to carefully design for extensibility when it is desired, and to limit extensibility when it is dangerous.

 A powerful mechanism that prevents extensibility is sealing. You can seal either the class or individual members. Sealing a class prevents users from inheriting from the class. Sealing a member prevents users from overriding a particular member.

 ❌ DO NOT seal classes without having a good reason to do so.

 Sealing a class because you cannot think of an extensibility scenario is not a good reason. Framework users like to inherit from classes for various non-obvious reasons, like adding convenience members. See Unsealed Classes for examples of non-obvious reasons users want to inherit from a type.

 Good reasons for sealing a class include the following:

- The class is a static class. See Static Class Design.

- The class stores security-sensitive secrets in inherited protected members.

- The class inherits many virtual members and the cost of sealing them individually would outweigh the benefits of leaving the class unsealed.

- The class is an attribute that requires very fast runtime look-up. Sealed attributes have slightly higher performance levels than unsealed ones. See Attributes.

 ❌ DO NOT declare protected or virtual members on sealed types.

 By definition, sealed types cannot be inherited from. This means that protected members on sealed types cannot be called, and virtual methods on sealed types cannot be overridden.

 ✔️ CONSIDER sealing members that you override.

 Problems that can result from introducing virtual members (discussed in Virtual Members) apply to overrides as well, although to a slightly lesser degree. Sealing an override shields you from these problems starting from that point in the inheritance hierarchy.

 *Portions © 2005, 2009 Microsoft Corporation. All rights reserved.*

 *Reprinted by permission of Pearson Education, Inc. from Framework Design Guidelines: Conventions, Idioms, and Patterns for Reusable .NET Libraries, 2nd Edition by Krzysztof Cwalina and Brad Abrams, published Oct 22, 2008 by Addison-Wesley Professional as part of the Microsoft Windows Development Series.*

## See also

- Framework Design Guidelines
- Designing for Extensibility
- Unsealed Classes
