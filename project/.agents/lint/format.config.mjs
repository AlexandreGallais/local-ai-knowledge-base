// Format pass of this project: everything that can be fixed by itself, silently. Run it with
// `npm run format` (the skill apply-strict-lint adds the script) or
// `node /opt/local-ai-base/tools/format-file.ts --all`.
import { formatConfig } from './format.mjs';
import { projectOptions } from './options.mjs';

export default await formatConfig(projectOptions());
