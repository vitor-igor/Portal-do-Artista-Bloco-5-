const form = document.getElementById("form");
const title = document.getElementById("title");
const email = document.getElementById("email");
const telefone = document.getElementById("telefone");
const desc = document.getElementById("desc");
const areaSelection = document.getElementById("area-selection");
const colabSelection = document.getElementById("colab-selection");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    checkForm();
})

title.addEventListener("blur", () => {
    checkInputTitle();
});

email.addEventListener("blur", () => {
    checkInputEmail();
});

function checkInputTitle() {
    const titleValue = title.value;

    if(titleValue === "") {
        //mostrar mensagem de erro
        errorInput(title, "Campo obrigatório.")
    } else {
        const formItem = title.parentElement;
        formItem.className = "input-box";
    }
};

function checkInputEmail() {
    const emailValue = email.value;

    if(emailValue === "") {
        //mostrar mensagem de erro
        errorInput(email, "Campo obrigatório.")
    } else {
        const formItem = email.parentElement;
        formItem.className = "input-box";
    }
};

function checkInputTelefone() {
    const telefoneValue = telefone.value;

    if(telefoneValue === "") {
        //mostrar mensagem de erro
        errorInput(telefone, "Campo obrigatório.")
    } else {
        const formItem = telefone.parentElement;
        formItem.className = "input-box";
    }
};

function checkInputDesc() {
    const descValue = desc.value;

    if(descValue === "") {
        //mostrar mensagem de erro
        errorInput(desc, "Campo obrigatório.")
    } else if (descValue.length <30) {
        errorInput(desc, "Descrição muito curta!");
    } else {
        const formItem = desc.parentElement;
        formItem.className = "input-box";
    }
};

// function checkInputAreaSelection() {
//     const areaSelectionValue = areaSelection.value;

//     if(areaSelectionValue === "") {
//         //mostrar mensagem de erro
//         errorInput(areaSelection, "Campo obrigatório.")
//     } else {
//         const formItem = areaSelection.parentElement;
//         formItem.className = "input-box";
//     }
// };

// function checkInputColabSelection() {
//     const colabSelectionValue = colabSelection.value;

//     if(colabSelectionValue === "") {
//         //mostrar mensagem de erro
//         errorInput(colabSelection, "Campo obrigatório.")
//     } else {
//         const formItem = colabSelection.parentElement;
//         formItem.className = "input-box";
//     }
// };

function checkForm() {
    checkInputTitle();
    checkInputEmail();
    checkInputTelefone()
    checkInputDesc();
    // checkInputAreaSelection();
    // checkInputColabSelection();

    const formItems = form.querySelectorAll(".input-box");

    const isValid = [...formItems].every( (item) => {
        return item.className === "input-box"
    });

    if (isValid) {
        alert("Cadastrado com sucesso!");
        title.value = "";
        email.value = "";
        telefone.value = "";
        desc.value = "";
        areaSelection.value = "";
        colabSelection.value = "";
    } 
    // else {
    //     alert("Preencha todos os campos corretamente.")
    // }
    ;
};

function errorInput(input, message) {
    const formItem = input.parentElement;
    const textMessage = formItem.querySelector("a");

    textMessage.innerText = message;

    formItem.className = "input-box error";
};