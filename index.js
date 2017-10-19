// The goal is render a github informations on a page with:
// Promises, Map and Reduce.

function httpGetAsync(theUrl, callback1, callback2) {
     let xmlHttp = new XMLHttpRequest();
     xmlHttp.onreadystatechange = function () {
          if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
               callback1(JSON.parse(xmlHttp.responseText));
          else if (xmlHttp.readyState == 4 && xmlHttp.status == 404)
               callback2(xmlHttp.status);
     }
     xmlHttp.open("GET", theUrl, true);
     xmlHttp.send(null);

}

class GitHubUser {
     constructor(username) {
          this.username = username;

     }
     getUserInformation() {
          let theUrl = 'https://api.github.com/users/' + this.username;
          return new Promise(function (resolve, reject) {
               httpGetAsync(theUrl, resolve, reject);
          });
     }
     getRepos() {
          let theUrl = 'https://api.github.com/users/' + this.username + '/repos';
          return new Promise(function (resolve, reject) {
               httpGetAsync(theUrl, resolve, reject);
          });

     }
     render() {
          // Here return a string, be fancy and use map && reduce
     }
}

let me = new GitHubUser('itemah26');
console.log(me.getUserInformation());
console.log(me.getRepos());

function Render($element, html) {
     // Fill this
}


//// Expecting
//let gitUser = new GitHubUser('ideabile');
//
//gitUser
//     .getUserInformations()
//     .then(function (informations) {
//          this.user = informations;
//          return this.getRepos();
//     })
//     .then(function (repos) {
//          this.repos = repos;
//          Render('.githubView', this.render());
//     });
