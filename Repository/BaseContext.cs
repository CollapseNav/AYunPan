using System;
using Microsoft.EntityFrameworkCore;
using Repository.Domain;

namespace Repository {
    public class BaseContext : DbContext {
        public BaseContext (DbContextOptions<BaseContext> options) : base (options) { }

        protected override void OnModelCreating (ModelBuilder modelBuilder) {
            modelBuilder.Entity<UserDataInfo> (entity => {
                entity.HasIndex (m => m.Id).IsUnique ();
                entity.HasIndex (m => m.UserName).IsUnique ();
                entity.HasIndex (m => m.UserAccount).IsUnique ();
            });

            modelBuilder.Entity<FileInfo> (entity => {
                entity.HasIndex (m => m.Id).IsUnique ();
            });

            modelBuilder.Entity<UserDataInfo> ().HasData (new UserDataInfo {
                Id = Guid.NewGuid ().ToString (),
                    CreateDate = DateTime.Now,
                    IsDeleted = 0,
                    UserAccount = "123456@123",
                    UserName = "123456@123",
                    PassWord = "123456",
                    FolderPath = "/123456@123",
            });
        }

        public DbSet<SharedFileInfo> SharedFileInfos { get; set; }
        public DbSet<UserDataInfo> UserDataInfos { get; set; }
        public DbSet<FileTypes> FileTypes { get; set; }
        public DbSet<FileInfo> FileInfos { get; set; }

    }
}