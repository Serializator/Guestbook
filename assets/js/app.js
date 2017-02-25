var errors = {
    'first-name': {
        error: 'first-name-error',
        types: {
            valueMissing: 'You haven\'t specified a first name.'
        }
    }, 'last-name': {
        error: 'last-name-error',
        types: {
            valueMissing: 'You haven\'t specified a last name.'
        }
    }, 'email': {
        error: 'email-error',
        types: {
            valueMissing: 'You haven\'t specified an email.',
            typeMismatch: 'You haven\'t specified a proper email.'
        }
    }, 'website': {
        error: 'website-error',
        types: {
            valueMissing: 'You haven\'t specified an website.',
            typeMismatch: 'You haven\'t specified a proper URL.'
        }
    }, 'content': {
        error: 'content-error',
        types: {
            valueMissing: 'You haven\'t specified a comment.',
            tooLong: 'Your comment is to long.'
        }
    }
};

/* Invoke the load function whenever the DOM is ready. */
document.addEventListener('DOMContentLoaded', load());

/* Invoke the post function whenever the comment form is submit. */
document.getElementById('comment-form').addEventListener('submit', function(event) {
    post(new FormData(event.target));
    event.preventDefault();
    return false;
});

document.getElementById('first-name-field').addEventListener('blur', function(event) {
    validate(event.target, document.getElementById('first-name-error'));
});

document.getElementById('last-name-field').addEventListener('blur', function(event) {
    validate(event.target, document.getElementById('last-name-error'));
});

document.getElementById('email-field').addEventListener('blur', function(event) {
    validate(event.target, document.getElementById('email-error'));
});

document.getElementById('website-field').addEventListener('blur', function(event) {
    validate(event.target, document.getElementById('website-error'));
});

document.getElementById('content-field').addEventListener('blur', function(event) {
    validate(event.target, document.getElementById('content-error'));
});

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

                    html += '<div class="comment">';
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
                error('Unexpected Failure: ' + this.responseText);
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
                load();
                document.getElementById('comment-form').reset();
                success('Successfully posted your comment.');
            } else if(this.status == 400) {
                var response = JSON.parse(this.responseText);

                for(var index in response) {
                    var error = response[index];
                    var handler = errors[error.field];
                    var element = document.getElementById(handler.error);

                    element.innerHTML = handler.types[error.type];
                    element.setAttribute('active', '');
                }
            } else if(this.status == 500) {
                error(this.responseText);
            } else {
                error('Unexpected Failure: ' + this.responseText);
            }
        }
    }

    request.open('POST', 'endpoints/post.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.setRequestHeader('Content-Length', params.length);
    request.setRequestHeader('Connection', 'close');
    request.send(params);
}

/**
 * Validate whether the given input field is valid.
 * If not, it will display an error message above the input field.
 */
function validate(input) {
    var handler = errors[input.name];
    var error = document.getElementById(handler.error);

    if(input.checkValidity()) {
        if(error.hasAttribute('active')) {
            error.removeAttribute('active');
        }
    } else {
        var text;

        for(var property in input.validity) {
            if(handler.types.hasOwnProperty(property) && input.validity[property]) {
                text = handler.types[property];
                break;
            }
        }

        error.setAttribute('active', '');
        error.innerHTML = text;
    }
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
