---
title: "Options for regular expression (part 6 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/regular-expression-options.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Options for regular expression (part 6 of 6)

## NonBacktracking mode

By default, .NET's regex engine uses *backtracking* to try to find pattern matches. A backtracking engine is one that tries to match one pattern, and if that fails, goes back and tries to match an alternate pattern, and so on. A backtracking engine is very fast for typical cases, but slows down as the number of pattern alternations increases, which can lead to *catastrophic backtracking*. The `System.Text.RegularExpressions.RegexOptions.NonBacktracking` option, which was introduced in .NET 7, doesn't use backtracking and avoids that worst-case scenario. Its goal is to provide consistently good behavior, regardless of the input being searched.

> **Warning:**
> The .NET regex engine assumes the *pattern* is trusted. NonBacktracking mode doesn't change this assumption: it guards against expensive *input*, not against actively malicious *patterns*. For more information, see Use trusted patterns.

The `System.Text.RegularExpressions.RegexOptions.NonBacktracking` option doesn't support everything the other built-in engines support. In particular, the option can't be used in conjunction with `System.Text.RegularExpressions.RegexOptions.RightToLeft`, `System.Text.RegularExpressions.RegexOptions.ECMAScript`, or `System.Text.RegularExpressions.RegexOptions.AnyNewLine`. It also doesn't allow for the following constructs in the pattern:

- Atomic groups
- Backreferences
- Balancing groups
- Conditionals
- Lookarounds
- Start anchors (`\G`)

`System.Text.RegularExpressions.RegexOptions.NonBacktracking` also has a subtle difference with regards to execution. If a capture group is in a loop, most (non-.NET) regex engines only provide the last matched value for that capture. However, .NET's regex engine tracks all values that are captured inside a loop and provides access to them. The `System.Text.RegularExpressions.RegexOptions.NonBacktracking` option is like most other regex implementations and only supports providing the final capture.

For more information about backtracking, see Backtracking in regular expressions.

## AnyNewLine mode

By default, .NET's regular expression engine treats only `\n` as a newline character. The anchors `^` and `$` (in `System.Text.RegularExpressions.RegexOptions.Multiline` mode), `\Z`, and the wildcard `.` all use `\n` as the sole line boundary. This means that `$` doesn't match before `\r\n` (Windows-style line endings), and `.` matches `\r` but not `\n` (unless `System.Text.RegularExpressions.RegexOptions.Singleline` is enabled, in which case `.` matches all characters), which leads to common bugs when processing text with mixed or non-Unix line endings.

The `System.Text.RegularExpressions.RegexOptions.AnyNewLine` option, which was introduced in .NET 11, makes these constructs recognize all common newline sequences: `\r\n` (CR+LF), `\r` (CR), `\n` (LF), `\u0085` (NEL), `\u2028` (LS), and `\u2029` (PS). This is consistent with Unicode TR18 RL1.6.

For example, without `AnyNewLine`, matching lines in a string with Windows line endings requires manual workarounds like `\r?$`:

```csharp
// BUG: .+$ captures trailing \r on Windows line endings
var match = Regex.Match("foo\r\nbar", @".+$", RegexOptions.Multiline);
Console.WriteLine(match.Value); // "foo\r" -- not "foo"!
```

With `AnyNewLine`, the anchors handle all newline types automatically:

```csharp
var match = Regex.Match("foo\r\nbar", @".+$",
    RegexOptions.Multiline | RegexOptions.AnyNewLine);
Console.WriteLine(match.Value); // "foo"
```

The following table summarizes how `AnyNewLine` affects each construct:

| Construct            | Default behavior                     | With `AnyNewLine`                                                     |
|----------------------|--------------------------------------|-----------------------------------------------------------------------|
| `.` (default)        | Matches any character except `\n`    | Matches any character except `\r`, `\n`, `\u0085`, `\u2028`, `\u2029` |
| `$` (Multiline)      | Matches before `\n`                  | Matches before `\r\n`, `\r`, `\n`, `\u0085`, `\u2028`, `\u2029`       |
| `^` (Multiline)      | Matches after `\n`                   | Matches after `\r\n`, `\r`, `\n`, `\u0085`, `\u2028`, `\u2029`        |
| `$` (default) / `\Z` | Matches before `\n` at end of string | Matches before any newline sequence at end of string                  |

Key design points:

- **`\r\n` is treated atomically**: `$` matches before the full `\r\n` sequence, never between `\r` and `\n`.
- **`Singleline` takes precedence**: `.` with both `Singleline` and `AnyNewLine` matches every character (including newlines), consistent with `Singleline`'s existing behavior.
- **`\A` and `\z` are unaffected**: Absolute start-of-string and end-of-string anchors don't change.
- **Incompatible options**: `AnyNewLine` cannot be combined with `System.Text.RegularExpressions.RegexOptions.NonBacktracking` or `System.Text.RegularExpressions.RegexOptions.ECMAScript`. Attempting to do so throws an `System.ArgumentOutOfRangeException`.

## See also

- Regular Expression Language - Quick Reference
