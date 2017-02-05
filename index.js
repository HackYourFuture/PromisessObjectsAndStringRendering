
(function(w, $) {
  function GitHubUser(user) {
    this.user = user
  }

  GitHubUser.prototype.getUserInformations = function() {
    return $.ajax({
      url: 'https://api.github.com/users/' + this.user,
      context: document.body
    })
  }

  GitHubUser.prototype.getRepos = function() {
    return $.ajax({
      url: 'https://api.github.com/users/' + this.user.login + '/repos',
      context: document.body
    })
  }

  // Expecting
  var githubUser = new GitHubUser('ideabile');
  var current = githubUser.getUserInformations()
    .then((function(informations) {
      this.user = informations;
      // console.log(this.user);
      // Add the result which is recieved to DOM
      $('#name').html(this.user.login);
      $('#img').attr('src', this.user.avatar_url);
      return this.getRepos();
    }).bind(githubUser))
    .fail(function(){
      return this;
    })
    .done(function(repos, status) {
      this.repos = repos;
      for (let repo of this.repos) {
        $('#ol').append(`<li> <a href='${repo.clone_url}'>${repo.full_name}</a></li>`)
      }
    }).fail(function(err) {
      console.log(' ERROR 404 : ' + err.statusText);
    });

})(window, jQuery);
