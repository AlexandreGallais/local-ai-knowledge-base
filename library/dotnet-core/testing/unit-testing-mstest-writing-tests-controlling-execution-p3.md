---
title: "Test execution and control in MSTest (part 3 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/unit-testing-mstest-writing-tests-controlling-execution.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Test execution and control in MSTest (part 3 of 3)

## Best practices

1. **Use parallelization wisely**: Enable parallelization for independent tests, but use `DoNotParallelize` for tests that share state.

1. **Set appropriate timeouts**: Choose timeouts that allow normal execution but catch stuck tests. Consider slow CI environments.

1. **Prefer cooperative cancellation**: Use cooperative cancellation to avoid the overhead of extra task wrappers and prevent background execution of timed-out tests. Enable the MSTEST0045 analyzer to enforce this practice.

1. **Document ignored tests**: Always provide a reason and work item reference when ignoring tests.

1. **Use retries sparingly**: Address the root cause of flaky tests rather than relying on retries.

1. **Test OS-specific code appropriately**: Use `OSCondition` to run platform-specific tests only where they're applicable.

## See also

- Configure MSTest
- Test lifecycle
- Write tests in MSTest
- MSTEST0001: Use Parallelize attribute
- MSTEST0041: Use condition-based attributes with test class
- MSTEST0043: Use retry attribute on test method
- MSTEST0045: Use cooperative cancellation for timeout
- MSTEST0059: Use Parallelize attribute correctly
- MSTEST0061: Use OSCondition attribute instead of runtime check
