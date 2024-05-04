using BisleriumBlog.DataAccess.Data;
using BisleriumBlog.DataAccess.Repository.IRepository;
using BisleriumBlog.Models.EntityModels;

namespace BisleriumBlog.DataAccess.Repository
{
    public class UpVoteRepository : Repository<UpVote>, IUpVoteRepository
    {
        private readonly ApplicationDbContext _db;
        public UpVoteRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public void Update(UpVote obj)
        {
            _db.UpVotes.Update(obj);
        }
    }
}
