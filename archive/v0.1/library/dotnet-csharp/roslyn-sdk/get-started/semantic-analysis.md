---
title: "Get started with semantic analysis (part 1 of 6)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/roslyn-sdk/get-started/semantic-analysis.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Get started with semantic analysis

This tutorial assumes you're familiar with the Syntax API. The get started with syntax analysis article provides sufficient introduction.

In this tutorial, you explore the **Symbol** and **Binding APIs**. These APIs provide information about the _semantic meaning_ of a program. They enable you to ask and answer questions about the types represented by any symbol in your program.

You'll need to install the **.NET Compiler Platform SDK**:

## Installation instructions - Visual Studio Installer

There are two different ways to find the **.NET Compiler Platform SDK** in the **Visual Studio Installer**:

### Install using the Visual Studio Installer - Workloads view

The .NET Compiler Platform SDK is not automatically selected as part of the Visual Studio extension development workload. You must select it as an optional component.

1. Run **Visual Studio Installer**
1. Select **Modify**
1. Check the **Visual Studio extension development** workload.
1. Open the **Visual Studio extension development** node in the summary tree.
1. Make sure the box for **.NET Compiler Platform SDK** is checked.
1. Select **Modify**.

Optionally, you'll also want the **DGML editor** to display graphs in the visualizer:

1. Open the **Individual components** node in the summary tree.
1. Check the box for **DGML editor**

### Install using the Visual Studio Installer - Individual components tab

1. Run **Visual Studio Installer**
1. Select **Modify**
1. Select the **Individual components** tab
1. Check the box for **.NET Compiler Platform SDK**. You'll find it at the top under the **Compilers, build tools, and runtimes** section.
1. Select **Modify**.

Optionally, you'll also want the **DGML editor** to display graphs in the visualizer:

1. Check the box for **DGML editor**. You'll find it under the **Code tools** section.

## Understanding Compilations and Symbols

As you work more with the .NET Compiler SDK, you become familiar with the distinctions between Syntax API and the Semantic API. The **Syntax API** allows you to look at the _structure_ of a program. However, often you want richer information about the semantics or _meaning_ of a program. While a loose code file or snippet of Visual Basic or C# code can be syntactically analyzed in isolation, it's not meaningful to ask questions such as "what's the type of this variable" in a vacuum. The meaning of a type name may be dependent on assembly references, namespace imports, or other code files. Those questions are answered using the **Semantic API**, specifically the `Microsoft.CodeAnalysis.Compilation` class.

An instance of `Microsoft.CodeAnalysis.Compilation` is analogous to a single project as seen by the compiler and represents everything needed to compile a Visual Basic or C# program. The **compilation** includes the set of source files to be compiled, assembly references, and compiler options. You can reason about the meaning of the code using all the other information in this context. A `Microsoft.CodeAnalysis.Compilation` allows you to find **Symbols** - entities such as types, namespaces, members, and variables which names and other expressions refer to. The process of associating names and expressions with **Symbols** is called **Binding**.

Like `Microsoft.CodeAnalysis.SyntaxTree`, `Microsoft.CodeAnalysis.Compilation` is an abstract class with language-specific derivatives. When creating an instance of Compilation, you must invoke a factory method on the `Microsoft.CodeAnalysis.CSharp.CSharpCompilation` (or `Microsoft.CodeAnalysis.VisualBasic.VisualBasicCompilation`) class.
