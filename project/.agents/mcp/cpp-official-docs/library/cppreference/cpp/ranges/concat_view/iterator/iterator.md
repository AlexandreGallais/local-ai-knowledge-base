# std::ranges::concat_view<Views...>::*iterator*<Const>::*iterator*

|  |  |  |
| --- | --- | --- |
| `/*iterator*/() = default;` | (1) | (since C++26) |
| `constexpr /*iterator*/( /*iterator*/<!Const> it ) requires Const && (std::convertible_to<ranges::iterator_t<Views>, ranges::iterator_t<const Views>> && ...);` | (2) | (since C++26) |
| `template< class... Args > constexpr explicit /*iterator*/ ( /*maybe-const*/<Const, concat_view>* parent, Args&&... args ) requires std::constructible_from</*base-iter*/, Args&&...>;` | (3) | (since C++26) (exposition only*) |

Constructs an iterator.

For the definition of `/*maybe-const*/`, see `maybe-const` .

| Overload | Data members |  |
| --- | --- | --- |
| `parent_` | `it_` |  |
| (1) | initialized with `nullptr` | default-initialized |
| (2) | initialized with `it.parent_` | initialized with `base-iter (std::in_place_index<I>, std::get<I>(std::move(it.it_ )))` (where `I` is `it.it_ .index()`) |
| (3) | initialized with `parent` | initialized with `std::forward<Args>(args)...` |

2) If `it.it_ .valueless_by_exception()` is `true`, the behavior is undefined.

### Parameters

|  |  |  |
| --- | --- | --- |
| it | - | a mutable iterator |
| parent | - | a pointer to `ranges::concat_view` |
| args | - | the arguments to initialize `it_` |

### Example

This section is incomplete Reason: no example
