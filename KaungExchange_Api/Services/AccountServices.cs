using KaungExchange_Api.Models;
using KaungExchange_Api.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace KaungExchange_Api.Services
{
    public class AccountServices
    {
        private EFDBContext _dbContext;

        public AccountServices(EFDBContext dbContext)
        {
            this._dbContext = dbContext;
        }

        public async Task<int> CreateAccountControl(AccountModel model)
        {
            try
            {
                AccountEntities entities = new AccountEntities();
                #region DataMapping
                entities.Staff = model.Staff;
                entities.AccountNo = model.AccountNo;
                entities.AccountUserName = model.AccountUserName;
                entities.InitialAmount = model.InitialAmount;
                entities.CreatedDate = DateTime.Now;
                entities.IsDeleted = false;
                #endregion
                await _dbContext.Account.AddAsync(entities);
                return await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<AccountModel>> GetAccountControllerList()
        {
            try
            {
                return await _dbContext.Account.Where(x => x.IsDeleted == false).Select(x => new AccountModel()
                {
                    Id = x.Id,
                    Staff = x.Staff,
                    AccountNo = x.AccountNo,
                    AccountUserName = x.AccountUserName,
                    InitialAmount = x.InitialAmount,
                    CreatedDate = DateTime.Now,
                }).ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> UpdateAccountController(AccountModel model)
        {
            try
            {
                AccountEntities entities = new AccountEntities();
                entities = await _dbContext.Account.AsNoTracking().Where(x => x.Id == model.Id).FirstOrDefaultAsync();
                if (entities != null)
                {
                    entities.Id = model.Id;
                    entities.Staff = model.Staff;
                    entities.AccountNo = model.AccountNo;
                    entities.AccountUserName = model.AccountUserName;
                    entities.InitialAmount = model.InitialAmount;

                    _dbContext.Account.Update(entities);
                    return await _dbContext.SaveChangesAsync();
                }
                return 0;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<int> DeleteAccountController(AccountModel model)
        {
            try
            {
                AccountEntities entities = new AccountEntities();
                entities = await _dbContext.Account.AsNoTracking().Where(x => x.Id == model.Id).FirstOrDefaultAsync();
                if (entities != null)
                {
                    entities.Id = entities.Id;
                    entities.Staff = model.Staff;
                    entities.AccountNo = model.AccountNo;
                    entities.AccountUserName = model.AccountUserName;
                    entities.InitialAmount = model.InitialAmount;
                    entities.IsDeleted = true;
                    _dbContext.Account.Update(entities);
                    return await _dbContext.SaveChangesAsync();
                }
                return 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
