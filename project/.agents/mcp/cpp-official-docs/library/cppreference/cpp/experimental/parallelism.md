# Extensions for parallelism

The C++ Extensions for Parallelism, ISO/IEC TS 19570:2015 defines the following new components for the C++ standard library:

### Execution policies

The parallelism TS describes three execution policies: sequential, parallel, and parallel+vector, and provides corresponding execution policy types and objects. Users may select an execution policy statically by invoking a parallel algorithm with the an execution policy object of the corresponding type, or dynamically by using the type-erasing `execution_policy` class.

Implementations may define additional execution policies as an extension. The semantics of parallel algorithms invoked with an execution policy object of implementation-defined type is implementation-defined.

| Defined in header `<experimental/execution_policy>` |  |
| --- | --- |
| sequential_execution_policy, parallel_execution_policy, parallel_vector_execution_policy | execution policy types (class) |
| seq, par, par_vec | global execution policy objects (constant) |
| execution_policy | dynamic execution policy (class) |
| is_execution_policy | test whether a class represents an execution policy (class template) |

### Exception lists

| Defined in header `<experimental/exception_list>` |  |
| --- | --- |
| exception_list | exceptions raised during parallel executions (class) |

### Parallelized versions of existing algorithms

The TS provides parallelized versions of the following 69 algorithms from <algorithm>, <numeric> and <memory>:

Standard library algorithms for which parallelized versions are provided

`std::adjacent_difference` `std::adjacent_find` `std::all_of` `std::any_of` `std::copy` `std::copy_if` `std::copy_n` `std::count` `std::count_if` `std::equal` `std::fill` `std::fill_n` `std::find` `std::find_end` `std::find_first_of` `std::find_if` `std::find_if_not` `std::generate` `std::generate_n` `std::includes` `std::inner_product` `std::inplace_merge` `std::is_heap` `std::is_heap_until` `std::is_partitioned` `std::is_sorted` `std::is_sorted_until` `std::lexicographical_compare` `std::max_element` `std::merge` `std::min_element` `std::minmax_element` `std::mismatch` `std::move` `std::none_of` `std::nth_element` `std::partial_sort` `std::partial_sort_copy` `std::partition` `std::partition_copy` `std::remove` `std::remove_copy` `std::remove_copy_if` `std::remove_if` `std::replace` `std::replace_copy` `std::replace_copy_if` `std::replace_if` `std::reverse` `std::reverse_copy` `std::rotate` `std::rotate_copy` `std::search` `std::search_n` `std::set_difference` `std::set_intersection` `std::set_symmetric_difference` `std::set_union` `std::sort` `std::stable_partition` `std::stable_sort` `std::swap_ranges` `std::transform` `std::uninitialized_copy` `std::uninitialized_copy_n` `std::uninitialized_fill` `std::uninitialized_fill_n` `std::unique` `std::unique_copy`

### New algorithms

| Defined in header `<experimental/algorithm>` |  |
| --- | --- |
| for_each | similar to `std::for_each` except returns void (function template) |
| for_each_n | applies a function object to the first n elements of a sequence (function template) |
| Defined in header `<experimental/numeric>` |  |
| reduce (parallelism TS) | similar to `std::accumulate`, except out of order (function template) |
| exclusive_scan | similar to `std::partial_sum`, excludes the ith input element from the ith sum (function template) |
| inclusive_scan | similar to `std::partial_sum`, includes the ith input element in the ith sum (function template) |
| transform_reduce (parallelism TS) | applies a functor, then reduces out of order (function template) |
| transform_exclusive_scan | applies a functor, then calculates exclusive scan (function template) |
| transform_inclusive_scan | applies a functor, then calculates inclusive scan (function template) |
