# C++ named requirements: BasicFormatter (since C++20)

**BasicFormatter** is a type that abstracts formatting operations for a given formatting argument type and character type. Specializations of `std::formatter` are required to meet the requirements of BasicFormatter.

A BasicFormatter is a Formatter if it is able to format both const and non-const arguments.

### Requirements

A type satisfies BasicFormatter if it is semiregular, meaning it satisfies:

- DefaultConstructible
- CopyConstructible
- CopyAssignable
- Destructible
- Swappable

And, given the following types and values, the expressions shown in the table below are valid and have the indicated semantics:

| Type | Definition |
| --- | --- |
| `CharT` | a character type |
| `Arg` | a formatting argument type |
| `Formatter` | a Formatter type for types `Arg` and `CharT` |
| `OutputIt` | a LegacyOutputIterator type |
| `ParseCtx` | `std::basic_format_parse_context<CharT>` |
| `FmtCtx` | `std::basic_format_context<OutputIt, CharT>` |
| Value | Definition |
| `f` | a value of type (possibly const-qualified) `Formatter` |
| `g` | a value of type `Formatter` |
| `arg` | an lvalue of type `Arg` |
| `t` | a value of type convertible to (possibly const-qualified) `Arg` |
| `parse_ctx` | an lvalue of type `ParseCtx` satisfying all following conditions: `parse_ctx.begin()` points to the beginning of the format-spec of the replacement field being formatted in the format string. If format-spec is not present or empty, then either `parse_ctx.begin() == parse_ctx.end()` or `*parse_ctx.begin() == '}'`. |
| `fmt_ctx` | an lvalue of type `FmtCtx` |

| Expression | Return type | Semantics |
| --- | --- | --- |
| `g.parse(parse_ctx)` | `ParseCtx::iterator` | In the range `[``parse_ctx.begin()``,``parse_ctx.end()``)`, parses the format-spec for type `Arg` until the first unmatched character. Throws `std::format_error` unless the whole range is parsed or the unmatched character is `}`. [note 1] Stores the parsed format specifiers in `g` and returns an end iterator of the parsed range. |
| `f.format(arg, fmt_ctx)` | `FmtCtx::iterator` | Formats `arg` according to the specifiers stored in `f`, writes the output to `fmt_ctx.out()` and returns an end iterator of the output range. The output shall only depend on `arg`, `fmt_ctx.locale()`, the range `[``parse_ctx.begin()``,``parse_ctx.end()``)` from the last call to `f.parse(parse_ctx)`, and `fmt_ctx.arg(n)` for any value `n` of type `std::size_t`. |

1. ↑ This allows formatters to emit meaningful error messages.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3892 | C++20 | the value of `pc.begin()` was unclear if format-spec is not present | made clear |
