# std::inplace_vector<T,N>::end, std::inplace_vector<T,N>::cend

|  |  |  |
| --- | --- | --- |
| `constexpr iterator end() noexcept;` | (1) | (since C++26) |
| `constexpr const_iterator end() const noexcept;` | (2) | (since C++26) |
| `constexpr const_iterator cend() const noexcept;` | (3) | (since C++26) |

Returns an iterator to the element following the last element of the `inplace_vector`.

This element acts as a placeholder; attempting to access it results in undefined behavior.

range-begin-end.svg

### Parameters

(none)

### Return value

Iterator to the element following the last element.

### Complexity

Constant.

### Example

Template:cpp/container/begin/examples/inplace vector

### See also

|  |  |
| --- | --- |
| begin, cbegin | returns an iterator to the beginning (public member function) |
| end, cend (C++11), (C++14) | returns an iterator to the end of a container or array (function template) |
