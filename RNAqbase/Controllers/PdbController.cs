﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using RNAqbase.Repository;

namespace RNAqbase.Controllers
{
	[Route("api/[controller]")]
	public class PdbController : Controller
	{
		private readonly PdbRepository repository;

		public PdbController(IConfiguration configuration)
		{
			repository = new PdbRepository(configuration);
		}

		[HttpGet("[action]")]
		public async Task<IActionResult> GetVisualizationById(string pdbId)
		{
			if(pdbId == null) return BadRequest();
			string svg = await repository.GetVisualizationByPdbId(pdbId);
			return base.Ok(svg);
		}
		
		[HttpGet("[action]")]
		public async Task<IActionResult> GetVisualization3dById(string pdbId, int assembly)
		{
			var dataStream = await repository.GetVisualization3dByPdbId(pdbId, assembly);
			return File(dataStream, "application/octet-stream", $"{pdbId}.cif");
		}
		
	}
}

/*
public async Task<MemoryStream> GetVisualization3dByPdbId(string pdbId)
*/