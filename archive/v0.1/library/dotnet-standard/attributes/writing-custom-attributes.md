---
title: "Writing Custom Attributes (part 1 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/attributes/writing-custom-attributes.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Write custom attributes

To design custom attributes, you don't need to learn many new concepts. If you're familiar with object-oriented programming and know how to design classes, you already have most of the knowledge needed. Custom attributes are traditional classes that derive directly or indirectly from the `System.Attribute` class. Just like traditional classes, custom attributes contain methods that store and retrieve data.

 The primary steps to properly design custom attribute classes are as follows:

- Applying the AttributeUsageAttribute

- Declaring the attribute class

- Declaring constructors

- Declaring properties

 This section describes each of these steps and concludes with a custom attribute example.
