---
title: "Get started with syntax transformation (Roslyn APIs) (part 4 of 5)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/roslyn-sdk/get-started/syntax-transformation.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Get started with syntax transformation (Roslyn APIs) (part 4 of 5)

### Transform trees using `SyntaxRewriters`

The `With*` and `Microsoft.CodeAnalysis.SyntaxNodeExtensions.ReplaceNode*` methods provide convenient means to transform individual branches of a syntax tree. The `Microsoft.CodeAnalysis.CSharp.CSharpSyntaxRewriter` class performs multiple transformations on a syntax tree. The `Microsoft.CodeAnalysis.CSharp.CSharpSyntaxRewriter` class is a subclass of `Microsoft.CodeAnalysis.CSharp.CSharpSyntaxVisitor`1`. The `Microsoft.CodeAnalysis.CSharp.CSharpSyntaxRewriter` applies a transformation to a specific type of `Microsoft.CodeAnalysis.SyntaxNode`. You can apply transformations to multiple types of `Microsoft.CodeAnalysis.SyntaxNode` objects wherever they appear in a syntax tree. The second project in this quickstart creates a command-line refactoring that removes explicit types in local variable declarations anywhere that type inference could be used.

Create a new C# **Stand-Alone Code Analysis Tool** project. In Visual Studio, right-click the `SyntaxTransformationQuickStart` solution node. Choose **Add** > **New Project** to display the **New Project dialog**. Under **Visual C#** > **Extensibility**, choose **Stand-Alone Code Analysis Tool**. Name your project `TransformationCS` and click OK.

The first step is to create a class that derives from `Microsoft.CodeAnalysis.CSharp.CSharpSyntaxRewriter` to perform your transformations. Add a new class file to the project. In Visual Studio, choose **Project** > **Add Class...**. In the **Add New Item** dialog type `TypeInferenceRewriter.cs` as the filename.

Add the following `using` directives to the `TypeInferenceRewriter.cs` file:

```csharp
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace TransformationCS
{
    public class TypeInferenceRewriter : CSharpSyntaxRewriter
    {
        private readonly SemanticModel SemanticModel;

        public TypeInferenceRewriter(SemanticModel semanticModel) => SemanticModel = semanticModel;

        // five
        public override SyntaxNode VisitLocalDeclarationStatement(LocalDeclarationStatementSyntax node)
        {
            if (node.Declaration.Variables.Count > 1)
            {
                return node;
            }
            if (node.Declaration.Variables[0].Initializer == null)
            {
                return node;
            }

            var declarator = node.Declaration.Variables.First();
            var variableTypeName = node.Declaration.Type;

            var variableType = (ITypeSymbol)SemanticModel
                .GetSymbolInfo(variableTypeName)
                .Symbol;

            var initializerInfo = SemanticModel.GetTypeInfo(declarator.Initializer.Value);

            if (SymbolEqualityComparer.Default.Equals(variableType, initializerInfo.Type))
            {
                TypeSyntax varTypeName = SyntaxFactory.IdentifierName("var")
                    .WithLeadingTrivia(variableTypeName.GetLeadingTrivia())
                    .WithTrailingTrivia(variableTypeName.GetTrailingTrivia());

                return node.ReplaceNode(variableTypeName, varTypeName);
            }
            else
            {
                return node;
            }
        }
    }
}
```

Next, make the `TypeInferenceRewriter` class extend the `Microsoft.CodeAnalysis.CSharp.CSharpSyntaxRewriter` class:

```csharp
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace TransformationCS
{
    public class TypeInferenceRewriter : CSharpSyntaxRewriter
    {
        private readonly SemanticModel SemanticModel;

        public TypeInferenceRewriter(SemanticModel semanticModel) => SemanticModel = semanticModel;

        // five
        public override SyntaxNode VisitLocalDeclarationStatement(LocalDeclarationStatementSyntax node)
        {
            if (node.Declaration.Variables.Count > 1)
            {
                return node;
            }
            if (node.Declaration.Variables[0].Initializer == null)
            {
                return node;
            }

            var declarator = node.Declaration.Variables.First();
            var variableTypeName = node.Declaration.Type;

            var variableType = (ITypeSymbol)SemanticModel
                .GetSymbolInfo(variableTypeName)
                .Symbol;

            var initializerInfo = SemanticModel.GetTypeInfo(declarator.Initializer.Value);

            if (SymbolEqualityComparer.Default.Equals(variableType, initializerInfo.Type))
            {
                TypeSyntax varTypeName = SyntaxFactory.IdentifierName("var")
                    .WithLeadingTrivia(variableTypeName.GetLeadingTrivia())
                    .WithTrailingTrivia(variableTypeName.GetTrailingTrivia());

                return node.ReplaceNode(variableTypeName, varTypeName);
            }
            else
            {
                return node;
            }
        }
    }
}
```

Add the following code to declare a private read-only field to hold a `Microsoft.CodeAnalysis.SemanticModel` and initialize it in the constructor. You will need this field later on to determine where type inference can be used:

```csharp
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace TransformationCS
{
    public class TypeInferenceRewriter : CSharpSyntaxRewriter
    {
        private readonly SemanticModel SemanticModel;

        public TypeInferenceRewriter(SemanticModel semanticModel) => SemanticModel = semanticModel;

        // five
        public override SyntaxNode VisitLocalDeclarationStatement(LocalDeclarationStatementSyntax node)
        {
            if (node.Declaration.Variables.Count > 1)
            {
                return node;
            }
            if (node.Declaration.Variables[0].Initializer == null)
            {
                return node;
            }

            var declarator = node.Declaration.Variables.First();
            var variableTypeName = node.Declaration.Type;

            var variableType = (ITypeSymbol)SemanticModel
                .GetSymbolInfo(variableTypeName)
                .Symbol;

            var initializerInfo = SemanticModel.GetTypeInfo(declarator.Initializer.Value);

            if (SymbolEqualityComparer.Default.Equals(variableType, initializerInfo.Type))
            {
                TypeSyntax varTypeName = SyntaxFactory.IdentifierName("var")
                    .WithLeadingTrivia(variableTypeName.GetLeadingTrivia())
                    .WithTrailingTrivia(variableTypeName.GetTrailingTrivia());

                return node.ReplaceNode(variableTypeName, varTypeName);
            }
            else
            {
                return node;
            }
        }
    }
}
```

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

```csharp
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace TransformationCS
{
    public class TypeInferenceRewriter : CSharpSyntaxRewriter
    {
        private readonly SemanticModel SemanticModel;

        public TypeInferenceRewriter(SemanticModel semanticModel) => SemanticModel = semanticModel;

        // five
        public override SyntaxNode VisitLocalDeclarationStatement(LocalDeclarationStatementSyntax node)
        {
            if (node.Declaration.Variables.Count > 1)
            {
                return node;
            }
            if (node.Declaration.Variables[0].Initializer == null)
            {
                return node;
            }

            var declarator = node.Declaration.Variables.First();
            var variableTypeName = node.Declaration.Type;

            var variableType = (ITypeSymbol)SemanticModel
                .GetSymbolInfo(variableTypeName)
                .Symbol;

            var initializerInfo = SemanticModel.GetTypeInfo(declarator.Initializer.Value);

            if (SymbolEqualityComparer.Default.Equals(variableType, initializerInfo.Type))
            {
                TypeSyntax varTypeName = SyntaxFactory.IdentifierName("var")
                    .WithLeadingTrivia(variableTypeName.GetLeadingTrivia())
                    .WithTrailingTrivia(variableTypeName.GetTrailingTrivia());

                return node.ReplaceNode(variableTypeName, varTypeName);
            }
            else
            {
                return node;
            }
        }
    }
}
```

The method indicates that no rewriting takes place by returning the `node` parameter unmodified. If neither of those `if` expressions are true, the node represents a possible declaration with initialization. Add these statements to extract the type name specified in the declaration and bind it using the `Microsoft.CodeAnalysis.SemanticModel` field to obtain a type symbol:

```csharp
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace TransformationCS
{
    public class TypeInferenceRewriter : CSharpSyntaxRewriter
    {
        private readonly SemanticModel SemanticModel;

        public TypeInferenceRewriter(SemanticModel semanticModel) => SemanticModel = semanticModel;

        // five
        public override SyntaxNode VisitLocalDeclarationStatement(LocalDeclarationStatementSyntax node)
        {
            if (node.Declaration.Variables.Count > 1)
            {
                return node;
            }
            if (node.Declaration.Variables[0].Initializer == null)
            {
                return node;
            }

            var declarator = node.Declaration.Variables.First();
            var variableTypeName = node.Declaration.Type;

            var variableType = (ITypeSymbol)SemanticModel
                .GetSymbolInfo(variableTypeName)
                .Symbol;

            var initializerInfo = SemanticModel.GetTypeInfo(declarator.Initializer.Value);

            if (SymbolEqualityComparer.Default.Equals(variableType, initializerInfo.Type))
            {
                TypeSyntax varTypeName = SyntaxFactory.IdentifierName("var")
                    .WithLeadingTrivia(variableTypeName.GetLeadingTrivia())
                    .WithTrailingTrivia(variableTypeName.GetTrailingTrivia());

                return node.ReplaceNode(variableTypeName, varTypeName);
            }
            else
            {
                return node;
            }
        }
    }
}
```

Now, add this statement to bind the initializer expression:

```csharp
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace TransformationCS
{
    public class TypeInferenceRewriter : CSharpSyntaxRewriter
    {
        private readonly SemanticModel SemanticModel;

        public TypeInferenceRewriter(SemanticModel semanticModel) => SemanticModel = semanticModel;

        // five
        public override SyntaxNode VisitLocalDeclarationStatement(LocalDeclarationStatementSyntax node)
        {
            if (node.Declaration.Variables.Count > 1)
            {
                return node;
            }
            if (node.Declaration.Variables[0].Initializer == null)
            {
                return node;
            }

            var declarator = node.Declaration.Variables.First();
            var variableTypeName = node.Declaration.Type;

            var variableType = (ITypeSymbol)SemanticModel
                .GetSymbolInfo(variableTypeName)
                .Symbol;

            var initializerInfo = SemanticModel.GetTypeInfo(declarator.Initializer.Value);

            if (SymbolEqualityComparer.Default.Equals(variableType, initializerInfo.Type))
            {
                TypeSyntax varTypeName = SyntaxFactory.IdentifierName("var")
                    .WithLeadingTrivia(variableTypeName.GetLeadingTrivia())
                    .WithTrailingTrivia(variableTypeName.GetTrailingTrivia());

                return node.ReplaceNode(variableTypeName, varTypeName);
            }
            else
            {
                return node;
            }
        }
    }
}
```

Finally, add the following `if` statement to replace the existing type name with the `var` keyword if the type of the initializer expression matches the type specified:
