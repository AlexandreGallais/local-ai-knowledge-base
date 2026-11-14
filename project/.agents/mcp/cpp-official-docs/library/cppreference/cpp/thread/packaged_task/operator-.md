# std::packaged_task<R(Args...)>::operator=

|  |  |  |
| --- | --- | --- |
| `packaged_task& operator=( const packaged_task& ) = delete;` | (1) | (since C++11) |
| `packaged_task& operator=( packaged_task&& rhs ) noexcept;` | (2) | (since C++11) |

1) Copy assignment operator is deleted, `std::packaged_task` is move-only.

2) Releases the shared state, if any, destroys the previously-held task, and moves the shared state and the task owned by `rhs` into `*this`. `rhs` is left without a shared state and with a moved-from task.

### Parameters

rhs - the `std::packaged_task` to move from

### Example

This section is incomplete Reason: no example

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2067 | C++11 | the parameter type of the copy assignment operator was `packaged_task&` | added `const` |
