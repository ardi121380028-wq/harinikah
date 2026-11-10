import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🚀 [1/4] Menjalankan Next.js Production Build (Standalone Mode)...');
execSync('npm run build', { stdio: 'inherit', cwd: rootDir });

const standaloneDir = path.join(rootDir, '.next', 'standalone');
const staticSrc = path.join(rootDir, '.next', 'static');
const staticDest = path.join(standaloneDir, '.next', 'static');
const publicSrc = path.join(rootDir, 'public');
const publicDest = path.join(standaloneDir, 'public');

console.log('📦 [2/4] Menyalin aset statis (.next/static & public) ke folder standalone...');
// Copy static folder
if (fs.existsSync(staticSrc)) {
  fs.cpSync(staticSrc, staticDest, { recursive: true });
  console.log('✓ .next/static berhasil disalin.');
}

// Copy public folder
if (fs.existsSync(publicSrc)) {
  fs.cpSync(publicSrc, publicDest, { recursive: true });
  console.log('✓ public berhasil disalin.');
}

console.log('⚙️ [3/4] Membuat cPanel Passenger startup file (app.js)...');
const appJsContent = `// Phusion Passenger Startup File for Rumahweb cPanel Node.js
const path = require('path');
process.chdir(__dirname);

process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || 3000;

require('./server.js');
`;
fs.writeFileSync(path.join(standaloneDir, 'app.js'), appJsContent, 'utf-8');
console.log('✓ app.js berhasil dibuat.');

console.log('🗜️ [4/4] Mengompresi seluruh bundle menjadi deploy-cpanel-harinikah.zip...');
const zipOutput = path.join(rootDir, 'deploy-cpanel-harinikah.zip');
if (fs.existsSync(zipOutput)) {
  fs.unlinkSync(zipOutput);
}

// Use relative path to avoid path space issues in PowerShell
const psCommand = `Compress-Archive -Path '.\\.next\\standalone\\*' -DestinationPath '.\\deploy-cpanel-harinikah.zip' -Force`;
execSync(`powershell -NoProfile -Command "${psCommand}"`, { stdio: 'inherit', cwd: rootDir });

const stats = fs.statSync(zipOutput);
const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);
console.log(`\n🎉 SELESAI! File ZIP siap upload: deploy-cpanel-harinikah.zip (${sizeMb} MB)`);
