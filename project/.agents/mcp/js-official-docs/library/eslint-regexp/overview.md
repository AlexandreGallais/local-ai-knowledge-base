---
title: "Available Rules (part 1 of 2)"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/index.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# Available Rules

💼 Configurations enabled in.\
⚠️ Configurations set to warn in.\
🟢 Set in the `flat/recommended` configuration.\
🔵 Set in the `recommended` configuration.\
🔧 Automatically fixable by the `--fix` CLI option.\
💡 Manually fixable by editor suggestions.

## Possible Errors

| Name                                                                            | Description                                                                             | 💼    | ⚠️    | 🔧 | 💡 |
| :------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------- | :---- | :---- | :- | :- |
| no-contradiction-with-assertion           | disallow elements that contradict assertions                                            | 🟢 🔵 |       |    | 💡 |
| no-control-character                                 | disallow control characters                                                             |       |       |    | 💡 |
| no-dupe-disjunctions                                 | disallow duplicate disjunctions                                                         | 🟢 🔵 |       |    | 💡 |
| no-empty-alternative                                 | disallow alternatives without elements                                                  |       | 🟢 🔵 |    | 💡 |
| no-empty-capturing-group                         | disallow capturing group that captures empty.                                           | 🟢 🔵 |       |    |    |
| no-empty-character-class                         | disallow character classes that match no characters                                     | 🟢 🔵 |       |    |    |
| no-empty-group                                             | disallow empty group                                                                    | 🟢 🔵 |       |    |    |
| no-empty-lookarounds-assertion             | disallow empty lookahead assertion or empty lookbehind assertion                        | 🟢 🔵 |       |    |    |
| no-escape-backspace                                   | disallow escape backspace (`[\b]`)                                                      | 🟢 🔵 |       |    | 💡 |
| no-invalid-regexp                                       | disallow invalid regular expression strings in `RegExp` constructors                    | 🟢 🔵 |       |    |    |
| no-lazy-ends                                                 | disallow lazy quantifiers at the end of an expression                                   |       | 🟢 🔵 |    | 💡 |
| no-misleading-capturing-group               | disallow capturing groups that do not behave as one would expect                        | 🟢 🔵 |       |    | 💡 |
| no-misleading-unicode-character           | disallow multi-code-point characters in character classes and quantifiers               | 🟢 🔵 |       | 🔧 | 💡 |
| no-missing-g-flag                                       | disallow missing `g` flag in patterns used in `String#matchAll` and `String#replaceAll` | 🟢 🔵 |       | 🔧 |    |
| no-optional-assertion                               | disallow optional assertions                                                            | 🟢 🔵 |       |    |    |
| no-potentially-useless-backreference | disallow backreferences that reference a group that might not be matched                |       | 🟢 🔵 |    |    |
| no-super-linear-backtracking                 | disallow exponential and polynomial backtracking                                        | 🟢 🔵 |       | 🔧 |    |
| no-super-linear-move                                 | disallow quantifiers that cause quadratic moves                                         |       |       |    |    |
| no-useless-assertions                               | disallow assertions that are known to always accept (or reject)                         | 🟢 🔵 |       |    | 💡 |
| no-useless-backreference                         | disallow useless backreferences in regular expressions                                  | 🟢 🔵 |       |    |    |
| no-useless-dollar-replacements             | disallow useless `$` replacements in replacement string                                 | 🟢 🔵 |       |    |    |
| strict                                                             | disallow not strictly valid regular expressions                                         | 🟢 🔵 |       | 🔧 | 💡 |

## Best Practices

| Name                                                                              | Description                                                                                | 💼    | ⚠️    | 🔧 | 💡 |
| :-------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------- | :---- | :---- | :- | :- |
| confusing-quantifier                                   | disallow confusing quantifiers                                                             |       | 🟢 🔵 |    |    |
| control-character-escape                           | enforce consistent escaping of control characters                                          | 🟢 🔵 |       | 🔧 |    |
| negation                                                           | enforce use of escapes on negation                                                         | 🟢 🔵 |       | 🔧 |    |
| no-dupe-characters-character-class       | disallow duplicate characters in the RegExp character class                                | 🟢 🔵 |       | 🔧 |    |
| no-empty-string-literal                             | disallow empty string literals in character classes                                        | 🟢 🔵 |       |    |    |
| no-extra-lookaround-assertions               | disallow unnecessary nested lookaround assertions                                          | 🟢 🔵 |       | 🔧 |    |
| no-invisible-character                               | disallow invisible raw character                                                           | 🟢 🔵 |       | 🔧 |    |
| no-legacy-features                                       | disallow legacy RegExp features                                                            | 🟢 🔵 |       |    |    |
| no-non-standard-flag                                   | disallow non-standard flags                                                                | 🟢 🔵 |       |    |    |
| no-obscure-range                                           | disallow obscure character ranges                                                          | 🟢 🔵 |       |    |    |
| no-octal                                                           | disallow octal escape sequence                                                             |       |       |    | 💡 |
| no-standalone-backslash                             | disallow standalone backslashes (`\`)                                                      |       |       |    |    |
| no-trivially-nested-assertion                 | disallow trivially nested assertions                                                       | 🟢 🔵 |       | 🔧 |    |
| no-trivially-nested-quantifier               | disallow nested quantifiers that can be rewritten as one quantifier                        | 🟢 🔵 |       | 🔧 |    |
| no-unused-capturing-group                         | disallow unused capturing group                                                            | 🟢 🔵 |       | 🔧 | 💡 |
| no-useless-character-class                       | disallow character class with one character                                                | 🟢 🔵 |       | 🔧 |    |
| no-useless-flag                                             | disallow unnecessary regex flags                                                           |       | 🟢 🔵 | 🔧 |    |
| no-useless-lazy                                             | disallow unnecessarily non-greedy quantifiers                                              | 🟢 🔵 |       | 🔧 |    |
| no-useless-quantifier                                 | disallow quantifiers that can be removed                                                   | 🟢 🔵 |       | 🔧 | 💡 |
| no-useless-range                                           | disallow unnecessary character ranges                                                      | 🟢 🔵 |       | 🔧 |    |
| no-useless-set-operand                               | disallow unnecessary elements in expression character classes                              | 🟢 🔵 |       | 🔧 |    |
| no-useless-string-literal                         | disallow string disjunction of single characters in `\q{...}`                              | 🟢 🔵 |       | 🔧 |    |
| no-useless-two-nums-quantifier               | disallow unnecessary `{n,m}` quantifier                                                    | 🟢 🔵 |       | 🔧 |    |
| no-zero-quantifier                                       | disallow quantifiers with a maximum of zero                                                | 🟢 🔵 |       |    | 💡 |
| optimal-lookaround-quantifier                 | disallow the alternatives of lookarounds that end with a non-constant quantifier           |       | 🟢 🔵 |    | 💡 |
| optimal-quantifier-concatenation           | require optimal quantifiers for concatenated quantifiers                                   | 🟢 🔵 |       | 🔧 |    |
| prefer-escape-replacement-dollar-char | enforces escape of replacement `$` character (`$$`).                                       |       |       |    |    |
| prefer-predefined-assertion                     | prefer predefined assertion over equivalent lookarounds                                    | 🟢 🔵 |       | 🔧 |    |
| prefer-quantifier                                         | enforce using quantifier                                                                   |       |       | 🔧 |    |
| prefer-range                                                   | enforce using character class range                                                        | 🟢 🔵 |       | 🔧 |    |
| prefer-regexp-exec                                       | enforce that `RegExp#exec` is used instead of `String#match` if no global flag is provided |       |       |    |    |
| prefer-regexp-test                                       | enforce that `RegExp#test` is used instead of `String#match` and `RegExp#exec`             |       |       | 🔧 |    |
| prefer-set-operation                                   | prefer character class set operations instead of lookarounds                               | 🟢 🔵 |       | 🔧 |    |
| require-unicode-regexp                               | enforce the use of the `u` flag                                                            |       |       | 🔧 |    |
| require-unicode-sets-regexp                     | enforce the use of the `v` flag                                                            |       |       | 🔧 |    |
| simplify-set-operations                             | require simplify set operations                                                            | 🟢 🔵 |       | 🔧 |    |
| sort-alternatives                                         | sort alternatives if order doesn't matter                                                  |       |       | 🔧 |    |
| use-ignore-case                                             | use the `i` flag if it simplifies the pattern                                              | 🟢 🔵 |       | 🔧 |    |
