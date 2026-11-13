---
title: "Get started with semantic analysis (part 4 of 6)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/roslyn-sdk/get-started/semantic-analysis.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Get started with semantic analysis (part 4 of 6)

## Binding a name

The `Microsoft.CodeAnalysis.Compilation` creates the  `Microsoft.CodeAnalysis.SemanticModel` from the `Microsoft.CodeAnalysis.SyntaxTree`. After creating the model, you can query it to find the first `using` directive, and retrieve the symbol information for the `System` namespace. Add these two lines to your `Main` method to create the semantic model and retrieve the symbol for the first `using` directive:

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

The preceding code shows how to bind the name in the first `using` directive to retrieve a `Microsoft.CodeAnalysis.SymbolInfo` for the `System` namespace. The preceding code also illustrates that you use the **syntax model** to find the structure of the code; you use the **semantic model** to understand its meaning. The **syntax model** finds the string `System` in the `using` directive. The **semantic model** has all the information about the types defined in the `System` namespace.

From the `Microsoft.CodeAnalysis.SymbolInfo` object you can obtain the `Microsoft.CodeAnalysis.ISymbol` using the `Microsoft.CodeAnalysis.SymbolInfo.Symbol` property. This property returns the symbol this expression refers to. For expressions that don't refer to anything (such as numeric literals) this property is `null`. When the `Microsoft.CodeAnalysis.SymbolInfo.Symbol` is not null, the `Microsoft.CodeAnalysis.ISymbol.Kind` denotes the type of the symbol. In this example, the `Microsoft.CodeAnalysis.ISymbol.Kind` property is a `Microsoft.CodeAnalysis.SymbolKind.Namespace`. Add the following code to your `Main` method. It retrieves the symbol for the `System` namespace and then displays all the child namespaces declared in the `System` namespace:

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
