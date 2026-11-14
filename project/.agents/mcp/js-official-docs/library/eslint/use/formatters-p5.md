---
title: "Formatters Reference (part 5 of 7)"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/use/formatters/index.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# Formatters Reference (part 5 of 7)

```json
                },
                "schema": [
                    {
                        "type": "object",
                        "properties": {
                            "enforceForSwitchCase": {
                                "type": "boolean"
                            },
                            "enforceForIndexOf": {
                                "type": "boolean"
                            }
                        },
                        "additionalProperties": false
                    }
                ],
                "defaultOptions": [
                    {
                        "enforceForIndexOf": false,
                        "enforceForSwitchCase": true
                    }
                ],
                "messages": {
                    "comparisonWithNaN": "Use the isNaN function to compare with NaN.",
                    "switchNaN": "'switch(NaN)' can never match a case clause. Use Number.isNaN instead of the switch.",
                    "caseNaN": "'case NaN' can never match. Use Number.isNaN before the switch.",
                    "indexOfNaN": "Array prototype method '{{ methodName }}' cannot find NaN.",
                    "replaceWithIsNaN": "Replace with Number.isNaN.",
                    "replaceWithCastingAndIsNaN": "Replace with Number.isNaN and cast to a Number.",
                    "replaceWithFindIndex": "Replace with Array.prototype.{{ methodName }}."
                }
            },
            "space-unary-ops": {
                "deprecated": {
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
                },
                "type": "layout",
                "docs": {
                    "description": "Enforce consistent spacing before or after unary operators",
                    "recommended": false,
                    "url": "https://eslint.org/docs/latest/rules/space-unary-ops"
                },
                "fixable": "whitespace",
                "schema": [
                    {
                        "type": "object",
                        "properties": {
                            "words": {
                                "type": "boolean",
                                "default": true
                            },
                            "nonwords": {
                                "type": "boolean",
                                "default": false
                            },
                            "overrides": {
                                "type": "object",
                                "additionalProperties": {
                                    "type": "boolean"
                                }
                            }
                        },
                        "additionalProperties": false
                    }
                ],
                "messages": {
                    "unexpectedBefore": "Unexpected space before unary operator '{{operator}}'.",
                    "unexpectedAfter": "Unexpected space after unary operator '{{operator}}'.",
                    "unexpectedAfterWord": "Unexpected space after unary word operator '{{word}}'.",
                    "wordOperator": "Unary word operator '{{word}}' must be followed by whitespace.",
                    "operator": "Unary operator '{{operator}}' must be followed by whitespace.",
                    "beforeUnaryExpressions": "<example-value>"
                }
            },
            "no-useless-assignment": {
                "type": "problem",
                "docs": {
                    "description": "Disallow variable assignments when the value is not used",
                    "recommended": true,
                    "url": "https://eslint.org/docs/latest/rules/no-useless-assignment"
                },
                "schema": [],
                "messages": {
                    "unnecessaryAssignment": "The value assigned to '{{name}}' is not used in subsequent statements."
                }
            },
            "semi": {
                "deprecated": {
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
                },
                "type": "layout",
                "docs": {
                    "description": "Require or disallow semicolons instead of ASI",
                    "recommended": false,
                    "url": "https://eslint.org/docs/latest/rules/semi"
                },
                "fixable": "code",
                "schema": {
                    "anyOf": [
                        {
                            "type": "array",
                            "items": [
                                {
                                    "enum": [
                                        "never"
                                    ]
                                },
                                {
                                    "type": "object",
                                    "properties": {
                                        "beforeStatementContinuationChars": {
                                            "enum": [
                                                "always",
                                                "any",
                                                "never"
                                            ]
                                        }
                                    },
                                    "additionalProperties": false
                                }
                            ],
                            "minItems": 0,
                            "maxItems": 2
                        },
                        {
                            "type": "array",
                            "items": [
                                {
                                    "enum": [
                                        "always"
                                    ]
                                },
                                {
                                    "type": "object",
                                    "properties": {
                                        "omitLastInOneLineBlock": {
                                            "type": "boolean"
                                        },
                                        "omitLastInOneLineClassBody": {
                                            "type": "boolean"
                                        }
                                    },
                                    "additionalProperties": false
                                }
                            ],
                            "minItems": 0,
                            "maxItems": 2
                        }
                    ]
                },
                "messages": {
                    "missingSemi": "Missing semicolon.",
                    "extraSemi": "Extra semicolon."
                }
            },
            "no-else-return": {
                "type": "suggestion",
                "defaultOptions": [
                    {
                        "allowElseIf": true
                    }
                ],
                "docs": {
                    "description": "Disallow `else` blocks after `return` statements in `if` statements",
                    "recommended": false,
                    "frozen": true,
                    "url": "https://eslint.org/docs/latest/rules/no-else-return"
                },
                "schema": [
                    {
                        "type": "object",
                        "properties": {
                            "allowElseIf": {
                                "type": "boolean"
                            }
                        },
                        "additionalProperties": false
                    }
                ],
                "fixable": "code",
                "messages": {
                    "unexpected": "Unnecessary 'else' after 'return'."
                }
            },
            "indent": {
                "deprecated": {
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
                },
                "type": "layout",
                "docs": {
                    "description": "Enforce consistent indentation",
                    "recommended": false,
                    "url": "https://eslint.org/docs/latest/rules/indent"
                },
                "fixable": "whitespace",
                "schema": [
                    {
                        "oneOf": [
                            {
                                "enum": [
                                    "tab"
                                ]
                            },
                            {
                                "type": "integer",
                                "minimum": 0
                            }
                        ]
                    },
                    {
                        "type": "object",
                        "properties": {
                            "SwitchCase": {
                                "type": "integer",
                                "minimum": 0,
                                "default": 0
                            },
                            "VariableDeclarator": {
                                "oneOf": [
                                    {
                                        "oneOf": [
                                            {
                                                "type": "integer",
                                                "minimum": 0
                                            },
                                            {
                                                "enum": [
                                                    "first",
                                                    "off"
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "object",
                                        "properties": {
                                            "var": {
                                                "oneOf": [
                                                    {
                                                        "type": "integer",
                                                        "minimum": 0
                                                    },
                                                    {
                                                        "enum": [
                                                            "first",
                                                            "off"
                                                        ]
                                                    }
                                                ]
                                            },
                                            "let": {
                                                "oneOf": [
                                                    {
                                                        "type": "integer",
                                                        "minimum": 0
                                                    },
                                                    {
                                                        "enum": [
                                                            "first",
                                                            "off"
                                                        ]
                                                    }
                                                ]
                                            },
                                            "const": {
                                                "oneOf": [
                                                    {
                                                        "type": "integer",
                                                        "minimum": 0
                                                    },
                                                    {
```
