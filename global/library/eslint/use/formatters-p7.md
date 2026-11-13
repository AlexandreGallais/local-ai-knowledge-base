---
title: "Formatters Reference (part 7 of 7)"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/use/formatters/index.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# Formatters Reference (part 7 of 7)

### json

Outputs JSON-serialized results. The `json` formatter is useful when you want to programmatically work with the CLI's linting results.

Alternatively, you can use the ESLint Node.js API to programmatically use ESLint.

Example output (formatted for easier reading):

```json
[
    {
        "filePath": "/var/lib/jenkins/workspace/eslint Release/eslint/fullOfProblems.js",
        "messages": [
            {
                "ruleId": "no-unused-vars",
                "severity": 2,
                "message": "'addOne' is defined but never used.",
                "line": 1,
                "column": 10,
                "messageId": "unusedVar",
                "endLine": 1,
                "endColumn": 16,
                "suggestions": [
                    {
                        "messageId": "removeVar",
                        "data": {
                            "varName": "addOne"
                        },
                        "fix": {
                            "range": [
                                0,
                                94
                            ],
                            "text": ""
                        },
                        "desc": "Remove unused variable 'addOne'."
                    }
                ]
            },
            {
                "ruleId": "use-isnan",
                "severity": 2,
                "message": "Use the isNaN function to compare with NaN.",
                "line": 2,
                "column": 9,
                "messageId": "comparisonWithNaN",
                "endLine": 2,
                "endColumn": 17,
                "suggestions": [
                    {
                        "messageId": "replaceWithIsNaN",
                        "fix": {
                            "range": [
                                29,
                                37
                            ],
                            "text": "!Number.isNaN(i)"
                        },
                        "desc": "Replace with Number.isNaN."
                    },
                    {
                        "messageId": "replaceWithCastingAndIsNaN",
                        "fix": {
                            "range": [
                                29,
                                37
                            ],
                            "text": "!Number.isNaN(Number(i))"
                        },
                        "desc": "Replace with Number.isNaN and cast to a Number."
                    }
                ]
            },
            {
                "ruleId": "space-unary-ops",
                "severity": 2,
                "message": "Unexpected space before unary operator '++'.",
                "line": 3,
                "column": 16,
                "messageId": "unexpectedBefore",
                "endLine": 3,
                "endColumn": 20,
                "fix": {
                    "range": [
                        57,
                        58
                    ],
                    "text": ""
                }
            },
            {
                "ruleId": "no-useless-assignment",
                "severity": 2,
                "message": "The value assigned to 'i' is not used in subsequent statements.",
                "line": 3,
                "column": 16,
                "messageId": "unnecessaryAssignment",
                "endLine": 3,
                "endColumn": 17
            },
            {
                "ruleId": "semi",
                "severity": 1,
                "message": "Missing semicolon.",
                "line": 3,
                "column": 20,
                "messageId": "missingSemi",
                "endLine": 4,
                "endColumn": 1,
                "fix": {
                    "range": [
                        60,
                        60
                    ],
                    "text": ";"
                }
            },
            {
                "ruleId": "no-else-return",
                "severity": 1,
                "message": "Unnecessary 'else' after 'return'.",
                "line": 4,
                "column": 12,
                "messageId": "unexpected",
                "endLine": 6,
                "endColumn": 6,
                "fix": {
                    "range": [
                        0,
                        94
                    ],
                    "text": "function addOne(i) {\n    if (i != NaN) {\n        return i ++\n    } \n      return\n    \n}"
                }
            },
            {
                "ruleId": "indent",
                "severity": 1,
                "message": "Expected indentation of 8 spaces but found 6.",
                "line": 5,
                "column": 1,
                "messageId": "wrongIndentation",
                "endLine": 5,
                "endColumn": 7,
                "fix": {
                    "range": [
                        74,
                        80
                    ],
                    "text": "        "
                }
            },
            {
                "ruleId": "consistent-return",
                "severity": 2,
                "message": "Function 'addOne' expected a return value.",
                "line": 5,
                "column": 7,
                "messageId": "missingReturnValue",
                "endLine": 5,
                "endColumn": 13
            },
            {
                "ruleId": "semi",
                "severity": 1,
                "message": "Missing semicolon.",
                "line": 5,
                "column": 13,
                "messageId": "missingSemi",
                "endLine": 6,
                "endColumn": 1,
                "fix": {
                    "range": [
                        86,
                        86
                    ],
                    "text": ";"
                }
            }
        ],
        "suppressedMessages": [],
        "errorCount": 5,
        "fatalErrorCount": 0,
        "warningCount": 4,
        "fixableErrorCount": 1,
        "fixableWarningCount": 4,
        "source": "function addOne(i) {\n    if (i != NaN) {\n        return i ++\n    } else {\n      return\n    }\n};",
        "usedDeprecatedRules": [
            {
                "ruleId": "indent",
                "replacedBy": [
                    "@stylistic/indent"
                ],
                "info": {
                    "message": "Formatting rules are being moved out of ESLint core.",
                    "url": "https://eslint.org/blog/2023/10/deprecating-formatting-rules/",
                    "deprecatedSince": "8.53.0",
                    "availableUntil": "11.0.0",
                    "replacedBy": [
                        {
                            "message": "ESLint Stylistic now maintains deprecated stylistic core rules.",
                            "url": "https://eslint.style/guide/migration",
                            "plugin": {
                                "name": "@stylistic/eslint-plugin",
                                "url": "https://eslint.style"
                            },
                            "rule": {
                                "name": "indent",
                                "url": "https://eslint.style/rules/indent"
                            }
                        }
                    ]
                }
            },
            {
                "ruleId": "semi",
                "replacedBy": [
                    "@stylistic/semi"
                ],
                "info": {
                    "message": "Formatting rules are being moved out of ESLint core.",
                    "url": "https://eslint.org/blog/2023/10/deprecating-formatting-rules/",
                    "deprecatedSince": "8.53.0",
                    "availableUntil": "11.0.0",
                    "replacedBy": [
                        {
                            "message": "ESLint Stylistic now maintains deprecated stylistic core rules.",
                            "url": "https://eslint.style/guide/migration",
                            "plugin": {
                                "name": "@stylistic/eslint-plugin",
                                "url": "https://eslint.style"
                            },
                            "rule": {
                                "name": "semi",
                                "url": "https://eslint.style/rules/semi"
                            }
                        }
                    ]
                }
            },
            {
                "ruleId": "space-unary-ops",
                "replacedBy": [
                    "@stylistic/space-unary-ops"
                ],
                "info": {
                    "message": "Formatting rules are being moved out of ESLint core.",
                    "url": "https://eslint.org/blog/2023/10/deprecating-formatting-rules/",
                    "deprecatedSince": "8.53.0",
                    "availableUntil": "11.0.0",
                    "replacedBy": [
                        {
                            "message": "ESLint Stylistic now maintains deprecated stylistic core rules.",
                            "url": "https://eslint.style/guide/migration",
                            "plugin": {
                                "name": "@stylistic/eslint-plugin",
                                "url": "https://eslint.style"
                            },
                            "rule": {
                                "name": "space-unary-ops",
                                "url": "https://eslint.style/rules/space-unary-ops"
                            }
                        }
                    ]
                }
            }
        ]
    }
]
```

### stylish

Human-readable output format. This is the default formatter.

Example output:

```text

/var/lib/jenkins/workspace/eslint Release/eslint/fullOfProblems.js
  1:10  error    'addOne' is defined but never used                              no-unused-vars
  2:9   error    Use the isNaN function to compare with NaN                      use-isnan
  3:16  error    Unexpected space before unary operator '++'                     space-unary-ops
  3:16  error    The value assigned to 'i' is not used in subsequent statements  no-useless-assignment
  3:20  warning  Missing semicolon                                               semi
  4:12  warning  Unnecessary 'else' after 'return'                               no-else-return
  5:1   warning  Expected indentation of 8 spaces but found 6                    indent
  5:7   error    Function 'addOne' expected a return value                       consistent-return
  5:13  warning  Missing semicolon                                               semi

✖ 9 problems (5 errors, 4 warnings)
  1 error and 4 warnings potentially fixable with the `--fix` option.

```
