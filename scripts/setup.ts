import { execSync } from 'child_process';
import { colors } from './colors';
import { log } from './log';

function exec(command: string, description: string) {
  try {
    log(`\n${description}`, colors.blue);
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch {
    log(`❌ Error: ${description}`, colors.red);
    return false;
  }
}

log('🚀 Starting project setup...', colors.cyan);

exec('npm install', '➤ Installing dependencies...');

exec(
  'npx commitizen init cz-conventional-changelog --save-dev --save-exact --force',
  '✨ Setting up Commitizen...',
);

exec('npm run docker:compose', '➤ Creating containers...');

exec('npm run migration:run', '➤ Applying migrations ...');

log('\n✅ Setup completed successfully!', colors.green);
