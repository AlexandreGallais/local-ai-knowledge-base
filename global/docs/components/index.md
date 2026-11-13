# components index

One line per document. Open only the documents your task needs.

- [Own components: the rules](component-rules.md): Native element first, a role is a promise of behavior, no Material nor CDK nor Angular Aria, host instead of decorators, input and model, ids; the eight steps and the checklist.
- [Keyboard and focus](keyboard-focus.md): One tab stop per component, roving tabindex or aria-activedescendant, disabled items, a visible focus, the focus back to the trigger, no focus trap except a modal.
- [Overlays and announcements without the CDK](overlays.md): What the browser gives instead of the CDK - dialog and showModal, popover, inert, CSS anchoring, live regions, the two observers - and what is still to write.
- [Component patterns: role, states, keyboard, focus](patterns.md): For each common component (button to virtual list), the native element, the ARIA role and states, the keys and the focus, with the details that do not fit a table.
- [Testing the accessibility of a component](testing-a11y.md): Three levels - template lint, component test driven by the keyboard and read by role, end-to-end with ARIA snapshot and axe-core - and what each cannot prove.
- [Component mistakes a model makes](component-mistakes.md): The ARIA and semantic mistakes models make in own components, each with why it is wrong and what to write instead.
