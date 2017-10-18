function get(url){
    return new Promise((resolve, reject) =>{
        let request = new XMLHttpRequest;
        request.open("GET", url, true);
        request.onload = () => {
            if (request.readyState === 4 && request.status === 200){
                resolve(request.responseText);
            } else {
                console.log("No good!!!");
            }
        }
        request.onerror = () => {
            reject("Soooo not good!!");
        }
        request.send();
    })
}

let promise1 = get("https://api.github.com/users/jidarwish");
promise1.then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
})





//function get(url){
//    return new Promise((resolve, reject) => {
//        let request = new XMLHttpRequest;
//        request.open("GET", url, true);
//        console.log(request)
//        request.onload = function(){
//            if (request.readyState === 4 && request.status === 200){
//                resolve("I'm good!!!!!");
//            } else {
//                reject(request.statusText);
//            }
//        }
//        request.onerror = () => {
//            reject(request.statusText);
//        }
//        request.send();
//    })
//}    
//
//
//let promise = get("https://api.github.com/users/jidarwish");
//promise.then((result) => {
//    console.log(result);
//}).catch((error) => {
//    console.log(error);
//})



