export const parseFromString = (template, type = 'text/html') => {
    return new DOMParser().parseFromString(template, type).body.firstElementChild;
};
