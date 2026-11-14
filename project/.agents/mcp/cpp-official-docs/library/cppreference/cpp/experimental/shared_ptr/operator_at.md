# std::experimental::shared_ptr<T>::operator[]

`element_type& operator[]( std::ptrdiff_t i ) const noexcept;` (library fundamentals TS)

Index into the array pointed to by the stored pointer.

The behavior is undefined if the stored pointer is null or if `i` is negative.

If `T` (the template parameter of `shared_ptr`) is an array type `U[N]`, `i` shall be less than `N`, or the behavior is undefined.

### Parameters

i - the array index

### Return value

A reference to the `i`-th element of the array, i.e., `get()[i]`.

### Remarks

When `T` is not an array type, it is unspecified whether this function is declared. If the function is declared, it is unspecified what its return type is, except that the declaration (although not necessarily the definition) of the function is guaranteed to be legal.

### Example

This section is incomplete Reason: no example

### See also

get returns the stored pointer (public member function)
