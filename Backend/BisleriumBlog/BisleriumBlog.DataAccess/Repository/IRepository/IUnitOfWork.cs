namespace BisleriumBlog.DataAccess.Repository.IRepository
{
    public interface IUnitOfWork
    {
        Task SaveAsync();
    }
}
