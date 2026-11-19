---
name: decision-questionnaire
description: "Manual: run only when the user explicitly asks for /decision-questionnaire. Turns an open decision into a short questionnaire with options for someone else to fill in."
license: MIT
metadata:
  id: PLN-10
  stars: "1"
  nature: template
  mode: R
  wave: V4
  load: manual
---

# Decision questionnaire

**Core rule:** each question is closed, with options and the consequence of each, so the respondent answers without needing the context.

## Procedure

1. State the decision and why it is blocked (who knows the answer).
   - Check: two lines.
2. Split it into the fewest questions that settle it; order them by dependency.
   - Check: at most 7 questions.
3. Write each with options, the consequence of each option, and your recommendation.
   - Check: each option has its consequence.
4. Save it as `docs/questionnaires/<YYYY-MM-DD>-<topic>.md` and give the human the file.
   - Check: the file exists.

## Template

```markdown
# Questionnaire: <decision>
Context: <three lines>
## Q1. <question>
- [ ] A. <option> - consequence: <...> (recommended)
- [ ] B. <option> - consequence: <...>
- [ ] Other: ____
```

## Stop and ask the human if

- It is unclear who should answer.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Ask open questions." | Respondents without context answer vaguely. Give options. |
| "Add every possible question." | Long questionnaires go unanswered. Keep the few that decide. |

## Definition of done

- [ ] Questionnaire saved with closed questions, consequences and a recommendation.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
