/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function createEmployeeRecord(array){
    const [firstName, familyName, title, payPerHour] = array;
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents : [],
        timeOutEvents : []
    }
}

function createEmployeeRecords(array){
    return array.map(createEmployeeRecord)
}

let createTimeInEvent = function(dateStamp){

    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })

    return this
}

let createTimeOutEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ')  
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })

    return this
}

let hoursWorkedOnDate = function(date){
    
    let inEvent = this.timeInEvents.find(function(e){
        return e.date === date
    })
    let outEvent = this.timeOutEvents.find(function(e){
        return e.date === date
    })
    return (outEvent.hour - inEvent.hour) / 100
}

let  wagesEarnedOnDate = function(date) {
    let wages = this.payPerHour * hoursWorkedOnDate.call(this, date)
    return wages
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(empObj){
        return empObj.firstName === firstName
    })
 }

let calculatePayroll = function(srcArray){
    return srcArray.reduce(function(memo, empObj) {
        return memo + allWagesFor.call(empObj)
    }, 0)
}