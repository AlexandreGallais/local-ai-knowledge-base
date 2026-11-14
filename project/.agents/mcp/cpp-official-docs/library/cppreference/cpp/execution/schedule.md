# std::execution::schedule, std::execution::schedule_result_t

| Defined in header `<execution>` |  |  |
| --- | --- | --- |
| `struct schedule_t { /*unspecified*/ };` | (1) | (since C++26) |
| `inline constexpr schedule_t schedule{};` | (2) | (since C++26) (customization point object) |
| Call signature |  |  |
| `execution::sender auto schedule( execution::scheduler auto sch );` |  | (since C++26) |
| Helper result types |  |  |
| `template< execution::scheduler Sch > using schedule_result_t = decltype(schedule(std::declval<Sch>()));` | (3) | (since C++26) |

Obtains a sender describing the start of a task graph on the provided scheduler.

For a subexpression `sch`, the expression `schedule(sch)` is expression-equivalent to `sch.schedule()`.

### Customization point objects

The name `execution::schedule` denotes a *customization point object*, which is a const function object of a literal `semiregular` class type. The cv-unqualified version of its type is a tag type denoted as `execution::schedule_t`.

All instances of `execution::schedule_t` are equal. The effects of invoking different instances of type `execution::schedule_t` on the same arguments are equivalent, regardless of whether the expression denoting the instance is an lvalue or rvalue, and is const-qualified or not (however, a volatile-qualified instance is not required to be invocable). Thus, `execution::schedule` can be copied freely and its copies can be used interchangeably.

Given a set of types `Args...`, if `std::declval<Args>()...` meet the requirements for arguments to `execution::schedule` above, `execution::schedule_t` models

- `std::invocable<execution::schedule_t, Args...>`,
- `std::invocable<const execution::schedule_t, Args...>`,
- `std::invocable<execution::schedule_t&, Args...>`, and
- `std::invocable<const execution::schedule_t&, Args...>`.

Otherwise, no function call operator of `execution::schedule_t` participates in overload resolution.

### Example

This section is incomplete Reason: no example
