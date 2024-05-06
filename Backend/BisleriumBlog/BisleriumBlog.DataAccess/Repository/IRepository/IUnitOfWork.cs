namespace BisleriumBlog.DataAccess.Repository.IRepository
{
    public interface IUnitOfWork
    {
        ICategoryRepository Category { get; }
        IBlogRepository Blog { get; }
        IUpVoteRepository UpVote { get; }
        IDownVoteRepository DownVote { get; }
        ICommentRepository Comment { get; }
        ICommentLikeRepository CommentLike { get; }
        ICommentDisLikeRepository CommentDisLike { get; }
        Task SaveAsync();
    }
}
