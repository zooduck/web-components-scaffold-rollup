import style from './example-button.static-style.scss';

export const exampleStyle = (styleOptions = {}) => {
    const DEFAULT_STYLES = {
        backgroundColor: 'aliceblue',
        color: 'black',
        fontFamily: 'inherit',
        fontSize: '1em'
    };
    const VAR_STYLES = {
        border: 'solid black',
        padding: '10px',
    };
    const PROP_STYLES = {
        backgroundColor: styleOptions.backgroundColor || DEFAULT_STYLES.backgroundColor,
        color: styleOptions.color || DEFAULT_STYLES.color,
        fontFamily: styleOptions.fontFamily || DEFAULT_STYLES.fontFamily,
        fontSize: styleOptions.fontSize || DEFAULT_STYLES.fontSize
    };

    return `
${style}
.example-component__button {
    background-color: ${PROP_STYLES.backgroundColor};
    color: ${PROP_STYLES.color};
    font-family: ${PROP_STYLES.fontFamily};
    font-size: ${PROP_STYLES.fontSize};
    border: var(--border, ${VAR_STYLES.border});
    padding: var(--padding, ${VAR_STYLES.padding});
}
`.trim();
};
