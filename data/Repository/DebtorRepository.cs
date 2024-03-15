using Data.Models;
using Data.Repository.DatabaseContext;
using Microsoft.EntityFrameworkCore;

namespace Data.Repository;

public class DebtorRepository : IDebtorRepository
{
    private CaseDb _db;

    public DebtorRepository(CaseDb db)
    {
        _db = db;
    }

    public async Task<Debtor?> GetById(int id)
    {
        return await _db.DebtorEntries.FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<IEnumerable<Debtor>?> Get()
    {
        return await _db.DebtorEntries.ToListAsync();
    }

    public async Task<Debtor> Create(Debtor details)
    {
        var created = _db.DebtorEntries.Add(details);
        await _db.SaveChangesAsync();
        return created.Entity;
    }
}