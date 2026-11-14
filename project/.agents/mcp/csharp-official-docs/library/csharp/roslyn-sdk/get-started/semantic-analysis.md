---
title: "Get started with semantic analysis"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/roslyn-sdk/get-started/semantic-analysis.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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

## Querying symbols

In this tutorial, you look at the "Hello World" program again. This time, you query the symbols in the program to understand what types those symbols represent. You query for the types in a namespace, and learn to find the methods available on a type.

You can see the finished code for this sample in our GitHub repository.

> **Note:**
> The Syntax Tree types use inheritance to describe the different syntax elements that are valid at different locations in the program. Using these APIs often means casting properties or collection members to specific derived types. In the following examples, the assignment and the casts are separate statements, using explicitly typed variables. You can read the code to see the return types of the API and the runtime type of the objects returned. In practice, it's more common to use implicitly typed variables and rely on API names to describe the type of objects being examined.

Create a new C# **Stand-Alone Code Analysis Tool** project:

* In Visual Studio, choose **File** > **New** > **Project** to display the New Project dialog.
* Under **Visual C#** > **Extensibility**, choose **Stand-Alone Code Analysis Tool**.
* Name your project "**SemanticQuickStart**" and click OK.

You're going to analyze the basic "Hello World!" program shown earlier.
Add the text for the Hello World program as a constant in your `Program` class:

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SemanticQuickStart/Program.cs._

Next, add the following code to build the syntax tree for the code text in the `programText` constant.  Add the following line to your `Main` method:

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SemanticQuickStart/Program.cs._

Next, build a `Microsoft.CodeAnalysis.CSharp.CSharpCompilation` from the tree you already created. The "Hello World" sample relies on the `System.String` and `System.Console` types. You need to reference the assembly that declares those two types in your compilation. Add the following line to your `Main` method to create a compilation of your syntax tree, including the reference to the appropriate assembly:

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SemanticQuickStart/Program.cs._

The `Microsoft.CodeAnalysis.CSharp.CSharpCompilation.AddReferences*` method adds references to the compilation. The `Microsoft.CodeAnalysis.MetadataReference.CreateFromFile*` method loads an assembly as a reference.

## Querying the semantic model

Once you have a `Microsoft.CodeAnalysis.Compilation` you can ask it for a `Microsoft.CodeAnalysis.SemanticModel` for any `Microsoft.CodeAnalysis.SyntaxTree` contained in that `Microsoft.CodeAnalysis.Compilation`. You can think of the semantic model as the source for all the information you would normally get from intellisense. A `Microsoft.CodeAnalysis.SemanticModel` can answer questions like "What names are in scope at this location?", "What members are accessible from this method?", "What variables are used in this block of text?", and "What does this name/expression refer to?" Add this statement to create the semantic model:

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SemanticQuickStart/Program.cs._

## Binding a name

The `Microsoft.CodeAnalysis.Compilation` creates the  `Microsoft.CodeAnalysis.SemanticModel` from the `Microsoft.CodeAnalysis.SyntaxTree`. After creating the model, you can query it to find the first `using` directive, and retrieve the symbol information for the `System` namespace. Add these two lines to your `Main` method to create the semantic model and retrieve the symbol for the first `using` directive:

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SemanticQuickStart/Program.cs._

The preceding code shows how to bind the name in the first `using` directive to retrieve a `Microsoft.CodeAnalysis.SymbolInfo` for the `System` namespace. The preceding code also illustrates that you use the **syntax model** to find the structure of the code; you use the **semantic model** to understand its meaning. The **syntax model** finds the string `System` in the `using` directive. The **semantic model** has all the information about the types defined in the `System` namespace.

From the `Microsoft.CodeAnalysis.SymbolInfo` object you can obtain the `Microsoft.CodeAnalysis.ISymbol` using the `Microsoft.CodeAnalysis.SymbolInfo.Symbol` property. This property returns the symbol this expression refers to. For expressions that don't refer to anything (such as numeric literals) this property is `null`. When the `Microsoft.CodeAnalysis.SymbolInfo.Symbol` is not null, the `Microsoft.CodeAnalysis.ISymbol.Kind` denotes the type of the symbol. In this example, the `Microsoft.CodeAnalysis.ISymbol.Kind` property is a `Microsoft.CodeAnalysis.SymbolKind.Namespace`. Add the following code to your `Main` method. It retrieves the symbol for the `System` namespace and then displays all the child namespaces declared in the `System` namespace:

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SemanticQuickStart/Program.cs._

Run the program and you should see the following output:

```output
System.Collections
System.Configuration
System.Deployment
System.Diagnostics
System.Globalization
System.IO
System.Numerics
System.Reflection
System.Resources
System.Runtime
System.Security
System.StubHelpers
System.Text
System.Threading
Press any key to continue . . .
```

> **Note:**
> The output does not include every namespace that is a child namespace of the `System` namespace. It displays every namespace that is present in this compilation, which only references the assembly where `System.String` is declared. Any namespaces declared in other assemblies are not known to this compilation

### Binding an expression

The preceding code shows how to find a symbol by binding to a name. There are other expressions in a C# program that can be bound that aren't names. To demonstrate this capability, let's access the binding to a simple string literal.

The "Hello World" program contains a `Microsoft.CodeAnalysis.CSharp.Syntax.LiteralExpressionSyntax`, the "Hello, World!" string displayed to the console.

You find the "Hello, World!" string by locating the single string literal in the program. Then, once you've located the syntax node, get the type info for that node from the semantic model. Add the following code to your `Main` method:

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SemanticQuickStart/Program.cs._

The `Microsoft.CodeAnalysis.TypeInfo` struct includes a `Microsoft.CodeAnalysis.TypeInfo.Type` property that enables access to the semantic information about the type of the literal. In this example, that's the `string` type. Add a declaration that assigns this property to a local variable:

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SemanticQuickStart/Program.cs._

To finish this tutorial, let's build a LINQ query that creates a sequence of all the public methods declared on the `string` type that return a `string`. This query gets complex, so let's build it line by line, then reconstruct it as a single query. The source for this query is the sequence of all members declared on the `string` type:

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SemanticQuickStart/Program.cs._

That source sequence contains all members, including properties and fields, so filter it using the `System.Collections.Immutable.ImmutableArray`1.OfType*` method to find elements that are `Microsoft.CodeAnalysis.IMethodSymbol` objects:

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SemanticQuickStart/Program.cs._

Next, add another filter to return only those methods that are public and return a `string`:

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SemanticQuickStart/Program.cs._

Select only the name property, and only distinct names by removing any overloads:

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SemanticQuickStart/Program.cs._

You can also build the full query using the LINQ query syntax, and then display all the method names in  the console:

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SemanticQuickStart/Program.cs._

Build and run the program. You should see the following output:

```output
Join
Substring
Trim
TrimStart
TrimEnd
Normalize
PadLeft
PadRight
ToLower
ToLowerInvariant
ToUpper
ToUpperInvariant
ToString
Insert
Replace
Remove
Format
Copy
Concat
Intern
IsInterned
Press any key to continue . . .
```

You've used the Semantic API to find and display information about the symbols that are part of this program.
