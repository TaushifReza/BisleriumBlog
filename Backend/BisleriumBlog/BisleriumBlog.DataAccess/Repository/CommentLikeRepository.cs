using BisleriumBlog.DataAccess.Data;
using BisleriumBlog.DataAccess.Repository.IRepository;
using BisleriumBlog.Models.EntityModels;

namespace BisleriumBlog.DataAccess.Repository
{
    public class CommentLikeRepository : Repository<CommentLike>, ICommentLikeRepository
    {
        private readonly ApplicationDbContext _db;
        public CommentLikeRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public void Update(CommentLike obj)
        {
            _db.CommentsLike.Update(obj);
        }
    }
}
