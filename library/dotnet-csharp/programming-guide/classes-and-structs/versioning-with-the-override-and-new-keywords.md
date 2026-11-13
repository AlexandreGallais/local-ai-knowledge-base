---
title: "Versioning with the Override and New Keywords (part 1 of 20)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/programming-guide/classes-and-structs/versioning-with-the-override-and-new-keywords.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Versioning with the Override and New Keywords (C# Programming Guide)

The C# language is designed so that versioning between base and derived classes in different libraries can evolve and maintain backward compatibility. This means, for example, that the introduction of a new member in a base class with the same name as a member in a derived class is completely supported by C# and does not lead to unexpected behavior. It also means that a class must explicitly state whether a method is intended to override an inherited method, or whether a method is a new method that hides a similarly named inherited method.

 In C#, derived classes can contain methods with the same name as base class methods.

- If the method in the derived class is not preceded by new or override keywords, the compiler will issue a warning and the method will behave as if the `new` keyword were present.

- If the method in the derived class is preceded with the `new` keyword, the method is defined as being independent of the method in the base class.

- If the method in the derived class is preceded with the `override` keyword, objects of the derived class will call that method instead of the base class method.

- In order to apply the `override` keyword to the method in the derived class, the base class method must be defined virtual.

- The base class method can be called from within the derived class using the `base` keyword.

- The `override`, `virtual`, and `new` keywords can also be applied to properties, indexers, and events.

 By default, C# methods are not virtual. If a method is declared as virtual, any class inheriting the method can implement its own version. To make a method virtual, the `virtual` modifier is used in the method declaration of the base class. The derived class can then override the base virtual method by using the `override` keyword or hide the virtual method in the base class by using the `new` keyword. If neither the `override` keyword nor the `new` keyword is specified, the compiler will issue a warning and the method in the derived class will hide the method in the base class.

 To demonstrate this in practice, assume for a moment that Company A has created a class named `GraphicsClass`, which your program uses. The following is `GraphicsClass`:
