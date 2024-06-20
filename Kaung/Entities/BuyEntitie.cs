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
        public int YwayQuantity { get; set; }
        public int LoneQuantity { get; set; }
        public int SiQuantity { get; set; }
        public int YwayUnitPrice { get; set; }
        public int LoneUnitPrice { get; set; }
        public int SiUnitPrice { get; set; }
        public int TotalAmount { get; set; }
        public string KyatAmount { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
