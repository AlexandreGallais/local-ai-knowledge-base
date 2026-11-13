---
title: "Field Design"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/design-guidelines/field.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Field Design

> **Note:**
> This content is reprinted by permission of Pearson Education, Inc. from *Framework Design Guidelines: Conventions, Idioms, and Patterns for Reusable .NET Libraries, 2nd Edition*. That edition was published in 2008, and the book has since been fully revised in the third edition. Some of the information on this page may be out-of-date.

The principle of encapsulation is one of the most important notions in object-oriented design. This principle states that data stored inside an object should be accessible only to that object.

 A useful way to interpret the principle is to say that a type should be designed so that changes to fields of that type (name or type changes) can be made without breaking code other than for members of the type. This interpretation immediately implies that all fields must be private.

 We exclude constant and static read-only fields from this strict restriction, because such fields, almost by definition, are never required to change.

 ❌ DO NOT provide instance fields that are public or protected.

 You should provide properties for accessing fields instead of making them public or protected.

 ✔️ DO use constant fields for constants that will never change.

 The compiler burns the values of const fields directly into calling code. Therefore, const values can never be changed without the risk of breaking compatibility.

 ✔️ DO use public static `readonly` fields for predefined object instances.

 If there are predefined instances of the type, declare them as public read-only static fields of the type itself.

 ❌ DO NOT assign instances of mutable types to `readonly` fields.

 A mutable type is a type with instances that can be modified after they are instantiated. For example, arrays, most collections, and streams are mutable types, but `System.Int32`, `System.Uri`, and `System.String` are all immutable. The read-only modifier on a reference type field prevents the instance stored in the field from being replaced, but it does not prevent the field’s instance data from being modified by calling members changing the instance.

 *Portions © 2005, 2009 Microsoft Corporation. All rights reserved.*

 *Reprinted by permission of Pearson Education, Inc. from Framework Design Guidelines: Conventions, Idioms, and Patterns for Reusable .NET Libraries, 2nd Edition by Krzysztof Cwalina and Brad Abrams, published Oct 22, 2008 by Addison-Wesley Professional as part of the Microsoft Windows Development Series.*

## See also

- Member Design Guidelines
- Framework Design Guidelines
