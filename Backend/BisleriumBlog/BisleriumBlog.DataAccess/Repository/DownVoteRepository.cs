using BisleriumBlog.DataAccess.Data;
using BisleriumBlog.DataAccess.Repository.IRepository;
using BisleriumBlog.Models.EntityModels;

namespace BisleriumBlog.DataAccess.Repository
{
    public class DownVoteRepository : Repository<DownVote> , IDownVoteRepository
    {
        private readonly ApplicationDbContext _db;
        public DownVoteRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public void Update(DownVote obj)
        {
            _db.DownVotes.Update(obj);
        }
    }
}
