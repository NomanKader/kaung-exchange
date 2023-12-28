namespace KaungExchange_Api.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string UserRole { get; set; }
        public string BusinessName { get; set; }
    }

    public class AfterLoginResponseModel
    {
        public int UserID { get; set; }
        public string UserName { get; set; }
        public string UserRole { get; set; }
    }
}
