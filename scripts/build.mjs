import {cp,mkdir,rm} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
await rm('dist',{recursive:true,force:true}); await mkdir('dist',{recursive:true});
await cp('public','dist',{recursive:true});
execFileSync('node_modules/.bin/tspipe',[],{stdio:'inherit'});
execFileSync('node_modules/.bin/tailwindcss',['-i','src/style.css','-o','dist/style.css','--minify'],{stdio:'inherit'});
execFileSync('python',['-c',`import zipfile,pathlib
root=pathlib.Path('.')
with zipfile.ZipFile('dist/spectra-source.zip','w',zipfile.ZIP_DEFLATED) as z:
 for directory in ['src','public','scripts','tests','dist']:
  for p in (root/directory).rglob('*'):
   if p.is_file() and p.name!='spectra-source.zip':z.write(p,p.as_posix())
 for file in ['README.md','package.json','package-lock.json','tsconfig.json','bridge/package.json','bridge/package-lock.json','bridge/server.mjs','bridge/normalize.mjs']:
  p=root/file
  if p.exists():z.write(p,p.as_posix())
`],{stdio:'inherit'});
