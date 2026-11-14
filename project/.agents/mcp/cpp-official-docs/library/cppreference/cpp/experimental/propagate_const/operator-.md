# std::experimental::propagate_const<T>::operator=

|  |  |  |
| --- | --- | --- |
| `constexpr propagate_const& operator=( propagate_const&& p ) = default;` | (1) | (library fundamentals TS v2) |
| `template< class U > constexpr propagate_const& operator=( propagate_const<U>&& pu );` | (2) | (library fundamentals TS v2) |
| `template< class U > constexpr propagate_const& operator=( U&& u );` | (3) | (library fundamentals TS v2) |
| `propagate_const& operator=( const propagate_const& ) = delete;` | (4) | (library fundamentals TS v2) |

Let `t_` designate the private data member that is the wrapped pointer-like object.

1) Explicitly defaulted move assignment operator that move assigns `this->t_` from `p.t_`.

2) Assigns `std::move(pu.t_)` to `this->t_`. This overload participates in overload resolution only if `U` is implicitly convertible to `T`.

3) Assigns `std::forward<U>(u)` to `this->t_`. This overload participates in overload resolution only if `U` is implicitly convertible to `T` and `std::decay_t<U>` is not a specialization of `propagate_const`.

4) Copy assignment operator is explicitly deleted. `propagate_const` is non-copyable.

### Parameters

|  |  |  |
| --- | --- | --- |
| p | - | another `propagate_const` object to move from |
| pu | - | another `propagate_const` object of a different specialization to move from |
| u | - | another object to assign to the contained pointer |

### Return value

`*this`.
