---
title: "Get started with syntax transformation (Roslyn APIs) (part 2 of 5)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/roslyn-sdk/get-started/syntax-transformation.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Get started with syntax transformation (Roslyn APIs) (part 2 of 5)

## Create and transform trees

You choose one of two strategies for syntax transformations. **Factory methods** are best used when you're searching for specific nodes to replace, or specific locations where you want to insert new code. **Rewriters** are best when you want to scan an entire project for code patterns that you want to replace.

### Create nodes with factory methods

The first syntax transformation demonstrates the factory methods. You'<example-value>'s a factory method that creates an instance of that type. You create syntax trees by composing nodes hierarchically in a bottom-up fashion. Then, you'<example-value>'ve created.

Start Visual Studio, and create a new C# **Stand-Alone Code Analysis Tool** project. In Visual Studio, choose **File** > **New** > **Project** to display the New Project dialog. Under **Visual C#** > **Extensibility** choose a **Stand-Alone Code Analysis Tool**. This quickstart has two example projects, so name the solution **SyntaxTransformationQuickStart**, and name the project **ConstructionCS**. Click **OK**.

This project uses the `Microsoft.CodeAnalysis.CSharp.SyntaxFactory` class methods to construct a `Microsoft.CodeAnalysis.CSharp.Syntax.NameSyntax` representing the `System.Collections.Generic` namespace.

Add the following `using` directive to the top of the `Program.cs`.

```csharp
﻿using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

using static Microsoft.CodeAnalysis.CSharp.SyntaxFactory;
using static System.Console;

namespace ConstructionCS
{
    class Program
    {
        private const string sampleCode =
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

        static void Main()
        {
            NameSyntax name = IdentifierName("System");
            WriteLine($"\tCreated the identifier {name}");

            name = QualifiedName(name, IdentifierName("Collections"));
            WriteLine(name.ToString());

            name = QualifiedName(name, IdentifierName("Generic"));
            WriteLine(name.ToString());

            SyntaxTree tree = CSharpSyntaxTree.ParseText(sampleCode);
            var root = (CompilationUnitSyntax)tree.GetRoot();

            var oldUsing = root.Usings[1];
            var newUsing = oldUsing.WithName(name);
            WriteLine(root.ToString());

            WriteLine();
            WriteLine();

            root = root.ReplaceNode(oldUsing, newUsing);
            WriteLine(root.ToString());
        }
    }
}
```

You'll create **name syntax nodes** to build the tree that represents the `using System.Collections.Generic;` statement. `Microsoft.CodeAnalysis.CSharp.Syntax.NameSyntax` is the base class for four types of names that appear in C#. You compose these four types of names together to create any name that can appear in the C# language:

* `Microsoft.CodeAnalysis.CSharp.Syntax.NameSyntax`, which represents simple single identifier names like `System` and `Microsoft`.
* `Microsoft.CodeAnalysis.CSharp.Syntax.GenericNameSyntax`, which represents a generic type or method name such as `List<int>`.
* `Microsoft.CodeAnalysis.CSharp.Syntax.QualifiedNameSyntax`, which represents a qualified name of the form `<left-name>.<right-identifier-or-generic-name>` such as `System.IO`.
* `Microsoft.CodeAnalysis.CSharp.Syntax.AliasQualifiedNameSyntax`, which represents a name using an assembly extern alias such as `LibraryV2::Foo`.

You use the `Microsoft.CodeAnalysis.CSharp.SyntaxFactory.IdentifierName(System.String)` method to create a `Microsoft.CodeAnalysis.CSharp.Syntax.NameSyntax` node. Add the following code in your `Main` method in `Program.cs`:

```csharp
﻿using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

using static Microsoft.CodeAnalysis.CSharp.SyntaxFactory;
using static System.Console;

namespace ConstructionCS
{
    class Program
    {
        private const string sampleCode =
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

        static void Main()
        {
            NameSyntax name = IdentifierName("System");
            WriteLine($"\tCreated the identifier {name}");

            name = QualifiedName(name, IdentifierName("Collections"));
            WriteLine(name.ToString());

            name = QualifiedName(name, IdentifierName("Generic"));
            WriteLine(name.ToString());

            SyntaxTree tree = CSharpSyntaxTree.ParseText(sampleCode);
            var root = (CompilationUnitSyntax)tree.GetRoot();

            var oldUsing = root.Usings[1];
            var newUsing = oldUsing.WithName(name);
            WriteLine(root.ToString());

            WriteLine();
            WriteLine();

            root = root.ReplaceNode(oldUsing, newUsing);
            WriteLine(root.ToString());
        }
    }
}
```

The preceding code creates an `Microsoft.CodeAnalysis.CSharp.Syntax.IdentifierNameSyntax` object and assigns it to the variable `name`. Many of the Roslyn APIs return base classes to make it easier to work with related types. The variable `name`, an `Microsoft.CodeAnalysis.CSharp.Syntax.NameSyntax`, can be reused as you build the `Microsoft.CodeAnalysis.CSharp.Syntax.QualifiedNameSyntax`. Don't use type inference as you build the sample. You'll automate that step in this project.

You've created the name. Now, it's time to build more nodes into the tree by building a `Microsoft.CodeAnalysis.CSharp.Syntax.QualifiedNameSyntax`. The new tree uses `name` as the left of the name, and a new `Microsoft.CodeAnalysis.CSharp.Syntax.IdentifierNameSyntax` for the `Collections` namespace as the right side of the `Microsoft.CodeAnalysis.CSharp.Syntax.QualifiedNameSyntax`. Add the following code to `program.cs`:

```csharp
﻿using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

using static Microsoft.CodeAnalysis.CSharp.SyntaxFactory;
using static System.Console;

namespace ConstructionCS
{
    class Program
    {
        private const string sampleCode =
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

        static void Main()
        {
            NameSyntax name = IdentifierName("System");
            WriteLine($"\tCreated the identifier {name}");

            name = QualifiedName(name, IdentifierName("Collections"));
            WriteLine(name.ToString());

            name = QualifiedName(name, IdentifierName("Generic"));
            WriteLine(name.ToString());

            SyntaxTree tree = CSharpSyntaxTree.ParseText(sampleCode);
            var root = (CompilationUnitSyntax)tree.GetRoot();

            var oldUsing = root.Usings[1];
            var newUsing = oldUsing.WithName(name);
            WriteLine(root.ToString());

            WriteLine();
            WriteLine();

            root = root.ReplaceNode(oldUsing, newUsing);
            WriteLine(root.ToString());
        }
    }
}
```

Run the code again, and see the results. You're building a tree of nodes that represents code. You'll continue this pattern to build the `Microsoft.CodeAnalysis.CSharp.Syntax.QualifiedNameSyntax` for the namespace `System.Collections.Generic`. Add the following code to `Program.cs`:

```csharp
﻿using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

using static Microsoft.CodeAnalysis.CSharp.SyntaxFactory;
using static System.Console;

namespace ConstructionCS
{
    class Program
    {
        private const string sampleCode =
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

        static void Main()
        {
            NameSyntax name = IdentifierName("System");
            WriteLine($"\tCreated the identifier {name}");

            name = QualifiedName(name, IdentifierName("Collections"));
            WriteLine(name.ToString());

            name = QualifiedName(name, IdentifierName("Generic"));
            WriteLine(name.ToString());

            SyntaxTree tree = CSharpSyntaxTree.ParseText(sampleCode);
            var root = (CompilationUnitSyntax)tree.GetRoot();

            var oldUsing = root.Usings[1];
            var newUsing = oldUsing.WithName(name);
            WriteLine(root.ToString());

            WriteLine();
            WriteLine();

            root = root.ReplaceNode(oldUsing, newUsing);
            WriteLine(root.ToString());
        }
    }
}
```

Run the program again to see that you've built the tree for the code to add.
