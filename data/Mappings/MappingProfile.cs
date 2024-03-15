using AutoMapper;
using Data.Models.DataTransferObjects;
using Data.Requests.Commands;
using Utils.Events;

namespace Data.Models.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<CreateCaseCommand, Case>()
        .ForMember(d => d.OwnerId, context => context.MapFrom(s => s.OwnerId))
        .ForMember(d => d.Description,
            context => context.MapFrom(s => s.CreateCaseRequest.Description))
        .ForMember(d => d.Expire,
            context => context.MapFrom(s => s.CreateCaseRequest.Expire))
        .ForMember(d => d.Status,
            context => context.MapFrom(s => s.CreateCaseRequest.Status))
        .ForMember(d => d.DebtorId,
            context => context.MapFrom(s => s.CreateCaseRequest.DebtorId));
        CreateMap<Case, CaseDetailsResponse>()
        .ForMember(d => d.DebtorDetails, context => context.MapFrom(s => s.Debtor))
        .ReverseMap();

        CreateMap<Case, CaseCreatedEvent>().ReverseMap();

        CreateMap<DebtorDetailsResponse, Debtor>()
        .ForMember(d => d.Cases, context => context.Ignore())
        .ForMember(d => d.Name, context => context.MapFrom(s => s.Name))
        .ForMember(d => d.Id, context => context.MapFrom(s => s.Id));

        CreateMap<Debtor, DebtorDetailsResponse>()
        .ForSourceMember(d => d.Cases, y => y.DoNotValidate())
        .ForMember(d => d.Name, context => context.MapFrom(s => s.Name))
        .ForMember(d => d.Id, context => context.MapFrom(s => s.Id));

        CreateMap<CreateDebtorCommand, Debtor>()
        .ForMember(d => d.Name,
            context => context.MapFrom(s => s.CreateDebtorRequest.Name));
    }
}