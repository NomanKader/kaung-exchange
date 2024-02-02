using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KaungExchange_Api.Models.Entities
{
    [Table("WalletExchange_Table")]
    public class WalletExchangeEntities
    {
        [Key]
        public int Id { get; set; }
        public string FromWallet { get; set; }
        public string ToWallet { get; set; }
        public string FromAccount { get; set; }
        public string ToAccount { get; set; }
        public decimal ExchangeAmount { get; set; }
        public string Note { get; set; }
        public DateTime ExchangeDate { get; set; }
    }
}
