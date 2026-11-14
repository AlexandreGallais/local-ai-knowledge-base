# Experimental library header <experimental/any>

This header is part of the Library Fundamentals TS (v1, v2).

### Classes

| Name | Description |
| --- | --- |
| bad_any_cast (library fundamentals TS) | exception that is thrown by a failed `any_cast`. (class) |
| any (library fundamentals TS) | Objects that hold instances of any type that satisfies the `ValueType` requirements. (class) |

### Functions

|  |  |
| --- | --- |
| swap | swaps two `any` instances (function) |
| any_cast | type-safe access to the contained object (function template) |

### Synopsis

```cpp
namespace std {
namespace experimental {
inline namespace fundamentals_v1 {

  class bad_any_cast : public bad_cast
  {
  public:
    virtual const char* what() const noexcept;
  };

  class any
  {
  public:
    // 6.3.1, any construct/destruct
    any() noexcept;

    any(const any& other);
    any(any&& x) noexcept;

    template <class ValueType>
        any(ValueType&& value);

    ~any();

    // 6.3.2, any assignments
    any& operator=(const any& rhs);
    any& operator=(any&& rhs) noexcept;

    template <class ValueType>
      any& operator=(ValueType&& rhs);

    // 6.3.3, any modifiers
    void clear() noexcept;
    void swap(any& rhs) noexcept;

    // 6.3.4, any observers
    bool empty() const noexcept;
    const type_info& type() const noexcept;
  };

  // 6.4, Non-member functions
  void swap(any& x, any& y) noexcept;

  template<class ValueType>
    ValueType any_cast(const any& operand);
  template<class ValueType>
    ValueType any_cast(any& operand);
  template<class ValueType>
    ValueType any_cast(any&& operand);

  template<class ValueType>
    const ValueType* any_cast(const any* operand) noexcept;
  template<class ValueType>
    ValueType* any_cast(any* operand) noexcept;

} // namespace fundamentals_v1
} // namespace experimental
} // namespace std
```
