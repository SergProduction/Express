
let auth = 'https://oauth.vk.com/authorize?client_id=5855371&redirect_uri=http://localhost:8080/vkApi&display=popup&response_type=token&scope=audio,groups,friends,wall';

https://api.vk.com/method/audio.get?PARAMETERS&access_token=612899ba03e008a74dc80170dfee3874c955cd2524406fe0d7444497d454aaf0f2e03dbf9937e07b3b117


var a = document.createElement('a');
a.href = auth
a.textContent = 'auth'
document.body.appendChild(a)

var user = {
  count: 6
};

VK.init({
  apiId: 5855371
});

VK.Auth.login(r => {
  console.log(r)
  user.access_token = r.session.sid
  user.owner_id = r.session.mid
})
/*
function start(){

if( location.hash == '' ) return false
console.log(location.hash)

  let user = {}
  location.hash.match(/[^&#]+/g).map( el => {
    let arr = el.match(/[^=]+/g);
    user[ arr[0] ] = arr[1]
  })


let audioParam = {
  owner_id: user.user_id,
  count: 100
}

VK.Api.call('audio.get', audioParam, function(r) {
  if(r.response) {
    console.log('Привет, ' + r);
  }
});


}*/
//start()