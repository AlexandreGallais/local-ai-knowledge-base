---
title: "Get started with syntax analysis (Roslyn APIs) (part 2 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/roslyn-sdk/get-started/syntax-analysis.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Get started with syntax analysis (Roslyn APIs) (part 2 of 2)

## Syntax walkers

Often you want to find all nodes of a specific type in a syntax tree, for example, every property declaration in a file. By extending the `Microsoft.CodeAnalysis.CSharp.CSharpSyntaxWalker` class and overriding the `Microsoft.CodeAnalysis.CSharp.CSharpSyntaxVisitor.VisitPropertyDeclaration(Microsoft.CodeAnalysis.CSharp.Syntax.PropertyDeclarationSyntax)` method, you process every property declaration in a syntax tree without knowing its structure beforehand. `Microsoft.CodeAnalysis.CSharp.CSharpSyntaxWalker` is a specific kind of `Microsoft.CodeAnalysis.CSharp.CSharpSyntaxVisitor` that recursively visits a node and each of its children.

This example implements a `Microsoft.CodeAnalysis.CSharp.CSharpSyntaxWalker` that examines a syntax tree. It collects `using` directives it finds that aren't importing a `System` namespace.

Create a new C# **Stand-Alone Code Analysis Tool** project; name it "**SyntaxWalker**."

You can see the finished code for this sample in our GitHub repository. The sample on GitHub contains both projects described in this tutorial.

As in the previous sample, you can define a string constant to hold the text of the program you're going to analyze:

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SyntaxQuickStart/SyntaxWalker/Program.cs._

This source text contains `using` directives scattered across four different locations: the file-level, in the top-level namespace, and in the two nested namespaces. This example highlights a core scenario for using the `Microsoft.CodeAnalysis.CSharp.CSharpSyntaxWalker` class to query code. It would be cumbersome to visit every node in the root syntax tree to find using declarations. Instead, you create a derived class and override the method that gets called only when the current node in the tree is a `using` directive. Your visitor does not do any work on any other node types. This single method examines each of the `using` directives and builds a collection of the namespaces that aren't in the `System` namespace. You build a `Microsoft.CodeAnalysis.CSharp.CSharpSyntaxWalker` that examines all the `using` directives, but only the `using` directives.

Now that you've defined the program text, you need to create a `SyntaxTree` and get the root of that tree:

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SyntaxQuickStart/SyntaxWalker/Program.cs._

Next, create a new class. In Visual Studio, choose **Project** > **Add New Item**. In the **Add New Item** dialog type *UsingCollector.cs* as the filename.

You implement the `using` visitor functionality in the `UsingCollector` class. Start by making the `UsingCollector` class derive from `Microsoft.CodeAnalysis.CSharp.CSharpSyntaxWalker`.

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SyntaxQuickStart/SyntaxWalker/UsingCollector.cs._

You need storage to hold the namespace nodes that you're collecting.  Declare a public read-only property in the `UsingCollector` class; you use this variable to store the `Microsoft.CodeAnalysis.CSharp.Syntax.UsingDirectiveSyntax` nodes you find:

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SyntaxQuickStart/SyntaxWalker/UsingCollector.cs._

The base class, `Microsoft.CodeAnalysis.CSharp.CSharpSyntaxWalker` implements the logic to visit each node in the syntax tree. The derived class overrides the methods called for the specific nodes you're interested in. In this case, you're interested in any `using` directive. That means you must override the `Microsoft.CodeAnalysis.CSharp.CSharpSyntaxVisitor.VisitUsingDirective(Microsoft.CodeAnalysis.CSharp.Syntax.UsingDirectiveSyntax)` method. The one argument to this method is a `Microsoft.CodeAnalysis.CSharp.Syntax.UsingDirectiveSyntax` object. That's an important advantage to using the visitors: they call the overridden methods with arguments already cast to the specific node type. The `Microsoft.CodeAnalysis.CSharp.Syntax.UsingDirectiveSyntax` class has a `Microsoft.CodeAnalysis.CSharp.Syntax.UsingDirectiveSyntax.Name` property that stores the name of the namespace being imported. It is a `Microsoft.CodeAnalysis.CSharp.Syntax.NameSyntax`. Add the following code in the `Microsoft.CodeAnalysis.CSharp.CSharpSyntaxVisitor.VisitUsingDirective(Microsoft.CodeAnalysis.CSharp.Syntax.UsingDirectiveSyntax)` override:

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SyntaxQuickStart/SyntaxWalker/UsingCollector.cs._

As with the earlier example, you've added a variety of `WriteLine` statements to aid in understanding of this method. You can see when it's called, and what arguments are passed to it each time.

Finally, you need to add two lines of code to create the `UsingCollector` and have it visit the root node, collecting all the `using` directives. Then, add a `foreach` loop to display all the `using` directives your collector found:

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SyntaxQuickStart/SyntaxWalker/Program.cs._

Compile and run the program. You should see the following output:

```console
        VisitUsingDirective called with System.
        VisitUsingDirective called with System.Collections.Generic.
        VisitUsingDirective called with System.Linq.
        VisitUsingDirective called with System.Text.
        VisitUsingDirective called with Microsoft.CodeAnalysis.
                Success. Adding Microsoft.CodeAnalysis.
        VisitUsingDirective called with Microsoft.CodeAnalysis.CSharp.
                Success. Adding Microsoft.CodeAnalysis.CSharp.
        VisitUsingDirective called with Microsoft.
                Success. Adding Microsoft.
        VisitUsingDirective called with System.ComponentModel.
        VisitUsingDirective called with Microsoft.Win32.
                Success. Adding Microsoft.Win32.
        VisitUsingDirective called with System.Runtime.InteropServices.
        VisitUsingDirective called with System.CodeDom.
        VisitUsingDirective called with Microsoft.CSharp.
                Success. Adding Microsoft.CSharp.
Microsoft.CodeAnalysis
Microsoft.CodeAnalysis.CSharp
Microsoft
Microsoft.Win32
Microsoft.CSharp
Press any key to continue . . .
```

Congratulations! You've used the **Syntax API** to locate specific kinds of directives and declarations in C# source code.
