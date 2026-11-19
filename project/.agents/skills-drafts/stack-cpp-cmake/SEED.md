# SEED: stack-cpp-cmake  (STK-01, 4 stars, V2)

## Final frontmatter (do not change)

```yaml
name: stack-cpp-cmake
description: "Builds, tests and debugs C and C++ projects with CMake and Ninja - compilers, warnings, sanitizers, gdb, Conan or vcpkg through the internal mirror. Use when working in a project with CMakeLists.txt, configuring or building C or C++ code, fixing compiler or linker errors, or running ctest."
metadata:
  id: STK-01
  stars: "4"
  nature: reference
  mode: D
  wave: V2
  load: auto
```

## Family template

`.agents/skills/_templates/stack-playbook.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Installed gcc, clang, cmake, ninja, ctest, gdb versions.
- [ ] Configure, build and test commands (cmake -S . -B build -G Ninja, cmake --build build, ctest --test-dir build --output-on-failure).
- [ ] Build types and warning flags used by the project (-Wall -Wextra -Werror).
- [ ] Sanitizer builds (ASan, UBSan) and how to run them.
- [ ] Dependencies with Conan or vcpkg through the internal mirror.
- [ ] Debugging with gdb on a test binary.

## Known pitfalls to confirm or drop

- In-source builds pollute the repository; always use a build folder.
- Changing compilers needs a fresh build folder.
- target_link_libraries order and PUBLIC or PRIVATE visibility.

## MCP servers and example queries

- cpp-official-docs: cmake --build, ctest --output-on-failure, -fsanitize=address, conan install
