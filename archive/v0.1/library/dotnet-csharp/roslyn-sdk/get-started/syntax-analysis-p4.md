---
title: "Get started with syntax analysis (Roslyn APIs) (part 4 of 5)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/roslyn-sdk/get-started/syntax-analysis.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Get started with syntax analysis (Roslyn APIs) (part 4 of 5)

```csharp
﻿using static System.Console;
using System.Linq;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace HelloSyntaxTree
{
    class Program
    {

        const string programText =
@"using System;
using System.Collections;
using System.Linq;
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

            WriteLine($"The tree is a {root.Kind()} node.");
            WriteLine($"The tree has {root.Members.Count} elements in it.");
            WriteLine($"The tree has {root.Usings.Count} using directives. They are:");
            foreach (UsingDirectiveSyntax element in root.Usings)
                WriteLine($"\t{element.Name}");

            MemberDeclarationSyntax firstMember = root.Members[0];
            WriteLine($"The first member is a {firstMember.Kind()}.");
            var helloWorldDeclaration = (NamespaceDeclarationSyntax)firstMember;

            WriteLine($"There are {helloWorldDeclaration.Members.Count} members declared in this namespace.");
            WriteLine($"The first member is a {helloWorldDeclaration.Members[0].Kind()}.");

            var programDeclaration = (ClassDeclarationSyntax)helloWorldDeclaration.Members[0];
            WriteLine($"There are {programDeclaration.Members.Count} members declared in the {programDeclaration.Identifier} class.");
            WriteLine($"The first member is a {programDeclaration.Members[0].Kind()}.");
            var mainDeclaration = (MethodDeclarationSyntax)programDeclaration.Members[0];

            WriteLine($"The return type of the {mainDeclaration.Identifier} method is {mainDeclaration.ReturnType}.");
            WriteLine($"The method has {mainDeclaration.ParameterList.Parameters.Count} parameters.");
            foreach (ParameterSyntax item in mainDeclaration.ParameterList.Parameters)
                WriteLine($"The type of the {item.Identifier} parameter is {item.Type}.");
            WriteLine($"The body text of the {mainDeclaration.Identifier} method follows:");
            WriteLine(mainDeclaration.Body?.ToFullString());

            var argsParameter = mainDeclaration.ParameterList.Parameters[0];

            var firstParameters = from methodDeclaration in root.DescendantNodes()
                                                    .OfType<MethodDeclarationSyntax>()
                                  where methodDeclaration.Identifier.ValueText == "Main"
                                  select methodDeclaration.ParameterList.Parameters.First();

            var argsParameter2 = firstParameters.Single();

            WriteLine(argsParameter == argsParameter2);
        }
    }
}
```

Run the program to see what you've learned.

Now that you know the declaration is a `Microsoft.CodeAnalysis.CSharp.Syntax.ClassDeclarationSyntax`, declare a new variable of that type to examine the class declaration. This class only contains one member: the `Main` method. Add the following code to find the `Main` method, and cast it to a `Microsoft.CodeAnalysis.CSharp.Syntax.MethodDeclarationSyntax`.

```csharp
﻿using static System.Console;
using System.Linq;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace HelloSyntaxTree
{
    class Program
    {

        const string programText =
@"using System;
using System.Collections;
using System.Linq;
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

            WriteLine($"The tree is a {root.Kind()} node.");
            WriteLine($"The tree has {root.Members.Count} elements in it.");
            WriteLine($"The tree has {root.Usings.Count} using directives. They are:");
            foreach (UsingDirectiveSyntax element in root.Usings)
                WriteLine($"\t{element.Name}");

            MemberDeclarationSyntax firstMember = root.Members[0];
            WriteLine($"The first member is a {firstMember.Kind()}.");
            var helloWorldDeclaration = (NamespaceDeclarationSyntax)firstMember;

            WriteLine($"There are {helloWorldDeclaration.Members.Count} members declared in this namespace.");
            WriteLine($"The first member is a {helloWorldDeclaration.Members[0].Kind()}.");

            var programDeclaration = (ClassDeclarationSyntax)helloWorldDeclaration.Members[0];
            WriteLine($"There are {programDeclaration.Members.Count} members declared in the {programDeclaration.Identifier} class.");
            WriteLine($"The first member is a {programDeclaration.Members[0].Kind()}.");
            var mainDeclaration = (MethodDeclarationSyntax)programDeclaration.Members[0];

            WriteLine($"The return type of the {mainDeclaration.Identifier} method is {mainDeclaration.ReturnType}.");
            WriteLine($"The method has {mainDeclaration.ParameterList.Parameters.Count} parameters.");
            foreach (ParameterSyntax item in mainDeclaration.ParameterList.Parameters)
                WriteLine($"The type of the {item.Identifier} parameter is {item.Type}.");
            WriteLine($"The body text of the {mainDeclaration.Identifier} method follows:");
            WriteLine(mainDeclaration.Body?.ToFullString());

            var argsParameter = mainDeclaration.ParameterList.Parameters[0];

            var firstParameters = from methodDeclaration in root.DescendantNodes()
                                                    .OfType<MethodDeclarationSyntax>()
                                  where methodDeclaration.Identifier.ValueText == "Main"
                                  select methodDeclaration.ParameterList.Parameters.First();

            var argsParameter2 = firstParameters.Single();

            WriteLine(argsParameter == argsParameter2);
        }
    }
}
```

The method declaration node contains all the syntactic information about the method. Let's display the return type of the `Main` method, the number and types of the arguments, and the body text of the method. Add the following code:

```csharp
﻿using static System.Console;
using System.Linq;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace HelloSyntaxTree
{
    class Program
    {

        const string programText =
@"using System;
using System.Collections;
using System.Linq;
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

            WriteLine($"The tree is a {root.Kind()} node.");
            WriteLine($"The tree has {root.Members.Count} elements in it.");
            WriteLine($"The tree has {root.Usings.Count} using directives. They are:");
            foreach (UsingDirectiveSyntax element in root.Usings)
                WriteLine($"\t{element.Name}");

            MemberDeclarationSyntax firstMember = root.Members[0];
            WriteLine($"The first member is a {firstMember.Kind()}.");
            var helloWorldDeclaration = (NamespaceDeclarationSyntax)firstMember;

            WriteLine($"There are {helloWorldDeclaration.Members.Count} members declared in this namespace.");
            WriteLine($"The first member is a {helloWorldDeclaration.Members[0].Kind()}.");

            var programDeclaration = (ClassDeclarationSyntax)helloWorldDeclaration.Members[0];
            WriteLine($"There are {programDeclaration.Members.Count} members declared in the {programDeclaration.Identifier} class.");
            WriteLine($"The first member is a {programDeclaration.Members[0].Kind()}.");
            var mainDeclaration = (MethodDeclarationSyntax)programDeclaration.Members[0];

            WriteLine($"The return type of the {mainDeclaration.Identifier} method is {mainDeclaration.ReturnType}.");
            WriteLine($"The method has {mainDeclaration.ParameterList.Parameters.Count} parameters.");
            foreach (ParameterSyntax item in mainDeclaration.ParameterList.Parameters)
                WriteLine($"The type of the {item.Identifier} parameter is {item.Type}.");
            WriteLine($"The body text of the {mainDeclaration.Identifier} method follows:");
            WriteLine(mainDeclaration.Body?.ToFullString());

            var argsParameter = mainDeclaration.ParameterList.Parameters[0];

            var firstParameters = from methodDeclaration in root.DescendantNodes()
                                                    .OfType<MethodDeclarationSyntax>()
                                  where methodDeclaration.Identifier.ValueText == "Main"
                                  select methodDeclaration.ParameterList.Parameters.First();

            var argsParameter2 = firstParameters.Single();

            WriteLine(argsParameter == argsParameter2);
        }
    }
}
```

Run the program to see all the information you've discovered about this program:

```text
The tree is a CompilationUnit node.
The tree has 1 elements in it.
The tree has 4 using directives. They are:
        System
        System.Collections
        System.Linq
        System.Text
The first member is a NamespaceDeclaration.
There are 1 members declared in this namespace.
The first member is a ClassDeclaration.
There are 1 members declared in the Program class.
The first member is a MethodDeclaration.
The return type of the Main method is void.
The method has 1 parameters.
The type of the args parameter is string[].
The body text of the Main method follows:
        {
            Console.WriteLine("Hello, World!");
        }
```

### Query methods

In addition to traversing trees, you can also explore the syntax tree using the query methods defined on `Microsoft.CodeAnalysis.SyntaxNode`. These methods should be immediately familiar to anyone familiar with XPath. You can use these methods with LINQ to quickly find things in a tree. The `Microsoft.CodeAnalysis.SyntaxNode` has query methods such as `Microsoft.CodeAnalysis.SyntaxNode.DescendantNodes*`, `Microsoft.CodeAnalysis.SyntaxNode.AncestorsAndSelf*` and `Microsoft.CodeAnalysis.SyntaxNode.ChildNodes*`.

You can use these query methods to find the argument to the `Main` method as an alternative to navigating the tree. Add the following code to the bottom of your `Main` method:

```csharp
﻿using static System.Console;
using System.Linq;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace HelloSyntaxTree
{
    class Program
    {

        const string programText =
@"using System;
using System.Collections;
using System.Linq;
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

            WriteLine($"The tree is a {root.Kind()} node.");
            WriteLine($"The tree has {root.Members.Count} elements in it.");
            WriteLine($"The tree has {root.Usings.Count} using directives. They are:");
            foreach (UsingDirectiveSyntax element in root.Usings)
                WriteLine($"\t{element.Name}");

            MemberDeclarationSyntax firstMember = root.Members[0];
            WriteLine($"The first member is a {firstMember.Kind()}.");
            var helloWorldDeclaration = (NamespaceDeclarationSyntax)firstMember;

            WriteLine($"There are {helloWorldDeclaration.Members.Count} members declared in this namespace.");
            WriteLine($"The first member is a {helloWorldDeclaration.Members[0].Kind()}.");

            var programDeclaration = (ClassDeclarationSyntax)helloWorldDeclaration.Members[0];
            WriteLine($"There are {programDeclaration.Members.Count} members declared in the {programDeclaration.Identifier} class.");
            WriteLine($"The first member is a {programDeclaration.Members[0].Kind()}.");
            var mainDeclaration = (MethodDeclarationSyntax)programDeclaration.Members[0];

            WriteLine($"The return type of the {mainDeclaration.Identifier} method is {mainDeclaration.ReturnType}.");
            WriteLine($"The method has {mainDeclaration.ParameterList.Parameters.Count} parameters.");
            foreach (ParameterSyntax item in mainDeclaration.ParameterList.Parameters)
                WriteLine($"The type of the {item.Identifier} parameter is {item.Type}.");
            WriteLine($"The body text of the {mainDeclaration.Identifier} method follows:");
            WriteLine(mainDeclaration.Body?.ToFullString());

            var argsParameter = mainDeclaration.ParameterList.Parameters[0];

            var firstParameters = from methodDeclaration in root.DescendantNodes()
                                                    .OfType<MethodDeclarationSyntax>()
                                  where methodDeclaration.Identifier.ValueText == "Main"
                                  select methodDeclaration.ParameterList.Parameters.First();

            var argsParameter2 = firstParameters.Single();

            WriteLine(argsParameter == argsParameter2);
        }
    }
}
```

The first statement uses a LINQ expression and the `Microsoft.CodeAnalysis.SyntaxNode.DescendantNodes*` method to locate the same parameter as in the previous example.

Run the program, and you can see that the LINQ expression found the same parameter as manually navigating the tree.

The sample uses `WriteLine` statements to display information about the syntax trees as they are traversed. You can also learn much more by running the finished program under the debugger. You can examine more of the properties and methods that are part of the syntax tree created for the hello world program.
