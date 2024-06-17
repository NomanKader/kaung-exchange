using System.Security.Cryptography;
using System.Text;

namespace Kaung.Helper
{
    public class DecryptPassword
    {
        public string Decrypt_Password(string encrypt_pwd)
        {
            byte[] iv = new byte[16];
            byte[] buffer = Convert.FromBase64String(encrypt_pwd);

            using (Aes aes = Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes("zwewaiyanhtetNkSoftwarehouse9911");
                aes.IV = iv;
                ICryptoTransform decryptor = aes.CreateDecryptor(aes.Key, aes.IV);

                using (MemoryStream memoryStream = new MemoryStream(buffer))
                {
                    using (CryptoStream cryptoStream = new CryptoStream((Stream)memoryStream, decryptor, CryptoStreamMode.Read))
                    {
                        using (StreamReader streamReader = new StreamReader((Stream)cryptoStream))
                        {
                            return streamReader.ReadToEnd();
                        }
                    }
                }
            }
        }
    }
}
