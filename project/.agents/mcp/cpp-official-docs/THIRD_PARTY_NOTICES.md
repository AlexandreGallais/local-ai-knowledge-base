# Third-party notices

The code of this brick (its `.ts` and `.py` files) is under the MIT License of the base. The folder `library/` holds
official documentation of other projects, each under its own license, listed below, with the commit
it was taken at. The license files of each source, copied unchanged at its commit with their
copyright notices, are in `licenses/<tool>/`.

## cppreference

- Work: cppreference.com: the C and C++ languages and standard libraries, offline HTML book converted to Markdown
- Authors: The cppreference.com contributors
- Copyright: `COPYRIGHT AND/OR OTHER APPLICABLE LAW. ANY USE OF THE WORK OTHER THAN AS`
- Copyright: `Copyright (c)  YEAR  YOUR NAME.`
- Source: <https://github.com/PeterFeicht/cppreference-doc/releases/tag/v20250209>, v20250209, commit 744e05d554d42a5a58422b4d209d76552eb2d6ff
- License: CC-BY-SA-3.0 OR GFDL-1.3-or-later
- License text: [licenses/cppreference/LICENSE-CC-BY-SA-3.0](licenses/cppreference/LICENSE-CC-BY-SA-3.0), [licenses/cppreference/LICENSE-GFDL-1.3](licenses/cppreference/LICENSE-GFDL-1.3)
- Changes: each HTML page is converted to Markdown; its text, headings, lists, tables and code are kept, the site navigation, scripts, styles and links (their text kept) are left out.

## cmake

- Work: CMake documentation: commands, variables, properties, modules, the cmake tool
- Authors: Kitware, Inc. and the CMake contributors
- Copyright: `Copyright 2000-2026 Kitware, Inc. and `Contributors <CONTRIBUTORS.rst>`_`
- Source: <https://github.com/Kitware/CMake>, v4.5.0, commit f3a3cb0c6542ee497d8e9ec85f3603acb64736ca
- License: BSD-3-Clause, <https://opensource.org/license/bsd-3-clause>
- License text: [licenses/cmake/LICENSE.rst](licenses/cmake/LICENSE.rst)
- Changes: none; the files are copied as they are in the source, at the commit above.

## clang

- Work: Clang documentation: the user manual, diagnostics, sanitizers, language extensions, clang-tidy is apart
- Authors: The LLVM Project contributors
- Copyright: `Copyright (c) 2007-2019 University of Illinois at Urbana-Champaign.`
- Copyright: `Copyright (c) 2003-2019 University of Illinois at Urbana-Champaign.`
- Source: <https://github.com/llvm/llvm-project>, llvmorg-23.1.5, commit 392dfff97d29b59d77e5cac6d4b6ef2585fe7117
- License: Apache-2.0 WITH LLVM-exception
- License text: [licenses/clang/LICENSE](licenses/clang/LICENSE), [licenses/clang/LICENSE.TXT](licenses/clang/LICENSE.TXT)
- Changes: none; the files are copied as they are in the source, at the commit above.

## qt-guides

- Work: Qt 6 (Qt Base): the guides and overviews of each module, written in qdoc (signals and slots, the object model, containers, threads, events, painting, model/view, layouts, style sheets, network, SQL, Qt Test)
- Authors: The Qt Company Ltd. and other contributors
- Copyright: `Copyright (c)  YEAR  YOUR NAME.`
- Source: <https://github.com/qt/qtbase>, v6.12.0, commit 025bdad181de241e81bf853c8a2d7bf3d19261a9
- License: GFDL-1.3-no-invariants-only
- License text: [licenses/qt-guides/LICENSE-GFDL-1.3-no-invariants-only.txt](licenses/qt-guides/LICENSE-GFDL-1.3-no-invariants-only.txt)
- Changes: none; the files are copied as they are in the source, at the commit above.

## qt-api

- Work: Qt 6 (Qt Base): the reference of every class and function of Qt Core, Qt GUI, Qt Widgets, Qt Network, Qt Concurrent, Qt Test, Qt SQL, Qt XML, Qt D-Bus, Qt Print Support and Qt OpenGL, taken from the qdoc comments of the code
- Authors: The Qt Company Ltd. and other contributors
- Copyright: as stated in the license text, by The Qt Company Ltd. and other contributors
- Source: <https://github.com/qt/qtbase>, v6.12.0, commit 025bdad181de241e81bf853c8a2d7bf3d19261a9
- License: LGPL-3.0-only OR GPL-2.0-only OR GPL-3.0-only
- License text: [licenses/qt-api/LICENSE-GPL-2.0-only.txt](licenses/qt-api/LICENSE-GPL-2.0-only.txt), [licenses/qt-api/LICENSE-GPL-3.0-only.txt](licenses/qt-api/LICENSE-GPL-3.0-only.txt), [licenses/qt-api/LICENSE-LGPL-3.0-only.txt](licenses/qt-api/LICENSE-LGPL-3.0-only.txt)
- Changes: the documentation comments are taken from the source files, unchanged, with the declarations they document; the code itself is left out.

## qt-quick-guides

- Work: Qt 6 (Qt Declarative): the guides of QML and Qt Quick, written in qdoc (the QML language, property bindings, signals, JavaScript in QML, C++ integration, Qt Quick items, positioners, animations, states, models and views)
- Authors: The Qt Company Ltd. and other contributors
- Copyright: `Copyright (c)  YEAR  YOUR NAME.`
- Source: <https://github.com/qt/qtdeclarative>, v6.12.0, commit 4332fbbb4c340463dc8cee36dda0c85d932122d8
- License: GFDL-1.3-no-invariants-only
- License text: [licenses/qt-quick-guides/LICENSE-GFDL-1.3-no-invariants-only.txt](licenses/qt-quick-guides/LICENSE-GFDL-1.3-no-invariants-only.txt)
- Changes: none; the files are copied as they are in the source, at the commit above.

## qt-quick-api

- Work: Qt 6 (Qt Declarative): the reference of the QML types and C++ classes of Qt QML, Qt Quick and Qt Quick Controls, taken from the qdoc comments of the code
- Authors: The Qt Company Ltd. and other contributors
- Copyright: as stated in the license text, by The Qt Company Ltd. and other contributors
- Source: <https://github.com/qt/qtdeclarative>, v6.12.0, commit 4332fbbb4c340463dc8cee36dda0c85d932122d8
- License: LGPL-3.0-only OR GPL-2.0-only OR GPL-3.0-only
- License text: [licenses/qt-quick-api/LICENSE-GPL-2.0-only.txt](licenses/qt-quick-api/LICENSE-GPL-2.0-only.txt), [licenses/qt-quick-api/LICENSE-GPL-3.0-only.txt](licenses/qt-quick-api/LICENSE-GPL-3.0-only.txt), [licenses/qt-quick-api/LICENSE-LGPL-3.0-only.txt](licenses/qt-quick-api/LICENSE-LGPL-3.0-only.txt)
- Changes: the documentation comments are taken from the source files, unchanged, with the declarations they document; the code itself is left out.

## googletest

- Work: GoogleTest and GoogleMock: the primer, the assertions (EXPECT_EQ, ASSERT_THAT...), test fixtures, parameterized tests, matchers and mocks
- Authors: Google Inc.
- Copyright: `Copyright 2008, Google Inc.`
- Source: <https://github.com/google/googletest>, v1.18.0, commit 063de7e9578f82b369302001269680b4b1553359
- License: BSD-3-Clause, <https://opensource.org/license/bsd-3-clause>
- License text: [licenses/googletest/LICENSE](licenses/googletest/LICENSE)
- Changes: none; the files are copied as they are in the source, at the commit above.

## catch2

- Work: Catch2: test cases, sections, assertions, matchers, generators, benchmarks and its command line
- Authors: The Catch2 authors
- Copyright: as stated in the license text, by The Catch2 authors
- Source: <https://github.com/catchorg/Catch2>, v3.16.1, commit 08092139210881f01a34e60c5f2fd6afa0ea4024
- License: BSL-1.0
- License text: [licenses/catch2/LICENSE.txt](licenses/catch2/LICENSE.txt)
- Changes: none; the files are copied as they are in the source, at the commit above.

## fmt

- Work: {fmt}: the format string syntax, the API (fmt::format, fmt::print) and std::format compatibility
- Authors: Victor Zverovich and the {fmt} contributors
- Copyright: `Copyright (c) 2012 - present, Victor Zverovich and {fmt} contributors`
- Source: <https://github.com/fmtlib/fmt>, 12.2.1, commit 208219daff58f2a7438f6931cc2ddc358acf33ef
- License: MIT, <https://opensource.org/license/mit>
- License text: [licenses/fmt/LICENSE](licenses/fmt/LICENSE)
- Changes: none; the files are copied as they are in the source, at the commit above.

## nlohmann-json

- Work: JSON for Modern C++ (nlohmann/json): the API of basic_json, parsing, serialization, arbitrary type conversions, JSON Pointer and Patch, binary formats
- Authors: Niels Lohmann
- Copyright: `Copyright (c) 2013-2025 Niels Lohmann`
- Source: <https://github.com/nlohmann/json>, v3.12.0, commit 55f93686c01528224f448c19128836e7df245f72
- License: MIT, <https://opensource.org/license/mit>
- License text: [licenses/nlohmann-json/LICENSE.MIT](licenses/nlohmann-json/LICENSE.MIT)
- Changes: none; the files are copied as they are in the source, at the commit above.

## conan

- Work: Conan 2: the C and C++ package manager (conanfile.py and conanfile.txt, profiles, generators for CMake, the commands, creating and uploading packages, CI)
- Authors: JFrog Ltd. and the Conan documentation contributors
- Copyright: `Copyright (c) 2019 JFrog Ltd.`
- Source: <https://github.com/conan-io/docs>, master, commit 7091aea3ecf242713f36a3c2754b7d169b098358
- License: MIT, <https://opensource.org/license/mit>
- License text: [licenses/conan/LICENSE](licenses/conan/LICENSE)
- Changes: none; the files are copied as they are in the source, at the commit above.

## vcpkg

- Work: vcpkg: the C and C++ package manager of Microsoft (manifest mode, triplets for Windows, Linux and cross-compiling, CMake integration, binary caching, registries)
- Authors: Microsoft Corporation and the vcpkg-docs contributors
- Copyright: `Copyright (c) Microsoft Corporation.`
- Copyright: `Copyright (c) Microsoft Corporation`
- Source: <https://github.com/MicrosoftDocs/vcpkg-docs>, main, commit eda2ef268351fb5e18ebc5defa16ecfbffaa651f
- License: MIT, <https://opensource.org/license/mit>
- License text: [licenses/vcpkg/LICENSE](licenses/vcpkg/LICENSE), [licenses/vcpkg/LICENSE-CODE](licenses/vcpkg/LICENSE-CODE)
- Changes: none; the files are copied as they are in the source, at the commit above.

## meson

- Work: Meson: the build system (meson.build syntax, reference of every function, dependencies, cross-compilation files, subprojects)
- Authors: The Meson development team
- Copyright: as stated in the license text, by The Meson development team
- Source: <https://github.com/mesonbuild/meson>, 1.12.1, commit 70598bb7825f0f804fb31ec2795de5e79e7692a0
- License: Apache-2.0, <https://www.apache.org/licenses/LICENSE-2.0>
- License text: [licenses/meson/COPYING](licenses/meson/COPYING)
- Changes: none; the files are copied as they are in the source, at the commit above.

## eigen

- Work: Eigen: linear algebra in C++ (matrices and vectors, arithmetic, block operations, decompositions and linear solvers, geometry and rotations, sparse matrices)
- Authors: The Eigen contributors
- Copyright: `Copyright (c) 2011, Intel Corporation. All rights reserved.`
- Source: <https://gitlab.com/libeigen/eigen>, 5.0.1, commit bc3b39870ecb690a623a3f49149a358b95c5781d
- License: MPL-2.0
- License text: [licenses/eigen/COPYING.APACHE](licenses/eigen/COPYING.APACHE), [licenses/eigen/COPYING.BSD](licenses/eigen/COPYING.BSD), [licenses/eigen/COPYING.MINPACK](licenses/eigen/COPYING.MINPACK), [licenses/eigen/COPYING.MPL2](licenses/eigen/COPYING.MPL2), [licenses/eigen/COPYING.README](licenses/eigen/COPYING.README), [licenses/eigen/LICENSE](licenses/eigen/LICENSE)
- Changes: none; the files are copied as they are in the source, at the commit above.
