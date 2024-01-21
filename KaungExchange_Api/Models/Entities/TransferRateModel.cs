namespace KaungExchange_Api.Models.Entities
{
    public class TransferRateModel
    {
        public int Id { get; set; }
        public string Wallet { get; set; }
        public string CashIn_Percentage { get; set; }
        public string CashOut_Percentage { get; set; }
    }
}
