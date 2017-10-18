//The class
class GitHubUser {
    constructor(name) {
        this.name = name;
        this.userReposUrl = "https://api.github.com/users/" + name + "/repos";
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
                    reject(request.stausText);
                }
            }
            request.onerror = () => {
                reject(request.stausText);
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
                    reject(request.stausText);
                }
            }
            request.onerror = () => {
                reject(request.stausText);
            }
            request.send();
        })
    }

    //Methode that adds
    render() {
        console.log(repos);

        return `<ul> ${repos.reduce(((prev, next) => prev + `<li>
            Name: ${next.name} <br />
            <p>Language: ${next.language}<br />
            forks: ${next.forks}<br /> 
            Size: ${next.size}<br />
            Watchers: ${next.watchers}
            </p> 
            </li>
            `), ``)}</ul>`;
    }




}
//Global func gets result of promise if it's good and appends html
function Render(html){
    let theDiv = document.getElementById("githubView");
    theDiv.innerHTML = html;
}

// New user whose info we will get
let gitUser = new GitHubUser('ideabile');
gitUser.getRepos().then(function (info) {
    this.user = info
    return gitUser.getRepos();
}).then(function (info) {
    this.repos = info;
    return gitUser.render();
}).then(function(info){
    Render(info);
}).catch((err) => {
    console.log(err);
})

