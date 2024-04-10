using BisleriumBlog.DataAccess.Data;
using BisleriumBlog.DataAccess.Repository.IRepository;

namespace BisleriumBlog.DataAccess.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _db;

        public UnitOfWork(ApplicationDbContext db)
        {
            _db = db;
        }
        public async Task SaveAsync()
        {
            await _db.SaveChangesAsync();
        }
    }
}
