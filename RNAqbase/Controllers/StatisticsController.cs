﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RNAqbase.Services;

namespace RNAqbase.Controllers
{
	[Route("api/[controller]")]
	public class StatisticsController : Controller
	{
		private readonly IStatisticsService statisticsService;

		public StatisticsController(IStatisticsService statisticsService)
		{
			this.statisticsService = statisticsService;
		}

		[HttpGet("[action]")]
		public async Task<IActionResult> GetTopologyBaseTetradViewTableOne()
		{
			var a = await statisticsService.GetTopologyBaseTetradViewTableOne();
			return Ok(a);
		}

		[HttpGet("[action]")]
		public async Task<IActionResult> GetTopologyBaseTetradViewTableTwo()
		{
			var a = await statisticsService.GetTopologyBaseQuadruplexViewTableTwo();
			return Ok(a);
		}


	}
}