// ---------------- ALL INPUT ELEMENTS ----------------

const projectId = document.getElementById("projectId");
const projectName = document.getElementById("projectName");
const assignedTo = document.getElementById("assignedTo");
const assignmentDate = document.getElementById("assignmentDate");
const deadline = document.getElementById("deadline");

// ---------------- BUTTONS ----------------

const saveBtn = document.getElementById("saveBtn");
const updateBtn = document.getElementById("updateBtn");
const resetBtn = document.getElementById("resetBtn");

const projectForm = document.getElementById("projectForm");

// db specificification

const token = "90935220|-31949242426247565|90958840";

const dbName = "COLLEGE-DB";
const relationName = "PROJECT-TABLE";

const baseURL = "http://api.login2explore.com:5577";

const imlURL = "/api/iml";
const irlURL = "/api/irl";

//page load

window.onload = function () {
    resetForm();
};

//reset form

function resetForm() {

    projectForm.reset();

    projectId.disabled = false;

    projectName.disabled = true;
    assignedTo.disabled = true;
    assignmentDate.disabled = true;
    deadline.disabled = true;

    saveBtn.disabled = true;
    updateBtn.disabled = true;
    resetBtn.disabled = true;

    projectId.focus();
}

// enable fields

function enableFields() {

    projectName.disabled = false;
    assignedTo.disabled = false;
    assignmentDate.disabled = false;
    deadline.disabled = false;
}

//validate form

function validateForm() {

    if (projectId.value === "") {
        alert("Project ID Required");
        projectId.focus();
        return false;
    }

    if (projectName.value === "") {
        alert("Project Name Required");
        projectName.focus();
        return false;
    }

    if (assignedTo.value === "") {
        alert("Assigned To Required");
        assignedTo.focus();
        return false;
    }

    if (assignmentDate.value === "") {
        alert("Assignment Date Required");
        assignmentDate.focus();
        return false;
    }
    //assignment date
    if (deadline.value === "") {
        alert("Deadline Required");
        deadline.focus();
        return false;
    }
    const assignDate = new Date(assignmentDate.value);
    const deadLineDate = new Date(deadline.value);

    if (assignDate > deadLineDate) {

        alert("Assignment Date cannot be greater than Deadline");

        assignmentDate.focus();

        return false;
    }

    return true;
}

// check project id

projectId.addEventListener("change", function () {

    let pid = projectId.value;

    if (pid === "") {
        return;
    }

    const jsonObj = JSON.stringify({
        "Project-ID": pid
    });

    const getRequest = createGET_BY_KEYRequest(
        token,
        dbName,
        relationName,
        jsonObj,
        true,
        true
    );

    $.ajaxSetup({
        async: false
    });

    let res = executeCommandAtGivenBaseUrl(
        getRequest,
        baseURL,
        irlURL
    );

    $.ajaxSetup({
        async: true
    });

    // record not found

    if (res.status === 400) {

        enableFields();

        saveBtn.disabled = false;
        resetBtn.disabled = false;

        projectName.focus();
    }

    // record found

    else if (res.status === 200) {

        let data = JSON.parse(res.data);

        let record = data.record;

        projectName.value = record["Project-Name"];
        assignedTo.value = record["Assigned-To"];
        assignmentDate.value = record["Assignment-Date"];
        deadline.value = record["Deadline"];

        enableFields();

        projectId.disabled = true;

        updateBtn.disabled = false;
        resetBtn.disabled = false;

        projectName.focus();
    }
});

// save btn

saveBtn.addEventListener("click", function () {

    if (!validateForm()) {
        return;
    }

    const jsonObj = JSON.stringify({

        "Project-ID": projectId.value,
        "Project-Name": projectName.value,
        "Assigned-To": assignedTo.value,
        "Assignment-Date": assignmentDate.value,
        "Deadline": deadline.value
    });

    const putRequest = createPUTRequest(
        token,
        jsonObj,
        dbName,
        relationName
    );

    $.ajaxSetup({
        async: false
    });

    let res = executeCommandAtGivenBaseUrl(
        putRequest,
        baseURL,
        imlURL
    );

    $.ajaxSetup({
        async: true
    });

    if (res.status === 200) {
        alert("Project Saved Successfully");
    } else {
        alert("Unable To Save Project");
    }

    resetForm();
});

// update btn
updateBtn.addEventListener("click", function () {

    if (!validateForm()) {
        return;
    }

    const jsonObj = JSON.stringify({

        "Project-ID": projectId.value,
        "Project-Name": projectName.value,
        "Assigned-To": assignedTo.value,
        "Assignment-Date": assignmentDate.value,
        "Deadline": deadline.value
    });

    const updateRequest = createUPDATERecordRequest(
        token,
        jsonObj,
        dbName,
        relationName,
        projectId.value
    );

    $.ajaxSetup({
        async: false
    });

    let res = executeCommandAtGivenBaseUrl(
        updateRequest,
        baseURL,
        imlURL
    );

    $.ajaxSetup({
        async: true
    });

    if (res.status === 200) {
        alert("Project Updated Successfully");
    } else {
        alert("Unable To Update Project");
    }

    resetForm();
});

//Reset button

resetBtn.addEventListener("click", function () {
    resetForm();
});