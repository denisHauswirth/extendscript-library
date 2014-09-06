/**
 * function who format a date
 * @return Date format yyyy-mm-dd
 */
Date.prototype.year_month_day = function() {
    var _year = this.getFullYear();
    var _month = this.getMonth() + 1;
    if (_month.toString().length == 1) _month = "0" +_month;
    var _day = this.getDate();
    if (_day.toString().length == 1) _day = "0" +_day;
    return _year + "-" + _month + "-" + _day;
}


/**
 * function who format time
 * @return Date time hh-mm-ss
 */
Date.prototype.hours_minutes_seconds = function() {
    var _hours = this.getHours();
    if (_hours.toString().length == 1) _hours= "0" +_hours;
    var _minutes = this.getMinutes();
    if (_minutes.toString().length == 1) _minutes= "0" +_minutes;
    var _seconds = this.getSeconds();
    if (_seconds.toString().length == 1) _seconds = "0" +_seconds;
    return _hours + "-" + _minutes + "-" + _seconds;
}