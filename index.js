//The class
class GitHubUser {
    constructor(name) {
        this.name = name;
    }

    //method that gets the 
    getUserInformation() {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest;
            request.open("GET", "https://api.github.com/users/" + this.name, true);
            request.onload = () => {
                if (request.readyState === 4 && request.status === 200) {
                    resolve(JSON.parse(request.responseText));
                } else {
                    console.log("I'm here", request);
                    reject(request.status + " " + request.statusText);
                }
            }
            request.onerror = () => {
                reject(request.status + " " + request.statusText);
            }
            request.send();
        })
    }
    //Method that gets the repos using the API
    getRepos() {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest;
            request.open("GET", "https://api.github.com/users/" + this.name + "/repos", true);
            request.onload = () => {
                if (request.readyState === 4 && request.status === 200) {
                    resolve(JSON.parse(request.responseText));
                } else {
                    reject(request.status + " " + request.statusText);
                }
            }
            console.log(request);
            request.onerror = () => {
                reject(request.status + " " + request.statusText);
            }
            request.send();
        })
    }

    //Methode that adds all the content to the existing Div
    render() {
        return `<div id="userInfo">
            <img src="${user.avatar_url}" alt="User icon">
            <h1>${user.login}</h1>
            <p>A link to the <a href="${user.html_url}">GitHubPage</a></p>
            </div>
            <div id="reposWrapper">
            <ul> ${repos.reduce(((prev, next) => prev + `<li class="item">
            <h4>${next.name}</h4> <br />
            <p>Language: ${next.language}<br />
            forks: ${next.forks}<br /> 
            Size: ${next.size}<br />
            Watchers: ${next.watchers}
            </p> 
            </li>
            `), ``)}</ul></div>`;
    }



}
//end of class back to global


//fired up once button clicked
function clicked() {
    let div = document.getElementById("githubView");
    div.innerHTML = "";
    let userName = document.getElementById("userText").value;
    go(userName);

}

//Global func gets result of promise if it's good and appends html
function Render(html) {
    let theDiv = document.getElementById("githubView");
    if (theDiv.innerHTML != "") {
        theDiv.innerHTML = "";
    }
    theDiv.innerHTML = html;
}

//Error handler function
function errorRender(error) {
    let theDiv = document.getElementById("githubView");
    theDiv.innerHTML = `<h1>Error!!!!</h1>
                        <h3>${error}</h3>`;
}


//fired after the 
function go(name) {
    // New user whose info we will get
    let gitUser = new GitHubUser(name);
    gitUser.getUserInformation().then(function (info) {
        this.user = info
        return gitUser.getRepos();
    }).then(function (info) {
        this.repos = info;
        return gitUser.render();
    }).then(function (info) {
        Render(info);
    }).catch((err) => {
        console.log("Ik ben er!!", err);
        errorRender(err);
    })
}
