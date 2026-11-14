# std::experimental::source_location::current

`static constexpr source_location current() noexcept;` (library fundamentals TS v2)

Constructs a new `source_location` object.

### Return value

If `current()` is invoked directly (via a function call that names `current()`), it returns a `source_location` object with implementation-defined values representing the location of the call. The values should be affected by the `#line` preprocessor directive in the same manner as the predefined macros `__LINE__` and `__FILE__`.

If `current()` is invoked in any other manner, the return value is unspecified.

### Remarks

If `current()` is used in an initializer for a non-static data member, the return value corresponds to the location of the constructor or aggregate initialization that initializes the data member.

### Notes

When `current()` is used in a default argument, the return value will correspond to the location of the call to `current()` at the call site.

### Parameters

(none)

### See also

(constructor) constructs a new `source_location` with implementation-defined values (public member function)
