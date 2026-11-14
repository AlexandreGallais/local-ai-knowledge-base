# std::experimental::ranges::exchange

| Defined in header `<experimental/ranges/utility>` |  |
| --- | --- |
| `template< MoveConstructible T, class U = T > requires Assignable<T&, U> constexpr T exchange( T& obj, U&& new_val ) noexcept(/* see below */);` | (ranges TS) |

Replaces the value of `obj` with `new_value` and returns the old value of `obj`, as if by

```cpp
T old_value = std::move(obj);
obj = std::forward<U>(new_value);
return old_value;
```

### Parameters

|  |  |  |
| --- | --- | --- |
| obj | - | object whose value to replace |
| new_value | - | the value to assign to `obj` |

### Return value

The old value of `obj`.

### Exceptions

`noexcept` specification:

`noexcept(std::is_nothrow_move_constructible<T>::value && std::is_nothrow_assignable<T&, U>::value)`

### Example

This section is incomplete Reason: no example

### See also

exchange (C++14) replaces the argument with a new value and returns its previous value (function template)
