using BisleriumBlog.Models.EntityModels;

namespace BisleriumBlog.DataAccess.Repository.IRepository
{
    public interface IDownVoteRepository : IRepository<DownVote>
    {
        void Update(DownVote obj);
    }
}
