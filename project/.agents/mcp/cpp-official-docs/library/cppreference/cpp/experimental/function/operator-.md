# std::experimental::function<R(Args...)>::operator=

|  |  |  |
| --- | --- | --- |
| `function& operator=( const function& other );` | (1) | (library fundamentals TS) |
| `function& operator=( function&& other );` | (2) | (library fundamentals TS) |
| `function& operator=( std::nullptr_t ) noexcept;` | (3) | (library fundamentals TS) |
| `template< class F > function& operator=( F&& f );` | (4) | (library fundamentals TS) |
|  | (5) |  |
| `template< class F > function& operator=( std::reference_wrapper<F> f );` |  | (library fundamentals TS) |
| `template< class F > function& operator=( std::reference_wrapper<F> f ) noexcept;` |  | (library fundamentals TS v3) |

Assigns a new *target* to `std::experimental::function`. In the description below, let `ALLOCATOR_OF(f)` be the allocator specified in the construction of `f`, or the value of `std::experimental::pmr::get_default_resource()`(until library fundamentals TS v3)the default-constructed `std::pmr::polymorphic_allocator<>` value(library fundamentals TS v3) at the time of construction if no allocator was specified.

1) Assigns a copy of *target* of `other`, as if by executing `function(std::allocator_arg, ALLOCATOR_OF(*this), other).swap(*this);`.

2) Moves the *target* of `other` to `*this`, as if by executing `function(std::allocator_arg, ALLOCATOR_OF(*this), std::move(other)).swap(*this);`. `other` is in a valid state with an unspecified value.

3) Destroys the *target* of `*this`. `*this` is *empty* after the call. The memory resource returned by `get_memory_resource()` after the assignment is equivalent to the memory resource before the assignment, but the address may change.

4) Sets the *target* of `*this` to the callable `f`, as if by executing `function(std::allocator_arg, ALLOCATOR_OF(*this),std::forward<F>(f)).swap(*this);`. This operator does not participate in overload resolution unless `f` is Callable for argument types `Args...` and return type `R`.

5) Sets the *target* of `*this` to a copy of `f`, as if by executing `function(std::allocator_arg, ALLOCATOR_OF(*this), f).swap(*this);`.

### Parameters

|  |  |  |
| --- | --- | --- |
| other | - | another `std::experimental::function` object to copy or move from |
| f | - | a callable to initialize the *target* with |
| Type requirements |  |  |
| - `F` must meet the requirements of Callable. |  |  |

### Return value

`*this`

### Exceptions

1,2,4) Exception thrown on needed allocation of the storage or initialization of the target of `*this`, if any.

5) (none)

### Notes

The move assignment operator may need to allocate storage if `get_memory_resource() != other.get_memory_resource()`(until library fundamentals TS v3)`get_allocator() != other.get_allocator()`(library fundamentals TS v3)
