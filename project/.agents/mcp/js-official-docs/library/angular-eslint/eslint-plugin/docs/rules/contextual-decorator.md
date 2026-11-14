---
title: "@angular-eslint/contextual-decorator (part 1 of 3)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/contextual-decorator.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/contextual-decorator`

Ensures that classes use contextual decorators in their body

- Type: suggestion

## Rationale

Angular decorators like @Input(), @Output(), @ViewChild(), and @HostBinding() are only meaningful in specific class types. For example, @Input() and @Output() only work in @Component or @Directive classes because they define the component/directive's API. Using these decorators in @Injectable() classes or @Pipe() classes will not work as expected, as Angular does not process these decorators in those contexts. This rule prevents bugs by ensuring decorators are only used where Angular will recognize and process them.

## Rule Options

The rule does not have any configuration options.
