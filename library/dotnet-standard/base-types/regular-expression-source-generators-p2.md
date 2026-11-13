---
title: ".NET regular expression source generators (part 2 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/regular-expression-source-generators.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# .NET regular expression source generators (part 2 of 3)

## Inside the source-generated files

With .NET 7, both the source generator and `RegexCompiler` were almost entirely rewritten, fundamentally changing the structure of the generated code. This approach has been extended to handle all constructs (with one caveat), and both `RegexCompiler` and the source generator still map mostly 1:1 with each other, following the new approach. Consider the source generator output for one of the primary functions from the `abc|def` expression:

```csharp
private bool TryMatchAtCurrentPosition(ReadOnlySpan<char> inputSpan)
{
    int pos = base.runtextpos;
    int matchStart = pos;
    ReadOnlySpan<char> slice = inputSpan.Slice(pos);

    // Match with 2 alternative expressions, atomically.
    {
        if (slice.IsEmpty)
        {
            return false; // The input didn't match.
        }

        switch (slice[0])
        {
            case 'A' or 'a':
                if ((uint)slice.Length < 3 ||
                    !slice.Slice(1).StartsWith("bc", StringComparison.OrdinalIgnoreCase)) // Match the string "bc" (ordinal case-insensitive)
                {
                    return false; // The input didn't match.
                }

                pos += 3;
                slice = inputSpan.Slice(pos);
                break;

            case 'D' or 'd':
                if ((uint)slice.Length < 3 ||
                    !slice.Slice(1).StartsWith("ef", StringComparison.OrdinalIgnoreCase)) // Match the string "ef" (ordinal case-insensitive)
                {
                    return false; // The input didn't match.
                }

                pos += 3;
                slice = inputSpan.Slice(pos);
                break;

            default:
                return false; // The input didn't match.
        }
    }

    // The input matched.
    base.runtextpos = pos;
    base.Capture(0, matchStart, pos);
    return true;
}
```

The goal of the source-generated code is to be understandable, with an easy-to-follow structure, with comments explaining what's being done at each step, and in general with code emitted under the guiding principle that the generator should emit code as if a human had written it. Even when backtracking is involved, the structure of the backtracking becomes part of the structure of the code, rather than relying on a stack to indicate where to jump next. For example, here's the code for the same generated matching function when the expression is `[ab]*[bc]`:

```csharp
private bool TryMatchAtCurrentPosition(ReadOnlySpan<char> inputSpan)
{
    int pos = base.runtextpos;
    int matchStart = pos;
    int charloop_starting_pos = 0, charloop_ending_pos = 0;
    ReadOnlySpan<char> slice = inputSpan.Slice(pos);

    // Match a character in the set [ABab] greedily any number of times.
    //{
        charloop_starting_pos = pos;

        int iteration = slice.IndexOfAnyExcept(Utilities.s_ascii_600000006000000);
        if (iteration < 0)
        {
            iteration = slice.Length;
        }

        slice = slice.Slice(iteration);
        pos += iteration;

        charloop_ending_pos = pos;
        goto CharLoopEnd;

        CharLoopBacktrack:

        if (Utilities.s_hasTimeout)
        {
            base.CheckTimeout();
        }

        if (charloop_starting_pos >= charloop_ending_pos ||
            (charloop_ending_pos = inputSpan.Slice(charloop_starting_pos, charloop_ending_pos - charloop_starting_pos).LastIndexOfAny(Utilities.s_ascii_C0000000C000000)) < 0)
        {
            return false; // The input didn't match.
        }
        charloop_ending_pos += charloop_starting_pos;
        pos = charloop_ending_pos;
        slice = inputSpan.Slice(pos);

        CharLoopEnd:
    //}

    // Advance the next matching position.
    if (base.runtextpos < pos)
    {
        base.runtextpos = pos;
    }

    // Match a character in the set [BCbc].
    if (slice.IsEmpty || ((uint)((slice[0] | 0x20) - 'b') > (uint)('c' - 'b')))
    {
        goto CharLoopBacktrack;
    }

    // The input matched.
    pos++;
    base.runtextpos = pos;
    base.Capture(0, matchStart, pos);
    return true;
}
```

You can see the structure of the backtracking in the code, with a `CharLoopBacktrack` label emitted for where to backtrack to and a `goto` used to jump to that location when a subsequent portion of the regex fails.

If you look at the code implementing `RegexCompiler` and the source generator, they will look extremely similar: similarly named methods, similar call structure, and even similar comments throughout the implementation. For the most part, they result in identical code, albeit one in IL and one in C#. Of course, the C# compiler is then responsible for translating the C# into IL, so the resulting IL in both cases likely won't be identical. The source generator relies on that in various cases, taking advantage of the fact that the C# compiler will further optimize various C# constructs. There are a few specific things the source generator will thus produce more optimized matching code than does `RegexCompiler`. For example, in one of the previous examples, you can see the source generator emitting a switch statement, with one branch for `'a'` and another branch for `'b'`. Because the C# compiler is very good at optimizing switch statements, with multiple strategies at its disposal for how to do so efficiently, the source generator has a special optimization that `RegexCompiler` does not. For alternations, the source generator looks at all of the branches, and if it can prove that every branch begins with a different starting character, it will emit a switch statement over that first character and avoid outputting any backtracking code for that alternation.

Here's a slightly more complicated example of that. Alternations are more heavily analyzed to determine whether it's possible to refactor them in a way that will make them more easily optimized by the backtracking engines and that will lead to simpler source-generated code. One such optimization supports extracting common prefixes from branches, and if the alternation is atomic such that ordering doesn't matter, reordering branches to allow for more such extraction. You can see the impact of that for the following weekday pattern `Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday`, which produces a matching function like this:

```csharp
private bool TryMatchAtCurrentPosition(ReadOnlySpan<char> inputSpan)
{
    int pos = base.runtextpos;
    int matchStart = pos;
    char ch;
    ReadOnlySpan<char> slice = inputSpan.Slice(pos);

    // Match with 6 alternative expressions, atomically.
    {
        int alternation_starting_pos = pos;

        // Branch 0
        {
            if ((uint)slice.Length < 6 ||
                !slice.StartsWith("monday", StringComparison.OrdinalIgnoreCase)) // Match the string "monday" (ordinal case-insensitive)
            {
                goto AlternationBranch;
            }

            pos += 6;
            slice = inputSpan.Slice(pos);
            goto AlternationMatch;

            AlternationBranch:
            pos = alternation_starting_pos;
            slice = inputSpan.Slice(pos);
        }

        // Branch 1
        {
            if ((uint)slice.Length < 7 ||
                !slice.StartsWith("tuesday", StringComparison.OrdinalIgnoreCase)) // Match the string "tuesday" (ordinal case-insensitive)
            {
                goto AlternationBranch1;
            }

            pos += 7;
            slice = inputSpan.Slice(pos);
            goto AlternationMatch;

            AlternationBranch1:
            pos = alternation_starting_pos;
            slice = inputSpan.Slice(pos);
        }

        // Branch 2
        {
            if ((uint)slice.Length < 9 ||
                !slice.StartsWith("wednesday", StringComparison.OrdinalIgnoreCase)) // Match the string "wednesday" (ordinal case-insensitive)
            {
                goto AlternationBranch2;
            }

            pos += 9;
            slice = inputSpan.Slice(pos);
            goto AlternationMatch;

            AlternationBranch2:
            pos = alternation_starting_pos;
            slice = inputSpan.Slice(pos);
        }

        // Branch 3
        {
            if ((uint)slice.Length < 8 ||
                !slice.StartsWith("thursday", StringComparison.OrdinalIgnoreCase)) // Match the string "thursday" (ordinal case-insensitive)
            {
                goto AlternationBranch3;
            }

            pos += 8;
            slice = inputSpan.Slice(pos);
            goto AlternationMatch;

            AlternationBranch3:
            pos = alternation_starting_pos;
            slice = inputSpan.Slice(pos);
        }

        // Branch 4
        {
            if ((uint)slice.Length < 6 ||
                !slice.StartsWith("fr", StringComparison.OrdinalIgnoreCase) || // Match the string "fr" (ordinal case-insensitive)
                ((((ch = slice[2]) | 0x20) != 'i') & (ch != 'İ')) || // Match a character in the set [Ii\u0130].
                !slice.Slice(3).StartsWith("day", StringComparison.OrdinalIgnoreCase)) // Match the string "day" (ordinal case-insensitive)
            {
                goto AlternationBranch4;
            }

            pos += 6;
            slice = inputSpan.Slice(pos);
            goto AlternationMatch;

            AlternationBranch4:
            pos = alternation_starting_pos;
            slice = inputSpan.Slice(pos);
        }

        // Branch 5
        {
            // Match a character in the set [Ss].
            if (slice.IsEmpty || ((slice[0] | 0x20) != 's'))
            {
                return false; // The input didn't match.
            }

            // Match with 2 alternative expressions, atomically.
            {
                if ((uint)slice.Length < 2)
                {
                    return false; // The input didn't match.
                }

                switch (slice[1])
                {
                    case 'A' or 'a':
                        if ((uint)slice.Length < 8 ||
                            !slice.Slice(2).StartsWith("turday", StringComparison.OrdinalIgnoreCase)) // Match the string "turday" (ordinal case-insensitive)
                        {
                            return false; // The input didn't match.
                        }

                        pos += 8;
                        slice = inputSpan.Slice(pos);
                        break;

                    case 'U' or 'u':
                        if ((uint)slice.Length < 6 ||
                            !slice.Slice(2).StartsWith("nday", StringComparison.OrdinalIgnoreCase)) // Match the string "nday" (ordinal case-insensitive)
                        {
                            return false; // The input didn't match.
                        }

                        pos += 6;
                        slice = inputSpan.Slice(pos);
                        break;

                    default:
                        return false; // The input didn't match.
                }
            }

        }

        AlternationMatch:;
    }

    // The input matched.
    base.runtextpos = pos;
    base.Capture(0, matchStart, pos);
    return true;
}
```

At the same time, the source generator has other issues to contend with that simply don't exist when outputting to IL directly. If you look a couple of code examples back, you can see some braces somewhat strangely commented out. That's not a mistake. The source generator is recognizing that, if those braces weren't commented out, the structure of the backtracking is relying on jumping from outside of the scope to a label defined inside of that scope; such a label would not be visible to such a `goto` and the code would fail to compile. Thus, the source generator needs to avoid there being a scope in the way. In some cases, it'll simply comment out the scope as was done here. In other cases where that's not possible, it may sometimes avoid constructs that require scopes (such as a multi-statement `if` block) if doing so would be problematic.

The source generator handles everything `RegexCompiler` handles, with one exception. As with handling `RegexOptions.IgnoreCase`, the implementations now use a casing table to generate sets at construction time, and how `IgnoreCase` backreference matching needs to consult that casing table. That table is internal to `System.Text.RegularExpressions.dll`, and for now, at least, the code external to that assembly (including code emitted by the source generator) does not have access to it. That makes handling `IgnoreCase` backreferences a challenge in the source generator and they aren't supported. This is the one construct not supported by the source generator that is supported by `RegexCompiler`. If you try to use a pattern that has one of these (which is rare), the source generator won't emit a custom implementation and will instead fall back to caching a regular `Regex` instance:

Also, neither `RegexCompiler` nor the source generator supports the new `RegexOptions.NonBacktracking`. If you specify `RegexOptions.Compiled | RegexOptions.NonBacktracking`, the `Compiled` flag will just be ignored, and if you specify `NonBacktracking` to the source generator, it will similarly fall back to caching a regular `Regex` instance.
