# std::generator<Ref,V,Allocator>::promise_type::operator new

|  |  |  |
| --- | --- | --- |
| `void* operator new( std::size_t size ) requires std::same_as<Allocator, void> \|\| std::default_initializable<Allocator>;` | (1) | (since C++23) |
| `template< class Alloc, class... Args > void* operator new( std::size_t size, std::allocator_arg_t, const Alloc& alloc, const Args&... );` | (2) | (since C++23) |
| `template< class This, class Alloc, class... Args > void* operator new( std::size_t size, const This&, std::allocator_arg_t, const Alloc& alloc, const Args&... );` | (3) | (since C++23) |

Allocates `size` bytes of uninitialized storage using default or user-provided allocator.

Let `A` be

- `Allocator`, if it is not `void`,
- `Alloc` for (2,3), or
- `std::allocator<void>` otherwise.

Let `B` be `std::allocator_traits<A>::template rebind_alloc<U>` where `U` is an unspecified type whose size and alignment are both `__STDCPP_DEFAULT_NEW_ALIGNMENT__`.

Initializes an allocator `b` of type `B` with:

1) `A()`,

2,3) `A(alloc)`.

Uses `b` to allocate storage for the smallest array of `U` sufficient to provide storage for a coroutine state of size `size`, and unspecified additional state necessary to ensure that `operator delete` can later deallocate this memory block with an allocator equal to `b`.

The program is ill-formed unless `std::allocator_traits<B>::pointer` is a pointer type and for overloads (2,3), `std::same_as<Allocator, void> || std::convertible_to<const Alloc&, Allocator>` is modeled.

### Parameters

|  |  |  |
| --- | --- | --- |
| size | - | the size of the storage to allocate |
| alloc | - | a user provided allocator of type `Alloc` |

### Return value

A pointer to the allocated storage.

### Exceptions

1-3) May throw.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3900 | C++23 | overloads (2,3) were constrained on conversion of `Alloc` to `Allocator` | mandated |
