# std::experimental::optional<T>::optional

|  |  |  |
| --- | --- | --- |
| `constexpr optional() noexcept; constexpr optional( std::experimental::nullopt_t ) noexcept;` | (1) | (library fundamentals TS) |
| `optional( const optional& other );` | (2) | (library fundamentals TS) |
| `optional( optional&& other ) noexcept(/* see below */);` | (3) | (library fundamentals TS) |
| `constexpr optional( const T& value );` | (4) | (library fundamentals TS) |
| `constexpr optional( T&& value );` | (5) | (library fundamentals TS) |
| `template< class... Args > constexpr explicit optional( std::experimental::in_place_t, Args&&... args );` | (6) | (library fundamentals TS) |
| `template< class U, class... Args > constexpr explicit optional( std::experimental::in_place_t, std::initializer_list<U> ilist, Args&&... args );` | (7) | (library fundamentals TS) |

Constructs a new `optional` object.

1) Constructs the object that *does not contain a value*.

2) Copy constructor: If `other` contains a value, initializes the contained value as if direct-initializing (but not direct-list-initializing) an object of type `T` with the expression `*other`. If `other` does not contain a value, constructs an object that *does not contain a value*.

3) Move constructor: If `other` contains a value, initializes the contained value as if direct-initializing (but not direct-list-initializing) an object of type `T` with the expression `std::move(*other)` and *does not* make `other` empty: a moved-from optional still *contains a value*, but the value itself is moved from. If `other` does not contain a value, constructs an object that *does not contain a value*.

4) Constructs an optional object that *contains a value*, initialized as if direct-initializing (but not direct-list-initializing) an object of type `T` with the expression `value`. This constructor is `constexpr` if the constructor of `T` selected by direct-initialization is `constexpr`.

5) Constructs an optional object that *contains a value*, initialized as if direct-initializing (but not direct-list-initializing) an object of type `T` with the expression `std::move(value)`. This constructor is `constexpr` if the constructor of `T` selected by direct-initialization is `constexpr`.

6) Constructs an optional object that *contains a value*, initialized as if direct-initializing (but not direct-list-initializing) an object of type `T` from the arguments `std::forward<Args>(args)...`.

7) Constructs an optional object that *contains a value*, initialized as if direct-initializing (but not direct-list-initializing) an object of type `T` from the arguments `ilist, std::forward<Args>(args)...`. The function does not participate in the overload resolution if `std::is_constructible<T, std::initializer_list<U>&, Args&&...>::value != true`.

### Parameters

|  |  |  |
| --- | --- | --- |
| other | - | another `optional` object whose contained value to copy |
| value | - | value to initialize the contained value with |
| args... | - | arguments to initialize the contained value with |
| ilist | - | initializer list to initialize the contained value with |
| Type requirements |  |  |
| - `T` must meet the requirements of CopyConstructible in order to use overloads (2,4). |  |  |
| - `T` must meet the requirements of MoveConstructible in order to use overloads (3,5). |  |  |

### Exceptions

2) Throws any exception thrown by the constructor of `T`.

3) Throws any exception thrown by the constructor of `T`. Has the following `noexcept` declaration:

`noexcept` specification:

`noexcept(std::is_nothrow_move_constructible<T>::value)`

4-7) Throws any exception thrown by the constructor of `T`.

### Example

```cpp
#include <experimental/optional>
#include <iostream>
#include <string>

int main()
{
    std::experimental::optional<int> o1,      // empty
                                     o2 = 1,  // init from rvalue
                                     o3 = o2; // copy-constructor

    std::experimental::optional<std::string> o4(std::experimental::in_place,
                                                {'a', 'b', 'c'});

    std::cout << *o2 << ' ' << *o3 << ' ' << *o4 << '\n';
}
```

Output:

```text
1 1 abc
```

### See also

make_optional creates an `optional` object (function template)
