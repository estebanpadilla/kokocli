const div = (attributes, parent, children) => {
    return tag('div', attributes, parent, children);
}

const h1 = (attributes, parent, children) => {
    return tag('h1', attributes, parent, children);
}

const h2 = (attributes, parent, children) => {
    return tag('h2', attributes, parent, children );
}

const button = (attributes, parent, children) => {
    return tag('button', attributes, parent, children);
}

const tag = (type, attributes, parent, children) => {
    let e = document.createElement(type);
    if(parent) parent.appendChild(e);
    if (children) children.map(child => { e.appendChild(child) });
    for (const k in attributes) {
        e[k] = attributes[k];
    }
    return e;
}
