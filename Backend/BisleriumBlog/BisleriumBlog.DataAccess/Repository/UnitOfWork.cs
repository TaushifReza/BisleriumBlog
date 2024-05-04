﻿using BisleriumBlog.DataAccess.Data;
using BisleriumBlog.DataAccess.Repository.IRepository;

namespace BisleriumBlog.DataAccess.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _db;
        public ICategoryRepository Category { get; private set; }
        public IBlogRepository Blog { get; private set; }
        public IUpVoteRepository UpVote { get; private set; }
        public IDownVoteRepository DownVote { get; private set; }

        public UnitOfWork(ApplicationDbContext db)
        {
            _db = db;
            Category = new CategoryRepository(_db);
            Blog = new BlogRepository(_db);
            UpVote = new UpVoteRepository(_db);
            DownVote = new DownVoteRepository(_db);
        }
        public async Task SaveAsync()
        {
            await _db.SaveChangesAsync();
        }
    }
}
