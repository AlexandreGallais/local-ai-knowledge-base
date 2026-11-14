# std::ranges::lazy_split_view<V, Pattern>::*outer_iterator*<Const>::value_type

`struct value_type : ranges::view_interface<value_type>` (since C++20)

The value type of the iterator `ranges::lazy_split_view<V, Pattern>::``outer_iterator``<Const>`.

### Data members

| Member | Description |
| --- | --- |
| `outer_iterator` `i_` (private) | an iterator into underlying `view` of the outer class (exposition-only member object*) |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a `value_type` object (exposition-only member function*) |
| begin | returns an `inner_iterator` to the beginning of the inner range (public member function) |
| end | returns a `std::default_sentinel` (public member function) |
| Inherited from `std::ranges::view_interface` |  |
| empty | returns whether the derived view is empty. Provided if it satisfies `sized_range` or `forward_range`. (public member function of `std::ranges::view_interface<D>`) |
| cbegin (C++23) | returns a constant iterator to the beginning of the range. (public member function of `std::ranges::view_interface<D>`) |
| cend (C++23) | returns a sentinel for the constant iterator of the range. (public member function of `std::ranges::view_interface<D>`) |
| operator bool | returns whether the derived view is not empty. Provided if `ranges::empty` is applicable to it. (public member function of `std::ranges::view_interface<D>`) |
| front | returns the first element in the derived view. Provided if it satisfies `forward_range`. (public member function of `std::ranges::view_interface<D>`) |

### Member functions

## std::ranges::lazy_split_view::*outer_iterator*::value_type::value_type

`constexpr explicit value_type(/*outer_iterator*/ i); // exposition only` (since C++20)

Initializes `i_` with `std::move(i)`.

## std::ranges::lazy_split_view::*outer_iterator*::value_type::begin

`constexpr /*inner_iterator*/<Const> begin() const;` (since C++20)

Equivalent to `return /*inner_iterator*/<Const>{i_};`.

## std::ranges::lazy_split_view::*outer_iterator*::value_type::end

`constexpr std::default_sentinel_t end() const noexcept;` (since C++20)

Returns `std::default_sentinel`.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3593 | C++20 | `end` was not be noexcept | made noexcept |
| LWG 4013 | C++20 | `value_type` was default-initializable | not default-initializable |
