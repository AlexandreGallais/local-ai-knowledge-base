# Experimental library header <experimental/optional>

This header is part of the Library Fundamentals TS (v1, v2).

### Classes

| Name | Description |
| --- | --- |
| optional (library fundamentals TS) | a wrapper that may or may not hold an object (class template) |
| bad_optional_access (library fundamentals TS) | exception indicating checked access to an optional that doesn't contain a value (class) |
| in_place_t (library fundamentals TS) | disambiguation tag type for in-place construction of optional types (class) |
| std::hash<std::experimental::optional> | specializes the `std::hash` algorithm (class template specialization) |
| nullopt_t (library fundamentals TS) | indicator of optional type with uninitialized state (class) |

### Functions

|  |  |
| --- | --- |
| Comparison |  |
| operator==, operator!=, operator<, operator<=, operator>, operator>= | compares `optional` objects (function template) |
| Specialized algorithms |  |
| std::swap(std::experimental::optional) | specializes the `std::swap` algorithm (function) |
| make_optional | creates an `optional` object (function template) |
| Hash support |  |

### Synopsis

```cpp
namespace std {
  namespace experimental {
  inline namespace fundamentals_v1 {

    // 5.4, optional for object types
    template <class T> class optional;

    // 5.5, In-place construction
    struct in_place_t{};
    constexpr in_place_t in_place{};

    // 5.6, Disengaged state indicator
    struct nullopt_t{see below};
    constexpr nullopt_t nullopt(unspecified);

    // 5.7, Class bad_optional_access
    class bad_optional_access;

    // 5.8, Relational operators
    template <class T>
      constexpr bool operator==(const optional<T>&, const optional<T>&);
    template <class T>
      constexpr bool operator!=(const optional<T>&, const optional<T>&);
    template <class T>
      constexpr bool operator<(const optional<T>&, const optional<T>&);
    template <class T>
      constexpr bool operator>(const optional<T>&, const optional<T>&);
    template <class T>
      constexpr bool operator<=(const optional<T>&, const optional<T>&);
    template <class T>
      constexpr bool operator>=(const optional<T>&, const optional<T>&);

    // 5.9, Comparison with nullopt
    template <class T> constexpr bool operator==(const optional<T>&, nullopt_t) noexcept;
    template <class T> constexpr bool operator==(nullopt_t, const optional<T>&) noexcept;
    template <class T> constexpr bool operator!=(const optional<T>&, nullopt_t) noexcept;
    template <class T> constexpr bool operator!=(nullopt_t, const optional<T>&) noexcept;
    template <class T> constexpr bool operator<(const optional<T>&, nullopt_t) noexcept;
    template <class T> constexpr bool operator<(nullopt_t, const optional<T>&) noexcept;
    template <class T> constexpr bool operator<=(const optional<T>&, nullopt_t) noexcept;
    template <class T> constexpr bool operator<=(nullopt_t, const optional<T>&) noexcept;
    template <class T> constexpr bool operator>(const optional<T>&, nullopt_t) noexcept;
    template <class T> constexpr bool operator>(nullopt_t, const optional<T>&) noexcept;
    template <class T> constexpr bool operator>=(const optional<T>&, nullopt_t) noexcept;
    template <class T> constexpr bool operator>=(nullopt_t, const optional<T>&) noexcept;

    // 5.10, Comparison with T
    template <class T> constexpr bool operator==(const optional<T>&, const T&);
    template <class T> constexpr bool operator==(const T&, const optional<T>&);
    template <class T> constexpr bool operator!=(const optional<T>&, const T&);
    template <class T> constexpr bool operator!=(const T&, const optional<T>&);
    template <class T> constexpr bool operator<(const optional<T>&, const T&);
    template <class T> constexpr bool operator<(const T&, const optional<T>&);
    template <class T> constexpr bool operator<=(const optional<T>&, const T&);
    template <class T> constexpr bool operator<=(const T&, const optional<T>&);
    template <class T> constexpr bool operator>(const optional<T>&, const T&);
    template <class T> constexpr bool operator>(const T&, const optional<T>&);
    template <class T> constexpr bool operator>=(const optional<T>&, const T&);
    template <class T> constexpr bool operator>=(const T&, const optional<T>&);

    // 5.11, Specialized algorithms
    template <class T> void swap(optional<T>&, optional<T>&) noexcept(see below);
    template <class T> constexpr optional<see below> make_optional(T&&);

  } // namespace fundamentals_v1
  } // namespace experimental

  // 5.12, Hash support
  template <class T> struct hash;
  template <class T> struct hash<experimental::optional<T>>;

} // namespace std
```
