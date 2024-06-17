namespace Kaung.Models
{
    public class LoginResponseModel
    {
        public int UserID { get; set; }
        public string UserName { get; set; }
        public string UserRole { get; set; }
        public string Token { get; set; }
    }
}
