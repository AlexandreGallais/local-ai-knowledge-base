---
title: "Pattern class (java.util.regex) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/regex/Pattern.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Pattern class (java.util.regex) (part 2 of 3)

**Unicode extended grapheme clusters** are supported by the grapheme
cluster matcher `\X` and the corresponding boundary matcher `\b{g}`.

Unicode scripts, blocks, categories and binary properties are written with
the `\p` and `\P` constructs as in Perl.
`\p{`*prop*`}` matches if
the input has the property *prop*, while `\P{`*prop*`}`
does not match if the input has that property.

Scripts, blocks, categories and binary properties can be used both inside
and outside of a character class.

**Scripts** are specified either with the prefix `Is`, as in
`IsHiragana`, or by using  the `script` keyword (or its short
form `sc`) as in `script=Hiragana` or `sc=Hiragana`.

The script names supported by `Pattern` are the valid script names
accepted and defined by
UnicodeScript.forName.

**Blocks** are specified with the prefix `In`, as in
`InMongolian`, or by using the keyword `block` (or its short
form `blk`) as in `block=Mongolian` or `blk=Mongolian`.

The block names supported by `Pattern` are the valid block names
accepted and defined by
UnicodeBlock.forName.

**Categories** may be specified with the optional prefix `Is`:
Both `\p{L}` and `\p{IsL}` denote the category of Unicode
letters. Same as scripts and blocks, categories can also be specified
by using the keyword `general_category` (or its short form
`gc`) as in `general_category=Lu` or `gc=Lu`.

The supported categories are those of

*The Unicode Standard* in the version specified by the
Character class. The category names are those
defined in the Standard, both normative and informative.

**Binary properties** are specified with the prefix `Is`, as in
`IsAlphabetic`. The supported binary properties by `Pattern`
are

-  Alphabetic

-  Ideographic

-  Letter

-  Lowercase

-  Uppercase

-  Titlecase

-  Punctuation

-  Control

-  White_Space

-  Digit

-  Hex_Digit

-  Join_Control

-  Noncharacter_Code_Point

-  Assigned

-  Emoji

-  Emoji_Presentation

-  Emoji_Modifier

-  Emoji_Modifier_Base

-  Emoji_Component

-  Extended_Pictographic

The following **Predefined Character classes** and **POSIX character classes**
are in conformance with the recommendation of *Annex C: Compatibility Properties*
of *Unicode Technical Standard #18:
Unicode Regular Expressions*, when `UNICODE_CHARACTER_CLASS` flag is specified.

predefined and posix character classes in Unicode mode

Classes
Matches

`\p{Lower}`
    A lowercase character:`\p{IsLowercase}`
`\p{Upper}`
    An uppercase character:`\p{IsUppercase}`
`\p{ASCII}`
    All ASCII:`[\x00-\x7F]`
`\p{Alpha}`
    An alphabetic character:`\p{IsAlphabetic}`
`\p{Digit}`
    A decimal digit character:`\p{IsDigit}`
`\p{Alnum}`
    An alphanumeric character:`[\p{IsAlphabetic}\p{IsDigit}]`
`\p{Punct}`
    A punctuation character:`\p{IsPunctuation}`
`\p{Graph}`
    A visible character: `[^\p{IsWhite_Space}\p{gc=Cc}\p{gc=Cs}\p{gc=Cn}]`
`\p{Print}`
    A printable character: `[\p{Graph}\p{Blank}&&[^\p{Cntrl}]]`
`\p{Blank}`
    A space or a tab: `[\p{IsWhite_Space}&&[^\p{gc=Zl}\p{gc=Zp}\x0a\x0b\x0c\x0d\x85]]`
`\p{Cntrl}`
    A control character: `\p{gc=Cc}`
`\p{XDigit}`
    A hexadecimal digit: `[\p{gc=Nd}\p{IsHex_Digit}]`
`\p{Space}`
    A whitespace character:`\p{IsWhite_Space}`
`\d`
    A digit: `\p{IsDigit}`
`\D`
    A non-digit: `[^\d]`
`\s`
    A whitespace character: `\p{IsWhite_Space}`
`\S`
    A non-whitespace character: `[^\s]`
`\w`
    A word character: `[\p{Alpha}\p{gc=Mn}\p{gc=Me}\p{gc=Mc}\p{Digit}\p{gc=Pc}\p{IsJoin_Control}]`
`\W`
    A non-word character: `[^\w]`

Categories that behave like the java.lang.Character
boolean is*methodname* methods (except for the deprecated ones) are
available through the same `\p{`*prop*`}` syntax where
the specified property has the name `java*methodname*`.

####  Comparison to Perl 5

The `Pattern` engine performs traditional NFA-based matching
with ordered alternation as occurs in Perl 5.

 Perl constructs not supported by this class:

-

 The backreference constructs, `\g{`*n*`}` for
   the *n*thcapturing group and
   `\g{`*name*`}` for
   named-capturing group.

-

 The conditional constructs
   `(?(`*condition*`)`*X*`)` and
   `(?(`*condition*`)`*X*`|`*Y*`)`,

-

 The embedded code constructs `(?{`*code*`})`
   and `(??{`*code*`})`,

-

 The embedded comment syntax `(?#comment)`, and

-

 The preprocessing operations `\l` `\u`,
   `\L`, and `\U`.

 Constructs supported by this class but not by Perl:

-

 Character-class union and intersection as described
   above.

 Notable differences from Perl:

-

 In Perl, `\1` through `\9` are always interpreted
   as back references; a backslash-escaped number greater than `9` is
   treated as a back reference if at least that many subexpressions exist,
   otherwise it is interpreted, if possible, as an octal escape.  In this
   class octal escapes must always begin with a zero. In this class,
   `\1` through `\9` are always interpreted as back
   references, and a larger number is accepted as a back reference if at
   least that many subexpressions exist at that point in the regular
   expression, otherwise the parser will drop digits until the number is
   smaller or equal to the existing number of groups or it is one digit.

-

 Perl uses the `g` flag to request a match that resumes
   where the last match left off.  This functionality is provided implicitly
   by the `Matcher` class: Repeated invocations of the find method will resume where the last match left off,
   unless the matcher is reset.

-

 In Perl, embedded flags at the top level of an expression affect
   the whole expression.  In this class, embedded flags always take effect
   at the point at which they appear, whether they are at the top level or
   within a group; in the latter case, flags are restored at the end of the
   group just as in Perl.

-

*Free-spacing mode* in Perl (called *comments
   mode* in this class) denoted by `(?x)` in the regular
   expression (or by the `Pattern.COMMENTS` flag when compiling
   the expression) will not ignore whitespace inside of character classes. In
   this class, whitespace inside of character classes must be escaped to be
   considered as part of the regular expression when in comments mode.

 For a more precise description of the behavior of regular expression
constructs, please see
*Mastering Regular Expressions, 3rd Edition*, Jeffrey E. F. Friedl,
O'Reilly and Associates, 2006.

**See also:** java.lang.String#split(String, int)

**See also:** java.lang.String#split(String)

**Since:** 1.4

## Pattern.UNIX_LINES

```java
public static final int UNIX_LINES
```

Enables Unix lines mode.

 In this mode, only the `'\n'` line terminator is recognized
in the behavior of `.`, `^`, and `$`.

 Unix lines mode can also be enabled via the embedded flag
expression `(?d)`.

## Pattern.CASE_INSENSITIVE

```java
public static final int CASE_INSENSITIVE
```

Enables case-insensitive matching.

 By default, case-insensitive matching assumes that only characters
in the US-ASCII charset are being matched.  Unicode-aware
case-insensitive matching can be enabled by specifying the `UNICODE_CASE` flag in conjunction with this flag.

 Case-insensitive matching can also be enabled via the embedded flag
expression `(?i)`.

 Specifying this flag may impose a slight performance penalty.

## Pattern.COMMENTS

```java
public static final int COMMENTS
```

Permits whitespace and comments in pattern.

 In this mode, whitespace is ignored, and embedded comments starting
with `#` are ignored until the end of a line. Comments mode ignores
whitespace within a character class contained in a pattern string. Such
whitespace must be escaped in order to be considered significant.

 Comments mode can also be enabled via the embedded flag
expression `(?x)`.

## Pattern.MULTILINE

```java
public static final int MULTILINE
```

Enables multiline mode.

 In multiline mode the expressions `^` and `$` match
just after or just before, respectively, a line terminator or the end of
the input sequence.  By default these expressions only match at the
beginning and the end of the entire input sequence.

 Multiline mode can also be enabled via the embedded flag
expression `(?m)`.

## Pattern.LITERAL

```java
public static final int LITERAL
```

Enables literal parsing of the pattern.

 When this flag is specified then the input string that specifies
the pattern is treated as a sequence of literal characters.
Metacharacters or escape sequences in the input sequence will be
given no special meaning.

The flags CASE_INSENSITIVE and UNICODE_CASE retain their impact on
matching when used in conjunction with this flag. The other flags
become superfluous.

 There is no embedded flag character for enabling literal parsing.

**Since:** 1.5

## Pattern.DOTALL

```java
public static final int DOTALL
```

Enables dotall mode.

 In dotall mode, the expression `.` matches any character,
including a line terminator.  By default this expression does not match
line terminators.

 Dotall mode can also be enabled via the embedded flag
expression `(?s)`.  (The `s` is a mnemonic for
"single-line" mode, which is what this is called in Perl.)

## Pattern.UNICODE_CASE

```java
public static final int UNICODE_CASE
```

Enables Unicode-aware case folding.

 When this flag is specified then case-insensitive matching, when
enabled by the `CASE_INSENSITIVE` flag, is done in a manner
consistent with the Unicode Standard.  By default, case-insensitive
matching assumes that only characters in the US-ASCII charset are being
matched.

 Unicode-aware case folding can also be enabled via the embedded flag
expression `(?u)`.

 Specifying this flag may impose a performance penalty.

## Pattern.CANON_EQ

```java
public static final int CANON_EQ
```

Enables canonical equivalence.

 When this flag is specified then two characters will be considered
to match if, and only if, their full canonical decompositions match.
The expression `"a\u030A"`, for example, will match the
string `"\u00E5"` when this flag is specified.  By default,
matching does not take canonical equivalence into account.

 There is no embedded flag character for enabling canonical
equivalence.

 Specifying this flag may impose a performance penalty
and a moderate risk of memory exhaustion.

## Pattern.UNICODE_CHARACTER_CLASS

```java
public static final int UNICODE_CHARACTER_CLASS
```

Enables the Unicode version of *Predefined character classes* and
*POSIX character classes*.

 When this flag is specified then the (US-ASCII only)
*Predefined character classes* and *POSIX character classes*
are in conformance with
*Unicode Technical
Standard #18: Unicode Regular Expressions*
*Annex C: Compatibility Properties*.

The UNICODE_CHARACTER_CLASS mode can also be enabled via the embedded
flag expression `(?U)`.

The flag implies UNICODE_CASE, that is, it enables Unicode-aware case
folding.

Specifying this flag may impose a performance penalty.

**Since:** 1.7

## Pattern.compile(String)

```java
public static Pattern compile(String regex)
```

Compiles the given regular expression into a pattern.

Parameters:

- `regex`: The expression to be compiled

**Returns:** the given regular expression compiled into a pattern

Throws:

- `PatternSyntaxException`: If the expression's syntax is invalid

## Pattern.compile(String, int)

```java
public static Pattern compile(String regex, int flags)
```

Compiles the given regular expression into a pattern with the given
flags.

Setting `CANON_EQ` among the flags may impose a moderate risk
of memory exhaustion.

Parameters:

- `regex`: The expression to be compiled
- `flags`: Match flags, a bit mask that may include `CASE_INSENSITIVE`, `MULTILINE`, `DOTALL`, `UNICODE_CASE`, `CANON_EQ`, `UNIX_LINES`, `LITERAL`, `UNICODE_CHARACTER_CLASS` and `COMMENTS`

**Returns:** the given regular expression compiled into a pattern with the given flags

**Implementation note:** If `CANON_EQ` is specified and the number of combining
marks for any character is too large, an `java.lang.OutOfMemoryError`
is thrown.

Throws:

- `IllegalArgumentException`: If bit values other than those corresponding to the defined match flags are set in `flags`
- `PatternSyntaxException`: If the expression's syntax is invalid

## Pattern.pattern()

```java
public String pattern()
```

Returns the regular expression from which this pattern was compiled.

**Returns:** The source of this pattern

## Pattern.toString()

```java
public String toString()
```

Returns the string representation of this pattern. This
is the regular expression from which this pattern was
compiled.

**Returns:** The string representation of this pattern

**Since:** 1.5

## Pattern.matcher(CharSequence)

```java
public Matcher matcher(CharSequence input)
```

Creates a matcher that will match the given input against this pattern.

Parameters:

- `input`: The character sequence to be matched

**Returns:** A new matcher for this pattern

**Implementation note:** When a `Pattern` is deserialized, compilation is deferred
until a direct or indirect invocation of this method. Thus, if a
deserialized pattern has `CANON_EQ` among its flags and the number
of combining marks for any character is too large, an
`java.lang.OutOfMemoryError` is thrown,
as in int).

## Pattern.flags()

```java
public int flags()
```

Returns this pattern's match flags.

**Returns:** The match flags specified when this pattern was compiled

## Pattern.matches(String, CharSequence)

```java
public static boolean matches(String regex, CharSequence input)
```

Compiles the given regular expression and attempts to match the given
input against it.

 An invocation of this convenience method of the form

```java
Pattern.matches(regex, input);
```

behaves in exactly the same way as the expression

```java
Pattern.compile(regex).matcher(input).matches()
```

 If a pattern is to be used multiple times, compiling it once and reusing
it will be more efficient than invoking this method each time.

Parameters:

- `regex`: The expression to be compiled
- `input`: The character sequence to be matched

**Returns:** whether or not the regular expression matches on the input

Throws:

- `PatternSyntaxException`: If the expression's syntax is invalid
