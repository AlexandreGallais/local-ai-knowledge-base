# std::filesystem::path::swap

`void swap( path& other ) noexcept;` (1) (since C++17)

Swaps the contents (both native and generic format) of `*this` and `other`.

### Parameters

other - another path to exchange the contents with

### Return value

(none)

### Complexity

Constant.

### See also

swap(std::filesystem::path) (C++17) specializes the `std::swap` algorithm (function)
