using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Data.Repository.DatabaseContext;

public class CaseDb : DbContext
{
    public CaseDb(DbContextOptions options) : base(options) { }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseSqlServer(Environment.GetEnvironmentVariable("SQL_CONNECTION")!);
    }

    public DbSet<Case> CaseEntries { get; set; } = null!;
}