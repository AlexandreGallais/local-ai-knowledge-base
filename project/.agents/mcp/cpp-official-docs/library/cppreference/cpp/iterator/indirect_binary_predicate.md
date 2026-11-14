# std::indirect_binary_predicate

| Defined in header `<iterator>` |  |
| --- | --- |
| `template< class F, class I1, class I2 > concept indirect_binary_predicate = std::indirectly_readable<I1> && std::indirectly_readable<I2> && std::copy_constructible<F> && std::predicate<F&, /*indirect-value-t*/<I1>, /*indirect-value-t*/<I2>> && std::predicate<F&, /*indirect-value-t*/<I1>, std::iter_reference_t<I2>> && std::predicate<F&, std::iter_reference_t<I1>, /*indirect-value-t*/<I2>> && std::predicate<F&, std::iter_reference_t<I1>, std::iter_reference_t<I2>>;` | (since C++20) |

The concept `indirect_binary_predicate` specifies requirements for algorithms that call binary predicates as their arguments. The key difference between this concept and `std::predicate` is that it is applied to the types that `I1` and `I2` references, rather than `I1` and `I2` themselves.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| P2609R3 | C++20 | some requirements were defined in terms of `std::iter_value_t<I>&` which mishandled projections resulting in incompatibility with predicate `F&` | defined in terms of `/*indirect-value-t*/<I>` to correctly handle such projections |
| P2997R1 | C++20 | `indirect_binary_predicate` required `F&` to satisfy `predicate` with `std::iter_common_reference_t<I>` | does not require |
