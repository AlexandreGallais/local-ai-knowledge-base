# std::experimental::any

| Defined in header `<experimental/any>` |  |
| --- | --- |
| `class any;` | (library fundamentals TS) |

The class `any` describes a type-safe container for single values of any type.

1) An object of class `any` stores an instance of any type that satisfies the constructor requirements or is empty, and this is referred to as the *state* of the class `any` object. The stored instance is called the contained object. Two states are equivalent if they are either both empty or if both are not empty and if the contained objects are equivalent.

2) The non-member `any_cast` functions provide type-safe access to the contained object.

Implementations are encouraged to avoid dynamic allocations for small objects, but such an optimization may only be applied to types that for which `std::is_nothrow_move_constructible` returns `true`.

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs an `any` object (public member function) |
| operator= | assigns an `any` object (public member function) |
| (destructor) | destroys an `any` object (public member function) |
| Modifiers |  |
| clear | destroys contained object (public member function) |
| swap | swaps two `any` objects (public member function) |
| Observers |  |
| empty | checks if object holds a value (public member function) |
| type | returns the `typeid` of the contained value (public member function) |

### Non-member functions

|  |  |
| --- | --- |
| swap | swaps two `any` instances (function) |
| any_cast | type-safe access to the contained object (function template) |

### Helper classes

bad_any_cast (library fundamentals TS) exception thrown by the value-returning forms of `any_cast` on a type mismatch (class)
