---
title: "Available Rules (part 2 of 2)"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/index.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# Available Rules (part 2 of 2)

## Stylistic Issues

| Name                                                                    | Description                                                            | 💼    | ⚠️ | 🔧 | 💡 |
| :---------------------------------------------------------------------- | :--------------------------------------------------------------------- | :---- | :- | :- | :- |
| grapheme-string-literal                   | enforce single grapheme in string literal                              |       |    |    |    |
| hexadecimal-escape                             | enforce consistent usage of hexadecimal escape                         |       |    | 🔧 |    |
| letter-case                                           | enforce into your favorite case                                        |       |    | 🔧 |    |
| match-any                                               | enforce match any character style                                      | 🟢 🔵 |    | 🔧 |    |
| no-useless-escape                               | disallow unnecessary escape characters in RegExp                       | 🟢 🔵 |    | 🔧 |    |
| no-useless-non-capturing-group     | disallow unnecessary non-capturing group                               | 🟢 🔵 |    | 🔧 |    |
| prefer-character-class                     | enforce using character class                                          | 🟢 🔵 |    | 🔧 |    |
| prefer-d                                                 | enforce using `\d`                                                     | 🟢 🔵 |    | 🔧 |    |
| prefer-lookaround                               | prefer lookarounds over capturing group that do not replace            |       |    | 🔧 |    |
| prefer-named-backreference             | enforce using named backreferences                                     |       |    | 🔧 |    |
| prefer-named-capture-group             | enforce using named capture groups                                     |       |    |    |    |
| prefer-named-replacement                 | enforce using named replacement                                        |       |    | 🔧 |    |
| prefer-plus-quantifier                     | enforce using `+` quantifier                                           | 🟢 🔵 |    | 🔧 |    |
| prefer-question-quantifier             | enforce using `?` quantifier                                           | 🟢 🔵 |    | 🔧 |    |
| prefer-result-array-groups             | enforce using result array `groups`                                    |       |    | 🔧 |    |
| prefer-star-quantifier                     | enforce using `*` quantifier                                           | 🟢 🔵 |    | 🔧 |    |
| prefer-unicode-codepoint-escapes | enforce use of unicode codepoint escapes                               | 🟢 🔵 |    | 🔧 |    |
| prefer-w                                                 | enforce using `\w`                                                     | 🟢 🔵 |    | 🔧 |    |
| sort-character-class-elements       | enforces elements order in character class                             |       |    | 🔧 |    |
| sort-flags                                             | require regex flags to be sorted                                       | 🟢 🔵 |    | 🔧 |    |
| unicode-escape                                     | enforce consistent usage of unicode escape or unicode codepoint escape |       |    | 🔧 |    |
| unicode-property                                 | enforce consistent naming of unicode properties                        |       |    | 🔧 |    |

## Removed

- :no_entry: These rules have been removed in a previous major release, after they have been deprecated for a while.

| Rule ID | Replaced by | Removed in version |
|:--------|:------------|:-------------------|
| no-assertion-capturing-group | regexp/no-empty-capturing-group | v2.0.0 |
| no-useless-exactly-quantifier | regexp/no-useless-quantifier, regexp/no-zero-quantifier | v2.0.0 |
| no-useless-non-greedy | regexp/no-useless-lazy | v2.0.0 |
| order-in-character-class | regexp/sort-character-class-elements | v2.0.0 |
| prefer-t | regexp/control-character-escape | v2.0.0 |
