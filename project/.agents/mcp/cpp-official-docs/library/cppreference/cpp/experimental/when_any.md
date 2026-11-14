# std::experimental::when_any

| Defined in header `<experimental/future>` |  |  |
| --- | --- | --- |
| `template< class Sequence > struct when_any_result { std::size_t index; Sequence futures; };` |  | (concurrency TS) |
| `template< class InputIt > auto when_any( InputIt first, InputIt last ) -> future<when_any_result<std::vector<typename std::iterator_traits<InputIt>::value_type>>>;` | (1) | (concurrency TS) |
| `template< class... Futures > auto when_any( Futures&&... futures ) -> future<when_any_result<std::tuple<std::decay_t<Futures>...>>>;` | (2) | (concurrency TS) |

Create a `future` object that becomes ready when at least one of the input `future`s and `shared_future`s become ready. The behavior is undefined if any input `future` or `shared_future` is invalid.

In particular, let `Sequence` be a `std::vector<typename std::iterator_traits<InputIt>::value_type>` for (1) and `std::tuple<std::decay_t<Futures>...>` for (2). This function template creates a shared state containing `when_any_result<Sequence>` and returns a future referring to the shared state. Every input `future` is moved into the corresponding object in the `futures` member of the `when_any_result<Sequence>` in the shared state, and every input `shared_future` is copied to the corresponding object in the `futures` member of the `when_any_result<Sequence>` in the shared state. The order of the objects in the `Sequence` matches the order of arguments.

1) This function does not participate in overload resolution unless `InputIt`'s value type (i.e., `typename std::iterator_traits<InputIt>::value_type`) is a `std::experimental::future` or `std::experimental::shared_future`.

2) This function does not participate in overload resolution unless every argument is either a (possibly cv-qualified) `std::experimental::shared_future` or a cv-unqualified `std::experimental::future`. (Formally, for every type `Fn` in `Futures`, either `std::remove_reference_t<Fn>` is `std::experimental::future<Rn>`, or `std::decay_t<Fn>` is `std::experimental::shared_future<Rn>`.)

After this call, every input `future` is no longer valid; every input `shared_future` remains valid.

### Return value

A `future` referring to the shared state created by the call. The future is always `valid()`, and it becomes ready when at least one of the input `future`s and `shared_future`s the call are ready. The `index` member of the `when_any_result` contains the position of the ready `future` or `shared_future` in the `futures` member.

1) If the range is empty (i.e., `first == last`), the returned `future` is ready immediately; the `futures` field of the `when_any_result` is an empty vector, and the `index` field is `size_t(-1)`.

2) If no argument is provided, the returned `future` is ready immediately; the `futures` field of the `when_any_result` is an empty tuple, and the `index` field is `size_t(-1)`.
