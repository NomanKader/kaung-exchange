using Kaung.Entities;
using Kaung.Models;
using Microsoft.EntityFrameworkCore;

namespace Kaung.Services
{
    public class BuyServices
    {
        private EFDBContext _dbContext;

        public BuyServices(EFDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<int> SaveBuyRecord(BuyModel model)
        {
            try
            {
                BuyEntitie entitie = new BuyEntitie();
                entitie.CustomerName = model.CustomerName;
                entitie.YwayQuantity = model.YwayQuantity;
                entitie.LoneQuantity = model.LoneQuantity;
                entitie.PaeQuantity = model.PaeQuantity;
                entitie.SiQuantity = model.SiQuantity;
                entitie.BFLoneQuantity = model.BFLoneQuantity;
                entitie.BFSiQuantity = model.BFSiQuantity;
                entitie.BFYwayQuantity = model.BFYwayQuantity;
                entitie.LoneUnitPrice = model.LoneUnitPrice;
                entitie.TotalAmount = model.TotalAmount;
                entitie.KyatAmount = model.KyatAmount;
                entitie.CreatedDate = DateTime.Now.Date;

                _dbContext.BuyEntities.Add(entitie);
                return await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<BuyModel>> GetBuyList(DateTime fromDate, DateTime toDate, string customerName)
        {
            try
            {
                if (fromDate != default(DateTime) && toDate != default(DateTime))
                {
                    List<BuyModel> lstCustomer = new List<BuyModel>();
                    return await _dbContext.BuyEntities.Where(x => x.CreatedDate >= fromDate && x.CreatedDate <= toDate)
                        .Select(x => new BuyModel
                        {
                            BuyId = x.BuyId,
                            CustomerName = x.CustomerName,
                            YwayQuantity = x.YwayQuantity,
                            LoneQuantity = x.LoneQuantity,
                            PaeQuantity = x.PaeQuantity,
                            SiQuantity = x.SiQuantity,
                            BFLoneQuantity = x.BFLoneQuantity,
                            BFYwayQuantity = x.BFYwayQuantity,
                            BFSiQuantity = x.BFSiQuantity,
                            LoneUnitPrice = x.LoneUnitPrice,
                            TotalAmount = x.TotalAmount,
                            KyatAmount = x.KyatAmount,
                            CreatedDate = x.CreatedDate
                        }).ToListAsync();
                }
                else if (!string.IsNullOrEmpty(customerName))
                {
                    List<BuyModel> lstCustomer = new List<BuyModel>();
                    return await _dbContext.BuyEntities.Where(x => x.CustomerName == customerName)
                        .Select(x => new BuyModel
                        {
                            BuyId = x.BuyId,
                            CustomerName = x.CustomerName,
                            YwayQuantity = x.YwayQuantity,
                            LoneQuantity = x.LoneQuantity,
                            PaeQuantity = x.PaeQuantity,
                            SiQuantity = x.SiQuantity,
                            BFLoneQuantity = x.BFLoneQuantity,
                            BFYwayQuantity = x.BFYwayQuantity,
                            BFSiQuantity = x.BFSiQuantity,
                            LoneUnitPrice = x.LoneUnitPrice,
                            TotalAmount = x.TotalAmount,
                            KyatAmount = x.KyatAmount,
                            CreatedDate = x.CreatedDate
                        }).ToListAsync();
                }
                return await _dbContext.BuyEntities.Select(x => new BuyModel
                {
                    BuyId = x.BuyId,
                    CustomerName = x.CustomerName,
                    YwayQuantity = x.YwayQuantity,
                    LoneQuantity = x.LoneQuantity,
                    PaeQuantity = x.PaeQuantity,
                    SiQuantity = x.SiQuantity,
                    BFLoneQuantity = x.BFLoneQuantity,
                    BFYwayQuantity = x.BFYwayQuantity,
                    BFSiQuantity = x.BFSiQuantity,
                    LoneUnitPrice = x.LoneUnitPrice,
                    TotalAmount = x.TotalAmount,
                    KyatAmount = x.KyatAmount,
                    CreatedDate = x.CreatedDate
                }).ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
