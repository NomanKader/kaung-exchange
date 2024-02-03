namespace KaungExchange_Api.Models
{
    public class WalletExchangeModel
    {
        public int Id { get; set; }
        public string FromWallet { get; set; }
        public string ToWallet { get; set; }
        public string FromAccount { get; set; }
        public string ToAccount { get; set; }
        public decimal ExchangeAmount { get; set; }
        public string Note { get; set; }
        public string ExchangeDate { get; set; }
    }
}
