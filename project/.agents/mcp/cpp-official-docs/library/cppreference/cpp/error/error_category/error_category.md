# std::error_category::error_category

|  |  |  |
| --- | --- | --- |
| `constexpr error_category() noexcept;` | (1) | (since C++11) |
| `error_category( const error_category& ) = delete;` | (2) | (since C++11) |

1) Constructs the error category object.

2) Copy constructor is deleted. `error_category` is neither MoveConstructible nor CopyConstructible.

### Parameters

(none)

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2145 | C++11 | `error_category` was not constructible | default constructor added |
