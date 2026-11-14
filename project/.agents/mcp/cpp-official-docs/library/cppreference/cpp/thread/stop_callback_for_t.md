# std::stop_callback_for_t

| Defined in header `<stop_token>` |  |
| --- | --- |
| `template< class T, class CallbackFn > using stop_callback_for_t = T::template callback_type<CallbackFn>;` | (since C++26) |

The alias template `stop_callback_for_t` is used to obtain the stop callback type of the type `T`.

### Notes

The corresponding `stop_callback_for_t` for standard stop token types and any valid `CallbackFn` are:

- specialization of `std::stop_callback` for `std::stop_token`,
- specialization of `std::inplace_stop_callback` for `std::inplace_stop_token`, and
- unspecified type without stoppable callback registration and deregistration for `std::never_stop_token`.
