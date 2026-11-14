# std::experimental::any::type

`const type_info& type() const noexcept;` (library fundamentals TS)

Queries the contained type.

### Parameters

(none)

### Return value

The `typeid` of the contained value if instance is non-empty, otherwise `typeid(void)`.
