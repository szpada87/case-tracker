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
            context => context.MapFrom(s => s.CreateCaseRequest.Status));
        CreateMap<Case, CaseDetailsResponse>().ReverseMap();

        CreateMap<Case, CaseCreatedEvent>().ReverseMap();
    }
}