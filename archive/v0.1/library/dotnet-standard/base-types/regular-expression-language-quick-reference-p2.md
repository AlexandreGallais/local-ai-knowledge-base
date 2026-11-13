---
title: "Regular Expression Language - Quick Reference (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/regular-expression-language-quick-reference.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Regular Expression Language - Quick Reference (part 2 of 2)

## Substitutions

Substitutions are regular expression language elements that are supported in replacement patterns. For more information, see Substitutions. The metacharacters listed in the following table are atomic zero-width assertions.

|Character|Description|Pattern|Replacement pattern|Input string|Result string|
|---------------|-----------------|-------------|-------------------------|------------------|-------------------|
|`$` *number*|Substitutes the substring matched by group *number*.|`\b(\w+)(\s)(\w+)\b`|`$3$2$1`|`"one two"`|`"two one"`|
|`${` *name* `}`|Substitutes the substring matched by the named group *name*.|`\b(?<word1>\w+)(\s)(?<word2>\w+)\b`|`${word2} ${word1}`|`"one two"`|`"two one"`|
|`$$`|Substitutes a literal "$".|`\b(\d+)\s?USD`|`$$$1`|`"103 USD"`|`"$103"`|
|`$&`|Substitutes a copy of the whole match.|`\$?\d*\.?\d+`|`**$&**`|`"$1.30"`|`"**$1.30**"`|
|``$` ``|Substitutes all the text of the input string before the match.|`B+`|``$` ``|`"AABBCC"`|`"AAAACC"`|
|`$'`|Substitutes all the text of the input string after the match.|`B+`|`$'`|`"AABBCC"`|`"AACCCC"`|
|`$+`|Substitutes the last group that was captured.|`B+(C+)`|`$+`|`"AABBCCDD"`|`"AACCDD"`|
|`$_`|Substitutes the entire input string.|`B+`|`$_`|`"AABBCC"`|`"AAAABBCCCC"`|

## Regular Expression Options

You can specify options that control how the regular expression engine interprets a regular expression pattern. Many of these options can be specified either inline (in the regular expression pattern) or as one or more `System.Text.RegularExpressions.RegexOptions` constants. This quick reference lists only inline options. For more information about inline and `System.Text.RegularExpressions.RegexOptions` options, see the article Regular Expression Options.

You can specify an inline option in two ways:

- By using the miscellaneous construct `(?imnsx-imnsx)`, where a minus sign (-) before an option or set of options turns those options off. For example, `(?i-mn)` turns case-insensitive matching (`i`) on, turns multiline mode (`m`) off, and turns unnamed group captures (`n`) off. The option applies to the regular expression pattern from the point at which the option is defined, and is effective either to the end of the pattern or to the point where another construct reverses the option.
- By using the grouping construct`(?imnsx-imnsx:`*subexpression*`)`, which defines options for the specified group only.

The .NET regular expression engine supports the following inline options:

|Option|Description|Pattern|Matches|
|------------|-----------------|-------------|-------------|
|`i`|Use case-insensitive matching.|`\b(?i)a(?-i)a\w+\b`|`"aardvark"`, `"aaaAuto"` in `"aardvark AAAuto aaaAuto Adam breakfast"`|
|`m`|Use multiline mode. `^` and `$` match the beginning and end of a line, instead of the beginning and end of a string.|For an example, see the "Multiline Mode" section in Regular Expression Options.||
|`n`|Do not capture unnamed groups.|For an example, see the "Explicit Captures Only" section in Regular Expression Options.||
|`s`|Use single-line mode.|For an example, see the "Single-line Mode" section in Regular Expression Options.||
|`x`|Ignore unescaped white space in the regular expression pattern.|`\b(?x) \d+ \s \w+`|`"1 aardvark"`, `"2 cats"` in `"1 aardvark 2 cats IV centurions"`|

## Miscellaneous Constructs

Miscellaneous constructs either modify a regular expression pattern or provide information about it. The following table lists the miscellaneous constructs supported by .NET. For more information, see Miscellaneous Constructs.

|Construct|Definition|Example|
|---------------|----------------|-------------|
|`(?imnsx-imnsx)`|Sets or disables options such as case insensitivity in the middle of a pattern.For more information, see Regular Expression Options.|`\bA(?i)b\w+\b` matches `"ABA"`, `"Able"` in `"ABA Able Act"`|
|`(?#` *comment* `)`|Inline comment. The comment ends at the first closing parenthesis.|`\bA(?#Matches words starting with A)\w+\b`|
|`#` [to end of line]|X-mode comment. The comment starts at an unescaped `#` and continues to the end of the line.|`(?x)\bA\w+\b#Matches words starting with A`|

## See also

- `System.Text.RegularExpressions`
- `System.Text.RegularExpressions.Regex`
- Regular Expressions
- Regular Expression Classes
- Regular Expressions - Quick Reference (download in Word format)
- Regular Expressions - Quick Reference (download in PDF format)
