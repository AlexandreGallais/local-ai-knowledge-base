# Official documentation of C and C++

1. When your memory of C and C++ is not sure, look it up with the `cpp-official-docs` server: `search_docs`, then `read_doc` on one section.
2. It holds cppreference.com (the C and C++ languages and standard libraries), CMake, Clang, Qt 6 (guides, the reference of every class, QML and Qt Quick), GoogleTest, Catch2, {fmt}, nlohmann/json, Eigen, Conan, vcpkg and Meson.
3. Search a type or a function of the standard library by its full name, as `std::unique_ptr`; a CMake command by its name, as `add_executable`; a Qt class or function by its name, as `QWidget` or `QTimer::singleShot`; a test assertion by its name, as `EXPECT_EQ`.
4. Read the C++ standard the project uses (`CMAKE_CXX_STANDARD`, `-std=`) before you use a feature marked "since C++20" or later; read the Qt version it uses (`find_package(Qt6 ...)`) before you use a Qt function marked "since".
5. Read one section at a time. Never read the folder `.agents/mcp/cpp-official-docs/library/` by hand.
