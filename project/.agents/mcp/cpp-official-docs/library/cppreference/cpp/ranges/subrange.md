# std::ranges::subrange

| Defined in header `<ranges>` |  |  |
| --- | --- | --- |
| `template< std::input_or_output_iterator I, std::sentinel_for<I> S = I, ranges::subrange_kind K = std::sized_sentinel_for<S, I> ? ranges::subrange_kind::sized : ranges::subrange_kind::unsized > requires (K == ranges::subrange_kind::sized \|\| !std::sized_sentinel_for<S, I>) class subrange : public ranges::view_interface<subrange<I, S, K>>` | (1) | (since C++20) |
| Helper concepts |  |  |
| `template<class From, class To> concept /*uses-nonqualification-pointer-conversion*/ = /* see description */;` | (2) | (exposition only*) |
| `template<class From, class To> concept /*convertible-to-non-slicing*/ = /* see description */;` | (3) | (exposition only*) |

1) The `subrange` class template combines together an iterator and a sentinel into a single `view`. It models `sized_range` whenever the final template parameter is `subrange_kind​::​sized` (which happens when `std::sized_sentinel_for<S, I>` is satisfied or when size is passed explicitly as a constructor argument).

2) Determines whether `From` is convertible to `To` without qualification conversions. Equivalent to:

```cpp
template<class From, class To>
concept /*uses-nonqualification-pointer-conversion*/ =
    std::is_pointer_v<From> && std::is_pointer_v<To> &&
        !std::convertible_to<std::remove_pointer_t<From>(*)[],
                             std::remove_pointer_t<To>(*)[]>;
```

3) Determines whether `From` is convertible to `To` without derived-to-base conversion:

```cpp
template<class From, class To>
concept /*convertible-to-non-slicing*/ =
    std::convertible_to<From, To> &&
        !/*uses-nonqualification-pointer-conversion*/
            <std::decay_t<From>, std::decay_t<To>>;
```

### Data members

| Member | Definition |
| --- | --- |
| `constexpr bool` `StoreSize` [static] | `K == ranges::subrange_kind::sized && !std::sized_sentinel_for<S, I>` (exposition-only static member constant*) |
| `I` `begin_` | an iterator to the beginning of the subrange (exposition-only member object*) |
| `S` `end_` | a sentinel denoting the end of the subrange (exposition-only member object*) |
| `make-unsigned-like-t` `<std::iter_difference_t<I>>` `size_` (present only if `StoreSize` is `true`) | the size of the subrange (exposition-only member object*) |

### Member functions

|  |  |
| --- | --- |
| (constructor) | creates a new `subrange` (public member function) |
| operator PairLike | converts the `subrange` to a `pair-like` type (public member function) |
| Observers |  |
| begin | obtains the iterator (public member function) |
| end | obtains the sentinel (public member function) |
| empty | checks whether the `subrange` is empty (public member function) |
| size | obtains the size of the `subrange` (public member function) |
| Iterator operations |  |
| advance | advances the iterator by given distance (public member function) |
| prev | obtains a copy of the `subrange` with its iterator decremented by a given distance (public member function) |
| next | obtains a copy of the `subrange` with its iterator advanced by a given distance (public member function) |
| Inherited from `std::ranges::view_interface` |  |
| cbegin (C++23) | returns a constant iterator to the beginning of the range. (public member function of `std::ranges::view_interface<D>`) |
| cend (C++23) | returns a sentinel for the constant iterator of the range. (public member function of `std::ranges::view_interface<D>`) |
| operator bool | returns whether the derived view is not empty. Provided if `ranges::empty` is applicable to it. (public member function of `std::ranges::view_interface<D>`) |
| data | gets the address of derived view's data. Provided if its iterator type satisfies `contiguous_iterator`. (public member function of `std::ranges::view_interface<D>`) |
| front | returns the first element in the derived view. Provided if it satisfies `forward_range`. (public member function of `std::ranges::view_interface<D>`) |
| back | returns the last element in the derived view. Provided if it satisfies `bidirectional_range` and `common_range`. (public member function of `std::ranges::view_interface<D>`) |
| operator[] | returns the `n`th element in the derived view. Provided if it satisfies `random_access_range`. (public member function of `std::ranges::view_interface<D>`) |

### Deduction guides

### Non-member functions

get(std::ranges::subrange) (C++20) obtains iterator or sentinel from a `std::ranges::subrange` (function template)

### Helper types

|  |  |
| --- | --- |
| ranges::subrange_kind (C++20) | specifies whether a `std::ranges::subrange` models `std::ranges::sized_range` (enum) |
| std::tuple_size<std::ranges::subrange> (C++20) | obtains the size of a `std::ranges::subrange` (class template specialization) |
| std::tuple_element<std::ranges::subrange> (C++20) | obtains the type of the iterator or the sentinel of a `std::ranges::subrange` (class template specialization) |

### Helper templates

`template< class I, class S, ranges::subrange_kind K > constexpr bool ranges::enable_borrowed_range<ranges::subrange<I, S, K>> = true;` (since C++20)

This specialization of `ranges::enable_borrowed_range` makes `subrange` satisfy `borrowed_range`.

### Example

```cpp
#include <map>
#include <print>
#include <ranges>

void make_uppercase(char& v)
{
    v += 'A' - 'a';
}

void uppercase_transform(std::multimap<int, char>& m, int k)
{
    auto [first, last] = m.equal_range(k);
    for (auto& [_, v] : std::ranges::subrange(first, last))
        make_uppercase(v);
}

int main()
{
    std::multimap<int, char> mm{{4, 'a'}, {3, '-'}, {4, 'b'}, {5, '-'}, {4, 'c'}};
    std::println("Before: {}", mm);
    uppercase_transform(mm, 4);
    std::println("After:  {}", mm);
}
```

Output:

```text
Before: {3: '-', 4: 'a', 4: 'b', 4: 'c', 5: '-'}
After:  {3: '-', 4: 'A', 4: 'B', 4: 'C', 5: '-'}
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3470 | C++20 | `convertible-to-non-slicing` might reject qualification conversions | always accepts them |

### See also

ranges::view_interface (C++20) helper class template for defining a `view`, using the curiously recurring template pattern (class template)

### External links

Read/write all values of a `std::multimap` with a given key in C++20 — SO
