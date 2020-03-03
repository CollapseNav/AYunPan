using Microsoft.EntityFrameworkCore;
using Repository.Domain;

namespace Repository
{
    public class BaseContext : DbContext
    {
        public BaseContext(DbContextOptions<BaseContext> options) : base(options)
        { }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // modelBuilder.Entity<UserDataInfo>(entity =>
            // {
            //     entity.HasIndex(m => m.Id).IsUnique();
            //     entity.HasIndex(m => m.UserName).IsUnique();
            //     entity.HasIndex(m => m.UserAccount).IsUnique();
            //     entity.HasMany(m => m.UserFiles).WithOne(m => m.Owner).HasForeignKey(m => m.OwnerId);
            // });

            // modelBuilder.Entity<FileInfo>(entity =>
            // {
            //     entity.HasIndex(m => m.Id).IsUnique();
            //     entity.HasOne(m => m.Owner).WithMany(m => m.UserFiles);
            // });
        }

        public DbSet<SharedFileInfo> SharedFileInfos { get; set; }
        public DbSet<UserDataInfo> UserDataInfos { get; set; }
        public DbSet<FileTypes> FileTypes { get; set; }
        public DbSet<FileInfo> FileInfos { get; set; }

    }
}