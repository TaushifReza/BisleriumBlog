using BisleriumBlog.DataAccess.Data;
using BisleriumBlog.DataAccess.Repository.IRepository;
using BisleriumBlog.Models.EntityModels;

namespace BisleriumBlog.DataAccess.Repository
{
    public class BlogRepository : Repository<Blog>, IBlogRepository
    {
        private readonly ApplicationDbContext _db;
        public BlogRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public void Update(Blog obj)
        {
            _db.Blogs.Update(obj);
        }
    }
}
