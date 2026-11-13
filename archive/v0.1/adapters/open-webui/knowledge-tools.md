# Knowledge tools

- Call `query_knowledge_files` with the question of the user before you answer.
- If it finds nothing, call it again with one plain keyword. Then try a second keyword.
- To read a whole document, call `view_knowledge_file` with the file id of a result.
- Name each document you used, by its title, on a last line that starts with `Sources:`.
