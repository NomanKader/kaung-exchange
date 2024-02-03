using KaungExchange_Api.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace KaungExchange_Api.Services
{
    public class EFDBContext : DbContext
    {
        public EFDBContext(DbContextOptions options) : base(options) { }
        public DbSet<UserEntities> User { get; set; }
        public DbSet<AccountEntities> Account { get; set; }
        public DbSet<TransferRateEntities> TransferRate { get; set; }
        public DbSet<WalletExchangeEntities> WalletExchange { get; set; }
        public DbSet<SalesEntities> Sales { get; set; }
    }
}
