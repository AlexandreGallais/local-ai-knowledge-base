---
title: "Get started with syntax analysis (Roslyn APIs) (part 5 of 5)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/roslyn-sdk/get-started/syntax-analysis.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Get started with syntax analysis (Roslyn APIs) (part 5 of 5)

## Syntax walkers

Often you want to find all nodes of a specific type in a syntax tree, for example, every property declaration in a file. By extending the `Microsoft.CodeAnalysis.CSharp.CSharpSyntaxWalker` class and overriding the `Microsoft.CodeAnalysis.CSharp.CSharpSyntaxVisitor.VisitPropertyDeclaration(Microsoft.CodeAnalysis.CSharp.Syntax.PropertyDeclarationSyntax)` method, you process every property declaration in a syntax tree without knowing its structure beforehand. `Microsoft.CodeAnalysis.CSharp.CSharpSyntaxWalker` is a specific kind of `Microsoft.CodeAnalysis.CSharp.CSharpSyntaxVisitor` that recursively visits a node and each of its children.

This example implements a `Microsoft.CodeAnalysis.CSharp.CSharpSyntaxWalker` that examines a syntax tree. It collects `using` directives it finds that aren't importing a `System` namespace.

Create a new C# **Stand-Alone Code Analysis Tool** project; name it "**SyntaxWalker**."

You can see the finished code for this sample in our GitHub repository. The sample on GitHub contains both projects described in this tutorial.

As in the previous sample, you can define a string constant to hold the text of the program you're going to analyze:

```csharp
﻿using static System.Console;

using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace SyntaxWalker
{
    class Program
    {
        const string programText =
@"using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;

namespace TopLevel
{
    using Microsoft;
    using System.ComponentModel;

    namespace Child1
    {
        using Microsoft.Win32;
        using System.Runtime.InteropServices;

        class Foo { }
    }

    namespace Child2
    {
        using System.CodeDom;
        using Microsoft.CSharp;

        class Bar { }
    }
}";

        static void Main()
        {
            SyntaxTree tree = CSharpSyntaxTree.ParseText(programText);
            CompilationUnitSyntax root = tree.GetCompilationUnitRoot();

            var collector = new UsingCollector();
            collector.Visit(root);
            foreach (var directive in collector.Usings)
            {
                WriteLine(directive.Name);
            }
        }
    }
}
```

This source text contains `using` directives scattered across four different locations: the file-level, in the top-level namespace, and in the two nested namespaces. This example highlights a core scenario for using the `Microsoft.CodeAnalysis.CSharp.CSharpSyntaxWalker` class to query code. It would be cumbersome to visit every node in the root syntax tree to find using declarations. Instead, you create a derived class and override the method that gets called only when the current node in the tree is a `using` directive. Your visitor does not do any work on any other node types. This single method examines each of the `using` directives and builds a collection of the namespaces that aren't in the `System` namespace. You build a `Microsoft.CodeAnalysis.CSharp.CSharpSyntaxWalker` that examines all the `using` directives, but only the `using` directives.

Now that you've defined the program text, you need to create a `SyntaxTree` and get the root of that tree:

```csharp
﻿using static System.Console;

using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace SyntaxWalker
{
    class Program
    {
        const string programText =
@"using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;

namespace TopLevel
{
    using Microsoft;
    using System.ComponentModel;

    namespace Child1
    {
        using Microsoft.Win32;
        using System.Runtime.InteropServices;

        class Foo { }
    }

    namespace Child2
    {
        using System.CodeDom;
        using Microsoft.CSharp;

        class Bar { }
    }
}";

        static void Main()
        {
            SyntaxTree tree = CSharpSyntaxTree.ParseText(programText);
            CompilationUnitSyntax root = tree.GetCompilationUnitRoot();

            var collector = new UsingCollector();
            collector.Visit(root);
            foreach (var directive in collector.Usings)
            {
                WriteLine(directive.Name);
            }
        }
    }
}
```

Next, create a new class. In Visual Studio, choose **Project** > **Add New Item**. In the **Add New Item** dialog type *UsingCollector.cs* as the filename.

You implement the `using` visitor functionality in the `UsingCollector` class. Start by making the `UsingCollector` class derive from `Microsoft.CodeAnalysis.CSharp.CSharpSyntaxWalker`.

```csharp
﻿using static System.Console;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.Collections.Generic;

namespace SyntaxWalker
{
    class UsingCollector : CSharpSyntaxWalker
    {
        public ICollection<UsingDirectiveSyntax> Usings { get; } = new List<UsingDirectiveSyntax>();

        public override void VisitUsingDirective(UsingDirectiveSyntax node)
        {
            WriteLine($"\tVisitUsingDirective called with {node.Name}.");
            if (node.Name.ToString() != "System" &&
                !node.Name.ToString().StartsWith("System."))
            {
                WriteLine($"\t\tSuccess. Adding {node.Name}.");
                this.Usings.Add(node);
            }
        }
    }
}
```

You need storage to hold the namespace nodes that you're collecting.  Declare a public read-only property in the `UsingCollector` class; you use this variable to store the `Microsoft.CodeAnalysis.CSharp.Syntax.UsingDirectiveSyntax` nodes you find:

```csharp
﻿using static System.Console;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.Collections.Generic;

namespace SyntaxWalker
{
    class UsingCollector : CSharpSyntaxWalker
    {
        public ICollection<UsingDirectiveSyntax> Usings { get; } = new List<UsingDirectiveSyntax>();

        public override void VisitUsingDirective(UsingDirectiveSyntax node)
        {
            WriteLine($"\tVisitUsingDirective called with {node.Name}.");
            if (node.Name.ToString() != "System" &&
                !node.Name.ToString().StartsWith("System."))
            {
                WriteLine($"\t\tSuccess. Adding {node.Name}.");
                this.Usings.Add(node);
            }
        }
    }
}
```

The base class, `Microsoft.CodeAnalysis.CSharp.CSharpSyntaxWalker` implements the logic to visit each node in the syntax tree. The derived class overrides the methods called for the specific nodes you're interested in. In this case, you're interested in any `using` directive. That means you must override the `Microsoft.CodeAnalysis.CSharp.CSharpSyntaxVisitor.VisitUsingDirective(Microsoft.CodeAnalysis.CSharp.Syntax.UsingDirectiveSyntax)` method. The one argument to this method is a `Microsoft.CodeAnalysis.CSharp.Syntax.UsingDirectiveSyntax` object. That's an important advantage to using the visitors: they call the overridden methods with arguments already cast to the specific node type. The `Microsoft.CodeAnalysis.CSharp.Syntax.UsingDirectiveSyntax` class has a `Microsoft.CodeAnalysis.CSharp.Syntax.UsingDirectiveSyntax.Name` property that stores the name of the namespace being imported. It is a `Microsoft.CodeAnalysis.CSharp.Syntax.NameSyntax`. Add the following code in the `Microsoft.CodeAnalysis.CSharp.CSharpSyntaxVisitor.VisitUsingDirective(Microsoft.CodeAnalysis.CSharp.Syntax.UsingDirectiveSyntax)` override:

```csharp
﻿using static System.Console;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.Collections.Generic;

namespace SyntaxWalker
{
    class UsingCollector : CSharpSyntaxWalker
    {
        public ICollection<UsingDirectiveSyntax> Usings { get; } = new List<UsingDirectiveSyntax>();

        public override void VisitUsingDirective(UsingDirectiveSyntax node)
        {
            WriteLine($"\tVisitUsingDirective called with {node.Name}.");
            if (node.Name.ToString() != "System" &&
                !node.Name.ToString().StartsWith("System."))
            {
                WriteLine($"\t\tSuccess. Adding {node.Name}.");
                this.Usings.Add(node);
            }
        }
    }
}
```

As with the earlier example, you've added a variety of `WriteLine` statements to aid in understanding of this method. You can see when it's called, and what arguments are passed to it each time.

Finally, you need to add two lines of code to create the `UsingCollector` and have it visit the root node, collecting all the `using` directives. Then, add a `foreach` loop to display all the `using` directives your collector found:

```csharp
﻿using static System.Console;

using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace SyntaxWalker
{
    class Program
    {
        const string programText =
@"using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;

namespace TopLevel
{
    using Microsoft;
    using System.ComponentModel;

    namespace Child1
    {
        using Microsoft.Win32;
        using System.Runtime.InteropServices;

        class Foo { }
    }

    namespace Child2
    {
        using System.CodeDom;
        using Microsoft.CSharp;

        class Bar { }
    }
}";

        static void Main()
        {
            SyntaxTree tree = CSharpSyntaxTree.ParseText(programText);
            CompilationUnitSyntax root = tree.GetCompilationUnitRoot();

            var collector = new UsingCollector();
            collector.Visit(root);
            foreach (var directive in collector.Usings)
            {
                WriteLine(directive.Name);
            }
        }
    }
}
```

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
