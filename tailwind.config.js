module.exports = {
    purge: [],
    theme: {
        extend: {
            spacing: {
                '96': '24rem',
                '128': '32rem',
            },
        },
    },
    variants: {
        backgroundColor: ['responsive', 'hover', 'focus', 'disabled'],
        cursor: ['responsive', 'disabled'],
        opacity: ['responsive', 'hover', 'disabled'],
    },
    plugins: [],
};
