// The goal is render a github informations on a page with:
// Promises, Map and Reduce.

function GitHubUser (username) {
    // Fill this
	this.userName = username;
}

GitHubUser.prototype.getUserInformations = function () {
    // Fill this
	let url = "https://api.github.com/users/" + this.userName;
	
	return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => resolve(xhr.responseText);
    //xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });

};

GitHubUser.prototype.getRepos = function () {
    // Fill this
	let url = "https://api.github.com/users/" + this.userName + "/repos";
	
	return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => resolve(xhr.responseText);
    //xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
};

GitHubUser.prototype.render = function () {
    // Here return a string, be fancy and use map && reduce
	let user_obj = JSON.parse(this.user);
	let result = "<h3>User Info</h3>";
	result += "<div><p>Name : " + user_obj.login + "</p><p>Public Repos:" + user_obj.public_repos + "</p><p><img src='" + user_obj.avatar_url + "' /></p></div>";
	
	let repo_obj = JSON.parse(this.repos);
	result += "<h3>Repos</h3>";
	result += `<ul>
	${repo_obj.reduce((prev, next) => prev + `<li><a target="_blank" href="${next.html_url}">${next.name}</a></li>`, '')}
	</ul>`;
	return result;
};

function Render(element, html){
    // Fill this
	document.querySelector(element).innerHTML = html;
}


// Expecting
let gitUser = new GitHubUser('ideabile');

gitUser.getUserInformations().then(function(informations){
        gitUser.user = informations;
        return gitUser.getRepos();
    }).then(function(repos) {
        gitUser.repos = repos;
        Render('.githubView', gitUser.render());
    });
