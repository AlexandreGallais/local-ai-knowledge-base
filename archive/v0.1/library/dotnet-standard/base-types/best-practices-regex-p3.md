---
title: "Best Practices for Regular Expressions in .NET (part 3 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/best-practices-regex.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Best Practices for Regular Expressions in .NET (part 3 of 5)

### Interpreted vs. source-generated vs. compiled regular expressions

Regular expression patterns that aren't bound to the regular expression engine through the specification of the `System.Text.RegularExpressions.RegexOptions.Compiled` option are *interpreted*. When a regular expression object is instantiated, the regular expression engine converts the regular expression to a set of operation codes. When an instance method is called, the operation codes are converted to CIL and executed by the JIT compiler. Similarly, when a static regular expression method is called and the regular expression can't be found in the cache, the regular expression engine converts the regular expression to a set of operation codes and stores them in the cache. It then converts these operation codes to CIL so that the JIT compiler can execute them. Interpreted regular expressions reduce startup time at the cost of slower execution time. Because of this process, they're best used when the regular expression is used in a small number of method calls, or if the exact number of calls to regular expression methods is unknown but is expected to be small. As the number of method calls increases, the performance gain from reduced startup time is outstripped by the slower execution speed.

Regular expression patterns that are bound to the regular expression engine through the specification of the `System.Text.RegularExpressions.RegexOptions.Compiled` option are *compiled*. Therefore, when a regular expression object is instantiated, or when a static regular expression method is called and the regular expression can't be found in the cache, the regular expression engine converts the regular expression to an intermediary set of operation codes. These codes are then converted to CIL. When a method is called, the JIT compiler executes the CIL. In contrast to interpreted regular expressions, compiled regular expressions increase startup time but execute individual pattern-matching methods faster. As a result, the performance benefit that results from compiling the regular expression increases in proportion to the number of regular expression methods called.

Regular expression patterns that are bound to the regular expression engine through the adornment of a `Regex`-returning method with the `System.Text.RegularExpressions.GeneratedRegexAttribute` attribute are *source generated*. The source generator, which plugs into the compiler, emits as C# code a custom `Regex`-derived implementation with logic similar to what `RegexOptions.Compiled` emits in CIL. You get all the throughput performance benefits of `RegexOptions.Compiled` (more, in fact) and the start-up benefits of `Regex.CompileToAssembly`, but without the complexity of `CompileToAssembly`. The source that's emitted is part of your project, which means it's also easily viewable and debuggable.

To summarize, we recommend that you:

- Use *interpreted* regular expressions when you call regular expression methods with a specific regular expression relatively infrequently.
- Use *source-generated* regular expressions if you're using `Regex` in C# with arguments known at compile time, and you're using a specific regular expression relatively frequently.
- Use *compiled* regular expressions when you call regular expression methods with a specific regular expression relatively frequently and you're using .NET 6 or an earlier version.

It's difficult to determine the exact threshold at which the slower execution speeds of interpreted regular expressions outweigh gains from their reduced startup time. It's also difficult to determine the threshold at which the slower startup times of source-generated or compiled regular expressions outweigh gains from their faster execution speeds. The thresholds depend on various factors, including the complexity of the regular expression and the specific data that it processes. To determine which regular expressions offer the best performance for your particular application scenario, you can use the `System.Diagnostics.Stopwatch` class to compare their execution times.

The following example compares the performance of compiled, source-generated, and interpreted regular expressions when reading the first 10 sentences and when reading all the sentences in the text of William D. Guthrie's *Magna Carta, and Other Addresses*. As the output from the example shows, when only 10 calls are made to regular expression matching methods, an interpreted or source-generated regular expression offers better performance than a compiled regular expression. However, a compiled regular expression offers better performance when a large number of calls (in this case, over 13,000) are made.

```csharp
using System;
using System.Diagnostics;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

internal static partial class CompareExample
{
    const string Pattern = @"\b(\w+((\r?\n)|,?\s))*\w+[.?:;!]";

    static readonly HttpClient s_client = new();

    [GeneratedRegex(Pattern, RegexOptions.Singleline)]
    private static partial Regex GeneratedRegex();

    public async static Task RunIt()
    {
        Stopwatch sw;
        Match match;
        int ctr;

        string text =
                await s_client.GetStringAsync("https://www.gutenberg.org/cache/epub/64197/pg64197.txt");

        // Read first ten sentences with interpreted regex.
        Console.WriteLine("10 Sentences with Interpreted Regex:");
        sw = Stopwatch.StartNew();
        Regex int10 = new(Pattern, RegexOptions.Singleline);
        match = int10.Match(text);
        for (ctr = 0; ctr <= 9; ctr++)
        {
            if (match.Success)
                // Do nothing with the match except get the next match.
                match = match.NextMatch();
            else
                break;
        }
        sw.Stop();
        Console.WriteLine($"   {ctr} matches in {sw.Elapsed}");

        // Read first ten sentences with compiled regex.
        Console.WriteLine("10 Sentences with Compiled Regex:");
        sw = Stopwatch.StartNew();
        Regex comp10 = new Regex(Pattern,
                     RegexOptions.Singleline | RegexOptions.Compiled);
        match = comp10.Match(text);
        for (ctr = 0; ctr <= 9; ctr++)
        {
            if (match.Success)
                // Do nothing with the match except get the next match.
                match = match.NextMatch();
            else
                break;
        }
        sw.Stop();
        Console.WriteLine($"   {ctr} matches in {sw.Elapsed}");

        // Read first ten sentences with source-generated regex.
        Console.WriteLine("10 Sentences with Source-generated Regex:");
        sw = Stopwatch.StartNew();

        match = GeneratedRegex().Match(text);
        for (ctr = 0; ctr <= 9; ctr++)
        {
            if (match.Success)
                // Do nothing with the match except get the next match.
                match = match.NextMatch();
            else
                break;
        }
        sw.Stop();
        Console.WriteLine($"   {ctr} matches in {sw.Elapsed}");

        // Read all sentences with interpreted regex.
        Console.WriteLine("All Sentences with Interpreted Regex:");
        sw = Stopwatch.StartNew();
        Regex intAll = new(Pattern, RegexOptions.Singleline);
        match = intAll.Match(text);
        int matches = 0;
        while (match.Success)
        {
            matches++;
            // Do nothing with the match except get the next match.
            match = match.NextMatch();
        }
        sw.Stop();
        Console.WriteLine($"   {matches:N0} matches in {sw.Elapsed}");

        // Read all sentences with compiled regex.
        Console.WriteLine("All Sentences with Compiled Regex:");
        sw = Stopwatch.StartNew();
        Regex compAll = new(Pattern,
                        RegexOptions.Singleline | RegexOptions.Compiled);
        match = compAll.Match(text);
        matches = 0;
        while (match.Success)
        {
            matches++;
            // Do nothing with the match except get the next match.
            match = match.NextMatch();
        }
        sw.Stop();
        Console.WriteLine($"   {matches:N0} matches in {sw.Elapsed}");

        // Read all sentences with source-generated regex.
        Console.WriteLine("All Sentences with Source-generated Regex:");
        sw = Stopwatch.StartNew();
        match = GeneratedRegex().Match(text);
        matches = 0;
        while (match.Success)
        {
            matches++;
            // Do nothing with the match except get the next match.
            match = match.NextMatch();
        }
        sw.Stop();
        Console.WriteLine($"   {matches:N0} matches in {sw.Elapsed}");

        return;
    }
    /* The example displays output similar to the following:

       10 Sentences with Interpreted Regex:
           10 matches in 00:00:00.0104920
       10 Sentences with Compiled Regex:
           10 matches in 00:00:00.0234604
       10 Sentences with Source-generated Regex:
           10 matches in 00:00:00.0060982
       All Sentences with Interpreted Regex:
           3,427 matches in 00:00:00.1745455
       All Sentences with Compiled Regex:
           3,427 matches in 00:00:00.0575488
       All Sentences with Source-generated Regex:
           3,427 matches in 00:00:00.2698670
    */
}
```

The regular expression pattern used in the example, `\b(\w+((\r?\n)|,?\s))*\w+[.?:;!]`, is defined as shown in the following table:

| Pattern | Description                          |
|---------|--------------------------------------|
| `\b`    | Begin the match at a word boundary.  |
| `\w+`   | Matches one or more word characters. |
|`(\r?\n)&#124;,?\s)`|Matches either zero or one carriage return followed by a newline character, or zero or one comma followed by a white-space character.|
|`(\w+((\r?\n)&#124;,?\s))*`|Matches zero or more occurrences of one or more word characters that are followed either by zero or one carriage return and a newline character, or by zero or one comma followed by a white-space character.|
|`\w+`|Matches one or more word characters.|
|`[.?:;!]`|Matches a period, question mark, colon, semicolon, or exclamation point.|
