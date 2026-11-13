---
title: "Tutorial: Introduction to Inheritance (part 1 of 5)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/tutorials/inheritance.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Inheritance in C# and .NET

This tutorial introduces you to inheritance in C#. Inheritance is a feature of object-oriented programming languages that allows you to define a base class that provides specific functionality (data and behavior) and to define derived classes that either inherit or override that functionality.

## Prerequisites

- The latest .NET SDK
- Visual Studio Code editor
- The C# DevKit

### Installation instructions

On Windows, this WinGet configuration file to install all prerequisites. If you already have something installed, WinGet will skip that step.

1. Download the file and double-click to run it.
1. Read the license agreement, type `y`, and select `Enter` when prompted to accept.
1. If you get a flashing User Account Control (UAC) prompt in your Taskbar, allow the installation to continue.

On other platforms, you need to install each of these components separately.

1. Download the recommended installer from the .NET SDK download page and double-click to run it. The download page detects your platform and recommends the latest installer for your platform.
1. Download the latest installer from the Visual Studio Code home page and double click to run it. That page also detects your platform and the link should be correct for your system.
1. Click the "Install" button on the C# DevKit extension page. That opens Visual Studio code, and asks if you want to install or enable the extension. Select "install".

## Running the examples

To create and run the examples in this tutorial, you use the dotnet utility from the command line. Follow these steps for each example:

1. Create a directory to store the example.
1. Enter the dotnet new console command at a command prompt to create a new .NET Core project.
1. Copy and paste the code from the example into your code editor.
1. Enter the dotnet restore command from the command line to load or restore the project's dependencies.

   You don't have to run `dotnet restore` because it's run implicitly by all commands that require a restore to occur, such as `dotnet new`, `dotnet build`, `dotnet run`, `dotnet test`, `dotnet publish`, and `dotnet pack`. To disable implicit restore, use the `--no-restore` option.

The `dotnet restore` command is still useful in certain scenarios where explicitly restoring makes sense, such as continuous integration builds in Azure DevOps Services or in build systems that need to explicitly control when the restore occurs.

For information about how to manage NuGet feeds, see the `dotnet restore` documentation.

1. Enter the dotnet run command to compile and execute the example.

## Background: What is inheritance?

*Inheritance* is one of the fundamental attributes of object-oriented programming. It allows you to define a child class that reuses (inherits), extends, or modifies the behavior of a parent class. The class whose members are inherited is called the *base class*. The class that inherits the members of the base class is called the *derived class*.

C# and .NET support *single inheritance* only. That is, a class can only inherit from a single class. However, inheritance is transitive, which allows you to define an inheritance hierarchy for a set of types. In other words, type `D` can inherit from type `C`, which inherits from type `B`, which inherits from the base class type `A`. Because inheritance is transitive, the members of type `A` are available to type `D`.

Not all members of a base class are inherited by derived classes. The following members are not inherited:

- Static constructors, which initialize the static data of a class.

- Instance constructors, which you call to create a new instance of the class. Each class must define its own constructors.

- Finalizers, which are called by the runtime's garbage collector to destroy instances of a class.

While all other members of a base class are inherited by derived classes, whether they are visible or not depends on their accessibility. A member's accessibility affects its visibility for derived classes as follows:

- Private members are visible only in derived classes that are nested in their base class. Otherwise, they are not visible in derived classes. In the following example, `A.B` is a nested class that derives from `A`, and `C` derives from `A`. The private `A._value` field is visible in A.B. However, if you remove the comments from the `C.GetValue` method and attempt to compile the example, it produces compiler error CS0122: "'A._value' is inaccessible due to its protection level."

  ```csharp
public class A
{
    private int _value = 10;

    public class B : A
    {
        public int GetValue()
        {
            return _value;
        }
    }
}

public class C : A
{
    //    public int GetValue()
    //    {
    //        return _value;
    //    }
}

public class AccessExample
{
    public static void Main(string[] args)
    {
        var b = new A.B();
        Console.WriteLine(b.GetValue());
    }
}
// The example displays the following output:
//       10
```

- Protected members are visible only in derived classes.

- Internal members are visible only in derived classes that are located in the same assembly as the base class. They are not visible in derived classes located in a different assembly from the base class.

- Public members are visible in derived classes and are part of the derived class' public interface. Public inherited members can be called just as if they are defined in the derived class. In the following example, class `A` defines a method named `Method1`, and class `B` inherits from class `A`. The example then calls `Method1` as if it were an instance method on `B`.

  ```csharp
﻿namespace Basic;

public class A
{
    public void Method1()
    {
        // Method implementation.
    }
}

public class B : A
{ }

public class Example
{
    public static void Main()
    {
        B b = new ();
        b.Method1();
    }
}
```

Derived classes can also *override* inherited members by providing an alternate implementation. In order to be able to override a member, the member in the base class must be marked with the virtual keyword. By default, base class members are not marked as `virtual` and cannot be overridden. Attempting to override a non-virtual member, as the following example does, generates compiler error CS0506: "\<member> cannot override inherited member \<member> because it is not marked virtual, abstract, or override."

```csharp
public class A
{
    public void Method1()
    {
        // Do something.
    }
}

public class B : A
{
    public override void Method1() // Generates CS0506.
    {
        // Do something else.
    }
}
```

In some cases, a derived class *must* override the base class implementation. Base class members marked with the abstract keyword require that derived classes override them. Attempting to compile the following example generates compiler error CS0534, "<class> does not implement inherited abstract member <member>", because class `B` provides no implementation for `A.Method1`.

```csharp
public abstract class A
{
    public abstract void Method1();
}

public class B : A // Generates CS0534.
{
    public void Method3()
    {
        // Do something.
    }
}
```

Inheritance applies only to classes and interfaces. Other type categories (structs, delegates, and enums) do not support inheritance. Because of these rules, attempting to compile code like the following example produces compiler error CS0527: "Type 'ValueType' in interface list is not an interface." The error message indicates that, although you can define the interfaces that a struct implements, inheritance is not supported.

```csharp
public struct ValueStructure : ValueType // Generates CS0527.
{
}
```
