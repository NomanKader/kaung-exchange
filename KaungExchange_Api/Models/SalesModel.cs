namespace KaungExchange_Api.Models
{
    public class SalesModel
    {
        public int Id { get; set; }
        public string AccountNo { get; set; }
        public string WalletType { get; set; }
        public string ReceivedType { get; set; }
        public string SaleType { get; set; }
        public decimal Amount { get; set; }
        public int Staff { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Status { get; set; }
        public DateTime UpdatedDate { get; set; }
    }

    public class SaleHistoryResponseModel
    {
        public int Id { get; set; }
        public string AccountNo { get; set; }
        public string WalletType { get; set; }
        public string ReceivedType { get; set; }
        public string SaleType { get; set; }
        public decimal Amount { get; set; }
        public string StaffName { get; set; }
        public string SaleCreatedDate { get; set; } // Created Date
        public string Status { get; set; }
        public string PaymentCompleteDate { get; set; } //Updated Date
    }
}
