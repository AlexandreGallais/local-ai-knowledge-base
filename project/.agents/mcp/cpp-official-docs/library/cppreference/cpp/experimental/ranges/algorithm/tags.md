# std::experimental::ranges::tag::in, in1, in2, out, out1, out2, fun, min, max, begin, end

| Defined in header `<experimental/ranges/algorithm>` |  |
| --- | --- |
| `struct in { /* implementation-defined */ }; struct in1 { /* implementation-defined */ }; struct in2 { /* implementation-defined */ }; struct out { /* implementation-defined */ }; struct out1 { /* implementation-defined */ }; struct out2 { /* implementation-defined */ }; struct fun { /* implementation-defined */ }; struct min { /* implementation-defined */ }; struct max { /* implementation-defined */ }; struct begin { /* implementation-defined */ }; struct end { /* implementation-defined */ };` | (ranges TS) |

These classes are `TagSpecifier`s for use with `ranges::tagged`.

The name of a specifier is also the element name it corresponds to. For instance, `ranges::tagged<std::pair<int, int>, tag::min, tag::max>` provides a set of named accessors named `min` and a set of named accessors named `max`.
