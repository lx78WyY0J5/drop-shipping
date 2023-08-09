custom_pages_include();

async function custom_pages_include() {
    var pathname = window.location.pathname;

    if (pathname == "/") {
        pathname += "index.html"; console.log("index / rewrite");
    }

    if (pathname === "/index/" || pathname === "/index" || pathname === "/index.html/" || pathname === "/index.html") {
        await include_all();

        await include("/contents/home.html", "contentHolder", true);
    }

    else if (pathname === "/discord/" || pathname === "/discord" || pathname === "/discord.html/" || pathname === "/discord.html") {
        await include_all();
    }

    else {
        await include_all();
        await include("/contents/contents/404.html", "contentHolder", true);

        await include_css("/styles/404.css");

        await include_multiple("github_update", "contentHolder");
        await include_multiple("viewCount", "contentHolder");
    }
}

async function include_all() {
    await include_css("./styles/variables.css");
    await include_css("./styles/user-agent.css");
    await include_script("./scripts/theme.js");
    await include_css("./styles/text.css");
    await include_css("./styles/body.css");

    await include_css("./styles/header.css");
    await include("./contents/header.html", "body");

    await include_css("./styles/content.css");
    await include("./contents/content.html", "body");

    await include_css("./styles/footer.css");
    await include("./contents/footer.html", "body", false);
}

async function include_multiple(name, area) {
    await include_css("/styles/" + name + ".css");
    await include("/contents/contents/" + name + ".html", area, true);
    await include_script("/scripts/" + name + ".js");
}

async function include(link, query, queryOrIndex) {
    let response = await fetch(link)
        .then(response => {
            return response.text()
        })
        .then(data => {
            if (queryOrIndex) {
                document.getElementById(query).innerHTML += data;
            } else {
                document.querySelector(query).innerHTML += data;
            }
        })
        .catch(error => {
            console.log(error);
        });
}

async function include_script(url) {
    var script = document.createElement("script");
    script.src = url;
    document.head.appendChild(script);
}

async function include_css(url) {
    var head = document.getElementsByTagName('HEAD')[0];

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;

    head.appendChild(link);
}