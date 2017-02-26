
/* Invoke the load function whenever the DOM is ready. */
document.addEventListener('DOMContentLoaded', load());

/* Invoke the post function whenever the comment form is submit. */
document.getElementById('comment-form').addEventListener('submit', function(event) {
    post(new FormData(event.target));
    event.preventDefault();
    return false;
});

/**
 * Turn given parameters into a HTML comment block.
 */
function format(firstName, lastName, email, gravatar, date, content) {
    var html = '';

    html += '<ul class="collection">'
    html += '<li class="collection-item avatar">';
    html += '<img src="https://www.gravatar.com/avatar/' + gravatar + '" class="circle" />';
    html += '<span class="title">' + firstName + ' ' + lastName + '</span>';
    html += '<p><i>' + email + '<br /></i>' + content + '</p>';
    html += '<ul class="secondary-content"><li>' + date + '</li></ul>'
    html += '</li>';
    html += '</ul>';

    return html;
}

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
                var container = document.getElementById('comments');
                var html;

                for(var index in response) {
                    var object = response[index];

                    if(html === undefined) {
                        html = '';
                    }

                    html += format(object.firstName, object.lastName, object.email, object.gravatar, object.date, object.content);
                }

                if(html !== undefined) {
                    container.innerHTML = html;
                    container.style.display = 'block';

                    document.getElementById('comment-form').className = 'col s5';
                }
            } else if(this.status == 500) {
                Materialize.toast('Internal Server Error: ' + this.responseText, 6000);
            } else {
                Materialize.toast('Unexpected Error: ' + this.responseText, 6000);
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
                var response = JSON.parse(this.responseText);
                var container = document.getElementById('comments');

                container.innerHTML = (format(response.firstName, response.lastName, response.email, response.gravatar, response.date, response.content) + container.innerHTML);
                container.style.display = 'block';

                document.getElementById('comment-form').className = 'col s5';
                document.getElementById('comment-form').reset();
            } else if(this.status == 400) {
                Materialize.toast('Bad Request: ' + this.responseText, 6000);
            } else if(this.status == 500) {
                Materialize.toast('Internal Server Error: ' + this.responseText, 6000);
            } else {
                Materialize.toast('Unexpected Error: ' + this.responseText, 6000);
            }
        }
    }

    request.open('POST', 'endpoints/post.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.setRequestHeader('Content-Length', params.length);
    request.setRequestHeader('Connection', 'close');
    request.send(params);
}
