# std::indirect_unary_predicate

| Defined in header `<iterator>` |  |
| --- | --- |
| `template< class F, class I > concept indirect_unary_predicate = std::indirectly_readable<I> && std::copy_constructible<F> && std::predicate<F&, /*indirect-value-t*/<I>> && std::predicate<F&, std::iter_reference_t<I>>;` | (since C++20) |

The concept `indirect_unary_predicate` specifies requirements for algorithms that call unary predicates as their arguments. The key difference between this concept and `std::predicate` is that it is applied to the type that `I` references, rather than `I` itself.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| P2609R3 | C++20 | one of the requirements was defined in terms of `std::iter_value_t<I>&` which mishandled projections resulting in incompatibility with predicate `F&` | defined in terms of `/*indirect-value-t*/<I>` to correctly handle such projections |
| P2997R1 | C++20 | `indirect_unary_predicate` required `F&` to satisfy `predicate` with `std::iter_common_reference_t<I>` | does not require |
