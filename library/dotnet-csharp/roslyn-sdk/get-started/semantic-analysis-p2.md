---
title: "Get started with semantic analysis (part 2 of 6)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/roslyn-sdk/get-started/semantic-analysis.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Get started with semantic analysis (part 2 of 6)

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

```csharp
﻿using System;
using System.Linq;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace SemanticQuickStart
{
    class Program
    {
        const string programText =
@"using System;
using System.Collections.Generic;
using System.Text;

namespace HelloWorld
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine(""Hello, World!"");
        }
    }
}";

        static void Main(string[] args)
        {
            SyntaxTree tree = CSharpSyntaxTree.ParseText(programText);

            CompilationUnitSyntax root = tree.GetCompilationUnitRoot();

            var compilation = CSharpCompilation.Create("HelloWorld")
                .AddReferences(MetadataReference.CreateFromFile(
                    typeof(string).Assembly.Location))
                .AddSyntaxTrees(tree);

            SemanticModel model = compilation.GetSemanticModel(tree);

            // Use the syntax tree to find "using System;"
            UsingDirectiveSyntax usingSystem = root.Usings[0];
            NameSyntax systemName = usingSystem.Name;

            // Use the semantic model for symbol information:
            SymbolInfo nameInfo = model.GetSymbolInfo(systemName);

            var systemSymbol = (INamespaceSymbol?)nameInfo.Symbol;
            if (systemSymbol?.GetNamespaceMembers() is not null)
            {
                foreach (INamespaceSymbol ns in systemSymbol?.GetNamespaceMembers()!)
                {
                    Console.WriteLine(ns);
                }
            }

            // Use the syntax model to find the literal string:
            LiteralExpressionSyntax helloWorldString = root.DescendantNodes()
            .OfType<LiteralExpressionSyntax>()
            .Single();

            // Use the semantic model for type information:
            TypeInfo literalInfo = model.GetTypeInfo(helloWorldString);

            var stringTypeSymbol = (INamedTypeSymbol?)literalInfo.Type;

            Console.Clear();

            // build the linq query in steps:
            // Exploratory code. You can look at the variables
            // from each step in the query to gain more understanding
            // of the logic to find the correct method names.

            var allMembers = stringTypeSymbol?.GetMembers();
            var methods = allMembers?.OfType<IMethodSymbol>();
            var publicStringReturningMethods = methods?
                .Where(m => SymbolEqualityComparer.Default.Equals(m.ReturnType, stringTypeSymbol) &&
                m.DeclaredAccessibility == Accessibility.Public);
            var distinctMethods = publicStringReturningMethods?.Select(m => m.Name).Distinct();

            foreach (string name in (from method in stringTypeSymbol?
                                     .GetMembers().OfType<IMethodSymbol>()
                                     where SymbolEqualityComparer.Default.Equals(method.ReturnType, stringTypeSymbol) &&
                                     method.DeclaredAccessibility == Accessibility.Public
                                     select method.Name).Distinct())
            {
                Console.WriteLine(name);
            }
        }
    }
}
```

Next, add the following code to build the syntax tree for the code text in the `programText` constant.  Add the following line to your `Main` method:

```csharp
﻿using System;
using System.Linq;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace SemanticQuickStart
{
    class Program
    {
        const string programText =
@"using System;
using System.Collections.Generic;
using System.Text;

namespace HelloWorld
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine(""Hello, World!"");
        }
    }
}";

        static void Main(string[] args)
        {
            SyntaxTree tree = CSharpSyntaxTree.ParseText(programText);

            CompilationUnitSyntax root = tree.GetCompilationUnitRoot();

            var compilation = CSharpCompilation.Create("HelloWorld")
                .AddReferences(MetadataReference.CreateFromFile(
                    typeof(string).Assembly.Location))
                .AddSyntaxTrees(tree);

            SemanticModel model = compilation.GetSemanticModel(tree);

            // Use the syntax tree to find "using System;"
            UsingDirectiveSyntax usingSystem = root.Usings[0];
            NameSyntax systemName = usingSystem.Name;

            // Use the semantic model for symbol information:
            SymbolInfo nameInfo = model.GetSymbolInfo(systemName);

            var systemSymbol = (INamespaceSymbol?)nameInfo.Symbol;
            if (systemSymbol?.GetNamespaceMembers() is not null)
            {
                foreach (INamespaceSymbol ns in systemSymbol?.GetNamespaceMembers()!)
                {
                    Console.WriteLine(ns);
                }
            }

            // Use the syntax model to find the literal string:
            LiteralExpressionSyntax helloWorldString = root.DescendantNodes()
            .OfType<LiteralExpressionSyntax>()
            .Single();

            // Use the semantic model for type information:
            TypeInfo literalInfo = model.GetTypeInfo(helloWorldString);

            var stringTypeSymbol = (INamedTypeSymbol?)literalInfo.Type;

            Console.Clear();

            // build the linq query in steps:
            // Exploratory code. You can look at the variables
            // from each step in the query to gain more understanding
            // of the logic to find the correct method names.

            var allMembers = stringTypeSymbol?.GetMembers();
            var methods = allMembers?.OfType<IMethodSymbol>();
            var publicStringReturningMethods = methods?
                .Where(m => SymbolEqualityComparer.Default.Equals(m.ReturnType, stringTypeSymbol) &&
                m.DeclaredAccessibility == Accessibility.Public);
            var distinctMethods = publicStringReturningMethods?.Select(m => m.Name).Distinct();

            foreach (string name in (from method in stringTypeSymbol?
                                     .GetMembers().OfType<IMethodSymbol>()
                                     where SymbolEqualityComparer.Default.Equals(method.ReturnType, stringTypeSymbol) &&
                                     method.DeclaredAccessibility == Accessibility.Public
                                     select method.Name).Distinct())
            {
                Console.WriteLine(name);
            }
        }
    }
}
```

Next, build a `Microsoft.CodeAnalysis.CSharp.CSharpCompilation` from the tree you already created. The "Hello World" sample relies on the `System.String` and `System.Console` types. You need to reference the assembly that declares those two types in your compilation. Add the following line to your `Main` method to create a compilation of your syntax tree, including the reference to the appropriate assembly:

```csharp
﻿using System;
using System.Linq;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace SemanticQuickStart
{
    class Program
    {
        const string programText =
@"using System;
using System.Collections.Generic;
using System.Text;

namespace HelloWorld
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine(""Hello, World!"");
        }
    }
}";

        static void Main(string[] args)
        {
            SyntaxTree tree = CSharpSyntaxTree.ParseText(programText);

            CompilationUnitSyntax root = tree.GetCompilationUnitRoot();

            var compilation = CSharpCompilation.Create("HelloWorld")
                .AddReferences(MetadataReference.CreateFromFile(
                    typeof(string).Assembly.Location))
                .AddSyntaxTrees(tree);

            SemanticModel model = compilation.GetSemanticModel(tree);

            // Use the syntax tree to find "using System;"
            UsingDirectiveSyntax usingSystem = root.Usings[0];
            NameSyntax systemName = usingSystem.Name;

            // Use the semantic model for symbol information:
            SymbolInfo nameInfo = model.GetSymbolInfo(systemName);

            var systemSymbol = (INamespaceSymbol?)nameInfo.Symbol;
            if (systemSymbol?.GetNamespaceMembers() is not null)
            {
                foreach (INamespaceSymbol ns in systemSymbol?.GetNamespaceMembers()!)
                {
                    Console.WriteLine(ns);
                }
            }

            // Use the syntax model to find the literal string:
            LiteralExpressionSyntax helloWorldString = root.DescendantNodes()
            .OfType<LiteralExpressionSyntax>()
            .Single();

            // Use the semantic model for type information:
            TypeInfo literalInfo = model.GetTypeInfo(helloWorldString);

            var stringTypeSymbol = (INamedTypeSymbol?)literalInfo.Type;

            Console.Clear();

            // build the linq query in steps:
            // Exploratory code. You can look at the variables
            // from each step in the query to gain more understanding
            // of the logic to find the correct method names.

            var allMembers = stringTypeSymbol?.GetMembers();
            var methods = allMembers?.OfType<IMethodSymbol>();
            var publicStringReturningMethods = methods?
                .Where(m => SymbolEqualityComparer.Default.Equals(m.ReturnType, stringTypeSymbol) &&
                m.DeclaredAccessibility == Accessibility.Public);
            var distinctMethods = publicStringReturningMethods?.Select(m => m.Name).Distinct();

            foreach (string name in (from method in stringTypeSymbol?
                                     .GetMembers().OfType<IMethodSymbol>()
                                     where SymbolEqualityComparer.Default.Equals(method.ReturnType, stringTypeSymbol) &&
                                     method.DeclaredAccessibility == Accessibility.Public
                                     select method.Name).Distinct())
            {
                Console.WriteLine(name);
            }
        }
    }
}
```

The `Microsoft.CodeAnalysis.CSharp.CSharpCompilation.AddReferences*` method adds references to the compilation. The `Microsoft.CodeAnalysis.MetadataReference.CreateFromFile*` method loads an assembly as a reference.
