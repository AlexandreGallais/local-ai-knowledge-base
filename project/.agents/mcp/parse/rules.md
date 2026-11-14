# Heavy files

1. Never read a heavy file raw: `.xd`, `.docx`, `.xlsx`, `.pptx`, `.pdf`, a large `.svg`, `.json` or log. Read raw, it costs thousands of tokens and gives no structure.
2. Call `outline` of the `parse` server first, then `part` with one id of the outline, then `images` if you need the pictures.
3. For an old Office file (`.doc`, `.xls`, `.ppt`), ask the user to save it in the new format.
