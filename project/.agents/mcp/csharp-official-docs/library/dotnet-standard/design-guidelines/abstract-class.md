---
title: "Abstract Class Design"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/design-guidelines/abstract-class.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Abstract Class Design

> **Note:**
> This content is reprinted by permission of Pearson Education, Inc. from *Framework Design Guidelines: Conventions, Idioms, and Patterns for Reusable .NET Libraries, 2nd Edition*. That edition was published in 2008, and the book has since been fully revised in the third edition. Some of the information on this page may be out-of-date.

❌ DO NOT define public or protected internal constructors in abstract types.

 Constructors should be public only if users will need to create instances of the type. Because you cannot create instances of an abstract type, an abstract type with a public constructor is incorrectly designed and misleading to the users.

 ✔️ DO define a protected or an internal constructor in abstract classes.

 A protected constructor is more common and simply allows the base class to do its own initialization when subtypes are created.

 An internal constructor can be used to limit concrete implementations of the abstract class to the assembly defining the class.

 ✔️ DO provide at least one concrete type that inherits from each abstract class that you ship.

 Doing this helps to validate the design of the abstract class. For example,  `System.IO.FileStream` is an implementation of the `System.IO.Stream` abstract class.

 *Portions © 2005, 2009 Microsoft Corporation. All rights reserved.*

 *Reprinted by permission of Pearson Education, Inc. from Framework Design Guidelines: Conventions, Idioms, and Patterns for Reusable .NET Libraries, 2nd Edition by Krzysztof Cwalina and Brad Abrams, published Oct 22, 2008 by Addison-Wesley Professional as part of the Microsoft Windows Development Series.*

## See also

- Type Design Guidelines
- Framework Design Guidelines
