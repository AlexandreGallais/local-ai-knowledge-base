# std::shared_ptr<T>::use_count

`long use_count() const noexcept;`

Returns the number of different `shared_ptr` instances (`*this` included) managing the current object. If there is no managed object, `​0​` is returned.

In multithreaded environment, use_count atomically retrieves the number of instances (typical implementations use a memory_order_relaxed load).

### Parameters

(none)

### Return value

The number of `std::shared_ptr` instances managing the current object or `​0​` if there is no managed object.

### Notes

Common use cases include

- comparison with `​0​`. If `use_count` returns zero, the shared pointer is *empty* and manages no objects (whether or not its stored pointer is `nullptr`).
- comparison with `1`. If `use_count` returns 1, there are no other owners. The deprecated(since C++17) member function `unique()` is provided for this use case.(until C++20)

In multithreaded environment

The value returned by `use_count` should be considered approximate, as the number of shared owners might change in other threads between the atomic retrieval and meaningful use of the value. When `use_count` returns 1, it does not imply that the object is safe to modify because accesses to the managed object by former shared owners may not have completed, and because new shared owners may be introduced concurrently, such as by `std::weak_ptr::lock`. Only when `use_count` returns 0 is the count accurate.

### Example

```cpp
#include <iostream>
#include <memory>

void fun(std::shared_ptr<int> sp)
{
    std::cout << "in fun(): sp.use_count() == " << sp.use_count()
              << " (object @ " << sp << ")\n";
}

int main()
{
    auto sp1 = std::make_shared<int>(5);
    std::cout << "in main(): sp1.use_count() == " << sp1.use_count()
              << " (object @ " << sp1 << ")\n";

    fun(sp1);
}
```

Possible output:

```text
in main(): sp1.use_count() == 1 (object @ 0x20eec30)
in fun(): sp.use_count() == 2 (object @ 0x20eec30)
```

### See also

unique (until C++20) checks whether the managed object is managed only by the current `shared_ptr` object (public member function)
