using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KaungExchange_Api.Models.Entities
{
    [Table("User_Table")]
    public class UserEntities
    {
        [Key]
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string UserRole { get; set; }
        public string BusinessName { get; set; }
    }
}
