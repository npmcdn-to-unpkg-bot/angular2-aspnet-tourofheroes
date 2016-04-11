using Microsoft.AspNet.Mvc;

namespace TourOfHeroes.Controllers
{
  public class HomeController : Controller
  {
    // GET: /<controller>/
    public IActionResult Index()
    {
      return View();
    }
  }
}