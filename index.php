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
                    <input name="firstName" type="text" placeholder="What is your first name?" required />
                    <input name="lastName" type="text" placeholder="What is your last name?" required />
                    <input name="email" type="text" placeholder="What is your email?" required />
                    <input name="website" type="text" placeholder="What is your website?" required />
                    <textarea name="content" placeholder="What do you want to say?" required></textarea>
                    <input type="submit" value="Post Comment" />
                </form>
            </div>

            <div id="pagination"></div>
        </div>

        <script src="assets/js/app.js"></script>
    </body>
</html>
