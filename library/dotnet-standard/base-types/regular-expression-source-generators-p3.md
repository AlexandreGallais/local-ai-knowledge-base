---
title: ".NET regular expression source generators (part 3 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/regular-expression-source-generators.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# .NET regular expression source generators (part 3 of 3)

## When to use it

The general guidance is if you can use the source generator, use it. If you're using `Regex` today in C# with arguments known at compile time, and especially if you're already using `RegexOptions.Compiled` (because the regex has been identified as a hot spot that would benefit from faster throughput), you should prefer to use the source generator. The source generator will give your regex the following benefits:

- All the throughput benefits of `RegexOptions.Compiled`.
- The startup benefits of not having to do all the regex parsing, analysis, and compilation at runtime.
- The option of using ahead-of-time compilation with the code generated for the regex.
- Better debuggability and understanding of the regex.
- The possibility to reduce the size of your trimmed app by trimming out large swaths of code associated with `RegexCompiler` (and potentially even reflection emit itself).

When used with an option like `RegexOptions.NonBacktracking` for which the source generator can't generate a custom implementation, it will still emit caching and XML comments that describe the implementation, making it valuable. The main downside of the source generator is that it emits additional code into your assembly, so there's the potential for increased size. The more regexes in your app and the larger they are, the more code will be emitted for them. In some situations, just as `RegexOptions.Compiled` might be unnecessary, so too might be the source generator. For example, if you have a regex that's needed only rarely and for which throughput doesn't matter, it could be more beneficial to just rely on the interpreter for that sporadic usage.

> **Important:**
> .NET 7 includes an analyzer that identifies the use of `Regex` that could be converted to the source generator, and a fixer that does the conversion for you:
>
> :::image type="content" source="media/regular-expression-source-generators/convert-to-regexgenerator.png" lightbox="media/regular-expression-source-generators/convert-to-regexgenerator.png" alt-text="RegexGenerator analyzer and fixer":::

## See also

- SYSLIB diagnostics for regex source generation
- .NET regular expressions
- Backtracking in regular expressions
- Compilation and reuse in regular expressions
- Source generators
- .NET Blog: Regular Expression improvements in .NET 7
