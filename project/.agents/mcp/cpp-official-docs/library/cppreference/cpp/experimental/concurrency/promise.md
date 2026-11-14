# std::experimental::promise (concurrency TS)

*This page is about the modified version of `std::promise` provided by the concurrency TS supporting the `std::future` improvements made by that TS. For the version of `promise` with type-erased allocator support provided by the Library Fundamentals TSes, see `std::experimental::fundamentals_v2::promise`.*

| Defined in header `<experimental/future>` |  |  |
| --- | --- | --- |
| `template< class R > class promise;` | (1) | (concurrency TS) |
| `template< class R > class promise<R&>;` | (2) | (concurrency TS) |
| `template<> class promise<void>;` | (3) | (concurrency TS) |

`std::experimental::concurrency_v1::promise` is a modified version of `std::promise` provided by the concurrency TS that works with `std::experimental::future`.

The only change from `std::promise` is that the `get_future()` member function returns a `std::experimental::future`.
