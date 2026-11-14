---
title: "Get started with syntax transformation (Roslyn APIs) (part 2 of 3)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/roslyn-sdk/get-started/syntax-transformation.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Get started with syntax transformation (Roslyn APIs) (part 2 of 3)

## Create and transform trees

You choose one of two strategies for syntax transformations. **Factory methods** are best used when you're searching for specific nodes to replace, or specific locations where you want to insert new code. **Rewriters** are best when you want to scan an entire project for code patterns that you want to replace.

### Create nodes with factory methods

The first syntax transformation demonstrates the factory methods. You'<example-value>'s a factory method that creates an instance of that type. You create syntax trees by composing nodes hierarchically in a bottom-up fashion. Then, you'<example-value>'ve created.

Start Visual Studio, and create a new C# **Stand-Alone Code Analysis Tool** project. In Visual Studio, choose **File** > **New** > **Project** to display the New Project dialog. Under **Visual C#** > **Extensibility** choose a **Stand-Alone Code Analysis Tool**. This quickstart has two example projects, so name the solution **SyntaxTransformationQuickStart**, and name the project **ConstructionCS**. Click **OK**.

This project uses the `Microsoft.CodeAnalysis.CSharp.SyntaxFactory` class methods to construct a `Microsoft.CodeAnalysis.CSharp.Syntax.NameSyntax` representing the `System.Collections.Generic` namespace.

Add the following `using` directive to the top of the `Program.cs`.

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SyntaxTransformationQuickStart/ConstructionCS/Program.cs._

You'll create **name syntax nodes** to build the tree that represents the `using System.Collections.Generic;` statement. `Microsoft.CodeAnalysis.CSharp.Syntax.NameSyntax` is the base class for four types of names that appear in C#. You compose these four types of names together to create any name that can appear in the C# language:

* `Microsoft.CodeAnalysis.CSharp.Syntax.NameSyntax`, which represents simple single identifier names like `System` and `Microsoft`.
* `Microsoft.CodeAnalysis.CSharp.Syntax.GenericNameSyntax`, which represents a generic type or method name such as `List<int>`.
* `Microsoft.CodeAnalysis.CSharp.Syntax.QualifiedNameSyntax`, which represents a qualified name of the form `<left-name>.<right-identifier-or-generic-name>` such as `System.IO`.
* `Microsoft.CodeAnalysis.CSharp.Syntax.AliasQualifiedNameSyntax`, which represents a name using an assembly extern alias such as `LibraryV2::Foo`.

You use the `Microsoft.CodeAnalysis.CSharp.SyntaxFactory.IdentifierName(System.String)` method to create a `Microsoft.CodeAnalysis.CSharp.Syntax.NameSyntax` node. Add the following code in your `Main` method in `Program.cs`:

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SyntaxTransformationQuickStart/ConstructionCS/Program.cs._

The preceding code creates an `Microsoft.CodeAnalysis.CSharp.Syntax.IdentifierNameSyntax` object and assigns it to the variable `name`. Many of the Roslyn APIs return base classes to make it easier to work with related types. The variable `name`, an `Microsoft.CodeAnalysis.CSharp.Syntax.NameSyntax`, can be reused as you build the `Microsoft.CodeAnalysis.CSharp.Syntax.QualifiedNameSyntax`. Don't use type inference as you build the sample. You'll automate that step in this project.

You've created the name. Now, it's time to build more nodes into the tree by building a `Microsoft.CodeAnalysis.CSharp.Syntax.QualifiedNameSyntax`. The new tree uses `name` as the left of the name, and a new `Microsoft.CodeAnalysis.CSharp.Syntax.IdentifierNameSyntax` for the `Collections` namespace as the right side of the `Microsoft.CodeAnalysis.CSharp.Syntax.QualifiedNameSyntax`. Add the following code to `program.cs`:

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SyntaxTransformationQuickStart/ConstructionCS/Program.cs._

Run the code again, and see the results. You're building a tree of nodes that represents code. You'll continue this pattern to build the `Microsoft.CodeAnalysis.CSharp.Syntax.QualifiedNameSyntax` for the namespace `System.Collections.Generic`. Add the following code to `Program.cs`:

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SyntaxTransformationQuickStart/ConstructionCS/Program.cs._

Run the program again to see that you've built the tree for the code to add.

### Create a modified tree

You've built a small syntax tree that contains one statement. The APIs to create new nodes are the right choice to create single statements or other small code blocks. However, to build larger blocks of code, you should use methods that replace nodes or insert nodes into an existing tree. Remember that syntax trees are immutable. The **Syntax API** doesn't provide any mechanism for modifying an existing syntax tree after construction. Instead, it provides methods that produce new trees based on changes to existing ones. `With*` methods are defined in concrete classes that derive from `Microsoft.CodeAnalysis.SyntaxNode` or in extension members declared in the `Microsoft.CodeAnalysis.SyntaxNodeExtensions` class. These methods create a new node by applying changes to an existing node's child properties. Additionally, the `Microsoft.CodeAnalysis.SyntaxNodeExtensions.ReplaceNode*` extension member can be used to replace a descendent node in a subtree. This method also updates the parent to point to the newly created child and repeats this process up the entire tree - a process known as _re-spinning_ the tree.

The next step is to create a tree that represents an entire (small) program and then modify it. Add the following code to the beginning of the `Program` class:

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SyntaxTransformationQuickStart/ConstructionCS/Program.cs._

> **Note:**
> The example code uses the `System.Collections` namespace and not the `System.Collections.Generic` namespace.

Next, add the following code to the bottom of the `Main` method to parse the text and create a tree:

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SyntaxTransformationQuickStart/ConstructionCS/Program.cs._

This example uses the `Microsoft.CodeAnalysis.CSharp.Syntax.UsingDirectiveSyntax.WithName(Microsoft.CodeAnalysis.CSharp.Syntax.NameSyntax)` method to replace the name in a `Microsoft.CodeAnalysis.CSharp.Syntax.UsingDirectiveSyntax` node with the one constructed in the preceding code.

Create a new `Microsoft.CodeAnalysis.CSharp.Syntax.UsingDirectiveSyntax` node using the `Microsoft.CodeAnalysis.CSharp.Syntax.UsingDirectiveSyntax.WithName(Microsoft.CodeAnalysis.CSharp.Syntax.NameSyntax)` method to update the `System.Collections` name with the name you created in the preceding code. Add the following code to the bottom of the `Main` method:

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SyntaxTransformationQuickStart/ConstructionCS/Program.cs._

Run the program and look carefully at the output. The `newUsing` hasn't been placed in the root tree. The original tree hasn't been changed.

Add the following code using the `Microsoft.CodeAnalysis.SyntaxNodeExtensions.ReplaceNode*` extension method to create a new tree. The new tree is the result of replacing the existing import with the updated `newUsing` node. You assign this new tree to the existing `root` variable:

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SyntaxTransformationQuickStart/ConstructionCS/Program.cs._

Run the program again. This time the tree now correctly imports the `System.Collections.Generic` namespace.
