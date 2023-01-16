function numReduce(numStr)
{
    // Reduce a string of numbers to one by summation
    // Continue until we get a single digit number
    let sum = 0;

    for (let i = 0; i < numStr.length; i++)
        sum += parseInt(numStr[i]);

    if (sum > 9)
        return numReduce('' + sum);

    return sum;
}

function letterToNumber(letter)
{
    // 1 2 3 4 5 6 7 8 9
    // a b c d e f g h i
    // j k l m n o p q r
    // s t u v w x y z
    return 1 + (letter.charCodeAt(0) - 97) % 9;
}

function nameToNumber(name)
{
    var lname = name.toLowerCase();
    var sum = lname.split('').reduce((a, x) => {return a + letterToNumber(x)}, 0);
    return numReduce('' + sum);
}

function getLifePathNumber(date)
{
    return numReduce(date.replaceAll("-", ""));
}

function updateLifePathNumber()
{
    var $element = $(".lifepathnum");
    var birthday = $(".birthday").val();

    if (birthday == "")
    {
        $element.css({
            opacity: 0
        }, 3000 );
        return;
    }

    var lifepath = getLifePathNumber(birthday);

    $element.html(lifepath);
    $element.animate({
        opacity: 1
    }, 3000 );

    return lifepath;
}

function capitalize(word)
{
    return word.charAt(0).toUpperCase() + word.slice(1);
}

$(function() {
    $( "div.themes span" ).on("click", function () {
        document.body.className = this.className;
    });

    $( "input.birthday" ).on("input blur", function () {
        updateLifePathNumber();
    });

    $( ".calculate" ).on("click", function () {
        var $results = $(".results");
        var lifepath = updateLifePathNumber();
        if (!lifepath)
        {
            $results.html("Please enter your birthday and find out your Life Path number first!");
            return;
        }

        var words = $(".words").val().split(/\s+/);
        if (words.length === 0)
        {
            $results.html("Please enter some meaningful words for you!");
            return;
        }

        // Here's where the magic happens! 🪄✨
        var names = [];
        for (var i = 0; i < words.length; i++)
        {
            for (var j = i + 1; j < words.length; j++)
            {
                if (nameToNumber(words[i] + words[j]) == lifepath)
                {
                    names.push(capitalize(words[i]) + " " + capitalize(words[j]))
                    names.push(capitalize(words[j]) + " " + capitalize(words[i]))
                }
            }
        }

        $results.html(names.join('<br>'));
    });

    updateLifePathNumber();
});

