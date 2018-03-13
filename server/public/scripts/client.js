console.log('js');

let annualSalaryTotal = 0;

class Employee {
  constructor(firstNameIn, lastNameIn, idNumberIn, jobTitleIn, annualSalaryIn, empGUIDIn, deleteButtonIn) {
    this.firstName = firstNameIn;
    this.lastName = lastNameIn;
    this.idNumber = idNumberIn;
    this.jobTitle = jobTitleIn;
    this.annualSalary = annualSalaryIn;
    this.empGUID = empGUIDIn;
    this.deleteButton = deleteButtonIn;
  }

  toHTML() {
    let result = '<tr>';
    result += '<td>' + this.firstName + '</td>';
    result += '<td>' + this.lastName + '</td>';
    result += '<td>' + this.idNumber + '</td>';
    result += '<td>' + this.jobTitle + '</td>';
    result += '<td>' + this.annualSalary + '</td>';
    result += '<td>' + this.deleteButton + '</td>';
    result += '</tr>';
    return result;

  }//end toHTML
}

employeeArray = [];

$(document).ready(readyNow);  //wait for doc to be ready before loading readyNow

//initiates event handlers
function readyNow () {
  $('#submitButton').on('click', submitButtonOnClick);
  $('#employeeTable').on('click', '.deleteEmployeeButton', deleteEmployeeButtonOnClick);
  }//end readyNow

//sends new employee to employeeArray and adds employee to table
function submitButtonOnClick() {
    console.log('in submitButtonOnClick');
    employeeEntered = new Employee;
    employeeEntered.firstName = $('#firstNameInput').val();
    $('#firstNameInput').val('');
    employeeEntered.lastName = $('#lastNameInput').val();
    $('#lastNameInput').val('');
    employeeEntered.idNumber = $('#idNumberInput').val();
    $('#idNumberInput').val('');
    employeeEntered.jobTitle = $('#jobTitleInput').val();
    $('#jobTitleInput').val('');
    employeeEntered.annualSalary = parseInt($('#annualSalaryInput').val());
    $('#annualSalaryInput').val('');
    let newGUID = generateGUID();
    employeeEntered.empGUID = newGUID;
    employeeEntered.deleteButton = '<button class="deleteEmployeeButton" value="'
                                    + newGUID + '">Delete</button>';

    employeeArray.push(employeeEntered);

    $('#employeeTable').append(employeeEntered.toHTML());
    // $('#employeeTable').append('<tr><td>' + employeeEntered.firstName +
    //                            '</td><td>' + employeeEntered.lastName +
    //                            '</td><td>' + employeeEntered.idNumber +
    //                            '</td><td>' + employeeEntered.jobTitle +
    //                            '</td><td>' + employeeEntered.annualSalary +
    //                            '</td><td>' + employeeEntered.deleteButton +
    //                            '</td></tr>');
    updateAnnualSalaryTotal ();
    $('#annualSalaryTotalDisplay').empty();
    $('#annualSalaryTotalDisplay').append('Total Monthly: $' + (annualSalaryTotal/12).toFixed(2));
    if ((annualSalaryTotal/12) > 20000) {
      console.log('monthly total over 20000');
      $('#annualSalaryTotalDisplay').css("background-color", "red");
    }//end annualSalaryTotal if
}//end submitButtonOnClick

//removes employee from table, and calls deleteEmployeeFromEmployeeArray
function deleteEmployeeButtonOnClick () {
    let empGUIDIn = $(this).val();
    deleteEmployeeFromEmployeeArray (empGUIDIn);
    // $(this).closest('tr').remove();
    $(this).parent().parent().remove();
    updateAnnualSalaryTotal();
    $('#annualSalaryTotalDisplay').empty();
    $('#annualSalaryTotalDisplay').append('Total Monthly: $' + (annualSalaryTotal/12).toFixed(2));
    if ((annualSalaryTotal/12) <= 20000) {
      $('#annualSalaryTotalDisplay').css("background-color", "white");
    }//end annualSalaryTotal if
}//end deleteEmployeeButtonOnClick

//generates GUID - haven't made this protect against duplicate entries yet, but it's unlikely.
function generateGUID () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  let guidToReturn = s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  return guidToReturn;
}//end generateGUID

function updateAnnualSalaryTotal () {
  annualSalaryTotal = 0;
  for (let emp of employeeArray) {
    annualSalaryTotal += emp.annualSalary;
  }
}//end updateAnnualSalary

function deleteEmployeeFromEmployeeArray (empGUIDIn) {
  if (employeeArray.length === 1 ){
    employeeArray = [];
  }//end employeeArray.length if
  else {
    for (i = 0; i < employeeArray.length; i++) {
    if (employeeArray[i].empGUID === empGUIDIn) {
      console.log('empGUIDIn: ' + empGUIDIn);
      console.log('found a match, employeeArray[i].empGUID: ' + employeeArray[i].empGUID);
      employeeArray.splice(i, 1);
    }//end if employeeArray.splice
    }//end for
  }//end else
  // updateAnnualSalaryTotal();
  console.log(annualSalaryTotal);
}//end deleteEmployeeFromEmployeeArray
