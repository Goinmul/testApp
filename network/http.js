class NetworkService {

    getUser(){
        // var url = '${BASE_URL}/login/user';
        var url = '192.168.25.45:8080/test1'
        return RequestService.getRequest(url);
    }

    doLogin(data){
        var url = '${BASE_URL}/userprofile';
        return ReqeustService.postRequest(url, data);
    }

    async getRequest(url) {

        var data = await fetch(url)
        .then(result=>{
            return result.json()
        })
        .catch(error=>{
            console.log('http request error : ', error)
        });
        return data;
    }

    async postRequest(url, object){

        var data = await fetch(url, 
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-type' : 'application/json',
                },
                body: JSON.stringify(object),
            }
        ).then();
    }
}

export default new NetworkService()