# Experimental C++ Standard Library headers

The interface of Experimental C++ standard libraries (i.e. libraries introduced by C++ TR's/TS's) is defined by the following collection of headers.

|  |  |
| --- | --- |
| Execution P2300 |  |
| `<experimental/execution>` (P2300) | Asynchronous execution on generic execution resources |
| Filesystem TS |  |
| `<experimental/filesystem>` (filesystem TS) | Filesystem library |
| Parallelism TS |  |
| `<experimental/algorithm>` (parallelism TS) | Non-numeric parallel algorithms |
| `<experimental/execution_policy>` (parallelism TS) | Execution policies |
| `<experimental/exception_list>` (parallelism TS) | Parallel exceptions |
| `<experimental/numeric>` (parallelism TS) | Numeric parallel algorithms |
| Library Fundamentals TS |  |
| `<experimental/algorithm>` (library fundamentals TS) | `sample` and `search` |
| `<experimental/any>` (library fundamentals TS) | `any` |
| `<experimental/chrono>` (library fundamentals TS) | Variable templates for type traits |
| `<experimental/deque>` (library fundamentals TS) | Convenience aliases for containers using polymorphic allocators |
| `<experimental/forward_list>` (library fundamentals TS) | Convenience aliases for containers using polymorphic allocators |
| `<experimental/future>` (library fundamentals TS) | `promise` and `packaged_task` using polymorphic allocators |
| `<experimental/list>` (library fundamentals TS) | Convenience aliases for containers using polymorphic allocators |
| `<experimental/functional>` (library fundamentals TS) | `function` using polymorphic allocators and searchers |
| `<experimental/map>` (library fundamentals TS) | Convenience aliases for containers using polymorphic allocators |
| `<experimental/memory>` (library fundamentals TS) | `shared_ptr` and `weak_ptr` with array support |
| `<experimental/memory_resource>` (library fundamentals TS) | Polymorphic allocators and memory resources |
| `<experimental/optional>` (library fundamentals TS) | `optional` |
| `<experimental/ratio>` (library fundamentals TS) | Variable templates for type traits |
| `<experimental/regex>` (library fundamentals TS) | Convenience aliases for containers using polymorphic allocators |
| `<experimental/set>` (library fundamentals TS) | Convenience aliases for containers using polymorphic allocators |
| `<experimental/string>` (library fundamentals TS) | Convenience aliases for containers using polymorphic allocators |
| `<experimental/string_view>` (library fundamentals TS) | `basic_string_view` |
| `<experimental/system_error>` (library fundamentals TS) | Variable templates for type traits |
| `<experimental/tuple>` (library fundamentals TS) | Variable templates for type traits and `apply` |
| `<experimental/type_traits>` (library fundamentals TS) | Variable templates for type traits and `invocation_type` |
| `<experimental/unordered_map>` (library fundamentals TS) | Convenience aliases for containers using polymorphic allocators |
| `<experimental/unordered_set>` (library fundamentals TS) | Convenience aliases for containers using polymorphic allocators |
| `<experimental/utility>` (library fundamentals TS) | `erased_type` |
| `<experimental/vector>` (library fundamentals TS) | Convenience aliases for containers using polymorphic allocators |
| Concurrency TS |  |
| `<experimental/atomic>` (concurrency TS) | `atomic_shared_ptr` and `atomic_weak_ptr` |
| `<experimental/barrier>` (concurrency TS) | `barrier` and `flex_barrier` |
| `<experimental/future>` (concurrency TS) | Extensions for `std::future` |
| `<experimental/latch>` (concurrency TS) | `latch` |
| Library Fundamentals TS v2 |  |
| `<experimental/algorithm>` (library fundamentals TS v2) | `sample` and `shuffle` |
| `<experimental/array>` (library fundamentals TS v2) | `make_array` and `to_array` |
| `<experimental/deque>` (library fundamentals TS v2) | `erase` and `erase_if` |
| `<experimental/forward_list>` (library fundamentals TS v2) | `erase` and `erase_if` |
| `<experimental/functional>` (library fundamentals TS v2) | `not_fn` |
| `<experimental/iterator>` (library fundamentals TS v2) | `ostream_joiner` |
| `<experimental/list>` (library fundamentals TS v2) | `erase` and `erase_if` |
| `<experimental/map>` (library fundamentals TS v2) | `erase_if` and `erase_if` |
| `<experimental/memory>` (library fundamentals TS v2) | `observer_ptr` |
| `<experimental/numeric>` (library fundamentals TS v2) | `gcd` and `lcm` |
| `<experimental/propagate_const>` (library fundamentals TS v2) | `propagate_const` |
| `<experimental/random>` (library fundamentals TS v2) | `randint` and `reseed` |
| `<experimental/set>` (library fundamentals TS v2) | `erase_if` and `erase_if` |
| `<experimental/source_location>` (library fundamentals TS v2) | `source_location` |
| `<experimental/string>` (library fundamentals TS v2) | `erase` and `erase_if` |
| `<experimental/type_traits>` (library fundamentals TS v2) | Metafunctions and detection idiom |
| `<experimental/unordered_map>` (library fundamentals TS v2) | `erase_if` and `erase_if` |
| `<experimental/unordered_set>` (library fundamentals TS v2) | `erase_if` and `erase_if` |
| `<experimental/vector>` (library fundamentals TS v2) | `erase` and `erase_if` |
| Ranges TS |  |
| `<experimental/ranges/algorithm>` (ranges TS) | Algorithms library |
| `<experimental/ranges/concepts>` (ranges TS) | Concepts library |
| `<experimental/ranges/functional>` (ranges TS) | Function objects |
| `<experimental/ranges/iterator>` (ranges TS) | Iterators library |
| `<experimental/ranges/random>` (ranges TS) | `UniformRandomNumberGenerator` concept |
| `<experimental/ranges/range>` (ranges TS) | Ranges library |
| `<experimental/ranges/tuple>` (ranges TS) | Tagged tuples |
| `<experimental/ranges/type_traits>` (ranges TS) | Metaprogramming and type traits |
| `<experimental/ranges/utility>` (ranges TS) | Utility components |
| Networking TS |  |
| `<experimental/buffer>` (networking TS) | Buffers |
| `<experimental/executor>` (networking TS) | Asynchronous model |
| `<experimental/internet>` (networking TS) | Internet protocol |
| `<experimental/io_context>` (networking TS) | Basic I/O services |
| `<experimental/net>` (networking TS) | Convenience header that includes every other Networking TS header |
| `<experimental/netfwd>` (networking TS) | Contains forward declarations of major Networking TS components |
| `<experimental/socket>` (networking TS) | Sockets |
| `<experimental/timer>` (networking TS) | Timers |
| Parallelism TS v2 |  |
| `<experimental/algorithm>` (parallelism TS v2) | Non-numeric parallel algorithms |
| `<experimental/execution_policy>` (parallelism TS v2) | `unseq` and `vec` policies |
| `<experimental/simd>` (parallelism TS v2) | Data-parallel types |
| `<experimental/task_block>` (parallelism TS v2) | Task block |
| Reflection TS |  |
| `<experimental/reflect>` (reflection TS) | Static reflection support library |
| Library Fundamentals TS v3 |  |
| `<experimental/scope>` (library fundamentals TS v3) | `scope_exit`, `scope_fail`, `scope_success` and `unique_resource` |
