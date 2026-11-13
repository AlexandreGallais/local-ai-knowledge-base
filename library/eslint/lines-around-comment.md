---
title: "lines-around-comment (part 1 of 2)"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/lines-around-comment.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# lines-around-comment

Many style guides require empty lines before or after comments. The primary goal
of these rules is to make the comments easier to read and improve readability of the code.

## Rule Details

This rule requires empty lines before and/or after comments. It can be enabled separately for both block (`/*`) and line (`//`) comments. This rule does not apply to comments that appear on the same line as code and does not require empty lines at the beginning or end of a file.
