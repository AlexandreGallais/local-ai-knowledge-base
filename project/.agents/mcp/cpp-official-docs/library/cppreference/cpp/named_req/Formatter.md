# C++ named requirements: Formatter (since C++20)

**Formatter** is a type that abstracts formatting operations for a given formatting argument type and character type. Specializations of `std::formatter` provided by the standard library are required to meet the requirements of Formatter except as noted otherwise.

A **Formatter** is able to format both const and non-const arguments, typically by providing a `format` member function that takes a const reference.

### Requirements

A type satisfies Formatter if it satisfies BasicFormatter and given the following types and values, the expressions shown in the table below are valid and have the indicated semantics:

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
| `arg` | an lvalue of type `Arg` |
| `t` | a value of type convertible to (possibly const-qualified) `Arg` |
| `parse_ctx` | an lvalue of type `ParseCtx` satisfying all following conditions: `parse_ctx.begin()` points to the beginning of the format-spec of the replacement field being formatted in the format string. If format-spec is not present or empty, then either `parse_ctx.begin() == parse_ctx.end()` or `*parse_ctx.begin() == '}'`. |
| `fmt_ctx` | an lvalue of type `FmtCtx` |

| Expression | Return type | Semantics |
| --- | --- | --- |
| `f.format(t, fmt_ctx)` | `FmtCtx::iterator` | Formats `t` according to the specifiers stored in `f`, writes the output to `fmt_ctx.out()` and returns an end iterator of the output range. The output can only depend on `t`, `fmt_ctx.locale()`, the range `[``parse_ctx.begin()``,``parse_ctx.end()``)` from the last call to `f.parse(parse_ctx)`, and `fmt_ctx.arg(n)` for any value `n` of type `std::size_t`. |
| `f.format(arg, fmt_ctx)` | `FmtCtx::iterator` | As above, but does not modify `arg`. |

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3892 | C++20 | the value of `pc.begin()` was unclear if format-spec is not present | made clear |
