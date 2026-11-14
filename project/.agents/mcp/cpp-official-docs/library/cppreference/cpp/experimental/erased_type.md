# std::experimental::erased_type

| Defined in header `<experimental/utility>` |  |
| --- | --- |
| `struct erased_type { };` | (library fundamentals TS) (removed in library fundamentals TS v3) |

The class `erased_type` is an empty struct that serves as a placeholder for a type in situations where the actual type is determined at runtime. For example, in classes that use type-erased allocators, the nested typedef `allocator_type` is an alias for `erased_type`.

### Notes

`erased_type` is removed in LFTS v3 because `std::pmr::polymorphic_allocator<>` is preferable for type erasure.
