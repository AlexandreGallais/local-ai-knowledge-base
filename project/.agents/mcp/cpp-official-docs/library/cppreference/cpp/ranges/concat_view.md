# std::ranges::views::concat, std::ranges::concat_view

| Defined in header `<ranges>` |  |  |
| --- | --- | --- |
| `template< ranges::input_range... Views > requires (ranges::view<Views> && ...) && (sizeof...(Views) > 0) && /*concatable*/<Views...> class concat_view : public ranges::view_interface<concat_view<Views...>>` | (1) | (since C++26) |
| `namespace views { inline constexpr /* unspecified */ concat = /* unspecified */; }` | (2) | (since C++26) |
| Call signature |  |  |
| `template< ranges::viewable_range... Rs > requires /* see below */ constexpr ranges::view auto concat( Rs&&... rs );` |  | (since C++26) |
| Helper type aliases |  |  |
| `template< class... Rs > using /*concat-reference-t*/ = ranges::common_reference_t<ranges::range_reference_t<Rs>...>;` | (3) | (exposition only*) |
| `template< class... Rs > using /*concat-value-t*/ = std::common_type_t<ranges::range_value_t<Rs>...>;` | (4) | (exposition only*) |
| `template< class... Rs > using /*concat-rvalue-reference-t*/ = ranges::common_reference_t<ranges::range_rvalue_reference_t<Rs>...>;` | (5) | (exposition only*) |
| Helper concepts |  |  |
| `template< class Ref, class RRef, class It > concept /*concat-indirectly-readable-impl*/ = /* see description */;` | (6) | (exposition only*) |
| `template< class... Rs > concept /*concatable*/ = /* see description */;` | (7) | (exposition only*) |

`concat_view` presents a `view` factory that takes an arbitrary number of ranges as an argument list, and provides a view that starts at the first element of the first range, ends at the last element of the last range, with all range elements sequenced in between respectively in the order given in the arguments, effectively concatenating, or chaining together the argument ranges.

1) The class template with a template parameter that is a non-empty pack of `view`s each of which models at least `input_range` and is `concatable` (7).

2) `views::concat` is a customization point object.

Given a pack of subexpressions `exprs`, the expression `views::concat(exprs...)` is expression-equivalent to

- `views::all(exprs...)` if `exprs` is a pack with only one element whose type models `input_range`,
- `concat_view(exprs...)` otherwise.

3) Represents the reference type. An extra constraint is needed to make sure that each underlying range’s `ranges::range_reference_t` is convertible to `ranges::common_reference_t`.

4) The `iterator::value_type` that additionally respects the underlying ranges’ `value_type` to support the cases when the underlying ranges have proxy iterators.

5) The rvalue reference that also correctly supports the cases where underlying iterators customize `iter_move`.

6) Defines the `indirectly-readable` concept for the `iterator` so that `concat_view` can model `input_range`.

Equivalent to:

```cpp
template< class... Rs >
concept /*concat-indirectly-readable*/ = // exposition only
    std::common_reference_with</*concat-reference-t*/<Rs...>&&,
                               /*concat-value-t*/<Rs...>&> &&
    std::common_reference_with</*concat-reference-t*/<Rs...>&&,
                               /*concat-rvalue-reference-t*/<Rs...>&&> &&
    std::common_reference_with</*concat-rvalue-reference-t*/<Rs...>&&,
                               /*concat-value-t*/<Rs...> const&> &&
    (/*concat-indirectly-readable-impl*/</*concat-reference-t*/<Rs...>,
                                         /*concat-rvalue-reference-t*/<Rs...>,
                                         ranges::iterator_t<Rs>> && ...);
```

where exposition-only concept `/*concat-indirectly-readable-impl*/` is

```cpp
template< class Ref, class RRef, class It >
concept /*concat-indirectly-readable-impl*/ = // exposition only
    requires(const It it) {
        { *it } -> std::convertible_to<Ref>;
        { ranges::iter_move(it)} -> std::convertible_to<RRef>;
    };
```

7) Determines whether any two or more different ranges can be adapted into a sequence that itself models a range. Equivalent to:

```cpp
template< class... Rs >
concept /*concatable*/ = requires { // exposition only
        typename /*concat-reference-t*/<Rs...>;
        typename /*concat-value-t*/<Rs...>;
        typename /*concat-rvalue-reference-t*/<Rs...>;
    } && /*concat-indirectly-readable*/<Rs...>;
```

`concat_view` always models `input_range`, and models `forward_range`, `bidirectional_range`, `random_access_range`, or `sized_range` if each adapted `view` type models the corresponding concept.

`concat_view` can be `common_range` if the last underlying range models `common_range`.

### Customization point objects

The name `views::concat` denotes a *customization point object*, which is a const function object of a literal `semiregular` class type. For exposition purposes, the cv-unqualified version of its type is denoted as `__concat_fn`.

All instances of `__concat_fn` are equal. The effects of invoking different instances of type `__concat_fn` on the same arguments are equivalent, regardless of whether the expression denoting the instance is an lvalue or rvalue, and is const-qualified or not (however, a volatile-qualified instance is not required to be invocable). Thus, `views::concat` can be copied freely and its copies can be used interchangeably.

Given a set of types `Args...`, if `std::declval<Args>()...` meet the requirements for arguments to `views::concat` above, `__concat_fn` models

- `std::invocable<__concat_fn, Args...>`,
- `std::invocable<const __concat_fn, Args...>`,
- `std::invocable<__concat_fn&, Args...>`, and
- `std::invocable<const __concat_fn&, Args...>`.

Otherwise, no function call operator of `__concat_fn` participates in overload resolution.

### Data members

| Member | Description |
| --- | --- |
| `std::tuple<Views...>` `views_` | all adapted view objects (exposition-only member object*) |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a `concat_view` (public member function) |
| begin | returns an iterator to the beginning (public member function) |
| end | returns an iterator or a sentinel to the end (public member function) |
| size | returns the number of elements. Provided only if the underlying (adapted) range satisfies `sized_range`. (public member function) |
| Inherited from `std::ranges::view_interface` |  |
| empty | returns whether the derived view is empty. Provided if it satisfies `sized_range` or `forward_range`. (public member function of `std::ranges::view_interface<D>`) |
| cbegin (C++23) | returns a constant iterator to the beginning of the range. (public member function of `std::ranges::view_interface<D>`) |
| cend (C++23) | returns a sentinel for the constant iterator of the range. (public member function of `std::ranges::view_interface<D>`) |
| operator bool | returns whether the derived view is not empty. Provided if `ranges::empty` is applicable to it. (public member function of `std::ranges::view_interface<D>`) |
| front | returns the first element in the derived view. Provided if it satisfies `forward_range`. (public member function of `std::ranges::view_interface<D>`) |
| back | returns the last element in the derived view. Provided if it satisfies `bidirectional_range` and `common_range`. (public member function of `std::ranges::view_interface<D>`) |
| operator[] | returns the `n`th element in the derived view. Provided if it satisfies `random_access_range`. (public member function of `std::ranges::view_interface<D>`) |

### Deduction guides

### Nested classes

| Class name | Definition |
| --- | --- |
| *iterator* | the iterator type (exposition-only member class template*) |

### Helper templates

There is no specialization of `ranges::enable_borrowed_range` for `concat_view`, because this would require the iterator implementation to contain a copy of all iterators and sentinels of all underlying ranges at all times.

### Notes

No argument `views::concat()` is ill-formed, because there is no reasonable way to determine an element type `T`. Single argument `views::concat(r)` is expression equivalent to `views::all(r)`.

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_ranges_concat` | `202403L` | (C++26) | `std::ranges::concat_view` |

### Example

The preliminary version can be checked out on Compiler Explorer.

```cpp
#include <cassert>
#include <list>
#include <print>
#include <ranges>
#include <vector>

int main()
{
    std::vector<int> v0{1, 2, 3}, v1{4, 5};
    int a[]{6, 7};
    int i{8};
    auto ie{std::views::single(i)};

    auto con = std::views::concat(v0, v1, a, ie);
    assert(con.size() == v0.size() + v1.size() + std::size(a) + ie.size());
    std::println("con.size(): {}", con.size());
    std::println("con: {}", con);
    con[6] = 42; // con is random_access_range, operator[] returns a reference
    assert(a[1] == 42); // a[1] was modified via con[6]
    std::println("con: {}", con);

    std::list<int> l{7, 8}; // list is bidirectional range
    auto cat = std::views::concat(v0, l);
    std::println("cat: {}", cat);
    // cat[0] = 13; // compile-time error: cat is bidirectional => no operator[]
}
```

Output:

```text
con.size(): 8
con: [1, 2, 3, 4, 5, 6, 7, 8]
con: [1, 2, 3, 4, 5, 6, 42, 8]
cat: [1, 2, 3, 7, 8]
```

### References

- C++26 standard (ISO/IEC 14882:2026):

- 26.7.18 Concat view [range.concat]

### See also

|  |  |
| --- | --- |
| ranges::join_view, views::join (C++20) | a `view` consisting of the sequence obtained from flattening a `view` of `range`s (class template) (range adaptor object) |
| ranges::join_with_view, views::join_with (C++23) | a `view` consisting of the sequence obtained from flattening a view of ranges, with the delimiter in between elements (class template) (range adaptor object) |
| ranges::zip_view, views::zip (C++23) | a `view` consisting of tuples of references to corresponding elements of the adapted views (class template) (customization point object) |
| ranges::cartesian_product_view, views::cartesian_product (C++23) | a `view` consisting of tuples of results calculated by the n-ary cartesian product of the adapted views (class template) (customization point object) |
