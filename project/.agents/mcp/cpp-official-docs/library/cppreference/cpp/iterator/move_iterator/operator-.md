# std::move_iterator<Iter>::operator=

`template< class U > move_iterator& operator=( const move_iterator<U>& other );` (constexpr since C++17)

Assigns `other.current` to `current` .

|  |  |
| --- | --- |
| If `U` is not convertible to `Iter`, the program is ill-formed. | (until C++20) |
| This overload participates in overload resolution only if `std::is_same_v<U, Iter>` is `false` and both `std::convertible_to<const U&, Iter>` and `std::assignable_from<Iter&, const U&>` are modeled. | (since C++20) |

### Parameters

other - iterator adaptor to assign

### Return value

`*this`

### Example

This section is incomplete Reason: no example

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3435 | C++20 | the converting assignment operator was not constrained | constrained |

### See also

(constructor) (C++11) constructs a new iterator adaptor (public member function)
