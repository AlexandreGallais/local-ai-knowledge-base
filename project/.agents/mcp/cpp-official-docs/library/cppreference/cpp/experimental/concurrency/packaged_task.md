# std::experimental::packaged_task (concurrency TS)

*This page is about the modified version of `std::packaged_task` provided by the concurrency TS supporting the `std::future` improvements made by that TS. For the version of `packaged_task` with type-erased allocator support provided by the Library Fundamentals TSes, see `std::experimental::fundamentals_v2::packaged_task`.*

| Defined in header `<experimental/future>` |  |  |
| --- | --- | --- |
| `template< class > class packaged_task; //not defined` | (1) | (concurrency TS) |
| `template< class R, class ...Args > class packaged_task<R(Args...)>;` | (2) | (concurrency TS) |

`std::experimental::concurrency_v1::packaged_task` is a modified version of `std::packaged_task` provided by the concurrency TS that works with `std::experimental::future`.

The only change from `std::packaged_task` is that the `get_future()` member function returns a `std::experimental::future<R>`.
