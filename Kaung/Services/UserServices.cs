using Kaung.Entities;
using Kaung.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Kaung.Services
{
    public class UserServices
    {
        private EFDBContext _dbContext;

        public UserServices(EFDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<UserModel> Login(UserModel model)
        {
            try
            {
                UserEntitie users = new UserEntitie();
                UserModel model1 = new UserModel();
                users = await _dbContext.UserEntities.Where(x => x.UserName == model.UserName
                && x.Password == model.Password).FirstOrDefaultAsync();
                if (users != null)
                {
                    model.UserID = users.UserID;
                    model.UserName = users.UserName;
                    model.UserRole = users.UserRole;
                }
                return model;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> Register(UserModel model)
        {
            try
            {
                UserEntitie userEntitie = new UserEntitie();
                userEntitie.UserName = model.UserName;
                userEntitie.Password = model.Password;
                userEntitie.UserRole = model.UserRole;

                _dbContext.UserEntities.Add(userEntitie);
                return await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> UpdateUserCredentials(UserModel model)
        {
            try
            {
                UserEntitie userEntitie = new UserEntitie();
                userEntitie = await _dbContext.UserEntities.FindAsync(model.UserID);
                if (userEntitie != null)
                {
                    userEntitie.UserName = model.UserName;
                    userEntitie.Password = model.Password;
                    userEntitie.UserRole = model.UserRole;

                    _dbContext.UserEntities.Update(userEntitie);
                    return await _dbContext.SaveChangesAsync();
                }
                return 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
