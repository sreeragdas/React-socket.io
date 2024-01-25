import type { UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'scope-enum': [2, 'always', ['yarn', 'common', 'git', 'deps', 'deps-dev', 'vscode', 'ci', 'client']],
        'subject-case': [2, 'always', 'sentence-case'],
    },
};

module.exports = Configuration;
