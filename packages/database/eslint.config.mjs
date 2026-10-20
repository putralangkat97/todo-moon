import { globalIgnores } from 'eslint/config';
import gts from 'gts';

export default [
  globalIgnores(['dist/**', 'src/generated/**', 'prisma.config.ts']),
  ...gts,
];
