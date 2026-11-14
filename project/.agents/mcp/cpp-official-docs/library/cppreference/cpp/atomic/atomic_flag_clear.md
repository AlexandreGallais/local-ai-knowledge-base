# std::atomic_flag_clear, std::atomic_flag_clear_explicit

| Defined in header `<atomic>` |  |  |
| --- | --- | --- |
| `void atomic_flag_clear( volatile std::atomic_flag* obj ) noexcept;` | (1) | (since C++11) |
| `void atomic_flag_clear( std::atomic_flag* obj ) noexcept;` | (2) | (since C++11) |
| `void atomic_flag_clear_explicit( volatile std::atomic_flag* obj, std::memory_order order ) noexcept;` | (3) | (since C++11) |
| `void atomic_flag_clear_explicit( std::atomic_flag* obj, std::memory_order order ) noexcept;` | (4) | (since C++11) |

Atomically changes the state of the `std::atomic_flag` pointed to by `obj` to clear (`false`).

1,2) The memory synchronization ordering is `std::memory_order_seq_cst`.

3,4) The memory synchronization ordering is `order`.

If `order` is one of `std::memory_order_consume`, `std::memory_order_acquire` and `std::memory_order_acq_rel`, the behavior is undefined.

### Parameters

|  |  |  |
| --- | --- | --- |
| obj | - | pointer to `std::atomic_flag` to access |
| order | - | the memory synchronization ordering |

### Notes

`std::atomic_flag_clear` and `std::atomic_flag_clear_explicit` can be implemented as `obj->clear()` and `obj->clear(order)` respectively.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2138 | C++11 | `order` could be `std::memory_order_consume` | the behavior is undefined in this case |

### See also

|  |  |
| --- | --- |
| atomic_flag (C++11) | the lock-free boolean atomic type (class) |
| atomic_flag_test_and_set, atomic_flag_test_and_set_explicit (C++11), (C++11) | atomically sets the flag to `true` and returns its previous value (function) |
| memory_order (C++11) | defines memory ordering constraints for the given atomic operation (enum) |
| C documentation for atomic_flag_clear, atomic_flag_clear_explicit |  |
