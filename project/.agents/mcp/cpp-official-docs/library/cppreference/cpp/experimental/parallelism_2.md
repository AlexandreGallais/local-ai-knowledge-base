# Extensions for parallelism, version 2

The C++ Extensions for Parallelism Version 2, ISO/IEC TS 19570:2018 defines the following new components for the C++ standard library:

### Parallel exceptions

| Defined in header `<experimental/exception_list>` |  |
| --- | --- |
| exception_list | exceptions raised during parallel executions (class) |

### Execution policies

| Defined in header `<experimental/execution_policy>` |  |
| --- | --- |
| unsequenced_policy, vector_policy | execution policy types (class) |
| unseq, vec | global execution policy objects (constant) |

### Parallel algorithms

This section is incomplete

### Task Block

This section is incomplete

### Data-Parallel Types

|  |  |
| --- | --- |
| simd (parallelism TS v2) | data-parallel vector type (class template) |
| simd_mask (parallelism TS v2) | data-parallel type with the element type bool (class template) |

### Feature test macros

| Defined in header `<experimental/task_block>` |  |
| --- | --- |
| __cpp_lib_experimental_parallel_task_block | a value of at least `201711` indicates that the task block functionality is supported (macro constant) |
| Defined in header `<experimental/execution>` |  |
| __cpp_lib_experimental_execution_vector_policy | a value of at least `201711` indicates that the vector and wavefront policies are supported (macro constant) |
| Defined in header `<experimental/algorithm>` |  |
| __cpp_lib_experimental_parallel_for_loop | a value of at least `201711` indicates that the `for_loop` class of algorithms is supported (macro constant) |
| Defined in header `<experimental/simd>` |  |
| __cpp_lib_experimental_parallel_simd | a value of at least `201803` indicates that the data-parallel types library is supported (macro constant) |
