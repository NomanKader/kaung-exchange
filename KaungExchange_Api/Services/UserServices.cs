using KaungExchange_Api.Models;
using KaungExchange_Api.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace KaungExchange_Api.Services
{
    public class UserServices
    {
        private EFDBContext _dbContext;

        public UserServices(EFDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<int> UserRegister(UserModel model)
        {
            try
            {
                if (CheckUser(model.UserName))
                {
                    UserEntities entities = new UserEntities();
                    entities.UserName = model.UserName;
                    entities.Password = model.Password;
                    entities.UserRole = model.UserRole;
                    entities.BusinessName = model.BusinessName;
                    await _dbContext.User.AddAsync(entities);
                    return await _dbContext.SaveChangesAsync();
                }
                return 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool CheckUser(string userName)
        {
            try
            {
                var dataResult = _dbContext.User.Where(x => x.UserName == userName).FirstOrDefault();
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

        public async Task<AfterLoginResponseModel> Login(string userName, string password)
        {
            try
            {
                var dataResult = await _dbContext.User.Where(x => x.UserName == userName && x.Password == password)
                    .Select(x => new AfterLoginResponseModel()
                    {
                        UserID = x.Id,
                        UserName = x.UserName,
                        UserRole = x.UserRole
                    }).FirstOrDefaultAsync();
                if (dataResult != null)
                {
                    return dataResult;
                }
                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<UserModel>> UserList()
        {
            try
            {
                List<UserModel> lstUser = new List<UserModel>();
                var dataResult = await _dbContext.User.Select(x => new UserModel()
                {
                    Id = x.Id,
                    UserName = x.UserName,
                    UserRole = x.UserRole,
                    Password = x.Password,
                    BusinessName = x.BusinessName
                }).ToListAsync();
                return dataResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<WalletListModel>> GetWalletByStaffId(int staffId)
        {
            try
            {
                return await _dbContext.Account.Where(x => x.Staff == staffId)
                    .Select(x => new WalletListModel()
                    {
                        Id = x.Id,
                        Staff = x.Staff,
                        WalletType = x.WalletType,
                    }).ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> UpdateUser(UserModel model)
        {
            try
            {
                var dataResult = await _dbContext.User.AsNoTracking().Where(x => x.Id == model.Id)
                    .FirstOrDefaultAsync();
                #region DataMapping
                UserEntities entities = new UserEntities();
                entities.Id = dataResult.Id;
                entities.UserName = model.UserName;
                entities.Password = model.Password;
                entities.UserRole = model.UserRole;
                entities.BusinessName = model.BusinessName;
                #endregion
                _dbContext.Update(entities);
                return await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> DeleteUser(int userID)
        {
            try
            {
                int isDelete = 0;
                UserEntities entities = new UserEntities();
                entities.Id = await _dbContext.User.Where(x => x.Id == userID).Select(x => x.Id)
                   .FirstOrDefaultAsync();
                if (entities.Id > 0)
                {
                    _dbContext.User.Remove(entities);
                    isDelete = await _dbContext.SaveChangesAsync();
                }
                return isDelete > 0 ? 1 : 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
