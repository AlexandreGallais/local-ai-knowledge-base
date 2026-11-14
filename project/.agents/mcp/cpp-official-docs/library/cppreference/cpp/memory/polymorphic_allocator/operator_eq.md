# std::pmr::operator==, std::pmr::operator!=

| Defined in header `<memory_resource>` |  |  |
| --- | --- | --- |
| `template< class T1, class T2 > bool operator==( const std::pmr::polymorphic_allocator<T1>& lhs, const std::pmr::polymorphic_allocator<T2>& rhs ) noexcept;` | (1) | (since C++17) |
| `friend bool operator==( const polymorphic_allocator& lhs, const polymorphic_allocator& rhs ) noexcept;` | (2) | (since C++17) |
| `template< class T1, class T2 > bool operator!=( const std::pmr::polymorphic_allocator<T1>& lhs, const std::pmr::polymorphic_allocator<T2>& rhs ) noexcept;` | (3) | (since C++17) (until C++20) |
| `friend bool operator!=( const polymorphic_allocator& lhs, const polymorphic_allocator& rhs ) noexcept;` | (4) | (since C++17) (until C++20) |

Compares two polymorphic allocators. Two polymorphic allocators compare equal if their underlying memory resource compares equal.

1) Returns `*lhs.resource() == *rhs.resource()`.

2) Same as (1), allowing conversion to `polymorphic_allocator`. This function is not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when std::pmr::polymorphic_allocator is an associated class of the arguments.

3) Returns `!(lhs == rhs)`.

4) Same as (3), allowing conversion to `polymorphic_allocator`. This function is not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when std::pmr::polymorphic_allocator is an associated class of the arguments.

The `!=` operator is synthesized from `operator==`. (since C++20)

### Parameters

lhs, rhs - polymorphic allocators to compare

### Return value

1,2) `*lhs.resource() == *rhs.resource()`

3,4) `!(lhs == rhs)`

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3683 | C++17 | `polymorphic_allocator` could not be compared with types convertible to it | overload added |
