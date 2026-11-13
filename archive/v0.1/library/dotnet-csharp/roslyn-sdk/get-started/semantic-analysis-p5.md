---
title: "Get started with semantic analysis (part 5 of 6)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/roslyn-sdk/get-started/semantic-analysis.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Get started with semantic analysis (part 5 of 6)

### Binding an expression

The preceding code shows how to find a symbol by binding to a name. There are other expressions in a C# program that can be bound that aren't names. To demonstrate this capability, let's access the binding to a simple string literal.

The "Hello World" program contains a `Microsoft.CodeAnalysis.CSharp.Syntax.LiteralExpressionSyntax`, the "Hello, World!" string displayed to the console.

You find the "Hello, World!" string by locating the single string literal in the program. Then, once you've located the syntax node, get the type info for that node from the semantic model. Add the following code to your `Main` method:

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

The `Microsoft.CodeAnalysis.TypeInfo` struct includes a `Microsoft.CodeAnalysis.TypeInfo.Type` property that enables access to the semantic information about the type of the literal. In this example, that's the `string` type. Add a declaration that assigns this property to a local variable:

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

To finish this tutorial, let's build a LINQ query that creates a sequence of all the public methods declared on the `string` type that return a `string`. This query gets complex, so let's build it line by line, then reconstruct it as a single query. The source for this query is the sequence of all members declared on the `string` type:

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

That source sequence contains all members, including properties and fields, so filter it using the `System.Collections.Immutable.ImmutableArray`1.OfType*` method to find elements that are `Microsoft.CodeAnalysis.IMethodSymbol` objects:

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

Next, add another filter to return only those methods that are public and return a `string`:
