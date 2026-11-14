# std::experimental::ranges::swap (ranges::tagged)

`friend constexpr void swap( tagged& lhs, tagged& rhs ) noexcept(noexcept(lhs.swap(rhs))) requires Swappable<Base>;`

Swap the contents of `*this` and `rhs`, as if by `lhs.swap(rhs);`.

This function is not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when tagged is an associated class of the arguments.

### Notes

Unlike most non-member `swap`s in the standard library, this `swap` is a hidden friend function declared in the body of `tagged`, not a function template. The `tagged` in the function declaration is the injected-class-name.

### See also

swap swaps the contents of two `tagged` objects (public member function)
