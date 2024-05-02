using BisleriumBlog.Models.EntityModels;

namespace BisleriumBlog.DataAccess.Repository.IRepository
{
    public interface IBlogSectionRepository : IRepository<BlogSection>
    {
        void Update(BlogSection obj);
    }
}
