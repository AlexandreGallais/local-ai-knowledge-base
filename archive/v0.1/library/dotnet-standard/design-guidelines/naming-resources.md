---
title: "Naming Resources"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/design-guidelines/naming-resources.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Naming Resources

> **Note:**
> This content is reprinted by permission of Pearson Education, Inc. from *Framework Design Guidelines: Conventions, Idioms, and Patterns for Reusable .NET Libraries, 2nd Edition*. That edition was published in 2008, and the book has since been fully revised in the third edition. Some of the information on this page may be out-of-date.

Because localizable resources can be referenced via certain objects as if they were properties, the naming guidelines for resources are similar to property guidelines.

 ✔️ DO use PascalCasing in resource keys.

 ✔️ DO provide descriptive rather than short identifiers.

 ❌ DO NOT use language-specific keywords of the main CLR languages.

 ✔️ DO use only alphanumeric characters and underscores in naming resources.

 ✔️ DO use the following naming convention for exception message resources.

 The resource identifier should be the exception type name plus a short identifier of the exception:

 `ArgumentExceptionIllegalCharacters`
 `ArgumentExceptionInvalidName`
 `ArgumentExceptionFileNameIsMalformed`

 *Portions © 2005, 2009 Microsoft Corporation. All rights reserved.*

 *Reprinted by permission of Pearson Education, Inc. from Framework Design Guidelines: Conventions, Idioms, and Patterns for Reusable .NET Libraries, 2nd Edition by Krzysztof Cwalina and Brad Abrams, published Oct 22, 2008 by Addison-Wesley Professional as part of the Microsoft Windows Development Series.*

## See also

- Framework Design Guidelines
- Naming Guidelines
