import { intro, outro, text, confirm, cancel, isCancel } from '@clack/prompts';
import fs from 'node:fs/promises';
import path from 'node:path';

async function main() {
  console.log();
  intro('Copy Environment File');

  const fileName = await text({
    message: 'Enter the name of the environment file',
    placeholder: 'env',
    validate(value) {
      if (value.length === 0) {
        return 'File name is required!';
      }
    },
  });

  if (isCancel(fileName)) {
    cancel('Operation cancelled');
    return process.exit(0);
  }

  const confirmCopy = await confirm({
    message: `Do you want to copy ${fileName}.example to ${fileName}?`,
  });

  if (isCancel(confirmCopy)) {
    cancel('Operation cancelled');
    return process.exit(0);
  }

  if (confirmCopy) {
    const sourcePath = path.resolve(`${fileName}.example`);
    const destPath = path.resolve(fileName);

    try {
      await fs.copyFile(sourcePath, destPath);
      outro('File copied successfully!');
    } catch (error) {
      console.error('Error copying file:', error);
      outro('Failed to copy file.');
    }
  } else {
    outro('Operation not performed');
  }
}

main().catch(console.error);