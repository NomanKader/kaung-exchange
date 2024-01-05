namespace KaungExchange_Api.Models
{
    public class AccountModel
    {
        public int Id { get; set; }
        public int Staff { get; set; }
        public string AccountNo { get; set; }
        public string AccountUserName { get; set; }
        public decimal InitialAmount { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsDeleted { get; set; }
    }
}
