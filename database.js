class Pronoun {
    constructor(type, label, endings) {
        this.type = type;
        this.label = label;
        this.conjugations = {};
        conjugationData.endings.forEach((endingName, i) => {
            const ending = endings[i];
            conjugationData.conjugations[endingName].push(new Override(type, ending));
            this.conjugations[endingName] = ending;
        });
    }
} 
class Override {
    constructor(pronoun, value) {
        this.pronoun = pronoun;
        this.value = value;
    }
}
 
const conjugationData = {
    init: function() {
        conjugationData.conjugations = {};
        conjugationData.endings.forEach(endingName => {
            conjugationData.conjugations[endingName] = [];
        });
    },
    endings: ["ar", "er", "ir"]
}
conjugationData.init();

conjugationData.pronouns = [
    new Pronoun("yo", "Yo", ["o", "o", "o"]),
    new Pronoun("tu", "Tu", ["as", "es", "es"]),
    new Pronoun("el", "El/ella/usted", ["a", "e", "e"]),
    new Pronoun("nosotros", "Nosotros", ["amos", "emos", "imos"]),
    new Pronoun("vosotros", "Vosotros", ["ais", "eis", "eis"]),
    new Pronoun("ellos", "Ellos/ellas/ustedes", ["an", "en", "en"])
];
function conjugate(verbName, addY, overrides) {
    addY = addY || false;
    overrides = overrides || [];

    const base = verbName.slice(0, -2);
    const ending = verbName.substr(-2);
    const conjugation = {};
    
    if (conjugationData.conjugations[ending]) {
        conjugationData.conjugations[ending].forEach(suffix => {
            conjugation[suffix.pronoun] = base + suffix.value;
        });
    } else {
        const suffixes = [
            "",
            "s",
            "",
            "mos",
            "is",
            "n"
        ];
        const endingLetter = ending.slice(0,1);
        conjugationData.pronouns.forEach((pronoun, i) => {
            conjugation[pronoun.type] = base + endingLetter + suffixes[i]
        });
        conjugationData.yo = base + "o";
    }
    if (addY) {conjugation.yo += "y";};
    overrides.forEach(override => {
        conjugation[override.pronoun] = override.value;
    });
    return(conjugation);
}

class Verb {
    constructor(verb, defenition, includeY) {
        includeY = (includeY == true);
        verb = verb || "???";
        defenition = defenition || "???";
        const base = verb.toLowerCase();
        function capitalize(string) {
                const capital = string.slice(0,1).toUpperCase() + string.slice(1).toLowerCase();
            return capital;
        }
        this.name = capitalize(verb);
        function getConjugated() {
            let conjugated;
            if (irregular[base]) {
                conjugated = irregular[base];
            } else { conjugated = conjugate(base, includeY) };
            
            Object.keys(conjugated).forEach(key => {
                conjugated[key] = capitalize(conjugated[key]);
            });
            return conjugated;
        }
        this.conjugation = getConjugated();

        function define() {
            const base = defenition.trimStart().toLowerCase();
            if (base.startsWith("to ")) {
                return capitalize(base.trimStart());
            } else {
                return "To " + base.trimStart();
            }
        }
        this.defenition = define();
    }
}

const irregular = {
    ir: conjugate("var", true),
    ser: conjugate("sor", true, [
            new Override("tu", "eres"),
            new Override("el", "es"),
            new Override("nosotros", "somos"),
        ]),
    gustar: {
        yo: "me gusta/gustan",
        tu: "te gusta/gustan",
        el: "le gusta/gustan",
        nosotros: "nos gusta/gustan",
        vosotros: "???",
        ellos: "les gusta/gustan"
    },
    hacer: conjugate("hacer", false, [new Override("yo", "hugo")]),
    tener: conjugate("tiener", false, [
        new Override("nosotros", "tenemos"),
        new Override("yo", "tengo")
    ]),
    jugar: conjugate("juegar", false, [new Override("nosotros", "jugamos")]),
    querer: conjugate("quierer", false, [new Override("nosotros", "queremos")])
}

const verbs = [
    new Verb(
        "Ir", 
        "To go"
    ),
    new Verb(
        "Ser", 
        "To be (permanent)"
    ),
    new Verb(
        "Estar", 
        "To be (temporary)",
        true
    ),
    new Verb(
        "Hacer", 
        "To do"
    ),
    new Verb(
        "Gustar", 
        "To like"
    ),
    new Verb(
        "Comer", 
        "To eat"
    ),
    new Verb(
        "Tener", 
        "To have"
    ),
    new Verb(
        "Beber", 
        "To drink"
    ),
    new Verb(
        "Tomar", 
        "To drink"
    ),
    new Verb(
        "Buscar", 
        "To look for"
    ),
    new Verb(
        "Jugar", 
        "To play"
    ),
    new Verb(
        "Usar", 
        "To wear/use"
    ),
    new Verb(
        "Querer", 
        "To want"
    ),
    new Verb(
        "Hablar", 
        "To talk/speak"
    ),
    new Verb(
        "Trabajar", 
        "To work"
    ),
    new Verb(
        "Leer", 
        "To read"
    ),
    new Verb(
        "Andar", 
        "To be on"
    ),
    new Verb(
        "Escribir", 
        "To write"
    ),
    new Verb(
        "Quedar", 
        "To stay"
    ),
    new Verb(
        "Esquiar", 
        "To ski"
    ),
    new Verb(
        "Mirar", 
        "To see"
    ),
    new Verb(
        "Practicar", 
        "To practice"
    ),
    new Verb(
        "Caminar", 
        "To walk"
    ),
    new Verb(
        "Ganar", 
        "To win"
    ),
    new Verb(
        "Perder", 
        "To lose"
    ),
    new Verb(
        "Correr", 
        "To run"
    ),
    new Verb(
        "Nadar", 
        "To swim"
    ),
    new Verb(
        "Preguntar", 
        "To ask"
    ),
    new Verb(
        "Nacer", 
        "To be born"
    ),
    new Verb(
        "Vivir", 
        "To live"
    )
];

function CreateVerbElement(verb) {
    const container = document.createElement("div");
    container.className = "verb";

    const name = document.createElement("span");
    name.innerHTML = verb.name;
    name.className = "VerbName";
    container.appendChild(name);

    container.appendChild(document.createElement("br"));

    const defenition = document.createElement("span");
    defenition.innerHTML = verb.defenition;
    defenition.className = "VerbDefenition";
    container.appendChild(defenition);

    document.getElementById("verbs").appendChild(container);
}

function CreateChart(pronoun) {
    const box = document.createElement("div");
    box.id = pronoun.type;
    box.className = "conjugatedVerb"

    const pronounLabel = document.createElement("span");
    pronounLabel.innerHTML = pronoun.label;
    pronounLabel.className = "pronounLabel"

    const conjugatedLabel = document.createElement("span");
    conjugatedLabel.innerHTML = "-"
    conjugatedLabel.className = "conjugatedVerbLabel"

    box.appendChild(pronounLabel);
    box.appendChild(conjugatedLabel);
    document.getElementById("chart").appendChild(box);
}

verbs.forEach(verb => {
    CreateVerbElement(verb);
})

function swapElements(array) {
    const length = array.length;
    const result = [];
  
    for (let i = 0; i < length / 2; i++) {
      result.push(array[i]);
      result.push(array[i + length / 2]);
    }
  
    return result;
  }
console.log()
swapElements(conjugationData.pronouns).forEach(element => {
    CreateChart(element);
    console.log(element);
});
