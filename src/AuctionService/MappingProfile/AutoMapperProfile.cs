using AuctionService.DTOs;
using AuctionService.Entities;
using AutoMapper;
using Contracts;

namespace AuctionService.MappingProfile
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Auction, AuctionDtos>().IncludeMembers(x => x.Item);
            CreateMap<Item, AuctionDtos>();
            CreateMap<CreateAuctionDtos, Auction>()
            .ForMember(x => x.Item, o => o.MapFrom(s => s));
            CreateMap<CreateAuctionDtos, Item>();
            CreateMap<AuctionDtos, AuctionCreated>();
            CreateMap<Auction, AuctionUpdated>().IncludeMembers(x => x.Item);
            CreateMap<Item, AuctionUpdated>();
        }
    }
}