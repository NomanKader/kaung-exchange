using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Kaung.Entities
{
    [Table("Buy")]
    public class BuyEntitie
    {
        [Key]
        public int BuyId { get; set; }
        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
        public string Unit { get; set; }
        public int Quantity { get; set; }
        public int UnitPrice { get; set; }
        public int TotalAmount { get; set; }
        public string KyatAmount { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
