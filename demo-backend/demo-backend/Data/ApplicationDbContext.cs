using demo_backend.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace demo_backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext() { }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
          //  Da primary Key bude autoincrement
            modelBuilder.Entity<Comments>()
                .Property(c => c.Id)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<Genres>()
                .Property(g => g.Id)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<Recommended>()
                .Property(r => r.Id)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<Movies>()
                .Property(m => m.Id)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<Users>()
                .Property(u => u.Id)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<Roles>()
                .Property(u => u.Id)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<Permission>()
                .Property(u => u.Id)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<Groups>()
                .Property(u => u.Id)
                .ValueGeneratedOnAdd();

            //For composite PK
            modelBuilder.Entity<MovieGenre>()
                .HasKey(m => new { m.MovieId, m.GenreId });
            modelBuilder.Entity<UserRoles>()
                .HasKey(ur => new { ur.UserId, ur.RoleId });
            modelBuilder.Entity<UserPermissions>()
                .HasKey(up => new { up.UserId, up.PermissionId });
            modelBuilder.Entity<RolePermissions>()
                .HasKey(rp => new { rp.RoleId, rp.PermissionId });
            modelBuilder.Entity<UserGroup>()
                .HasKey(ug => new { ug.UserId, ug.GroupId });
            modelBuilder.Entity<GroupRoles>()
                .HasKey(gr => new { gr.RoleId, gr.GroupId });

        }

        public DbSet<Comments> Comments { get; set; }
        public DbSet<Genres> Genres { get; set; }
        public DbSet<Recommended> Recommended { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<Roles> Roles { get; set; }
        public DbSet<Movies> Movies { get; set; }
        public DbSet<MovieGenre> MovieGenres { get; set; }
        public DbSet<UserRoles> UserRoles { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<UserPermissions> UserPermissions { get; set; }
        public DbSet<RolePermissions> RolePermissions { get; set; }
        public DbSet<Groups> Groups { get; set; }
        public DbSet<UserGroup> UserGroups { get; set; }
        public DbSet<GroupRoles> GroupRoles { get; set; }
    }
}
