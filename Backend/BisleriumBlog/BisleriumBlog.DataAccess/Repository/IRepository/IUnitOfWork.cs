namespace BisleriumBlog.DataAccess.Repository.IRepository
{
    public interface IUnitOfWork
    {
        ICategoryRepository Category { get; }
        Task SaveAsync();
    }
}
