
/* Invoke the load function whenever the DOM is ready. */
document.addEventListener('DOMContentLoaded', load());

/**
 * Retrieves all comments from the 'comments.php' endpoint and overrides
 * the existing inner HTML from the comment container with a HTML structure
 * generated using the JSON returned from the endpoint.
 */
function load() {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if(this.readyState == 4) {
            if(this.status == 200) {
                var response = JSON.parse(this.responseText);
                var html = '';

                for(var index in response) {
                    var object = response[index];

                    html += '<div class="comment">'
                    html += ('<span class="comment-name">' + object.firstName + ' ' + object.lastName + '</span>');
                    html += ('<span class="comment-email">' + object.email + '</span>');
                    html += ('<span class="comment-website">' + object.website + '</span>');
                    html += ('<p class="comment-content">' + object.content + '</p>');
                    html += '</div>';
                }

                document.getElementById('comments').innerHTML = html;
            } else if(this.status == 500) {
                error(this.responseText);
            } else {
                error('Unexpected Failure<br />' + this.responseText);
            }
        }
    }

    request.open('POST', 'endpoints/comments.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.setRequestHeader('Connection', 'close');
    request.send();
}

/**
 * Posts to the 'post.php' endpoint and set the inner HTML from
 * the appbar based on the returned status code and response.
 */
function post(data) {
    var request = new XMLHttpRequest();
    var params = ('firstName=' + data.get('first-name') + '&lastName=' + data.get('last-name') + '&email=' + data.get('email') + '&website=' + data.get('website') + '&content=' + data.get('content'));

    request.onreadystatechange = function() {
        if(this.readyState == 4) {
            if(this.status == 200) {
                success('Successfully posted your comment.');
            } else if(this.status == 500) {
                error(this.responseText);
            } else {
                error('Unexpected Failure<br />' + this.responseText);
            }
        }
    }

    request.open('POST', 'endpoints/post.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.setRequestHeader('Content-Length', params.length);
    request.setRequestHeader('Connection', 'close');
    request.send(params);

    load();
}

/**
 * Set the appbar to the 'success' type and set its message.
 */
function success(message) {
    var appbar = document.getElementById('appbar');

    appbar.innerHTML = message;
    appbar.setAttribute('type', 'success');
}

/**
 * Set the appbar to the 'error' type and set its message.
 */
function error(message) {
    var appbar = document.getElementById('appbar');

    appbar.innerHTML = message;
    appbar.setAttribute('type', 'error');
}
