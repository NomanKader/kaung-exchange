using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Kaung.Entities
{
    [Table("Price")]
    public class PriceEntitie
    {
        [Key]
        public int PriceID { get; set; }
        public int LonePrice { get; set; }
        public int YwayPrice { get; set; }
    }
}
