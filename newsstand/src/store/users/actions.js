

export function logInUser ({commit,dispatch},payload) {
  
  this._vm.$firebaseAuth.post('/accounts:signInWithPassword',null, {
        params: {
          email:payload.email,
          password:payload.password
        }})
        .then(resp=>{
          dispatch('tokenExpireLogout',3600);
          return this._vm.$firebaseDbREST.get('Users/'+ resp.data.localId+'.json')
        })
        .then(resp=>{
          commit('setCurrentUser',resp.data);
          dispatch('pushLocalStorage',{ data:resp.data, expiresIn:3600});
          this.$router.push('/');
        })
  
}
export function pushLocalStorage(context,payload){
  const now=new Date();
  const expirationDate=new Date(now.getTime() + payload.expiresIn * 1000);
  const stringifiedData=JSON.stringify(payload.data);
  localStorage.setItem('data',stringifiedData);
  localStorage.setItem('expirationDate',expirationDate);
}
export function autoLogin(context,payload){
  const data=JSON.parse(localStorage.getItem('data'));
  if(!data){
    return;
  }
  const expirationDate=localStorage.getItem('expirationDate');
  const now=new Date();
  if (now >= expirationDate){
    return;
  }
  // const expirationTime=new Date(expirationDate).getMilliseconds()-now.getMilliseconds();
  // console.log('expiration time: '+expirationTime);
  context.commit('setCurrentUser',data);
  // context.dispatch('tokenExpireLogout',expirationTime);
}

export function logOut({commit}){
  commit('logOutUser');
}

export function tokenExpireLogout({commit},payload){
  setTimeout(() => {
    commit('logOutUser');
  }, payload * 1000 );
}

export function signUpUser({commit,dispatch},payload){
  this._vm.$firebaseAuth.post('/accounts:signUp',null,{
    params:{
      email:payload.email,
      password:payload.password
    }
  })
  .then(result=>{
    const userData={
      idToken:result.data.idToken,
      userId:result.data.localId,
      displayName:payload.displayName,
      email:result.data.email
    }
    commit('setCurrentUser',userData);
    dispatch('storeUserInDb',userData);
    dispatch('pushLocalStorage',{ data:userData, expiresIn:3600});
    this.$router.push('/');
  });
}
export function storeUserInDb(context,payload){

  this._vm.$firebaseDbREST.patch('Users/'+[payload.userId]+'.json',payload)
  
}