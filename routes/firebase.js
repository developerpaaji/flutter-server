const admin = require('firebase-admin');

const newsPrivateKey = {
    "type": "service_account",
    "project_id": "flutterpedia-5bb3d",
    "private_key_id": "7db77879b184b1554239c9bc6f8c6ac147b8160e",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDd7MPurEc9/jk8\nsHCJl9cUGPGR2ppcchncBPPNlJ5AHnT8TVqoVnKHeJKPqToMV1frRZMK1IdFva7O\n53wSVlOPyZmaGQ71KVmv6PUoCt6VVtzkPZX7v47UZ4Xggei6maOdF9SknXQplZmp\nXgNHqO9NNE+fshKcKbBuEUZNmSyHLw/Rky2Fiiq4kxCBaW8fIrk/r5DQkyIDfGAZ\n+FoV3r3oepMcSUVn1Mu1lRTIkAX2w2kGOvwj4K00yklYORHjTPK6JOtU5NDytRYS\npQvxvjTu6Upj8sIWgcHeTmAKeELnP4RxKjp8bSRel6YsjDhiNIkQc6byVeqsAm2G\n1dqT7/FFAgMBAAECggEAEExekbVUexn5VVAbnQ30yqylSyIBQvz8kgh0E6Wl9KK3\n/T08xU7/VMcsXlbI5QCiJpd4ESwiw3gG3KUABe8R7ntZZ57jrBTNbypI8kKlblV6\n3gakMKEKHzvQx3hK9wSoZosKP80HgQlUB8NYMtJWQXbayn6UYs8l/li673Z/yxgC\nSVmwWjaE776ds072QdzKGg8bdaAOEkrF/DkcV8uBhbn3Ubsu8GhSYcR3tcgqxFJt\nGCAg8SQe/17HPY9XttrDaOHXbUi+LnVAMQJbp363Oel7wM81pP33hUW+/UM1sZyO\ns1EbDjrwNvl4DA4dNXNpbDogruxb/qeqwuutirY12QKBgQDy+OOuMEKzTfiumPCv\n8uALw2W9ULL5Xw3PKmYedvzjWE0Rlg68XWej2IqgRW8lY91nq0aKmZdgLDZsqba9\nCqTE4nuyFx4pE2LTwJ6SrxjSFeRrYwtvnJOHAOmJ2uOw+ZhmiFQ4XpjbYU6QJROq\nwwjj/Rv3VE5kMjafFa3HJuM0LQKBgQDp0vk5MRdgUZIZ7jdbZ8INahGxmOipsbuZ\nY3arQBK689gwfF3TWnO+mnYhuFq2aeyeT7dAS6q/dtubdGsnP7y3x1huiKbYtNBr\nF9tUR7OP9l9OADx+E1nVcIsEM8NFkFRO4WnH+0QYKshlSrbu/QvD34MgwCtsRVgC\nzSGdkQJoeQKBgQDeFqIGlhZhzuOAtEtMiLRCDFjystDlH/1/X0H4lsqRBCVt7buK\ncdZJ7aTI2q69foriN6xDBCFZxw/4QyjFovT5AgwOvRLUeOPcqjRH38TQQzKG9gF+\nA6DVxf+yAmIdYgfrsLFK1SzjWg51s25Gp/94ZeMqL+V3sG48+5Pcda84AQKBgHQL\n/yEBWka1dTtlXRgCYO7ja7Cm4SIHUcII+UZ44FLk3rEBqFdTFwrMAkEuC+donsTb\nb2l7pFyuEsQOfXfXTEQxrZP+QkBfTOk5x+MGSvnyHs7JkzxHQliKKJSHVCzcOtuD\nSEq2S89qvFZ5RF1MPWCTN7MzbNmpeMq7ICnhZD6RAoGAbgwipfW3BRpysm/6R7ik\ngNihMeBRI6L6AkHRX8auLk1IS0Zmzuy5T3k8W/u5hC7NLN/Wgl1FPUqabnGNsdAf\nLuW+oRlbEck5nvLuO2ahTD9yYDBisR1fPRfiPbVKoLsuo3gtktqnh4aPHouZHunu\nfvGpJmhyfiDxgZU0GmteCqo=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-qv9ye@flutterpedia-5bb3d.iam.gserviceaccount.com",
    "client_id": "106374971552488675683",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qv9ye%40flutterpedia-5bb3d.iam.gserviceaccount.com"
}
var newsAdmin = {
    credential: admin.credential.cert(newsPrivateKey),
    databaseURL: "https://flutterpedia-5bb3d.firebaseio.com"
};
var newsDatabaseAdmin = admin.initializeApp(newsAdmin, "flutter")

const database = newsDatabaseAdmin.database();
var firebase_ref = database.ref();

function saveUser(name, profilePic, id,) {
    return new Promise((resolve, reject) => {    
        firebase_ref.child('users').child(id).set({
            name: name,
            profilePic: profilePic,
            id: id
        }, (err) => {
            if (err != null) {
                resolve(null);
            } else {
                resolve({
                    name: name,
                    profilePic: profilePic,
                    id: id
                });
            }
        });
    })
}
function savePost(post){
    return new Promise((resolve,reject)=>{
        firebase_ref.child('posts').child(Date.now()).set(post,(err)=>{
            if(err!=null){
                resolve(null);
            }
            else{
                resolve(post);
            }
        })
    })
}
module.exports={
    saveUser:saveUser,
    savePost:savePost
}