# std::experimental::ranges::UniformRandomNumberGenerator

| Defined in header `<experimental/ranges/random>` |  |
| --- | --- |
| `template< class G > concept bool UniformRandomNumberGenerator = Invocable<G&> && UnsignedIntegral<std::result_of_t<G&()>> && requires { { G::min() } -> Same<std::result_of_t<G&()>>&&; { G::max() } -> Same<std::result_of_t<G&()>>&&; };` | (ranges TS) |

The concept `UniformRandomNumberGenerator<G>` specifies that `G` is the type of a uniform random number generator, that is, objects of type `G` is a function object returning unsigned integer values such that each value in the range of possible results has (ideally) equal probability of being returned.

`UniformRandomNumberGenerator<G>` is satisfied only if, given any object `g` of type `G`:

- `G::min()` and `G::max()` are prvalue constant expressions;
- `G::min() < G::max()`
- `g()` is in the range `[G::min(), G::max()]`
- `g()` has amortized constant complexity.
