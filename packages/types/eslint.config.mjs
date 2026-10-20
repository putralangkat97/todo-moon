import {globalIgnores} from 'eslint/config';
import gts from 'gts';

export default [
  globalIgnores(['dist/**']),
  ...gts,
];
