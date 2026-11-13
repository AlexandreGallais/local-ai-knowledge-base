---
title: "Get started with semantic analysis (part 3 of 6)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/roslyn-sdk/get-started/semantic-analysis.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Get started with semantic analysis (part 3 of 6)

## Querying the semantic model

Once you have a `Microsoft.CodeAnalysis.Compilation` you can ask it for a `Microsoft.CodeAnalysis.SemanticModel` for any `Microsoft.CodeAnalysis.SyntaxTree` contained in that `Microsoft.CodeAnalysis.Compilation`. You can think of the semantic model as the source for all the information you would normally get from intellisense. A `Microsoft.CodeAnalysis.SemanticModel` can answer questions like "What names are in scope at this location?", "What members are accessible from this method?", "What variables are used in this block of text?", and "What does this name/expression refer to?" Add this statement to create the semantic model:

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
