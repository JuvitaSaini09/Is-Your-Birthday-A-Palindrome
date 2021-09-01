const buttonTocheckPalindrome=document.querySelector("#check-btn")
const bdayDate=document.querySelector("#bday-date")
const result=document.querySelector("#result")


function Ispalindrome(stringg) {
    var strSplitted = stringg.split('');
    var strReversed = strSplitted.reverse();
    var strjoined = strReversed.join('');
    return stringg === strjoined;
}


    var date = {
    day: 31,
    month: 1,
    year: 2020
}





function dateToString(dateToString) {
    var array = {
        day: '',
        month: '',
        year: ''
    };

    if (dateToString.day < 10) {
        array.day = '0' + dateToString.day;
    } else {
        array.day = dateToString.day.toString();

    }
    if (dateToString.month < 10) {
        array.month = '0' + dateToString.month;
    } else {
        array.month = dateToString.month.toString();
    }
    array.year = dateToString.year.toString();
    return array;
}





function CombineDateInAllFormat(date) {
    var ddmmyyyy = date.day + date.month + date.year;
    var mmddyyyy = date.month + date.day + date.year;
    var yyyyddmm = date.year + date.day + date.month;
    var ddmmyy = date.day + date.month + date.year.slice(-2);
    var mmddyy = date.month + date.day + date.year.slice(-2)
    var yymmdd = date.year.slice(-2) + date.month + date.day;
    return [ddmmyyyy, mmddyy, yyyyddmm, ddmmyy, mmddyy, yymmdd];
}





function IsAllFormatsOfDateAPalindrome(date) {
    var Datee = (CombineDateInAllFormat(dateToString(date)));
    var flag = false;

    for (var i = 0; i < Datee.length; i++) {
        if (Ispalindrome(Datee[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}

function isLeapYear(year) {

    if (year % 400 === 0)
        return true;

    if (year % 100 === 0)
        return false;

    if (year % 4 === 0)
        return true;

    return false;
}


function calculateNextDate(date) {

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    var day = date.day;
    var month = date.month;
    var year = date.year;
    day++;

    if (month === 2) {

        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month = 3;
            }
        } else {
            if (day > 28) {
                day = 1;
                month = 3;
            }
        }
    } else if (month === 12) {
        day = 1;
        month = 1;
        year++;

    }
     else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

        return {
            day: day,
            month: month,
            year: year
        }

    }
    function findNextPalindromeDate(date){
        var count=0;
        var nextdate=calculateNextDate(date);
        while(1){
            count++;
           if(IsAllFormatsOfDateAPalindrome(nextdate))
           {
               break;
           }
           nextdate=calculateNextDate(nextdate);
        }
      return [count,nextdate];
    }

    function OnclickHandler()
        {   result.style.display="none"
            if((bdayDate.value)!==''){
                console.log(bdayDate.value)
                /*
                var NextPalindromeDate=(findNextPalindromeDate(bdayDate));
    console.log(NextPalindromeDate[0])
    console.log(NextPalindromeDate[1])
    */

            }
            else{
                result.style.display="block"
                result.innerText="Enter a date !!"
            }
        }
    
    buttonTocheckPalindrome.addEventListener("click",OnclickHandler)
