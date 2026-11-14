# Ranges library (since C++20)

The ranges library is an extension and generalization of the algorithms and iterator libraries that makes them more powerful by making them composable and less error-prone.

The library creates and manipulates range *views*, lightweight objects that indirectly represent iterable sequences (*ranges*). Ranges are an abstraction on top of

- `[`begin`,`end`)` – iterator pairs, e.g. ranges made by implicit conversion from containers. All algorithms that take iterator pairs now have overloads that accept ranges (e.g. `ranges::sort`)
- begin`+``[``​0​``,`size`)` – counted sequences, e.g. range returned by `views::counted`
- `[`begin`,`*predicate*`)` – conditionally-terminated sequences, e.g. range returned by `views::take_while`
- `[`begin`,`..`)` – unbounded sequences, e.g. range returned by `views::iota`

The ranges library includes range algorithms, which are applied to ranges eagerly, and range adaptors, which are applied to views lazily. Adaptors can be composed into pipelines, so that their actions take place as the view is iterated.

| Defined in header `<ranges>` |  |
| --- | --- |
| `namespace std { namespace views = ranges::views; }` | (since C++20) |

The namespace alias `std::views` is provided as a shorthand for `std::ranges::views`.

| Defined in namespace `std::ranges` |  |
| --- | --- |
| Range access |  |
| Defined in header `<ranges>` |  |
| Defined in header `<iterator>` |  |
| ranges::begin (C++20) | returns an iterator to the beginning of a range (customization point object) |
| ranges::end (C++20) | returns a sentinel indicating the end of a range (customization point object) |
| ranges::cbegin (C++20) | returns an iterator to the beginning of a read-only range (customization point object) |
| ranges::cend (C++20) | returns a sentinel indicating the end of a read-only range (customization point object) |
| ranges::rbegin (C++20) | returns a reverse iterator to a range (customization point object) |
| ranges::rend (C++20) | returns a reverse end iterator to a range (customization point object) |
| ranges::crbegin (C++20) | returns a reverse iterator to a read-only range (customization point object) |
| ranges::crend (C++20) | returns a reverse end iterator to a read-only range (customization point object) |
| ranges::size (C++20) | returns an integer equal to the size of a range (customization point object) |
| ranges::ssize (C++20) | returns a signed integer equal to the size of a range (customization point object) |
| ranges::empty (C++20) | checks whether a range is empty (customization point object) |
| ranges::data (C++20) | obtains a pointer to the beginning of a contiguous range (customization point object) |
| ranges::cdata (C++20) | obtains a pointer to the beginning of a read-only contiguous range (customization point object) |
| Range primitives |  |
| Defined in header `<ranges>` |  |
| ranges::iterator_t, ranges::const_iterator_t, ranges::sentinel_t, ranges::const_sentinel_t (C++20), (C++23), (C++20), (C++23) | obtains iterator and sentinel types of a range (alias template) |
| ranges::range_difference_t, ranges::range_size_t, ranges::range_value_t (C++20), (C++20), (C++20) | obtains size, difference, and value types of a range (alias template) |
| ranges::range_reference_t, ranges::range_const_reference_t, ranges::range_rvalue_reference_t, ranges::range_common_reference_t (C++20), (C++23), (C++20), (C++20) | obtains reference types of a range (alias template) |
| Dangling iterator handling |  |
| Defined in header `<ranges>` |  |
| ranges::dangling (C++20) | a placeholder type indicating that an iterator or a `subrange` should not be returned since it would be dangling (class) |
| ranges::borrowed_iterator_t, ranges::borrowed_subrange_t (C++20) | obtains iterator type or `subrange` type of a `borrowed_range` (alias template) |
| Other utilities |  |
| Defined in header `<ranges>` |  |
| ranges::elements_of (C++23) | tags a range to be treated as a sequence rather than a single value (class template) |
| Range concepts |  |
| Defined in header `<ranges>` |  |
| ranges::range (C++20) | specifies that a type is a range, that is, it provides a `begin` iterator and an `end` sentinel (concept) |
| ranges::borrowed_range (C++20) | specifies that a type is a `range` and iterators obtained from an expression of it can be safely returned without danger of dangling (concept) |
| ranges::sized_range (C++20) | specifies that a range knows its size in constant time (concept) |
| ranges::view (C++20) | specifies that a range is a view, that is, it has constant time copy/move/assignment (concept) |
| ranges::input_range (C++20) | specifies a range whose iterator type satisfies `input_iterator` (concept) |
| ranges::output_range (C++20) | specifies a range whose iterator type satisfies `output_iterator` (concept) |
| ranges::forward_range (C++20) | specifies a range whose iterator type satisfies `forward_iterator` (concept) |
| ranges::bidirectional_range (C++20) | specifies a range whose iterator type satisfies `bidirectional_iterator` (concept) |
| ranges::random_access_range (C++20) | specifies a range whose iterator type satisfies `random_access_iterator` (concept) |
| ranges::contiguous_range (C++20) | specifies a range whose iterator type satisfies `contiguous_iterator` (concept) |
| ranges::common_range (C++20) | specifies that a range has identical iterator and sentinel types (concept) |
| ranges::viewable_range (C++20) | specifies the requirements for a `range` to be safely convertible to a `view` (concept) |
| ranges::constant_range (C++23) | specifies that a range has read-only elements (concept) |
| Range conversions |  |
| Defined in header `<ranges>` |  |
| ranges::to (C++23) | constructs a new non-view object from an input range (function template) |
| Views |  |
| Defined in header `<ranges>` |  |
| ranges::view_interface (C++20) | helper class template for defining a `view`, using the curiously recurring template pattern (class template) |
| ranges::subrange (C++20) | combines an iterator-sentinel pair into a `view` (class template) |

### Range factories

| Defined in header `<ranges>` |  |
| --- | --- |
| Defined in namespace `std::ranges` |  |
| ranges::empty_view, views::empty (C++20) | an empty `view` with no elements (class template) (variable template) |
| ranges::single_view, views::single (C++20) | a `view` that contains a single element of a specified value (class template) (customization point object) |
| ranges::iota_view, views::iota (C++20) | a `view` consisting of a sequence generated by repeatedly incrementing an initial value (class template) (customization point object) |
| ranges::repeat_view, views::repeat (C++23) | a `view` consisting of a generated sequence by repeatedly producing the same value (class template) (customization point object) |
| ranges::basic_istream_view, views::istream (C++20) | a `view` consisting of the elements obtained by successive application of `operator>>` on the associated input stream (class template) (customization point object) |

### Range adaptors

| Defined in header `<ranges>` |  |
| --- | --- |
| Defined in namespace `std::ranges` |  |
| ranges::range_adaptor_closure (C++23) | helper base class template for defining a range adaptor closure object (class template) |
| views::all_t, views::all (C++20) | a `view` that includes all elements of a `range` (alias template) (range adaptor object) |
| ranges::ref_view (C++20) | a `view` of the elements of some other `range` (class template) |
| ranges::owning_view (C++20) | a `view` with unique ownership of some `range` (class template) |
| ranges::as_rvalue_view, views::as_rvalue (C++23) | a `view` of a sequence that casts each element to an rvalue (class template) (range adaptor object) |
| ranges::filter_view, views::filter (C++20) | a `view` that consists of the elements of a `range` that satisfies a predicate (class template) (range adaptor object) |
| ranges::transform_view, views::transform (C++20) | a `view` of a sequence that applies a transformation function to each element (class template) (range adaptor object) |
| ranges::take_view, views::take (C++20) | a `view` consisting of the first N elements of another `view` (class template) (range adaptor object) |
| ranges::take_while_view, views::take_while (C++20) | a `view` consisting of the initial elements of another `view`, until the first element on which a predicate returns `false` (class template) (range adaptor object) |
| ranges::drop_view, views::drop (C++20) | a `view` consisting of elements of another `view`, skipping the first N elements (class template) (range adaptor object) |
| ranges::drop_while_view, views::drop_while (C++20) | a `view` consisting of the elements of another `view`, skipping the initial subsequence of elements until the first element where the predicate returns `false` (class template) (range adaptor object) |
| ranges::join_view, views::join (C++20) | a `view` consisting of the sequence obtained from flattening a `view` of `range`s (class template) (range adaptor object) |
| ranges::join_with_view, views::join_with (C++23) | a `view` consisting of the sequence obtained from flattening a view of ranges, with the delimiter in between elements (class template) (range adaptor object) |
| ranges::lazy_split_view, views::lazy_split (C++20) | a `view` over the subranges obtained from splitting another `view` using a delimiter (class template) (range adaptor object) |
| ranges::split_view, views::split (C++20) | a `view` over the subranges obtained from splitting another `view` using a delimiter (class template) (range adaptor object) |
| ranges::concat_view, views::concat (C++26) | a `view` consisting of concatenation of the adapted views (class template) (customization point object) |
| views::counted (C++20) | creates a subrange from an iterator and a count (customization point object) |
| ranges::common_view, views::common (C++20) | converts a `view` into a `common_range` (class template) (range adaptor object) |
| ranges::reverse_view, views::reverse (C++20) | a `view` that iterates over the elements of another bidirectional view in reverse order (class template) (range adaptor object) |
| ranges::as_const_view, views::as_const (C++23) | converts a `view` into a `constant_range` (class template) (range adaptor object) |
| ranges::elements_view, views::elements (C++20) | takes a `view` consisting of `tuple-like` values and a number N and produces a `view` of Nth element of each tuple (class template) (range adaptor object) |
| ranges::keys_view, views::keys (C++20) | takes a `view` consisting of pair-like values and produces a `view` of the first elements of each pair (class template) (range adaptor object) |
| ranges::values_view, views::values (C++20) | takes a `view` consisting of pair-like values and produces a `view` of the second elements of each pair (class template) (range adaptor object) |
| ranges::enumerate_view, views::enumerate (C++23) | a `view` that maps each element of adapted sequence to a tuple of both the element's position and its value (class template) (range adaptor object) |
| ranges::zip_view, views::zip (C++23) | a `view` consisting of tuples of references to corresponding elements of the adapted views (class template) (customization point object) |
| ranges::zip_transform_view, views::zip_transform (C++23) | a `view` consisting of results of application of a transformation function to corresponding elements of the adapted views (class template) (customization point object) |
| ranges::adjacent_view, views::adjacent (C++23) | a `view` consisting of tuples of references to adjacent elements of the adapted view (class template) (range adaptor object) |
| ranges::adjacent_transform_view, views::adjacent_transform (C++23) | a `view` consisting of results of application of a transformation function to adjacent elements of the adapted view (class template) (range adaptor object) |
| ranges::chunk_view, views::chunk (C++23) | a range of `view`s that are `N`-sized non-overlapping successive chunks of the elements of another `view` (class template) (range adaptor object) |
| ranges::slide_view, views::slide (C++23) | a `view` whose Mth element is a `view` over the Mth through (M + N - 1)th elements of another `view` (class template) (range adaptor object) |
| ranges::chunk_by_view, views::chunk_by (C++23) | splits the `view` into subranges between each pair of adjacent elements for which the given predicate returns `false` (class template) (range adaptor object) |
| ranges::stride_view, views::stride (C++23) | a `view` consisting of elements of another `view`, advancing over N elements at a time (class template) (range adaptor object) |
| ranges::cartesian_product_view, views::cartesian_product (C++23) | a `view` consisting of tuples of results calculated by the n-ary cartesian product of the adapted views (class template) (customization point object) |
| ranges::cache_latest_view, views::cache_latest (C++26) | a `view` that caches the last-accessed element of its underlying sequence (class template) (range adaptor object) |

### Range generators (since C++23)

| Defined in header `<generator>` |  |
| --- | --- |
| Defined in namespace `std` |  |
| generator (C++23) | A `view` that represents synchronous coroutine generator (class template) |

### Helper items

#### Range adaptor objects

See RangeAdaptorObject (RAO).

#### Range adaptor closure objects

See RangeAdaptorClosureObject (RACO).

#### Customization point objects

See Customization point object (CPO).

#### Assignable wrapper

Some range adaptors wrap their elements or function objects with the `copyable-box`(until C++23)`movable-box`(since C++23). The wrapper augments the wrapped object with assignability when needed.

#### Non-propagating cache

Some range adaptors are specified in terms of an exposition-only class template `non-propagating-cache`, which behaves almost like `std::optional<T>` (see description for differences).

#### Conditionally-`const` type

`template< bool Const, class T > using /*maybe-const*/ = std::conditional_t<Const, const T, T>;` (exposition only*)

The alias template `/*maybe-const*/` is a shorthand used to conditionally apply a `const` qualifier to the type `T`.

#### Integer-like type helper templates

|  |  |  |
| --- | --- | --- |
| `template< /*is-integer-like*/ T > using /*make-signed-like-t*/<T> = /* see description */;` | (1) | (exposition only*) |
| `template< /*is-integer-like*/ T > using /*make-unsigned-like-t*/<T> = /* see description */;` | (2) | (exposition only*) |
| `template< /*is-integer-like*/ T > /*make-unsigned-like-t*/<T> /*to-unsigned-like*/( T t ) { return static_cast</*make-unsigned-like-t*/<T>>(t); }` | (3) | (exposition only*) |

1) For an integer-like type `T`:

- If `T` is an integer type, `/*make-signed-like-t*/<T>` is `std::make_signed_t<T>`.
- Otherwise, `/*make-signed-like-t*/<T>` is a corresponding unspecified signed-integer-like type of the same width as `T`.

2) For an integer-like type `T`:

- If `T` is an integer type, `/*make-unsigned-like-t*/<T>` is `std::make_unsigned_t<T>`.
- Otherwise, `/*make-signed-like-t*/<T>` is a corresponding unspecified unsigned-integer-like type of the same width as `T`.

3) Explicitly converts `t` to `/*make-unsigned-like-t*/<T>`.

#### Customization point object helpers

|  |  |  |
| --- | --- | --- |
| `template< ranges::input_range R > constexpr auto& /*possibly-const-range*/(R& r) noexcept { if constexpr (ranges::input_range<const R>) return const_cast<const R&>(r); else return r; }` | (1) | (exposition only*) |
| `template< class T > constexpr auto /*as-const-pointer*/( const T* p ) noexcept { return p; }` | (2) | (exposition only*) |

Some range access customization point objects are specified in terms of these exposition-only function templates.

1) `/*possibly-const-range*/` returns the const-qualified version of `r` if `const R` models `input_range`; otherwise, returns `r` without any casting.

2) `/*as-const-pointer*/` returns a pointer to object of constant type.

#### Range adaptor helpers

|  |  |  |
| --- | --- | --- |
| `template< class F, class Tuple > constexpr auto /*tuple-transform*/( F&& f, Tuple&& tuple ) { return std::apply([&]<class... Ts>(Ts&&... args) { return std::tuple<std::invoke_result_t<F&, Ts>...> (std::invoke(f, std::forward<Ts>(args))...); }, std::forward<Tuple>(tuple)); }` | (1) | (exposition only*) |
| `template< class F, class Tuple > constexpr void /*tuple-for-each*/( F&& f, Tuple&& tuple ) { std::apply([&]<class... Ts>(Ts&&... args) { (static_cast<void>(std::invoke(f, std::forward<Ts>(args))), ...); }, std::forward<Tuple>(tuple)); }` | (2) | (exposition only*) |
| `template< class T > constexpr T& /*as-lvalue*/( T&& t ) { return static_cast<T&>(t); }` | (3) | (exposition only*) |

Some range adaptors are specified in terms of these exposition-only function templates.

1) `/*tuple-transform*/` returns a new tuple constructed by applying `f` to each element of `tuple`.

2) `/*tuple-for-each*/` applies `f` to each element of `tuple` and returns nothing.

3) `/*as-lvalue*/` forwards rvalue `t` as lvalue.

#### Helper concepts

Following exposition-only concepts are used for several types, but they are not parts of the interface of standard library.

|  |  |  |
| --- | --- | --- |
| `template< class R > concept /*simple-view*/ = ranges::view<R> && ranges::range<const R> && std::same_as<ranges::iterator_t<R>, ranges::iterator_t<const R>> && std::same_as<ranges::sentinel_t<R>, ranges::sentinel_t<const R>>;` | (1) | (exposition only*) |
| `template< class I > concept /*has-arrow*/ = ranges::input_iterator<I> && (std::is_pointer_v<I> \|\| requires(I i) { i.operator->(); });` | (2) | (exposition only*) |
| `template< class T, class U > concept /*different-from*/ = !std::same_as<std::remove_cvref_t<T>, std::remove_cvref_t<U>>;` | (3) | (exposition only*) |
| `template< class R > concept /*range-with-movable-references*/ = ranges::input_range<R> && std::move_constructible<ranges::range_reference_t<R>> && std::move_constructible<ranges::range_rvalue_reference_t<R>>;` | (4) | (exposition only*) |
| `template< bool C, class... Views > concept /*all-random-access*/ = (ranges::random_access_range <std::conditional_t<C, const Views, Views>> && ...);` | (5) | (exposition only*) |
| `template< bool C, class... Views > concept /*all-bidirectional*/ = (ranges::bidirectional_range <std::conditional_t<C, const Views, Views>> && ...);` | (6) | (exposition only*) |
| `template< bool C, class... Views > concept /*all-forward*/ = (ranges::forward_range <std::conditional_t<C, const Views, Views>> && ...);` | (7) | (exposition only*) |

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_generator` | `202207L` | (C++23) | `std::generator` – synchronous coroutine generator for ranges |
| `__cpp_lib_ranges` | `201911L` | (C++20) | Ranges library and constrained algorithms |
| `202106L` | (C++23) (DR20) | Non-default-initializable views |  |
| `202110L` | (C++23) (DR20) | Views with ownership |  |
| `202202L` | (C++23) | `ranges::range_adaptor_closure` |  |
| `202207L` | (C++23) | Relaxing range adaptors to allow for move-only types |  |
| `202211L` | (C++23) | Removing "poison pills" (P2602) overloads in `ranges::begin` etc |  |
| `202302L` | (C++23) | Relaxing ranges to allow certain projections |  |
| `202406L` | (C++26) (DR20) | Removing the common reference requirement from the indirectly invocable concepts |  |
| `__cpp_lib_ranges_as_const` | `202207L` | (C++23) | `std::const_iterator`, `ranges::as_const_view` |
| `__cpp_lib_ranges_as_rvalue` | `202207L` | (C++23) | `ranges::as_rvalue_view` |
| `__cpp_lib_ranges_cache_latest` | `202411L` | (C++26) | `ranges::cache_latest_view` |
| `__cpp_lib_ranges_cartesian_product` | `202207L` | (C++23) | `ranges::cartesian_product_view` |
| `__cpp_lib_ranges_chunk` | `202202L` | (C++23) | `ranges::chunk_view` |
| `__cpp_lib_ranges_chunk_by` | `202202L` | (C++23) | `ranges::chunk_by_view` |
| `__cpp_lib_ranges_concat` | `202403L` | (C++26) | `ranges::concat_view` |
| `__cpp_lib_ranges_enumerate` | `202302L` | (C++23) | `ranges::enumerate_view` |
| `__cpp_lib_ranges_join_with` | `202202L` | (C++23) | `ranges::join_with_view` |
| `__cpp_lib_ranges_repeat` | `202207L` | (C++23) | `ranges::repeat_view` |
| `__cpp_lib_ranges_slide` | `202202L` | (C++23) | `ranges::slide_view` |
| `__cpp_lib_ranges_stride` | `202207L` | (C++23) | `ranges::stride_view` |
| `__cpp_lib_ranges_to_container` | `202202L` | (C++23) | `ranges::to` |
| `__cpp_lib_ranges_zip` | `202110L` | (C++23) | `ranges::zip_view`, `ranges::zip_transform_view`, `ranges::adjacent_view`, `ranges::adjacent_transform_view` |

### Example

```cpp
#include <iostream>
#include <ranges>

int main()
{
    auto const ints = {0, 1, 2, 3, 4, 5};
    auto even = [](int i) { return 0 == i % 2; };
    auto square = [](int i) { return i * i; };

    // the "pipe" syntax of composing the views:
    for (int i : ints | std::views::filter(even) | std::views::transform(square))
        std::cout << i << ' ';

    std::cout << '\n';

    // a traditional "functional" composing syntax:
    for (int i : std::views::transform(std::views::filter(ints, even), square))
        std::cout << i << ' ';
}
```

Output:

```text
0 4 16
0 4 16
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3509 (P2281R1) | C++20 | it was unclear how range adaptor objects bound trailing arguments | they are bound by value |
| LWG 3948 | C++23 | `possibly-const-range` and `as-const-pointer` were not declared `noexcept` | declared `noexcept` |
| LWG 4027 | C++23 | `possibly-const-range` would not add const-qualification for ranges that has already modeled `constant_range` | adds const-qualification for such ranges |

### See also

- Iterator library
- Constrained algorithms
