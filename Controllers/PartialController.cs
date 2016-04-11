using Microsoft.AspNet.Mvc;

namespace TourOfHeroes.Controllers
{
    public class PartialController : Controller
    {
        public IActionResult Dashboard() => PartialView();
    }
}