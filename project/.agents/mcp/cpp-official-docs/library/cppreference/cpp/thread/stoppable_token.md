# std::stoppable_token

| Defined in header `<stop_token>` |  |
| --- | --- |
| `template< class Token > concept stoppable_token = requires (const Token tok) { typename /*check-type-alias-exists*/<Token::template callback_type>; { tok.stop_requested() } noexcept -> std::same_as<bool>; { tok.stop_possible() } noexcept -> std::same_as<bool>; { Token(tok) } noexcept; // see implicit expression variations } && std::copyable<Token> && std::equality_comparable<Token>;` | (since C++26) |
| Helper templates |  |
| `template< template<class> class > struct /*check-type-alias-exists*/; // not defined` | (exposition only*) |

The concept `stoppable_token<Token>` specifies the basic interface of a stop token that is `copyable` and `equality_comparable` and allows polling to see if the stop request is possible and whether the request has been made.

### Semantic requirements

This section is incomplete

### See also

unstoppable_token (C++26) specifies a stop token that does not allow stopping (concept)
