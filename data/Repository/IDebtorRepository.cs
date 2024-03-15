using Data.Models;

namespace Data.Repository;

public interface IDebtorRepository
{
    Task<Debtor?> GetById(int id);
    Task<IEnumerable<Debtor>?> Get();
    Task<Debtor> Create(Debtor details);
}