# std::atomic_ref<T>::operator value_type

`operator value_type() const noexcept;` (constexpr since C++26)

Equivalent to `return load();`.

### Return value

As described above.

### See also

load atomically obtains the value of the referenced object (public member function)
