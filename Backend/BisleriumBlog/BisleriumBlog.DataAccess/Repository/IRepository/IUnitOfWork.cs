namespace BisleriumBlog.DataAccess.Repository.IRepository
{
    public interface IUnitOfWork
    {
        ICategoryRepository Category { get; }
        IBlogRepository Blog { get; }
        Task SaveAsync();
    }
}
