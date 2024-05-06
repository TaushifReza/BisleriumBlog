using BisleriumBlog.Models.EntityModels;

namespace BisleriumBlog.DataAccess.Repository.IRepository
{
    public interface ICommentLikeRepository : IRepository<CommentLike>
    {
        void Update(CommentLike obj);
    }
}
