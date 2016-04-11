using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using TourOfHeroes.Models;

namespace TourOfHeroes.Controllers
{
    [Route("api/[controller]")]
    public class HeroController : Controller
    {
        private readonly List<Hero> _mockHeroes = new List<Hero>{
                new Hero{ Id = 11, Name = "Mr. Nice" },
                new Hero{ Id = 12, Name = "Narco" },
                new Hero{ Id = 13, Name = "Bombasto" },
                new Hero{ Id = 14, Name = "Celeritas" },
                new Hero{ Id = 15, Name = "Magneta" },
                new Hero{ Id = 16, Name = "RubberMan" },
                new Hero{ Id = 17, Name = "Dynama" },
                new Hero{ Id = 18, Name = "Dr IQ" },
                new Hero{ Id = 19, Name = "Magma" },
                new Hero{ Id = 20, Name = "Tornado" }
        };

        [Route("")]
        [HttpGet]
        public async Task<List<Hero>> Get()
        {
            await Task.Delay(1000); // simulate latency
            return _mockHeroes;
        }

        [Route("{id:int}")]
        [HttpGet]
        public Hero Get(int id)
        {
            return _mockHeroes.FirstOrDefault(h => h.Id == id);
        }
    }
}