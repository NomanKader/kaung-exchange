using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Kaung.Entities
{
    [Table("Customer")]
    public class CustomerEntitie
    {
        [Key]
        public int CustomerID { get; set; }
        public string CustomerName { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
