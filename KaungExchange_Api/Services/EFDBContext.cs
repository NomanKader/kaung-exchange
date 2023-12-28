using KaungExchange_Api.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace KaungExchange_Api.Services
{
    public class EFDBContext : DbContext
    {
        public EFDBContext(DbContextOptions options) : base(options) { }
        public DbSet<UserEntities> User { get; set; }
    }
}
