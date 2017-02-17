document.addEventListener('DOMContentLoaded', function() {
    load(document.getElementById('comments'), document.getElementById('pagination'), 0);
});

function load(comments, pagination, offset) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if(this.readyState == 4) {
            console.log(this.responseText);

            if(this.status == 200) {
                /* Show all messages. */
            } else if(this.status == 500) {
                /* Handle the error. */
            }
        }
    }

    request.open('POST', 'endpoints/comments.php', true)
    request.send('offset=' + offset);
}

function post(data) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if((this.readyState == 4) || (this.status == 500)) {
            return;
        }

        /* Handle the error. */
    }

    request.open('POST', 'endpoints/post.php', true);
    request.send('firstName=' + data.get('firstName') + '&lastName=' + data.get('lastName') + '&email=' + data.get('email') + '&comment=' + data.get('comment'));
}
