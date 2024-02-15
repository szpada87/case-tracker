using AutoMapper;
using Search.Models.DataTransferObjects;
using Search.Requests.Commands;
using Search.Requests.Queries;
using Utils.Events;

namespace Search.Models.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<CaseCreatedEvent, CaseDocument>().ReverseMap();
        CreateMap<GetAllCasesRequest, GetAllCases>().ReverseMap();
        CreateMap<CaseDocument, CaseResponse>().ReverseMap();
    }
}