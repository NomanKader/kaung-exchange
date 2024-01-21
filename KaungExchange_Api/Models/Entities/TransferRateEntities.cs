using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;

namespace KaungExchange_Api.Models.Entities
{
    [Table("TransferRate_Table")]
    public class TransferRateEntities
    {
        [Key]
        public int Id { get; set; }
        public string Wallet { get; set; }
        public string CashIn_Percentage { get; set; }
        public string CashOut_Percentage { get; set; }
    }
}
