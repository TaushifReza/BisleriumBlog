namespace BisleriumBlog.DataAccess.Repository.IRepository
{
    public interface IUnitOfWork
    {
        ICategoryRepository Category { get; }
        IBlogRepository Blog { get; }
        IBlogSectionRepository BlogSection { get; }
        Task SaveAsync();
    }
}
