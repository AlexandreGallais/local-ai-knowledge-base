# std::scoped_allocator_adaptor<OuterAlloc,InnerAlloc...>::*outermost*, *outermost-construct*, *outermost-destroy*

|  |  |  |
| --- | --- | --- |
| `template< class Alloc > /* unspecified */ /*outermost*/( Alloc&& alloc = *this );` | (1) | (exposition only*) |
| `template< class T, class... Args > void /*outermost-construct*/( T* p, Args&&... args );` | (2) | (exposition only*) |
| `template< class T > void /*outermost-destroy*/( T* p );` | (3) | (exposition only*) |

These exposition-only helper member function templates are used in member functions `construct()` and `destroy()`.

1) Obtains the outermost allocator of `alloc`.

- If the expression `alloc.outer_allocator()` is valid, returns `outermost (alloc.outer_allocator())`.
- Otherwise, returns `alloc`.

2,3) Constructs or destroys an object using the outermost allocator of `*this`.

Given the type `std::allocator_traits<std::remove_reference_t<decltype(``outermost` `())>>` as `outermost_traits`:

2) Equivalent to `outermost_traits::construct(outermost (), p, std::forward<Args>(args)...);`.

3) Equivalent to `outermost_traits::destroy(outermost (), p);`.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3116 | C++11 | the recursion condition for `outermost` was “`alloc` has the member function `outer_allocator()`” | changed to “the expression `alloc.outer_allocator()` is valid” |

### See also

|  |  |
| --- | --- |
| construct [static] | constructs an object in the allocated storage (function template) |
| destroy [static] | destructs an object stored in the allocated storage (function template) |
