const buttons = (function() {
    const raw = document.getElementsByClassName("verb");
    const defaultList = [];
    for (let i = 0; i < raw.length; i++) {
        const element = raw[i] 
        const color = (function() {
            if (i % 2 == 0) {
                return "lightgray";
            } else {
                return "white";
            }
        })();

        const data = verbs[verbs.map(verb => verb.name).indexOf(element.firstChild.innerHTML)];
        defaultList.push({html: element, color: color, verb: data});
    }
    return defaultList;
})();

for (const button of buttons) {main.call(button)};
function main() {
    let selected = false;
    let color = this.color;
    const htmlData = this.html;

    htmlData.style.backgroundColor = color;
    
    htmlData.addEventListener("mouseover", e => {
        htmlData.style.backgroundColor = "gray";
    })
    htmlData.addEventListener("mouseleave", e => {
        htmlData.style.backgroundColor = color;
    })

    document.addEventListener("click", e => {
        if (e.target == htmlData) {
            selected = true;
            select(this.verb);
            htmlData.style.backgroundColor = color = "rgb(100, 100, 100)";
        } else {
            selected = false;
            htmlData.style.backgroundColor = color = this.color;
        }
        if (!(buttons.map(button => button.html).includes(e.target))) {
            defaultSelect();
        }
    })
}

function select(verb) {
    const conjugation = verb.conjugation;
    Object.keys(conjugation).forEach(key => {
        document.getElementById(key).lastChild.innerHTML = conjugation[key];
    })
}
function defaultSelect() {
    for (const element of document.getElementById("chart").children) {
        element.lastChild.innerHTML = "-";
    }
}