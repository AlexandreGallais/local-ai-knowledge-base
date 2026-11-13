---
title: "Tutorial: Write your first analyzer and code fix (part 2 of 13)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/roslyn-sdk/tutorials/how-to-write-csharp-analyzer-code-fix.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Tutorial: Write your first analyzer and code fix (part 2 of 13)

## Create analyzer registrations

The template creates the initial `DiagnosticAnalyzer` class in the *MakeConstAnalyzer.cs* file. This initial analyzer shows two important properties of every analyzer.

- Every diagnostic analyzer must provide a `[DiagnosticAnalyzer]` attribute that describes the language it operates on.
- Every diagnostic analyzer must derive (directly or indirectly) from the `Microsoft.CodeAnalysis.Diagnostics.DiagnosticAnalyzer` class.

The template also shows the basic features that are part of any analyzer:

1. Register actions. The actions represent code changes that should trigger your analyzer to examine code for violations. When Visual Studio detects code edits that match a registered action, it calls your analyzer's registered method.
1. Create diagnostics. When your analyzer detects a violation, it creates a diagnostic object that Visual Studio uses to notify the user of the violation.

You register actions in your override of `Microsoft.CodeAnalysis.Diagnostics.DiagnosticAnalyzer.Initialize(Microsoft.CodeAnalysis.Diagnostics.AnalysisContext)` method. In this tutorial, you'll visit **syntax nodes** looking for local declarations, and see which of those have constant values. If a declaration could be constant, your analyzer creates and reports a diagnostic.

The first step is to update the registration constants and `Initialize` method so these constants indicate your "Make Const" analyzer. Most of the string constants are defined in the string resource file. Follow that practice for easier localization. Open the *Resources.resx* file for the **MakeConst** analyzer project. This action displays the resource editor. Update the string resources as follows:

- Change `AnalyzerDescription` to ":::no-loc text="Variables that aren't modified should be made constants.":::".
- Change `AnalyzerMessageFormat` to ":::no-loc text="Variable '{0}' can be made constant":::".
- Change `AnalyzerTitle` to ":::no-loc text="Variable can be made constant":::".

When you finish, the resource editor should appear as shown in the following figure:

Make the remaining changes in the analyzer file. Open *MakeConstAnalyzer.cs* in Visual Studio. Change the registered action from one that acts on symbols to one that acts on syntax. In the `MakeConstAnalyzerAnalyzer.Initialize` method, find the line that registers the action on symbols:

```csharp
context.RegisterSymbolAction(AnalyzeSymbol, SymbolKind.NamedType);
```

Replace it with the following line:

```csharp
﻿using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.Diagnostics;

namespace MakeConst
{
    [DiagnosticAnalyzer(LanguageNames.CSharp)]
    public class MakeConstAnalyzer : DiagnosticAnalyzer
    {
        public const string DiagnosticId = "MakeConst";

        // You can change these strings in the Resources.resx file. If you do not want your analyzer to be localize-able, you can use regular strings for Title and MessageFormat.
        // See https://github.com/dotnet/roslyn/blob/main/docs/analyzers/Localizing%20Analyzers.md for more on localization
        private static readonly LocalizableString Title = new LocalizableResourceString(nameof(Resources.AnalyzerTitle), Resources.ResourceManager, typeof(Resources));
        private static readonly LocalizableString MessageFormat = new LocalizableResourceString(nameof(Resources.AnalyzerMessageFormat), Resources.ResourceManager, typeof(Resources));
        private static readonly LocalizableString Description = new LocalizableResourceString(nameof(Resources.AnalyzerDescription), Resources.ResourceManager, typeof(Resources));
        private const string Category = "Usage";

        private static DiagnosticDescriptor Rule = new DiagnosticDescriptor(DiagnosticId, Title, MessageFormat, Category, DiagnosticSeverity.Warning, isEnabledByDefault: true, description: Description);

        public override ImmutableArray<DiagnosticDescriptor> SupportedDiagnostics { get { return ImmutableArray.Create(Rule); } }

        public override void Initialize(AnalysisContext context)
        {
             // See https://github.com/dotnet/roslyn/blob/main/docs/analyzers/Analyzer%20Actions%20Semantics.md for more information
            context.ConfigureGeneratedCodeAnalysis(GeneratedCodeAnalysisFlags.None);
            context.EnableConcurrentExecution();
            context.RegisterSyntaxNodeAction(AnalyzeNode, SyntaxKind.LocalDeclarationStatement);
        }

        private void AnalyzeNode(SyntaxNodeAnalysisContext context)
        {
            var localDeclaration = (LocalDeclarationStatementSyntax)context.Node;

            // make sure the declaration isn't already const:
            if (localDeclaration.Modifiers.Any(SyntaxKind.ConstKeyword))
            {
                return;
            }

            TypeSyntax variableTypeName = localDeclaration.Declaration.Type;
            ITypeSymbol variableType = context.SemanticModel.GetTypeInfo(variableTypeName, context.CancellationToken).ConvertedType;

            // Ensure that all variables in the local declaration have initializers that
            // are assigned with constant values.
            foreach (VariableDeclaratorSyntax variable in localDeclaration.Declaration.Variables)
            {
                EqualsValueClauseSyntax initializer = variable.Initializer;
                if (initializer == null)
                {
                    return;
                }

                Optional<object> constantValue = context.SemanticModel.GetConstantValue(initializer.Value, context.CancellationToken);
                if (!constantValue.HasValue)
                {
                    return;
                }

                // Ensure that the initializer value can be converted to the type of the
                // local declaration without a user-defined conversion.
                Conversion conversion = context.SemanticModel.ClassifyConversion(initializer.Value, variableType);
                if (!conversion.Exists || conversion.IsUserDefined)
                {
                    return;
                }

                // Special cases:
                //  * If the constant value is a string, the type of the local declaration
                //    must be System.String.
                //  * If the constant value is null, the type of the local declaration must
                //    be a reference type.
                if (constantValue.Value is string)
                {
                    if (variableType.SpecialType != SpecialType.System_String)
                    {
                        return;
                    }
                }
                else if (variableType.IsReferenceType && constantValue.Value != null)
                {
                    return;
                }
            }

            // Perform data flow analysis on the local declaration.
            DataFlowAnalysis dataFlowAnalysis = context.SemanticModel.AnalyzeDataFlow(localDeclaration);

            foreach (VariableDeclaratorSyntax variable in localDeclaration.Declaration.Variables)
            {
                // Retrieve the local symbol for each variable in the local declaration
                // and ensure that it is not written outside of the data flow analysis region.
                ISymbol variableSymbol = context.SemanticModel.GetDeclaredSymbol(variable, context.CancellationToken);
                if (dataFlowAnalysis.WrittenOutside.Contains(variableSymbol))
                {
                    return;
                }
            }

            context.ReportDiagnostic(Diagnostic.Create(Rule, context.Node.GetLocation(), localDeclaration.Declaration.Variables.First().Identifier.ValueText));
        }
    }
}
```
After that change, you can delete the `AnalyzeSymbol` method. This analyzer examines `Microsoft.CodeAnalysis.CSharp.SyntaxKind.LocalDeclarationStatement`, not `Microsoft.CodeAnalysis.SymbolKind.NamedType` statements. Notice that `AnalyzeNode` has red squiggles under it. The code you just added references an `AnalyzeNode` method that isn't declared. Declare that method by using the following code:

```csharp
private void AnalyzeNode(SyntaxNodeAnalysisContext context)
{
}
```

Change the `Category` to ":::no-loc text="Usage":::" in *MakeConstAnalyzer.cs* as shown in the following code:

```csharp
﻿using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.Diagnostics;

namespace MakeConst
{
    [DiagnosticAnalyzer(LanguageNames.CSharp)]
    public class MakeConstAnalyzer : DiagnosticAnalyzer
    {
        public const string DiagnosticId = "MakeConst";

        // You can change these strings in the Resources.resx file. If you do not want your analyzer to be localize-able, you can use regular strings for Title and MessageFormat.
        // See https://github.com/dotnet/roslyn/blob/main/docs/analyzers/Localizing%20Analyzers.md for more on localization
        private static readonly LocalizableString Title = new LocalizableResourceString(nameof(Resources.AnalyzerTitle), Resources.ResourceManager, typeof(Resources));
        private static readonly LocalizableString MessageFormat = new LocalizableResourceString(nameof(Resources.AnalyzerMessageFormat), Resources.ResourceManager, typeof(Resources));
        private static readonly LocalizableString Description = new LocalizableResourceString(nameof(Resources.AnalyzerDescription), Resources.ResourceManager, typeof(Resources));
        private const string Category = "Usage";

        private static DiagnosticDescriptor Rule = new DiagnosticDescriptor(DiagnosticId, Title, MessageFormat, Category, DiagnosticSeverity.Warning, isEnabledByDefault: true, description: Description);

        public override ImmutableArray<DiagnosticDescriptor> SupportedDiagnostics { get { return ImmutableArray.Create(Rule); } }

        public override void Initialize(AnalysisContext context)
        {
             // See https://github.com/dotnet/roslyn/blob/main/docs/analyzers/Analyzer%20Actions%20Semantics.md for more information
            context.ConfigureGeneratedCodeAnalysis(GeneratedCodeAnalysisFlags.None);
            context.EnableConcurrentExecution();
            context.RegisterSyntaxNodeAction(AnalyzeNode, SyntaxKind.LocalDeclarationStatement);
        }

        private void AnalyzeNode(SyntaxNodeAnalysisContext context)
        {
            var localDeclaration = (LocalDeclarationStatementSyntax)context.Node;

            // make sure the declaration isn't already const:
            if (localDeclaration.Modifiers.Any(SyntaxKind.ConstKeyword))
            {
                return;
            }

            TypeSyntax variableTypeName = localDeclaration.Declaration.Type;
            ITypeSymbol variableType = context.SemanticModel.GetTypeInfo(variableTypeName, context.CancellationToken).ConvertedType;

            // Ensure that all variables in the local declaration have initializers that
            // are assigned with constant values.
            foreach (VariableDeclaratorSyntax variable in localDeclaration.Declaration.Variables)
            {
                EqualsValueClauseSyntax initializer = variable.Initializer;
                if (initializer == null)
                {
                    return;
                }

                Optional<object> constantValue = context.SemanticModel.GetConstantValue(initializer.Value, context.CancellationToken);
                if (!constantValue.HasValue)
                {
                    return;
                }

                // Ensure that the initializer value can be converted to the type of the
                // local declaration without a user-defined conversion.
                Conversion conversion = context.SemanticModel.ClassifyConversion(initializer.Value, variableType);
                if (!conversion.Exists || conversion.IsUserDefined)
                {
                    return;
                }

                // Special cases:
                //  * If the constant value is a string, the type of the local declaration
                //    must be System.String.
                //  * If the constant value is null, the type of the local declaration must
                //    be a reference type.
                if (constantValue.Value is string)
                {
                    if (variableType.SpecialType != SpecialType.System_String)
                    {
                        return;
                    }
                }
                else if (variableType.IsReferenceType && constantValue.Value != null)
                {
                    return;
                }
            }

            // Perform data flow analysis on the local declaration.
            DataFlowAnalysis dataFlowAnalysis = context.SemanticModel.AnalyzeDataFlow(localDeclaration);

            foreach (VariableDeclaratorSyntax variable in localDeclaration.Declaration.Variables)
            {
                // Retrieve the local symbol for each variable in the local declaration
                // and ensure that it is not written outside of the data flow analysis region.
                ISymbol variableSymbol = context.SemanticModel.GetDeclaredSymbol(variable, context.CancellationToken);
                if (dataFlowAnalysis.WrittenOutside.Contains(variableSymbol))
                {
                    return;
                }
            }

            context.ReportDiagnostic(Diagnostic.Create(Rule, context.Node.GetLocation(), localDeclaration.Declaration.Variables.First().Identifier.ValueText));
        }
    }
}
```
