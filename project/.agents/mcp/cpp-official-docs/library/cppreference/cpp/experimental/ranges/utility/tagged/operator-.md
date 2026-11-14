# std::experimental::ranges::tagged<Base,Tags...>::operator=

|  |  |
| --- | --- |
| `tagged &operator=( tagged&& that ) = default;` | (1) |
| `tagged &operator=( const tagged& that ) = default;` | (2) |
| `template< class Other > requires Assignable<Base&, Other> constexpr tagged& operator=( ranges::tagged<Other, Tags...>&& that ) noexcept(std::is_nothrow_assignable<Base&, Other>::value);` | (3) |
| `template< class Other > requires Assignable<Base&, const Other&> constexpr tagged& operator=( const ranges::tagged<Other, Tags...>& that );` | (4) |
| `template< class U > requires Assignable<Base&, U> && !Same<std::decay_t<U>, tagged> constexpr tagged& operator=( U&& that ) noexcept(std::is_nothrow_assignable<Base&, U>::value);` | (5) |

Assigns the contents of `that` to `*this`.

1,2) `tagged` has defaulted copy and move assignment operators that invoke the corresponding assignment operator of `Base`.

3) Converting move assignment from a different `tagged` specialization with matching tags. Equivalent to `static_cast<Base&>(*this) = static_cast<Other&&>(that);`.

4) Converting copy assignment from a different `tagged` specialization with matching tags. Equivalent to `static_cast<Base&>(*this) = static_cast<const Other&>(that);`.

5) Assigns `that` to the `Base` subobject. Equivalent to `static_cast<Base&>(*this) = std::forward<U>(that);`.

### Return value

`*this`.
