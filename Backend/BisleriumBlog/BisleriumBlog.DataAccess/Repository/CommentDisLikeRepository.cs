using BisleriumBlog.DataAccess.Data;
using BisleriumBlog.DataAccess.Repository.IRepository;
using BisleriumBlog.Models.EntityModels;

namespace BisleriumBlog.DataAccess.Repository
{
    public class CommentDisLikeRepository : Repository<CommentDisLike>, ICommentDisLikeRepository
    {
        private readonly ApplicationDbContext _db;
        public CommentDisLikeRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public void Update(CommentDisLike obj)
        {
            _db.CommentsDisLike.Update(obj);
        }
    }
}
