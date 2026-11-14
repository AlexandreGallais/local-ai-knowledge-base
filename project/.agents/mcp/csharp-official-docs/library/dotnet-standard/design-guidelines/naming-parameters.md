---
title: "Naming Parameters"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/design-guidelines/naming-parameters.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Naming Parameters

> **Note:**
> This content is reprinted by permission of Pearson Education, Inc. from *Framework Design Guidelines: Conventions, Idioms, and Patterns for Reusable .NET Libraries, 2nd Edition*. That edition was published in 2008, and the book has since been fully revised in the third edition. Some of the information on this page may be out-of-date.

Beyond the obvious reason of readability, it is important to follow the guidelines for parameter names because parameters are displayed in documentation and in the designer when visual design tools provide Intellisense and class browsing functionality.

 ✔️ DO use camelCasing in parameter names.

 ✔️ DO use descriptive parameter names.

 ✔️ CONSIDER using names based on a parameter’s meaning rather than the parameter’s type.

### Naming Operator Overload Parameters

 ✔️ DO use `left` and `right` for binary operator overload parameter names if there is no meaning to the parameters.

 ✔️ DO use `value` for unary operator overload parameter names if there is no meaning to the parameters.

 ✔️ CONSIDER meaningful names for operator overload parameters if doing so adds significant value.

 ❌ DO NOT use abbreviations or numeric indices for operator overload parameter names.

 *Portions © 2005, 2009 Microsoft Corporation. All rights reserved.*

 *Reprinted by permission of Pearson Education, Inc. from Framework Design Guidelines: Conventions, Idioms, and Patterns for Reusable .NET Libraries, 2nd Edition by Krzysztof Cwalina and Brad Abrams, published Oct 22, 2008 by Addison-Wesley Professional as part of the Microsoft Windows Development Series.*

## See also

- Framework Design Guidelines
- Naming Guidelines
