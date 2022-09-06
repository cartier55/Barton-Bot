const intToHHMM = function (time) {
    var sec_num = parseInt(time, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes;
}

const formatDate = function(stringDate) {
    const date = new Date(stringDate)
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();
  
    return [(mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd,
            date.getFullYear()
           ].join('/');
  };
// console.log(intToHHMM(28980))

module.exports = { intToHHMM, formatDate }