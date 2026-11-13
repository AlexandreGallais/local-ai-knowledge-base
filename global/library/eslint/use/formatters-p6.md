---
title: "Formatters Reference (part 6 of 7)"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/use/formatters/index.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# Formatters Reference (part 6 of 7)

```json
                                                        "enum": [
                                                            "first",
                                                            "off"
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        "additionalProperties": false
                                    }
                                ]
                            },
                            "outerIIFEBody": {
                                "oneOf": [
                                    {
                                        "type": "integer",
                                        "minimum": 0
                                    },
                                    {
                                        "enum": [
                                            "off"
                                        ]
                                    }
                                ]
                            },
                            "MemberExpression": {
                                "oneOf": [
                                    {
                                        "type": "integer",
                                        "minimum": 0
                                    },
                                    {
                                        "enum": [
                                            "off"
                                        ]
                                    }
                                ]
                            },
                            "FunctionDeclaration": {
                                "type": "object",
                                "properties": {
                                    "parameters": {
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
                                    "body": {
                                        "type": "integer",
                                        "minimum": 0
                                    }
                                },
                                "additionalProperties": false
                            },
                            "FunctionExpression": {
                                "type": "object",
                                "properties": {
                                    "parameters": {
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
                                    "body": {
                                        "type": "integer",
                                        "minimum": 0
                                    }
                                },
                                "additionalProperties": false
                            },
                            "StaticBlock": {
                                "type": "object",
                                "properties": {
                                    "body": {
                                        "type": "integer",
                                        "minimum": 0
                                    }
                                },
                                "additionalProperties": false
                            },
                            "CallExpression": {
                                "type": "object",
                                "properties": {
                                    "arguments": {
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
                                    }
                                },
                                "additionalProperties": false
                            },
                            "ArrayExpression": {
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
                            "ObjectExpression": {
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
                            "ImportDeclaration": {
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
                            "flatTernaryExpressions": {
                                "type": "boolean",
                                "default": false
                            },
                            "offsetTernaryExpressions": {
                                "type": "boolean",
                                "default": false
                            },
                            "ignoredNodes": {
                                "type": "array",
                                "items": {
                                    "type": "string",
                                    "not": {
                                        "pattern": ":exit$"
                                    }
                                }
                            },
                            "ignoreComments": {
                                "type": "boolean",
                                "default": false
                            }
                        },
                        "additionalProperties": false
                    }
                ],
                "messages": {
                    "wrongIndentation": "Expected indentation of {{expected}} but found {{actual}}."
                }
            },
            "consistent-return": {
                "type": "suggestion",
                "docs": {
                    "description": "Require `return` statements to either always or never specify values",
                    "recommended": false,
                    "url": "https://eslint.org/docs/latest/rules/consistent-return"
                },
                "schema": [
                    {
                        "type": "object",
                        "properties": {
                            "treatUndefinedAsUnspecified": {
                                "type": "boolean"
                            }
                        },
                        "additionalProperties": false
                    }
                ],
                "defaultOptions": [
                    {
                        "treatUndefinedAsUnspecified": false
                    }
                ],
                "messages": {
                    "missingReturn": "Expected to return a value at the end of {{name}}.",
                    "missingReturnValue": "{{name}} expected a return value.",
                    "unexpectedReturnValue": "{{name}} expected no return value."
                }
            }
        }
    }
}
```
