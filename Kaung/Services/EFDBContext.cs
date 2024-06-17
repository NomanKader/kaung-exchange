using Kaung.Entities;
using Microsoft.EntityFrameworkCore;

namespace Kaung.Services
{
    public class EFDBContext : DbContext
    {
        public EFDBContext(DbContextOptions options) : base(options) { }
        public DbSet<BuyEntitie> BuyEntities { get; set; }
        public DbSet<CustomerEntitie> Customers { get; set; }
        public DbSet<PriceEntitie> PriceEntities { get; set; }
        public DbSet<UserEntitie> UserEntities { get; set; }
    }
}
