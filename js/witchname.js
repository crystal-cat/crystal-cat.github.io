function numReduce(numStr)
{
    let sum = 0;

    for (let i = 0; i < numStr.length; i++)
        sum += parseInt(numStr[i]);

    if (sum > 9)
        return numReduce('' + sum);

    return sum;
}

function getLifePathNumber(date)
{
    return numReduce(date.replaceAll("-", ""));
}

$(function() {
    $( "div.themes span" ).on("click", function () {
        document.body.className = this.className;
    });

    $( "input.birthday" ).on("input", function () {
        var birthday = $(this).val();
        var lifepath = getLifePathNumber(birthday);
        $("span.lifepathnum").html(lifepath);
    });
});

