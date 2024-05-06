using BisleriumBlog.Models.EntityModels;

namespace BisleriumBlog.DataAccess.Repository.IRepository
{
    public interface ICommentDisLikeRepository : IRepository<CommentDisLike>
    {
        void Update(CommentDisLike obj);
    }
}
