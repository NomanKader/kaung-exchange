using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KaungExchange_Api.Models.Entities
{
    [Table("Account_Table")]
    public class AccountEntities
    {
        [Key]
        public int Id { get; set; }
        public int Staff { get; set; }
        public string AccountNo { get; set; }
        public string AccountUserName { get; set; }
        public decimal InitialAmount { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsDeleted { get; set; }
    }
}
