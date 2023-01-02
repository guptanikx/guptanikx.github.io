$(function () {
    $("#jmes_src").on("paste", function (e) {
        e.preventDefault();

        // access the clipboard using the api
        var pastedData = e.originalEvent.clipboardData.getData('text');
        var j = JSON.parse(pastedData);
        $("#jmes_src").text(JSON.stringify(j, null, 2));
    });

    $(`#jmes_input`).keyup(function (e) {
        search($("#jmes_src").text(), e.currentTarget.value);
    });

    $("a[href^='#jmes']").each(function () {
        $(this).click(function (e) {
            var query = $(this).text();
            var fileName = $(this).attr("href").substring(1);
            $.get(`assets/${fileName}.json`).then(function (data) {
                $("#jmes_src").text(JSON.stringify(data, null, 2));
                $("#jmes_input").val(query);
                $(`#jmes_input`).keyup();
                window.scrollTo(0, 0);
                // $("html body").scrollTop();
            });
            // console.log(fileName);
        });
    });

    $(".expr-left").append($("<ul>").append($("#expr-left").parent()));
    $(".expr-right").append($("<ul>").append($("#expr-right").parent()));
    
});

function search(json, query) {
    try {
        json = JSON.parse(json);
        var res = jmespath.search(json, query);
        console.log(`${query}: ${res}`);
        $("#jmes_dest").text(JSON.stringify(res, null, 4));
    } catch (error) {
        // console.log(error);
    }
}