---
title: "Formatters Reference (part 4 of 7)"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/use/formatters/index.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# Formatters Reference (part 4 of 7)

```json
{
    "results": [
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
    ],
    "metadata": {
        "cwd": "/var/lib/jenkins/workspace/eslint Release/eslint",
        "rulesMeta": {
            "no-unused-vars": {
                "type": "problem",
                "docs": {
                    "description": "Disallow unused variables",
                    "recommended": true,
                    "url": "https://eslint.org/docs/latest/rules/no-unused-vars"
                },
                "hasSuggestions": true,
                "schema": [
                    {
                        "oneOf": [
                            {
                                "enum": [
                                    "all",
                                    "local"
                                ]
                            },
                            {
                                "type": "object",
                                "properties": {
                                    "vars": {
                                        "enum": [
                                            "all",
                                            "local"
                                        ]
                                    },
                                    "varsIgnorePattern": {
                                        "type": "string"
                                    },
                                    "args": {
                                        "enum": [
                                            "all",
                                            "after-used",
                                            "none"
                                        ]
                                    },
                                    "ignoreRestSiblings": {
                                        "type": "boolean"
                                    },
                                    "argsIgnorePattern": {
                                        "type": "string"
                                    },
                                    "caughtErrors": {
                                        "enum": [
                                            "all",
                                            "none"
                                        ]
                                    },
                                    "caughtErrorsIgnorePattern": {
                                        "type": "string"
                                    },
                                    "destructuredArrayIgnorePattern": {
                                        "type": "string"
                                    },
                                    "ignoreClassWithStaticInitBlock": {
                                        "type": "boolean"
                                    },
                                    "ignoreUsingDeclarations": {
                                        "type": "boolean"
                                    },
                                    "reportUsedIgnorePattern": {
                                        "type": "boolean"
                                    }
                                },
                                "additionalProperties": false
                            }
                        ]
                    }
                ],
                "defaultOptions": [
                    {
                        "vars": "all",
                        "args": "after-used",
                        "ignoreRestSiblings": false,
                        "caughtErrors": "all",
                        "ignoreClassWithStaticInitBlock": false,
                        "ignoreUsingDeclarations": false,
                        "reportUsedIgnorePattern": false
                    }
                ],
                "messages": {
                    "unusedVar": "'{{varName}}' is {{action}} but never used{{additional}}.",
                    "usedIgnoredVar": "'{{varName}}' is marked as ignored but is used{{additional}}.",
                    "removeVar": "Remove unused variable '{{varName}}'."
                }
            },
            "use-isnan": {
                "hasSuggestions": true,
                "type": "problem",
                "docs": {
                    "description": "Require calls to `isNaN()` when checking for `NaN`",
                    "recommended": true,
                    "url": "https://eslint.org/docs/latest/rules/use-isnan"
```
