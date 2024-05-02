using BisleriumBlog.Models.EntityModels;

namespace BisleriumBlog.DataAccess.Repository.IRepository
{
    public interface IBlogRepository : IRepository<Blog>
    {
        void Update(Blog obj);
    }
}
