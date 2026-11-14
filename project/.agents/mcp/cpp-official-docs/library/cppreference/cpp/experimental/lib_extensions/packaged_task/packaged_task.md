# std::experimental::packaged_task<R(Args...)>::packaged_task (library fundamentals TS)

|  |  |  |
| --- | --- | --- |
| `packaged_task() noexcept;` | (1) | (library fundamentals TS) |
| `template< class F > explicit packaged_task( F&& f );` | (2) | (library fundamentals TS) |
| `template< class F, class Allocator > explicit packaged_task( std::allocator_arg_t, const Allocator& alloc, F&& f );` | (3) | (library fundamentals TS) |
| `packaged_task( const packaged_task& ) = delete;` | (4) | (library fundamentals TS) |
| `packaged_task( packaged_task&& rhs ) noexcept;` | (5) | (library fundamentals TS) |

Constructs a new `std::experimental::packaged_task` object.

1) Constructs a `std::experimental::packaged_task` object with no task and no shared state.

2) Constructs a `std::experimental::packaged_task` object with a shared state and a copy of the task, initialized with `std::forward<F>(f)`. This constructor does not participate in overload resolution if `std::decay<F>::type` is the same type as `std::packaged_task<R(ArgTypes...)>`.

3) Constructs a `std::experimental::packaged_task` object with a shared state and a copy of the task, initialized with `std::forward<F>(f)`. Uses the provided allocator to allocate memory necessary to store the task, which is treated as a type-erased allocator (see below). This constructor does not participate in overload resolution if `std::decay<F>::type` is the same type as `std::packaged_task<R(ArgTypes...)>`.

4) The copy constructor is deleted, `std::experimental::packaged_task` is move-only.

5) Constructs a `std::experimental::packaged_task` with the shared state and task formerly owned by `rhs`, leaving `rhs` with no shared state and a moved-from task.

### Type-erased allocator

The constructors of `packaged_task` taking an allocator argument `alloc` treats that argument as a type-erased allocator. The memory resource pointer used by `packaged_task` to allocate memory is determined using the allocator argument (if specified) as follows:

| Type of `alloc` | Value of the memory resource pointer |
| --- | --- |
| Non-existent (no allocator specified at time of construction) | The value of `std::experimental::pmr::get_default_resource()` at time of construction. |
| `std::nullptr_t` | The value of `std::experimental::pmr::get_default_resource()` at time of construction. |
| A pointer type convertible to `std::experimental::pmr::memory_resource*` | `static_cast<std::experimental::pmr::memory_resource*>(alloc)` |
| A specialization of `std::experimental::pmr::polymorphic_allocator` | `alloc.resource()` |
| Any other type meeting the Allocator requirements | A pointer to a value of type `std::experimental::pmr::resource_adaptor<A>(alloc)`, where `A` is the type of `alloc`. The pointer remains valid only for the lifetime of the `packaged_task` object. |
| None of the above | The program is ill-formed. |

### Parameters

|  |  |  |
| --- | --- | --- |
| f | - | the callable target (function, member function, lambda-expression, functor) to execute |
| alloc | - | the allocator to use when storing the task |
| rhs | - | the `std::experimental::packaged_task` to move from |

### Exceptions

2,3) Any exceptions thrown by copy/move constructor of `f` and possiblly `std::bad_alloc` if the allocation fails.

4) (none)
