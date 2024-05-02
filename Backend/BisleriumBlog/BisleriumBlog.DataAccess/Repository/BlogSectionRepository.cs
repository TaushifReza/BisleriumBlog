using BisleriumBlog.DataAccess.Data;
using BisleriumBlog.DataAccess.Repository.IRepository;
using BisleriumBlog.Models.EntityModels;

namespace BisleriumBlog.DataAccess.Repository
{
    public class BlogSectionRepository : Repository<BlogSection> , IBlogSectionRepository
    {
        private readonly ApplicationDbContext _db;
        public BlogSectionRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public void Update(BlogSection obj)
        {
            _db.BlogsSections.Update(obj);
        }
    }
}
