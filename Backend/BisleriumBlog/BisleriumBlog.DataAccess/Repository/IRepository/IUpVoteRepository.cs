using BisleriumBlog.Models.EntityModels;

namespace BisleriumBlog.DataAccess.Repository.IRepository
{
    public interface IUpVoteRepository : IRepository<UpVote>
    {
        void Update(UpVote obj);
    }
}
