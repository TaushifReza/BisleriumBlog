using System.Linq.Expressions;
using BisleriumBlog.DataAccess.Data;
using BisleriumBlog.DataAccess.Repository.IRepository;
using Microsoft.EntityFrameworkCore;

namespace BisleriumBlog.DataAccess.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly ApplicationDbContext _db;
        internal DbSet<T> DbSet;

        public Repository(ApplicationDbContext db)
        {
            _db = db;
            this.DbSet = _db.Set<T>();
            //_db.Categories == dbSet
        }
        public async Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>>? filter = null, int pageSize = 3, int pageNumber = 1)
        {
            IQueryable<T> query = DbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            if (pageSize > 0)
            {
                if (pageSize > 100)
                {
                    pageSize = 100;
                }
                // skip0.take(5)
                // page number- 2 || page size -5
                // skip(5*(1)) take(5)
                query = query.Skip(pageSize * (pageNumber - 1)).Take(pageSize);
            }

            return await query.ToListAsync();
        }

        public async Task<T> GetAsync(Expression<Func<T, bool>> filter = null, bool tracked = true)
        {
            IQueryable<T> query = DbSet;
            if (!tracked)
            {
                query = query.AsNoTracking();
            }

            if (filter != null)
            {
                query = query.Where(filter);
            }

            return await query.FirstOrDefaultAsync();
        }

        public async Task CreateAsync(T entity)
        {
            await DbSet.AddAsync(entity);
        }

        public void Remove(T entity)
        {
            DbSet.Remove(entity);
        }

        public void RemoveRange(IEnumerable<T> entity)
        {
            DbSet.RemoveRange(entity);
        }
    }
}
