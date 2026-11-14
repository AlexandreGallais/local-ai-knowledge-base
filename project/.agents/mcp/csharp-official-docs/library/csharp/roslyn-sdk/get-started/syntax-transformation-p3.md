---
title: "Get started with syntax transformation (Roslyn APIs) (part 3 of 3)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/roslyn-sdk/get-started/syntax-transformation.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Get started with syntax transformation (Roslyn APIs) (part 3 of 3)

### Transform trees using `SyntaxRewriters`

The `With*` and `Microsoft.CodeAnalysis.SyntaxNodeExtensions.ReplaceNode*` methods provide convenient means to transform individual branches of a syntax tree. The `Microsoft.CodeAnalysis.CSharp.CSharpSyntaxRewriter` class performs multiple transformations on a syntax tree. The `Microsoft.CodeAnalysis.CSharp.CSharpSyntaxRewriter` class is a subclass of `Microsoft.CodeAnalysis.CSharp.CSharpSyntaxVisitor`1`. The `Microsoft.CodeAnalysis.CSharp.CSharpSyntaxRewriter` applies a transformation to a specific type of `Microsoft.CodeAnalysis.SyntaxNode`. You can apply transformations to multiple types of `Microsoft.CodeAnalysis.SyntaxNode` objects wherever they appear in a syntax tree. The second project in this quickstart creates a command-line refactoring that removes explicit types in local variable declarations anywhere that type inference could be used.

Create a new C# **Stand-Alone Code Analysis Tool** project. In Visual Studio, right-click the `SyntaxTransformationQuickStart` solution node. Choose **Add** > **New Project** to display the **New Project dialog**. Under **Visual C#** > **Extensibility**, choose **Stand-Alone Code Analysis Tool**. Name your project `TransformationCS` and click OK.

The first step is to create a class that derives from `Microsoft.CodeAnalysis.CSharp.CSharpSyntaxRewriter` to perform your transformations. Add a new class file to the project. In Visual Studio, choose **Project** > **Add Class...**. In the **Add New Item** dialog type `TypeInferenceRewriter.cs` as the filename.

Add the following `using` directives to the `TypeInferenceRewriter.cs` file:

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SyntaxTransformationQuickStart/TransformationCS/TypeInferenceRewriter.cs._

Next, make the `TypeInferenceRewriter` class extend the `Microsoft.CodeAnalysis.CSharp.CSharpSyntaxRewriter` class:

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SyntaxTransformationQuickStart/TransformationCS/TypeInferenceRewriter.cs._

Add the following code to declare a private read-only field to hold a `Microsoft.CodeAnalysis.SemanticModel` and initialize it in the constructor. You will need this field later on to determine where type inference can be used:

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SyntaxTransformationQuickStart/TransformationCS/TypeInferenceRewriter.cs._

Override the `Microsoft.CodeAnalysis.CSharp.CSharpSyntaxRewriter.VisitLocalDeclarationStatement(Microsoft.CodeAnalysis.CSharp.Syntax.LocalDeclarationStatementSyntax)` method:

```csharp
public override SyntaxNode VisitLocalDeclarationStatement(LocalDeclarationStatementSyntax node)
{

}
```

> **Note:**
> Many of the Roslyn APIs declare return types that are base classes of the actual runtime types returned. In many scenarios, one kind of node may be replaced by another kind of node entirely - or even removed. In this example, the `Microsoft.CodeAnalysis.CSharp.CSharpSyntaxRewriter.VisitLocalDeclarationStatement(Microsoft.CodeAnalysis.CSharp.Syntax.LocalDeclarationStatementSyntax)` method returns a `Microsoft.CodeAnalysis.SyntaxNode`, instead of the derived type of   `Microsoft.CodeAnalysis.CSharp.Syntax.LocalDeclarationStatementSyntax`. This rewriter returns a new `Microsoft.CodeAnalysis.CSharp.Syntax.LocalDeclarationStatementSyntax` node based on the existing one.

This quickstart handles local variable declarations. You could extend it to other declarations such as `foreach` loops, `for` loops, LINQ expressions, and lambda expressions. Furthermore this rewriter will only transform declarations of the simplest form:

```csharp
Type variable = expression;
```

If you want to explore on your own, consider extending the finished sample for these types of variable declarations:

```csharp
// Multiple variables in a single declaration.
Type variable1 = expression1,
     variable2 = expression2;
// No initializer.
Type variable;
```

Add the following code to the body of the `VisitLocalDeclarationStatement` method to skip rewriting these forms of declarations:

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SyntaxTransformationQuickStart/TransformationCS/TypeInferenceRewriter.cs._

The method indicates that no rewriting takes place by returning the `node` parameter unmodified. If neither of those `if` expressions are true, the node represents a possible declaration with initialization. Add these statements to extract the type name specified in the declaration and bind it using the `Microsoft.CodeAnalysis.SemanticModel` field to obtain a type symbol:

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SyntaxTransformationQuickStart/TransformationCS/TypeInferenceRewriter.cs._

Now, add this statement to bind the initializer expression:

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SyntaxTransformationQuickStart/TransformationCS/TypeInferenceRewriter.cs._

Finally, add the following `if` statement to replace the existing type name with the `var` keyword if the type of the initializer expression matches the type specified:

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SyntaxTransformationQuickStart/TransformationCS/TypeInferenceRewriter.cs._

The conditional is required because the declaration may cast the initializer expression to a base class or interface. If that's desired, the types on the left and right-hand side of the assignment don't match. Removing the explicit type in these cases would change the semantics of a program. `var` is specified as an identifier rather than a keyword because `var` is a contextual keyword. The leading and trailing trivia (white space) are transferred from the old type name to the `var` keyword to maintain vertical white space and indentation. It's simpler to use `ReplaceNode` rather than `With*` to transform the `Microsoft.CodeAnalysis.CSharp.Syntax.LocalDeclarationStatementSyntax` because the type name is actually the grandchild of the declaration statement.

You've finished the `TypeInferenceRewriter`. Now return to your `Program.cs` file to finish the example. Create a test `Microsoft.CodeAnalysis.Compilation` and obtain the `Microsoft.CodeAnalysis.SemanticModel` from it. Use that `Microsoft.CodeAnalysis.SemanticModel` to try your `TypeInferenceRewriter`. You'll do this step last. In the meantime declare a placeholder variable representing your test compilation:

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SyntaxTransformationQuickStart/TransformationCS/Program.cs._

After pausing a moment, you should see an error squiggle appear reporting that no `CreateTestCompilation` method exists. Press **Ctrl+Period** to open the light-bulb and then press Enter to invoke the **Generate Method Stub** command. This command will generate a method stub for the `CreateTestCompilation` method in the `Program` class. You'll come back to fill in this method later:

Write the following code to iterate over each `Microsoft.CodeAnalysis.SyntaxTree` in the test `Microsoft.CodeAnalysis.Compilation`. For each one, initialize a new `TypeInferenceRewriter` with the `Microsoft.CodeAnalysis.SemanticModel` for that tree:

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SyntaxTransformationQuickStart/TransformationCS/Program.cs._

Inside the `foreach` statement you created, add the following code to perform the transformation on each source tree. This code conditionally writes out the new transformed tree if any edits were made. Your rewriter should only modify a tree if it encounters one or more local variable declarations that could be simplified using type inference:

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SyntaxTransformationQuickStart/TransformationCS/Program.cs._

You should see squiggles under the `File.WriteAllText` code. Select the light bulb, and add the necessary `using System.IO;` statement.

You're almost done! There's one step left: creating a test `Microsoft.CodeAnalysis.Compilation`. Since you haven't been using type inference at all during this quickstart, it would have made a perfect test case. Unfortunately, creating a Compilation from a C# project file is beyond the scope of this walkthrough. But fortunately, if you've been following instructions carefully, there's hope. Replace the contents of the `CreateTestCompilation` method with the following code. It creates a test compilation that coincidentally matches the project described in this quickstart:

_Code sample not included: ../../../../samples/snippets/csharp/roslyn-sdk/SyntaxTransformationQuickStart/TransformationCS/Program.cs._

Cross your fingers and run the project. In Visual Studio, choose **Debug** > **Start Debugging**. You should be prompted by Visual Studio that the files in your project have changed. Click "**Yes to All**" to reload the modified files. Examine them to observe your awesomeness. Note how much cleaner the code looks without all those explicit and redundant type specifiers.

Congratulations! You've used the **Compiler APIs** to write your own refactoring that searches all files in a C# project for certain syntactic patterns, analyzes the semantics of source code that matches those patterns, and transforms it. You're now officially a refactoring author!
