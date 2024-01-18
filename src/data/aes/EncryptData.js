import CryptoJS from "crypto-js";
export default function EncryptDataComponent(value){
    if(value!==null){
        var privateKey=process.env.REACT_APP_PRIVATE_KEY;
        var ciphertext = CryptoJS.AES.encrypt(value,privateKey ).toString();
        return ciphertext ;
    }
    else{
        return null;
    }
    
}