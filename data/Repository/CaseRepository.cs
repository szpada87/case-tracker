using Data.Models;
using Data.Repository.DatabaseContext;
using Microsoft.EntityFrameworkCore;

namespace Data.Repository;

public class CaseRepository : ICaseRepository
{
    private CaseDb _db;

    public CaseRepository(CaseDb db)
    {
        _db = db;
    }

    public async Task<Case?> GetById(int id)
    {
        return await _db.CaseEntries.FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<IEnumerable<Case>?> Get()
    {
        return await _db.CaseEntries.ToListAsync();
    }

    public async Task<Case> Create(Case details)
    {
        var created = _db.CaseEntries.Add(details);
        await _db.SaveChangesAsync();
        return created.Entity;
    }
}