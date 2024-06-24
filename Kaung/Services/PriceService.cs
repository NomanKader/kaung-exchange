using Kaung.Entities;
using Kaung.Models;
using Microsoft.EntityFrameworkCore;

namespace Kaung.Services
{
    public class PriceService
    {
        private EFDBContext _dbContext;

        public PriceService(EFDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<int> UpdatePrice(PriceModel model)
        {
            try
            {
                PriceEntitie priceEntitie = new PriceEntitie();
                priceEntitie = await _dbContext.PriceEntities.Where(x => x.PriceID == model.PriceID).FirstOrDefaultAsync();
                if (priceEntitie != null)
                {
                    priceEntitie.LonePrice = model.LonePrice;
                    priceEntitie.YwayPrice = model.YwayPrice;
                    _dbContext.PriceEntities.Update(priceEntitie);
                    return await _dbContext.SaveChangesAsync();
                }
                return 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<PriceModel>> GetPriceList()
        {
            try
            {
                List<PriceModel> lstCustomer = new List<PriceModel>();
                return await _dbContext.PriceEntities.Select(x => new PriceModel
                {
                    PriceID = x.PriceID,
                    LonePrice = x.LonePrice,
                    YwayPrice = x.YwayPrice,
                }).ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
