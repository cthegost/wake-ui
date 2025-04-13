import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';

// Читаем package.json, чтобы взять из него информацию
import packageJson from './package.json' assert { type: 'json' };

export default [
  {
    // Основная сборка (CommonJS и ES Modules)
    input: 'src/index.ts', // Точка входа
    output: [
      {
        file: packageJson.main, // CommonJS (для Node) - берем путь из package.json
        format: 'cjs',          // Формат CommonJS
        sourcemap: true,        // Генерируем sourcemaps
      },
      {
        file: packageJson.module, // ES Modules (для бандлеров типа Webpack/Rollup) - берем путь из package.json
        format: 'esm',           // Формат ES Modules
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),  // Исключаем peerDependencies (react, react-dom)
      resolve(),           // Поиск модулей в node_modules
      commonjs(),          // Конвертация CommonJS в ES6
      typescript({ 
        tsconfig: './tsconfig.json', // Используем наш tsconfig
        exclude: ['**/*.stories.tsx'], // Исключаем истории из сборки
        declaration: true,
        declarationDir: './dist/types',
        rootDir: 'src',
      }), 
      postcss({            // Обработка CSS
        extensions: ['.css'],
        minimize: true,      // Минимизируем CSS
        extract: 'styles.css', // Извлекаем весь CSS в один файл styles.css
      }),
    ],
    // Указываем внешние зависимости (те, что не должны попасть в бандл)
    external: ['react', 'react-dom'], 
  },
  {
    // Сборка файла декларации типов (.d.ts)
    input: 'dist/types/index.d.ts',
    output: [{ file: packageJson.types, format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/],
  },
]; 