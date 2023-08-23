using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuctionsController : ControllerBase
    {
        private readonly AuctionDbContext _dbContext;
        private readonly IMapper _mapper;

        public AuctionsController(AuctionDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<List<AuctionDtos>>> GetAllAuctions(string date)
        {
            var query = _dbContext.Auctions.OrderBy(x => x.Item.Make).AsQueryable();

            if (!string.IsNullOrEmpty(date))
            {
                query = query.Where(x => x.UpdatedAt.CompareTo(DateTime.Parse(date).ToUniversalTime()) > 0);
            }

            return await query.ProjectTo<AuctionDtos>(_mapper.ConfigurationProvider).ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<AuctionDtos>> GetAuctionsById(Guid id)
        {
            var auctions = await _dbContext.Auctions
                        .Include(x => x.Item)
                        .FirstOrDefaultAsync(x => x.Id == id);
            if (auctions is null)
            {
                return NotFound();
            }
            return _mapper.Map<AuctionDtos>(auctions);
        }
        [HttpPost]
        public async Task<ActionResult<CreateAuctionDtos>> CreateAuction(CreateAuctionDtos createAuctionDtos)
        {
            var auction = _mapper.Map<Auction>(createAuctionDtos);
            auction.Seller = "forid";
            _dbContext.Auctions.Add(auction);
            var result = await _dbContext.SaveChangesAsync() > 0;
            if (!result) return BadRequest("Could not save");
            return CreatedAtAction(nameof(GetAuctionsById), new { auction.Id }, _mapper.Map<AuctionDtos>(auction));
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAuction(Guid id, UpdateAuctionDtos updateAuctionDtos)
        {

            var auction = await _dbContext.Auctions.Include(x => x.Item).FirstOrDefaultAsync(x => x.Id == id);

            if (auction == null) return NotFound();

            auction.Item.Make = updateAuctionDtos.Make ?? auction.Item.Make;
            auction.Item.Model = updateAuctionDtos.Model ?? auction.Item.Model;
            auction.Item.Color = updateAuctionDtos.Color ?? auction.Item.Color;
            auction.Item.Mileage = updateAuctionDtos.Mileage ?? auction.Item.Mileage;
            auction.Item.Year = updateAuctionDtos.Year ?? auction.Item.Year;

            var result = await _dbContext.SaveChangesAsync() > 0;

            if (result)
                return Ok();

            return BadRequest("Failed to save");
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAuction(Guid id)
        {
            var auction = await _dbContext.Auctions.FindAsync(id);
            if (auction == null) return NotFound();

            _dbContext.Auctions.Remove(auction);
            var result = await _dbContext.SaveChangesAsync() > 0;
            if (result)
                return Ok();
            return BadRequest("Could not delete");
        }
    }
}