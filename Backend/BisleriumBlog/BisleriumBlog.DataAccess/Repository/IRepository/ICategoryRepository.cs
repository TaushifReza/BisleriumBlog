using BisleriumBlog.Models.EntityModels;

namespace BisleriumBlog.DataAccess.Repository.IRepository
{
    public interface ICategoryRepository : IRepository<Category>
    {
        void Update(Category obj);
    }
}
