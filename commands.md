# Instal pnpm

npm install -g pnpm

# Install vitest

pnpm add -D vitest

# Install typescript

pnpm i -D typescript tslint

# Criar arquivo tsconfig

tsc --init

# Config ts.config

```
{
  "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "target": "es6",
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist"
  },
  "lib": ["es2015"]
}
```

# Criar arquivo tslint

./node_modules/.bin/tslint --init

# Config script de transpilação

```
"scripts": {
    "start": "tsc && node dist/app.js",
    "test":"vitest"
},
```
# Install express 
pnpm install express
pnpm install -D @types/express

# Rodar test 
 npm run test 
 
# Install testcontainers
pnpm install testcontainers --save-dev

# Install Redis 
pnpm i ioredis 