let fotofiles = ['img/cat (1).jpg', 'img/cat (2).jpg', 'img/cat (3).jpg', 'img/cat (4).jpg', 'img/cat (5).jpg', 'img/cat (6).jpg',
    'img/cat (7).jpg', 'img/cat (8).jpg', 'img/cat (9).jpg', 'img/cat (10).jpg', 'img/cat (11).jpg', 'img/cat (12).jpg',
    'img/cat (13).jpg', 'img/cat (14).jpg', 'img/cat (15).jpg', 'img/cat (16).jpg', 'img/cat (17).jpg', 'img/cat (18).jpg']
let fotos = []
let favs = []
let trash = []
let archiv = []
let slider = []

function render(type) {
    let fotoarea = document.getElementById("fotoarea");

    if (type == "laden") {
        fotoUpload();
    }

    if (type == "fotos") {
        fotoRender();
    }

    if (type == "favs") {
        let array = favs;
        folderRender(array);
    }

    if (type == "trash") {
        let array = trash;
        folderRender(array);
    }

    if (type == "archiv") {
        let array = archiv;
        folderRender(array);
    }
}

function fotoUpload() {
    document.getElementById("fotoload").classList.add("d-none");
    slider.length = 0;

    for (i = 0; i < fotofiles.length; i++) {
        fotos.push(fotofiles[i]);
    };
    render("fotos");
}

function fotoRender() {
    fotoarea.innerHTML = ``;
    slider.length = 0;
    if (fotos.length < 0) {
        fotoarea.innerHTML = ``;
    }
    else {
        for (i = 0; i < fotos.length; i++) {
            fotoarea.innerHTML += addTemplateFoto(fotos, i);
            slider.push(fotos[i]);
        }
    }
}

function folderRender(array) {
    fotoarea.innerHTML = ``;
    slider.length = 0;
    if (array.length < 0) {
        fotoarea.innerHTML = ``;
    }
    else {
        for (i = 0; i < array.length; i++) {
            fotoarea.innerHTML += addTemplateFoto(array, i);
            document.getElementById("fotoNavigation").classList.add('d-none');
            slider.push(array[i]);
        }
    }

}

function addTemplateFoto(array, index) {
    return /*html*/ `<div class="fotobox">
        <img onclick="viewDetail(${index})" class="foto" src="./${array[index]}" alt="foto" loading="lazy" id="foto">
        <div class="fotoNavigation" id="fotoNavigation">
            <button  id="button1" onclick="pushToFolder(${index}, 'favourite')" class="fotoButton ${array == fotos ? "" : "d-none"}" style="font-family: 'Roboto'"><img class="fotoIcons" src="img/favourit.png" alt="favourits"></button>
            <button  id="button2" onclick="pushToFolder(${index}, 'trash')" class="fotoButton ${array == fotos ? "" : "d-none"}" style="font-family: 'Roboto'"><img class="fotoIcons" src="img/trash.png" alt="trash"></button>
            <button  id="button3" onclick="pushToFolder(${index}, 'archive')" class="fotoButton ${array == fotos ? "" : "d-none"}" style="font-family: 'Roboto'"><img class="fotoIcons" src="img/archiv.png" alt="archiv"></button>
        </div>
    </div>`;
}

function addTemplateDetail(index) {
    return /*html*/ `<div class="sliderDiv">
        <div class="arrowBack" id="arrowBack"> <img onclick="back()" class="arrowIcons" src="img/back.png"
                alt="back"></div>
    <div class="detailHeaderDiv">
        <nav class="detailNavigation">
            <button class="navButton" style="font-family: 'Roboto'"><img class="navIcons"
                    src="img/favourit.png" alt="favourits"></button>
            <button class="navButton" style="font-family: 'Roboto'"><img class="navIcons"
                    src="img/trash.png" alt="trash"></button>
            <button class="navButton" style="font-family: 'Roboto'"><img class="navIcons"
                    src="img/archiv.png" alt="archiv"></button>
        </nav>
    </div>
    <div>
        <div class="arrowLeft" id="arrowLeft"> <img onclick="previousFoto(${index})" class="arrowIcons"
                src="img/left.png" alt=""></div>
        <div class="detailFotoDiv"><img class="detailFoto" src="./${slider[index]}" alt="cat"></div>
        <div class="arrowRight" id="arrowRight"> <img onclick="nextFoto(${index})" class="arrowIcons"
                src="img/right.png" alt=""></div>
    </div>
</div>`
}

function nextFoto(index) {
    let nextIndex = index + 1;

    if ((nextIndex + 1) == slider.length) {
        let detailedSection = document.getElementById("detailedSection");
        detailedSection.innerHTML = addTemplateDetail(nextIndex);
        document.getElementById('arrowRight').classList.add('d-none');
    }
    else {
        let detailedSection = document.getElementById("detailedSection");
        detailedSection.innerHTML = addTemplateDetail(nextIndex);
    }
}

function previousFoto(index) {
    let previousIndex = index - 1;

    if (previousIndex < 0) {
        let detailedSection = document.getElementById("detailedSection");
        detailedSection.innerHTML = addTemplateDetail(index);
        document.getElementById('arrowLeft').classList.add('d-none');
    }
    else {
        let detailedSection = document.getElementById("detailedSection");
        detailedSection.innerHTML = addTemplateDetail(previousIndex);
    }

}

function pushToFolder(i, type) {
    if (type == 'favourite') {
        let arrayname = favs;
        pushType(arrayname, i);
    }
    if (type == 'trash') {
        let arrayname = trash;
        pushType(arrayname, i);
    }
    if (type == 'archive') {
        let arrayname = archiv;
        pushType(arrayname, i);
    }

}

function pushType(arrayname, i) {
    arrayname.push(fotos[i]);
    fotos.splice(i, 1);
    save();
    load();
    render("fotos");
}


function viewDetail(index) {
    document.getElementById("detailedSection").classList.remove('d-none');
    let detailedSection = document.getElementById("detailedSection");
    if (index == 0) {
        detailedSection.innerHTML = addTemplateDetail(index);
        document.getElementById('arrowLeft').classList.add('d-none');
    }
    else {
        detailedSection.innerHTML = addTemplateDetail(index);
    }
}


function back() {
    document.getElementById("detailedSection").classList.add('d-none');

}


function saveArrayWithKey(array, key) {
    variable1 = JSON.stringify(array);//packe die werte aus array in string unter variable1
    localStorage.setItem(key, variable1);// speicher den string aus var1 in key
}


function giveArrayFromKey(array, key) {
    localStorage.getItem(key, variable1); //hole aus speicher und packe in variable1
    array = JSON.parse(variable1);//parse den string unter variable1 in werte für array
}


function save() {
    saveArrayWithKey(fotos, 'fotoKey');
    saveArrayWithKey(trash, 'trashKey');
    saveArrayWithKey(favs, 'favsKey');
    saveArrayWithKey(archiv, 'archiveKey');

}


function load() {
    giveArrayFromKey(fotos, 'fotoKey');
    giveArrayFromKey(trash, 'trashKey');
    giveArrayFromKey(favs, 'favsKey');
    giveArrayFromKey(archiv, 'archiveKey');
}