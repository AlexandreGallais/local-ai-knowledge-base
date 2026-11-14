# Basic linear algebra algorithms (since C++26)

Basic linear algebra algorithms are based on the dense Basic Linear Algebra Subroutines (BLAS) which corresponds to a subset of the BLAS Standard. These algorithms that access the elements of arrays view those elements through `std::mdspan` representing vector or matrix.

The BLAS algorithms are categorized into three sets of operations called *levels*, which generally correspond to the degree of the polynomial in the complexities of algorithms:

- BLAS 1: All algorithms with `std::mdspan` parameters perform a count of `std::mdspan` array accesses and arithmetic operations that are *linear* in the maximum product of extents of any `std::mdspan` parameter. These algorithms contain *vector* operations such as dot products, norms, and vector addition.
- BLAS 2: All algorithms have general complexity in *quadratic* time. These algorithms contain *matrix-vector* operations such as matrix-vector multiplications and a solver of the triangular linear system.
- BLAS 3: All algorithms have general complexity in *cubic* time. These algorithms contain *matrix-matrix* operations such as matrix-matrix multiplications and a solver of the multiple triangular linear systems.

|  |  |
| --- | --- |
| In-place transformations |  |
| Defined in header `<linalg>` |  |
| Defined in namespace `std::linalg` |  |
| scaled_accessor (C++26) | `std::mdspan` accessor policy whose reference represents the product of a scaling factor that is fixed and its nested `std::mdspan` accessor's reference (class template) |
| conjugated_accessor (C++26) | `std::mdspan` accessor policy whose reference represents the complex conjugate of its nested `std::mdspan` accessor's reference (class template) |
| layout_transpose (C++26) | `std::mdspan` layout mapping policy that swaps the rightmost two indices, extents, and strides of any unique layout mapping policy (class template) |
| scaled (C++26) | returns a new read-only `std::mdspan` computed by the elementwise product of the scaling factor and the corresponding elements of the given `std::mdspan` (function template) |
| conjugated (C++26) | returns a new read-only `std::mdspan` whose elements are the complex conjugates of the corresponding elements of the given `std::mdspan` (function template) |
| transposed (C++26) | returns a new `std::mdspan` representing the transpose of the input matrix by the given `std::mdspan` (function template) |
| conjugate_transposed (C++26) | returns a conjugate transpose view of an object (function template) |
| BLAS 1 functions |  |
| Defined in header `<linalg>` |  |
| Defined in namespace `std::linalg` |  |
| setup_givens_rotation (C++26) | generates plane rotation (function template) |
| apply_givens_rotation (C++26) | applies plane rotation to vectors (function template) |
| swap_elements (C++26) | swaps all corresponding elements of matrix or vector (function template) |
| scale (C++26) | overwrites matrix or vector with the result of computing the elementwise multiplication by a scalar (function template) |
| copy (C++26) | copies elements of one matrix or vector into another (function template) |
| add (C++26) | adds vectors or matrices elementwise (function template) |
| dot (C++26) | returns nonconjugated dot product of two vectors (function template) |
| dotc (C++26) | returns conjugated dot product of two vectors (function template) |
| vector_sum_of_squares (C++26) | returns scaled sum of squares of the vector elements (function template) |
| vector_two_norm (C++26) | returns Euclidean norm of a vector (function template) |
| vector_abs_sum (C++26) | returns sum of absolute values of the vector elements (function template) |
| vector_idx_abs_max (C++26) | returns index of maximum absolute value of vector elements (function template) |
| matrix_frob_norm (C++26) | returns Frobenius norm of a matrix (function template) |
| matrix_one_norm (C++26) | returns one norm of a matrix (function template) |
| matrix_inf_norm (C++26) | returns infinity norm of a matrix (function template) |
| BLAS 2 functions |  |
| Defined in header `<linalg>` |  |
| Defined in namespace `std::linalg` |  |
| matrix_vector_product (C++26) | computes matrix-vector product (function template) |
| symmetric_matrix_vector_product (C++26) | computes symmetric matrix-vector product (function template) |
| hermitian_matrix_vector_product (C++26) | computes Hermitian matrix-vector product (function template) |
| triangular_matrix_vector_product (C++26) | computes triangular matrix-vector product (function template) |
| triangular_matrix_vector_solve (C++26) | solves a triangular linear system (function template) |
| matrix_rank_1_update (C++26) | performs nonsymmetric nonconjugated rank-1 update of a matrix (function template) |
| matrix_rank_1_update_c (C++26) | performs nonsymmetric conjugated rank-1 update of a matrix (function template) |
| symmetric_matrix_rank_1_update (C++26) | performs rank-1 update of a symmetric matrix (function template) |
| hermitian_matrix_rank_1_update (C++26) | performs rank-1 update of a Hermitian matrix (function template) |
| hermitian_matrix_rank_2_update (C++26) | performs rank-2 update of a symmetric matrix (function template) |
| hermitian_matrix_rank_2_update (C++26) | performs rank-2 update of a Hermitian matrix (function template) |
| BLAS 3 functions |  |
| Defined in header `<linalg>` |  |
| Defined in namespace `std::linalg` |  |
| matrix_product (C++26) | computes matrix-matrix product (function template) |
| symmetric_matrix_product (C++26) | computes symmetric matrix-matrix product (function template) |
| hermitian_matrix_product (C++26) | computes Hermitian matrix-matrix product (function template) |
| triangular_matrix_product, triangular_matrix_left_product, triangular_matrix_right_product (C++26) | computes triangular matrix-matrix product (function template) |
| symmetric_matrix_rank_k_update (C++26) | performs rank-k update of a symmetric matrix (function template) |
| hermitian_matrix_rank_k_update (C++26) | performs rank-k update of a Hermitian matrix (function template) |
| symmetric_matrix_rank_2k_update (C++26) | performs rank-2k update of a symmetric matrix (function template) |
| hermitian_matrix_rank_2k_update (C++26) | performs rank-2k update of a Hermitian matrix (function template) |
| triangular_matrix_matrix_left_solve, triangular_matrix_matrix_right_solve (C++26) | solves multiple triangular linear systems (function template) |
| Helper items |  |
| Defined in header `<linalg>` |  |
| Defined in namespace `std::linalg` |  |
| column_major, row_major, column_major_t, row_major_t (C++26) | describe the order of elements in an `std::mdspan` with `linalg::layout_blas_packed` layout (tag) |
| upper_triangle, lower_triangle, upper_triangle_t, lower_triangle_t (C++26) | specify whether algorithms and other users of a matrix should access the upper triangle or lower triangle of the matrix (tag) |
| implicit_unit_diagonal, explicit_diagonal, implicit_unit_diagonal_t, explicit_diagonal_t (C++26) | specify whether algorithms should access diagonal entries of the matrix (tag) |
| layout_blas_packed (C++26) | `std::mdspan` layout mapping policy that represents a square matrix that stores only the entries in one triangle, in a packed contiguous format (class template) |

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_linalg` | `202311L` | (C++26) | Basic linear algebra algorithms (BLAS) |

### Example

```cpp
#include <cassert>
#include <cstddef>
#include <execution>
#include <linalg>
#include <mdspan>
#include <numeric>
#include <vector>

int main()
{
    std::vector<double> x_vec(42);
    std::ranges::iota(x_vec, 0.0);

    std::mdspan x(x_vec.data(), x_vec.size());

    // x[i] *= 2.0, executed sequentially
    std::linalg::scale(2.0, x);

    // x[i] *= 3.0, executed in parallel
    std::linalg::scale(std::execution::par_unseq, 3.0, x);

    for (std::size_t i{}; i != x.size(); ++i)
        assert(x[i] == 6.0 * static_cast<double>(i));
}
```

### External links

|  |  |
| --- | --- |
| 1. | BLAS homepage |
| 2. | BLAS Technical Forum |
