function reveal() {
    document.getElementById("hidden-div").style.display = "inherit";
}

function elrejt() {
    document.getElementById("hidden-div").style.display = "none";
}

function submitBtn() {
    let data = {};
    data.id = ""
    data.name = document.getElementById("name-input").value;
    data.loc = ""

    if (document.getElementById("bp-loc").checked) {
        data.loc = "Budapest";
    } else {
        data.loc = document.getElementById("country-input").value;
    }
    data.age = document.getElementById("age-input").value;

    let felhasznalo = document.getElementById("name-input");
    let telepules = document.getElementById("country-input");
    let kor = parseInt(data.age);

    if (felhasznalo.value.length == 0) {
        alert("Név megadása kötelező!");
    } else if (felhasznalo.value.length < 7) {
        alert("Adjon meg másik nevet!");
    } else if (document.getElementById("bp-loc").checked === false && document.getElementById("videk-loc").checked === false) {
        alert("Település választása kötelező!")
    } else if (telepules.value.length < 3 && document.getElementById("videk-loc").checked) {
        alert("Adjon meg normális település nevet!");
    } else if (isNaN(kor)) {
        alert("Csak számot írjon be életkornak!");
    } else {
        createUser();
    }

    function createUser() {
        let fetchOptions = {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        };
    
        fetch(`http://localhost:3000/users`, fetchOptions).then(
            resp => resp.json(),
            err => console.error(err)
        ).then(
            data => console.log(data)
        )
    }

    $("form").onsubmit = setTimeout(function () {
        location.reload(true);
    }, 1000);
}

function getServerData(url) {
    let fetchOptions = {
        method: "GET",
        mode: "cors",
        cache: "no-cache"
    };

    return fetch(url, fetchOptions).then(
        response => response.json(),
        err => console.error(err)
    );
}

getServerData("http://localhost:3000/users").then(
    data => fillDataTable(data, "submitTable")
);

//Táblázat kitöltése a backendről
function fillDataTable(data, tableID) {
    let table = document.querySelector(`#${tableID}`);
    if (!table) {
        console.error(`Table "${TableID}" is not found.`);
        return;
    }

    let tBody = table.querySelector("tbody");
    for (let row of data) {
        let tr = createAnyElement("tr");
        for (let k in row) {
            let td = createAnyElement("td");
            td.innerHTML = row[k];
            tr.appendChild(td);
        }
        tBody.appendChild(tr);
    }
}

function createAnyElement(name, attributes) {
    let element = document.createElement(name);
    for (let k in attributes) {
        element.setAttribute(k, attributes[k]);
    }
    return element;
}