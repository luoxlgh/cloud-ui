const path = require('path');
const hljs = require('highlight.js');
const codeActivator = require('./code-activator');

let theme = path.basename(process.cwd());
if (theme === 'src')
    theme = 'theme-default';

module.exports = {
    type: 'app',
    webpack: {
        entry: {
            docs: path.resolve(__dirname, './index.js'),
        },
        output: {
            path: path.resolve(__dirname, '../public/' + theme),
            // Use relative public path by default
            publicPath: process.env.NODE_ENV === 'development' ? `/${theme}/` : `/cloud-ui/${theme}/`,
            filename: '[name].js',
            chunkFilename: 'chunk.[name].[chunkhash:16].js',
        },
        resolve: {
            EXTENDS: true,
            alias: {
                EXTENDS: true,
                library$: path.resolve(process.cwd(), 'index.js'),
            },
        },
        module: {
            EXTENDS: true,
            rules: [
                'EXTENDS',
                { test: /\.md$/, loader: 'vue-markdown-loader', options: {
                    langPrefix: 'lang-',
                    html: true,
                    wrapper: 'u-article',
                    preprocess(markdownIt, source) {
                        const result = codeActivator.activate(source);
                        return result.markdown;
                    },
                    highlight(str, rawLang) {
                        let lang = rawLang;
                        if (rawLang === 'vue')
                            lang = 'html';

                        if (lang && hljs.getLanguage(lang)) {
                            try {
                                const result = hljs.highlight(lang, str).value;
                                return `<pre class="hljs ${this.langPrefix}${rawLang}"><code>${result}</code></pre>`;
                            } catch (e) {}
                        }

                        const result = this.utils.escapeHtml(str);
                        return `<pre class="hljs"><code>${result}</code></pre>`;
                    },
                } },
            ],
        },
    },
    webpackDevServer: {
        publicPath: process.env.NODE_ENV === 'development' ? `/${theme}/` : `/cloud-ui/${theme}/`,
        contentBase: path.resolve(__dirname, '../public'),
    },
};
