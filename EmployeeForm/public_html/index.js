//get all the required element on the page.

const empId = document.getElementById("empId");
const empName = document.getElementById("empName");
const salary = document.getElementById("salary");
const hra = document.getElementById("hra");
const da = document.getElementById("da");
const deduction = document.getElementById("deduction");

const saveBtn = document.getElementById("saveBtn");
const changeBtn = document.getElementById("changeBtn");
const resetBtn = document.getElementById("resetBtn");

const employeeForm = document.getElementById("employeeForm");

// db specificification

const token = "90935220|-31949242426247565|90958840";
const dbName = "EMP-DB";
const relationName = "EmpData";
const baseURL = "http://api.login2explore.com:5577";
const retrievURL = "/api/irl";
const manupulationURL = "/api/iml";

//on page load

window.onload = function () {
  if (employeeForm.value === null) return;
  resetForm();
};

//reset form

function resetForm() {
  employeeForm.reset();

  empId.disabled = false;

  empName.disabled = true;
  salary.disabled = true;
  hra.disabled = true;
  da.disabled = true;
  deduction.disabled = true;

  saveBtn.disabled = true;
  changeBtn.disabled = true;
  resetBtn.disabled = true;

  empId.focus();
}

//enable input fields.

function enableFields() {
  empName.disabled = false;
  salary.disabled = false;
  hra.disabled = false;
  da.disabled = false;
  deduction.disabled = false;
}

//validate form

function validateForm() {
  if (empId.value === "") {
    alert("Employee ID Required");
    empId.focus();
    return false;
  }

  if (empName.value === "") {
    alert("Employee Name Required");
    empName.focus();
    return false;
  }

  if (salary.value === "") {
    alert("Salary Required");
    salary.focus();
    return false;
  }

  if (hra.value === "") {
    alert("HRA Required");
    hra.focus();
    return false;
  }

  if (da.value === "") {
    alert("DA Required");
    da.focus();
    return false;
  }

  if (deduction.value === "") {
    alert("Deduction Required");
    deduction.focus();
    return false;
  }

  return true;
}

//find employee by id
function findEmployeeByID(employeeId) {
  
  console.log(employeeId);
  if (employeeId === "") {
    return null;
  }
  const jsonObj = JSON.stringify({
    id: employeeId,
  });
  $.ajaxSetup({
    async: false,
  });
  const getByKey = createGET_BY_KEYRequest(
    token,
    dbName,
    relationName,
    jsonObj,
    true,
    true,
  );
  let res = executeCommandAtGivenBaseUrl(getByKey, baseURL, retrievURL);
  
  $.ajaxSetup({
    async: false,
  });
  
  return res
}
//check employee id

empId.addEventListener("change", function () {
const employeeId = empId.value
  console.log(employeeId);
  if (employeeId === "") {
    return;
  }
  const res = findEmployeeByID(employeeId)
  saveBtn.disabled = false;
  resetBtn.disabled = false;

  empName.focus();
  /* if data is found
  * Employee exist the data d
  */
  if (res.status === 200) {
    let data = JSON.parse(res.data);
    empName.value = data.record.name;
    salary.value = data.record.salary;
    hra.value = data.record.hra;
    da.value = data.record.da;
    deduction.value = data.record.deduction;

    enableFields();

    empId.disabled = true;
    saveBtn.disabled = true;
    changeBtn.disabled = false;
    resetBtn.disabled = false;

    empName.focus();
  } else {
    /*
     * Employee data is not in db
     */
    changeBtn.disabled = true;
  }
});

// save button

saveBtn.addEventListener("click", function () {
  if (!validateForm()) {
    return;
  }

  const employeeData = {
    id: empId.value,
    name: empName.value,
    salary: salary.value,
    hra: hra.value,
    da: da.value,
    deduction: deduction.value,
  };

  const putReqObj = createPUTRequest(
    token,
    JSON.stringify(employeeData),
    dbName,
    relationName,
  );

  // API CALL
  $.ajaxSetup({
    async: false,
  });
  let res = executeCommandAtGivenBaseUrl(putReqObj, baseURL, manupulationURL);
  $.ajaxSetup({
    async: true,
  });
  //   console.log();

  if (res.status === 200) {
    alert("Data Inserted Successfully.");
  } else {
    alert("Failed To Insert Data.");
  }

  resetForm();
});

// change button

changeBtn.addEventListener("click", function () {
  if (!validateForm()) {
    return;
  }

  const updatedData = {
    id: empId.value,
    name: empName.value,
    salary: salary.value,
    hra: hra.value,
    da: da.value,
    deduction: deduction.value,
  };

  console.log(updatedData);

  // api call for update
  $.ajaxSetup({
    async: false,
  });
  //get the record id
  
  JSON.stringify(updatedData);
  let res = findEmployeeByID(updatedData.id)
  console.log(res)
  const data = JSON.parse(res.data)
  console.log(data)
  let updateReq = createUPDATERecordRequest(token, updatedData, dbName, relationName, data.rec_no);
  $.ajaxSetup({
    async: true,
  });
  //create update request.
    res = executeCommandAtGivenBaseUrl(updateReq, baseURL, manupulationURL);
  console.log(res);
  alert("Data Updated Successfully");

  resetForm();
});

// reset button

resetBtn.addEventListener("click", function () {
  resetForm();
});
