# Numerics library

The C++ numerics library includes common mathematical functions and types, as well as optimized numeric arrays and support for random number generation.

## Mathematical functions and types

### Common mathematical functions

The header `<cmath>` provides standard C library mathematical functions such as `std::fabs`, `std::sqrt`, and `std::sin`.

### Mathematical special functions (since C++17)

The header `<cmath>` also provides several mathematical special functions such as `std::beta`, `std::hermite`, and `std::cyl_bessel_i`.

### Mathematical constants (since C++20)

The header `<numbers>` provides several mathematical constants, such as `std::numbers::pi` or `std::numbers::sqrt2`

### Basic linear algebra algorithms (since C++26)

The header `<linalg>` provides basic linear algebra algorithms which are based on BLAS.

### Data-parallel types (since C++26)

The header `<simd>` provides portable types for explicitly stating data-parallelism and structuring data for more efficient SIMD access.

### Complex number arithmetic

| Defined in header `<complex>` |  |
| --- | --- |
| complex | a complex number type (class template) |

### Numeric arrays

| Defined in header `<valarray>` |  |
| --- | --- |
| valarray | numeric arrays, array masks and array slices (class template) |

## Numeric algorithms

The header `<numeric>` provides numeric algorithms below:

### Factor operations (since C++17)

| Defined in header `<numeric>` |  |
| --- | --- |
| gcd (C++17) | computes the greatest common divisor of two integers (function template) |
| lcm (C++17) | computes the least common multiple of two integers (function template) |

### Interpolation operations (C++20)

| Defined in header `<numeric>` |  |
| --- | --- |
| midpoint (C++20) | midpoint between two numbers or pointers (function template) |
| Defined in header `<cmath>` |  |
| lerp (C++20) | linear interpolation function (function) |

### Saturation arithmetic (since C++26)

| Defined in header `<numeric>` |  |
| --- | --- |
| add_sat (C++26) | saturating addition operation on two integers (function template) |
| sub_sat (C++26) | saturating subtraction operation on two integers (function template) |
| mul_sat (C++26) | saturating multiplication operation on two integers (function template) |
| div_sat (C++26) | saturating division operation on two integers (function template) |
| saturate_cast (C++26) | returns an integer value clamped to the range of another integer type (function template) |

### Numeric operations

| Defined in header `<numeric>` |  |
| --- | --- |
| iota (C++11) | fills a range with successive increments of the starting value (function template) |
| ranges::iota (C++23) | fills a range with successive increments of the starting value (algorithm function object) |
| accumulate | sums up or folds a range of elements (function template) |
| reduce (C++17) | similar to `std::accumulate`, except out of order (function template) |
| transform_reduce (C++17) | applies an invocable, then reduces out of order (function template) |
| inner_product | computes the inner product of two ranges of elements (function template) |
| adjacent_difference | computes the differences between adjacent elements in a range (function template) |
| partial_sum | computes the partial sum of a range of elements (function template) |
| inclusive_scan (C++17) | similar to `std::partial_sum`, includes the ith input element in the ith sum (function template) |
| exclusive_scan (C++17) | similar to `std::partial_sum`, excludes the ith input element from the ith sum (function template) |
| transform_inclusive_scan (C++17) | applies an invocable, then calculates inclusive scan (function template) |
| transform_exclusive_scan (C++17) | applies an invocable, then calculates exclusive scan (function template) |

## Miscellaneous

### Pseudo-random number generation

The header `<random>` defines pseudo-random number generators and numerical distributions. The header `<cstdlib>` also includes C-style random number generation via `std::srand` and `std::rand`.

### Floating-point environment (since C++11)

The header `<cfenv>` defines flags and functions related to exceptional floating-point state, such as overflow and division by zero.

### Bit manipulation (since C++20)

The header `<bit>` provides several function templates to access, manipulate, and process individual bits and bit sequences. The byte ordering (endianness) of scalar types can be inspected via `std::endian` facility.

### See also

C documentation for Numerics
