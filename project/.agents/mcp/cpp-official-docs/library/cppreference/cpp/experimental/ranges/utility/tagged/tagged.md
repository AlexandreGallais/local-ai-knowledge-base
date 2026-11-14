# std::experimental::ranges::tagged<Base,Tags...>::tagged

|  |  |
| --- | --- |
| `using Base::Base;` | (1) |
| `tagged() = default;` | (2) |
| `tagged( tagged&& that ) = default;` | (3) |
| `tagged( const tagged& that ) = default;` | (4) |
| `tagged( Base&& that ) noexcept(std::is_nothrow_move_constructible<Base>::value) requires MoveConstructible<Base>;` | (5) |
| `tagged( const Base& that ) noexcept(std::is_nothrow_copy_constructible<Base>::value) requires CopyConstructible<Base>;` | (6) |
| `template< class Other > requires Constructible<Base, Other> constexpr tagged( ranges::tagged<Other, Tags...> && that ) noexcept(std::is_nothrow_constructible<Base, Other>::value);` | (7) |
| `template< class Other > requires Constructible<Base, const Other&> constexpr tagged( const ranges::tagged<Other, Tags...> &that );` | (8) |

Constructs a `tagged` object.

1) `tagged<Base, Tags...>` inherits the constructors of `Base`.

2-4) `tagged` has defaulted default, copy, and move constructors that invoke the corresponding constructor of `Base`.

5) Converting move constructor from `Base`. Initializes the `Base` subobject with `std::move(that)`.

6) Converting copy constructor from `Base`. Initializes the `Base` subobject with `that`.

7) Converting move constructor from a different `tagged` specialization with matching tags. Initializes the `Base` subobject with `static_cast<Other&&>(that)`.

8) Converting copy constructor from a different `tagged` specialization with matching tags. Initializes the `Base` subobject with `static_cast<const Other&>(that)`.
