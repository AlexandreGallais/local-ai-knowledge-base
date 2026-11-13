---
title: "Get started with syntax transformation (Roslyn APIs) (part 3 of 5)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/roslyn-sdk/get-started/syntax-transformation.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Get started with syntax transformation (Roslyn APIs) (part 3 of 5)

### Create a modified tree

You've built a small syntax tree that contains one statement. The APIs to create new nodes are the right choice to create single statements or other small code blocks. However, to build larger blocks of code, you should use methods that replace nodes or insert nodes into an existing tree. Remember that syntax trees are immutable. The **Syntax API** doesn't provide any mechanism for modifying an existing syntax tree after construction. Instead, it provides methods that produce new trees based on changes to existing ones. `With*` methods are defined in concrete classes that derive from `Microsoft.CodeAnalysis.SyntaxNode` or in extension members declared in the `Microsoft.CodeAnalysis.SyntaxNodeExtensions` class. These methods create a new node by applying changes to an existing node's child properties. Additionally, the `Microsoft.CodeAnalysis.SyntaxNodeExtensions.ReplaceNode*` extension member can be used to replace a descendent node in a subtree. This method also updates the parent to point to the newly created child and repeats this process up the entire tree - a process known as _re-spinning_ the tree.

The next step is to create a tree that represents an entire (small) program and then modify it. Add the following code to the beginning of the `Program` class:

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

> **Note:**
> The example code uses the `System.Collections` namespace and not the `System.Collections.Generic` namespace.

Next, add the following code to the bottom of the `Main` method to parse the text and create a tree:

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

This example uses the `Microsoft.CodeAnalysis.CSharp.Syntax.UsingDirectiveSyntax.WithName(Microsoft.CodeAnalysis.CSharp.Syntax.NameSyntax)` method to replace the name in a `Microsoft.CodeAnalysis.CSharp.Syntax.UsingDirectiveSyntax` node with the one constructed in the preceding code.

Create a new `Microsoft.CodeAnalysis.CSharp.Syntax.UsingDirectiveSyntax` node using the `Microsoft.CodeAnalysis.CSharp.Syntax.UsingDirectiveSyntax.WithName(Microsoft.CodeAnalysis.CSharp.Syntax.NameSyntax)` method to update the `System.Collections` name with the name you created in the preceding code. Add the following code to the bottom of the `Main` method:

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

Run the program and look carefully at the output. The `newUsing` hasn't been placed in the root tree. The original tree hasn't been changed.

Add the following code using the `Microsoft.CodeAnalysis.SyntaxNodeExtensions.ReplaceNode*` extension method to create a new tree. The new tree is the result of replacing the existing import with the updated `newUsing` node. You assign this new tree to the existing `root` variable:

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

Run the program again. This time the tree now correctly imports the `System.Collections.Generic` namespace.
