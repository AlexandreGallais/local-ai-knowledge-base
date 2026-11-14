---
title: "Notation"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/notation.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

r[notation]
# Notation

r[notation.grammar]
## Grammar

r[notation.grammar.syntax]

The following notations are used by the *Lexer* and *Syntax* grammar snippets:

| Notation          | Examples                      | Meaning                                   |
|-------------------|-------------------------------|-------------------------------------------|
| CAPITAL           | KW_IF, INTEGER_LITERAL        | A token <example-value> by the lexer             |
| _ItalicCamelCase_ | _LetStatement_, _Item_        | A syntactical production                  |
| `string`          | `x`, `while`, `*`             | The exact character(s)                    |
| x?     | `pub`?             | An optional item                          |
| x\*    | _OuterAttribute_\* | 0 or more of x                            |
| x+     |  _MacroMatch_+     | 1 or more of x                            |
| xa..b  | HEX_DIGIT1..6      | a to b repetitions of x, exclusive of b   |
| xa..=b | HEX_DIGIT1..=5     | a to b repetitions of x, inclusive of b   |
| xn:a..=b | `#`n:1..=255      | a to b repetitions of x (inclusive of b), with the count bound to the name n |
| xn     | `#`n               | x repeated the number of times bound to n by a previous labeled repetition |
| Rule1 Rule2       | `fn` _Name_ _Parameters_      | Sequence of rules in order                |
| \|                | `u8` \| `u16`, Block \| Item  | Either one or another                     |
| !                 | !COMMENT                      | Matches if the expression does not follow, without consuming any input |
| \[ ]               | \[`b` `B`]                     | Any of the characters listed              |
| \[ - ]             | \[`a`-`z`]                     | Any of the characters in the range        |
| ~\[ ]              | ~\[`b` `B`]                    | Any characters, except those listed       |
| ~`string`         | ~`\n`, ~`*/`                  | Any characters, except this sequence      |
| ( )               | (`,` _Parameter_)? | Groups items                              |
| ^                 | `b'` ^ ASCII_FOR_CHAR         | The rest of the sequence must match or parsing fails unconditionally ([hard cut operator]) |
| U+xxxx..xxxxxx    | U+0060                        | A single Unicode character                |
| \<text\>          | \<any ASCII char except CR\>  | An English description of what should be matched |
| Rule suffix | IDENTIFIER_OR_KEYWORD _except `crate`_ | A modification to the previous rule |
| // Comment. | // Single line comment. | A comment extending to the end of the line. |

Sequences have a higher precedence than `|` alternation.

r[notation.grammar.cut]
### The hard cut operator

The grammar uses ordered alternation: the parser tries alternatives left to right and takes the first that matches. If an alternative fails partway through a sequence, the parser normally backtracks and tries the next alternative. The cut operator (`^`) prevents this. Once every expression to the left of `^` in a sequence has matched, the rest of the sequence must match or parsing fails unconditionally.

Mizushima et al. introduced cut operators to parsing expression grammars. In the PEG literature, a *soft cut* prevents backtracking only within the immediately enclosing ordered choice --- outer choices can still recover. A *hard cut* prevents all backtracking past the cut point; failure is definitive. The `^` used in this grammar is a hard cut.

The hard cut operator is necessary because some tokens in Rust begin with a prefix that is itself a valid token. For example, `c"<example-value>"\0"<example-value>"\0"<example-value>"`] prevents this --- once the opening delimiter is recognized, the parser cannot go back. The same reasoning applies to [byte literals], [byte string literals], [raw string literals], and other literals with prefixes that are themselves valid tokens.

r[notation.grammar.string-tables]
### String table productions

Some rules in the grammar — notably [unary operators], [binary
operators], and [keywords] — are given in a simplified form: as a listing
of printable strings. These cases form a subset of the rules regarding the
token rule, and are assumed to be the result of a lexical-analysis
phase feeding the parser, driven by a DFA, operating over the disjunction of all such string table
entries.

When such a string in `monospace` font occurs inside the grammar,
it is an implicit reference to a single member of such a string table
production. See [tokens] for more information.

r[notation.grammar.visualizations]
### Grammar visualizations

Below each grammar block is a button to toggle the display of a [syntax diagram]. A square element is a non-terminal rule, and a rounded rectangle is a terminal.
