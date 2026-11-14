# std::atomic<T>::operator&=,|=,^=

|  |  |  |
| --- | --- | --- |
| member only of `atomic<Integral` `>` specializations |  |  |
| `T operator&=( T arg ) noexcept;` | (1) | (since C++11) |
| `T operator&=( T arg ) volatile noexcept;` | (2) | (since C++11) |
| `T operator\|=( T arg ) noexcept;` | (3) | (since C++11) |
| `T operator\|=( T arg ) volatile noexcept;` | (4) | (since C++11) |
| `T operator^=( T arg ) noexcept;` | (5) | (since C++11) |
| `T operator^=( T arg ) volatile noexcept;` | (6) | (since C++11) |

Atomically replaces the current value with the result of computation involving the previous value and `arg`. The operation is read-modify-write operation.

- `operator&=` performs atomic bitwise and. Equivalent to `return fetch_and(arg) & arg;`.
- `operator|=` performs atomic bitwise or. Equivalent to `return fetch_or(arg) | arg;`.
- `operator^=` performs atomic bitwise exclusive or. Equivalent to `return fetch_xor(arg) ^ arg;`.

It is deprecated if `std::atomic<T>::is_always_lock_free` is `false` and any `volatile` overload participates in overload resolution. (since C++20)

### Parameters

arg - the argument for the arithmetic operation

### Return value

The resulting value (that is, the result of applying the corresponding binary operator to the value immediately preceding the effects of the corresponding member function in the modification order of `*this`).

### Notes

Unlike most compound assignment operators, the compound assignment operators for atomic types do not return a reference to their left-hand arguments. They return a copy of the stored value instead.

### See also

|  |  |
| --- | --- |
| fetch_and | atomically performs bitwise AND between the argument and the value of the atomic object and obtains the value held previously (public member function) |
| fetch_or | atomically performs bitwise OR between the argument and the value of the atomic object and obtains the value held previously (public member function) |
| fetch_xor | atomically performs bitwise XOR between the argument and the value of the atomic object and obtains the value held previously (public member function) |
| operator++, operator++(int), operator--, operator--(int) | increments or decrements the atomic value by one (public member function) |
| operator+=, operator-= | adds to or subtracts from the atomic value (public member function) |
