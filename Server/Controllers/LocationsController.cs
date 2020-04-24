using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ContactTracking.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LocationsController : ControllerBase
    {
        private readonly ILogger<LocationsController> _logger;

        public LocationsController(ILogger<LocationsController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public IActionResult Post(Location location)
        {
            _logger.LogInformation($"Location POST recieved lat:{location.Latitude} long:{location.Longitude}");
            return Accepted();
        }

        [HttpGet]
        public IActionResult Get()
        {
            _logger.LogInformation($"Location GET recieved");
            return Ok();
        }
    }
}
