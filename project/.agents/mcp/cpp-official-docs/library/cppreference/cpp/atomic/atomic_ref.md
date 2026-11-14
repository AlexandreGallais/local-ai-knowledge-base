# std::atomic_ref

| Defined in header `<atomic>` |  |
| --- | --- |
| `template< class T > struct atomic_ref;` | (since C++20) |

The `std::atomic_ref` class template applies atomic operations to the object it references.

For the lifetime of the `std::atomic_ref` object, the object it references is considered an atomic object. If one thread writes to an atomic object while another thread reads from it, the behavior is well-defined (see memory model for details on data races). In addition, accesses to atomic objects may establish inter-thread synchronization and order non-atomic memory accesses as specified by `std::memory_order`.

The lifetime of an object must exceed the lifetime of all `std::atomic_ref`s that references the object. While any `std::atomic_ref` instance referencing an object exists, the object must be exclusively accessed through these `std::atomic_ref` instances. No subobject of an object referenced by an `std::atomic_ref` object may be concurrently referenced by any other `std::atomic_ref` object.

Atomic operations applied to an object through an `std::atomic_ref` are atomic with respect to atomic operations applied through any other `std::atomic_ref` referencing the same object.

Like references in the core language, constness is shallow for `std::atomic_ref` - it is possible to modify the referenced value through a `const` `std::atomic_ref` object.

If any of the following conditions are satisfied, the program is ill-formed:

- `std::is_trivially_copyable_v<T>` is `false`.
- `is_always_lock_free` is `false` and `std::is_volatile_v<T>` is `true`.

`std::atomic_ref` is CopyConstructible.

### Nested types

| Type | Definition |
| --- | --- |
| `value_type` | `std::remove_cv_t<T>` |
| `difference_type` | `value_type`, if `T` is an arithmetic type other than *cv* `bool`. Otherwise, `std::ptrdiff_t`, if `T` is a pointer-to-object type. Otherwise, not defined. |

### Data members

| Member | Description |
| --- | --- |
| `T*` `ptr` | the pointer to the referenced object (exposition-only member object*) |
| is_always_lock_free [static] | indicates that the type is always lock-free (public static member constant) |
| required_alignment [static] | indicates the required alignment of an object to be referenced by `atomic_ref` (public static member constant) |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs an `atomic_ref` object (public member function) |
| operator= | stores a value into the object referenced by an `atomic_ref` object (public member function) |
| is_lock_free | checks if the `atomic_ref` object is lock-free (public member function) |
| store | atomically replaces the value of the referenced object with a non-atomic argument (public member function) |
| load | atomically obtains the value of the referenced object (public member function) |
| operator value_type | loads a value from the referenced object (public member function) |
| exchange | atomically replaces the value of the referenced object and obtains the value held previously (public member function) |
| compare_exchange_weak, compare_exchange_strong | atomically compares the value of the referenced object with non-atomic argument and performs atomic exchange if equal or atomic load if not (public member function) |
| wait | blocks the thread until notified and the atomic value changes (public member function) |
| notify_one | notifies at least one thread waiting on the atomic object (public member function) |
| notify_all | notifies all threads blocked waiting on the atomic object (public member function) |
| address (C++26) | returns the object's address (public member function) |
| Provided only when `T` is an arithmetic type other than *cv* `bool` or a pointer-to-object type |  |
| fetch_add | atomically adds the argument to the value stored in the referenced object and obtains the value held previously (public member function) |
| fetch_sub | atomically subtracts the argument from the value stored in the referenced object and obtains the value held previously (public member function) |
| operator+=, operator-= | atomically adds to or subtracts from the referenced value (public member function) |
| Provided only when `T` is an integral type other than *cv* `bool` or a pointer-to-object type |  |
| fetch_max (C++26) | atomically performs `std::max` between the argument and the value of the referenced object and obtains the value held previously (public member function) |
| fetch_min (C++26) | atomically performs `std::min` between the argument and the value of the referenced object and obtains the value held previously (public member function) |
| operator++, operator++(int), operator--, operator--(int) | atomically increments or decrements the referenced object by one (public member function) |
| Provided only when `T` is an integral type other than *cv* `bool` |  |
| fetch_and | atomically performs bitwise AND between the argument and the value of the referenced object and obtains the value held previously (public member function) |
| fetch_or | atomically performs bitwise OR between the argument and the value of the referenced object and obtains the value held previously (public member function) |
| fetch_xor | atomically performs bitwise XOR between the argument and the value of the referenced object and obtains the value held previously (public member function) |
| operator&=, operator\|=, operator^= | atomically performs bitwise AND, OR, XOR with the referenced value (public member function) |

### Specializations

The standard specifies that `std::atomic_ref` has following specializations:

|  |  |  |
| --- | --- | --- |
| `template<> struct atomic_ref</*integral-type*/>;` | (1) | (since C++20) |
| `template<> struct atomic_ref</*floating-point-type*/>;` | (2) | (since C++20) |
| `template< class /*pointer-type*/ > requires /* see below */ struct atomic_ref</*pointer-type*/>;` | (3) | (since C++20) |

1) `/*integral-type*/` denotes a possibly cv-qualified integral type other than *cv* `bool`.

2) `/*floating-point-type*/` denotes a possibly cv-qualified floating-point type.

3) The partial specialization is provided for `/*pointer-type*/` types that are possibly cv-qualified pointer-to-object types.

### Notes

Implementations may merge the specified specializations. E.g. MSVC STL merges all of them into the primary template.

When `T` is *cv* `void` or a function type, `std::atomic_ref<T*>` (i.e. `std::atomic_ref<void*>`, `std::atomic_ref<int(*)()>` etc.) does not have `difference_type` or any operation requiring pointer arithmetic or relational comparison(since C++26).

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_atomic_ref` | `201806L` | (C++20) | `std::atomic_ref` |
| `__cpp_lib_constexpr_atomic` | `202411L` | (C++26) | `constexpr` `std::atomic` and `std::atomic_ref` |

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3508 (P3323R1) | C++20 | `atomic_ref<T>` had unimplementable operations if `T` is a `const` type or pointer-to-non-object type | these operations are either constained or not provided for unsuitable `T` |

### See also

atomic (C++11) atomic class template and specializations for bool, integral, floating-point,(since C++20) and pointer types (class template)
