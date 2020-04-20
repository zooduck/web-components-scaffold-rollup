import pkg from './package.json'; // The keyword 'package' is reserved
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import serve from 'rollup-plugin-serve';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';

export default [
    {
        input: 'src/index.ts',
        output: {
            name: 'web-components-example',
            file: pkg.browser,
            format: 'umd', // For browser and node
            sourcemap: 'inline'
        },
        plugins: [
            resolve(),
            commonjs(),
            postcss({
                // extract: true, // Create a .css bundle in dist
                plugins: [
                    autoprefixer()
                ]
            }),
            typescript(),
            serve({
                open: true,
                contentBase: 'dist'
            })
        ]
    },
    {
        input: 'src/index.ts',
        external: [], // Any node_modules required in the project go here
        output: [
            {
                file: pkg.main,
                format: 'cjs', // For node,
                sourcemap: 'inline'
            },
            {
                file: pkg.module,
                format: 'es', // For bundlers
                sourcemap: 'inline'
            }
        ],
        plugins: [
            resolve(),
            postcss({
                plugins: [
                    autoprefixer()
                ]
            }),
            typescript()
        ]
    }
];
