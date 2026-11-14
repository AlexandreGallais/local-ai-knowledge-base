---
title: "Tutorial: Write your first analyzer and code fix (part 1 of 13)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/roslyn-sdk/tutorials/how-to-write-csharp-analyzer-code-fix.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Tutorial: Write your first analyzer and code fix

The .NET Compiler Platform SDK provides the tools you need to create custom diagnostics (analyzers), code fixes, code refactoring, and diagnostic suppressors that target C# or Visual Basic code. An **analyzer** contains code that recognizes violations of your rule. Your **code fix** contains the code that fixes the violation. The rules you implement can be anything from code structure to coding style to naming conventions and more. The .NET Compiler Platform provides the framework for running analysis as developers are writing code, and all the Visual Studio UI features for fixing code: showing squiggles in the editor, populating the Visual Studio Error List, creating the "light bulb" suggestions, and showing the rich preview of the suggested fixes.

In this tutorial, you explore the creation of an **analyzer** and an accompanying **code fix** using the Roslyn APIs. An analyzer is a way to perform source code analysis and report a problem to the user. Optionally, you can associate a code fix with the analyzer to represent a modification to the user's source code. This tutorial creates an analyzer that finds local variable declarations that could be declared using the `const` modifier but aren't. The accompanying code fix modifies those declarations to add the `const` modifier.

## Prerequisites

- Visual Studio

You need to install the **.NET Compiler Platform SDK** by using the Visual Studio Installer:

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

Creating and validating your analyzer involves several steps:

1. Create the solution.
1. Register the analyzer name and description.
1. Report analyzer warnings and recommendations.
1. Implement the code fix to accept recommendations.
1. Improve the analysis through unit tests.

## Create the solution

1. In Visual Studio, select **File** > **New** > **Project/Solution** to open the New Project dialog.
1. In the search box, type **Analyzer** to find the **Analyzer with Code Fix (.NET Standard)** template.
1. Select **Next**.
1. Name your project "**MakeConst**" and select **Create**.

> **Note:**
> You might get a compilation error (_MSB4062: The "CompareBuildTaskVersion" task couldn't be loaded_). To fix this error, update the NuGet packages in the solution by using NuGet Package Manager or use `Update-Package` in the Package Manager Console window.

## Explore the analyzer template

The analyzer with code fix template creates five projects:

- **MakeConst**, which contains the analyzer.
- **MakeConst.CodeFixes**, which contains the code fix.
- **MakeConst.Package**, which is used to produce NuGet package for the analyzer and code fix.
- **MakeConst.Test**, which is a unit test project.
- **MakeConst.Vsix**, which is the default startup project that starts a second instance of Visual Studio that has loaded your new analyzer. Press `F5` to start the VSIX project.

> **Note:**
> Analyzers should target .NET Standard 2.0 because they can run in .NET Core environment (command line builds) and .NET Framework environment (Visual Studio).

> **Tip:**
> When you run your analyzer, you start a second copy of Visual Studio. This second copy uses a different registry hive to store settings. That difference enables you to differentiate the visual settings in the two copies of Visual Studio. You can pick a different theme for the experimental run of Visual Studio. In addition, don't roam your settings or sign in to your Visual Studio account by using the experimental run of Visual Studio. That keeps the settings different.
>
> The hive includes not only the analyzer under development, but also any previous analyzers opened. To reset Roslyn hive, you need to manually delete it from *%LocalAppData%\\Microsoft\\VisualStudio*. The folder name of Roslyn hive ends in `Roslyn`, for example, `16.0_9ae182f9Roslyn`. You might need to clean the solution and rebuild it after deleting the hive.

In the second Visual Studio instance that you just started, create a new C# Console Application project (any target framework will work -- analyzers work at the source level.) Hover over the token with a wavy underline, and the warning text provided by an analyzer appears.

The template creates an analyzer that reports a warning on each type declaration where the type name contains lowercase letters, as shown in the following figure:

The template also provides a code fix that changes any type name containing lower case characters to all upper case. You can select the light bulb displayed with the warning to see the suggested changes. Accepting the suggested changes updates the type name and all references to that type in the solution. Now that you see the initial analyzer in action, close the second Visual Studio instance and return to your analyzer project.

You don't have to start a second copy of Visual Studio and create new code to test every change in your analyzer. The template also creates a unit test project for you. That project contains two tests. `TestMethod1` shows the typical format of a test that analyzes code without triggering a diagnostic. `TestMethod2` shows the format of a test that triggers a diagnostic, and then applies a suggested code fix. As you build your analyzer and code fix, you'll write tests for different code structures to verify your work. Unit tests for analyzers are much quicker than testing them interactively with Visual Studio.

> **Tip:**
> Analyzer unit tests are a great tool when you know what code constructs should and shouldn't trigger your analyzer. Loading your analyzer in another copy of Visual Studio is a great tool to explore and find constructs you might not have thought about yet.

In this tutorial, you write an analyzer that reports to the user any local variable declarations that can be converted to local constants. For example, consider the following code:

```csharp
int x = 0;
Console.WriteLine(x);
```

In the code preceding, `x` is assigned a constant value and is never modified. It can be declared by using the `const` modifier:

```csharp
const int x = 0;
Console.WriteLine(x);
```

The analysis to determine whether a variable can be made constant is involved, requiring syntactic analysis, constant analysis of the initializer expression, and dataflow analysis to ensure that the variable is never written to. The .NET Compiler Platform provides APIs that make it easier to perform this analysis.
