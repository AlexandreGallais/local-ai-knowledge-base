# Standard library header <initializer_list> (C++11)

This header is part of the language support library.

|  |  |
| --- | --- |
| Classes |  |
| initializer_list (C++11) | references a temporary array created in list-initialization (class template) |
| Functions |  |
| std::begin(std::initializer_list) (C++11) | overloads `std::begin` (function template) |
| std::end(std::initializer_list) (C++11) | specializes `std::end` (function template) |

### Synopsis

```cpp
// all freestanding
namespace std {
  template<class E> class initializer_list {
  public:
    using value_type      = E;
    using reference       = const E&;
    using const_reference = const E&;
    using size_type       = size_t;

    using iterator        = const E*;
    using const_iterator  = const E*;

    constexpr initializer_list() noexcept;

    constexpr size_t size() const noexcept;     // number of elements
    constexpr const E* begin() const noexcept;  // first element
    constexpr const E* end() const noexcept;    // one past the last element
  };

  // initializer list range access
  template<class E> constexpr const E* begin(initializer_list<E> il) noexcept;
  template<class E> constexpr const E* end(initializer_list<E> il) noexcept;
}
```
