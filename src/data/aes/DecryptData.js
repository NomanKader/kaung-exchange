import CryptoJS from "crypto-js";
export default function DecryptDataComponent(ciphertext){
    if(ciphertext!==null){
        var privateKey=process.env.REACT_APP_PRIVATE_KEY;
        var bytes  = CryptoJS.AES.decrypt(ciphertext,privateKey);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
    }
    else{
        return null;
    }
}