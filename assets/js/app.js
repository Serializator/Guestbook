document.addEventListener('DOMContentLoaded', function() {
    load(0);
});

function load(offset) {
    var request = new XMLHttpRequest();
    var params = ('offset=' + offset);

    request.onreadystatechange = function() {
        if(this.readyState == 4) {
            console.log(this.responseText);

            if(this.status == 200) {
                var json = JSON.parse(this.responseText);
                var html = '';

                for(var index in json) {
                    var element = json[index];

                    html += '<div class="comment">'
                    html += ('<span>' + element.firstName + element.lastName + '</span>');
                    html += ('<span>' + element.email + '</span>');
                    html += ('<span>' + element.website + '</span>');
                    html += ('<p>' + element.content + '</p>');
                    html += '</div>';
                }

                document.getElementById('comments').innerHTML = html;
            } else if(this.status == 500) {
                error(this.responseText);
            }
        }
    }

    request.open('POST', 'endpoints/comments.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.setRequestHeader('Content-Length', params.length);
    request.setRequestHeader('Connection', 'close');
    request.send(params);
}

function post(data) {
    var request = new XMLHttpRequest();
    var params = ('firstName=' + data.get('firstName') + '&lastName=' + data.get('lastName') + '&email=' + data.get('email') + '&website=' + data.get('website') + '&content=' + data.get('content'));

    request.onreadystatechange = function() {
        if((this.readyState == 4) && (this.status == 200)) {
            success('Successfully posted your comment.');
        } else {
            error(this.responseText);
        }
    }

    request.open('POST', 'endpoints/post.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.setRequestHeader('Content-Length', params.length);
    request.setRequestHeader('Connection', 'close');
    request.send(params);

    load(document.getElementById('comments'), document.getElementById('pagination'), 0);
}

function success(message) {
    var appbar = document.getElementById('appbar');

    appbar.innerHTML = message;
    appbar.setAttribute('type', 'success');
}

function error(message) {
    var appbar = document.getElementById('appbar');

    appbar.innerHTML = message;
    appbar.setAttribute('type', 'error');
}
