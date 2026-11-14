# std::experimental::nonesuch

| Defined in header `<experimental/type_traits>` |  |
| --- | --- |
| `struct nonesuch { ~nonesuch() = delete; nonesuch(nonesuch const&) = delete; void operator=(nonesuch const&) = delete; };` | (library fundamentals TS v2) |

`std::experimental::nonesuch` is a class type used by `std::experimental::detected_t` to indicate detection failure.

`nonesuch` has no default constructor or initializer-list constructor, and is not an aggregate.

### Notes

`nonesuch` cannot be constructed, destroyed, or copied.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2960 | LFTSv2 | `nonesuch` may be an aggregate and has an implicit conversion sequence from `{}` | made non-aggregate and removed ICS |
