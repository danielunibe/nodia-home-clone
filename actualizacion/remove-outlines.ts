import fs from 'fs';
import path from 'path';

function processFile(filePath: string) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Remove border-white/xx colors
    content = content.replace(/border-white\/[0-9.]+/g, '');
    content = content.replace(/border-\[var\(--lime\)\]\/[0-9.]+/g, '');
    content = content.replace(/border-rose-[0-9]+\/[0-9.]+/g, '');
    content = content.replace(/border-purple-[0-9]+\/[0-9.]+/g, '');
    content = content.replace(/border-black\/[0-9.]+/g, '');
    content = content.replace(/border-transparent/g, '');
    content = content.replace(/border-b border-t border-l border-r border /g, ' ');

    // Remove specific shadow classes
    content = content.replace(/shadow-\[[^\]]+\]/g, 'shadow-md'); // unify custom shadows
    content = content.replace(/shadow-2xl/g, 'shadow-md');
    content = content.replace(/shadow-xl/g, 'shadow-md');
    content = content.replace(/shadow-lg/g, 'shadow-md');
    
    // Clean up multiple spaces that might result from removal
    content = content.replace(/  +/g, ' ');

    fs.writeFileSync(filePath, content, 'utf-8');
}

function walk(dir: string) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            processFile(fullPath);
        }
    }
}

walk('./app/features');
walk('./app/components');
walk('./app');
