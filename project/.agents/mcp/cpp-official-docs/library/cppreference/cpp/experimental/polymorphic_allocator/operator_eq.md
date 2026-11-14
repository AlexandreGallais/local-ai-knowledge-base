# operator==,!=(std::experimental::pmr::polymorphic_allocator)

`template< class T1, class T2 > bool operator==( const polymorphic_allocator<T1>& lhs, const polymorphic_allocator<T2>& rhs ) noexcept;`

`template< class T1, class T2 > bool operator!=( const polymorphic_allocator<T1>& lhs, const polymorphic_allocator<T2>& rhs ) noexcept;`

Compares two polymorphic allocators. Two polymorphic allocators compare equal if their underlying memory resource compares equal.

1) Returns `*lhs.resource() == *rhs.resource()`.

2) Returns `!(lhs == rhs)`.

### Parameters

lhs, rhs - polymorphic allocators to compare

### Return value

1) `*lhs.resource() == *rhs.resource()`

2) `!(lhs == rhs)`
