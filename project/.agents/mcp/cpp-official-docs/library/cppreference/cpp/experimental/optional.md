# std::experimental::optional

| Defined in header `<experimental/optional>` |  |
| --- | --- |
| `template< class T > class optional;` | (library fundamentals TS) |

The class template `std::experimental::optional` manages an *optional* contained value, i.e. a value that may or may not be present.

A common use case for `optional` is the return value of a function that may fail. As opposed to other approaches, such as `std::pair<T,bool>`, `optional` handles expensive to construct objects well and is more readable, as the intent is expressed explicitly.

Any instance of `optional<T>` at any given point in time either *contains a value* or *does not contain a value*.

If an `optional<T>` *contains a value*, the value is guaranteed to be allocated as part of the `optional` object footprint, i.e. no dynamic memory allocation ever takes place. Thus, an `optional` object models an object, not a pointer, even though the `operator*()` and `operator->()` are defined.

When an object of type optional<T> is contextually converted to bool, the conversion returns `true` if the object *contains a value* and `false` if it *does not contain a value*.

The `optional` object *contains a value* in the following conditions:

- The object is initialized with a value of type `T`.
- The object is assigned from another `optional` that *contains a value*.

The object *does not contain a value* in the following conditions:

- The object is default-initialized.
- The object is initialized with a value of `std::experimental::nullopt_t` or an `optional` object that *does not contain a value*.
- The object is assigned from a value of `std::experimental::nullopt_t` or from an `optional` that *does not contain a value*.

### Template parameters

T - the type of the value to manage initialization state for. The type must meet the requirements of Destructible.

### Member types

| Member type | Definition |
| --- | --- |
| `value_type` | `T` |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs the optional object (public member function) |
| (destructor) | destroys the contained value, if there is one (public member function) |
| operator= | assigns contents (public member function) |
| Observers |  |
| operator->, operator* | accesses the contained value (public member function) |
| operator bool | checks whether the object contains a value (public member function) |
| value | returns the contained value (public member function) |
| value_or | returns the contained value if available, another value otherwise (public member function) |
| Modifiers |  |
| swap | exchanges the contents (public member function) |
| emplace | constructs the contained value in-place (public member function) |

### Member objects

| Member name | Definition |
| --- | --- |
| `val` (private) | pointer to the contained value (which points at a data member of the same object), the name is for exposition only |

### Non-member functions

|  |  |
| --- | --- |
| operator==, operator!=, operator<, operator<=, operator>, operator>= | compares `optional` objects (function template) |
| make_optional | creates an `optional` object (function template) |
| std::swap(std::experimental::optional) | specializes the `std::swap` algorithm (function) |

### Helper classes

|  |  |
| --- | --- |
| std::hash<std::experimental::optional> | specializes the `std::hash` algorithm (class template specialization) |
| nullopt_t (library fundamentals TS) | indicator of optional type with uninitialized state (class) |
| in_place_t (library fundamentals TS) | disambiguation tag type for in-place construction of optional types (class) |
| bad_optional_access (library fundamentals TS) | exception indicating checked access to an optional that doesn't contain a value (class) |

### Helper objects

|  |  |
| --- | --- |
| nullopt (library fundamentals TS) | an object of type `nullopt_t` (function) |
| in_place (library fundamentals TS) | an object of type `std::experimental::in_place_t` (function) |
