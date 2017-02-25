<!DOCTYPE html>
<html>
    <head>
        <title>ROC Ter AA (Web Development: Guestbook)</title>

        <meta charset="UTF-8" />
        <meta name="description" content="Web Development assignment from ROC Ter AA" />
        <meta name="author" content="Julian v.d Berkmortel" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link type="text/css" rel="stylesheet" href="assets/css/style.css" />
    </head>
    <body>
        <div id="appbar"></div>

        <div id="container">
            <div id="comments"></div>

            <div class="section">
                <form id="comment-form" novalidate>
                    <ul>
                        <label>
                            <span id="first-name-error" class="field-error"></span>
                            <input id="first-name-field" name="first-name" type="text" placeholder="First Name" class="field-partial" required />
                        </label>

                        <label>
                            <span id="last-name-error" class="field-error"></span>
                            <input id="last-name-field" name="last-name" type="text" placeholder="Last Name" class="field-partial" required />
                        </label>

                        <label>
                            <span id="email-error" class="field-error"></span>
                            <input id="email-field" name="email" type="email" placeholder="Email" class="field-long" required />
                        </label>

                        <label>
                            <span id="website-error" class="field-error"></span>
                            <input id="website-field" name="website" type="url" placeholder="Website" class="field-long" required />
                        </label>

                        <label>
                            <span id="content-error" class="field-error"></span>
                            <textarea id="content-field" name="content" maxlength=126 placeholder="What do you want to say?" class="field-long" ></textarea>
                        </label>

                        <input type="submit" value="Post Comment" />
                        <input type="reset" class="field-right" value="Clear" />
                    </ul>
                </form>
            </div>
        </div>

        <script src="assets/js/app.js"></script>
    </body>
</html>
