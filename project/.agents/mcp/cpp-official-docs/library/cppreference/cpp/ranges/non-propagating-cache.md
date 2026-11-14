# Non-propagating cache (C++20)

`template< class T > requires std::is_object_v<T> class /*non-propagating-cache*/;` (since C++20) (exposition only*)

Some range adaptors such as `ranges::join_view` and `ranges::lazy_split_view` conditionally store value (e.g. an iterator) which is specified in terms of an exposition-only class template `non-propagating-cache`.

The wrapper behaves exactly like `std::optional<T>`, except that:

- it does not copy the value of the source when it is copy constructed or assigned to,
- it resets the value of the source when it is moved-from,
- it resets its value when it is assigned from, and
- it additionally provides a member function template to enable an input view to temporarily cache values as it is iterated over.

The wrapper encapsulates a cache containing a value. Clearing cache is an operation equivalent to resetting a contained value. Such operation is performed when copying or moving a wrapper.

### Template parameters

T - the type of the contained value, must be an object type

### Member functions

## Copy and move constructors

|  |  |  |
| --- | --- | --- |
| `constexpr /*non-propagating-cache*/ ( const /*non-propagating-cache*/& ) noexcept {}` | (1) | (since C++20) |
| `constexpr /*non-propagating-cache*/ ( /*non-propagating-cache*/&& other ) noexcept { other.reset(); }` | (2) | (since C++20) |

1) The copy constructor has no effect.

2) The move constructor clears the cache of `other`.

## Copy and move assignment operators

|  |  |  |
| --- | --- | --- |
| `constexpr /*non-propagating-cache*/& operator=( const /*non-propagating-cache*/& other ) noexcept { if (std::addressof(other) != this) reset(); return *this; }` | (1) | (since C++20) |
| `constexpr /*non-propagating-cache*/& operator=( /*non-propagating-cache*/&& other ) noexcept { reset(); other.reset(); return *this; }` | (2) | (since C++20) |

1) The copy assignment operator clears the cache of `*this`.

2) The move assignment operator clears caches of both `*this` and `other`.

## `non-propagating-cache<T>::emplace-deref`

`template< class I > constexpr T& /*emplace-deref*/( const I& i );` (since C++20) (exposition only*)

Initializes the contained value by direct-initializing (but not direct-list-initializing) with `*i`. If `*this` already contains a value before the call, `reset()` is called.

Returns a reference to the new contained value.

The program is ill-formed unless the declaration `T t(*i);` is well-formed for some invented variable `t`. If `*i` is a prvalue of possibly cv-qualified `T`, then it is not required to be movable.

## Members identical to std::optional

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs the `optional` object (public member function of `std::optional<T>`) |
| (destructor) | destroys the contained value, if there is one (public member function of `std::optional<T>`) |
| operator= | assigns contents (public member function of `std::optional<T>`) |
| Observers |  |
| operator->, operator* | accesses the contained value (public member function of `std::optional<T>`) |
| operator bool, has_value | checks whether the object contains a value (public member function of `std::optional<T>`) |
| Modifiers |  |
| reset | destroys any contained value (public member function of `std::optional<T>`) |
| emplace | constructs the contained value in-place (public member function of `std::optional<T>`) |

### Notes

`non-propagating-cache` is used in implementations to cache the result of `begin()` to provide an amortized constant time complexity of the method.

### See also

|  |  |
| --- | --- |
| ranges::join_view, views::join (C++20) | a `view` consisting of the sequence obtained from flattening a `view` of `range`s (class template) (range adaptor object) |
| ranges::join_with_view, views::join_with (C++23) | a `view` consisting of the sequence obtained from flattening a view of ranges, with the delimiter in between elements (class template) (range adaptor object) |
| ranges::split_view, views::split (C++20) | a `view` over the subranges obtained from splitting another `view` using a delimiter (class template) (range adaptor object) |
| ranges::lazy_split_view, views::lazy_split (C++20) | a `view` over the subranges obtained from splitting another `view` using a delimiter (class template) (range adaptor object) |
| ranges::chunk_view, views::chunk (C++23) | a range of `view`s that are `N`-sized non-overlapping successive chunks of the elements of another `view` (class template) (range adaptor object) |
