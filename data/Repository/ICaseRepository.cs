using Data.Models;

namespace Data.Repository;

public interface ICaseRepository
{
    Task<Case?> GetById(int id);
    Task<IEnumerable<Case>?> Get();
    Task<Case> Create(Case details);
}