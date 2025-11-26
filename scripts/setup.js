import { execSync } from 'child_process';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
};

function log(message, color) {
  console.log(`${color}${message}${colors.reset}`);
}

function exec(command, description) {
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

exec('npx husky init', '➤ Setting up Husky...');

exec('npm run docker:compose', '➤ Creating containers...');

exec('npm run prisma:generate', '➤ Setting up Prisma...');

exec('npm run prisma:migrate:deploy', '➤ Applying migrations...');

exec('npm run prisma:migrate:deploy', '➤ Building application...');

log('\n✅ Setup completed successfully!', colors.green);
