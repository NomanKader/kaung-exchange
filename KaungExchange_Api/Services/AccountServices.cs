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
                if (CheckWalletAccountExist(model.Staff, model.AccountNo, model.WalletType))
                {
                    AccountEntities entities = new AccountEntities();
                    #region DataMapping
                    entities.Staff = model.Staff;
                    entities.AccountNo = model.AccountNo;
                    entities.WalletType = model.WalletType;
                    entities.AccountUserName = model.AccountUserName;
                    entities.InitialAmount = model.InitialAmount;
                    entities.CreatedDate = DateTime.Now;
                    entities.IsDeleted = false;
                    #endregion
                    await _dbContext.Account.AddAsync(entities);
                    return await _dbContext.SaveChangesAsync();
                }
                return 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool CheckWalletAccountExist(int staffId, string accountNo, string walletType)
        {
            try
            {
                var dataResult = _dbContext.Account.Where(x => x.AccountNo == accountNo
                && x.WalletType == walletType && x.Staff == staffId).FirstOrDefault();
                if (dataResult != null)
                {
                    return false;
                }
                return true;
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
                //return await _dbContext.Account.Where(x => x.IsDeleted == false).Select(x => new AccountModel()
                //{
                //    Id = x.Id,
                //    Staff = x.Staff,
                //    AccountNo = x.AccountNo,
                //    AccountUserName = x.AccountUserName,
                //    InitialAmount = x.InitialAmount,
                //    CreatedDate = DateTime.Now,
                //}).ToListAsync();
                return (from a in _dbContext.Account
                        join u in _dbContext.User on a.Staff equals u.Id
                        where a.IsDeleted == false
                        select new AccountModel()
                        {
                            Id = a.Id,
                            Staff = a.Staff,
                            StaffName = u.UserName,
                            AccountNo = a.AccountNo,
                            WalletType = a.WalletType,
                            AccountUserName = a.AccountUserName,
                            InitialAmount = a.InitialAmount,
                            CreatedDate = DateTime.Now,
                        }).ToList();
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
                if (CheckWalletAccountExist(model.Staff, model.AccountNo, model.WalletType))
                {
                    entities = await _dbContext.Account.AsNoTracking().Where(x => x.Id == model.Id).FirstOrDefaultAsync();
                    if (entities != null)
                    {
                        entities.Id = model.Id;
                        entities.Staff = model.Staff;
                        entities.AccountNo = model.AccountNo;
                        entities.WalletType = model.WalletType;
                        entities.AccountUserName = model.AccountUserName;
                        entities.InitialAmount = model.InitialAmount;

                        _dbContext.Account.Update(entities);
                        return await _dbContext.SaveChangesAsync();
                    }
                    return 0;
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
                    entities.Staff = entities.Staff;
                    entities.AccountNo = entities.AccountNo;
                    entities.AccountUserName = entities.AccountUserName;
                    entities.InitialAmount = entities.InitialAmount;
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
