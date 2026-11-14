# std::flat_set<Key,Compare,KeyContainer>::emplace

`template< class... Args > std::pair<iterator, bool> emplace( Args&&... args );` (since C++23)

Inserts a new element into the container constructed in-place with the given `args`, if there is no element with the key in the container.

First, initializes an object `t` of type `value_type` with `std::forward<Args>(args)...`, then inserts `t` as if by

```cpp
auto it = ranges::upper_bound(c, t, compare);
c.insert(it, std::move(t));
```

This overload participates in overload resolution only if `std::is_constructible_v<value_type, Args...>` is `true`.

Careful use of `emplace` allows the new element to be constructed while avoiding unnecessary copy or move operations.

Information on iterator invalidation is copied from here

### Parameters

args - arguments to forward to the constructor of the element

### Return value

A pair consisting of an iterator to the inserted element (or to the element that prevented the insertion) and a `bool` value set to `true` if and only if the insertion took place.

### Exceptions

If an exception is thrown for any reason, this function has no effect (strong exception safety guarantee).

### Complexity

Logarithmic in the size of the container.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| emplace_hint | constructs elements in-place using a hint (public member function) |
| insert | inserts elements (public member function) |
