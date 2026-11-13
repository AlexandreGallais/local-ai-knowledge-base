---
title: "Generate XML documentation from your source code (part 1 of 3)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/tutorials/xml-documentation.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Tutorial: Create XML documentation

In this tutorial, you take an existing object‑oriented sample (from the preceding tutorial) and enhance it with XML documentation comments. XML documentation comments provide helpful IntelliSense tooltips, and can participate in generated API reference docs. You learn which elements deserve comments, how to use core tags like `<summary>`, `<param>`, `<returns>`, `<value>`, `<remarks>`, `<example>`, `<seealso>`, `<exception>`, and `<inheritdoc>`, and how consistent, purposeful commenting improves maintainability, discoverability, and collaboration—without adding noise. By the end, you annotated the public surface of the sample, built the project to emit the XML documentation file, and seen how those comments flow directly into the developer experience and downstream documentation tooling.

In this tutorial, you:

>
> * Enable XML documentation output in your C# project.
> * Add and structure XML documentation comments to types and members.
> * Build the project and inspect the generated XML documentation file.

## Prerequisites

- The .NET SDK
- Either Visual Studio or Visual Studio Code with the C# Dev Kit.

## Enable XML documentation

Load the project you built in the preceding object-oriented tutorial. If you prefer to start fresh, clone the sample from the `dotnet/docs` repository under the `snippets/object-oriented-programming` folder.

Next, enable XML documentation output so the compiler emits a `.xml` file alongside your assembly. Edit the project file and add (or confirm) the following property inside a `<PropertyGroup>` element:

```xml
<GenerateDocumentationFile>True</GenerateDocumentationFile>
```

If you're using Visual Studio, you can enable this using the "build" property page.

Build the project. The compiler produces an XML file that aggregates all the `///` comments from publicly visible types and members. That file feeds IntelliSense tooltips, static analysis tools, and downstream documentation generation systems.

Build the project now. You see warnings for any public members that are missing `<summary>` comments. Treat those warnings as a to-do list that helps you provide complete, intentional documentation. Open the generated XML file (it's next to your build output) and inspect the initial structure. At first, the `<members>` section is empty because you didn't add comments yet:

```xml
<?xml version="1.0"?>
<doc>
    <assembly>
        <name>oo-programming</name>
    </assembly>
    <members>
    </members>
</doc>
```

With the file in place, start adding targeted XML comments and immediately verify how each one appears in the generated output. Start with the `Transaction` record type:

```csharp
﻿namespace OOProgramming;

/// <summary>
/// Represents an immutable financial transaction with an amount, date, and descriptive notes.
/// </summary>
/// <param name="Amount">The transaction amount. Positive values represent credits/deposits, negative values represent debits/withdrawals.</param>
/// <param name="Date">The date and time when the transaction occurred.</param>
/// <param name="Notes">Descriptive notes or memo text associated with the transaction.</param>
public record Transaction(decimal Amount, DateTime Date, string Notes);
```
