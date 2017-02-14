document.addEventListener('DOMContentLoad', function() {
    load(document.getElementById('comments'), document.getElementById('pagination'), 0);
});

load(comments, pagination, offset) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if(readyState == 4) {
            if(status == 200) {
                /* Show all messages. */
            } else if(status == 500) {
                /* Handle the error. */
            }
        }
    }

    /* Turn into a POST request. */
    request.open('GET', ('endpoints/comments.php?offset=' + offset), true)
    request.send();
}

post(data) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if((readyState != 4) || (status != 500)) {
            return;
        }

        /* Handle the error. */
    }

    /* Turn into a POST request. */
    request.open('GET', ('endpoints/post.php?firstName=' + data.get('firstName') + '&lastName=' + data.get('lastName') + '&email=' + data.get('email') + '&comment=' + data.get('comment')), true)
    request.send();
}
