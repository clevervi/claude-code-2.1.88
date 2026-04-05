import fs from 'fs';
import path from 'path';

const sourceDir = path.join(process.cwd(), 'source');
const targetDir = path.join(process.cwd(), 'clean_source');

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
}

function reorganize(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            reorganize(fullPath);
        } else {
            // Replace ! with / and handle case where ! is not present
            // We need to be careful with paths on Windows
            const relativePath = file.replace(/!/g, path.sep);
            const targetPath = path.join(targetDir, relativePath);
            const targetSubDir = path.dirname(targetPath);

            if (!fs.existsSync(targetSubDir)) {
                fs.mkdirSync(targetSubDir, { recursive: true });
            }

            try {
                fs.copyFileSync(fullPath, targetPath);
                // console.log(`Copied: ${file} -> ${relativePath}`);
            } catch (err) {
                console.error(`Failed to copy ${file}: ${err.message}`);
            }
        }
    }
}

console.log('Starting reorganization...');
reorganize(sourceDir);
console.log('Reorganization complete!');
