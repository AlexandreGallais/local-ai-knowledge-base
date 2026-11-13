---
title: "Get started with syntax analysis (Roslyn APIs) (part 3 of 5)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/roslyn-sdk/get-started/syntax-analysis.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Get started with syntax analysis (Roslyn APIs) (part 3 of 5)

### Manual traversal

You can see the finished code for this sample in our GitHub repository.

> **Note:**
> The Syntax Tree types use inheritance to describe the different syntax elements that are valid at different locations in the program. Using these APIs often means casting properties or collection members to specific derived types. In the following examples, the assignment and the casts are separate statements, using explicitly typed variables. You can read the code to see the return types of the API and the runtime type of the objects returned. In practice, it's more common to use implicitly typed variables and rely on API names to describe the type of objects being examined.

Create a new C# **Stand-Alone Code Analysis Tool** project:

* In Visual Studio, choose **File** > **New** > **Project** to display the New Project dialog.
* Under **Visual C#** > **Extensibility**, choose **Stand-Alone Code Analysis Tool**.
* Name your project "**SyntaxTreeManualTraversal**" and click OK.

You're going to analyze the basic "Hello World!" program shown earlier.
Add the text for the Hello World program as a constant in your `Program` class:

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

Next, add the following code to build the **syntax tree** for the code text in the `programText` constant.  Add the following line to your `Main` method:

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

Those two lines create the tree and retrieve the root node of that tree. You can now examine the nodes in the tree. Add these lines to your `Main` method to display some of the properties of the root node in the tree:

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

Run the application to see what your code has discovered about the root node in this tree.

Typically, you'd traverse the tree to learn about the code. In this example, you're analyzing code you know to explore the APIs. Add the following code to examine the first member of the `root` node:

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

That member is a `Microsoft.CodeAnalysis.CSharp.Syntax.NamespaceDeclarationSyntax`. It represents everything in the scope of the `namespace HelloWorld` declaration. Add the following code to examine what nodes are declared inside the `HelloWorld` namespace:
