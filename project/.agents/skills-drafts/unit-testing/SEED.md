# SEED: unit-testing  (TST-01, 4 stars, V1)

## Final frontmatter (do not change)

```yaml
name: unit-testing
description: "Writes readable unit tests with the project's framework - Arrange-Act-Assert, one behaviour per test, clear names, fast and isolated. Use when adding or changing a function, class or component, when asked for tests, or when a module has no test for the behaviour you change."
metadata:
  id: TST-01
  stars: "4"
  nature: reference
  mode: D
  wave: V1
  load: auto
```

## Family template

`.agents/skills/_templates/tool-reference.md`, with one `references/<language>.md` per language present in the project.

## Topics checklist

- [ ] Detect the test framework and runner per language (Vitest or Jest, pytest, xUnit or NUnit or MSTest, JUnit 5 or 6, cargo test, GoogleTest or Catch2).
- [ ] Command to run one test file and one test by name, per framework.
- [ ] Test file naming and location used by the project.
- [ ] Arrange-Act-Assert layout, one behaviour per test, naming pattern `<unit>_<condition>_<expected>` or the project's.
- [ ] Parametrised tests per framework (`test.each`, `pytest.mark.parametrize`, `[Theory]`, `@ParameterizedTest`, `rstest` if present).
- [ ] Fixtures and setup per framework; isolation of time, randomness, file system.
- [ ] Assertions on exceptions and errors per framework.
- [ ] Cross-reference `testing-anti-patterns`; do not repeat it.

## Known pitfalls to confirm or drop

- Vitest and Jest: forgetting `await` on an async assertion makes the test pass falsely.
- pytest: a fixture with the wrong scope leaks state between tests.
- xUnit: one class instance per test; constructor runs for each test.
- JUnit 5 and later: `@BeforeAll` needs a static method unless the class uses per-class lifecycle.
- cargo test: tests run in parallel threads by default; shared files collide.
- GoogleTest: `ASSERT_*` stops the test, `EXPECT_*` continues.

## MCP servers and example queries

- `js-official-docs`: "vitest test.each", "vitest expect toThrow".
- `python-official-docs`: "pytest parametrize", "pytest fixture scope".
- `csharp-official-docs`: "xUnit Theory InlineData".
- `java-official-docs`: "JUnit ParameterizedTest", "BeforeAll lifecycle".
- `rust-official-docs`: "cargo test test-threads".
- `cpp-official-docs`: "EXPECT_EQ ASSERT_EQ".
