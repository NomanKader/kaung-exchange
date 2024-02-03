using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KaungExchange_Api.Models.Entities
{
    [Table("SaleHistory_Table")]
    public class SalesEntities
    {
        [Key]
        public int Id { get; set; }
        public string WalletType { get; set; }
        public string ReceivedType { get; set; }
        public string SaleType { get; set; }
        public int Staff { get; set; }
        public decimal Amount { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Status { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
