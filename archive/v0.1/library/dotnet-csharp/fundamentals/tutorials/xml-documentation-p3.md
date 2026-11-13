---
title: "Generate XML documentation from your source code (part 3 of 3)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/tutorials/xml-documentation.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Generate XML documentation from your source code (part 3 of 3)

## Build output from comments

You can explore more by trying any of these tools to create output from XML comments:

- DocFX: *DocFX* is an API documentation generator for .NET, which currently supports C#, Visual Basic, and F#. It also allows you to customize the generated reference documentation. DocFX builds a static HTML website from your source code and Markdown files. Also, DocFX provides you with the flexibility to customize the layout and style of your website through templates. You can also create custom templates.
- Sandcastle: The *Sandcastle tools* create help files for managed class libraries containing both conceptual and API reference pages. The Sandcastle tools are command-line based and have no GUI front-end, project management features, or automated build process. The Sandcastle Help File Builder provides standalone GUI and command-line-based tools to build a help file in an automated fashion. A Visual Studio integration package is also available for it so that help projects can be created and managed entirely from within Visual Studio.
- Doxygen: *Doxygen* generates an online documentation browser (in HTML) or an offline reference manual (in LaTeX) from a set of documented source files. There's also support for generating output in RTF (MS Word), PostScript, hyperlinked PDF, compressed HTML, DocBook, and Unix manual pages. You can configure Doxygen to extract the code structure from undocumented source files.

## Related content

- XML Doc language reference
- Recommended XML tags
- XML Documentation examples
