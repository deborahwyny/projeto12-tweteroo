


let _username = "";

const baseUrl = "http://localhost:5000";


function signUp() {
  const username = document.querySelector("#username").value;
  const picture = document.querySelector("#picture").value;

  axios.post(`${baseUrl}/sign-up`, {
    username,
    avatar: picture
  }).then(() => {
    _username = username;
    loadTweets();
  }).catch(err => {
    console.error(err);
    alert("Erro ao fazer cadastro! Consulte os logs.");
  });
}

// carregar tweet

function loadTweets() {
  axios.get(`${baseUrl}/tweets`).then(res => {
    const tweets = res.data;
    let tweetsHtml = '';

    for (const tweet of tweets) {
      tweetsHtml += `
        <div class="tweet">
          <div class="avatar">
            <img src="${tweet.avatar}" />
          </div>
          <div class="content">
            <div class="user">
              @${tweet.username}
            </div>
            <div class="body">
              ${escapeHtml(tweet.tweet)}
            </div>
          </div>
        </div>
      `;
    }

    document.querySelector(".tweets").innerHTML = tweetsHtml;
    document.querySelector(".pagina-inicial").classList.add("hidden");
    document.querySelector(".tweets-page").classList.remove("hidden");
  });
}


///// postar tweet

function postTweet() {
  const tweet = document.querySelector("#tweet").value;

  axios.post(`${baseUrl}/tweets`, {
    username: _username,
    tweet
  }).then(() => {
    document.querySelector("#tweet").value = "";
    loadTweets();
  }).catch(err => {
    console.error(err);
    alert("Erro ao fazer tweet! Consulte os logs.")
  })
}

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }
