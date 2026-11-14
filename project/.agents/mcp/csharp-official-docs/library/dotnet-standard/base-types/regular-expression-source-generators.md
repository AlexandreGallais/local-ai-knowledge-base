---
title: ".NET regular expression source generators (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/regular-expression-source-generators.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# .NET regular expression source generators

A regular expression, or regex, is a string that enables a developer to express a pattern being searched for, making it a common way to search text and extract results as a subset from the searched string. In .NET, the `System.Text.RegularExpressions` namespace is used to define `System.Text.RegularExpressions.Regex` instances and static methods and match on user-defined patterns. In this article, you'll learn how to use source generation to generate `Regex` instances to optimize performance.

> **Note:**
> Where possible, use source-generated regular expressions instead of compiling regular expressions using the `System.Text.RegularExpressions.RegexOptions.Compiled` option. Source generation can help your app start faster, run more quickly, and be more trimmable. To learn when source generation is possible, see When to use it.

## Compiled regular expressions

When you write `new Regex("somepattern")`, a few things happen. The specified pattern is parsed, both to ensure the validity of the pattern and to transform it into an internal tree that represents the parsed regex. The tree is then optimized in various ways, transforming the pattern into a functionally equivalent variation that can be more efficiently executed. The tree is written into a form that can be interpreted as a series of opcodes and operands that provide instructions to the regex interpreter engine on how to match. When a match is performed, the interpreter simply walks through those instructions, processing them against the input text. When instantiating a new `Regex` instance or calling one of the static methods on `Regex`, the interpreter is the default engine employed.

When you specify `System.Text.RegularExpressions.RegexOptions.Compiled`, all of the same construction-time work is performed. The resulting instructions are transformed further by the reflection-emit-based compiler into IL instructions that are written to a few `System.Reflection.Emit.DynamicMethod` objects. When a match is performed, those `DynamicMethod` methods are invoked. This IL essentially does exactly what the interpreter would do, except specialized for the exact pattern being processed. For example, if the pattern contains `[ac]`, the interpreter would see an opcode that says "match the input character at the current position against the set specified in this set description". Whereas the compiled IL would contain code that effectively says, "match the input character at the current position against `'a'` or `'c'`". This special casing and the ability to perform optimizations based on knowledge of the pattern are some of the main reasons that specifying `RegexOptions.Compiled` yields much faster-matching throughput than the interpreter.

There are several downsides to `RegexOptions.Compiled`. The most impactful is that it is costly to construct. Not only are all of the same costs paid as for the interpreter, but it then needs to compile the resulting `RegexNode` tree and generated opcodes/operands into IL, which adds non-trivial expense. The generated IL further needs to be JIT-compiled on first use, leading to even more expense at startup. `RegexOptions.Compiled` represents a fundamental tradeoff between overheads on the first use and overheads on every subsequent use. The use of `System.Reflection.Emit` also inhibits the use of `RegexOptions.Compiled` in certain environments; some operating systems don't permit dynamically generated code to be executed, and on such systems, `Compiled` becomes a no-op.

## Source generation

.NET 7 introduced a new `RegexGenerator` source generator. A *source generator* is a component that plugs into the compiler and augments the compilation unit with additional source code. The .NET SDK includes a source generator that recognizes the `System.Text.RegularExpressions.GeneratedRegexAttribute` attribute on a partial method that returns `Regex`. Starting in .NET 9, the attribute can also be applied to partial properties. The source generator provides an implementation of that method or property that contains all the logic for the `Regex`. For example, you previously might have written code like this:

```csharp
private static readonly Regex s_abcOrDefGeneratedRegex =
    new(pattern: "abc|def",
        options: RegexOptions.Compiled | RegexOptions.IgnoreCase);

private static void EvaluateText(string text)
{
    if (s_abcOrDefGeneratedRegex.IsMatch(text))
    {
        // Take action with matching text
    }
}
```

To use the source generator, you rewrite the previous code as follows:

```csharp
[GeneratedRegex("abc|def", RegexOptions.IgnoreCase, "en-US")]
private static partial Regex AbcOrDefGeneratedRegex();

private static void EvaluateText(string text)
{
    if (AbcOrDefGeneratedRegex().IsMatch(text))
    {
        // Take action with matching text
    }
}
```

Starting in .NET 9, you can also apply the `GeneratedRegexAttribute` to a partial property instead of a partial method. This is enabled by C# 13's support for partial properties. The following example shows the property equivalent:

```csharp
[GeneratedRegex("abc|def", RegexOptions.IgnoreCase, "en-US")]
private static partial Regex AbcOrDefGeneratedRegexProperty { get; }

private static void EvaluateText(string text)
{
    if (AbcOrDefGeneratedRegexProperty.IsMatch(text))
    {
        // Take action with matching text
    }
}
```

> **Tip:**
> The `RegexOptions.Compiled` flag is ignored by the source generator, thus it's not needed in the source-generated version.

The generated implementation of `AbcOrDefGeneratedRegex()` similarly caches a singleton `Regex` instance, so no additional caching is needed to consume code.

The following image is a screen capture of the source generated cached instance, `internal` to the `Regex` subclass that the source generator emits:

But as can be seen, it's not just doing `new Regex(...)`. Rather, the source generator is emitting as C# code a custom `Regex`-derived implementation with logic similar to what `RegexOptions.Compiled` emits in IL. You get all the throughput performance benefits of `RegexOptions.Compiled` (more, in fact) and the start-up benefits of `Regex.CompileToAssembly`, but without the complexity of `CompileToAssembly`. The source that's emitted is part of your project, which means it's also easily viewable and debuggable.

> **Tip:**
> In Visual Studio, right-click on your partial method or property declaration and select **Go To Definition**. Or, alternatively, select the project node in **Solution Explorer**, then expand **Dependencies** > **Analyzers** > **System.Text.RegularExpressions.Generator** > **System.Text.RegularExpressions.Generator.RegexGenerator** > _RegexGenerator.g.cs_ to see the generated C# code from this regex generator.

You can set breakpoints in it, you can step through it, and you can use it as a learning tool to understand exactly how the regex engine is processing your pattern with your input. The generator even generates triple-slash (XML) comments to help make the expression understandable at a glance and where it's used.
