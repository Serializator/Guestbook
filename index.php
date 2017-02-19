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
                <form onsubmit="post(new FormData(this)); return false;">
                    <ul>
                        <input name="first-name" placeholder="First Name" class="field-partial" required />
                        <input name="last-name" placeholder="Last Name" class="field-partial" required />
                        <input name="email" placeholder="Email" class="field-long" required />
                        <input name="website" placeholder="Website" class="field-long" required />
                        <textarea name="content" placeholder="What do you want to say?" class="field-long" required></textarea>
                        <input type="submit" value="Post Comment" />
                        <input type="reset" class="field-right" value="Clear" />
                    </ul>
                </form>
            </div>
        </div>

        <script src="assets/js/app.js"></script>
    </body>
</html>
