using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers
{
    public class AuctionFinishedConsumer : IConsumer<AuctionsFinished>
    {
        public async Task Consume(ConsumeContext<AuctionsFinished> context)
        {
            Console.WriteLine("---> Consuming AuctionsFinished Start");
            var auction = await DB.Find<Item>().OneAsync(context.Message.AuctionId);
            if (context.Message.ItemSold)
            {
                auction.Winner = context.Message.Winner;
                auction.SoldAmount = (int)context.Message.Amount;
            }
            auction.Status = "Finished";
            await auction.SaveAsync();
            Console.WriteLine("---> Consuming AuctionsFinished End");
        }
    }
}