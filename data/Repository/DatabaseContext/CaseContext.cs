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

    public DbSet<Debtor> DebtorEntries { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Case>(e =>
        {
            e.HasOne(p => p.Debtor)
            .WithMany(d => d.Cases)
            .HasForeignKey(p => p.DebtorId);
        });
    }
}