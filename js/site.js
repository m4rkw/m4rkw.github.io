
$(document).ready(function() {
    $('.read-work-history').click(function(e) {
        e.preventDefault();

        var text = $(this).closest('p').next('.work-history-text');

        if (text.is(':hidden')) {
            text.show();
            $(this).text('Hide text');
        } else {
            text.hide();
            $(this).text('Read more...');
        }
    });

    $('input[name="youare"]').click(function(e) {
        if ($('input[name="youare"][value="1"]').is(':checked')) {
            $('#recruiter-agreement').show();
        } else {
            $('#recruiter-agreement').hide();
        }
    });

    $('.readmore').click(function(e) {
        e.preventDefault();

        var detail = $(this).closest('p').next('.projectdetail');

        if (detail.is(':hidden')) {
            detail.show();
            $(this).text('Hide text');
        } else {
            detail.hide();
            $(this).text('Read more...');
        }
    });
});
