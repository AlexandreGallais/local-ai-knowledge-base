# std::unstoppable_token

| Defined in header `<stop_token>` |  |
| --- | --- |
| `template< class Token > concept unstoppable_token = std::stoppable_token<Token> && requires (const Token tok) { requires std::bool_constant<(!tok.stop_possible())>::value; };` | (since C++26) |

The concept `unstoppable_token<Token>` specifies an additional requirement for a `stoppable_token` where the type does not allow stopping. That is, the expression `tok.stop_possible()` must be usable in constant expression and returns `false`.
