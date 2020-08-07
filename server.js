/*
    author: Zach Brown
    professor: Bryan French
    assignment: Project 3
    file: server.js
    function: Functionality for REST calls and node config
*/

//require statements
//express
//moment (date validation) https://www.npmjs.com/package/moment
//Link business layer with module exports
var express = require("express");
var dateVal = require("moment");
var business = require("./businessLayer.js")
var app = express();

app.use(express.json());
var urlencodedParser = app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || process.env.NODE_PORT || 3000;

//DataLayer to require companydata/index.js and create RIT user
var DataLayer = require("./companydata/index.js");
var dl = new DataLayer("zab5957");
var response = "";

//DELETE company
app.delete('/CompanyServices/company', function(req, res, next) {
    try {
        company = req.query.company;
        dl = new DataLayer(company);
        var row = dl.deleteCompany(company);
        if (row <= 0){
            response = {error:"Company not found."};
        } else {
            response = {success:company+"'s info deleted."};
        }
     } catch (e) {
        response = {error:"Error in deletion."};
     } finally {
     }  
    res.send(JSON.stringify(response));
});

// GET departments 
app.get('/CompanyServices/departments', function(req, res, next) {
    try{
        company = req.query.company;
        dl = new DataLayer(company);
        var departments = dl.getAllDepartment(company);
        var d_list = [];
        for(let d of departments ){    	  
            dept = {
                dept_id:d.getId(),
                company:d.getCompany(),
                dept_name:d.getDeptName(),
                dept_no:d.getDeptNo(),
                location:d.getLocation()
            }
            d_list.push(dept)
        }
        response = d_list;
    } catch (e){
        response = {error: "departments error."};
    } finally {
    } 
    res.send(JSON.stringify(response));
});

// GET department 
app.get('/CompanyServices/department', function(req, res, next) {
    try{
        company = req.query.company;
        dept_id = req.query.dept_id;
        dl = new DataLayer(company);
        if(business.checkIfDeptidExist(dept_id) == true){
            var d = dl.getDepartment(company,dept_id);  
            response = {
                    dept_id:d.getId(),
                    company:d.getCompany(),
                    dept_name:d.getDeptName(),
                    dept_no:d.getDeptNo(),
                    location:d.getLocation()
            }
        } else {
            response = {error: "dept_id not found."}
        }
    } catch (e){
        response = {error: "department dept_id error: "+dept_id+"."};
    } finally {
    } 
    res.send(JSON.stringify(response));
});

// POST department 
app.post('/CompanyServices/department', function(req, res, next) {
    try{
        var company = req.body.company;
        var dept_name = req.body.dept_name;
        var dept_no = business.checkIfDeptnoUnique(req.body.dept_no);
        var location = req.body.location;
        dl = new DataLayer(company);
        var d = new dl.Department(company,dept_name,dept_no,location);
        d = dl.insertDepartment(d);
        if (d.getId()>0){
            response = 
            {
                sucess:
                {
                dept_id:d.getId(),
                company:d.getCompany(),
                dept_name:d.getDeptName(),
                dept_no:d.getDeptNo(),
                location:d.getLocation()
                }
            };
        } else {
            response = {error:"Department not inserted."};
        }
        
    } catch (e){
        response = {error:"Cannot insert department."};
    } finally {
    }  
    res.send(JSON.stringify(response));
});

// PUT department 
app.put('/CompanyServices/department', function(req, res, next) {
    try{
        var company = req.body.company;
        var dept_id = parseInt(req.body.dept_id);
        var company = req.body.company;
        var dept_name = req.body.dept_name;
        var dept_no = business.checkIfDeptnoUniquePut(req.body.dept_no,dept_id);
        var location = req.body.location;
        dl = new DataLayer(company);
        if(business.checkIfDeptidExist(dept_id) == true){
            var dept = dl.getDepartment(company,dept_id);         
            dept.setDeptName(dept_name);
            dept.setDeptNo(dept_no);
            dept.setLocation(location);
   	        var d = dl.updateDepartment(dept);
            response =
            {
                sucess:
                {
                    dept_id:d.getId(),
                    company:d.getCompany(),
                    dept_name:d.getDeptName(),
                    dept_no:d.getDeptNo(),
                    location:d.getLocation()
                }
            };
        } else {
            response = {error: "dept_id not found."}
        }
    } catch (e){
        response = {error:"Cannot update department."};
    } finally {
    }  
    res.send(JSON.stringify(response));
});

// DELETE department 
app.delete('/CompanyServices/department', function(req, res, next) {
    try {
        company = req.query.company;
        dept_id = req.query.dept_id;
        dl = new DataLayer(company);
        var row = dl.deleteDepartment(company,dept_id);
        if (row <= 0){
            response = {error:"Error with Database."};
        } else {
            response = {success:"Department "+dept_id+" from "+company+" is deleted."};
        }
     } catch (e) {
        response = {error:"Error in deletion."};
     } finally {
     }  
    res.send(JSON.stringify(response));
});

// GET employees 
app.get('/CompanyServices/employees', function(req, res, next) {
    try{
        company = req.query.company;
        dl = new DataLayer(company);
        var employees = dl.getAllEmployee(company);
        var e_list = [];
        for(let e of employees ){    	  
            emp = {
                emp_id:e.getId(),
                emp_name:e.getEmpName(),
                emp_no:e.getEmpNo(),
                hire_date:e.getHireDate(),
                job:e.getJob(),
                salary:e.getSalary(),
                dept_id:e.getDeptId(),
                mng_id:e.getMngId()
            };
            e_list.push(emp);
        }
        response = e_list;
    } catch (e){
        response = {error: "employees not found."};
    } finally {
    } 
    res.send(response);
});

// GET employee
app.get('/CompanyServices/employee', function(req, res, next) {
     try{
        company = req.query.company;
        emp_id = parseInt(req.query.emp_id);
        dl = new DataLayer(company);
        if(business.checkIfEmpidExist(emp_id) == true){
            var e = dl.getEmployee(emp_id); 
            response = {
                emp_id:e.getId(),
                emp_name:e.getEmpName(),
                emp_no:e.getEmpNo(),
                hire_date:e.getHireDate(),
                job:e.getJob(),
                salary:e.getSalary(),
                dept_id:e.getDeptId(),
                mng_id:e.getMngId()
            };
        } else {
            response = {error:"emp_id not found."}
        }
    } catch (e){
        response = {error: "emp_id error with: "+emp_id+"."};
    } finally {
    } 
    res.send(JSON.stringify(response));
});

//POST employee
app.post('/CompanyServices/employee', function(req, res, next) {
    try{
        var company = req.body.company;
        var emp_name = req.body.emp_name;
        var emp_no = business.checkIfEmpnoUnique(req.body.emp_no);
        var hire_date = req.body.hire_date;
        var job = req.body.job;
        var salary = parseFloat(req.body.salary);
        var dept_id = parseInt(req.body.dept_id);
        var mng_id = parseInt(req.body.mng_id);
        if(!business.checkIfEmpidExist(mng_id)){
            mng_id = 0;
        }
        
        //Check hire_date
        if(!business.checkDateValidate(hire_date)){
            response = {error:"hire_date must be a valid date equal to the current date or earlier."};
        }
        else if(!business.checkDayOfWeek(hire_date)){
            response = {error:"hire_date must be a weekday."};
        }
        else if(business.checkIfCompany(company) && business.checkIfDeptidExist(dept_id)){
            dl = new DataLayer(company);

            var e = dl.insertEmployee(new dl.Employee(emp_name,emp_no,hire_date,job,salary,dept_id,mng_id));
            response = 
            {
                sucess:
                {
                    emp_id:e.getId(),
                    emp_name:e.getEmpName(),
                    emp_no:e.getEmpNo(),
                    hire_date:e.getHireDate(),
                    job:e.getJob(),
                    salary:e.getSalary(),
                    dept_id:e.getDeptId(),
                    mng_id:e.getMngId()
                }
            };
        } else {
            response = {error:"deptId not found."};
        }
        
    } catch (e){
        response = {error:"Cannot insert employee."};
    } finally {
    }  
    res.send(JSON.stringify(response));
});

//PUT employee
app.put('/CompanyServices/employee', function(req, res, next) {
    try{
        var company = req.body.company;
        var emp_name = req.body.emp_name;
        var emp_id = parseInt(req.body.emp_id);
        var emp_no = business.checkIfEmpnoUniquePut(req.body.emp_no,emp_id);
        var hire_date = req.body.hire_date;
        var job = req.body.job;
        var salary = parseFloat(req.body.salary);
        var dept_id = parseInt(req.body.dept_id);
        var mng_id = parseInt(req.body.mng_id);
        if(!business.checkIfEmpidExist(mng_id)){
            mng_id = 0;
        } 
        if(!business.checkIfEmpidExist(emp_id)){
            response = {error:"emp_id not found."};
        } 
        //Check hire_date 
        else if(!business.checkDateValidate(hire_date)){
            response = {error:"hire_date must be a valid date equal to the current date or earlier."};
        }
        else if(!business.checkDayOfWeek(hire_date)){
            response = {error:"hire_date must be a weekday."};
        }
        else if(business.checkIfCompany(company) && business.checkIfDeptidExist(dept_id)){
            dl = new DataLayer(company);
            var e = dl.getEmployee(emp_id);
            e.setEmpName(emp_name);
            e.setEmpNo(emp_no);
            e.setHireDate(hire_date);
            e.setJob(job);
            e.setSalary(salary);
            e.setDeptId(dept_id);
            e.setMngId(mng_id);
            e = dl.updateEmployee(e);
            response = 
            {
                sucess:
                {
                    emp_id:e.getId(),
                    emp_name:e.getEmpName(),
                    emp_no:e.getEmpNo(),
                    hire_date:e.getHireDate(),
                    job:e.getJob(),
                    salary:e.getSalary(),
                    dept_id:e.getDeptId(),
                    mng_id:e.getMngId()
                }
            };
        } else {
            response = {error: "dept_id not found."}
        }
    } catch (e){
        response = {error:"Cannot update employee."};
    } finally {
    }  
    res.send(JSON.stringify(response));
});

// DELETE employee
app.delete('/CompanyServices/employee', function(req, res, next) {
    try {
        company = req.query.company;
        emp_id = req.query.emp_id;
        dl = new DataLayer(company);
        var row = dl.deleteEmployee(emp_id);
        if (row <= 0){
            response = {error:"emp_id not found."};
        } else {
            response = {success:"Employee "+emp_id+" is deleted."};
        }
    } catch (e) {
        response = {error:"Cannot delete."};
    } finally {
    }  
    res.send(JSON.stringify(response));
});

// GET timecards
app.get('/CompanyServices/timecards', function(req, res, next) {
    try{
        company = req.query.company;
        emp_id = req.query.emp_id;
        dl = new DataLayer(company);
        if(!business.checkIfEmpidExist(emp_id)){
            var timecards = dl.getAllTimecard(emp_id);
            var t_list = [];
            for(let t of timecards ){    	  
                timecard = {
                timecard_id:t.getId(),
                start_time:t.getStartTime(),
                end_time:t.getEndTime(),
                emp_id:t.getEmpId()
                };
                t_list.push(timecard);
            }
            response = t_list;
        } else {
            response = {error: "emp_id not found."};
        }
    } catch (e){
        response = {error: "Cannot get timecards."};
    } finally {
    } 
    res.send(response);
});

// GET timecard
app.get('/CompanyServices/timecard', function(req, res, next) {
    try{
        company = req.query.company;
        timecard_id = parseInt(req.query.timecard_id);
        dl = new DataLayer(company);
        if(business.checkIfTimeidExist(timecard_id)){
            var t = dl.getTimecard(timecard_id); 
            response = {
                timecard_id:t.getId(),
                start_time:t.getStartTime(),
                end_time:t.getEndTime(),
                emp_id:t.getEmpId()
            };
        } else {
            response = {error:"timecard_id not found."}
        }
    } catch (e){
        response = {error: "Cannot get timecard with timecard_id: "+timecard_id+"."};
    } finally {
    } 
    res.send(JSON.stringify(response));
});

// POST timecard
app.post('/CompanyServices/timecard', function(req, res, next) {
    try{
        var company = req.body.company;
        var start_time = req.body.start_time;
        var end_time = req.body.end_time;
        var emp_id = parseInt(req.body.emp_id);
        
        //Error check start_time and end_time
        if(!business.checkDateValidate(start_time)){
            response = {error:"Not valid start_time: must be a valid date equal to the current date or earlier."};
        }
        else if(!business.checkIfDayRange(start_time)){
            response = {error:"Not valid start_time: value must be later than a week of starting day."};
        }
        else if(!business.checkDayOfWeek(start_time)){
            response = {error:"Not valid start_time: value has to be a weekday."};
        }
        else if(!business.checkIfTimeRange(start_time)){
            response = {error:"Not valid start_time: cannot be earlier than 6:00 and cannot later than 17:00"};
        }
        else if(!business.checkIfTimeEnd(end_time)){
            response = {error:"Not valid end_time: cannot be earlier than 7:00 and cannot later than 18:00"};
        }
        else if(!business.checkIfTimeDiff(start_time,end_time)){
            response = {error:"Not valid end_time: End time must be at least 1 hour greater than the start_time"};
        }
        else if(!business.checkIfDateDiff(start_time,end_time)){
            response = {error:"Not valid end_time: has to be on the same day as the start date."};
        } 
        else if(!business.checkIfEmpTimeDiff(emp_id,start_time)){
            response = {error:"Not valid start_time: cannot the same day as other timecard"};
        }
        else if(business.checkIfCompany(company) && business.checkIfEmpidExist(emp_id)){
            dl = new DataLayer(company);
            var time = new dl.Timecard(start_time,end_time,emp_id);
            var t = dl.insertTimecard(time);
            response = 
            {
                sucess:
                {
                    timecard_id:t.getId(),
                    start_time:t.getStartTime(),
                    end_time:t.getEndTime(),
                    emp_id:t.getEmpId()
                }
            };
        
        } else {
            response = {error:"emp_id not found."};
        }
        
    } catch (e){
        response = {error:"Cannot insert timecard."};
    } finally {
    }  
    res.send(JSON.stringify(response));
});

// PUT timecard
app.put('/CompanyServices/timecard', function(req, res, next) {
    try{
        var company = req.body.company;
        var timecard_id = req.body.timecard_id;
        var start_time = req.body.start_time;
        var end_time = req.body.end_time;
        var emp_id = parseInt(req.body.emp_id);
        if(!business.checkIfTimeidExist(timecard_id)){
            response = {error:"timecard_id not found."};
        }
        //Error checking for start_time and end_time
        else if(!business.checkDateValidate(start_time)){
            response = {error:"Not valid start_time: must be a valid date equal to the current date or earlier."};
        }
        else if(!business.checkIfDayRange(start_time)){
            response = {error:"Not valid start_time: value must be later than a week of starting day."};
        }
        else if(!business.checkDayOfWeek(start_time)){
            response = {error:"Not valid start_time: value has to be a weekday."};
        }
        else if(!business.checkIfTimeRange(start_time)){
            response = {error:"Not valid start_time: cannot be earlier than 6:00 and cannot later than 17:00"};
        }
        else if(!business.checkIfTimeEnd(end_time)){
            response = {error:"Not valid end_time: cannot be earlier than 7:00 and cannot later than 18:00"};
        }
        else if(!business.checkIfTimeDiff(start_time,end_time)){
            response = {error:"Not valid end_time: End time must be at least 1 hour greater than the start_time"};
        }
        else if(!business.checkIfDateDiff(start_time,end_time)){
            response = {error:"Not valid end_time: must be on the same day as the start date."};
        } 
        else if(!business.checkIfEmpTimeDiffPut(emp_id,start_time,timecard_id)){
            response = {error:"Not valid start_time: cannot be the same day as other timecard"};
        }
        else if(business.checkIfCompany(company) && business.checkIfEmpidExist(emp_id)){
            dl = new DataLayer(company);
            var time = dl.getTimecard(timecard_id);
            time.setEmpId(emp_id);
            time.setStartTime(start_time);
            time.setEndTime(end_time);
   	        var t = dl.updateTimecard(time);   
            response = 
            {
                sucess:
                {
                    timecard_id:t.getId(),
                    start_time:t.getStartTime(),
                    end_time:t.getEndTime(),
                    emp_id:t.getEmpId()
                }
            };
        
        } else {
            response = {error:"emp_id not found."};
        }
    } catch (e){
        response = {error:"Cannot update this timecard."};
    } finally {
    }  
    res.send(JSON.stringify(response));
});

// DELETE timecard
app.delete('/CompanyServices/timecard', function(req, res, next) {
    try {
        company = req.query.company;
        timecard_id = req.query.timecard_id;
        dl = new DataLayer(company);
        var row = dl.deleteTimecard(timecard_id);
        if (row <= 0){
            response = {error:"timecard_id not found."};
        } else {
            response = {success:"Timecard "+timecard_id+" is deleted."};
        }
    } catch (e) {
        response = {error:"Error in deletion."};
    } finally {
    }  
    res.send(JSON.stringify(response));
});

//listen to port 3000
var server = app.listen(3000,function(){
    var host = server.address().address;
    var port = server.address().port;
});

//Show connection
console.log(`Listening on 127.0.0.1: ${port}`);

//module exports in business layer