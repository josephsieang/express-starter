import { build } from 'esbuild';
import { spawn } from 'child_process';
import chokidar from 'chokidar';

let server;

function restartServer() {
  if (server) {
    server.kill();
  }
  server = spawn('node', ['dist/server.js'], { stdio: 'inherit' });
}

async function rebuild() {
  try {
    await build({
      entryPoints: ['src/server.ts'],
      bundle: true,
      platform: 'node',
      target: 'node22',
      outfile: 'dist/server.js',
      sourcemap: true,
    });
    console.log('[esbuild] ✅ Build success.');
    restartServer();
  } catch (e) {
    console.error('[esbuild] ❌ Build failed:\n', e.message);
  }
}

await rebuild();
chokidar.watch('src').on('change', rebuild);