const buttonTocheckPalindrome = document.querySelector("#check-btn")
const bdayDate = document.querySelector("#bday-date")
const result = document.querySelector("#result")
const loadingImage=document.querySelector("#loading-image");
loadingImage.style.display="none";

function Ispalindrome(stringg) {
    var strSplitted = stringg.split('');
    var strReversed = strSplitted.reverse();
    var strjoined = strReversed.join('');
    return stringg === strjoined;
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

    } else {
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

function findNextPalindromeDate(date) {
    var count = 0;
    var nextdate = calculateNextDate(date);
    while (1) {
        count++;
        if (IsAllFormatsOfDateAPalindrome(nextdate)) {
            break;
        }
        nextdate = calculateNextDate(nextdate);
    }
    return [count, nextdate];
}

function calculatePreviousDate(date) {

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] //0-11
    var day = date.day;
    var month = date.month;
    var year = date.year;
    day--;
    if (month === 3) {
        if (isLeapYear(year)) {
            if (day === 0) {
                day = 29;
                month = 2;
            }
        } else {
            day = 28;
            month = 2;
        }
    } else if (month === 1) {
        if (day === 0) {
            day = 31;
            month = 12;
            year--;
        }

    } else {
        if (day === 0) {
            day = daysInMonth[month - 2];
            month--;
        }
    }
    return {
        day: day,
        month: month,
        year: year
    }
}

function findPreviousPalindromeDate(date) {
    var count = 0;
    var prevdate = calculatePreviousDate(date);
    while (1) {
        count++;
        if (IsAllFormatsOfDateAPalindrome(prevdate)) {
            break;
        }
        prevdate = calculatePreviousDate(prevdate);
    }
    return [count, prevdate];
}


function OnclickHandler() {
    result.style.display = "none"
    var date = bdayDate.value.split('-')
    var yyyy = Number(date[0]);
    var mm = Number(date[1]);
    var dd = Number(date[2]);
    var date = {
        day: dd,
        month: mm,
        year: yyyy
    }
    if ((bdayDate.value) !== '') {
        
        loadingImage.style.display="block";
        setTimeout(()=> {
            loadingImage.style.display = "none";
        if (IsAllFormatsOfDateAPalindrome(date)) {
            result.style.display = "block"
            result.style.color =" rgb(39, 11, 66)";
            result.innerText = "Yay,Your birthday is palindrome :-)!!"
        } else {

            var PreviousPalindromeDate = (findPreviousPalindromeDate(date));
            var previousDate = PreviousPalindromeDate[1];
            var ctr2 = PreviousPalindromeDate[0];
            var NextPalindromeDate = (findNextPalindromeDate(date));
            var NextDate = NextPalindromeDate[1];
            var ctr1 = NextPalindromeDate[0];

            if (ctr1 < ctr2) {
                loadingImage.style.display="none";
                var counter = `The  nearest palindrome date is ${NextDate.day}-${NextDate.month}-${NextDate.year}, you missed by ${ctr1} days.`;
                result.style.display = "block"
                result.style.color =" rgb(39, 11, 66)";
                result.innerText = counter;
            } else {
                loadingImage.style.display="none";
                var counter = `The  nearest palindrome date is ${previousDate.day}-${previousDate.month}-${previousDate.year}, you missed by ${ctr2} days :-( `;
                result.style.display = "block"
                result.style.color =" rgb(39, 11, 66)";
                result.innerText = counter;
            }
        }},3000);
    } else {
        result.style.display = "block"
        result.style.color = "red"
        result.innerText = "Select a date !!"
    }
}

buttonTocheckPalindrome.addEventListener("click", OnclickHandler)