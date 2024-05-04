namespace BisleriumBlog.DataAccess.Repository.IRepository
{
    public interface IUnitOfWork
    {
        ICategoryRepository Category { get; }
        IBlogRepository Blog { get; }
        IUpVoteRepository UpVote { get; }
        IDownVoteRepository DownVote { get; }
        Task SaveAsync();
    }
}
