# std::experimental::any::any

|  |  |  |
| --- | --- | --- |
| `any() noexcept;` | (1) | (library fundamentals TS) |
| `any( const any& other );` | (2) | (library fundamentals TS) |
| `any( any&& other ) noexcept;` | (3) | (library fundamentals TS) |
| `template<typename ValueType> any( ValueType&& value );` | (4) | (library fundamentals TS) |

Constructs a new `any` object.

1) Constructs an empty object.

2,3) Copies (2) or moves (3) content of `other` into a new instance, so that any content is equivalent in both type and value to those of `other` prior to the constructor call, or empty if `other` is empty.

4) Constructs an object with initial content an object of type `std::decay_t<ValueType>`, direct-initialized from `std::forward<ValueType>(value)`. If `std::is_copy_constructible<std::decay_t<ValueType>>::value` is `false`, the program is ill-formed. This overload participates in overload resolution only if `std::decay_t<ValueType>` is not the same type as `any`.

### Template parameters

|  |  |  |
| --- | --- | --- |
| ValueType | - | contained value type |
| Type requirements |  |  |
| - `std::decay_t<ValueType>` must meet the requirements of CopyConstructible. |  |  |

### Parameters

|  |  |  |
| --- | --- | --- |
| other | - | another `any` object to copy or move from |
| value | - | value to initialize the contained value with |

### Exceptions

2,4) Throws any exception thrown by the constructor of the contained type.

### See also

operator= assigns an `any` object (public member function)
