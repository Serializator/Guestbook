<!DOCTYPE html>
<html>
    <head>
        <title>ROC Ter AA (Web Development: Guestbook)</title>

        <meta charset="UTF-8" />
        <meta name="description" content="Web Development assignment from ROC Ter AA" />
        <meta name="author" content="Julian v.d Berkmortel" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css">
        <link type="text/css" rel="stylesheet" href="assets/css/style.css" />
    </head>
    <body>
        <div class="container">
            <div class="row">
                <form id="comment-form" class="col s12">
                    <div class="row">
                        <div class="input-field col s6">
                            <label for="first-name">First Name</label>
                            <input id="first-name" name="first-name" type="text" class="validate" required>
                        </div>

                        <div class="input-field col s6">
                            <label for="last-name">Last Name</label>
                            <input id="last-name" name="last-name" type="text" class="validate" required>
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field col s12">
                            <label for="email">Email</label>
                            <input id="email" name="email" type="email" class="validate" required>
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field col s12">
                            <label for="website">Website</label>
                            <input id="website" name="website" type="url" class="validate" required>
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field col s12">
                            <label for="content">Your Comment</label>
                            <textarea id="content" name="content" maxlength=126 class="materialize-textarea validate" required></textarea>
                        </div>
                    </div>

                    <div class="row">
                        <button class="col s6 btn waves-effect waves-light" type="submit">
                            Post Comment
                        </button>

                        <button class="col s5 offset-s1 btn waves-effect waves-light" type="reset">
                            Reset
                        </button>
                    </div>
                </form>

                <div id="comments" class="col s7">
                    <!-- Comments will be put into this unordered list. -->
                </div>
            </div>
        </div>

        <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/js/materialize.min.js"></script>
        <script src="assets/js/app.js"></script>
    </body>
</html>
