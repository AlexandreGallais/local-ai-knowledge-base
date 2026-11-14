---
title: "RegexOptions enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.RegularExpressions/RegexOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RegexOptions enum

Namespace: `System.Text.RegularExpressions`

```csharp
public enum RegexOptions
```

Provides enumerated values to use to set regular expression options.

Several options provided by members of the `RegexOptions` enumeration (in particular,
`RegexOptions.ExplicitCapture`, `RegexOptions.IgnoreCase`,
`RegexOptions.Multiline`, and `RegexOptions.Singleline`) can instead be
provided by using an inline option character in the regular expression pattern. For details, see

Regular Expression Options.

## RegexOptions.AnyNewLine field

```csharp
AnyNewLine
```

Make `^`, `$`, `\Z`, and `.` recognize all common newline sequences
(`\r\n`, `\r`, `\n`, `\v` (VT), `\f` (FF), and the Unicode newlines `\u0085`, `\u2028`, `\u2029`)
instead of only `\n`. For more information, see the

Regular Expression Options article.

## RegexOptions.Compiled field

```csharp
Compiled
```

Specifies that the regular expression is compiled to MSIL code, instead of being interpreted.
Compiled regular expressions maximize run-time performance at the expense of initialization time.
For more information, see the "Compiled Regular Expressions" section in the

Regular Expression Options article.

## RegexOptions.CultureInvariant field

```csharp
CultureInvariant
```

Specifies that cultural differences in language are ignored. For more information, see the
"Comparison Using the Invariant Culture" section in the

Regular Expression Options article.

## RegexOptions.ECMAScript field

```csharp
ECMAScript
```

Enables ECMAScript-compliant behavior for the expression. This value can be used only in
conjunction with the `RegexOptions.IgnoreCase`, `RegexOptions.Multiline`, and
`RegexOptions.Compiled` values. The use of this value with any other values results in an
exception.

For more information on the `RegexOptions.ECMAScript` option, see the "ECMAScript Matching
Behavior" section in the

Regular Expression Options article.

## RegexOptions.ExplicitCapture field

```csharp
ExplicitCapture
```

Specifies that the only valid captures are explicitly named or numbered groups of the form
`(?<name>...)`. This allows unnamed parentheses to act as noncapturing groups without
the syntactic clumsiness of the expression `(?:...)`. For more information, see the
"Explicit Captures Only" section in the

Regular Expression Options article.

## RegexOptions.IgnoreCase field

```csharp
IgnoreCase
```

Specifies case-insensitive matching. For more information, see the "Case-Insensitive Matching"
section in the

Regular Expression Options article.

## RegexOptions.IgnorePatternWhitespace field

```csharp
IgnorePatternWhitespace
```

Eliminates unescaped white space from the pattern and enables comments marked with `#`.
However, this value does not affect or eliminate white space in

character classes, numeric

quantifiers, or tokens that mark the beginning of individual

regular expression language elements. For more information, see the "Ignore White Space"
section of the

Regular Expression Options article.

## RegexOptions.Multiline field

```csharp
Multiline
```

Multiline mode. Changes the meaning of `^` and `$` so they match at the beginning
and end, respectively, of any line, and not just the beginning and end of the entire string.
For more information, see the "Multiline Mode" section in the

Regular Expression Options article.

## RegexOptions.NonBacktracking field

```csharp
NonBacktracking
```

Enable matching using an approach that avoids backtracking and guarantees linear-time processing
in the length of the input. For more information, see the "NonBacktracking mode" section in the

Regular Expression Options article.

Certain features aren't available when this option is set, including balancing groups,
backreferences, positive and negative lookaheads and lookbehinds, and atomic groups.
Capture groups are also ignored, such that the only capture available is that for
the top-level match.

## RegexOptions.None field

```csharp
None
```

Specifies that no options are set. For more information about the default behavior of the regular
expression engine, see the "Default Options" section in the

Regular Expression Options article.

## RegexOptions.RightToLeft field

```csharp
RightToLeft
```

Specifies that the search will be from right to left instead of from left to right. For more
information, see the "Right-to-Left Mode" section in the

Regular Expression Options article.

## RegexOptions.Singleline field

```csharp
Singleline
```

Specifies single-line mode. Changes the meaning of the dot (`.`) so it matches every character
(instead of every character except `\n`). For more information, see the "Single-line Mode"
section in the

Regular Expression Options article.
