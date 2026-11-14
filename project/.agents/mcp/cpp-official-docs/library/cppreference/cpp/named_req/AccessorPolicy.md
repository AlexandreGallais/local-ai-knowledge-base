# C++ named requirements: AccessorPolicy (since C++23)

**AccessorPolicy** defines how elements are accessed from a given data handle to such elements and an index. It is used as a policy in `std::mdspan` to specify the access to a reference of an element using an underlying 1D index.

### Requirements

A type `A` satisfies AccessorPolicy if it models `copyable`, and the following are `true`:

- `std::is_nothrow_move_constructible_v<A>`
- `std::is_nothrow_move_assignable_v<A>`
- `std::is_nothrow_swappable_v<A>`

And, given the following types and values, the expressions shown in the table below are valid and have the indicated semantics:

#### Legend

| Type | Definition |
| --- | --- |
| `A` | an accessor policy type |
| `OP` | an offset policy type |
| Value | Definition |
| `a` | a value of type (possibly const-qualified) `A` |
| `p` | a value of type (possibly const-qualified) `A::data_handle_type` |
| `i`, `j`, `n` | values of type `std::size_t` |

#### Member types

| Name | Type | Requirements |
| --- | --- | --- |
| `A::element_type` | *(unspecified)* | A complete object type that is not an abstract class type |
| `A::data_handle_type` | *(unspecified)* but the type need not be `element_type*` | Models `copyable` The following conditions are all `true`: `std::is_nothrow_move_constructible_v<typename A::data_handle_type>` `std::is_nothrow_move_assignable_v<typename A::data_handle_type>` `std::is_nothrow_swappable_v<typename A::data_handle_type>` |
| `A::reference` | *(unspecified)* but the type need not be `element_type&` | `std::common_reference_with<typename A::reference&&, typename A::element_type&>` is `true` |
| `A::offset_policy` | `OP` | Satisfies the requirements of AccessorPolicy `std::constructible_from<OP, const A&>` is `true` `typename OP​::​element_type` and `typename A​::​element_type` are the same type |

#### Member functions

| Expression | Return type | Semantics |
| --- | --- | --- |
| `a.access(p, i)` | `typename A::reference` | The expression is equality-preserving. |
| `a.offset(p, i)` | `typename A::offset_policy::data_handle_type` | A value `q` such that for `b` being `A::offset_policy(a)`, and any integer `n` for which `[``​0​``,``n``)` is an accessible range[note 1] of `p` and `a`. `[``​0​``,``n - i``)` is an accessible range of `q` and `b`; and `b.access(q, j)` provides access to the same element as `a.access(p, i + j)`, for every `j` in the range `[``​0​``,``n - i``)`. The expression is equality-preserving. |

1. ↑ A range of indices `[``​0​``,``N``)` is an *accessible range* of a given data handle and an accessor if, for each index in the range, the `access` member function produces a valid reference to an element.

### Standard library

The following standard library types satisfy AccessorPolicy requirements:

|  |  |
| --- | --- |
| default_accessor (C++23) | a type for indexed access to elements of `mdspan` (class template) |
| aligned_accessor (C++26) | a type for aligned access to elements of `mdspan` (class template) |
| Defined in namespace `std::linalg` |  |
| scaled_accessor (C++26) | `std::mdspan` accessor policy whose reference represents the product of a scaling factor that is fixed and its nested `std::mdspan` accessor's reference (class template) |
| conjugated_accessor (C++26) | `std::mdspan` accessor policy whose reference represents the complex conjugate of its nested `std::mdspan` accessor's reference (class template) |
