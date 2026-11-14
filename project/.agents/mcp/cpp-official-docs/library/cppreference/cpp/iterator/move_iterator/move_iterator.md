# std::move_iterator<Iter>::move_iterator

|  |  |  |
| --- | --- | --- |
| `move_iterator();` | (1) | (constexpr since C++17) |
| `explicit move_iterator( iterator_type x );` | (2) | (constexpr since C++17) |
| `template< class U > move_iterator( const move_iterator<U>& other );` | (3) | (constexpr since C++17) |

Constructs a new `move_iterator`.

| Overload | `current` |
| --- | --- |
| (1) | value-initialized |
| (2) | initialized with `x`(until C++20)`std::move(x)`(since C++20) |
| (3) | initialized with `other.current` |

3) The converting constructor.

|  |  |
| --- | --- |
| If `U` is not convertible to `Iter`, the program is ill-formed. | (until C++20) |
| This overload participates in overload resolution only if `std::is_same_v<U, Iter>` is `false` and `std::convertible_to<const U&, Iter>` is modeled. | (since C++20) |

### Parameters

|  |  |  |
| --- | --- | --- |
| x | - | iterator to adapt |
| other | - | iterator adaptor to copy |

### Example

This section is incomplete Reason: no example

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3435 | C++20 | overload (3) was not constrained | constrained |

### See also

|  |  |
| --- | --- |
| operator= (C++11) | assigns another iterator adaptor (public member function) |
| make_move_iterator (C++11) | creates a `std::move_iterator` of type inferred from the argument (function template) |
